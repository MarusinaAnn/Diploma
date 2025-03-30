import React, { useState } from "react";
import axios from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/login/", {
        username,
        password,
      });

      localStorage.setItem("token", res.data.token);
      axios.defaults.headers.common["Authorization"] = `Token ${res.data.token}`;

      toast.success(`С возвращением, ${res.data.username}!`);
      navigate("/storage");
    } catch (err: any) {
      if (err.response && err.response.status === 400) {
        toast.error("Неверный логин или пароль");
      } else {
        toast.error("Ошибка при авторизации");
      }
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-box">
        <h2>Вход</h2>
        <form onSubmit={handleSubmit}>
          <label>Логин</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label>Пароль</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Войти</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
