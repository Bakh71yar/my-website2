import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDMvCCl5bXh2wWMBoBz-ZysGWrYfl7Us8o",
  authDomain: "fir-auth-project-f36df.firebaseapp.com",
  projectId: "fir-auth-project-f36df",
  storageBucket: "fir-auth-project-f36df",
  messagingSenderId: "711666172175",
  appId: "1:711666172175:web:0c7c6d5c91332e95ac3e7a",
  measurementId: "G-YCY0CWD6FQ",
};

const app = initializeApp(firebaseConfig);
const auth2 = getAuth(app);
const provider = new GoogleAuthProvider();

const form = document.querySelector("#loginForm");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const confirmInput = document.querySelector("#confirm-password");
const googleSignInButton = document.querySelector("#google-signin-button");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = emailInput.value;
  const password = passwordInput.value;
  const confirmPassword = confirmInput.value;

  if (password !== confirmPassword) {
    alert("Passwords must be identical!");
  } else {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth2,
        email,
        password
      );
      alert("You successfully registered!");
    } catch (e) {
      console.error(e.message);
      alert("Something went wrong");
    }
  }
});

googleSignInButton.addEventListener("click", () => {
  signInWithPopup(auth2, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      localStorage.setItem("google-token", token);
      // The signed-in user info.
      const user = result.user;
      alert(`Signed in as ${user.displayName}`);
      // IdP data available using getAdditionalUserInfo(result)
    })
    .catch((error) => {
      // Handle Errors here.
      console.error(error.message);
      alert("Something went wrong with Google Sign In");
    });
});
