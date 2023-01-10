import { bootstrapAlert } from "./alert.js";

// ----------------- Page Loaded After User Sign-in -------------------------//

// ----------------- Firebase Setup & Initialization ------------------------//

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { getDatabase, ref, set, update, child, get, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

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

let lobster_bisque = document.getElementById("lobster_bisque");
let lettuce_wraps = document.getElementById("lettuce_wraps");
let poutine = document.getElementById("poutine");
let asparagus = document.getElementById("asparagus");
let salad = document.getElementById("salad");
let burrito = document.getElementById("burrito");
let paella = document.getElementById("paella");
let fried_rice = document.getElementById("fried_rice");
let injera = document.getElementById("injera");
let ramen = document.getElementById("ramen");
let baklava_brownies = document.getElementById("baklava_brownies");
let mango_sticky_rice = document.getElementById("mango_sticky_rice");
let cookies_and_cream_rasmalai = document.getElementById("cookies_and_cream_rasmalai");
let coconut_milk_hot_chocolate = document.getElementById("coconut_milk_hot_chocolate");
let chai_tea_pina_colada = document.getElementById("chai_tea_pina_colada");
let peach_mango_blueberry_lemon_soda = document.getElementById("peach_mango_blueberry_lemon_soda");
let apt_suite = document.getElementById("apt_suite");
let address = document.getElementById("address");
let town = document.getElementById("town");
let state = document.getElementById("state");
let zip = document.getElementById("zip");
let order_notes = document.getElementById("order_notes");

let order_form_items = [["lobster_bisque", lobster_bisque], ["lettuce_wraps", lettuce_wraps], ["poutine", poutine], ["asparagus", asparagus], ["salad", salad], ["burrito", burrito], ["paella", paella], ["fried_rice", fried_rice], ["injera", injera], ["ramen", ramen], ["baklava_brownies", baklava_brownies], ["mango_sticky_rice", mango_sticky_rice], ["cookies_and_cream_rasmalai", cookies_and_cream_rasmalai], ["coconut_milk_hot_chocolate", coconut_milk_hot_chocolate], ["chai_tea_pina_colada", chai_tea_pina_colada], ["peach_mango_blueberry_lemon_soda", peach_mango_blueberry_lemon_soda]];

let food_categories = {
  "appetizers": ["lobster_bisque", "lettuce_wraps", "poutine", "asparagus", "salad"],
  "entrees": ["burrito", "paella", "fried_rice", "injera", "ramen"],
  "desserts": ["baklava_brownies", "mango_sticky_rice", "cookies_and_cream_rasmalai"],
  "drinks": ["coconut_milk_hot_chocolate", "chai_tea_pina_colada", "peach_mango_blueberry_lemon_soda"]
}

// Detect when order form submit button is clicked and do this whole process with it

let orderSubmission = document.getElementById("order-form");
orderSubmission.addEventListener("click", (e) => {
  e.preventDefault();
  getUsername();

  get(ref(db, "orders/" + currentUser.uid)).then((snapshot) => {
    if (snapshot.exists()) {
      bootstrapAlert("You already have an order in progress. Wait for confirmation of order fulfillment before starting a new order.", "danger")
    } else {

      defineOrder(new Date().toLocaleString(), order_notes.value, false, currentUser.uid, apt_suite.value, address.value, town.value, state.value, zip.value);


      let totalCost = 0

      for (let i = 0; i < order_form_items.length; i++) {
        addItem(order_form_items[i][0], order_form_items[i][1].value, currentUser.uid).then(
          (cost) => {
            totalCost += cost
            console.log(totalCost)
            update(ref(db, `orders/${currentUser.uid}/price`), {
              price: totalCost
            });
          }
        );
      }

    }
  });

});



// Set Data

function defineOrder(date, ordernotes, fulfillmentstatus, userID, apt_suite, address, town, state, zip) {
  let firstName = "";
  let lastName = "";

  get(ref(db, `users/${userID}/accountInfo`)).then((snapshot) => {
    if (snapshot.exists()) {
      let user = snapshot.val();
      firstName = user.firstName;
      lastName = user.lastName;

      set(ref(db, `orders/${userID}/user_info`), {
        first_name: firstName,
        last_name: lastName,
      })

    } else {
      console.log("No data available");
    }
  });

  set(ref(db, `orders/${userID}/date`), {
    date: date,
  })
    .then(() => { })
    .catch((error) => {
      bootstrapAlert(`Error: ${error.code} - ${error.message}`, 'danger');
    });

  set(ref(db, `orders/${userID}/contact_info`), {
    email_address: currentUser.email
  })
    .then(() => { })
    .catch((error) => {
      bootstrapAlert(`Error: ${error.code} - ${error.message}`, 'danger');
    });

  set(ref(db, `orders/${userID}/order_notes`), {
    text: ordernotes,

  })
    .then(() => { })
    .catch((error) => {
      bootstrapAlert(`Error: ${error.code} - ${error.message}`, 'danger');
    });

  set(ref(db, `orders/${userID}/fulfillment_status`), {
    fulfilled: fulfillmentstatus,

  })
    .then(() => { })
    .catch((error) => {
      bootstrapAlert(`Error: ${error.code} - ${error.message}`, 'danger');
    });

  set(ref(db, `orders/${userID}/address`), {
    address: address,
    apt_suite: apt_suite,
    town: town,
    state: state,
    zip: zip
  })
    .then(() => {
      bootstrapAlert(`Your order was sent successfully`, 'success');
    })
    .catch((error) => {
      bootstrapAlert(`Error: ${error.code} - ${error.message}`, 'danger');
    });
};

async function addItem(item, quantity, userID) {
  if (quantity > 0) {
    await update(ref(db, `orders/${userID}/items_ordered`), {
      [item]: quantity,
    })
      .catch((error) => {
        bootstrapAlert(`Error: ${error.code} - ${error.message}`, 'danger');
      });

    let actual_cat = "";

    let food_cats = Object.keys(food_categories);

    for (let i = 0; i < food_cats.length; i++) {
      if (food_categories[food_cats[i]].includes(item)) {
        actual_cat = food_cats[i];
      }
    }
    console.log(actual_cat)

    let itemPrice = 0;

    await get(ref(db, `prices/${actual_cat}`)).then((snapshot) => {

      if (snapshot.exists()) {
        snapshot.forEach(child => {
          if (child.key == item) {
            itemPrice = child.val();
          }
        });
      }
    }).then(() => {
      console.log("item price = " + itemPrice)

    }).catch((error) => {
      bootstrapAlert(`Error: ${error.code} - ${error.message}`, 'danger');
    });

    return itemPrice * quantity;

  } else {
    return 0;
  }
};
