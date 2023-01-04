  // Import the functions you need from the SDKs you need

    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
    import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";

    import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
    import {getDatabase, ref, set, update, child, get, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

    const firebaseConfig = {
        apiKey: "AIzaSyCL58GYKI97YFdpJseNOnUmDpp4YPp1dCQ",
        authDomain: "fusion-360-cuisine.firebaseapp.com",
        projectId: "fusion-360-cuisine",
        storageBucket: "fusion-360-cuisine.appspot.com",
        messagingSenderId: "477691509900",
        appId: "1:477691509900:web:5aa146a0ab8f38cd484fa9",
        measurementId: "G-6MG2F9352K"
    };
    
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    
    // Initialize Auth
    const auth = getAuth();
    
    // Initialize Database
    const db = getDatabase(app);

// ---------------------// Get reference values -----------------------------

let userLink = document.getElementById("userLink");
let signOut = document.getElementById("signOut");
let welcome = document.getElementById("welcome");
let signedIn = document.getElementById("signedIn");
let empty = document.getElementById("empty");
let currentUser = null;

