"use client"

import { useEffect, useState, useRef } from "react"
import { cn } from "@/lib/utils"

interface QuantumMagnetismProps {
  onComplete?: () => void
}

export default function QuantumMagnetism({ onComplete }: QuantumMagnetismProps) {
  const [magneticField, setMagneticField] = useState(5.0)
  const [interactionStrength, setInteractionStrength] = useState(1.0)
  const [isSimulating, setIsSimulating] = useState(false)
  const [phase, setPhase] = useState<"paramagnetic" | "antiferromagnetic" | "transition">("paramagnetic")
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const latticeSize = 20 // Number of sites in the 1D chain
  
  // Determine the phase based on the ratio of interaction to field strength
  useEffect(() => {
    const ratio = interactionStrength / magneticField
    if (ratio < 0.8) {
      setPhase("paramagnetic")
    } else if (ratio > 1.2) {
      setPhase("antiferromagnetic")
    } else {
      setPhase("transition")
    }
  }, [magneticField, interactionStrength])
  
  // Run the simulation
  const runSimulation = () => {
    setIsSimulating(true)
    setTimeout(() => {
      setIsSimulating(false)
      if (onComplete) onComplete()
    }, 5000)
  }
  
  // Render the lattice visualization
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Set canvas dimensions
    canvas.width = 600
    canvas.height = 150
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // Draw lattice sites
    const siteRadius = 15
    const siteSpacing = 28
    const startX = (canvas.width - (latticeSize - 1) * siteSpacing) / 2
    const centerY = canvas.height / 2
    
    // Draw connecting lines first
    ctx.strokeStyle = 'rgba(0, 255, 0, 0.3)'
    ctx.lineWidth = 2
    
    for (let i = 0; i < latticeSize - 1; i++) {
      const x1 = startX + i * siteSpacing
      const x2 = startX + (i + 1) * siteSpacing
      
      ctx.beginPath()
      ctx.moveTo(x1, centerY)
      ctx.lineTo(x2, centerY)
      ctx.stroke()
    }
    
    // Generate spin states based on the phase
    const spins: ('up' | 'down')[] = []
    
    if (phase === "paramagnetic") {
      // All spins aligned with field (up)
      for (let i = 0; i < latticeSize; i++) {
        // Add some quantum fluctuations
        spins.push(Math.random() < 0.9 ? 'up' : 'down')
      }
    } else if (phase === "antiferromagnetic") {
      // Alternating up/down pattern
      for (let i = 0; i < latticeSize; i++) {
        // Add some quantum fluctuations
        const idealState = i % 2 === 0 ? 'up' : 'down'
        spins.push(Math.random() < 0.8 ? idealState : (idealState === 'up' ? 'down' : 'up'))
      }
    } else {
      // Transition - domains of order in a sea of fluctuations
      let currentSpin: 'up' | 'down' = Math.random() < 0.5 ? 'up' : 'down'
      for (let i = 0; i < latticeSize; i++) {
        // Higher probability of domain walls
        if (Math.random() < 0.4) {
          currentSpin = currentSpin === 'up' ? 'down' : 'up'
        }
        spins.push(currentSpin)
      }
    }
    
    // Draw the spins
    for (let i = 0; i < latticeSize; i++) {
      const x = startX + i * siteSpacing
      const spin = spins[i]
      
      // Draw site circle
      ctx.beginPath()
      ctx.arc(x, centerY, siteRadius, 0, 2 * Math.PI)
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'
      ctx.fill()
      ctx.strokeStyle = 'rgb(0, 255, 0)'
      ctx.stroke()
      
      // Draw spin arrow
      const arrowLength = siteRadius * 0.7
      ctx.strokeStyle = spin === 'up' ? 'rgb(0, 255, 0)' : 'rgb(255, 100, 100)'
      ctx.lineWidth = 2
      ctx.beginPath()
      
      if (spin === 'up') {
        ctx.moveTo(x, centerY + arrowLength)
        ctx.lineTo(x, centerY - arrowLength)
        // Arrow head
        ctx.moveTo(x - 3, centerY - arrowLength + 5)
        ctx.lineTo(x, centerY - arrowLength)
        ctx.lineTo(x + 3, centerY - arrowLength + 5)
      } else {
        ctx.moveTo(x, centerY - arrowLength)
        ctx.lineTo(x, centerY + arrowLength)
        // Arrow head
        ctx.moveTo(x - 3, centerY + arrowLength - 5)
        ctx.lineTo(x, centerY + arrowLength)
        ctx.lineTo(x + 3, centerY + arrowLength - 5)
      }
      
      ctx.stroke()
    }
    
    // Add animation if simulating
    if (isSimulating) {
      let frameCount = 0
      const maxFrames = 60
      
      const animate = () => {
        if (frameCount < maxFrames) {
          // Redraw with slight variations to simulate quantum fluctuations
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          
          // Redraw connecting lines
          ctx.strokeStyle = 'rgba(0, 255, 0, 0.3)'
          ctx.lineWidth = 2
          
          for (let i = 0; i < latticeSize - 1; i++) {
            const x1 = startX + i * siteSpacing
            const x2 = startX + (i + 1) * siteSpacing
            
            ctx.beginPath()
            ctx.moveTo(x1, centerY)
            ctx.lineTo(x2, centerY)
            ctx.stroke()
          }
          
          // Update spins with quantum fluctuations
          for (let i = 0; i < latticeSize; i++) {
            const x = startX + i * siteSpacing
            
            // Randomly flip some spins to simulate quantum fluctuations
            if (Math.random() < 0.1) {
              spins[i] = spins[i] === 'up' ? 'down' : 'up'
            }
            
            const spin = spins[i]
            
            // Draw site circle
            ctx.beginPath()
            ctx.arc(x, centerY, siteRadius, 0, 2 * Math.PI)
            ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'
            ctx.fill()
            ctx.strokeStyle = 'rgb(0, 255, 0)'
            ctx.stroke()
            
            // Draw spin arrow
            const arrowLength = siteRadius * 0.7
            ctx.strokeStyle = spin === 'up' ? 'rgb(0, 255, 0)' : 'rgb(255, 100, 100)'
            ctx.lineWidth = 2
            ctx.beginPath()
            
            if (spin === 'up') {
              ctx.moveTo(x, centerY + arrowLength)
              ctx.lineTo(x, centerY - arrowLength)
              // Arrow head
              ctx.moveTo(x - 3, centerY - arrowLength + 5)
              ctx.lineTo(x, centerY - arrowLength)
              ctx.lineTo(x + 3, centerY - arrowLength + 5)
            } else {
              ctx.moveTo(x, centerY - arrowLength)
              ctx.lineTo(x, centerY + arrowLength)
              // Arrow head
              ctx.moveTo(x - 3, centerY + arrowLength - 5)
              ctx.lineTo(x, centerY + arrowLength)
              ctx.lineTo(x + 3, centerY + arrowLength - 5)
            }
            
            ctx.stroke()
          }
          
          frameCount++
          requestAnimationFrame(animate)
        }
      }
      
      animate()
    }
  }, [phase, isSimulating, latticeSize])
  
  return (
    <div className="font-mono text-green-500">
      <div className="mb-4 text-center">
        <h3 className="text-lg mb-2">Quantum Magnetism Simulation</h3>
        <p className="text-sm mb-4">Ising Spin Chain Phase Transition</p>
      </div>
      
      <div className="flex flex-col gap-6">
        <div>
          <div className="mb-2 text-sm">Spin Lattice Visualization:</div>
          <div className="border border-green-500 p-2 bg-black/30 flex justify-center">
            <canvas ref={canvasRef} width={600} height={150} />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="mb-2 text-sm">Magnetic Field Strength: {magneticField.toFixed(1)}</div>
            <input
              type="range"
              min="0.1"
              max="10.0"
              step="0.1"
              value={magneticField}
              onChange={(e) => setMagneticField(parseFloat(e.target.value))}
              className="w-full"
              disabled={isSimulating}
            />
          </div>
          
          <div>
            <div className="mb-2 text-sm">Interaction Strength: {interactionStrength.toFixed(1)}</div>
            <input
              type="range"
              min="0.1"
              max="10.0"
              step="0.1"
              value={interactionStrength}
              onChange={(e) => setInteractionStrength(parseFloat(e.target.value))}
              className="w-full"
              disabled={isSimulating}
            />
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="text-sm">
            Current Phase: 
            <span className={cn(
              "ml-2 font-bold",
              phase === "paramagnetic" ? "text-blue-400" : 
              phase === "antiferromagnetic" ? "text-red-400" : 
              "text-yellow-400"
            )}>
              {phase === "paramagnetic" ? "Paramagnetic" : 
               phase === "antiferromagnetic" ? "Antiferromagnetic" : 
               "Quantum Critical Point"}
            </span>
          </div>
          
          <button
            onClick={runSimulation}
            disabled={isSimulating}
            className={cn(
              "px-4 py-1 border border-green-500 rounded",
              isSimulating ? "opacity-50 cursor-not-allowed" : "hover:bg-green-900"
            )}
          >
            {isSimulating ? "Simulating..." : "Run Quantum Simulation"}
          </button>
        </div>
        
        <div className="text-xs border-t border-green-500 pt-2">
          <div className="mb-1">Phase Characteristics:</div>
          <ul className="list-disc list-inside">
            <li><span className="text-blue-400">Paramagnetic</span>: Spins align with external field, minimal entanglement</li>
            <li><span className="text-red-400">Antiferromagnetic</span>: Alternating spin pattern, high entanglement</li>
            <li><span className="text-yellow-400">Quantum Critical Point</span>: Maximum quantum fluctuations, long-range correlations</li>
          </ul>
        </div>
      </div>
    </div>
  )
} 