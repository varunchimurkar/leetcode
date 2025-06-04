import React from "react";

import { userAuthStore } from "../store/useAuthStore";


const LogOutButton = ({children}) => {
    
    const {logout} = userAuthStore()

    const onLogOut = async() => {
        await logout()
    }
 
    return (
    <button className="btn btn-primary" onClick={onLogOut}>
            {children}
    </button>
  )
}

export default LogOutButton