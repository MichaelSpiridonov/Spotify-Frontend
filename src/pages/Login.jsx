import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'

import { userService } from '../services/user'
import { login } from '../store/actions/user.actions'

export function Login() {
  const [users, setUsers] = useState([])
    const [credentials, setCredentials] = useState({ username: '', password: '', fullname: '' })

    const navigate = useNavigate()

    useEffect(() => {
        loadUsers()
    }, [])

    async function loadUsers() {
        const users = await userService.getUsers()
        setUsers(users)
    }

    async function onLogin(ev = null) {
        if (ev) ev.preventDefault()

        if (!credentials.username) return
        await login(credentials)
        navigate('/')
    }

    function handleChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials({ ...credentials, [field]: value })
    }
  return (
    <section className='login-overlay'>
    <form className="login-container-wrapper" onSubmit={onLogin}>
    <div className="login-container">
      <img src="src/assets/icons/beatify_favicon_32.png" alt="Beatify Logo"/> 
      <h1>Log in to Beatify</h1>
      <div className="login-form">
        <input name="username" type="text" placeholder="Email or username" onChange={handleChange} value={credentials.username} />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} value={credentials.password} />
      </div>
      <div className="login-btn">
      <button className="login-button">Log In</button>
      </div>
      <a href="#" className="forgot-password">
        Forgot your password?
      </a>
      <a href="#" className="signup-link">
        Don't have an account? Sign up for Beatify
      </a>
    </div>
    </form>
    </section>
  )
}
