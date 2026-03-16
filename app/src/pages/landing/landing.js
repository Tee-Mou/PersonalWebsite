import { useDispatch, useSelector } from "react-redux";
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom";

import { login, selectUser, selectUserPerms } from "../../contexts/loginSlice"
import "./landing.css"

const idPlaceholderMap = {
  "user": "Username",
  "pass": "Password"
}

const idLinkMap = {
  "gh": "https://github.com/Tee-Mou",
  "li": "https://linkedin.com/in/tennyson-morris"
}

function PersonalLink({id}) {
  return (
    <a className='link_btn' id={id} href={idLinkMap[id]}/>
  );
}

function handleClick() {
  const url = `/api/users`
  fetch(url, {
    method: 'GET',
    credentials: 'include' })
  .then((r) => console.log(r))
}

export function LandingForm() {
  const username = useSelector(selectUser);
  const perms = useSelector(selectUserPerms);
  switch (perms) {
    case null:
      return <LoginForm invalidAttempt="false"/>
    case "guest":
      return <p> Hey Guest </p>
    case "admin":
      return (
        <div>
          <p> Welcome back {username} </p>
          <Link to="/gallery">Gallery</Link>
          <button className="button" id="butut" onMouseDown={handleClick}/>
        </div>
      )
    default:
      return (
        <div>  
          <LoginForm invalidAttempt="true" />
          <button className="button" id="butut" onMouseDown={handleClick}/>
        </div>
      )
  }
}

function LoginForm ({ invalidAttempt }) {
  const username = useSelector(selectUser);
  const perms = useSelector(selectUserPerms);

  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    event.preventDefault();
    var userData = {
      user: event.target.user.value,
      pass: event.target.pass.value
    }
    var form = document.getElementsByClassName("login_form")[0];
    form.reset();
    const url = `/api/auth/login`
    const options = {
      method: 'POST',
      credentials: 'include',
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
          console.log(r.message)
          dispatch(login(r));
        })
      }
    });
  }
  return (
    <div>
       <h1> {(invalidAttempt === "false") ?  "Hey! We haven't met yet..." : "Sorry, you entered the wrong username or password!"} </h1>
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

function LandingPage() {
  return (
    <div className="content">
      <LandingForm/>
      <p>Check out what I've been doing:</p>
      <div className="links_row1">
        <PersonalLink 
        id="gh"/>
        <PersonalLink 
        id="li"/>
      </div>
      
    </div>
  );
};

export default LandingPage