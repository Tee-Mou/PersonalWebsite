import './App.css';

function Button({ id, link }) {
  const handleClick = () => {
    window.open(link);
  };
  return (
    <button 
    className='link_btn'
    id={id}
    onClick = {handleClick}>
    </button>
  );
}

const App = () => {
  return (
    <div className="content">
      <h1>Lemonade</h1>
      <p>Check out what I've been doing.</p>
      <div className="links_row1">
        <Button 
        id="gh"
        link="https://github.com/Tee-Mou"/>
        <Button 
        id="li"
        link="https://linkedin.com/in/tennyson-morris"/>
      </div>
    </div>
  );
};

export default App;
