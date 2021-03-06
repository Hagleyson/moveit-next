import { createContext, ReactNode, useEffect, useState } from "react";
import challenges from "../../challenges.json";
import Cookies from "js-cookie";
import { LevelUpModal } from "../components/LevelUpModal";
interface ChallengesProviderProps {
  children: ReactNode;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}
interface Challenge {
  type: "body" | "eye";
  description: string;
  amount: number;
}
interface ChallengesContextData {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  levelUp: () => void;
  startNewChallenge: () => void;
  activeChallenge: Challenge;
  resetChallenge: () => void;
  experienceToNextLevel: number;
  completedChallenge: () => void;
  closeLevelUpModalOpen: () => void;
}
export const ChallengeContext = createContext({} as ChallengesContextData);
export function ChallengeProvider({
  children,
  ...rest
}: ChallengesProviderProps) {
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(
    rest.currentExperience ?? 0
  );
  const [challengesCompleted, setChallengesCompleted] = useState(
    rest.challengesCompleted ?? 0
  );
  const [activeChallenge, setActiveChallenges] = useState(null);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);
  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);
  useEffect(() => {
    Notification.requestPermission();
  }, []);
  useEffect(() => {
    Cookies.set("level", String(level));
    Cookies.set("currentExperience", String(currentExperience));
    Cookies.set("challengesCompleted", String(challengesCompleted));
  }, [level, currentExperience, challengesCompleted]);
  function levelUp() {
    setLevel(level + 1);
    setIsLevelUpModalOpen(true);
  }
  function closeLevelUpModalOpen() {
    setIsLevelUpModalOpen(false);
  }
  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];
    setActiveChallenges(challenge);
    new Audio("/notification.mp3").play();
    if (Notification.permission === "granted") {
      new Notification("Novo desafio", {
        body: `Valendo ${challenge.amount} xp!`,
      });
    }
  }
  function resetChallenge() {
    setActiveChallenges(null);
  }
  function completedChallenge() {
    if (!activeChallenge) {
      return;
    }
    const { amount } = activeChallenge;
    let finalExperience = currentExperience + amount;
    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      console.log(finalExperience);
      levelUp();
    }
    setCurrentExperience(finalExperience);
    setActiveChallenges(null);
    setChallengesCompleted(challengesCompleted + 1);
  }
  return (
    <ChallengeContext.Provider
      value={{
        level,
        levelUp,
        currentExperience,
        challengesCompleted,
        startNewChallenge,
        activeChallenge,
        resetChallenge,
        experienceToNextLevel,
        completedChallenge,
        closeLevelUpModalOpen,
      }}
    >
      {children}
      {isLevelUpModalOpen && <LevelUpModal />}
    </ChallengeContext.Provider>
  );
}
