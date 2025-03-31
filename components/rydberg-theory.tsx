"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

export default function RydbergTheory() {
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
      <h3 className="text-center mb-3">Rydberg Quantum Simulator Theory</h3>
      
      <div className="mb-3">
        <button 
          onClick={() => toggleSection('rydberg')}
          className="w-full text-left p-1 border border-green-500 flex justify-between items-center"
        >
          <span>Rydberg Atoms</span>
          <span>{expandedSection === 'rydberg' ? '−' : '+'}</span>
        </button>
        
        {expandedSection === 'rydberg' && (
          <div className="p-2 border-l border-r border-b border-green-500 text-xs">
            <p>Rydberg atoms are highly excited atoms with one or more electrons in a high principal quantum number state:</p>
            <ul className="list-disc list-inside mt-1">
              <li>Exhibit exaggerated properties including large dipole moments</li>
              <li>Strong, tunable, and long-range interactions</li>
              <li>Rydberg blockade: prevents excitation of nearby atoms</li>
              <li>Can be individually trapped and controlled in optical lattices</li>
              <li>Long coherence times suitable for quantum information processing</li>
            </ul>
            <p className="mt-1">These properties make Rydberg atoms ideal for implementing multi-qubit gates and simulating complex quantum systems.</p>
          </div>
        )}
      </div>
      
      <div className="mb-3">
        <button 
          onClick={() => toggleSection('universal')}
          className="w-full text-left p-1 border border-green-500 flex justify-between items-center"
        >
          <span>Universal Quantum Simulation</span>
          <span>{expandedSection === 'universal' ? '−' : '+'}</span>
        </button>
        
        {expandedSection === 'universal' && (
          <div className="p-2 border-l border-r border-b border-green-500 text-xs">
            <p>A universal quantum simulator can reproduce the dynamics of any other many-particle quantum system with short-range interactions:</p>
            <ul className="list-disc list-inside mt-1">
              <li>Can simulate both coherent Hamiltonian evolution</li>
              <li>Can simulate dissipative open-system dynamics</li>
              <li>Enables study of systems intractable for classical computers</li>
              <li>Provides insights into exotic quantum phases of matter</li>
              <li>Can be implemented with high-fidelity quantum operations</li>
            </ul>
            <p className="mt-1">Rydberg atoms provide an efficient platform for universal quantum simulation due to their controllable interactions.</p>
          </div>
        )}
      </div>
      
      <div className="mb-3">
        <button 
          onClick={() => toggleSection('nbody')}
          className="w-full text-left p-1 border border-green-500 flex justify-between items-center"
        >
          <span>n-body Interactions</span>
          <span>{expandedSection === 'nbody' ? '−' : '+'}</span>
        </button>
        
        {expandedSection === 'nbody' && (
          <div className="p-2 border-l border-r border-b border-green-500 text-xs">
            <p>Rydberg atoms enable the simulation of spin models with n-body interactions:</p>
            <ul className="list-disc list-inside mt-1">
              <li><strong>4-body interactions:</strong> Required for toric code Hamiltonians</li>
              <li><strong>6-body interactions:</strong> Needed for color code models</li>
              <li><strong>3-body interactions:</strong> Present in certain lattice gauge theories</li>
              <li>Implemented using auxiliary Rydberg atoms as mediators</li>
              <li>Rydberg blockade creates effective multi-spin constraints</li>
            </ul>
            <p className="mt-1">These n-body interactions are crucial for simulating topological quantum matter and quantum error correction codes.</p>
          </div>
        )}
      </div>
      
      <div className="mb-3">
        <button 
          onClick={() => toggleSection('models')}
          className="w-full text-left p-1 border border-green-500 flex justify-between items-center"
        >
          <span>Exotic Spin Models</span>
          <span>{expandedSection === 'models' ? '−' : '+'}</span>
        </button>
        
        {expandedSection === 'models' && (
          <div className="p-2 border-l border-r border-b border-green-500 text-xs">
            <p className="font-bold">Kitaev Toric Code:</p>
            <ul className="list-disc list-inside mt-1 mb-2">
              <li>Topological quantum error correction code</li>
              <li>Requires 4-body plaquette interactions</li>
              <li>Ground state exhibits topological order</li>
              <li>Supports anyonic excitations</li>
            </ul>
            
            <p className="font-bold">Color Code:</p>
            <ul className="list-disc list-inside mt-1 mb-2">
              <li>Topological stabilizer code on trivalent lattice</li>
              <li>Requires 6-body interactions</li>
              <li>Enables transversal implementation of Clifford gates</li>
              <li>Higher error correction threshold than toric code</li>
            </ul>
            
            <p className="font-bold">Lattice Gauge Theories:</p>
            <ul className="list-disc list-inside mt-1">
              <li>Quantum field theories discretized on a lattice</li>
              <li>Exhibit spin-liquid phases and confinement</li>
              <li>Require multi-body constraints from Gauss's law</li>
              <li>Relevant for high-energy physics and condensed matter</li>
            </ul>
          </div>
        )}
      </div>
      
      <div className="mb-3">
        <button 
          onClick={() => toggleSection('implementation')}
          className="w-full text-left p-1 border border-green-500 flex justify-between items-center"
        >
          <span>Experimental Implementation</span>
          <span>{expandedSection === 'implementation' ? '−' : '+'}</span>
        </button>
        
        {expandedSection === 'implementation' && (
          <div className="p-2 border-l border-r border-b border-green-500 text-xs">
            <ul className="list-disc list-inside mt-1">
              <li>Atoms trapped in large-spacing optical or magnetic lattices</li>
              <li>Individual addressing using focused laser beams</li>
              <li>Coherent excitation to Rydberg states via two-photon transitions</li>
              <li>Controlled interactions through Rydberg blockade mechanism</li>
              <li>Parallel implementation of n-qubit gates using auxiliary atoms</li>
              <li>Dissipative state preparation via optical pumping</li>
              <li>Readout using fluorescence imaging of ground state atoms</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
} 