import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Context/useAuth';
import { Link } from 'react-router-dom';

function NavBar(){
  const [isOpen, setIsOpen] = useState(false);
  const {isLogged,logout} = useContext(AuthContext);

  useEffect(()=>{
    console.log(isLogged)
  },[])
  return(
    <div className="navbar border-b bg-white">
      <div className="navbar-start">
        <div className="dropdown md:hidden">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
          </label>
          <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            <li><Link to="/" className="hover:bg-gray-50 hover:text-blue-800 font-semibold">Home</Link></li>
            <li><Link to="/" className="hover:bg-gray-50 hover:text-blue-800 font-semibold">Products</Link></li>
            <li>{isLogged ? <Link to="/main" className="hover:bg-gray-50 hover:text-green-800 font-semibold">Design and print</Link>:<Link to="/login" className=" hover:bg-gray-50 hover:text-green-800 font-semibold">Login</Link>}</li>
          </ul>
        </div>
        <a className="btn btn-ghost normal-case text-3xl hidden md:flex text-green-600 font-bold font-[Mirza]">Label Printer</a>
      </div>
      <div className="navbar-center">
        <Link to="/" className="btn btn-ghost normal-case text-xl md:hidden text-green-600 font-bold font-[Mirza]">Label Printer</Link>
        <Link to="/" className="btn btn-ghost hover:bg-gray-50 hover:text-blue-800 normal-case text-xl hidden md:flex">Home</Link>
        <Link to="/" className="btn btn-ghost hover:bg-gray-50 hover:text-blue-800 normal-case text-xl hidden md:flex">Products</Link>
        {isLogged ? <Link to="/main" className="btn btn-ghost hover:bg-gray-50 hover:text-green-800 normal-case text-xl hidden md:flex">Design and print</Link>:<Link to="/login" className="btn btn-ghost hover:bg-gray-50 hover:text-green-500 normal-case text-xl hidden md:flex">Login</Link>}
      </div>
      <div className="navbar-end">
        {isLogged ?<button className="btn hover:bg-orange-500 border-none text-white md:mr-20 rounded-l-full rounded-r-full bg-orange-600" onClick={()=>logout()}>
          Logout
        </button>:<button className="btn hover:bg-orange-500 border-none text-white md:mr-20 rounded-l-full rounded-r-full bg-orange-600">
          Contact
        </button>}
      </div>
    </div>
  )
}

export default NavBar