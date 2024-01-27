// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
const KEYSTORAGE = "KEYSTORAGE";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Memeriksa apakah KEYSTORAGE ada di sessionStorage
    if (localStorage.getItem(KEYSTORAGE) === null) {
      // Jika tidak ada, arahkan ke halaman login
      navigate("/login");
    }
  }, []); // Gunakan array kosong untuk memastikan efek hanya dijalankan sekali setelah mounting

  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
};

export default Dashboard;
