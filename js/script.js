const invisUp = document.querySelectorAll(".fades")

const fadeUp = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            entry.target.classList.toggle("fade-in", entry.isIntersecting)
            if (entry.isIntersecting) fadeUp.unobserve(entry.target)
        })
    }, 
    {
        threshold: 0.8,
    }
)

invisUp.forEach(invis => {
    fadeUp.observe(invis)
})

