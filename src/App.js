import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Navbar from "./components/Navbar";
import NoteState from "./context/notes/NoteState";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Alert from "./components/Alert";
import { useState } from "react";

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar showAlert={showAlert} />
          <Alert alert={alert} />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <div className="container">
                  <Home showAlert={showAlert} />
                </div>
              }
            />
            <Route exact path="/about" element={<About />} />
            <Route
              exact
              path="/login"
              element={<Login showAlert={showAlert} />}
            />
            <Route
              exact
              path="/signup"
              element={<Signup showAlert={showAlert} />}
            />
          </Routes>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
