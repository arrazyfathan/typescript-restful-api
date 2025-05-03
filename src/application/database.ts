import { PrismaClient } from "@prisma/client";
import logger from "./logger";

export const prismaClient = new PrismaClient({
  log: [
    {
      emit: "event",
      level: "query",
    },
    {
      emit: "event",
      level: "error",
    },
    {
      emit: "event",
      level: "info",
    },
    {
      emit: "event",
      level: "warn",
    },
  ],
});

prismaClient.$on("error", (e) => {
  logger.error("Prisma error", {
    message: e.message,
    target: e.target,
  });
});

prismaClient.$on("info", (e) => {
  logger.info("Prisma info", {
    message: e.message,
  });
});

prismaClient.$on("warn", (e) => {
  logger.warn("Prisma warning", {
    message: e.message,
  });
});

prismaClient.$on("query", (e) => {
  logger.info("Prisma query", {
    message: e,
    params: e.params,
    query: e.query,
    duration: `${e.duration}ms`,
  });
});
