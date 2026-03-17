import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import "./register.css"

export const Register = () => {
    const navigate = useNavigate();
    return (
        <div className='content'>
            <h1> Register </h1>
            <form className="login_form" onSubmit={
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
                <input className='login_input' name='user' type='text' placeholder='Username' autoComplete='off'/>
                <input className='login_input' name='pass' type='password' placeholder='Password'/>
                <input className='login_submit' type='submit' value='Enter'/>
            </form>
        </div>
    );
}

export default Register;