import React, { useContext } from 'react'
import { AuthContext } from '../context/authContext'

const HomePage = () => {
    const { user } = useContext(AuthContext)
    return (
        <div>
            <h1>Page accueil</h1>
            {
                user ?
                    <>
                        <p>{user.email} est connecté</p>
                    </>
                    :
                    <>
                        ...
                    </>
            }
        </div>
    )
}

export default HomePage
