document.addEventListener("DOMContentLoaded", () => {
  // Remove old cursor elements if they exist
  const oldCursors = document.querySelectorAll(".cursor-dot, .cursor-outline")
  oldCursors.forEach((cursor) => cursor.remove())

  // Create new cursor elements
  const cursorOuter = document.createElement("div")
  cursorOuter.className = "cursor-outer custom-cursor"

  const cursorInner = document.createElement("div")
  cursorInner.className = "cursor-inner custom-cursor"

  const cursorDot = document.createElement("div")
  cursorDot.className = "cursor-dot custom-cursor"

  document.body.appendChild(cursorOuter)
  document.body.appendChild(cursorInner)
  document.body.appendChild(cursorDot)

  // Create trail elements
  const trailCount = 8
  const trails = []

  for (let i = 0; i < trailCount; i++) {
    const trail = document.createElement("div")
    trail.className = "cursor-trail custom-cursor"
    trail.style.opacity = (1 - i / trailCount) * 0.5
    trail.style.width = `${6 - i * 0.5}px`
    trail.style.height = `${6 - i * 0.5}px`
    document.body.appendChild(trail)
    trails.push({
      element: trail,
      x: 0,
      y: 0,
    })
  }

  // Hide default cursor
  document.body.style.cursor = "none"

  // Track mouse position
  let mouseX = 0
  let mouseY = 0
  let prevMouseX = 0
  let prevMouseY = 0
  let trailX = 0
  let trailY = 0
  let mouseSpeed = 0

  // Track cursor state
  let isClicking = false
  let isHovering = false

  // Update mouse position
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX
    mouseY = e.clientY

    // Calculate mouse speed
    const dx = mouseX - prevMouseX
    const dy = mouseY - prevMouseY
    mouseSpeed = Math.sqrt(dx * dx + dy * dy)

    prevMouseX = mouseX
    prevMouseY = mouseY
  })

  // Handle cursor effects on interactive elements
  const interactiveElements = document.querySelectorAll(
    "a, button, .btn, .social-icon, input, textarea, .project-card, .neo-glass-card, .filter-btn, .theme-toggle, .switch",
  )

  interactiveElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      isHovering = true
      document.body.classList.add("cursor-hover")
    })

    element.addEventListener("mouseleave", () => {
      isHovering = false
      document.body.classList.remove("cursor-hover")
    })
  })

  // Handle click effects
  document.addEventListener("mousedown", () => {
    isClicking = true
    document.body.classList.add("cursor-click")
  })

  document.addEventListener("mouseup", () => {
    isClicking = false
    document.body.classList.remove("cursor-click")
  })

  // Handle cursor visibility when leaving/entering window
  document.addEventListener("mouseout", () => {
    cursorOuter.style.opacity = "0"
    cursorInner.style.opacity = "0"
    cursorDot.style.opacity = "0"
    trails.forEach((trail) => {
      trail.element.style.opacity = "0"
    })
  })

  document.addEventListener("mouseover", () => {
    cursorOuter.style.opacity = "1"
    cursorInner.style.opacity = "1"
    cursorDot.style.opacity = "1"
    trails.forEach((trail, index) => {
      trail.element.style.opacity = (1 - index / trailCount) * 0.5
    })
  })

  // Create particle effect on click
  document.addEventListener("click", (e) => {
    createClickParticles(e.clientX, e.clientY)
  })

  function createClickParticles(x, y) {
    const particleCount = 8

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div")
      particle.className = "cursor-trail"
      particle.style.width = "8px"
      particle.style.height = "8px"
      particle.style.left = `${x}px`
      particle.style.top = `${y}px`
      particle.style.opacity = "1"
      particle.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue("--primary-color")

      // Random direction
      const angle = (i / particleCount) * Math.PI * 2
      const speed = 2 + Math.random() * 3
      const vx = Math.cos(angle) * speed
      const vy = Math.sin(angle) * speed

      document.body.appendChild(particle)

      // Animate and remove
      let posX = x
      let posY = y
      let opacity = 1
      let size = 8

      const animate = () => {
        posX += vx
        posY += vy
        opacity -= 0.03
        size -= 0.1

        if (opacity <= 0) {
          particle.remove()
          return
        }

        particle.style.left = `${posX}px`
        particle.style.top = `${posY}px`
        particle.style.opacity = opacity
        particle.style.width = `${Math.max(0, size)}px`
        particle.style.height = `${Math.max(0, size)}px`

        requestAnimationFrame(animate)
      }

      requestAnimationFrame(animate)
    }
  }

  // Update cursor and trails
  function updateCursor() {
    // Smooth cursor movement with easing
    const ease = 0.2

    // Update cursor positions with easing
    cursorOuter.style.left = `${mouseX}px`
    cursorOuter.style.top = `${mouseY}px`

    cursorInner.style.left = `${mouseX}px`
    cursorInner.style.top = `${mouseY}px`

    cursorDot.style.left = `${mouseX}px`
    cursorDot.style.top = `${mouseY}px`

    // Update trail positions with delay
    trailX = mouseX
    trailY = mouseY

    trails.forEach((trail, index) => {
      const delay = index * 2

      setTimeout(() => {
        trail.x = trailX
        trail.y = trailY
        trail.element.style.left = `${trail.x}px`
        trail.element.style.top = `${trail.y}px`
      }, delay)
    })

    requestAnimationFrame(updateCursor)
  }

  // Start cursor animation
  updateCursor()

  // Disable custom cursor on touch devices
  const isTouchDevice = () => {
    return "ontouchstart" in window || navigator.maxTouchPoints > 0
  }

  if (isTouchDevice()) {
    const cursorElements = document.querySelectorAll(".custom-cursor")
    cursorElements.forEach((el) => {
      el.style.display = "none"
    })
    document.body.style.cursor = "auto"
  }
})
