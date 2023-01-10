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
      // Get the order's information
      let orderInfo = orders[order];
      // Get the order's key
      let orderKey = order;
      // Get the order's name
      let orderName = orderInfo.user_info.first_name + " " + orderInfo.user_info.last_name;
      // Get the order's address
      let orderAddress = orderInfo.address.apt_suite + " " + orderInfo.address.address + ", " + orderInfo.address.town + ", " + orderInfo.address.state + " " + orderInfo.address.zip;
      // Get the order's items
      let orderItems = Object.keys(orderInfo.items_ordered)
      // Get the order's quantities
      let orderQuantities = Object.values(orderInfo.items_ordered);
      // Get the order's total
      let orderPrice = orderInfo.price.price;
      // Get the order's status
      let orderStatus = orderInfo.fulfillment_status.fulfilled;
      // Get the order's date
      let orderDate = orderInfo.date.date;
      // Get the order's notes
      let orderNotes = orderInfo.order_notes.text;
  
      let orderThings = [`Name: ${orderName}`, `Address: ${orderAddress}`, `Total Price: ${orderPrice}`, `Status: ${orderStatus}`, `Date: ${orderDate}`, `Notes: ${orderNotes}`]

      let order_card = document.createElement('div');
      order_card.classList.add('card', 'brown-col', 'm-3')
      let order_card_body = document.createElement('div');
      order_card_body.classList.add('card-body')
      let order_card_title = document.createElement('h5');
      order_card_title.classList.add('card-title', 'strong')
      order_card_title.textContent = "Order #" + orderKey.slice(0, 6);
      let order_card_button = document.createElement('button');
      order_card_button.classList.add('btn', 'btn-light', 'btn-sm', 'float-end', 'strong', 'ms-2')
      order_card_button.textContent = "View Order";
      order_card_button.setAttribute('data-bs-toggle', 'modal');
      order_card_button.setAttribute('data-bs-target', `${orderKey.slice(0, 6)}_modal`);
      order_card_button.setAttribute('id', `${orderKey.slice(0, 6)}_button`);

      console.log(order_card)



      /*let order_modal = document.createElement('div');
      order_modal.classList.add('modal', 'fade', 'bg-light', 'text-dark');
      order_modal.setAttribute('id', `${orderKey.slice(0, 6)}_modal`);
      order_modal.setAttribute('tabindex', '-1');
      let order_modal_title = document.createElement('h3');
      order_modal_title.classList.add('modal-title', 'strong')
      order_modal_title.textContent = "Order #" + orderKey.slice(0, 6);
      let order_modal_body = document.createElement('div');
      order_modal_body.classList.add('modal-body');
      order_modal_body.innerHTML = "";
      for (let thing in orderThings) {
        order_modal_body.innerHTML += `<h5>${orderThings[thing]}</h5>`
      }
      let order_modal_dismissal = document.createElement('button');
      order_modal_dismissal.classList.add('btn', 'btn-primary', 'btn-md', 'float-end', 'btn-close')
      order_modal_dismissal.setAttribute('data-bs-dismiss', 'modal');
      order_modal_dismissal.setAttribute('aria-label', 'Close');
      let order_modal_footer = document.createElement('div');
      order_modal_footer.classList.add('modal-footer');
      let order_modal_fulfillment = document.createElement('button');
      order_modal_fulfillment.classList.add('btn', 'btn-warning', 'btn-md', 'float-end')
      order_modal_fulfillment.textContent = "Fulfill Order";
      order_modal_fulfillment.setAttribute('id', `${orderKey.slice(0, 6)}_fulfillment`);
      order_modal_fulfillment.setAttribute('onclick', `fulfillOrder('${orderKey}')`);

      order_modal.appendChild(order_modal_title).appendChild(order_modal_dismissal);
      order_modal.appendChild(order_modal_body);
      order_modal.appendChild(order_modal_footer).appendChild(order_modal_fulfillment);

      if (orderStatus == true) {
        order_modal_fulfillment.classList.add('disabled');
        order_modal_fulfillment.textContent = "Order Fulfilled";

        filled_orders.appendChild(order_card).appendChild(order_card_body).appendChild(order_card_title).appendChild(order_card_button);
      } else {
        open_orders.appendChild(order_card).appendChild(order_card_body).appendChild(order_card_title).appendChild(order_card_button);
      }*/

      const fulfillOrder = (orderKey) => {
        console.log(orderKey)
        let orderRef = ref(db, 'orders/' + orderKey + '/fulfillment_status');
        set(orderRef, {
          fulfilled: true
        });
      }
      
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