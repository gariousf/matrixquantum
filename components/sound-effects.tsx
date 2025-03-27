"use client"

import { useEffect, useRef } from "react"

type SoundType = "keypress" | "error" | "success" | "quantum" | "matrix"

export function useSoundEffects() {
  const audioRefs = useRef<Record<SoundType, HTMLAudioElement | null>>({
    keypress: null,
    error: null,
    success: null,
    quantum: null,
    matrix: null
  })

  useEffect(() => {
    // Create audio elements
    audioRefs.current.keypress = new Audio("/sounds/keypress.mp3")
    audioRefs.current.error = new Audio("/sounds/error.mp3")
    audioRefs.current.success = new Audio("/sounds/success.mp3")
    audioRefs.current.quantum = new Audio("/sounds/quantum.mp3")
    audioRefs.current.matrix = new Audio("/sounds/matrix.mp3")

    // Set volume
    Object.values(audioRefs.current).forEach(audio => {
      if (audio) audio.volume = 0.3
    })

    return () => {
      // Clean up
      Object.values(audioRefs.current).forEach(audio => {
        if (audio) {
          audio.pause()
          audio.src = ""
        }
      })
    }
  }, [])

  const playSound = (type: SoundType) => {
    const audio = audioRefs.current[type]
    if (audio) {
      audio.currentTime = 0
      audio.play().catch(e => console.error("Error playing sound:", e))
    }
  }

  return { playSound }
} 