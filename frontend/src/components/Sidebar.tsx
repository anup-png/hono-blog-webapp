


interface User {
    id: string;
    name: string;
    email: string;
   
}

const Sidebar = ({ user, toggleSidebar } :{user:User |null ,toggleSidebar:() =>void }) => {

    const logout=(e:any)=>{
        e.preventDefault();
        localStorage.removeItem('token' || 'jwt');
        window.location.href='/signin'
      }
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50" onClick={toggleSidebar}>
            <div className="bg-white w-64 h-full p-4" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">User Details</h2>
                    <button onClick={toggleSidebar} className="text-gray-500 hover:text-gray-700">
                        Close
                    </button>
                </div>
                <div className="mb-4">
                    <p className="font-medium text-black">Name:</p>
                    <p className="text-black">{user?.name}</p>
                </div>
                <div>
                    <p className="font-medium text-black">Email:</p>
                    <p className="text-black">{user?.email}</p>
                </div>
                <button onClick={logout} className="bg-gray-800 text-white px-4 py-2 mt-4"> Logout</button>
            </div>
        </div>
    );
};

export default Sidebar;
