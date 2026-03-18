import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import "./register.css"

export const Register = () => {
    const navigate = useNavigate();
    return (
        <div className='login-page'>
            <form className="login-form" onSubmit={
                async (event) => {
                    event.preventDefault()
                    const creds = {
                        user: event.target.user.value,
                        pass: event.target.pass.value
                    }
                    const urlRegister = `/api/auth/register`
                    const options = {
                        method: 'POST',
                        credentials: 'include',
                        headers: { 'Content-Type': 'Application/JSON' },
                        body: JSON.stringify(creds)
                    }
                    event.target.reset()
                    fetch(urlRegister, options)
                    .then(res => {
                        res.ok? navigate("/login") : null
                    });
                }
            }>
                <h1> Register </h1>
                <input className='login-input' name='user' type='text' placeholder='Username' autoComplete='off'/>
                <input className='login-input' name='pass' type='password' placeholder='Password'/>
                <input className='login-submit' type='submit' value='Enter'/>
            </form>
        </div>
    );
}

export default Register;