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
