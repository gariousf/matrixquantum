"use client"

import { useEffect, useState, useRef } from "react"
import { cn } from "@/lib/utils"

interface QuantumMatrixFunctionProps {
  onComplete?: () => void
}

export default function QuantumMatrixFunction({ onComplete }: QuantumMatrixFunctionProps) {
  const [step, setStep] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  // Start the simulation
  const runSimulation = () => {
    setIsRunning(true)
    setStep(0)
    setResult(null)
  }
  
  // Visualization of Cauchy's integral contour
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Set canvas dimensions
    canvas.width = 300
    canvas.height = 300
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // Draw coordinate axes
    ctx.strokeStyle = 'rgba(0, 255, 0, 0.3)'
    ctx.lineWidth = 1
    
    // x-axis
    ctx.beginPath()
    ctx.moveTo(0, canvas.height / 2)
    ctx.lineTo(canvas.width, canvas.height / 2)
    ctx.stroke()
    
    // y-axis
    ctx.beginPath()
    ctx.moveTo(canvas.width / 2, 0)
    ctx.lineTo(canvas.width / 2, canvas.height)
    ctx.stroke()
    
    // Draw Cauchy contour (circle)
    ctx.strokeStyle = 'rgb(0, 255, 0)'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.arc(canvas.width / 2, canvas.height / 2, 100, 0, 2 * Math.PI)
    ctx.stroke()
    
    // If simulation is running, animate the integration points
    if (isRunning && step > 0) {
      const numPoints = 16
      const completedPoints = Math.min(step, numPoints)
      
      for (let i = 0; i < completedPoints; i++) {
        const angle = (i / numPoints) * 2 * Math.PI
        const x = canvas.width / 2 + 100 * Math.cos(angle)
        const y = canvas.height / 2 + 100 * Math.sin(angle)
        
        ctx.fillStyle = 'rgb(0, 255, 0)'
        ctx.beginPath()
        ctx.arc(x, y, 4, 0, 2 * Math.PI)
        ctx.fill()
        
        // Draw line to center for visualization
        if (step > numPoints) {
          ctx.strokeStyle = 'rgba(0, 255, 0, 0.5)'
          ctx.beginPath()
          ctx.moveTo(canvas.width / 2, canvas.height / 2)
          ctx.lineTo(x, y)
          ctx.stroke()
        }
      }
      
      // Draw eigenvalues inside the contour
      if (step > numPoints + 2) {
        const eigenvalues = [
          { x: canvas.width / 2 - 30, y: canvas.height / 2 - 20 },
          { x: canvas.width / 2 + 40, y: canvas.height / 2 + 10 },
          { x: canvas.width / 2 - 10, y: canvas.height / 2 + 30 }
        ]
        
        ctx.fillStyle = 'rgb(255, 100, 100)'
        eigenvalues.forEach(point => {
          ctx.beginPath()
          ctx.arc(point.x, point.y, 3, 0, 2 * Math.PI)
          ctx.fill()
        })
      }
    }
  }, [isRunning, step])
  
  // Simulation steps
  useEffect(() => {
    if (!isRunning) return
    
    const totalSteps = 25
    
    const timer = setTimeout(() => {
      if (step < totalSteps) {
        setStep(prev => prev + 1)
      } else {
        setIsRunning(false)
        setResult("1/√2(|f(λ₁)⟩ + |f(λ₂)⟩)")
        if (onComplete) onComplete()
      }
    }, 400)
    
    return () => clearTimeout(timer)
  }, [isRunning, step, onComplete])
  
  return (
    <div className="font-mono text-green-500">
      <div className="mb-4 text-center">
        <h3 className="text-lg mb-2">Quantum Matrix Function Algorithm</h3>
        <p className="text-sm mb-4">Using Cauchy's Integral Formula</p>
        
        <div className="flex justify-center mb-4">
          <button
            onClick={runSimulation}
            disabled={isRunning}
            className={cn(
              "px-4 py-1 border border-green-500 rounded",
              isRunning ? "opacity-50 cursor-not-allowed" : "hover:bg-green-900"
            )}
          >
            {isRunning ? "Simulating..." : "Run Simulation"}
          </button>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <div className="mb-2 text-sm">Cauchy Contour Integration:</div>
          <div className="border border-green-500 p-2 bg-black/30 flex justify-center">
            <canvas ref={canvasRef} width={300} height={300} />
          </div>
        </div>
        
        <div className="flex-1">
          <div className="mb-2 text-sm">Algorithm Steps:</div>
          <div className="border border-green-500 p-2 bg-black/30 h-[300px] overflow-y-auto">
            <div className={cn("mb-2", step >= 1 ? "text-green-400" : "text-green-900")}>
              1. Prepare quantum state |b⟩
            </div>
            <div className={cn("mb-2", step >= 3 ? "text-green-400" : "text-green-900")}>
              2. Discretize Cauchy's integral formula:
              <div className="ml-4 mt-1 text-xs">
                f(A)b = 1/(2πi) ∮ f(z)(zI-A)⁻¹b dz
              </div>
            </div>
            <div className={cn("mb-2", step >= 6 ? "text-green-400" : "text-green-900")}>
              3. Implement quantum linear system algorithm for (zI-A)x = b
            </div>
            <div className={cn("mb-2", step >= 10 ? "text-green-400" : "text-green-900")}>
              4. Apply phase estimation to implement matrix inversion
            </div>
            <div className={cn("mb-2", step >= 14 ? "text-green-400" : "text-green-900")}>
              5. Compute f(z) at each integration point
            </div>
            <div className={cn("mb-2", step >= 18 ? "text-green-400" : "text-green-900")}>
              6. Combine results with quantum amplitude amplification
            </div>
            <div className={cn("mb-2", step >= 22 ? "text-green-400" : "text-green-900")}>
              7. Measure final quantum state |f(A)b⟩
            </div>
            
            {result && (
              <div className="mt-4 border-t border-green-500 pt-2">
                <div className="text-sm">Result:</div>
                <div className="text-lg text-center mt-2 animate-pulse">{result}</div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-4 text-xs">
        <div className="mb-1">Key Advantages:</div>
        <ul className="list-disc list-inside">
          <li>Works for non-Hermitian matrices</li>
          <li>Avoids eigenvalue decomposition</li>
          <li>Achieves O(log(N)poly(log(1/ε))) complexity</li>
          <li>Handles general matrix functions f(A)</li>
        </ul>
      </div>
      
      <div className="mt-4 text-xs border-t border-green-500 pt-2">
        <div className="text-center opacity-70">
          Mathematical formulation: f(A)b = 1/(2πi) ∮ f(z)(zI-A)⁻¹b dz
        </div>
      </div>
    </div>
  )
} 