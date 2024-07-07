import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {decode , sign , verify } from 'hono/jwt'
import { Bindings } from 'hono/types';
import { userRoute } from './routes/user';
import { blogRoute } from './routes/blog';

const app = new Hono<
{
 Bindings:{
  DATABASE_URL:string,
  JWT_SECRET:string
 }
}>()

app.route('/api/v1/user', userRoute);
app.route('/api/v1/blog', blogRoute);













//  DATABASE_URL="prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiNzBmNjFmZTEtNTMzMi00YjFlLWJjNDMtNDhmZDI4YzM4MDA1IiwidGVuYW50X2lkIjoiMzgyYTg4OGUyMjI0ZmRkOGMzMTE1ZDE3MGRlZGZlMjc0YzVkNGQ1YWQxMDlkYTllNmI0MTgyZWUzY2Q2M2JjMSIsImludGVybmFsX3NlY3JldCI6Ijk0ZjBlMjAzLTI2MjgtNDAxMy1hZGZkLTY3Yjg3YTczOWY1OCJ9.hOTJtD0C3VzV916JXxU1y909h8yyQTtNgg9ien7tlLU"


export default app
