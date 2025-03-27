"use client"

import { useEffect, useState } from "react"

type Gate = {
  type: "H" | "X" | "Y" | "Z" | "CNOT" | "SWAP"
  position: number
  control?: number
  animating?: boolean
}

export default function QuantumCircuit() {
  const [qubits] = useState(3)
  const [gates, setGates] = useState<Gate[]>([])
  const [step, setStep] = useState(0)
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    // Initialize with some gates for demonstration
    const initialGates: Gate[] = [
      { type: "H", position: 0 },
      { type: "CNOT", position: 1, control: 0 },
      { type: "H", position: 2 },
      { type: "X", position: 0 },
      { type: "CNOT", position: 2, control: 1 },
    ]

    const timer = setInterval(() => {
      setStep((prev) => {
        if (prev >= initialGates.length) {
          clearInterval(timer)
          return prev
        }
        
        // Add animation flag to the new gate
        const newGate = {...initialGates[prev], animating: true}
        setGates((g) => [...g])
        
        // Start animation
        setAnimating(true)
        setTimeout(() => {
          setAnimating(false)
          setGates((g) => [...g, {...newGate, animating: false}])
        }, 500)
        
        return prev + 1
      })
    }, 1200)

    return () => clearInterval(timer)
  }, [])

  const renderGate = (gate: Gate) => {
    const animationClass = gate.animating ? "animate-pulse scale-110" : ""
    
    switch (gate.type) {
      case "H":
        return <div className={`w-8 h-8 border border-green-500 flex items-center justify-center text-green-500 transition-all ${animationClass}`}>H</div>
      case "X":
        return <div className={`w-8 h-8 border border-green-500 flex items-center justify-center text-green-500 transition-all ${animationClass}`}>X</div>
      case "Y":
        return <div className={`w-8 h-8 border border-green-500 flex items-center justify-center text-green-500 transition-all ${animationClass}`}>Y</div>
      case "Z":
        return <div className={`w-8 h-8 border border-green-500 flex items-center justify-center text-green-500 transition-all ${animationClass}`}>Z</div>
      case "CNOT":
        return <div className={`w-8 h-8 border border-green-500 flex items-center justify-center text-green-500 transition-all ${animationClass}`}>⊕</div>
      case "SWAP":
        return <div className={`w-8 h-8 border border-green-500 flex items-center justify-center text-green-500 transition-all ${animationClass}`}>⨯</div>
      default:
        return null
    }
  }

  return (
    <div className="font-mono text-green-500">
      <div className="mb-2">Quantum Circuit Simulation</div>
      <div className="grid gap-4">
        {Array.from({ length: qubits }).map((_, i) => (
          <div key={i} className="flex items-center">
            <div className="w-8 mr-2 text-right">q{i}:</div>
            <div className="flex-1 h-0.5 bg-green-500 relative flex items-center">
              {gates
                .filter((gate) => gate.position === i || gate.control === i)
                .map((gate, j) => {
                  const isControl = gate.control === i
                  const animationClass = gate.animating ? "animate-pulse" : ""

                  return (
                    <div key={j} className="absolute" style={{ left: `${(j + 1) * 60}px` }}>
                      {isControl ? (
                        <div className={`w-8 h-8 flex items-center justify-center ${animationClass}`}>
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          {gate.position !== undefined && gate.control !== undefined && (
                            <div
                              className={`absolute w-0.5 bg-green-500 ${animationClass}`}
                              style={{
                                height: `${Math.abs(gate.position - gate.control) * 40}px`,
                                top: gate.position > gate.control ? "50%" : "auto",
                                bottom: gate.position < gate.control ? "50%" : "auto",
                              }}
                            ></div>
                          )}
                        </div>
                      ) : (
                        renderGate(gate)
                      )}
                    </div>
                  )
                })}
            </div>
            <div className="ml-2 w-16">|{i === 0 ? "0" : i === 1 ? "+" : "Ψ"}⟩</div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-sm">
        <div>
          Quantum State:
          <span className={`ml-2 font-bold ${animating ? 'animate-pulse text-green-300' : ''}`}>
            {step >= 5
              ? "1/√2(|000⟩ + |111⟩)"
              : step >= 3
                ? "1/√2(|00⟩ + |11⟩)|0⟩"
                : step >= 1
                  ? "1/√2(|0⟩ + |1⟩)|00⟩"
                  : "|000⟩"}
          </span>
        </div>
      </div>
    </div>
  )
}

