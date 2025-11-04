import React, { useState } from "react";

const ForgotPassword = () => {
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password1 !== password2) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      // jeśli masz backend PHP, możesz to potem podpiąć pod API
      const response = await fetch("/reset_password_handler.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          password1,
          password2,
        }),
      });

      if (response.ok) {
        setMessage("Password successfully changed!");
      } else {
        setMessage("An error occurred. Try again.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Connection error.");
    }
  };

  return (
    <div id="reset_password_page" className="flex-row-center-center">
      <div className="container">
        <img src="/images/logo.svg" alt="logo" className="logo" />

        <div className="content flex-column-center-center">
          <h1>RESET PASSWORD</h1>
          <h2>Forgotten password? No worries!</h2>

          <form
            className="reset-password-form flex-column-center-center"
            onSubmit={handleSubmit}
          >
            <h3>Enter new password:</h3>

            <div className="whole-input">
              <i className="icon fa-solid fa-door-open"></i>
              <input
                type="password"
                id="password1"
                name="password1"
                placeholder="password"
                value={password1}
                onChange={(e) => setPassword1(e.target.value)}
                required
              />
            </div>

            <h3>Enter new password again:</h3>

            <div className="whole-input">
              <i className="icon fa-solid fa-door-open"></i>
              <input
                type="password"
                id="password2"
                name="password2"
                placeholder="password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                required
              />
            </div>

            <button type="submit">
              <i>CONTINUE</i>
            </button>

            <div className="links">
              <a href="/login">Back</a>
            </div>

            {message && <p className="messages">{message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
