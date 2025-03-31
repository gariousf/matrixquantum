"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Loader2, TerminalIcon, Zap, Volume2, VolumeX } from "lucide-react"
import MatrixRain from "./matrix-rain"
import QuantumCircuit from "./quantum-circuit"
import { useSoundEffects } from "./sound-effects"
import ContractInfo from "./contract-info"
import QuantumMatrixFunction from "./quantum-matrix-function"
import MathExplanation from "./math-explanation"
import QuantumMagnetism from "./quantum-magnetism"
import MagnetismTheory from "./magnetism-theory"
import QuantumGPR from "./quantum-gpr"
import GPRTheory from "./gpr-theory"
import RydbergSimulator from "./rydberg-simulator"
import RydbergTheory from "./rydberg-theory"

const CONTRACT_ADDRESS = "12ajpBibVyBiiyK7jCamwk2KxBGSfszUL7nqoMFJpump"

const COMMANDS = {
  HELP: "help",
  CLEAR: "clear",
  MATRIX: "matrix",
  QUANTUM: "quantum",
  RUN: "run",
  EXIT: "exit",
  HACK: "hack",
  DECRYPT: "decrypt",
  GAME: "game",
  SOUND: "sound",
  EASTER: "neo",
  CONTRACT: "contract",
  MATRIX_FUNC: "matrixfunc",
  MATH_THEORY: "maththeory",
  MAGNETISM: "magnetism",
  MAGTHEORY: "magtheory",
  GPR: "gpr",
  GPRTHEORY: "gprtheory",
  RYDBERG: "rydberg",
  RYDTHEORY: "rydtheory",
}

const QUANTUM_STATES = ["|0⟩", "|1⟩", "|+⟩", "|-⟩", "|Ψ⟩", "1/√2(|00⟩ + |11⟩)"]

// ASCII art for fun
const MATRIX_ASCII = `
 __  __       _        _      
|  \\/  | __ _| |_ _ __(_)_  __
| |\\/| |/ _\` | __| '__| \\ \\/ /
| |  | | (_| | |_| |  | |>  < 
|_|  |_|\\__,_|\\__|_|  |_/_/\\_\\
`

