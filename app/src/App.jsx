import { use } from 'react';
import './App.css';

const idLinkMap = {
  "gh": "https://github.com/Tee-Mou",
  "li": "https://linkedin.com/in/tennyson-morris"
}
const idPlaceholderMap = {
  "user": "Username",
  "pass": "Password"
}
var user = null;
var pass = null;
var loginSuccess = false;

function GuestGreeting() {
  return (
   <h1> Hey! We haven't met yet... </h1>
  )
}
function LoginGreeting() {
  return (
   <h1> Welcome back {user}! </h1>
  )
}

function Greeting() {
  if (loginSuccess) {
    return <LoginGreeting/>
  } else {
    return <GuestGreeting/>
  }
}

function PersonalLink({id}) {
  return (
    <a className='link_btn' id={id} href={idLinkMap[id]}/>
  );
}

function LoginInput({id}) {
  return (
    <input type='text' className='login_input' id={id} placeholder={idPlaceholderMap[id]}/>
  )
}

function LoginForm() {
  return (
    <form className='login_form'>
      <LoginInput id='user'/>
      <LoginInput id='pass'/>
      <input className='login_submit' type='submit' value='Enter'/>
    </form>
  )
}

const App = () => {
  return (
    <div className="content">
      <Greeting/>
      <p>Check out what I've been doing:</p>
      <div className="links_row1">
        <PersonalLink 
        id="gh"/>
        <PersonalLink 
        id="li"/>
      </div>
      
      <LoginForm/>
    </div>
  );
};

export default App;