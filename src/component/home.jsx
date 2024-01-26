// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
const KEYSTORAGE = "KEYSTORAGE";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Memeriksa apakah KEYSTORAGE ada di sessionStorage
    if (sessionStorage.getItem(KEYSTORAGE) === null) {
      // Jika tidak ada, arahkan ke halaman login
      navigate("/login");
    }
  }, []); // Gunakan array kosong untuk memastikan efek hanya dijalankan sekali setelah mounting
  const logout = () => {
    sessionStorage.removeItem(KEYSTORAGE);
    navigate("/login");
  };

  return (
    <div>
      <h2>Home</h2>
      <button onClick={logout}>logout</button>
    </div>
  );
};

export default Home;
