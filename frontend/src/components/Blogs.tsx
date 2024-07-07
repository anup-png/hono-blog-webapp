import BlogCard from './BlogCard'
import useGetBlog from "../hooks"
import Navbar from './Navbar';
import { useEffect ,useState } from 'react';
import axios from 'axios';


interface User {
  id: string;
  name: string;
  email: string;
}


const Blogs = () => {
  const {loading,blogs} = useGetBlog();
  const [user, setUser] = useState<User |null>(null);

  


useEffect(() => {
  axios.get('http://127.0.0.1:8787/api/v1/user/profile',{
    headers:{
      Authorization:`Bearer ${localStorage.getItem('token' || 'jwt')}`
    }
  
  })
  .then((res)=>{
    console.log(res.data)
    setUser(res.data)
  })
}
, [])





  if(loading){
    return <div>Loading...</div>
  }

  return (

    <div>
      <Navbar user={user} />
    
    <div className='flex justify-center flex-col items-center m-10'>
      
   {
    blogs.map((blog)=>{
      return <BlogCard key={blog.id}  authorName={blog.author.name || "Anonymous"} 
      title={blog.title}
      content={blog.content}
      createdAt="2024-07-06T12:34:56Z" />
    
    })
   }
    </div>
    </div>
  )
}

export default Blogs