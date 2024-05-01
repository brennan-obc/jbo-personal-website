/* eslint-disable @typescript-eslint/no-unused-vars */
// import { useState, useRef } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Background from "./components/Background";
import Navbar from "./components/Navbar";
import Resume from "./pages/Resume";
import "./styles/global.scss";
import "./styles/variables.scss";
import "./styles/App.scss";

function App() {
  // const testImage = "/assets/test_image.jpg";
  // const testImage = "/media/documents/jboc_resume-img.png";

  return (
    <div className='pageContainer'>
      <BrowserRouter>
        <Background />
        <Navbar />
        {/* <img
          src={testImage}
          alt='Test Image'
          style={{
            width: "100%",
            height: "auto",
            position: "absolute",
            top: 0,
            zIndex: 999,
          }}
        /> */}
        <div>
          <Routes>
            <Route
              path='/'
              element={<Home />}
            />
            <Route
              path='/about'
              element={<About />}
            />
            <Route
              path='/contact'
              element={<Contact />}
            />
            <Route
              path='/projects'
              element={<Projects />}
            />
            <Route
              path='/resume'
              element={<Resume />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
