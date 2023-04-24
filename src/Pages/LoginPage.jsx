import React,{useContext, useEffect, useState} from 'react'
import NavBar from '../Components/Navbar'
import { AuthContext } from '../Context/useAuth';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const {login} = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert,setAlert] = useState(false);
  const [type,setType] = useState("success");
  const [message,setMessage] = useState("");
  const handleSubmit = () => {
    login(email,password,setType,setMessage,setAlert,navigate);
  };
  return (
    <div className='h-screen bg-white'>
      <NavBar />
      <div className="container min-h-[80vh] flex flex-col justify-center items-center p-4 md:p-0">
        <h1 className='font-[900] mb-9 md:text-5xl text-4xl text-center text-[#CBCBCB]'>Good to see you Back!</h1>
        <div className="p-4 bg-white rounded-xl drop-shadow-lg">
          <div className="flex flex-col items-center">
            <h1 className="font-bold text-3xl md:text-5xl text-gray-900">Login</h1>
            <p className="text-gray-500 mt-2 text-center">Enter your email and password to access your account.</p>
          </div>
          <div onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              required
              className="input input-bordered w-full border-2 border-gray-200 bg-white text-black "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              required
              className="input input-bordered w-full border-2 border-gray-200 bg-white text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="btn rounded-xl text-white"
              onClick={handleSubmit}
            >
              Login
            </button>
          </div>
        </div>
        {alert && 
        <div className='p-10'>
          <div class={`alert alert-${type} shadow-lg mt-4`}>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>{message}</span>
            </div>
          </div>
        </div>}
      </div>
    </div>
  )
}

export default LoginPage