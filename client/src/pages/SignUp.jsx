import { Link } from "react-router-dom"

const SignUp = () => {
  return (
    <div className="border border-4 border-slate-200 rounded-lg shadow-lg p-3 m-3 max-w-xs sm:max-w-xl  mx-auto">
      <h1 className="text-center pb-2 font-semibold text-3xl">Sign Up</h1>

      <form className="flex flex-col gap-5 m-2 p-5">

        <input type="text" name="username" id="username" className="p-3 rounded-lg" placeholder="username"/>
        <input type="email" name="email" id="email" className="p-3 rounded-lg" placeholder="email"/>
        <input type="password" name="password" id="password" className="p-3 rounded-lg" placeholder="password"/>

        <button type="button" className="bg-slate-600 text-white p-3 rounded-lg uppercase">sign up</button>
        
      </form>

      <div className="px-5 m-2 flex gap-2">
        <p>Have an account?</p>
        <Link to='/signin'>
         <span className="text-blue-600">Sign In</span>
        </Link>
      </div>

    </div>
  )
}

export default SignUp