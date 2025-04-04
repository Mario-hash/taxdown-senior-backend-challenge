// scripts/patch-swagger.js
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

try {
  console.log(">>> [patch-swagger.js] Obteniendo información del despliegue (JSON)...");
  const rawJson = execSync("serverless info --json").toString();

  const infoObj = JSON.parse(rawJson);

  const httpApiOutput = infoObj.outputs.find((o) => o.OutputKey === "HttpApiUrl");

  if (!httpApiOutput) {
    console.error(">>> [patch-swagger.js] No se encontró un Output con OutputKey = 'HttpApiUrl'");
    process.exit(1);
  }

  const endpoint = httpApiOutput.OutputValue;
  console.log(`>>> [patch-swagger.js] Endpoint detectado: ${endpoint}`);

  const endpointFinal = endpoint;

  const swaggerPath = path.join(__dirname, "..", "docs", "swagger.json");
  const swagger = JSON.parse(fs.readFileSync(swaggerPath, "utf8"));

  if (!Array.isArray(swagger.servers)) {
    swagger.servers = [];
  }

  const newServer = {
    url: endpointFinal,
    description: "AWS Production"
  };

  // Reemplaza o inserta
  const existingIndex = swagger.servers.findIndex((s) => s.url && s.url.includes("execute-api"));
  if (existingIndex >= 0) {
    swagger.servers[existingIndex] = newServer;
  } else {
    swagger.servers.push(newServer);
  }

  fs.writeFileSync(swaggerPath, JSON.stringify(swagger, null, 2));
  console.log(">>> [patch-swagger.js] swagger.json parcheado con éxito.");
} catch (err) {
  console.error(">>> [patch-swagger.js] Error:", err);
  process.exit(1);
}
