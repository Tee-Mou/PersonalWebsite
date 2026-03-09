import { login } from "../actions/loginSlice"
import { useDispatch, useSelector } from "react-redux";
import { useSelector } from 'react-redux'
import { selectUser, selectUserPerms } from '../actions/loginSlice';

const idPlaceholderMap = {
  "user": "Username",
  "pass": "Password"
}

const LoginForm = () => {
  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    event.preventDefault();
    var userData = {
      user: event.target.user.value,
      pass: event.target.pass.value
    }
    var form = document.getElementsByClassName("login_form")[0];
    form.reset();
    const url = "http://10.253.13.197:5050/api/users/login"
    const options = {
      method: 'POST',
      headers: {
      "Content-Type": "Application/JSON",
      },
      body: JSON.stringify(userData)
    };
    fetch(url, options)
    .then((response) => {
      if (response.status === 200) {
        response.json()
        .then((r) => {
          var stateData = {
            user: r.user,
            perms: r.perms
          }
          dispatch(login(stateData));
        })
      }
    });
  }
  const username = useSelector(selectUser);
  const perms = useSelector(selectUserPerms);

  return (
    <div>
       <h1> {perms == null ? `Hey! We haven't met yet...` : `Welcome back ${username}!`} </h1>
      <form className='login_form' onSubmit={handleSubmit}>
        <LoginInput id='user'/>
        <LoginInput id='pass'/>
        <input className='login_submit' type='submit' value='Enter'/>
      </form>
    </div>
  )
}

function LoginInput({id}) {
  return (
    <input type='text' 
    className='login_input' 
    id={id} 
    placeholder={idPlaceholderMap[id]} 
    autoComplete="off" />
  )
}

export function requestLogout() {
    useDispatch(logout(creds))
}

export default LoginForm