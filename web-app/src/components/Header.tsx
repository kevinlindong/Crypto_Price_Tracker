"use client"

import Image from "next/image"
import { ThemeToggle } from "./ThemeToggle"

export function Header() {
  return (
    <header className="w-full py-4 border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <ThemeToggle />
        </div>
        
        <div className="flex items-center">
          <div className="relative w-10 h-10 mr-3">
            <Image 
              src="/file.svg" 
              alt="Crypto Icon"
              width={40}
              height={40}
              className="dark:invert"
            />
          </div>
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Crypto Price Tracker</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Track the latest cryptocurrency prices in real-time
            </p>
          </div>
        </div>
        
        <div className="w-20">
          {/* Empty div for spacing */}
        </div>
      </div>
    </header>
  )
}