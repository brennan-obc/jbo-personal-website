// import React from 'react'
import "../styles/App.css";

function About() {
  return (
    <div className='container mx-auto'>
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
    </div>
  );
}

export default About;
