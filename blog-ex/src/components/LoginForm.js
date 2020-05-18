import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
    handleLogin,
    username,
    setUsername,
    password,
    setPassword
}) => {
    return (
        <div>
            <form onSubmit={handleLogin}>
                <div>username &nbsp;
                    <input
                        id="loginUsername"
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>

                <div>password &nbsp;
                    <input
                        id="loginPassword"
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit" id="blogSubmitButton">login</button>
            </form>
        </div>
    )
}

LoginForm.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    setUsername: PropTypes.func.isRequired,
    password: PropTypes.string.isRequired,
    setPassword: PropTypes.func.isRequired
}

export default LoginForm