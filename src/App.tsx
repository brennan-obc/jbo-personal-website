/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
// import About from "./pages/About";
// import Contact from "./pages/Contact";
// import Projects from "./pages/Projects";
// import Resume from "./pages/Resume";
import "./styles/App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={<Home />}
          />
          {/* <Route path="/about" element={<About />} /> */}
          {/* <Route path="/contact" element={<Contact />} /> */}
          {/* <Route path="/projects" element={<Projects />} /> */}
          {/* <Route path="/resume" element={<Resume />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
