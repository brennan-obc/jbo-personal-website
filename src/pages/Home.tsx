// import { Link } from "react-router-dom";
import "../styles/App.css";

function Home() {
  return (
    <div className='container mx-auto'>
      <section
        id='home'
        className='snap-center h-screen'
      >
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
      </section>
    </div>
  );
}

export default Home;
