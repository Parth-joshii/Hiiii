import { spawn } from "node:child_process";
import process from "node:process";
import { setTimeout as wait } from "node:timers/promises";

const vitePort = Number(process.env.VITE_PORT || 5173);
const apiPort = Number(process.env.INQUIRY_PORT || 8787);
const ngrokApiUrl = "http://127.0.0.1:4040/api/tunnels";
const children = [];

const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";

function print(message = "") {
  process.stdout.write(`${message}\n`);
}

function spawnLabeled(label, command, args, options = {}) {
  const child = spawn(command, args, {
    shell: false,
    stdio: ["inherit", "pipe", "pipe"],
    env: process.env,
    ...options,
  });

  child.stdout.on("data", (chunk) => process.stdout.write(`[${label}] ${chunk}`));
  child.stderr.on("data", (chunk) => process.stderr.write(`[${label}] ${chunk}`));
  child.on("exit", (code) => {
    if (code && code !== 0) {
      console.error(`[${label}] exited with code ${code}`);
    }
  });

  children.push(child);
  return child;
}

async function isReachable(url) {
  try {
    const response = await fetch(url, {
      headers: { "ngrok-skip-browser-warning": "true" },
    });
    return response.ok;
  } catch {
    return false;
  }
}

async function waitFor(url, label, timeoutMs = 25_000) {
  const startedAt = Date.now();

  while (Date.now() - startedAt < timeoutMs) {
    if (await isReachable(url)) return true;
    await wait(450);
  }

  throw new Error(`${label} did not become reachable at ${url}`);
}

async function findNgrokTunnel() {
  try {
    const response = await fetch(ngrokApiUrl);
    if (!response.ok) return null;

    const payload = await response.json();
    return payload.tunnels?.find((tunnel) => {
      const address = String(tunnel.config?.addr || "");
      return tunnel.proto === "https" && address.includes(String(vitePort));
    });
  } catch {
    return null;
  }
}

async function waitForNgrokTunnel(timeoutMs = 25_000) {
  const startedAt = Date.now();

  while (Date.now() - startedAt < timeoutMs) {
    const tunnel = await findNgrokTunnel();
    if (tunnel?.public_url) return tunnel;
    await wait(650);
  }

  throw new Error("ngrok tunnel did not become ready");
}

async function start() {
  if (await isReachable(`http://localhost:${apiPort}/api/health`)) {
    print(`[api] reusing http://localhost:${apiPort}`);
  } else {
    spawnLabeled("api", "node", ["server/inquiry-server.js"], {
      env: { ...process.env, INQUIRY_PORT: String(apiPort) },
    });
    await waitFor(`http://localhost:${apiPort}/api/health`, "API server");
  }

  if (await isReachable(`http://localhost:${vitePort}`)) {
    print(`[vite] reusing http://localhost:${vitePort}`);
  } else {
    spawnLabeled("vite", npmCommand, ["run", "dev", "--", "--host", "0.0.0.0", "--port", String(vitePort), "--strictPort"]);
    await waitFor(`http://localhost:${vitePort}`, "Vite dev server");
  }

  let tunnel = await findNgrokTunnel();
  if (!tunnel) {
    const ngrokArgs = ["http", `http://localhost:${vitePort}`];
    if (process.env.NGROK_DOMAIN) {
      ngrokArgs.push("--domain", process.env.NGROK_DOMAIN);
    }

    spawnLabeled("ngrok", "ngrok", ngrokArgs);
    tunnel = await waitForNgrokTunnel();
  }

  print("");
  print("PARTH.AI dev tunnel is ready");
  print(`Local:  http://localhost:${vitePort}`);
  print(`Public: ${tunnel.public_url}`);
  print("");
  print("Keep this terminal open while sharing the public URL. Press Ctrl+C to stop spawned processes.");
}

function stop() {
  for (const child of children) {
    child.kill();
  }
  process.exit(0);
}

process.on("SIGINT", stop);
process.on("SIGTERM", stop);

start().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  stop();
});
