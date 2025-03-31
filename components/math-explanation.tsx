"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

export default function MathExplanation() {
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
      <h3 className="text-center mb-3">Quantum Algorithm for Matrix Functions</h3>
      
      <div className="mb-3">
        <button 
          onClick={() => toggleSection('overview')}
          className="w-full text-left p-1 border border-green-500 flex justify-between items-center"
        >
          <span>Algorithm Overview</span>
          <span>{expandedSection === 'overview' ? '−' : '+'}</span>
        </button>
        
        {expandedSection === 'overview' && (
          <div className="p-2 border-l border-r border-b border-green-500 text-xs">
            <p>This quantum algorithm computes f(A)b for a matrix A, vector b, and function f using Cauchy's integral formula:</p>
            <p className="my-2 text-center">f(A)b = 1/(2πi) ∮ f(z)(zI-A)⁻¹b dz</p>
            <p>The algorithm discretizes the contour integral and uses quantum linear system algorithms to compute (zI-A)⁻¹b at each integration point.</p>
          </div>
        )}
      </div>
      
      <div className="mb-3">
        <button 
          onClick={() => toggleSection('advantages')}
          className="w-full text-left p-1 border border-green-500 flex justify-between items-center"
        >
          <span>Advantages over Eigenvalue Methods</span>
          <span>{expandedSection === 'advantages' ? '−' : '+'}</span>
        </button>
        
        {expandedSection === 'advantages' && (
          <div className="p-2 border-l border-r border-b border-green-500 text-xs">
            <ul className="list-disc list-inside space-y-1">
              <li>Works for non-Hermitian matrices where e^(iAt) is not unitary</li>
              <li>Avoids the need for eigenvalue estimation</li>
              <li>Achieves better runtime complexity: O(log(N)poly(log(1/ε)))</li>
              <li>Can handle general analytic functions f(z)</li>
              <li>More robust to numerical errors in certain cases</li>
            </ul>
          </div>
        )}
      </div>
      
      <div className="mb-3">
        <button 
          onClick={() => toggleSection('implementation')}
          className="w-full text-left p-1 border border-green-500 flex justify-between items-center"
        >
          <span>Quantum Implementation Details</span>
          <span>{expandedSection === 'implementation' ? '−' : '+'}</span>
        </button>
        
        {expandedSection === 'implementation' && (
          <div className="p-2 border-l border-r border-b border-green-500 text-xs">
            <ol className="list-decimal list-inside space-y-1">
              <li>Prepare initial state |b⟩</li>
              <li>Select m points z₁, z₂, ..., zₘ on the contour</li>
              <li>For each zⱼ:
                <ul className="list-disc list-inside ml-4 mt-1">
                  <li>Prepare |j⟩|b⟩</li>
                  <li>Apply quantum linear system algorithm to compute |j⟩|(zⱼI-A)⁻¹b⟩</li>
                  <li>Multiply by f(zⱼ) using controlled rotations</li>
                </ul>
              </li>
              <li>Apply quantum amplitude amplification</li>
              <li>Measure to obtain state proportional to |f(A)b⟩</li>
            </ol>
          </div>
        )}
      </div>
      
      <div className="mb-3">
        <button 
          onClick={() => toggleSection('complexity')}
          className="w-full text-left p-1 border border-green-500 flex justify-between items-center"
        >
          <span>Complexity Analysis</span>
          <span>{expandedSection === 'complexity' ? '−' : '+'}</span>
        </button>
        
        {expandedSection === 'complexity' && (
          <div className="p-2 border-l border-r border-b border-green-500 text-xs">
            <p>The algorithm achieves the following complexity:</p>
            <ul className="list-disc list-inside space-y-1 mt-1">
              <li>Time complexity: O(s·polylog(N/ε))</li>
              <li>Space complexity: O(log(N) + log(1/ε))</li>
            </ul>
            <p className="mt-1">Where:</p>
            <ul className="list-disc list-inside space-y-1 mt-1">
              <li>s is the sparsity of matrix A</li>
              <li>N is the dimension of the matrix</li>
              <li>ε is the desired accuracy</li>
            </ul>
            <p className="mt-1">This represents a quantum speedup over classical methods which require O(N³) time.</p>
          </div>
        )}
      </div>
    </div>
  )
} 