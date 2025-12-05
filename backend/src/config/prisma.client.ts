import dotenv from 'dotenv';
import {PrismaPg} from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.ts";

dotenv.config();

const adapter = new PrismaPg({url: process.env.DATABASE_URL || ""});
export const prisma = new PrismaClient({adapter});

