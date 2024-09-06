import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { errorMsg, loadingMsg, successMsg } from "../utils/messages"
import { useDispatch, useSelector } from "react-redux"
import { signInUser } from "../redux/auth/authApi.jsx"
import { setTimerOff } from "../redux/auth/authSlice"
import GoogleAuth from "../components/header/GoogleAuth.jsx"

const SignIn = () => {


  const {loading, error, success, currentUser} = useSelector((state) => state.auth)


  const [formData, setFormData] = useState({
    email: '', 
    password: ''
  })


  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleFieldChange = (e) => {
    setFormData({...formData, [e.target.name] : e.target.value})
  }

  console.log("formData: ", formData)

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    try {

      //email sign in
      dispatch(signInUser({url: "/api/user/auth/signin" ,formData:formData}))
      
    } catch (error) {
      //frontend error
      console.log("frontend Error: ", error)

    }

  }


  useEffect(() => {

    //timer object
    let timer 
    if(error || success){

      if(success){
        dispatch(setTimerOff())
        navigate('/')
        return
      }
  
      timer = setTimeout(() => {
        dispatch(setTimerOff())
      }, 3000)
    }

    //cleanup timer on unmount
    return () => clearTimeout(timer)


  }, [error, success, dispatch, navigate])


  return (
    <div className="border border-4 border-slate-200 rounded-lg shadow-lg p-3 m-3 max-w-xs sm:max-w-xl  mx-auto">
      <h1 className="text-center pb-2 font-semibold text-3xl">Sign In</h1>

      <form className="flex flex-col gap-5 m-2 p-5" onSubmit={handleFormSubmit}>


        <input type="email" required = {true} name="email" id="email" className="p-3 rounded-lg" placeholder="email" value={formData.email} onChange={handleFieldChange}/>

        <input type="password" required = {true} name="password" id="password" className="p-3 rounded-lg" placeholder="password" value={formData.password} onChange={handleFieldChange}/>

        <button disabled = {loading} type="submit" className="bg-slate-600 text-white p-3 rounded-lg uppercase font-semibold text-lg
        hover:bg-opacity-80 disabled:bg-opacity-50">{loading ? "signing...in" : "sign in"}</button>

        <GoogleAuth />

      </form>

      <div className="px-5 m-2 flex gap-2">
        <p>Dont Have an account?</p>
        <Link to='/signup'>
         <span className="text-blue-600">Sign Up</span>
        </Link>
      </div>

      {loading && loadingMsg()}
      {error && errorMsg(error)}
      {/* {success && successMsg(success)} */}


      {/* {"error: "}
      {JSON.stringify(error)}
      {" - "}
      {"success: "}
      {JSON.stringify(success)} */}

      
      {console.log("error: ", error)}
      {console.log("success: ", success)}
      {console.log("current user:", currentUser)}

    </div>
  )


  


}

export default SignIn