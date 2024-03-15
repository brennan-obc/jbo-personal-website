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
      <section
        id='about'
        className='snap-center h-screen'
      >
        <h1>About</h1>
        <div id='elevator-pitch'>
          <p>elevator pitch</p>
        </div>
        <div id='overview'>
          <div id='resume'>
            <p>resume</p>
          </div>
          <div id='social-icons'>
            <p>social icons</p>
          </div>
        </div>
      </section>
      <section
        id='portfolio'
        className='snap-center h-screen'
      >
        <h1>Projects</h1>
        <div id='projects-professional'>
          <div className='portfolio-project'>
            <div className='project-about'>
              <p>project: about</p>
            </div>
            <div className='project-image'>
              <p>project: image</p>
            </div>
            <div className='project-testimonial'>
              <p>project: testimonial</p>
            </div>
          </div>
        </div>
        <div id='projects-personal'>
          <div className='portfolio-project'>
            <div className='project-about'>
              <p>project: about</p>
            </div>
            <div className='project-image'>
              <p>project: image</p>
            </div>
          </div>
        </div>
        <div id='projects-planned'>
          <div className='bullet-list'>
            <p>planned projects: list</p>
          </div>
        </div>
      </section>
      <section
        id='contact'
        className='snap-center h-screen'
      >
        <h1>Contact</h1>
        <div className='call-to-action'>
          <p>call to collaborate</p>
        </div>
        <div id='contact-card'>
          <p>contact card</p>
        </div>
      </section>
    </div>
  );
}

export default Home;
