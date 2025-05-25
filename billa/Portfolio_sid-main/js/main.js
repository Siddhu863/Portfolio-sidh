document.addEventListener("DOMContentLoaded", () => {
  // Theme toggle functionality with animation
  const themeSwitch = document.getElementById("theme-switch")
  const body = document.body

  // Create theme transition element
  const themeTransition = document.createElement("div")
  themeTransition.className = "theme-transition"
  document.body.appendChild(themeTransition)

  // Check for saved theme preference or use default
  const savedTheme = localStorage.getItem("theme") || "dark"
  body.className = `${savedTheme}-theme`
  themeSwitch.checked = savedTheme === "light"

  // Add background pattern
  const bgPattern = document.createElement("div")
  bgPattern.className = "bg-pattern"
  document.body.appendChild(bgPattern)

  // Theme toggle event listener with animation
  themeSwitch.addEventListener("change", () => {
    // Get position of the switch for transition origin
    const switchRect = themeSwitch.getBoundingClientRect()
    const originX = switchRect.left + switchRect.width / 2
    const originY = switchRect.top + switchRect.height / 2

    // Set transition origin
    themeTransition.style.transformOrigin = `${originX}px ${originY}px`

    // Activate transition
    themeTransition.classList.add("active")

    // Change theme after a slight delay
    setTimeout(() => {
      if (themeSwitch.checked) {
        body.className = "light-theme"
        localStorage.setItem("theme", "light")
      } else {
        body.className = "dark-theme"
        localStorage.setItem("theme", "dark")
      }

      // Remove transition after theme change
      setTimeout(() => {
        themeTransition.classList.remove("active")
      }, 500)
    }, 300)
  })

  // Mobile menu toggle
  const menuToggle = document.querySelector(".menu-toggle")
  const nav = document.querySelector("nav")

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("active")
      nav.classList.toggle("active")
    })
  }

  // Close mobile menu when clicking a link
  const navLinks = document.querySelectorAll(".nav-link")
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (menuToggle && menuToggle.classList.contains("active")) {
        menuToggle.classList.remove("active")
        nav.classList.remove("active")
      }
    })
  })

  // Typing animation for hero section
  const typingText = document.querySelector(".typing-text")
  if (typingText) {
    const phrases = [
      "AI & ML Developer",
      "MERN Stack Developer",
      "Problem Solver",
      "Hackathon Winner",
      "Continuous Learner",
    ]

    let phraseIndex = 0
    let charIndex = 0
    let isDeleting = false
    let typingSpeed = 100

    const type = () => {
      const currentPhrase = phrases[phraseIndex]

      if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1)
        charIndex--
        typingSpeed = 50
      } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1)
        charIndex++
        typingSpeed = 100
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        // Pause at the end of typing
        isDeleting = true
        typingSpeed = 1500
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false
        phraseIndex = (phraseIndex + 1) % phrases.length
        typingSpeed = 500
      }

      setTimeout(type, typingSpeed)
    }

    setTimeout(type, 1000)
  }

  // Add glitch effect to glitch-text elements
  const glitchTexts = document.querySelectorAll(".glitch-text")
  glitchTexts.forEach((text) => {
    // Create glitch layers
    const dataText = text.getAttribute("data-text")
    if (dataText) {
      const before = document.createElement("span")
      before.className = "glitch-before"
      before.setAttribute("data-text", dataText)

      const after = document.createElement("span")
      after.className = "glitch-after"
      after.setAttribute("data-text", dataText)

      text.appendChild(before)
      text.appendChild(after)

      // Add random glitch animation
      setInterval(
        () => {
          text.classList.add("glitching")
          setTimeout(() => {
            text.classList.remove("glitching")
          }, 200)
        },
        Math.random() * 5000 + 3000,
      )
    }
  })

  // Add header scroll effect
  const header = document.querySelector("header")
  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        header.classList.add("scrolled")
      } else {
        header.classList.remove("scrolled")
      }
    })
  }

  // Form submission handling
  const contactForm = document.querySelector(".contact-form")
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form values
      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const message = document.getElementById("message").value

      // Simple validation
      if (!name || !email || !message) {
        alert("Please fill in all fields")
        return
      }

      // Here you would typically send the form data to a server
      // For now, just show a success message
      alert("Thank you for your message! I will get back to you soon.")
      contactForm.reset()
    })
  }

  // Create hero animation circles
  const heroSection = document.querySelector(".hero")
  if (heroSection) {
    const heroAnimation = document.createElement("div")
    heroAnimation.className = "hero-animation"

    // Create circles
    for (let i = 0; i < 3; i++) {
      const circle = document.createElement("div")
      circle.className = "hero-circle"
      heroAnimation.appendChild(circle)
    }

    heroSection.appendChild(heroAnimation)
  }

  // Create particles
  const createParticles = () => {
    const particlesContainer = document.createElement("div")
    particlesContainer.className = "particles-container"
    document.body.appendChild(particlesContainer)

    const particleCount = 30

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div")
      particle.className = "particle"

      // Random size
      const size = Math.random() * 5 + 2
      particle.style.width = `${size}px`
      particle.style.height = `${size}px`

      // Random position
      const x = Math.random() * 100
      const y = Math.random() * 100
      particle.style.left = `${x}%`
      particle.style.top = `${y}%`

      // Random animation duration and delay
      const duration = Math.random() * 20 + 10
      const delay = Math.random() * 10
      particle.style.animationDuration = `${duration}s`
      particle.style.animationDelay = `-${delay}s`

      particlesContainer.appendChild(particle)
    }
  }

  createParticles()

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Adjust for header height
          behavior: "smooth",
        })
      }
    })
  })

  // Add parallax effect to hero section
  if (heroSection) {
    window.addEventListener("mousemove", (e) => {
      const mouseX = e.clientX / window.innerWidth
      const mouseY = e.clientY / window.innerHeight

      const moveX = (mouseX - 0.5) * 20
      const moveY = (mouseY - 0.5) * 20

      // Move hero content for parallax effect
      const heroContent = document.querySelector(".hero-content")
      if (heroContent) {
        heroContent.style.transform = `translate(${moveX * 0.3}px, ${moveY * 0.3}px)`
      }

      // Move hero animation circles
      const heroCircles = document.querySelectorAll(".hero-circle")
      heroCircles.forEach((circle, index) => {
        const factor = (index + 1) * 0.2
        circle.style.transform = `translate(${moveX * factor}px, ${moveY * factor}px)`
      })
    })
  }

  // Add decorative corners to cards
  const cards = document.querySelectorAll(".neo-glass-card")
  cards.forEach((card) => {
    // Add decorative corners
    const topLeft = document.createElement("div")
    topLeft.className = "decorative-corner top-left"

    const topRight = document.createElement("div")
    topRight.className = "decorative-corner top-right"

    const bottomLeft = document.createElement("div")
    bottomLeft.className = "decorative-corner bottom-left"

    const bottomRight = document.createElement("div")
    bottomRight.className = "decorative-corner bottom-right"

    card.appendChild(topLeft)
    card.appendChild(topRight)
    card.appendChild(bottomLeft)
    card.appendChild(bottomRight)
  })
})
