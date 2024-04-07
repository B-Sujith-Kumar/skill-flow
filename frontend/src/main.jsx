import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import firebase from "firebase/compat/app";

const firebaseConfig = {
  apiKey: "AIzaSyBA1T5_keazds_16lXkUSYdJEF9m0FwHP4",
  authDomain: "internal-job-postings.firebaseapp.com",
  projectId: "internal-job-postings",
  storageBucket: "internal-job-postings.appspot.com",
  messagingSenderId: "289074953759",
  appId: "1:289074953759:web:004ce78ec4b69eb0789f2a",
};

firebase.initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
