// lib/prisma.ts
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const globalForPrisma = global as unknown as {
  prisma: ReturnType<typeof prismaClientSingleton> | undefined;
};

function prismaClientSingleton() {
  return new PrismaClient().$extends(withAccelerate());
}

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
