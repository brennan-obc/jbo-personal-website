// import React from 'react'
import "../styles/App.css";

function Projects() {
  return (
    <div className='container mx-auto'>
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
    </div>
  )
}

export default Projects