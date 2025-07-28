// @ts-check
import { PrismaClient } from "@prisma/client";

/** @type {import('@prisma/client').PrismaClient} */
const db = new PrismaClient();

process.on("SIGINT", async () => {
  try {
    await db.$disconnect();
    console.log("Database connection closed successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error disconnecting from database:", error);
    process.exit(1);
  }
});

process.on("uncaughtException", async (error) => {
  console.error("Uncaught Exception:", error);
  try {
    await db.$disconnect();
    console.log("Database connection closed due to uncaught exception");
    process.exit(1);
  } catch (disconnectError) {
    console.error("Error disconnecting from database:", disconnectError);
    process.exit(1);
  }
});

process.on("unhandledRejection", async (error) => {
  console.error("Unhandled Rejection:", error);
  try {
    await db.$disconnect();
    console.log("Database connection closed due to unhandled rejection");
    process.exit(1);
  } catch (disconnectError) {
    console.error("Error disconnecting from database:", disconnectError);
    process.exit(1);
  }
});

export default db;
