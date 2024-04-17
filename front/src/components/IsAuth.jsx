import React, { Component } from 'react'
import {Route, Navigate} from "react-router-dom";



const getAuth = () => {
  return localStorage.getItem('isAuth');
}
console.log(typeof getAuth);
export const isAuth = ({component: Component}) => {
    return getAuth() ? <Component /> : <Navigate to="/loginSignup"/>
}

export default isAuth