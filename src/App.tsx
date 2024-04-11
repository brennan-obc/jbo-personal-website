/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Background from "./components/Background";
import "./styles/App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Background />
      <BrowserRouter>
        <div className='relative min-h-screen'>
          <div className='relative z-10'>
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
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
