/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { errorMsg, loadingMsg, successMsg } from "../utils/messages.jsx"

const SignUp = () => {


  const [formData, setFormData] = useState({
    username: '',
    email: '', 
    password: ''
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)


  const navigate = useNavigate()

  const handleFieldChange = (e) => {
    setFormData({...formData, [e.target.name] : e.target.value})
  }

  console.log("formData: ", formData)

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    try {

      setLoading(true)
      const res = await fetch('/api/user/auth/signup', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(formData)
      })
  
      const response = await res.json()
      console.log("response: ", response)

      //backend response error
      if(response.success === false){
        // console.log("response.success", response.success)
        setLoading(false)
        setError(response?.error || "something went wrong s")
        return
        
      }

      //backend response success
      setLoading(false)
      setError(null)
      setSuccess(response.message || 'new user registered')
      navigate('/signin')



      
    } catch (error) {
      //frontend error
      console.log("frontend Error: ", error)
      setLoading(false)
      setError(error)

      
    }


  }


  useEffect(() => {

    //timer object
    let timer 
    if(error || success){
      timer = setTimeout(() => {
        setError(null)
        setSuccess(null)

      }, 3000)
    }

    //cleanup timer on unmount
    return () => clearTimeout(timer)


  }, [error, success])


  return (
    <div className="border border-4 border-slate-200 rounded-lg shadow-lg p-3 m-3 max-w-xs sm:max-w-xl  mx-auto">
      <h1 className="text-center pb-2 font-semibold text-3xl">Sign Up</h1>

      <form className="flex flex-col gap-5 m-2 p-5" onSubmit={handleFormSubmit}>

        <input type="text" required = {true} name="username" id="username" className="p-3 rounded-lg" placeholder="username" value={formData.username} onChange={handleFieldChange}/>

        <input type="email" required = {true} name="email" id="email" className="p-3 rounded-lg" placeholder="email" value={formData.email} onChange={handleFieldChange}/>

        <input type="password" required = {true} name="password" id="password" className="p-3 rounded-lg" placeholder="password" value={formData.password} onChange={handleFieldChange}/>

        <button disabled = {loading} type="submit" className="bg-slate-600 text-white p-3 rounded-lg uppercase
        hover:bg-opacity-80 disabled:bg-opacity-45">{loading ? "signing...up" : "sign up"}</button>

      </form>

      <div className="px-5 m-2 flex gap-2">
        <p>Have an account?</p>
        <Link to='/signin'>
         <span className="text-blue-600">Sign In</span>
        </Link>
      </div>

      {loading && loadingMsg()}
      {error && errorMsg(error)}
      {success && successMsg(success)}

    </div>
  )
}

export default SignUp