"use client"

import { useEffect, useState, useRef } from "react"
import { cn } from "@/lib/utils"

interface RydbergSimulatorProps {
  onComplete?: () => void
}

export default function RydbergSimulator({ onComplete }: RydbergSimulatorProps) {
  const [latticeSize, setLatticeSize] = useState(5) // 5x5 lattice
  const [interactionType, setInteractionType] = useState<"toric" | "color" | "gauge">("toric")
  const [isRunning, setIsRunning] = useState(false)
  const [step, setStep] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  // Run the simulation
  const runSimulation = () => {
    setIsRunning(true)
    setStep(0)
  }
  
  // Update step
  useEffect(() => {
    if (!isRunning) return
    
    const timer = setTimeout(() => {
      if (step < 25) {
        setStep(step + 1)
      } else {
        setIsRunning(false)
        if (onComplete) onComplete()
      }
    }, 250)
    
    return () => clearTimeout(timer)
  }, [step, isRunning, onComplete])
  
  // Draw the visualization
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Set canvas dimensions
    canvas.width = 500
    canvas.height = 400
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // Draw lattice
    const cellSize = 40
    const startX = (canvas.width - latticeSize * cellSize) / 2
    const startY = 80
    
    // Draw lattice grid
    ctx.strokeStyle = 'rgba(0, 255, 0, 0.3)'
    ctx.lineWidth = 1
    
    for (let i = 0; i <= latticeSize; i++) {
      // Vertical lines
      ctx.beginPath()
      ctx.moveTo(startX + i * cellSize, startY)
      ctx.lineTo(startX + i * cellSize, startY + latticeSize * cellSize)
      ctx.stroke()
      
      // Horizontal lines
      ctx.beginPath()
      ctx.moveTo(startX, startY + i * cellSize)
      ctx.lineTo(startX + latticeSize * cellSize, startY + i * cellSize)
      ctx.stroke()
    }
    
    // Draw atoms at lattice sites
    for (let i = 0; i < latticeSize; i++) {
      for (let j = 0; j < latticeSize; j++) {
        const x = startX + (i + 0.5) * cellSize
        const y = startY + (j + 0.5) * cellSize
        
        // Determine if atom is in ground or Rydberg state based on pattern and step
        let isRydberg = false
        
        if (interactionType === "toric") {
          // For toric code, create a checkerboard pattern that evolves with steps
          isRydberg = ((i + j) % 2 === 0) && (Math.random() < Math.min(1, step / 15))
        } else if (interactionType === "color") {
          // For color code, create a triangular pattern
          isRydberg = ((i + 2*j) % 3 === 0) && (Math.random() < Math.min(1, step / 15))
        } else if (interactionType === "gauge") {
          // For gauge theory, create a more complex pattern
          isRydberg = ((i*j) % 3 === 0) && (Math.random() < Math.min(1, step / 15))
        }
        
        // Draw atom
        ctx.beginPath()
        ctx.arc(x, y, 8, 0, 2 * Math.PI)
        
        if (isRydberg) {
          // Rydberg state - excited
          ctx.fillStyle = 'rgba(255, 100, 100, 0.8)'
        } else {
          // Ground state
          ctx.fillStyle = 'rgba(100, 255, 100, 0.8)'
        }
        
        ctx.fill()
        ctx.strokeStyle = 'rgba(0, 255, 0, 0.8)'
        ctx.stroke()
      }
    }
    
    // Draw n-body interactions if simulation is running
    if (step > 5) {
      const interactionProgress = Math.min(1, (step - 5) / 10)
      
      if (interactionType === "toric") {
        // Draw 4-body plaquette interactions for toric code
        for (let i = 0; i < latticeSize - 1; i++) {
          for (let j = 0; j < latticeSize - 1; j++) {
            const x = startX + (i + 1) * cellSize
            const y = startY + (j + 1) * cellSize
            
            // Draw interaction lines connecting 4 atoms in a plaquette
            ctx.strokeStyle = `rgba(0, 200, 255, ${0.7 * interactionProgress})`
            ctx.lineWidth = 2
            
            ctx.beginPath()
            ctx.moveTo(x - cellSize/2, y - cellSize/2)
            ctx.lineTo(x + cellSize/2, y - cellSize/2)
            ctx.lineTo(x + cellSize/2, y + cellSize/2)
            ctx.lineTo(x - cellSize/2, y + cellSize/2)
            ctx.closePath()
            ctx.stroke()
          }
        }
      } else if (interactionType === "color") {
        // Draw 6-body interactions for color code
        for (let i = 1; i < latticeSize - 1; i += 2) {
          for (let j = 1; j < latticeSize - 1; j += 2) {
            const x = startX + (i + 0.5) * cellSize
            const y = startY + (j + 0.5) * cellSize
            
            // Draw hexagonal interaction
            ctx.strokeStyle = `rgba(255, 200, 0, ${0.7 * interactionProgress})`
            ctx.lineWidth = 2
            
            ctx.beginPath()
            for (let k = 0; k < 6; k++) {
              const angle = k * Math.PI / 3
              const px = x + Math.cos(angle) * cellSize * 0.8
              const py = y + Math.sin(angle) * cellSize * 0.8
              
              if (k === 0) {
                ctx.moveTo(px, py)
              } else {
                ctx.lineTo(px, py)
              }
            }
            ctx.closePath()
            ctx.stroke()
          }
        }
      } else if (interactionType === "gauge") {
        // Draw star-shaped interactions for gauge theories
        for (let i = 1; i < latticeSize - 1; i++) {
          for (let j = 1; j < latticeSize - 1; j++) {
            if ((i + j) % 3 === 0) {
              const x = startX + (i + 0.5) * cellSize
              const y = startY + (j + 0.5) * cellSize
              
              // Draw star interaction
              ctx.strokeStyle = `rgba(200, 100, 255, ${0.7 * interactionProgress})`
              ctx.lineWidth = 2
              
              // Connect to neighboring atoms
              const neighbors = [
                [i-1, j], [i+1, j], [i, j-1], [i, j+1]
              ]
              
              for (const [ni, nj] of neighbors) {
                if (ni >= 0 && ni < latticeSize && nj >= 0 && nj < latticeSize) {
                  const nx = startX + (ni + 0.5) * cellSize
                  const ny = startY + (nj + 0.5) * cellSize
                  
                  ctx.beginPath()
                  ctx.moveTo(x, y)
                  ctx.lineTo(nx, ny)
                  ctx.stroke()
                }
              }
            }
          }
        }
      }
    }
    
    // Draw quantum circuit representation if step is high enough
    if (step > 15) {
      const circuitProgress = Math.min(1, (step - 15) / 10)
      const circuitHeight = 100
      const circuitWidth = 400
      const circuitX = (canvas.width - circuitWidth) / 2
      const circuitY = startY + latticeSize * cellSize + 40
      
      // Draw circuit background
      ctx.fillStyle = `rgba(0, 0, 0, ${0.7 * circuitProgress})`
      ctx.fillRect(circuitX, circuitY, circuitWidth, circuitHeight)
      
      // Draw circuit border
      ctx.strokeStyle = `rgba(0, 255, 0, ${circuitProgress})`
      ctx.lineWidth = 1
      ctx.strokeRect(circuitX, circuitY, circuitWidth, circuitHeight)
      
      // Draw circuit title
      ctx.fillStyle = `rgba(0, 255, 0, ${circuitProgress})`
      ctx.font = '12px monospace'
      ctx.fillText('Rydberg Gate Sequence', circuitX + 10, circuitY + 15)
      
      // Draw quantum wires
      const wireCount = 4
      const wireSpacing = (circuitHeight - 20) / (wireCount + 1)
      
      for (let i = 0; i < wireCount; i++) {
        const y = circuitY + 20 + (i + 1) * wireSpacing
        
        ctx.beginPath()
        ctx.moveTo(circuitX + 10, y)
        ctx.lineTo(circuitX + circuitWidth - 10, y)
        ctx.strokeStyle = `rgba(0, 255, 0, ${circuitProgress})`
        ctx.stroke()
        
        // Draw qubit labels
        ctx.fillStyle = `rgba(0, 255, 0, ${circuitProgress})`
        ctx.font = '10px monospace'
        ctx.fillText(`|q${i}⟩`, circuitX - 25, y + 3)
      }
      
      // Draw n-body gate
      const gateWidth = 60
      const gateX = circuitX + 100
      
      ctx.fillStyle = `rgba(100, 100, 255, ${0.7 * circuitProgress})`
      ctx.fillRect(gateX, circuitY + 20 + wireSpacing - 15, gateWidth, wireSpacing * (wireCount - 1) + 30)
      
      ctx.strokeStyle = `rgba(0, 255, 0, ${circuitProgress})`
      ctx.strokeRect(gateX, circuitY + 20 + wireSpacing - 15, gateWidth, wireSpacing * (wireCount - 1) + 30)
      
      // Draw gate label
      ctx.fillStyle = `rgba(0, 255, 0, ${circuitProgress})`
      ctx.font = '12px monospace'
      
      let gateLabel = "R₄"
      if (interactionType === "color") gateLabel = "R₆"
      if (interactionType === "gauge") gateLabel = "R₃"
      
      ctx.fillText(gateLabel, gateX + gateWidth/2 - 10, circuitY + 20 + wireSpacing * 2)
      
      // Draw another gate
      const gate2X = gateX + 120
      
      ctx.fillStyle = `rgba(255, 100, 100, ${0.7 * circuitProgress})`
      ctx.fillRect(gate2X, circuitY + 20 + wireSpacing - 15, gateWidth, wireSpacing * (wireCount - 1) + 30)
      
      ctx.strokeStyle = `rgba(0, 255, 0, ${circuitProgress})`
      ctx.strokeRect(gate2X, circuitY + 20 + wireSpacing - 15, gateWidth, wireSpacing * (wireCount - 1) + 30)
      
      // Draw gate label
      ctx.fillStyle = `rgba(0, 255, 0, ${circuitProgress})`
      ctx.font = '12px monospace'
      ctx.fillText("U", gate2X + gateWidth/2 - 5, circuitY + 20 + wireSpacing * 2)
    }
    
    // Draw title and model info
    ctx.fillStyle = 'rgb(0, 255, 0)'
    ctx.font = '16px monospace'
    ctx.fillText('Rydberg Quantum Simulator', (canvas.width - 240) / 2, 30)
    
    ctx.font = '12px monospace'
    let modelName = "Toric Code Model"
    if (interactionType === "color") modelName = "Color Code Model"
    if (interactionType === "gauge") modelName = "Lattice Gauge Theory"
    
    ctx.fillText(modelName, (canvas.width - ctx.measureText(modelName).width) / 2, 50)
    
    // Draw step indicator
    if (isRunning) {
      ctx.fillStyle = 'rgb(0, 255, 0)'
      ctx.font = '12px monospace'
      ctx.fillText(`Simulation step: ${step}/25`, 20, canvas.height - 20)
    }
  }, [latticeSize, interactionType, step, isRunning])
  
  return (
    <div className="font-mono text-green-500">
      <div className="mb-4 text-center">
        <h3 className="text-lg mb-2">Rydberg Atom Quantum Simulator</h3>
        <p className="text-sm mb-4">Universal Quantum Simulator for n-body Interactions</p>
      </div>
      
      <div className="flex flex-col gap-6">
        <div>
          <div className="mb-2 text-sm">Simulation Visualization:</div>
          <div className="border border-green-500 p-2 bg-black/30 flex justify-center">
            <canvas ref={canvasRef} width={500} height={400} />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="mb-2 text-sm">Interaction Model:</div>
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  checked={interactionType === 'toric'}
                  onChange={() => setInteractionType('toric')}
                  disabled={isRunning}
                  className="mr-2"
                />
                <span>Toric Code</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  checked={interactionType === 'color'}
                  onChange={() => setInteractionType('color')}
                  disabled={isRunning}
                  className="mr-2"
                />
                <span>Color Code</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  checked={interactionType === 'gauge'}
                  onChange={() => setInteractionType('gauge')}
                  disabled={isRunning}
                  className="mr-2"
                />
                <span>Gauge Theory</span>
              </label>
            </div>
          </div>
          
          <div className="flex items-end justify-end">
            <button
              onClick={runSimulation}
              disabled={isRunning}
              className={cn(
                "px-4 py-1 border border-green-500 rounded",
                isRunning ? "opacity-50 cursor-not-allowed" : "hover:bg-green-900"
              )}
            >
              {isRunning ? "Simulating..." : "Run Rydberg Simulation"}
            </button>
          </div>
        </div>
        
        <div className="text-xs">
          <div className="mb-1">Simulation Steps:</div>
          <ol className="list-decimal list-inside space-y-1">
            <li className={step >= 1 ? "text-green-400" : "text-green-900"}>
              Initialize atoms in optical lattice
            </li>
            <li className={step >= 5 ? "text-green-400" : "text-green-900"}>
              Apply laser excitation to create Rydberg states
            </li>
            <li className={step >= 10 ? "text-green-400" : "text-green-900"}>
              Establish n-body interactions via Rydberg blockade
            </li>
            <li className={step >= 15 ? "text-green-400" : "text-green-900"}>
              Implement multi-qubit entangling gates
            </li>
            <li className={step >= 20 ? "text-green-400" : "text-green-900"}>
              Measure quantum correlations in the system
            </li>
          </ol>
        </div>
        
        <div className="text-xs border-t border-green-500 pt-2">
          <div className="mb-1">Key Features:</div>
          <ul className="list-disc list-inside">
            <li>Simulates exotic spin models with n-body interactions</li>
            <li>Implements {interactionType === "toric" ? "4-body" : interactionType === "color" ? "6-body" : "3-body"} constraints using Rydberg blockade</li>
            <li>Creates highly-entangled quantum states with topological properties</li>
            <li>Enables simulation of systems intractable for classical computers</li>
          </ul>
        </div>
      </div>
    </div>
  )
} 