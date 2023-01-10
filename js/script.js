/* 
    The first intersection observer is used to observe things that fade up. When 50% of an element with the fades class enters the screen, it will fade up through the fade-in class.
**/

const invisUp = document.querySelectorAll(".fades")

const fadeUp = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            entry.target.classList.toggle("fade-in", entry.isIntersecting)
            if (entry.isIntersecting) fadeUp.unobserve(entry.target)
        })
    }, 
    {
        threshold: 0.5,
    }
)

invisUp.forEach(invis => {
    fadeUp.observe(invis)
})


/* 
    The second intersection observer is used to observe things that fade to the right. When 50% of an element with the fadesRight class enters the screen, it will fade to the right with the fade-right class.
**/

const invisRight = document.querySelectorAll(".fadesRight")

const fadeRight = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            entry.target.classList.toggle("fade-right", entry.isIntersecting)
            if (entry.isIntersecting) fadeRight.unobserve(entry.target)
        })
    }, 
    {
        threshold: 0.5,
    }
)

invisRight.forEach(invis => {
    fadeRight.observe(invis)
})


/* 
    The third intersection observer is used to observe things that fade to the left. When 50% of an element with the fadesLeft class enters the screen, it will fade to the left with the fade-left class.
**/

const invisLeft = document.querySelectorAll(".fadesLeft")

const fadeLeft = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            entry.target.classList.toggle("fade-left", entry.isIntersecting)
            if (entry.isIntersecting) fadeLeft.unobserve(entry.target)
        })
    }, 
    {
        threshold: 0.5,
    }
)

invisLeft.forEach(invis => {
    fadeLeft.observe(invis)
})


/* 
    The fourth intersection observer is used to observe the navbar. When 100% of the background image is seen on screen, the navbar must be at the very top of the page. The function then takes away any existing background color, and adds a post-animation if there was background color to begin with. If 100% of the background image is not on sreen, it will add a background color class, making the navbar brown.
**/

const background = document.querySelector(".top-img")
const nb = document.querySelector(".nb-stuff")
let changeUps = 0

const nbBackground = new IntersectionObserver(
    entries => {
        if (entries[0].intersectionRatio === 1) {
            nb.classList.remove("dark-brown-col");
            if (changeUps >= 1) {
                nb.classList.add("post-anim-nb");
            }
        }
	    // fully intersects with screen
	    else {nb.classList.add("dark-brown-col"); nb.classList.add("post-anim-nb"); changeUps += 1;}
    }, { 
        threshold: [0,1] 
    }
)

nbBackground.observe(background);

/* Changes button state based off of card button classList **/

const cardOnClick = (element) => {
    element.classList.toggle("card-button-clicked")
}

/* 
    Zoom animations. The first zooms in, the second zooms out.
*/
  
const zoomIn = document.querySelectorAll(".zoom-in")

const zoomingIn = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            entry.target.classList.toggle("zoom-in-anim", entry.isIntersecting)
            if (entry.isIntersecting) zoomingIn.unobserve(entry.target)
        })
    }, 
    {
        threshold: 0.1,
    }
)

zoomIn.forEach(zoom => {
    zoomingIn.observe(zoom)
})



const zoomOut = document.querySelectorAll(".zoom-out")

const zoomingOut = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            entry.target.classList.toggle("zoom-out-anim", entry.isIntersecting)
            if (entry.isIntersecting) zoomingOut.unobserve(entry.target)
        })
    }, 
    {
        threshold: 0.1,
    }
)

zoomOut.forEach(zoom => {
    zoomingOut.observe(zoom)
})

/*
    These are scroll animations for the order page. There is a button in each section that takes the user to the next section. The function below takes the navbar height into account, and scrolls the user down the correct amount.
*/

const scrollDown = (element) => {
    let nbHeight = document.querySelector(".nb-stuff").offsetHeight
    let scrollHeight = element.offsetTop - nbHeight
    window.scrollTo({
        top: scrollHeight,
        behavior: 'smooth'
    })
}

/*
    This element tracks order cost as the user is in the process of ordering.
*/

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

let food_items = [[lobster_bisque, 7], [lettuce_wraps, 8], [poutine, 8], [asparagus, 7], [salad, 6], [burrito, 15], [paella, 16], [fried_rice, 14], [injera, 18], [ramen, 14], [baklava_brownies, 6], [mango_sticky_rice, 8], [cookies_and_cream_rasmalai, 7], [coconut_milk_hot_chocolate, 7], [chai_tea_pina_colada, 5], [peach_mango_blueberry_lemon_soda, 5]];

let cost_button = document.getElementById("cost_button");
let cost_text = document.getElementById("cost_text");

cost_button.addEventListener("click", () => {
    console.log("did it work")
    let cost = 0;
    for (let i = 0; i < food_items.length; i++) {
        if (food_items[i][0].value != 0) {
            cost += food_items[i][1] * food_items[i][0].value
        }
    }
    cost_text.textContent = `$${cost}`;
});

/*
    These functions allow the user to move the mini cost modal to any position.
*/

let cost_counter = document.getElementById("cost_counter");

cost_box.addEventListener("mousedown", mousedown, false);

function mousedown(e) {
    window.addEventListener("mousemove", mousemove, false);
    window.addEventListener("mouseup", mouseup, false);
}

function mousemove(e) {
    let x = e.clientX - 20;
    if (x < 20) x = 20;
    if (x > window.innerWidth - 40) x = window.innerWidth - 40;
    let y = e.clientY - 20;
    if (y < 110) y = 110;
    if (y > window.innerHeight - 120) y = window.innerHeight - 120;
    cost_counter.style.left = x + "px";
    cost_counter.style.top = y + "px";
}

function mouseup() {
    window.removeEventListener("mousemove", mousemove, false);
    window.removeEventListener("mouseup", mouseup, false);
}

/* 
    Same thing, but for touch users (mobile) 
*/

cost_box.addEventListener("touchstart", touchstart, false);

function touchstart(e) {
    window.addEventListener("touchmove", touchmove, false);
    window.addEventListener("touchend", touchend, false);
}

function touchmove(e) {
    let x = e.touches[0].clientX - 20;
    let y = e.touches[0].clientY - 20;
    cost_counter.style.left = x + "px";
    cost_counter.style.top = y + "px";
}

function touchend() {
    window.removeEventListener("touchmove", touchmove, false);
    window.removeEventListener("touchend", touchend, false);
}