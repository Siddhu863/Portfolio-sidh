document.addEventListener("DOMContentLoaded", () => {
  // Animate elements when they come into view
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(".animate-on-scroll")

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 },
    )

    elements.forEach((element) => {
      observer.observe(element)
    })
  }

  // Animate skill bars when they come into view
  const animateSkillBars = () => {
    const skillLevels = document.querySelectorAll(".skill-level")

    skillLevels.forEach((skillLevel) => {
      const parent = skillLevel.parentElement.parentElement
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Get the width from the style attribute
              const width = skillLevel.style.width

              // First set width to 0
              skillLevel.style.width = "0"

              // Then animate to the target width
              setTimeout(() => {
                skillLevel.style.width = width
              }, 200)

              // Unobserve after animation
              observer.unobserve(parent)
            }
          })
        },
        { threshold: 0.5 },
      )

      observer.observe(parent)
    })
  }

  // Add glitch animation to text
  const addGlitchAnimation = () => {
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

        // Add random glitch effect
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
  }

  // Add cyberpunk text effect
  const addCyberTextEffect = () => {
    const cyberTexts = document.querySelectorAll(".cybr-text")

    cyberTexts.forEach((text) => {
      const textContent = text.textContent
      text.innerHTML = ""

      // Create layers for cyberpunk effect
      const layer1 = document.createElement("span")
      layer1.className = "cybr-text-layer cybr-text-layer-1"
      layer1.textContent = textContent

      const layer2 = document.createElement("span")
      layer2.className = "cybr-text-layer cybr-text-layer-2"
      layer2.textContent = textContent

      text.appendChild(layer1)
      text.appendChild(layer2)
      text.appendChild(document.createTextNode(textContent))
    })
  }

  // Add fade-in animation for elements
  const addFadeInAnimation = () => {
    const fadeElements = document.querySelectorAll(".animate-fade-in")

    fadeElements.forEach((element, index) => {
      element.style.opacity = "0"
      element.style.animation = `fadeIn 0.8s ease-out ${index * 0.2}s forwards`
    })
  }

  // Add slide-in animation for elements
  const addSlideInAnimation = () => {
    const slideElements = document.querySelectorAll(".animate-slide-in")

    slideElements.forEach((element, index) => {
      element.style.opacity = "0"
      element.style.transform = "translateY(30px)"
      element.style.animation = `slideIn 0.8s ease-out ${index * 0.2}s forwards`
    })
  }

  // Add matrix rain effect in background
  const addMatrixRainEffect = () => {
    const canvas = document.createElement("canvas")
    canvas.className = "matrix-rain"
    canvas.style.position = "fixed"
    canvas.style.top = "0"
    canvas.style.left = "0"
    canvas.style.width = "100%"
    canvas.style.height = "100%"
    canvas.style.zIndex = "-1"
    canvas.style.opacity = "0.05"
    document.body.appendChild(canvas)

    const ctx = canvas.getContext("2d")

    // Set canvas dimensions
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Characters to display
    const chars = "01"

    // Column settings
    const fontSize = 14
    const columns = Math.floor(canvas.width / fontSize)

    // Array to track the y position of each column
    const drops = []
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100
    }

    // Drawing function
    function draw() {
      // Semi-transparent black to create fade effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Set text color and font
      ctx.fillStyle = "#7f5af0"
      ctx.font = `${fontSize}px monospace`

      // Draw characters
      for (let i = 0; i < drops.length; i++) {
        // Random character
        const char = chars.charAt(Math.floor(Math.random() * chars.length))

        // Draw character
        ctx.fillText(char, i * fontSize, drops[i] * fontSize)

        // Reset position if it's at the bottom or randomly
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }

        // Move drop down
        drops[i]++
      }
    }

    // Animation loop
    setInterval(draw, 50)

    // Resize handler
    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    })
  }

  // Add 3D tilt effect to cards
  const addTiltEffect = () => {
    const cards = document.querySelectorAll(".neo-glass-card")

    cards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const centerX = rect.width / 2
        const centerY = rect.height / 2

        const angleX = (y - centerY) / 20
        const angleY = (centerX - x) / 20

        card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateZ(10px)`
      })

      card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateZ(0)"
      })
    })
  }

  // Add smooth page transitions
  const addPageTransitions = () => {
    const style = document.createElement("style")
    style.textContent = `
            @keyframes pageIn {
                0% {
                    opacity: 0;
                    transform: translateY(20px);
                }
                100% {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            body {
                animation: pageIn 0.6s ease-out forwards;
            }
        `
    document.head.appendChild(style)
  }

  // Initialize animations
  animateOnScroll()
  animateSkillBars()
  addGlitchAnimation()
  addCyberTextEffect()
  addFadeInAnimation()
  addSlideInAnimation()
  addMatrixRainEffect()
  addTiltEffect()
  addPageTransitions()

  // Add CSS for animations
  const style = document.createElement("style")
  style.textContent = `
        /* Glitch Text Effect */
        .glitch-text {
            position: relative;
            display: inline-block;
        }
        
        .glitch-text.glitching {
            animation: glitch 0.3s cubic-bezier(.25, .46, .45, .94) both infinite;
        }
        
        .glitch-before,
        .glitch-after {
            content: attr(data-text);
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
        }
        
        .glitching .glitch-before {
            animation: glitch-before 0.3s cubic-bezier(.25, .46, .45, .94) both infinite;
            clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
            transform: translate(-2px, -2px);
            opacity: 0.8;
            color: #7f5af0;
        }
        
        .glitching .glitch-after {
            animation: glitch-after 0.3s cubic-bezier(.25, .46, .45, .94) both infinite;
            clip-path: polygon(0 60%, 100% 60%, 100% 100%, 0 100%);
            transform: translate(2px, 2px);
            opacity: 0.8;
            color: #ff8906;
        }
        
        @keyframes glitch {
            0% {
                transform: translate(0);
            }
            20% {
                transform: translate(-2px, 2px);
            }
            40% {
                transform: translate(-2px, -2px);
            }
            60% {
                transform: translate(2px, 2px);
            }
            80% {
                transform: translate(2px, -2px);
            }
            100% {
                transform: translate(0);
            }
        }
        
        @keyframes glitch-before {
            0% {
                transform: translate(0);
            }
            20% {
                transform: translate(-3px, 3px);
            }
            40% {
                transform: translate(-3px, -3px);
            }
            60% {
                transform: translate(3px, 3px);
            }
            80% {
                transform: translate(3px, -3px);
            }
            100% {
                transform: translate(0);
            }
        }
        
        @keyframes glitch-after {
            0% {
                transform: translate(0);
            }
            20% {
                transform: translate(3px, -3px);
            }
            40% {
                transform: translate(3px, 3px);
            }
            60% {
                transform: translate(-3px, -3px);
            }
            80% {
                transform: translate(-3px, 3px);
            }
            100% {
                transform: translate(0);
            }
        }
        
        /* Cyberpunk Text Effect */
        .cybr-text {
            position: relative;
            font-family: var(--font-heading);
            color: var(--text-color);
            text-transform: uppercase;
            letter-spacing: 2px;
        }
        
        .cybr-text-layer {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
        }
        
        .cybr-text-layer-1 {
            color: var(--primary-color);
            animation: cybr-text-anim-1 3s infinite linear alternate;
        }
        
        .cybr-text-layer-2 {
            color: var(--secondary-color);
            animation: cybr-text-anim-2 2s infinite linear alternate;
        }
        
        @keyframes cybr-text-anim-1 {
            0% {
                clip-path: inset(0 0 0 0);
                transform: translate(-2px, 0);
            }
            100% {
                clip-path: inset(0 0 0 70%);
                transform: translate(2px, 0);
            }
        }
        
        @keyframes cybr-text-anim-2 {
            0% {
                clip-path: inset(0 70% 0 0);
                transform: translate(2px, 0);
            }
            100% {
                clip-path: inset(0 0 0 0);
                transform: translate(-2px, 0);
            }
        }
        
        /* Fade In Animation */
        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
        
        /* Slide In Animation */
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        /* Animate on scroll */
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        
        .animate-on-scroll.visible {
            opacity: 1;
            transform: translateY(0);
        }
    `
  document.head.appendChild(style)
})