export default function QuantumTerminal() {
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<string[]>([
    "MATRIX QUANTUM TERMINAL v1.0",
    "Type 'help' for available commands.",
    "",
  ])
  const [loading, setLoading] = useState(false)
  const [showRain, setShowRain] = useState(false)
  const [showCircuit, setShowCircuit] = useState(false)
  const [showContract, setShowContract] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [gameActive, setGameActive] = useState(false)
  const [decryptProgress, setDecryptProgress] = useState(0)
  const [showMatrixFunc, setShowMatrixFunc] = useState(false)
  const [showMathTheory, setShowMathTheory] = useState(false)
  const [showMagnetism, setShowMagnetism] = useState(false)
  const [showMagTheory, setShowMagTheory] = useState(false)
  const [showGPR, setShowGPR] = useState(false)
  const [showGPRTheory, setShowGPRTheory] = useState(false)
  const [showRydberg, setShowRydberg] = useState(false)
  const [showRydTheory, setShowRydTheory] = useState(false)
  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const { playSound } = useSoundEffects()

  const addToHistory = (text: string) => {
    setHistory((prev) => [...prev, text])
    if (soundEnabled) playSound("keypress")
  }

  const handleCommand = (command: string) => {
    if (!command) return
    
    // Add command to history
    addToHistory(`> ${command}`)
    
    // Process command
    const normalizedCommand = command.trim().toLowerCase()
    
    if (normalizedCommand === COMMANDS.HELP) {
      // Help command logic
      addToHistory("Available commands:")
      addToHistory(`  ${COMMANDS.HELP}    - Show this help message`)
      addToHistory(`  ${COMMANDS.CLEAR}   - Clear terminal`)
      addToHistory(`  ${COMMANDS.MATRIX}  - Toggle Matrix code rain`)
      addToHistory(`  ${COMMANDS.QUANTUM} - Show quantum circuit`)
      addToHistory(`  ${COMMANDS.RUN}     - Run quantum simulation`)
      addToHistory(`  ${COMMANDS.HACK}    - Hack the mainframe`)
      addToHistory(`  ${COMMANDS.DECRYPT} - Decrypt encrypted message`)
      addToHistory(`  ${COMMANDS.GAME}    - Play a mini-game`)
      addToHistory(`  ${COMMANDS.SOUND}   - Toggle sound effects`)
      addToHistory(`  ${COMMANDS.CONTRACT} - Display contract address`)
      addToHistory(`  ${COMMANDS.MATRIX_FUNC} - Run quantum matrix function algorithm`)
      addToHistory(`  ${COMMANDS.MATH_THEORY} - Show mathematical theory`)
      addToHistory(`  ${COMMANDS.MAGNETISM} - Run quantum magnetism simulation`)
      addToHistory(`  ${COMMANDS.MAGTHEORY} - Show magnetism theory`)
      addToHistory(`  ${COMMANDS.GPR} - Run quantum GPR simulation`)
      addToHistory(`  ${COMMANDS.GPRTHEORY} - Show GPR theory`)
      addToHistory(`  ${COMMANDS.RYDBERG} - Run Rydberg atom simulation`)
      addToHistory(`  ${COMMANDS.RYDTHEORY} - Show Rydberg theory`)
      addToHistory(`  ${COMMANDS.EXIT}    - Exit terminal`)
      if (soundEnabled) playSound("success")
    } else if (normalizedCommand === COMMANDS.CLEAR) {
      // Clear command logic
      setHistory(["MATRIX QUANTUM TERMINAL v1.0", ""])
      setShowCircuit(false)
      setShowMatrixFunc(false)
      setShowMathTheory(false)
      setShowContract(false)
      setShowMagnetism(false)
      setShowMagTheory(false)
      setShowGPR(false)
      setShowGPRTheory(false)
      setShowRydberg(false)
      setShowRydTheory(false)
      if (soundEnabled) playSound("success")
    } else if (normalizedCommand === COMMANDS.MATRIX) {
      // Toggle the Matrix rain effect
      const newRainState = !showRain;
      setShowRain(newRainState);
      
      // Play appropriate sound effect
      if (soundEnabled) playSound("matrix");
      
      // Add message to terminal history
      addToHistory(`Matrix code rain ${newRainState ? "activated" : "deactivated"}`);
      
      // Ensure input focus is maintained after toggling Matrix rain
      // Use a slightly longer timeout to ensure the DOM has updated
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100);
    } else if (normalizedCommand === COMMANDS.QUANTUM) {
      setShowCircuit(true)
      if (soundEnabled) playSound("quantum")
      addToHistory("Quantum circuit initialized")
    } else if (normalizedCommand === COMMANDS.RUN) {
      runQuantumSimulation()
    } else if (normalizedCommand === COMMANDS.HACK) {
      hackMainframe()
    } else if (normalizedCommand === COMMANDS.DECRYPT) {
      decryptMessage()
    } else if (normalizedCommand === COMMANDS.GAME) {
      startGame()
    } else if (normalizedCommand === COMMANDS.SOUND) {
      setSoundEnabled(!soundEnabled)
      addToHistory(`Sound effects ${!soundEnabled ? "enabled" : "disabled"}`)
    } else if (normalizedCommand === COMMANDS.CONTRACT) {
      addToHistory("MQT Contract Address:")
      addToHistory(`CA: ${CONTRACT_ADDRESS}`)
      setShowContract(true)
      if (soundEnabled) playSound("success")
    } else if (normalizedCommand === COMMANDS.MATRIX_FUNC) {
      addToHistory("Initializing Quantum Matrix Function Algorithm...")
      addToHistory("Using Cauchy's Integral Formula for f(A)b computation")
      setShowMatrixFunc(true)
      if (soundEnabled) playSound("quantum")
    } else if (normalizedCommand === COMMANDS.MATH_THEORY) {
      addToHistory("Displaying mathematical theory of quantum matrix functions...")
      setShowMathTheory(true)
      if (soundEnabled) playSound("quantum")
    } else if (normalizedCommand === COMMANDS.EXIT) {
      if (soundEnabled) playSound("error")
      addToHistory("Cannot exit the Matrix. You are already too deep.")
    } else if (normalizedCommand === COMMANDS.EASTER) {
      addToHistory(MATRIX_ASCII)
      addToHistory("Wake up, Neo...")
      addToHistory("The Matrix has you...")
      if (soundEnabled) playSound("success")
    } else if (normalizedCommand === COMMANDS.MAGNETISM) {
      addToHistory("Initializing quantum magnetism simulation...")
      addToHistory("Simulating Ising spin chain with tunable interactions")
      setShowMagnetism(true)
      if (soundEnabled) playSound("quantum")
    } else if (normalizedCommand === COMMANDS.MAGTHEORY) {
      addToHistory("Displaying quantum magnetism theoretical background...")
      setShowMagTheory(true)
      if (soundEnabled) playSound("quantum")
    } else if (normalizedCommand === COMMANDS.GPR) {
      addToHistory("Initializing Quantum Gaussian Process Regression...")
      addToHistory("Demonstrating exponential speedup via quantum linear systems algorithm")
      setShowGPR(true)
      if (soundEnabled) playSound("quantum")
    } else if (normalizedCommand === COMMANDS.GPRTHEORY) {
      addToHistory("Displaying Quantum GPR theoretical background...")
      setShowGPRTheory(true)
      if (soundEnabled) playSound("quantum")
    } else if (normalizedCommand === COMMANDS.RYDBERG) {
      addToHistory("Initializing Rydberg atom quantum simulator...")
      addToHistory("Simulating n-body interactions in exotic spin models")
      setShowRydberg(true)
      if (soundEnabled) playSound("quantum")
    } else if (normalizedCommand === COMMANDS.RYDTHEORY) {
      addToHistory("Displaying Rydberg quantum simulator theoretical background...")
      setShowRydTheory(true)
      if (soundEnabled) playSound("quantum")
    } else {
      // Unknown command
      addToHistory(`Command not recognized: ${command}`)
      addToHistory("Type 'help' for available commands")
      if (soundEnabled) playSound("error")
    }
    
    // Clear input field
    setInput("")
    
    // Scroll to bottom
    setTimeout(() => {
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight
      }
    }, 10)
  }

  const runQuantumSimulation = () => {
    setLoading(true)
    if (soundEnabled) playSound("quantum")
    addToHistory("Initializing quantum simulation...")

    // Simulate quantum computation with delay
    setTimeout(() => {
      addToHistory("Preparing qubits...")
    }, 800)

    setTimeout(() => {
      addToHistory("Applying quantum gates...")
    }, 1600)

    setTimeout(() => {
      addToHistory("Entangling quantum states...")
    }, 2400)

    setTimeout(() => {
      const randomState = QUANTUM_STATES[Math.floor(Math.random() * QUANTUM_STATES.length)]
      addToHistory(`Quantum state collapsed to: ${randomState}`)
      addToHistory("Simulation complete.")
      if (soundEnabled) playSound("success")
      setLoading(false)
    }, 3200)
  }

  const hackMainframe = () => {
    setLoading(true)
    if (soundEnabled) playSound("keypress")
    addToHistory("INITIATING MAINFRAME HACK SEQUENCE...")
    
    const steps = [
      "Bypassing security protocols...",
      "Injecting SQL payload...",
      "Cracking encryption keys...",
      "Accessing restricted database...",
      "Downloading classified files...",
      "Erasing digital footprint...",
      "HACK SUCCESSFUL! Access granted to mainframe."
    ]
    
    steps.forEach((step, index) => {
      setTimeout(() => {
        addToHistory(step)
        if (index === steps.length - 1) {
          setLoading(false)
          if (soundEnabled) playSound("success")
        }
      }, 700 * (index + 1))
    })
  }

  const decryptMessage = () => {
    setLoading(true)
    setDecryptProgress(0)
    if (soundEnabled) playSound("keypress")
    
    addToHistory("DECRYPTION SEQUENCE INITIATED")
    addToHistory("Encrypted message: X1$f@3Lp*7qR#tZ9vB2nM5")
    
    const interval = setInterval(() => {
      setDecryptProgress(prev => {
        const newProgress = prev + Math.floor(Math.random() * 10) + 1
        if (newProgress >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            addToHistory("Decryption complete!")
            addToHistory("Message: \"The rabbit hole goes deeper than you think.\"")
            setLoading(false)
            if (soundEnabled) playSound("success")
          }, 500)
          return 100
        }
        addToHistory(`Decryption progress: ${newProgress}%`)
        return newProgress
      })
    }, 800)
  }

  const startGame = () => {
    setGameActive(true)
    addToHistory("QUANTUM GUESSING GAME")
    addToHistory("I'm thinking of a quantum state. Guess which one!")
    addToHistory("Type a number between 1-4:")
    addToHistory("1: |0⟩  2: |1⟩  3: |+⟩  4: |-⟩")
  }

  const handleGameInput = (input: string) => {
    const num = parseInt(input)
    if (isNaN(num) || num < 1 || num > 4) {
      addToHistory("Invalid input. Please enter a number between 1-4.")
      return
    }
    
    const correctAnswer = Math.floor(Math.random() * 4) + 1
    const states = ["|0⟩", "|1⟩", "|+⟩", "|-⟩"]
    
    addToHistory(`You guessed: ${states[num-1]}`)
    addToHistory(`Correct answer: ${states[correctAnswer-1]}`)
    
    if (num === correctAnswer) {
      addToHistory("Congratulations! You've mastered quantum intuition!")
      if (soundEnabled) playSound("success")
    } else {
      addToHistory("Not quite! The quantum state collapsed differently.")
      if (soundEnabled) playSound("error")
    }
    
    setGameActive(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      if (gameActive) {
        handleGameInput(input)
      } else {
        handleCommand(input)
      }
    }
  }

  useEffect(() => {
    // Focus the input when the component mounts
    if (inputRef.current) {
      inputRef.current.focus()
    }
    
    // Re-focus input when Matrix rain state changes (both on and off)
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
  }, [showRain])

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
    inputRef.current?.focus()
  }, [history])

  return (
    <div className="w-full max-w-4xl h-[80vh] bg-black border border-green-500 rounded-md overflow-hidden relative">
      {showRain && <MatrixRain />}

      <div className="flex items-center justify-between bg-black p-2 border-b border-green-500">
        <div className="flex items-center">
          <TerminalIcon className="h-5 w-5 text-green-500 mr-2" />
          <span className="text-green-500 font-mono">MATRIX QUANTUM TERMINAL</span>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="h-7 border-green-500 text-green-500 hover:bg-green-900 hover:text-green-400"
            onClick={() => setSoundEnabled(!soundEnabled)}
          >
            {soundEnabled ? 
              <Volume2 className="h-4 w-4" /> : 
              <VolumeX className="h-4 w-4" />
            }
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-7 border-green-500 text-green-500 hover:bg-green-900 hover:text-green-400"
            onClick={() => setShowRain(!showRain)}
          >
            <Zap className="h-4 w-4 mr-1" />
            {showRain ? "Disable" : "Enable"} Matrix
          </Button>
        </div>
      </div>

      <div 
        ref={terminalRef} 
        className="h-[calc(100%-80px)] overflow-y-auto p-4 font-mono text-green-500 relative"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap mb-1">
            {line}
          </div>
        ))}

        {loading && (
          <div className="flex items-center text-green-500 mt-2">
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Processing quantum data...
          </div>
        )}

        {showCircuit && (
          <div className="my-4 border border-green-500 p-2 bg-black/50">
            <QuantumCircuit />
          </div>
        )}

        {showContract && (
          <ContractInfo address={CONTRACT_ADDRESS} />
        )}

        {showMatrixFunc && (
          <div className="my-4 border border-green-500 p-2 bg-black/50">
            <QuantumMatrixFunction 
              onComplete={() => {
                if (soundEnabled) playSound("success")
                addToHistory("Matrix function computation complete!")
                addToHistory("Successfully computed f(A)b using quantum algorithm.")
              }}
            />
          </div>
        )}

        {showMathTheory && (
          <div className="my-4 border border-green-500 p-2 bg-black/50">
            <MathExplanation />
          </div>
        )}

        {showMagnetism && (
          <div className="my-4 border border-green-500 p-2 bg-black/50">
            <QuantumMagnetism 
              onComplete={() => {
                if (soundEnabled) playSound("success")
                addToHistory("Quantum magnetism simulation complete!")
                addToHistory("Observed phase transition from paramagnetic to antiferromagnetic ordering.")
              }}
            />
          </div>
        )}

        {showMagTheory && (
          <div className="my-4 border border-green-500 p-2 bg-black/50">
            <MagnetismTheory />
          </div>
        )}

        {showGPR && (
          <div className="my-4 border border-green-500 p-2 bg-black/50">
            <QuantumGPR 
              onComplete={() => {
                if (soundEnabled) playSound("success")
                addToHistory("Quantum GPR simulation complete!")
                addToHistory("Achieved exponential speedup over classical algorithm.")
              }}
            />
          </div>
        )}

        {showGPRTheory && (
          <div className="my-4 border border-green-500 p-2 bg-black/50">
            <GPRTheory />
          </div>
        )}

        {showRydberg && (
          <div className="my-4 border border-green-500 p-2 bg-black/50">
            <RydbergSimulator 
              onComplete={() => {
                if (soundEnabled) playSound("success")
                addToHistory("Rydberg quantum simulation complete!")
                addToHistory("Successfully simulated n-body interactions in exotic spin models.")
              }}
            />
          </div>
        )}

        {showRydTheory && (
          <div className="my-4 border border-green-500 p-2 bg-black/50">
            <RydbergTheory />
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="border-t border-green-500 p-2">
        <div className="flex items-center">
          <span className="text-green-500 mr-2 font-mono">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent text-green-500 outline-none font-mono"
            placeholder={gameActive ? "Enter your guess (1-4)..." : "Enter command..."}
            disabled={loading}
            autoFocus
          />
        </div>
      </form>
    </div>
  )
}

