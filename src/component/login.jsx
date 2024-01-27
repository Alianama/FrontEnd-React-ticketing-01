// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const KEYSTORAGE = "KEYSTORAGE";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Memeriksa apakah KEYSTORAGE ada di sessionStorage
    if (localStorage.getItem(KEYSTORAGE) !== null) {
      // Jika tidak ada, arahkan ke halaman login
      navigate("/");
    }
  }, [navigate]); // Gunakan array kosong untuk memastikan efek hanya dijalankan sekali setelah mounting

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        const session = [
          {
            username: username,
            password: password,
            session: 1,
          },
        ];
        const stringSession = JSON.stringify(session);
        localStorage.setItem(KEYSTORAGE, stringSession);

        navigate("/");
      } else {
        console.error(`Error: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };

  const homeStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: "50px",
    color: "Black",
    borderRadius: "30px",
  };

  const inputStyle = {
    width: "100%",
    height: "30px",
    backgroundColor: "black",
    border: "none",
    padding: "5px",
    paddingLeft: "10px",
    borderRadius: "10px",
  };

  return (
    <div style={homeStyle}>
      <h2>Login</h2>

      <input
        style={inputStyle}
        placeholder="Username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <br />

      <input
        style={inputStyle}
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
