import React,{useContext, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import NavBar from '../Components/Navbar'
import { AuthContext } from '../Context/useAuth'
import img from '../assets/bb.png'

function LandingPage() {
  const {check,isLogged} = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(()=>{
    check();
  },[])
  return (
    <div className='h-screen bg-white'>
      <NavBar />
      <div className='flex md:justify-around justify-start items-center h-[80vh] p-5 md:p-20'>
        <div className='flex flex-col justify-start items-start'>
          <h1 className='md:text-[120px] text-5xl text-green-600 font-bold font-[Mirza]'>LabelPrinter</h1>
          <p className='md:text-2xl text-lg font-semibold md:font-bold mb-3 text-black'>Labels your choice. Create and Print<br />get Creative </p>
          {isLogged ?<button className="btn hover:bg-orange-500 border-none text-white md:mr-20 rounded-l-full rounded-r-full bg-orange-600" onClick={()=>navigate("/main")}>
              Design
            </button>:<button className="btn hover:bg-orange-500 border-none text-white md:mr-20 rounded-l-full rounded-r-full bg-orange-600">
              Contact 
            </button>}
        </div>
        <img src={img} alt='img' className='w-[500px] h-[500px] hidden md:flex' />
      </div>
    </div>
  )
}

export default LandingPage