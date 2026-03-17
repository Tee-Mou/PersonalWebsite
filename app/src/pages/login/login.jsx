import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../contexts/userSlice';

import "./login.css"

export const Login = () => {
    const dispatch = useDispatch();
    return (
        <div className='content'>
            <h1> Login </h1>
            <form className="login_form" onSubmit={
                async (event) => {
                    event.preventDefault()
                    const result = await dispatch(loginUser({ 
                        user: event.target.user.value, 
                        pass: event.target.pass.value
                    }));
                    event.target.reset()
                }
            }>
                <input className='login_input' name='user' type='text' placeholder='Username' autoComplete='off'/>
                <input className='login_input' name='pass' type='password' placeholder='Password'/>
                <input className='login_submit' type='submit' value='Enter'/>
            </form>
        </div>
    );
}

export default Login;