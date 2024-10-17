import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({});

//export global prisma client
export default prisma;
