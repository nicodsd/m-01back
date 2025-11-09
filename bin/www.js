#!/usr/bin/env node
import http from "http";
import { fileURLToPath } from "url";
import { dirname } from "path";
import debugLib from "debug";
import app from "../app.js";

const debug = debugLib("myapp:server");

// __dirname equivalente en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Normalizar puerto
const normalizePort = (val) => {
  const port = parseInt(val, 10);
  if (isNaN(port)) return val; // named pipe
  if (port >= 0) return port; // número válido
  return false;
};

const port = normalizePort(process.env.PORT || "3000");

app.set("port", port);

// Crear servidor HTTP
const server = http.createServer(app);

// Función principal con async/await
const startServer = async () => {
  try {
    server.listen(port, () => {
      const addr = server.address();
      const bind =
        typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
      debug(`Listening on ${bind}`);
      console.log(`✅ Servidor corriendo en http://localhost:${port}`);
    });
  } catch (error) {
    console.log("ERRRROROROR", error)
    onError(error);
  }
};

// Manejo de errores
const onError = (error) => {
  if (error.syscall !== "listen") throw error;
  
  const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;

  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requiere privilegios elevados`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`${bind} ya está en uso`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// Iniciar
startServer();
