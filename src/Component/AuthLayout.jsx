import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function AuthLayout({ children, authenticated=false }) {
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);


    useEffect(() => {
        if (authenticated && !authStatus) {
            navigate("/login");
        }
        else if (!authenticated && authStatus) {
            navigate("/");
        }
        setLoader(false);
    }, [authStatus])


    return loader ? <h1>...Loading</h1> : <>{children}</>
}

export default AuthLayout
