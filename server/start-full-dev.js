import { spawn } from "node:child_process";
import process from "node:process";

const commands = [
  { label: "api", command: "node", args: ["server/inquiry-server.js"] },
  { label: "vite", command: "npm", args: ["run", "dev", "--", "--port", "5173"] },
];

const children = commands.map(({ label, command, args }) => {
  const child = spawn(command, args, {
    shell: true,
    stdio: ["inherit", "pipe", "pipe"],
  });

  child.stdout.on("data", (chunk) => process.stdout.write(`[${label}] ${chunk}`));
  child.stderr.on("data", (chunk) => process.stderr.write(`[${label}] ${chunk}`));
  child.on("exit", (code) => {
    if (code && code !== 0) {
      console.error(`[${label}] exited with code ${code}`);
    }
  });

  return child;
});

const stop = () => {
  for (const child of children) {
    child.kill();
  }
  process.exit(0);
};

process.on("SIGINT", stop);
process.on("SIGTERM", stop);
