/* eslint-disable @typescript-eslint/no-unused-vars */
// import { useState, useRef } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Background from "./components/Background";
import Navbar from "./components/Navbar";

import "./styles/App.css";

function App() {
  // const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <div>
      <BrowserRouter>
        <Background />
        <Navbar />
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
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
