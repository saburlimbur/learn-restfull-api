import { PrismaClient } from '@prisma/client';

const database = new PrismaClient();

export default database;

export const PostModels = new PrismaClient();
export const TagsModels = new PrismaClient();
export const CategoryModels = new PrismaClient();
export const UserModels = new PrismaClient();
export const CommentModels = new PrismaClient();
