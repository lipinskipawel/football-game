import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();

  const onKeyUp = (e) => {
    e.preventDefault();
    setNickname(e.target.value);
    if (e.key === "Enter") {
      navigate("/");
    }
  };

  return (
    <div className="login-page">
      <h2>Login form</h2>
      <input
        placeholder={nickname || "Enter your nickname"}
        onKeyUp={onKeyUp}
        autoFocus
      />
    </div>
  );
};

export default Login;