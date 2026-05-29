import { createServer } from "node:http";
import { randomUUID } from "node:crypto";
import { mkdir, appendFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { MongoClient } from "mongodb";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const envFile = path.join(rootDir, ".env");
if (existsSync(envFile)) {
  process.loadEnvFile(envFile);
}

const dataDir = path.join(rootDir, "data");
const inboxFile = path.join(dataDir, "inquiries.jsonl");
const port = Number(process.env.PORT || process.env.INQUIRY_PORT || 8787);
const mongoUri = process.env.MONGODB_URI || "";
const mongoDbName = process.env.MONGODB_DB_NAME || "portfolio";
const mongoCollectionName = process.env.MONGODB_COLLECTION || "inquiries";
let mongoClientPromise;

const json = (response, statusCode, body) => {
  response.writeHead(statusCode, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, ngrok-skip-browser-warning",
  });
  response.end(JSON.stringify(body));
};

const readBody = (request) =>
  new Promise((resolve, reject) => {
    let body = "";

    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 60_000) {
        reject(new Error("Payload too large"));
        request.destroy();
      }
    });

    request.on("end", () => resolve(body));
    request.on("error", reject);
  });

const sanitize = (value, maxLength = 2000) => {
  if (value == null) return "";
  return String(value).replace(/\s+/g, " ").trim().slice(0, maxLength);
};

const getInquiryCollection = async () => {
  if (!mongoUri) return null;

  if (!mongoClientPromise) {
    const client = new MongoClient(mongoUri);
    mongoClientPromise = client.connect();
  }

  const client = await mongoClientPromise;
  return client.db(mongoDbName).collection(mongoCollectionName);
};

const saveToLocalInbox = async (record) => {
  await mkdir(dataDir, { recursive: true });
  await appendFile(inboxFile, `${JSON.stringify(record)}\n`, "utf8");
  return { storage: "local-file" };
};

const saveInquiryRecord = async (record) => {
  const collection = await getInquiryCollection();

  if (!collection) {
    return saveToLocalInbox(record);
  }

  const result = await collection.insertOne({
    ...record,
    createdAt: new Date(record.createdAt),
  });

  return { storage: "database", databaseId: result.insertedId.toString() };
};

const server = createServer(async (request, response) => {
  if (request.method === "OPTIONS") {
    json(response, 204, {});
    return;
  }

  if (request.url === "/api/health") {
    json(response, 200, {
      ok: true,
      service: "PARTH.AI inquiry server",
      databaseConfigured: Boolean(mongoUri),
    });
    return;
  }

  if (request.url !== "/api/inquiries" || request.method !== "POST") {
    json(response, 404, { ok: false, error: "Not found" });
    return;
  }

  try {
    const rawBody = await readBody(request);
    const payload = rawBody ? JSON.parse(rawBody) : {};

    const record = {
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      type: sanitize(payload.type, 40) || "unknown",
      name: sanitize(payload.name, 120),
      email: sanitize(payload.email, 180),
      message: sanitize(payload.message, 4000),
      question: sanitize(payload.question, 4000),
      assistantReply: sanitize(payload.assistantReply, 4000),
      source: sanitize(payload.source, 120) || "portfolio",
      page: sanitize(payload.page, 500),
      userAgent: sanitize(request.headers["user-agent"], 500),
    };

    const storageResult = await saveInquiryRecord(record);

    json(response, 200, {
      ok: true,
      id: record.id,
      storage: storageResult.storage,
      databaseId: storageResult.databaseId,
      message: storageResult.storage === "database" ? "Inquiry saved in database." : "Inquiry saved locally.",
    });
  } catch (error) {
    json(response, 400, {
      ok: false,
      error: error instanceof Error ? error.message : "Unable to save inquiry.",
    });
  }
});

server.listen(port, () => {
  console.log(`PARTH.AI inquiry server running at http://localhost:${port}`);
  console.log(`Inbox file: ${inboxFile}`);
});
