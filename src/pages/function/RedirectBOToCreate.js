import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const RedirectBOToCreate = () => {
    const { userInfo } = useSelector(state => state.boAuth);
    const navigate = useNavigate()

    if(!userInfo?.businessInfo) {
        navigate("/bo/create/")
    }
}

export default RedirectBOToCreate