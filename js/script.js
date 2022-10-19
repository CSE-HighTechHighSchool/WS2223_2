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