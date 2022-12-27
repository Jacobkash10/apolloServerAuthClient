import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useForme } from "../utility/hooks";
import { useMutation } from "@apollo/react-hooks";

import { gql } from "graphql-tag";
import { useNavigate } from "react-router-dom";

const REGISTER_USER = gql`
    mutation Mutation(
        $registerInput: RegisterInput) {
        registerUser( registerInput: $registerInput)
         {
            email
            username
            token
        }
    }
`

function Register(props) {
    const context = useContext(AuthContext)
    let navigate = useNavigate()
    const [errors, setErrors] = useState([])

    function registerUserCallback() {
        console.log("Callback hit");
        registerUser()
    }

    const { onChange, onSubmit, values } = useForme(registerUserCallback, {
        username: '',
        email: '',
        password: ''
    })

    const [registerUser, { loading }] = useMutation(REGISTER_USER, {
        update(proxy, { data: { registerUser: userData } }) {
            context.login(userData)
            navigate('/')
        },
        onError({ graphQLErrors }) {
            setErrors(graphQLErrors)
        },
        variables: { registerInput: values }
    })

    return (
        <div>
            <div>
                <h2>Register</h2>
                <div>
                    <form>
                        <div>
                            <label htmlFor="">Name</label><br />
                            <input type="text" name="username" onChange={onChange} />
                        </div>
                        <div>
                            <label htmlFor="">Email</label><br />
                            <input type="text" name="email" onChange={onChange} />
                        </div>
                        <div>
                            <label htmlFor="">Password</label><br />
                            <input type="password" name="password" onChange={onChange} />
                        </div>
                        {errors?.map(function (error) {
                            return (
                                error.message
                            )
                        })}
                        <button type="submit" onClick={onSubmit}>Register</button>
                    </form>
                </div>
            </div>
        </div >
    )
}

export default Register