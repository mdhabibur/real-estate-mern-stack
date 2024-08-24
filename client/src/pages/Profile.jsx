import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { updateUserProfile, signOut, deleteUser } from "../redux/auth/authApi"
import { errorMsg, loadingMsg, successMsg } from "../utils/messages"
import { setTimerOff } from "../redux/auth/authSlice"
import { useNavigate } from "react-router-dom"

const Profile = () => {

  const {loading, error, success, currentUser} = useSelector((state) => state.auth)
  const fileInputRef = useRef(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '', 
    avatar: ''
  })
  
  const [uploadPercentage, setUploadPercentage] = useState(0)
  const [imgUploadMsg, setImgUploadMsg] = useState("")

  const handleImageClick = () => {
    console.log(fileInputRef.current.click())
  }

  const handleFileInputUpload = (e) => {

    const selectedImg = e.target.files[0]
    if(selectedImg){
      uploadProfileImgToFirebase(selectedImg)
    }

  }

  const uploadProfileImgToFirebase = async (selectedImg) => {

    const storage = getStorage()
    let fileName = Date.now() + "-" + selectedImg.name

    console.log(selectedImg) 

    const storageRef = ref(storage, `profiles/${currentUser._id}/${fileName}`)

    const uploadTask = uploadBytesResumable(storageRef, selectedImg)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        //progress
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setUploadPercentage(Math.round(progress))
      },

      (error) => {
        console.log("upload error: ", error)
      }, 

      () => {
        //complete handler
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("file available at: ", downloadURL)

          //update the avatar
          setFormData({
            ...formData,
            avatar: downloadURL
          })

        })

      }



    )


  }


  useEffect(() => {
    if(formData.avatar){
      console.log("did avatar uploaded?")
      dispatch(updateUserProfile({url: `/api/user/profile/update/${currentUser._id}`, formData}))
    }
  }, [formData.avatar])

  const handleFieldChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })

  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    dispatch(updateUserProfile({url: `/api/user/profile/update/${currentUser._id}`, formData}))


  }

  useEffect(() => {

    if(uploadPercentage > 0 && uploadPercentage < 100){
      setImgUploadMsg(`Image Uploading ${uploadPercentage} %`)
    }

    let timer 

    if(uploadPercentage == 100){
      setImgUploadMsg("Image Uploaded")
      
      timer = setTimeout(() => {
        setImgUploadMsg("")
      }, 4000)
    }

    return () => clearTimeout(timer)

  }, [uploadPercentage])


  useEffect(() => {

    //timer object
    let timer 
    if(error || success){
      timer = setTimeout(() => {
        dispatch(setTimerOff())
      }, 3000)
    }

    //cleanup timer on unmount
    return () => clearTimeout(timer)


  }, [error, success, dispatch])


  console.log("progress: ", uploadPercentage)
  console.log("formData: ", formData)


  const signOutUser = async (e) => {
    dispatch(signOut({url: '/api/user/profile/signout'}))
      
  }

  const deleteUserProfile = async (e) => {
    dispatch(deleteUser({url: `/api/user/profile/delete/${currentUser._id}`}))

  }



  return (
    <div className="flex flex-col border border-slate-200 border-4 rounded-lg shadow-lg text-center p-5 gap-3 max-w-xs sm:max-w-xl mx-auto my-3">

      <h1 className="font-semibold text-3xl">Profile</h1>

      <div className="self-center py-5">
        <input type="file" name="profileImg" id="profileImg" accept="image/*" hidden ref={fileInputRef} onChange={handleFileInputUpload}/>

        <div className="">
          <img src={currentUser.avatar} alt="profile_img"  className="rounded-full w-28 h-28" onClick={handleImageClick}/>

          <h6 className="text-lg text-slate-500 my-3">{imgUploadMsg}</h6>
        </div>

      </div>

      <form onSubmit={handleFormSubmit} className="flex  flex-col gap-5 p-3">
        <input type="text" name="username" id="username" placeholder="username" className="p-3 rounded-lg text-lg" defaultValue={currentUser.username} onChange={handleFieldChange}/>

        <input type="email" name="email" id="email" placeholder="email" className="p-3 rounded-lg text-lg"
        defaultValue={currentUser.email}  onChange={handleFieldChange}/>

        <input type="password" name="password" id="password" placeholder="password" className="p-3 rounded-lg text-lg" onChange={handleFieldChange}/>

        <button className="bg-slate-600 rounded-lg p-3 text-white text-lg uppercase font-semibold hover:opacity-80 disabled:opacity-50">update</button>

        <button onClick={handleCreateListing} type="button" className="bg-green-600 rounded-lg p-3 text-white text-lg uppercase font-semibold hover:opacity-80 disabled:opacity-50">create listing</button>

        <div className="flex justify-between">
          <button type="button" className="bg-slate-600 rounded-lg py-3 px-5 text-center text-white text-lg uppercase font-semibold hover:opacity-80 disabled:opacity-50" onClick={deleteUserProfile}>Delete Account</button>

          <button type="button" className="bg-slate-600 rounded-lg py-3 px-5 text-center text-white text-lg uppercase font-semibold hover:opacity-80 disabled:opacity-50" onClick={signOutUser}>Sign Out</button>
        </div>

      
      </form>

      {loading && loadingMsg()}
      {error && errorMsg(error)}
      {success && successMsg(success)}

    </div>
  )
}

export default Profile