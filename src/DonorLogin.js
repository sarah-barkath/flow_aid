import React, { useState } from "react";
import { auth, db } from "./firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const DonorLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      if (email === "" || password === "") {
        setErrorMessage("Please fill in both fields.");
        return;
      }
      setErrorMessage(""); // Clear error message

      if (isRegister) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Save donor information in Firestore
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          email: user.email,
          role: "donor",
        });

        alert("Donor registered successfully!");
        navigate("/interactive-map"); // Redirect to the map page
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Donor logged in successfully!");
        navigate("/interactive-map"); // Redirect to the map page
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(error.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.form}>
        <h2 style={styles.heading}>{isRegister ? "Register as Donor" : "Donor Login"}</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}

        <button onClick={handleSubmit} style={styles.button}>
          {isRegister ? "Register" : "Login"}
        </button>

        <p onClick={() => setIsRegister(!isRegister)} style={styles.toggleText}>
          {isRegister ? "Already have an account? Login" : "New here? Register"}
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f4f4f9",
    padding: "0 20px",
  },
  form: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "400px",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ddd",
    fontSize: "16px",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  errorMessage: {
    color: "red",
    fontSize: "14px",
    textAlign: "center",
  },
  toggleText: {
    textAlign: "center",
    color: "#007BFF",
    cursor: "pointer",
    fontSize: "14px",
    marginTop: "10px",
  },
};

export default DonorLogin;
