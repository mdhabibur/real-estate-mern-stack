import React, { useEffect, useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { signInUser } from "../../redux/auth/authApi";
import { errorMsg, loadingMsg, successMsg } from "../../utils/messages";
import { setTimerOff } from "../../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";

const GoogleAuth = () => {
	const { loading, error, success, currentUser } = useSelector(
		(state) => state.auth
	);

	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
		avatar: "",
	});

	const dispatch = useDispatch();
    const navigate = useNavigate()

	const handleGoogleAuth = async (e) => {
		try {
			const result = await signInWithPopup(auth, googleProvider);
			console.log("google auth: ", result);

			setFormData({
				...formData,
				username: result.user.displayName,
				email: result.user.email,
				avatar: result.user.photoURL,
			});

		} catch (error) {
			console.error("Google Sign-In Error: ", error);
		}
	};


    useEffect(() => {

        if (formData.email) {

            console.log("signInUser is dispatched");

            dispatch(
                signInUser({
                    url: "/api/user/auth/google-auth-sign",
                    formData: formData,
                })
            );
            
        }

    }, [formData.email])


    useEffect(() => {
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

        //clear timer on unmount
        return () => clearTimeout(timer)

    }, [error, success])

	return (
		<>
			<button
				onClick={handleGoogleAuth}
				type="button"
				className="bg-red-600 uppercase p-3 rounded-lg text-white font-semibold text-lg hover:opacity-80 disabled:opacity-50"
			>
				continue with google
				{console.log("fromData: ", formData)}
			</button>

            {loading && loadingMsg()}
            {error && errorMsg(error)}
            {success && successMsg(success)}


		</>
	);
};

export default GoogleAuth;
