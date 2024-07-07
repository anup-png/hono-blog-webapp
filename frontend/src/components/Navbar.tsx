import { useState } from 'react';
import Sidebar from './Sidebar';
import {Link} from 'react-router-dom';

interface User {
    id: string;
    name: string;
    email: string;
    
}

const Navbar = ({ user } :{user:User | null}) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

   
      
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <div className="text-lg font-bold">
                LOGO
            </div>
            { user? <div onClick={toggleSidebar} className="cursor-pointer">
                <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                    <span className="font-medium text-gray-600 dark:text-gray-300">{user?.name[0]} </span>
                </div>
            </div> : <div className="text-sm">
                <Link to="/signin" className="mr-4">Login</Link>
                <Link to="/signup">Register</Link>
                </div>}
            {isSidebarOpen && <Sidebar user={user} toggleSidebar={toggleSidebar} />}

            
        </nav>
    );
};

export default Navbar;
