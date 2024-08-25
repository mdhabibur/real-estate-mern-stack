import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const PrivateRoute = ({children}) => {

    const {currentUser} = useSelector((state) => state.auth)


    let componentToRender

    if(currentUser){
        componentToRender = children
    }else {
        componentToRender = <Navigate to='/signin' />
    }

  return componentToRender
  
}

export default PrivateRoute