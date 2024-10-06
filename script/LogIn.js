import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// LogIn.js
const firebaseConfig = {
  apiKey: "AIzaSyDMvCCl5bXh2wWMBoBz-ZysGWrYfl7Us8o",
  authDomain: "fir-auth-project-f36df.firebaseapp.com",
  projectId: "fir-auth-project-f36df",
  storageBucket: "fir-auth-project-f36df.appspot.com",
  messagingSenderId: "711666172175",
  appId: "1:711666172175:web:0c7c6d5c91332e95ac3e7a",
  measurementId: "G-YCY0CWD6FQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    console.log("Form submitted");
    function isInvalidEmail(email) {
      // Regular expression to validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      // Test the email against the regex
      return !emailRegex.test(email);
    }

    if (email === "" || password === "") {
      console.log("Empty fields");
      alert("Please fill in both fields.");
    } else if (!isValidEmail(email)) {
      console.log("Invalid email");
      alert("You entered an invalid email!");
    } else {
      console.log("Attempting to sign in");
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

          alert(errorMessage);
        });
    }
  });

console.log("Firebase initialized");
