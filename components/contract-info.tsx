"use client"

import { useState, useEffect } from "react"

interface ContractInfoProps {
  address: string
}

export default function ContractInfo({ address }: ContractInfoProps) {
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    setIsVisible(true)
  }, [])
  
  return (
    <div className={`my-4 border border-green-500 p-3 bg-black/50 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="text-green-500 font-mono">
        <div className="text-sm mb-2">CONTRACT ADDRESS</div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <code className="bg-black/70 p-1 text-green-400 break-all">{address}</code>
        </div>
        <div className="mt-3 text-xs flex justify-between">
          <span>STATUS: ACTIVE</span>
          <span>NETWORK: QUANTUM CHAIN</span>
        </div>
      </div>
    </div>
  )
} 