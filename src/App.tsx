/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./page/Home";
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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
