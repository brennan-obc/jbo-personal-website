// import React from 'react'
import "../styles/App.scss";

function About() {
  return (
    <div className='container mx-auto'>
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
    </div>
  );
}

export default About;
