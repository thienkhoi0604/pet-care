import "./App.css";
import Login from "./components/pages/Login/Login";
import NotFound from "./components/pages/NotFound/NotFound";
import Signup from "./components/pages/Signup/Signup";
import HomePage from "./components/pages/Home/Home";

import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    const url = "http://localhost:3001/";
    const fetchData = async () => {
      try {
        const result = await axios.get(url);
        setUsersList(result.data);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  const onChangeLogin = (value) => {
    setIsLogin(value);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route
            path="/signup"
            element={
              !isLogin ? (
                <Signup onLogin={onChangeLogin} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          {!isLogin ? (
            <Route
              exact
              path="/"
              element={<Login usersList={usersList} onLogin={onChangeLogin} />}
            />
          ) : (
            <Route
              exact
              path="/"
              element={<HomePage users={usersList} onLogout={onChangeLogin} />}
            />
          )}

          <Route path="*" element={<NotFound />} />
        </Routes>
        {/* <Login /> */}
        {/* <Signup /> */}
        {/* <NotFound /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
