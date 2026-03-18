import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../contexts/userSlice';

import "./login.css"

export const Login = () => {
    const dispatch = useDispatch();
    return (
        <div className='login-page'>
            <form className="login-form" onSubmit={
                async (event) => {
                    event.preventDefault()
                    const result = await dispatch(loginUser({ 
                        user: event.target.user.value, 
                        pass: event.target.pass.value
                    }));
                    event.target.reset()
                }
            }>
                <h1> Login </h1>
                <input className='login-input' name='user' type='text' placeholder='Username' autoComplete='off'/>
                <input className='login-input' name='pass' type='password' placeholder='Password'/>
                <input className='login-submit' type='submit' value='Enter'/>
            </form>
        </div>
    );
}

export default Login;