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
    if (sessionStorage.getItem(KEYSTORAGE) !== null) {
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
        sessionStorage.setItem(KEYSTORAGE, stringSession);

        navigate("/");
      } else {
        console.error(`Error: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>

      <br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
