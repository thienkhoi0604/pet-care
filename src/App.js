import "./App.css";
import Login from "./components/pages/Login/Login";
import NotFound from "./components/pages/NotFound/NotFound";
import Signup from "./components/pages/Signup/Signup";
import HomePage from "./components/pages/Home/Home";
import ListGroup from "./components/ListGroup/ListGroup";

import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CreateGroup from "./components/CreateGroup/CreateGroup";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const queryClient = new QueryClient();

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState("");
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const url = "http://localhost:3001/";
    const result = axios.get(url).then((res) => setUserList(res.data));
    console.log(result);
  }, []);

  const onChangeLogin = (value) => {
    setIsLogin(value);
  };
  const getUser = (user) => {
    setUser(user);
  };

  console.log(user);
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route
              path="/signup"
              element={
                !isLogin ? (
                  <Signup getUser={getUser} onLogin={onChangeLogin} />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route path="/newgroup" element={<CreateGroup />} />
            <Route path="/list" element={<ListGroup />} />
            {!isLogin ? (
              <Route
                exact
                path="/"
                element={<Login getUser={getUser} onLogin={onChangeLogin} />}
              />
            ) : (
              <Route
                exact
                path="/"
                element={
                  <HomePage
                    usersList={userList}
                    user={user}
                    onLogout={onChangeLogin}
                  />
                }
              />
            )}

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
