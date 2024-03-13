import { Link } from "react-router-dom";
import "../styles/App.css";

function Home() {
  return (
    <div className='home'>
      <h1>Welcome to My Zone!</h1>
      {/* <p>Who let me get here?</p> */}
      <p>This is a brief introduction to who I am and what I do.</p>
      <div className='links'>
        <Link to='about'>About Me</Link>
        <Link to='projects'>Projects</Link>
        <Link to='resume'>Resume</Link>
        <Link to='contact'>Contact</Link>
      </div>
    </div>
  );
}

export default Home;
