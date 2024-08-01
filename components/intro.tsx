"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select"
import { useRouter } from 'next/navigation'

export default function Intro() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isHowToPlayOpen, setIsHowToPlayOpen] = useState(false)
  const [numBots, setNumBots] = useState(2)
  const [isGameStarted, setIsGameStarted] = useState(false)

  const router = useRouter()
  const handleSettingsClick = () => setIsSettingsOpen(true)
  const handleCloseSettings = () => setIsSettingsOpen(false)
  const handleHowToPlayClick = () => setIsHowToPlayOpen(true)
  const handleCloseHowToPlay = () => setIsHowToPlayOpen(false)
  const handleNumBotsChange = (value) => setNumBots(Number(value))
  const handleStartGame = () => router.push('/chat')

  if (isGameStarted) {
    return <div />
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div
        className="relative flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: "url('/homescreen.jpg')",
          height: "18vh",
          padding: "20px",
          marginTop: "210px",
        }}
      >
        <div
          className="absolute inset-0 bg-black/0"
          style={{ height: "100%", width: "100%" }}
        />
        <div className="relative flex flex-col items-center justify-center text-center z-10 mt-16">
          <div
            className="relative bg-black/0 rounded-lg px-6 py-4"
            style={{
              maxWidth: "100%",
              padding: "0px",
              marginTop: "0px",  // Adjust to move the background down
              marginBottom: "65px", // Adjust to move the background up
            }}
          >
            <h1 className="text-5xl font-['RobotoMono', 'monospace'] mb-2"
            style={{
              textShadow: `
                3px 3px 0 #000, 
                -3px -3px 0 #000, 
                3px -3px 0 #000, 
                -3px 3px 0 #000`,
              transform: 'rotate(-7deg) skew(-10deg)'
            }}
          >
            Eclipse of the Desolate Abyss
          </h1>
            <p className="text-2xl font-['RobotoMono', 'monospace']"
                style={{
                  textShadow: `
                    2px 2px 0 #000, 
                    -2px -2px 0 #000, 
                    2px -2px 0 #000, 
                    -2px 2px 0 #000`,
                  transform:  'rotate(-7deg) skew(-10deg)'
                }}>
              Whispers from the Forgotten Realm
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center flex-1 gap-4 flex-col mt-4">
        <Button
          className="inline-flex items-center text-base font-['RobotoMono', 'monospace'] font-medium text-secondary-foreground transition-colors hover:text-secondary-foreground/90 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 bg-transparent border rounded-lg px-6 py-3"
          size="lg"
          onClick={handleStartGame}
        >
          Start Game
        </Button>
        <Button
          className="inline-flex items-center text-base font-['RobotoMono', 'monospace'] font-medium text-secondary-foreground transition-colors hover:text-secondary-foreground/90 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 bg-transparent border rounded-lg px-4 py-2"
          size="lg"
          onClick={handleHowToPlayClick}
        >
          How to Play
        </Button>
        <Button
          className="inline-flex items-center text-base font-['RobotoMono', 'monospace'] font-medium text-secondary-foreground transition-colors hover:text-secondary-foreground/90 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 bg-transparent border rounded-lg px-4 py-2"
          size="lg"
          onClick={handleSettingsClick}
        >
          Settings
        </Button>
      </div>

      {isSettingsOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <div className="bg-[#1a1b1e] rounded-lg p-8 w-full max-w-md">
            <h2 className="text-2xl font-['RobotoMono', 'monospace'] text-secondary-foreground mb-4">Settings</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="num-bots" className="block font-['RobotoMono', 'monospace'] text-secondary-foreground">
                  Number of Bots
                </label>
                <Select value={numBots} onValueChange={handleNumBotsChange}>
                  <SelectTrigger className="bg-transparent border rounded-lg px-4 py-2 text-secondary-foreground font-['RobotoMono', 'monospace']">
                    {numBots}
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 8 }, (_, i) => i + 2).map((value) => (
                      <SelectItem key={value} value={value}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button
                className="inline-flex items-center text-base font-['RobotoMono', 'monospace'] font-medium text-secondary-foreground transition-colors hover:text-secondary-foreground/90 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 bg-transparent border rounded-lg px-5 py-2 w-full"
                onClick={handleCloseSettings}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {isHowToPlayOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <div className="bg-[#1a1b1e] rounded-lg p-8 w-full max-w-md">
            <h2 className="text-2xl font-['RobotoMono', 'monospace'] text-secondary-foreground mb-4">How to Play</h2>
            <p className="text-secondary-foreground transition-colors hover:text-secondary-foreground/90 mb-4">
              In this game, you are tasked with blending in as an AI within a simulated social media chat. Your goal is
              to act like an AI and avoid detection by other AIs.
            </p>
            <p className="text-secondary-foreground transition-colors hover:text-secondary-foreground/90 mb-4">
              Engage in the conversation naturally and be cautious about how you respond. The other AIs will try to
              identify which participant is not an AI.
            </p>
            <p className="text-secondary-foreground transition-colors hover:text-secondary-foreground/90 mb-4">
              Your objective is to deceive the AIs and prevent them from uncovering your true identity.
            </p>
            <p className="text-secondary-foreground transition-colors hover:text-secondary-foreground/90 mb-4">
              If you don't need to speak, you can press a button in the lower left to make another AI speak on your behalf.
            </p>
            <Button
              className="inline-flex items-center text-base font-['RobotoMono', 'monospace'] font-medium text-secondary-foreground transition-colors hover:text-secondary-foreground/90 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 bg-transparent border rounded-lg px-5 py-2 w-full"
              onClick={handleCloseHowToPlay}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
