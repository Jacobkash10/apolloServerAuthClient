import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from "../context/authContext";
import './navbar.css'

const Navbar = () => {

    let navigate = useNavigate()
    const { user, logout } = useContext(AuthContext)

    const onLogout = () => {
        logout()
        navigate('/')
    }

    console.log(user);

    return (
        <div>
            <nav>
                <div>
                    <li>
                        <Link to="/" style={{ textDecoration: "none", color: "black" }} ><h4>React Login </h4></Link>
                    </li>
                </div>

                <div className='right'>
                    {
                        user ?
                            <>
                                <button onClick={onLogout} style={{ textDecoration: "none", color: "black" }} >Logout</button>
                            </>
                            :
                            <>
                                <Link to="/login" style={{ textDecoration: "none", color: "black", marginRight: "10px" }} ><h4>Login</h4></Link>
                                <Link to="/register" style={{ textDecoration: "none", color: "black" }} ><h4>Register</h4></Link>
                            </>
                    }
                </div>
            </nav>
        </div>
    )
}

export default Navbar
