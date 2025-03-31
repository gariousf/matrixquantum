"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

export default function GPRTheory() {
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
      <h3 className="text-center mb-3">Quantum Gaussian Process Regression Theory</h3>
      
      <div className="mb-3">
        <button 
          onClick={() => toggleSection('classical')}
          className="w-full text-left p-1 border border-green-500 flex justify-between items-center"
        >
          <span>Classical GPR</span>
          <span>{expandedSection === 'classical' ? '−' : '+'}</span>
        </button>
        
        {expandedSection === 'classical' && (
          <div className="p-2 border-l border-r border-b border-green-500 text-xs">
            <p>Gaussian Process Regression (GPR) is a non-parametric Bayesian approach to regression:</p>
            <ul className="list-disc list-inside mt-1">
              <li>Models function f(x) as a realization of a Gaussian process</li>
              <li>Defined by mean function m(x) and covariance function k(x,x')</li>
              <li>Predictive distribution at test points x*:</li>
            </ul>
            <p className="my-2 text-center">f(x*) ~ N(μ*, Σ*)</p>
            <p className="my-1">Where:</p>
            <p className="my-1 text-center">μ* = k(x*,X)[K + σ²I]⁻¹y</p>
            <p className="my-1 text-center">Σ* = k(x*,x*) - k(x*,X)[K + σ²I]⁻¹k(X,x*)</p>
            <p className="mt-1">The computational bottleneck is inverting the kernel matrix K, which requires O(n³) operations.</p>
          </div>
        )}
      </div>
      
      <div className="mb-3">
        <button 
          onClick={() => toggleSection('quantum')}
          className="w-full text-left p-1 border border-green-500 flex justify-between items-center"
        >
          <span>Quantum Algorithm</span>
          <span>{expandedSection === 'quantum' ? '−' : '+'}</span>
        </button>
        
        {expandedSection === 'quantum' && (
          <div className="p-2 border-l border-r border-b border-green-500 text-xs">
            <p>The quantum approach to GPR leverages the quantum linear systems algorithm (QLSA):</p>
            <ol className="list-decimal list-inside mt-1 space-y-1">
              <li>Encode training data into quantum states |X⟩ and |y⟩</li>
              <li>Prepare quantum representation of kernel matrix K</li>
              <li>Apply QLSA to solve K|α⟩ = |y⟩ in time O(log(N)poly(κ,1/ε))</li>
              <li>Where κ is the condition number and ε is precision</li>
              <li>Use quantum state |α⟩ to compute predictions via inner products</li>
            </ol>
            <p className="mt-2">The key insight is that we don't need to explicitly compute K⁻¹, but only its action on |y⟩.</p>
          </div>
        )}
      </div>
      
      <div className="mb-3">
        <button 
          onClick={() => toggleSection('speedup')}
          className="w-full text-left p-1 border border-green-500 flex justify-between items-center"
        >
          <span>Speedup Analysis</span>
          <span>{expandedSection === 'speedup' ? '−' : '+'}</span>
        </button>
        
        {expandedSection === 'speedup' && (
          <div className="p-2 border-l border-r border-b border-green-500 text-xs">
            <p className="font-bold">Exponential Speedup Case:</p>
            <ul className="list-disc list-inside mt-1 mb-2">
              <li>When kernel matrix is sparse or well-conditioned</li>
              <li>When data can be efficiently loaded into quantum state</li>
              <li>Classical: O(n³) → Quantum: O(log(n)poly(log(1/ε)))</li>
              <li>Enables GPR on exponentially larger datasets</li>
            </ul>
            
            <p className="font-bold">Polynomial Speedup Case:</p>
            <ul className="list-disc list-inside mt-1">
              <li>When kernel matrix has high condition number</li>
              <li>When quantum state preparation is costly</li>
              <li>Classical: O(n³) → Quantum: O(n·poly(log(n)))</li>
              <li>Still provides substantial advantage for large datasets</li>
            </ul>
          </div>
        )}
      </div>
      
      <div className="mb-3">
        <button 
          onClick={() => toggleSection('challenges')}
          className="w-full text-left p-1 border border-green-500 flex justify-between items-center"
        >
          <span>Implementation Challenges</span>
          <span>{expandedSection === 'challenges' ? '−' : '+'}</span>
        </button>
        
        {expandedSection === 'challenges' && (
          <div className="p-2 border-l border-r border-b border-green-500 text-xs">
            <ul className="list-disc list-inside mt-1">
              <li>Efficient quantum state preparation for training data</li>
              <li>Implementing kernel functions as quantum circuits</li>
              <li>Handling measurement and readout of quantum states</li>
              <li>Error correction for reliable computation</li>
              <li>Balancing precision requirements with runtime</li>
              <li>Extracting classical information from quantum states</li>
            </ul>
          </div>
        )}
      </div>
      
      <div className="mb-3">
        <button 
          onClick={() => toggleSection('applications')}
          className="w-full text-left p-1 border border-green-500 flex justify-between items-center"
        >
          <span>Applications</span>
          <span>{expandedSection === 'applications' ? '−' : '+'}</span>
        </button>
        
        {expandedSection === 'applications' && (
          <div className="p-2 border-l border-r border-b border-green-500 text-xs">
            <p>Quantum GPR enables new applications in:</p>
            <ul className="list-disc list-inside mt-1">
              <li>Climate modeling with massive sensor data</li>
              <li>Drug discovery with high-dimensional chemical spaces</li>
              <li>Financial forecasting with complex time series</li>
              <li>Quantum chemistry simulations</li>
              <li>Large-scale Bayesian optimization</li>
              <li>Uncertainty quantification in scientific computing</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
} 