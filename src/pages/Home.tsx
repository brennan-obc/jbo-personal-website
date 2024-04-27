import { Link } from "react-router-dom";
import "../styles/App.scss";

function Home() {
  return (
    <div className='container min-h-screen min-w-max'>
      <div className='container mx-auto'>
        <div id='nav'>
          <Link to='/about'>About</Link>
          <Link to='/projects'>Projects</Link>
          <Link to='/contact'>Contact</Link>
        </div>
        <h1>Home</h1>
        <div id='greeting'>
          <p>greeting</p>
        </div>
        <div id='portrait'>
          <p>portrait</p>
        </div>
        <div id='intro'>
          <p>intro</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
