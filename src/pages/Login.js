import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useForme } from "../utility/hooks";
import { useMutation } from "@apollo/react-hooks";

import { gql } from "graphql-tag";
import { useNavigate } from "react-router-dom";

const LOGIN_USER = gql`
    mutation Mutation($loginInput: LoginInput) {
  loginUser(loginInput: $loginInput) {
    email
    password
  }
}
`

function Login(props) {
    let navigate = useNavigate()
    const context = useContext(AuthContext)
    const [errors, setErrors] = useState([])

    function loginUserCallback() {
        loginUser()
    }

    const { onChange, onSubmit, values } = useForme(loginUserCallback, {
        email: '',
        password: ''
    })

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(proxy, { data: { loginUser: userData } }) {
            context.login(userData)
            navigate('/')
        },
        onError({ graphQLErrors }) {
            setErrors(graphQLErrors)
        },
        variables: { loginInput: values }
    })

    return (
        <div>
            <h2>Login</h2>
            <div>
                <form>
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
                    <button type="submit" onClick={onSubmit}>Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login