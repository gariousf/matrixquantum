"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

export default function MagnetismTheory() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  
  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null)
    } else {
      setExpandedSection(section)
    }
  }
  
  return (
    <div className="font-mono text-green-500 text-sm">
      <h3 className="text-center mb-3">Quantum Magnetism Theory</h3>
      
      <div className="mb-3">
        <button 
          onClick={() => toggleSection('model')}
          className="w-full text-left p-1 border border-green-500 flex justify-between items-center"
        >
          <span>Quantum Ising Model</span>
          <span>{expandedSection === 'model' ? '−' : '+'}</span>
        </button>
        
        {expandedSection === 'model' && (
          <div className="p-2 border-l border-r border-b border-green-500 text-xs">
            <p>The quantum Ising model is described by the Hamiltonian:</p>
            <p className="my-2 text-center">H = -J Σ σᶻᵢσᶻᵢ₊₁ - h Σ σˣᵢ</p>
            <p>Where:</p>
            <ul className="list-disc list-inside mt-1">
              <li>J is the interaction strength between neighboring spins</li>
              <li>h is the transverse magnetic field strength</li>
              <li>σᶻ and σˣ are Pauli matrices representing spin operators</li>
            </ul>
            <p className="mt-1">This model exhibits a quantum phase transition at the critical point J = h.</p>
          </div>
        )}
      </div>
      
      <div className="mb-3">
        <button 
          onClick={() => toggleSection('phases')}
          className="w-full text-left p-1 border border-green-500 flex justify-between items-center"
        >
          <span>Magnetic Phases</span>
          <span>{expandedSection === 'phases' ? '−' : '+'}</span>
        </button>
        
        {expandedSection === 'phases' && (
          <div className="p-2 border-l border-r border-b border-green-500 text-xs">
            <p className="font-bold text-blue-400">Paramagnetic Phase (h » J):</p>
            <ul className="list-disc list-inside mt-1 mb-2">
              <li>Spins align with the external field</li>
              <li>Ground state approximates |→→→...→⟩</li>
              <li>Low entanglement entropy</li>
              <li>Short-range correlations</li>
            </ul>
            
            <p className="font-bold text-red-400">Antiferromagnetic Phase (J » h):</p>
            <ul className="list-disc list-inside mt-1 mb-2">
              <li>Neighboring spins prefer opposite alignment</li>
              <li>Ground state approximates (|↑↓↑↓...⟩ + |↓↑↓↑...⟩)/√2</li>
              <li>High entanglement entropy</li>
              <li>Long-range order parameter</li>
            </ul>
            
            <p className="font-bold text-yellow-400">Quantum Critical Point (J ≈ h):</p>
            <ul className="list-disc list-inside mt-1">
              <li>Maximum quantum fluctuations</li>
              <li>Diverging correlation length</li>
              <li>Scale-invariant behavior</li>
              <li>Logarithmic entanglement scaling</li>
            </ul>
          </div>
        )}
      </div>
      
      <div className="mb-3">
        <button 
          onClick={() => toggleSection('experiment')}
          className="w-full text-left p-1 border border-green-500 flex justify-between items-center"
        >
          <span>Experimental Realization</span>
          <span>{expandedSection === 'experiment' ? '−' : '+'}</span>
        </button>
        
        {expandedSection === 'experiment' && (
          <div className="p-2 border-l border-r border-b border-green-500 text-xs">
            <p>Quantum magnetism can be simulated using ultracold atoms in optical lattices:</p>
            <ul className="list-disc list-inside mt-1">
              <li>Rubidium atoms trapped in a 1D optical lattice</li>
              <li>Site occupation mapped to pseudo-spin states</li>
              <li>Superexchange interactions create effective spin coupling</li>
              <li>Magnetic field strength controlled by laser intensity</li>
              <li>Phase transitions observed through site-resolved imaging</li>
              <li>Quantum correlations measured via noise correlation techniques</li>
            </ul>
            <p className="mt-1">This approach allows direct observation of quantum magnetic phenomena that are computationally intractable on classical computers.</p>
          </div>
        )}
      </div>
      
      <div className="mb-3">
        <button 
          onClick={() => toggleSection('applications')}
          className="w-full text-left p-1 border border-green-500 flex justify-between items-center"
        >
          <span>Applications & Implications</span>
          <span>{expandedSection === 'applications' ? '−' : '+'}</span>
        </button>
        
        {expandedSection === 'applications' && (
          <div className="p-2 border-l border-r border-b border-green-500 text-xs">
            <p>Understanding quantum magnetism has profound implications for:</p>
            <ul className="list-disc list-inside mt-1">
              <li>High-temperature superconductivity</li>
              <li>Quantum computing with spin qubits</li>
              <li>Spintronic devices for information processing</li>
              <li>Topological quantum materials</li>
              <li>Quantum error correction codes</li>
              <li>Fundamental understanding of quantum many-body physics</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
} 