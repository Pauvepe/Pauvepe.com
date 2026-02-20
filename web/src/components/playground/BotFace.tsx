"use client";

type BotState = "sleeping" | "awake" | "thinking" | "happy";

interface BotFaceProps {
  state: BotState;
}

export default function BotFace({ state }: BotFaceProps) {
  const getAnimationClass = () => {
    switch (state) {
      case "sleeping": return "animate-sleep";
      case "awake": return "animate-wake";
      case "thinking": return "animate-thinking";
      case "happy": return "animate-happy";
    }
  };

  const isThinking = state === "thinking";

  return (
    <div className={`relative w-16 h-16 ${getAnimationClass()}`}>
      {/* Static icon for idle/sleeping/happy/awake */}
      {!isThinking && (
        <img
          src="/images/pau-icon.svg"
          alt="PAU"
          className="w-full h-full"
        />
      )}
      {/* Animated icon (patas contentas) for thinking */}
      {isThinking && (
        <img
          src="/images/pau-icon-animated.svg"
          alt="PAU thinking"
          className="w-full h-full"
        />
      )}
      {/* Sleeping Zzz */}
      {state === "sleeping" && (
        <div className="absolute -top-2 -right-1 text-[10px] font-bold text-[var(--primary)]/40">
          z<span className="text-[8px]">z</span><span className="text-[6px]">z</span>
        </div>
      )}
    </div>
  );
}
