import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { decode, sign, verify } from "hono/jwt";
import { withAccelerate } from "@prisma/extension-accelerate";
import { cors } from "hono/cors";

export const userRoute =new Hono<{
  
    Bindings:{
        DATABASE_URL:string,
        JWT_SECRET:string
    }
}>()

userRoute.use('/*',cors()); 

userRoute.post('/signup',async(c)=>{ 
    const prisma = new PrismaClient({   // cloudflare   server=>database //// server => connection pool => database
  
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    const body = await c.req.json();  
    console.log(body);
    
    const checkuser = await prisma.user.findFirst({
      where:{
        email:body.email
      }
    });
    if(checkuser){
      c.status(403);
      return c.json({ 
        message:"User already exists"
      })
    };
    const user=await prisma.user.create({
      data:{
        name:body.name,
        email:body.email,
        password:body.password,
      }
    })
    
    
    const token= await sign({id:user.id},c.env.JWT_SECRET);
    
    return c.json({
      id: String(user.id),
      name: String(user.name),
      email: String(user.email),
      token:String(token)
  });
});
  

userRoute.post('/signin',async (c) => {
    const prisma = new PrismaClient({
      //@ts-ignore
      datasourceUrl:c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  
  try {
    const body= await c.req.json();
    
    const user =await prisma.user.findFirst({
      where:{
        email:body.email,
        password:body.password
      }
    })
    if(!user){
      c.status(403);
      return c.json({
        message:"User not found"
      })
    }
    
    //@ts-ignore
    
    const jwt = await sign({id:user.id},c.env.JWT_SECRET);
    console.log("from signin :", jwt);
    return c.json({
      id: String(user.id),
      name: String(user.name),
      email: String(user.email),
      jwt:String(jwt)
  });
  
  } 
  catch (error) 
  {
    console.log(error);
    return c.text("something went wrong");
    
  }
  
  
  
   
  })


  userRoute.get('/profile',async (c) => {

    const prisma = new PrismaClient({
      //@ts-ignore
      datasourceUrl:c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const token = c.req.header("Authorization")?.split(" ")[1] || "";
  console.log("token:",token);

  if(!token){
    c.status(403);
    return c.json({
      message:"login in first"
    })
  }
  const user = await verify(token,c.env.JWT_SECRET);

  if(!user){
    c.status(403);
    return c.json({
      message:"login in first or token expired"
    })
  }

  try {
    const profile = await prisma.user.findFirst({
      where:{
        //@ts-ignore
        id:user.id
      },
      select:{
        id:true,
        name:true,
        email:true
      }
    })
    return c.json(profile);

  } catch (error) {
    console.log(error);
  }

})