import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAuth, 
    createUserWithEmailAndPassword, 
    signOut, 
    signInWithEmailAndPassword, 
    onAuthStateChanged, 
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";



  // Your web app's Firebase configurationsignIn
  const firebaseConfig = {
    apiKey: "AIzaSyAnCt6lyaFvXFt_Cy0x7bn7uqJgC3DPhpY",
    authDomain: "mealplanner-84727.firebaseapp.com",
    projectId: "mealplanner-84727",
    storageBucket: "mealplanner-84727.appspot.com",
    messagingSenderId: "658872106757",
    appId: "1:658872106757:web:386b2caa65d37e086b016c"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);



  //sign up
  const signupForm = document.querySelector("#signup-form");
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    //get user info
    const email = signupForm["signup-email"].value;
    const password = signupForm["signup-password"].value;
createUserWithEmailAndPassword(auth, email, password).then((userCredentials) => {
  //signed in
  const user = userCredentials.user;
  console.log(user);
  const modal = document.querySelector("#modal-signup");
  M.Modal.getInstance(modal).close();
  signupForm.reset();
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
});


//log out
const logout = document.querySelector("#logout");
logout.addEventListener("click", (e) => {
  e.preventDefault();
  signOut(auth).then(() => {
    console.log("Signed out");
  })
  .catch((error) => {
    //error handler
  });
});

//login
const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = loginForm["login-email"].value;
  const password = loginForm["login-password"].value;
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      const modal = document.querySelector("#modal-login");
      M.Modal.getInstance(modal).close();
      loginForm.reset();
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      //...
    });
});