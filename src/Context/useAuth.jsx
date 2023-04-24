import { createContext,useEffect,useState } from "react";
import axios from "axios";

export const AuthContext = createContext(null)

export const AuthProvider = ({children}) =>{
    const [user,setUser] = useState({});
    const [isLogged,setIsLogged] = useState(false);

    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(token){
            setIsLogged(true);
        }
    },[])
    const check = async() =>{
        try {
            const test = await axios.get("https://labelprinter.onrender.com/");
            console.log(test);
        } catch (error) {
            console.log(error);
        }

    }

    const login = async(email,password,setType,setMessage,setAlert,navigate) =>{
        try {
            const body = {
                email:email,
                password:password
            }
            const user = await axios.post("https://labelprinter.onrender.com/user/login",body);
            console.log(user);
            if(user.status === 200){
                setUser(user.data);
                localStorage.setItem("token",user.data.token);
                localStorage.setItem("uid",user.data.user)
                setIsLogged(true);
                setAlert(true);
                setType("success");
                setMessage("Login Successful");
                navigate("/main");
                setTimeout(() => {
                    setAlert(false);
                    setMessage("");
                }, 3000);
            }
        } catch (error) {
            setAlert(true);
            setMessage(error.response.data.message);
            setIsLogged(false);
            setType("error");
            setTimeout(() => {
                setAlert(false);
                setMessage("");
            }, 3000);
        }
    }

    const logout = async() =>{
        localStorage.removeItem("token");
        localStorage.removeItem("uid");
        setIsLogged(false)
    }

    return(
        <AuthContext.Provider value={{user,isLogged,check,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}