// ----------------- Page Loaded After User Sign-in -------------------------//

// ----------------- Firebase Setup & Initialization ------------------------//

  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  import {getAuth, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
  import {getDatabase, ref, set, update, child, get, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

let currentUser = null;
let welcome_message = document.getElementById("welcome-message");
let end = document.getElementById("end");

// ----------------------- Get User's Name'Name ------------------------------

function getUsername() {
  // Get the user's name from storage
  let keepLoggedIn = localStorage.getItem("keepLoggedInSwitch");
  // If the user's name is not in storage, get it from session storage
  if (keepLoggedIn == "yes") {
    currentUser = JSON.parse(localStorage.getItem('user'))
  } else {
    currentUser = JSON.parse(sessionStorage.getItem('user'))
  }

  if (currentUser != null) currentUser = currentUser.accountInfo;
}

// All variables to get values of order form

lobster_bisque = document.getElementById("lobster-bisque");
lettuce_wraps = document.getElementById("lettuce-wraps");
poutine = document.getElementById("poutine");
asparagus = document.getElementById("asparagus");
salad = document.getElementById("salad");
burrito = document.getElementById("burrito");
paella = document.getElementById("paella");
fried_rice = document.getElementById("fried-rice");
injera = document.getElementById("injera");
ramen = document.getElementById("ramen");
baklava_brownies = document.getElementById("baklava-brownies");
mango_sticky_rice = document.getElementById("mango-sticky-rice");
cookies_and_cream_rasmalai = document.getElementById("cookies-and-cream-rasmalai");
coconut_milk_hot_chocolate = document.getElementById("coconut-milk-hot-chocolate");
chai_tea_pina_colada = document.getElementById("chai-tea-pina-colada");
peach_mango_blueberry_lemon_soda = document.getElementById("peach-mango-blueberry-lemon-soda");
email = document.getElementById("email");
phone = document.getElementById("phone");
order_name = document.getElementById("name");
apt_suite = document.getElementById("apt-suite");
address = document.getElementById("address");
town = document.getElementById("town");
state = document.getElementById("state");
zip = document.getElementById("zip");
order_notes = document.getElementById("order_notes");

// Detect when order form submit button is clicked and do this whole process with it

let orderSubmission = document.getElementById("order-form");
orderSubmission.addEventListener("submit", (e) => {
  e.preventDefault();
  
  
});



// Set Data

function defineOrder(date, phonenumber, emailaddress, ordernotes, fulfillmentstatus, userID){
  set(ref(db, `orders/${userID}`), {
    date: date,
    
  })
    .then(() => {
      
    })
    .catch((error) => {
      alert(`Error: ${error.code} - ${error.message}`);
    });
    set(ref(db, `orders/${userID}/contactinfo`), {
      phone_number: phonenumber,
      email_address: emailaddress,
    })
    .then(() => {
        
    })
    .catch((error) => {
        alert(`Error: ${error.code} - ${error.message}`);
    });
    set(ref(db, `orders/${userID}/ordernotes`), {
      text: ordernotes,
      
    })
    .then(() => {
        
    })
    .catch((error) => {
        alert(`Error: ${error.code} - ${error.message}`);
    });
    set(ref(db, `orders/${userID}/fulfillmentstatus`), {
      fulfilled: fulfillmentstatus,
      
    })
    .then(() => {
        
    })
    .catch((error) => {
        alert(`Error: ${error.code} - ${error.message}`);
    });
    set(ref(db, `orders/${userID}/price`), {
      price: 0,
      
    })
    .then(() => {
      alert(`Your order was sent successfully`);
        
    })
    .catch((error) => {
        alert(`Error: ${error.code} - ${error.message}`);
    });
};

function addItem(item, quantity, itemPrice, userID){
  set(ref(db, `orders/${userID}/itemsOrdered`), {
    [item]: quantity,
    
  })
  .then(() => {
      
  })
  .catch((error) => {
      alert(`Error: ${error.code} - ${error.message}`);
  });
  let currentPrice=0;

  get(child(dbref, `orders/${userID}/price`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach(child => {
            currentPrice = child.val();
        });
        

      } else {
        alert("No data available");
      }
      
    })
    .catch((error) => {
      alert(`Error: ${error.code} - ${error.message}`);
    });

    let newCost = currentPrice + quantity*itemPrice;
  



    update(ref(db, `orders/${userID}/price`), {
      price: newCost,
    })
      .then(() => {
        alert("Data updated successfully");
      })
      .catch((error) => {
        alert(`Error: ${error.code} - ${error.message}`);
      });
};
