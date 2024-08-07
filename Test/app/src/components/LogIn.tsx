"use client";
import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useRouter } from "next/navigation";

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "black",
  },
  loginBox: {
    width: "400px",
    padding: "40px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
  },
  title: {
    marginBottom: "20px",
    textAlign: "center",
    color: "#333",
  },
  inputGroup: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    color: "#666",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    outline: "none",
  },
  captcha: {
    marginTop: "10px",
  },
  button: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#1890ff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  links: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  link: {
    color: "#1890ff",
    textDecoration: "none",
    fontSize: "14px",
  },
  error: {
    color: "red",
    marginTop: "10px",
    fontSize: "14px",
  },
};

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const router = useRouter();

  const validatePassword = (value: string) => {
    const lengthRequirement = /.{7,}/;
    const numberRequirement = /\d/;
    const lowercaseRequirement = /[a-z]/;
    const uppercaseRequirement = /[A-Z]/;
    const specialCharRequirement = /[!@#$%^&*()_+{}\[\]:;"'<>,.?/\\|`~]/;

    if (!lengthRequirement.test(value)) {
      return "Password must be at least 7 characters long.";
    }
    if (!numberRequirement.test(value)) {
      return "Password must contain at least one number.";
    }
    if (!lowercaseRequirement.test(value)) {
      return "Password must contain at least one lowercase letter.";
    }
    if (!uppercaseRequirement.test(value)) {
      return "Password must contain at least one uppercase letter.";
    }
    if (!specialCharRequirement.test(value)) {
      return "Password must contain at least one special character.";
    }
    return "";
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPassword(value);
    setPasswordError(validatePassword(value));
  };

  const handleCaptchaChange = (value: string | null) => {
    setCaptchaValue(value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // if (!captchaValue) {
    //   alert("Please complete the CAPTCHA");
    //   return;
    // }

    try {
      const response = await fetch("http://19.168.1.36:8080/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("===========>", data);

        // router.push("dashboard");
      } else {
        alert("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        <h2 style={styles.title}>Login</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Username</label>
            <input
              type="text"
              style={styles.input}
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              style={styles.input}
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
            />
            {passwordError && <div style={styles.error}>{passwordError}</div>}
          </div>
          {/* <div style={styles.inputGroup}>
            <label style={styles.label}>CAPTCHA</label>
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
              onChange={handleCaptchaChange}
            />
          </div> */}
          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>
        <div style={styles.links}>
          <a href="/forgot-password" style={styles.link}>
            Forgot Password?
          </a>
          <a href="/signup" style={styles.link}>
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
