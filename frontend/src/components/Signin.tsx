
import axios from 'axios';
import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function signin() {
    
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const navigate = useNavigate();


    const handleSubmit = async (e:any) => {
        e.preventDefault();
        if(!(email || password)){
            return alert("all fields are required");
        }
        const formData={
            email,
            password
        };
        console.log(formData);
        try {
          // Make a POST request to the backend using Axios
          const response = await axios.post('http://127.0.0.1:8787/api/v1/user/signin', formData);
          console.log(response);
          localStorage.setItem('token', response.data.jwt);
          navigate('/blogs');
        } catch (error:any) {
          console.error('Error submitting form:', error);
        }
      };


  return (
    <div className='h-screen flex justify-center items-center bg-gradient-to-r from-indigo-500' >
       <form  onSubmit={handleSubmit}>
        
        <div className=' bg-indigo-400 border-2 border-indigo-500 p-12 rounded flex flex-col justify-center items-center' >
           
        <h1 className='font-extrabold mb-1 p-5 text-[30px] border-b-2 border-white-100'>signin</h1>
        
           
            <div className='mx-5 '>
                <input className='px-5 py-2 mx-4 my-2 border-2 border-black rounded' type="email" 
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                placeholder='Email'/>
            </div>
            <div className='mx-5'>
                <input className='px-5 py-2 mx-4 my-2 border-2  border-black rounded' type="password" 
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                placeholder='Password' />
            </div>
            <div>
                <button type='submit'className=' bg-indigo-500 text-white p-2 rounded m-5'>Submit</button>
            </div>
        </div>
       </form>

    </div>
  )
}

export default signin
