import { Hono } from "hono";
import {cors} from "hono/cors";
import { PrismaClient } from "@prisma/client/edge";
import { verify } from "hono/jwt";
import { withAccelerate } from "@prisma/extension-accelerate";



export const blogRoute = new Hono<{
    Bindings: {
        DATABASE_URL: any,
        JWT_SECRET: any
    },
}>();


blogRoute.use('/*',cors());
blogRoute.use('/*', async (c, next) => {
    const prisma = new PrismaClient({
  
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const authHeader = c.req.header('Authorization') || "";
    console.log("Authorization Header:", authHeader);

    // if (!authHeader.startsWith('Bearer ')) {
    //     c.status(403);
    //     return c.json({
    //         message: "Unauthorized and you are not logged in with bearer"
    //     });
    // }

    const token = authHeader.split(' ')[1];
    console.log("token is : ",token )

    try {
        const user =await verify(token, c.env.JWT_SECRET);
        console.log("Verified User:", user);

        if (user) {
            //@ts-ignore
            c.set("userId", user.id);
            await next();
        } else {
            c.status(403);
            return c.json({
                message: "Unauthorized and you are not logged in as usual"
            });
        }
    } catch (error) {
        console.log("JWT Verification Error:", error);
        c.status(403);
        return c.json({
            message: "Unauthorized and you are not logged in"
        });
    }
});

blogRoute.post('/', async (c) => {
    const prisma = new PrismaClient({
  
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    try {
        const body = await c.req.json();
        // @ts-ignore
        const authorId = c.get("userId");
        console.log(authorId);

        const post = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                // @ts-ignore
                authorId: authorId
            }
        });
        return c.json({
            id: post.id
        });
    } catch (error) {
        console.log(error);
        c.status(500);
        return c.json({
            message: "Internal server error in blog post"
        });
    }
});

blogRoute.put('/', async (c) => {
    const prisma = new PrismaClient({
  
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try {
        const body = await c.req.json();
        console.log(body)

        const post = await prisma.post.update({
            where: {
                id: body.id
            },
            data: {
                title: body.title,
                content: body.content
            }
           
        });
        return c.json({
            id: post.id
        });
    } catch (error) {
        console.log(error);
        c.status(500);
        return c.json({
            message: "Internal server error"
        });
    }
});
blogRoute.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
  
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try {
        const posts = await prisma.post.findMany({
            select:{
                title:true,
                content:true,
                authorId:true,
                
                author:{
                    select:{
                        
                        id:true,email:true,
                        name:true
                    }
                }
            }
        });
        return c.json(posts);
    } catch (error) {
        console.log(error);
        c.status(500);
        return c.json({
            message: "Internal server error"
        });
    }
});
blogRoute.get('/:id', async (c) => {
    const prisma = new PrismaClient({
  
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const id = c.req.param("id");

    try {
        const post = await prisma.post.findFirst({
            where: {
                // @ts-ignore
                id: id
            }
        });

        if (post) {
            return c.json(post);
        } else {
            c.status(404);
            return c.json({
                message: "Post not found"
            });
        }
    } catch (error) {
        console.log(error);
        c.status(500);
        return c.json({
            message: "Internal server error"
        });
    }
});


