/* eslint-disable */
"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { useRouter } from 'next/navigation';

export default function Intro() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isHowToPlayOpen, setIsHowToPlayOpen] = useState(false);
  const [numBots, setNumBots] = useState(4);
  const [selectedCharacter, setSelectedCharacter] = useState("Marie Curie");
  const [isGameStarted, setIsGameStarted] = useState(false);

  const router = useRouter();

  const handleSettingsClick = () => setIsSettingsOpen(true);
  const handleCloseSettings = () => setIsSettingsOpen(false);
  const handleHowToPlayClick = () => setIsHowToPlayOpen(true);
  const handleCloseHowToPlay = () => setIsHowToPlayOpen(false);
  const handleNumBotsChange = (value) => setNumBots(Number(value));
  const handleCharacterChange = (value) => setSelectedCharacter(value);
  const handleStartGame = () => {
    router.push(`/chat?numBots=${numBots}&selectedCharacter=${selectedCharacter}`);
    setIsGameStarted(true);
  };

  if (isGameStarted) return <div />;

  return (
    <div className="relative flex flex-col min-h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/background2.jpg')",
          zIndex: -1,
          opacity: 0.1,
        }}
      />
      <div
        className="relative flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: "url('/img_1.png')",
          height: "20vh",
          padding: "20px",
          marginTop: "210px",
          opacity: 1,
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(30, 30, 30, 0.7) 50%, rgba(30, 30, 30, 0.4) 100%)",
            height: "100%",
            width: "100%",
          }}
        />
        <div className="relative flex flex-col items-center justify-center text-center z-10 mt-16">
          <div
            className="relative bg-black/0 rounded-lg px-6 py-4"
            style={{
              maxWidth: "100%",
              padding: "0px",
              marginTop: "0px",
              marginBottom: "65px",
            }}
          >
            <h1
              className="text-5xl font-['RobotoMono', 'monospace'] mb-2"
              style={{
                color: "#ffeb57",
                textShadow: ` 
                  3px 3px 0 #000, 
                  -3px -3px 0 #000, 
                  3px -3px 0 #000, 
                  -3px 3px 0 #000`,
                transform: 'rotate(-5deg) skew(-10deg)',
              }}
            >
              Eclipse of the Desolate Abyss
            </h1>
            <p
              className="text-2xl font-['RobotoMono', 'monospace']"
              style={{
                color: "#ffeb57",
                textShadow: `
                  2px 2px 0 #000, 
                  -2px -2px 0 #000, 
                  2px -2px 0 #000, 
                  -2px 2px 0 #000`,
                transform: 'rotate(-5deg) skew(-10deg)',
              }}
            >
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
              <div>
                <label htmlFor="character-select" className="block font-['RobotoMono', 'monospace'] text-secondary-foreground">
                  Select Your Character
                </label>
                <Select value={selectedCharacter} onValueChange={handleCharacterChange}>
                  <SelectTrigger className="bg-transparent border rounded-lg px-4 py-2 text-secondary-foreground font-['RobotoMono', 'monospace']">
                    {selectedCharacter}
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "Abraham Lincoln",
                      "Cleopatra",
                      "Albert Einstein",
                      "Marie Curie",
                      "Mahatma Gandhi",
                      "Leonardo da Vinci",
                      "Joan of Arc",
                      "Winston Churchill",
                      "Galileo Galilei",
                      "Nelson Mandela"
                    ].map((character) => (
                      <SelectItem key={character} value={character}>
                        {character}
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
              Your objective is to deceive the AIs and avoid being identified as a human. Use your character's traits and
              responses to blend in seamlessly.
            </p>
            <p className="text-secondary-foreground transition-colors hover:text-secondary-foreground/90 mb-4">
              Use the button in the lower right to make another AI speak if you find yourself unable to contribute to the
              conversation. Additionally, you can select a character and specify the number of bots before starting the game.
            </p>
            <p className="text-secondary-foreground transition-colors hover:text-secondary-foreground mb-4">
              Note: You will automatically start the game as Marie Curie.
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
  );
}
