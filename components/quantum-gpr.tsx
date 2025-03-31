"use client"

import { useEffect, useState, useRef } from "react"
import { cn } from "@/lib/utils"

interface QuantumGPRProps {
  onComplete?: () => void
}

export default function QuantumGPR({ onComplete }: QuantumGPRProps) {
  const [dataPoints, setDataPoints] = useState<{x: number, y: number}[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [step, setStep] = useState(0)
  const [speedup, setSpeedup] = useState<"exponential" | "polynomial">("exponential")
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  // Generate random data points
  useEffect(() => {
    const newPoints = []
    for (let i = 0; i < 10; i++) {
      const x = Math.random() * 0.8 + 0.1
      // Generate y values following a sine curve with some noise
      const y = 0.5 + 0.4 * Math.sin(x * 10) + (Math.random() * 0.1 - 0.05)
      newPoints.push({ x, y })
    }
    setDataPoints(newPoints)
  }, [])
  
  // Run the simulation
  const runSimulation = () => {
    setIsRunning(true)
    setStep(0)
  }
  
  // Update step
  useEffect(() => {
    if (!isRunning) return
    
    const timer = setTimeout(() => {
      if (step < 20) {
        setStep(step + 1)
      } else {
        setIsRunning(false)
        if (onComplete) onComplete()
      }
    }, 300)
    
    return () => clearTimeout(timer)
  }, [step, isRunning, onComplete])
  
  // Draw the visualization
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || dataPoints.length === 0) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Set canvas dimensions
    canvas.width = 500
    canvas.height = 300
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // Draw coordinate axes
    ctx.strokeStyle = 'rgba(0, 255, 0, 0.5)'
    ctx.lineWidth = 1
    
    // x-axis
    ctx.beginPath()
    ctx.moveTo(50, canvas.height - 50)
    ctx.lineTo(canvas.width - 50, canvas.height - 50)
    ctx.stroke()
    
    // y-axis
    ctx.beginPath()
    ctx.moveTo(50, 50)
    ctx.lineTo(50, canvas.height - 50)
    ctx.stroke()
    
    // Draw axis labels
    ctx.fillStyle = 'rgb(0, 255, 0)'
    ctx.font = '12px monospace'
    ctx.fillText('x', canvas.width - 40, canvas.height - 40)
    ctx.fillText('y', 40, 40)
    
    // Draw data points
    ctx.fillStyle = 'rgb(255, 255, 0)'
    dataPoints.forEach(point => {
      const x = 50 + point.x * (canvas.width - 100)
      const y = canvas.height - 50 - point.y * (canvas.height - 100)
      
      ctx.beginPath()
      ctx.arc(x, y, 4, 0, 2 * Math.PI)
      ctx.fill()
    })
    
    // Draw GP regression curve based on step
    if (step > 0) {
      ctx.strokeStyle = 'rgb(0, 255, 0)'
      ctx.lineWidth = 2
      ctx.beginPath()
      
      // Number of points to draw for the curve
      const numPoints = 100
      
      // Progress of the curve drawing based on step
      const progress = Math.min(1, step / 10)
      const pointsToDraw = Math.floor(numPoints * progress)
      
      for (let i = 0; i < pointsToDraw; i++) {
        const xVal = i / (numPoints - 1)
        const x = 50 + xVal * (canvas.width - 100)
        
        // Calculate y using a simple GP-like function (sine with damping)
        const yVal = 0.5 + 0.4 * Math.sin(xVal * 10) * Math.min(1, step / 5)
        const y = canvas.height - 50 - yVal * (canvas.height - 100)
        
        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      
      ctx.stroke()
      
      // Draw uncertainty bands if step is high enough
      if (step > 5) {
        const uncertaintyProgress = Math.min(1, (step - 5) / 10)
        
        ctx.fillStyle = `rgba(0, 255, 0, ${0.1 * uncertaintyProgress})`
        ctx.beginPath()
        
        // Upper band
        for (let i = 0; i < numPoints; i++) {
          const xVal = i / (numPoints - 1)
          const x = 50 + xVal * (canvas.width - 100)
          const yBase = 0.5 + 0.4 * Math.sin(xVal * 10) * Math.min(1, step / 5)
          const uncertainty = 0.1 * (1 - Math.abs(xVal - 0.5)) * uncertaintyProgress
          const y = canvas.height - 50 - (yBase + uncertainty) * (canvas.height - 100)
          
          if (i === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        
        // Lower band
        for (let i = numPoints - 1; i >= 0; i--) {
          const xVal = i / (numPoints - 1)
          const x = 50 + xVal * (canvas.width - 100)
          const yBase = 0.5 + 0.4 * Math.sin(xVal * 10) * Math.min(1, step / 5)
          const uncertainty = 0.1 * (1 - Math.abs(xVal - 0.5)) * uncertaintyProgress
          const y = canvas.height - 50 - (yBase - uncertainty) * (canvas.height - 100)
          
          ctx.lineTo(x, y)
        }
        
        ctx.closePath()
        ctx.fill()
      }
      
      // Draw quantum circuit representation if step is high enough
      if (step > 10) {
        const circuitProgress = Math.min(1, (step - 10) / 10)
        const circuitHeight = 80
        const circuitWidth = 300
        const circuitX = (canvas.width - circuitWidth) / 2
        const circuitY = 50
        
        // Draw circuit background
        ctx.fillStyle = `rgba(0, 0, 0, ${0.7 * circuitProgress})`
        ctx.fillRect(circuitX, circuitY, circuitWidth, circuitHeight)
        
        // Draw circuit border
        ctx.strokeStyle = `rgba(0, 255, 0, ${circuitProgress})`
        ctx.lineWidth = 1
        ctx.strokeRect(circuitX, circuitY, circuitWidth, circuitHeight)
        
        // Draw quantum wires
        const wireCount = 4
        const wireSpacing = circuitHeight / (wireCount + 1)
        
        for (let i = 0; i < wireCount; i++) {
          const y = circuitY + (i + 1) * wireSpacing
          
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
        
        // Draw quantum gates
        const gatePositions = [
          { x: circuitX + 50, y: circuitY + wireSpacing, label: 'H' },
          { x: circuitX + 50, y: circuitY + 2 * wireSpacing, label: 'H' },
          { x: circuitX + 100, y: circuitY + 2 * wireSpacing, label: 'R' },
          { x: circuitX + 150, y: circuitY + wireSpacing, label: 'SWAP' },
          { x: circuitX + 150, y: circuitY + 3 * wireSpacing, label: 'SWAP' },
          { x: circuitX + 200, y: circuitY + 2 * wireSpacing, label: 'QFT' },
          { x: circuitX + 250, y: circuitY + wireSpacing, label: 'M' },
        ]
        
        gatePositions.forEach(gate => {
          ctx.fillStyle = `rgba(0, 0, 0, ${circuitProgress})`
          ctx.strokeStyle = `rgba(0, 255, 0, ${circuitProgress})`
          
          // Draw gate box
          ctx.fillRect(gate.x - 15, gate.y - 15, 30, 30)
          ctx.strokeRect(gate.x - 15, gate.y - 15, 30, 30)
          
          // Draw gate label
          ctx.fillStyle = `rgba(0, 255, 0, ${circuitProgress})`
          ctx.font = '10px monospace'
          ctx.fillText(gate.label, gate.x - gate.label.length * 3, gate.y + 3)
        })
        
        // Draw CNOT connections
        ctx.beginPath()
        ctx.moveTo(circuitX + 100, circuitY + wireSpacing)
        ctx.lineTo(circuitX + 100, circuitY + 2 * wireSpacing)
        ctx.strokeStyle = `rgba(0, 255, 0, ${circuitProgress})`
        ctx.stroke()
        
        // Draw control point
        ctx.fillStyle = `rgba(0, 255, 0, ${circuitProgress})`
        ctx.beginPath()
        ctx.arc(circuitX + 100, circuitY + wireSpacing, 3, 0, 2 * Math.PI)
        ctx.fill()
      }
      
      // Draw complexity comparison
      if (step > 15) {
        const comparisonProgress = Math.min(1, (step - 15) / 5)
        const compX = canvas.width - 180
        const compY = canvas.height - 120
        
        ctx.fillStyle = `rgba(0, 0, 0, ${0.7 * comparisonProgress})`
        ctx.fillRect(compX, compY, 160, 60)
        
        ctx.strokeStyle = `rgba(0, 255, 0, ${comparisonProgress})`
        ctx.lineWidth = 1
        ctx.strokeRect(compX, compY, 160, 60)
        
        ctx.fillStyle = `rgba(0, 255, 0, ${comparisonProgress})`
        ctx.font = '12px monospace'
        ctx.fillText('Complexity:', compX + 10, compY + 15)
        ctx.fillText('Classical: O(n³)', compX + 10, compY + 35)
        
        if (speedup === 'exponential') {
          ctx.fillText('Quantum: O(log(n))', compX + 10, compY + 55)
        } else {
          ctx.fillText('Quantum: O(n)', compX + 10, compY + 55)
        }
      }
    }
  }, [dataPoints, step, speedup])
  
  return (
    <div className="font-mono text-green-500">
      <div className="mb-4 text-center">
        <h3 className="text-lg mb-2">Quantum Gaussian Process Regression</h3>
        <p className="text-sm mb-4">Exponential Speedup via Quantum Linear Systems Algorithm</p>
      </div>
      
      <div className="flex flex-col gap-6">
        <div>
          <div className="mb-2 text-sm">GPR Visualization:</div>
          <div className="border border-green-500 p-2 bg-black/30 flex justify-center">
            <canvas ref={canvasRef} width={500} height={300} />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="mb-2 text-sm">Speedup Type:</div>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  checked={speedup === 'exponential'}
                  onChange={() => setSpeedup('exponential')}
                  disabled={isRunning}
                  className="mr-2"
                />
                <span>Exponential</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  checked={speedup === 'polynomial'}
                  onChange={() => setSpeedup('polynomial')}
                  disabled={isRunning}
                  className="mr-2"
                />
                <span>Polynomial</span>
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
              {isRunning ? "Simulating..." : "Run Quantum GPR"}
            </button>
          </div>
        </div>
        
        <div className="text-xs">
          <div className="mb-1">Algorithm Steps:</div>
          <ol className="list-decimal list-inside space-y-1">
            <li className={step >= 1 ? "text-green-400" : "text-green-900"}>
              Encode training data into quantum state |X⟩|y⟩
            </li>
            <li className={step >= 5 ? "text-green-400" : "text-green-900"}>
              Prepare kernel matrix K using quantum feature maps
            </li>
            <li className={step >= 10 ? "text-green-400" : "text-green-900"}>
              Apply quantum linear systems algorithm to solve K|α⟩ = |y⟩
            </li>
            <li className={step >= 15 ? "text-green-400" : "text-green-900"}>
              Compute predictive mean and variance using quantum circuits
            </li>
            <li className={step >= 20 ? "text-green-400" : "text-green-900"}>
              Measure final quantum state to obtain GPR prediction
            </li>
          </ol>
        </div>
        
        <div className="text-xs border-t border-green-500 pt-2">
          <div className="mb-1">Quantum Advantage:</div>
          <ul className="list-disc list-inside">
            <li>Classical GPR requires O(n³) operations for n training points</li>
            <li>Quantum algorithm achieves {speedup === 'exponential' ? 'exponential O(log(n))' : 'polynomial O(n)'} complexity</li>
            <li>Enables GPR on massive datasets intractable for classical computers</li>
            <li>Provides uncertainty quantification with quantum speedup</li>
          </ul>
        </div>
      </div>
    </div>
  )
} 