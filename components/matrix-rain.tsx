"use client"

import { useEffect, useRef } from "react"

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
    }

    window.addEventListener("resize", resizeCanvas)

    const characters = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン♠♣♦♥∞Ω∑π√∫∀∃∈∉∋∌∧∨∩∪∴∵∼≅≈≠≤≥⊂⊃⊆⊇⊕⊗⊥⋅⌈⌉⌊⌋⟨⟩"
    const fontSize = 14
    const columns = Math.floor(canvas.width / fontSize)

    const drops: number[] = []
    const brightness: number[] = []
    
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -100)
      brightness[i] = Math.random() * 0.5 + 0.5
    }

    let mouseX = -100, mouseY = -100
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }
    window.addEventListener('mousemove', handleMouseMove)

    const draw = () => {
      if (!ctx || !canvas) return

      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < drops.length; i++) {
        const x = i * fontSize
        const y = drops[i] * fontSize
        const distToMouse = Math.sqrt(Math.pow(x - mouseX, 2) + Math.pow(y - mouseY, 2))
        const mouseInfluence = Math.max(0, 1 - distToMouse / 200)
        
        const green = Math.floor(brightness[i] * 255 * (1 + mouseInfluence * 0.5))
        const blue = Math.floor(mouseInfluence * 100)
        ctx.fillStyle = `rgb(0, ${green}, ${blue})`
        
        const dynamicFontSize = fontSize * (1 + mouseInfluence * 0.5)
        ctx.font = `${dynamicFontSize}px monospace`

        const text = characters.charAt(Math.floor(Math.random() * characters.length))
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize < fontSize) {
          ctx.fillStyle = "#FFF"
          ctx.fillText(text, i * fontSize, drops[i] * fontSize)
        }

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
          brightness[i] = Math.random() * 0.5 + 0.5
        }

        drops[i]++
      }
    }

    const interval = setInterval(draw, 33)

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0 opacity-40" />
}

