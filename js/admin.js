// ----------------- Page Loaded After User Sign-in -------------------------//

// ----------------- Firebase Setup & Initialization ------------------------//
import { bootstrapAlert } from './alert.js';
import { navload } from './home.js'

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

let open_orders = document.getElementById('open_orders');
let filled_orders = document.getElementById('filled_orders');
let currentUser = null;

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

// Create function that gets all orders and iterates through them

function makeOrders() {
  let orders = null;
  // Get reference to the orders node
  // Get all orders
  get(child(ref(db), 'orders')).then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val());
      orders = snapshot.val();
    } else {
      console.log("No data available");
    }
  })
  .then(() => {
    for (let order in orders) {
      console.log("this works")

      let orderInfo = orders[order];
      let orderKey = order;
      let orderName = orderInfo.user_info.first_name + " " + orderInfo.user_info.last_name;
      let orderAddress = orderInfo.address.apt_suite + " " + orderInfo.address.address + ", " + orderInfo.address.town + ", " + orderInfo.address.state + " " + orderInfo.address.zip;
      let orderItems = Object.keys(orderInfo.items_ordered);

      orderItems = orderItems.map(item => {
          if (!item.includes("_")) {
              return item.charAt(0).toUpperCase() + item.slice(1);
          } else {
              return item.split('_').map(word =>  word === 'and' ? 'and' : word.charAt(0).toUpperCase() + word.slice(1) ).join(' ');
          }
      });
      let orderQuantities = Object.values(orderInfo.items_ordered);
      let orderPrice = orderInfo.price.price;
      let orderStatus = orderInfo.fulfillment_status.fulfilled;
      let orderDate = orderInfo.date.date;
      let orderNotes = orderInfo.order_notes.text;
      let orderThings = [`Name: ${orderName}`, `Addr: ${orderAddress}`, `Price: $${orderPrice}`, `Fulfilled: ${orderStatus}`, `Date: ${orderDate}`, `Notes: ${orderNotes}`]

      let order_card = document.createElement('div');
      order_card.classList.add('card', 'brown-col', 'm-2')

      let order_card_body = document.createElement('div');
      order_card_body.classList.add('card-body')

      let order_card_title = document.createElement('h5');
      order_card_title.classList.add('card-title', 'strong')
      order_card_title.textContent = "Order ID: " + orderKey.slice(0, 5) + "_" + orderKey.split("_")[1];

      let order_card_text = document.createElement('div');
      order_card_text.classList.add('card-text', 'text-left', 'small')
      order_card_text.innerHTML += "<br>"

      for (let thing in orderThings) {
        order_card_text.innerHTML += `${orderThings[thing]}<br>`
      }
      order_card_text.innerHTML += `<br>Items:<br>`
      for (let i = 0; i < orderItems.length; i++) {
        order_card_text.innerHTML += `| ${orderItems[i]} - ${orderQuantities[i]} |<br>`
      }
      let order_card_button = document.createElement('button');
      order_card_button.classList.add('btn', 'btn-light', 'btn-sm', 'float-end', 'strong', 'ms-2')
      order_card_button.textContent = "Fulfill";
      order_card_button.setAttribute('id', `${orderKey.slice(0, 5) + "_" + orderKey.split("_")[1]}_button`);

      order_card_body.appendChild(order_card_title).appendChild(order_card_button);
      order_card_body.appendChild(order_card_text)

      if (orderStatus == true) {
        order_card_button.classList.add('disabled');
        order_card_button.textContent = "Fulfilled";

        filled_orders.appendChild(order_card).appendChild(order_card_body)

        
      } else {
        open_orders.appendChild(order_card).appendChild(order_card_body)
        // remove a class from order_card
        order_card.classList.replace('brown-col', 'orange-col')

      }

      order_card_button.addEventListener('click', () => {
        console.log(orderKey)
        let orderRef = ref(db, 'orders/' + orderKey + '/fulfillment_status');
        set(orderRef, {
          fulfilled: true
        });
        window.location.reload();
      
      })

      
    }
  })
  .catch((error) => {
    console.log(error)
  });

  // Iterate through the orders




}


window.addEventListener("load", () => {
  getUsername()
  makeOrders()

});