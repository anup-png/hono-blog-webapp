import { useEffect, useState } from 'react';
import axios from 'axios';

interface Blog {
  id: string;
  title: string;
  content: string;
  author:{
    name:string;
  } 
  createdAt: string;
}

const useGetBlog = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://127.0.0.1:8787/api/v1/blog/bulk",{
      headers:{
        Authorization:`Bearer ${localStorage.getItem('token')}`
      }
    
    })
      .then(response => {
        setBlogs(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching the blogs:", error);
        setLoading(false);
      });
  }, []);

  return { blogs, loading };
};

export default useGetBlog;
