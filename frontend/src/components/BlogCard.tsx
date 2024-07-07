
interface BlogCardProps {
    authorName: string;
    title:string,
    content:string,
    createdAt:string,
    }



const BlogCard = ({
    authorName,
    title,
    content,
    createdAt
}: BlogCardProps)=> {
  return (
    <>

    <div className="flex justify-center items-center p-2 max-w-xl">

   
      <div className="flex min-w-[600px] flex-col items-start border-b border-slate-900 ">
       

       
      <div className="flex justify-start items-center px-4 py-2 gap-2">
        <div>
            <div className="relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                <span className="font-small text-gray-600 dark:text-gray-300">{authorName[0]}</span>
            </div>
        </div>
       <div >
       {authorName} . {new Date(createdAt).toDateString()}
       </div>
      </div>


      <div className="flex justify-start items-center px-4 pb-2 text-xl font-bold">
        {title}
      </div>

        <div className="flex justify-start items-center px-4  pb-2 text-slate-600">
            {content.slice(0, 100) + '...'}
        </div>


        <div className="flex justify-start items-center px-3 pb-2 ">
            {`${Math.ceil(content.length/100)} minutes to read`}
        </div>


      </div>
      
      </div>

    </>
  )
}

export default BlogCard