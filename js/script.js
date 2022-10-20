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
    The final intersection observer is used to observe the navbar. When 100% of the background image is seen on screen, the navbar must be at the very top of the page. The function then takes away any existing background color, and adds a post-animation if there was background color to begin with. If 100% of the background image is not on sreen, it will add a background color class, making the navbar brown.
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
