import React, { useEffect, useState } from "react";
import { GameProvider } from "../components/GameProvider";

export const Index = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-w-full min-h-screen">
        Loading...
      </div>
    );
  }

  return <GameProvider />;
};

export default Index;
