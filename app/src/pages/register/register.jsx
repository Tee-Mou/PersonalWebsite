import { useDispatch, useSelector } from 'react-redux';

import "./register.css"

export const Register = () => {
    const dispatch = useDispatch();
    return (
        <div className='content'>
            <h1> Register </h1>
            <form className="login_form" onSubmit={
                async (event) => {
                    event.preventDefault()
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

export default Register;