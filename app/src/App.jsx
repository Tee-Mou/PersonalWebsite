import { useSelector } from 'react-redux'
import LoginForm from './utils/Login';
import { selectUser, selectUserPerms } from './actions/loginSlice';
import "./App.css"

const idLinkMap = {
  "gh": "https://github.com/Tee-Mou",
  "li": "https://linkedin.com/in/tennyson-morris"
}

function PersonalLink({id}) {
  return (
    <a className='link_btn' id={id} href={idLinkMap[id]}/>
  );
}

const App = () => {
  return (
    <div className="content">
      <LoginForm/>
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

export default App;