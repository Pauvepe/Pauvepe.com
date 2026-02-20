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

  const getEyes = () => {
    switch (state) {
      case "sleeping":
        return (
          <>
            <div className="w-5 h-0.5 bg-current rounded-full" />
            <div className="w-5 h-0.5 bg-current rounded-full" />
          </>
        );
      case "thinking":
        return (
          <>
            <div className="w-3 h-3 rounded-full bg-current flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-white" style={{ marginTop: "-1px" }} />
            </div>
            <div className="w-3 h-3 rounded-full bg-current flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-white" style={{ marginTop: "-1px" }} />
            </div>
          </>
        );
      case "happy":
        return (
          <>
            <div className="w-4 h-2 border-b-2 border-current rounded-b-full" />
            <div className="w-4 h-2 border-b-2 border-current rounded-b-full" />
          </>
        );
      default: // awake
        return (
          <>
            <div className="w-3 h-3 rounded-full bg-current" />
            <div className="w-3 h-3 rounded-full bg-current" />
          </>
        );
    }
  };

  const getMouth = () => {
    switch (state) {
      case "sleeping":
        return <div className="w-3 h-3 rounded-full border-2 border-current mt-1" />;
      case "thinking":
        return <div className="w-4 h-0.5 bg-current rounded-full mt-1.5" />;
      case "happy":
        return (
          <div className="w-6 h-3 border-b-2 border-current rounded-b-full mt-1" />
        );
      default:
        return <div className="w-4 h-2 border-b-2 border-current rounded-b-full mt-1" />;
    }
  };

  const getExtras = () => {
    if (state === "sleeping") {
      return (
        <div className="absolute -top-2 -right-1 text-[10px] font-bold text-[var(--primary)]/40">
          z<span className="text-[8px]">z</span><span className="text-[6px]">z</span>
        </div>
      );
    }
    if (state === "thinking") {
      return (
        <div className="absolute -top-1 left-1/2 -translate-x-1/2">
          <div className="flex gap-0.5">
            <div className="w-1 h-1 rounded-full bg-[var(--primary)] typing-dot" style={{ animationDelay: "0ms" }} />
            <div className="w-1 h-1 rounded-full bg-[var(--primary)] typing-dot" style={{ animationDelay: "200ms" }} />
            <div className="w-1 h-1 rounded-full bg-[var(--primary)] typing-dot" style={{ animationDelay: "400ms" }} />
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`relative w-16 h-16 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] flex flex-col items-center justify-center text-white ${getAnimationClass()}`}>
      {getExtras()}
      {/* Eyebrows for thinking */}
      {state === "thinking" && (
        <div className="flex gap-4 mb-0.5">
          <div className="w-3 h-0.5 bg-white/60 rounded-full -rotate-12" />
          <div className="w-3 h-0.5 bg-white/60 rounded-full rotate-12" />
        </div>
      )}
      <div className="flex gap-3 items-center">
        {getEyes()}
      </div>
      {getMouth()}
    </div>
  );
}
