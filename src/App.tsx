import { useState } from "react";
import css from "./App.module.css";
import CafeInfo from "./components/CafeInfo/CafeInfo";
import type { Votes, VoteType } from "./types/votes";
import VoteOptions from "./components/VoteOptions/VoteOptions";
import VoteStats from "./components/VoteStats/VoteStats";
import Notification from "./components/Notification/Notification";

function App() {
  // Initial votes state
  const initialVotes: Votes = {
    good: 0,
    neutral: 0,
    bad: 0,
  };
  // State to hold votes
  const [votes, setVotes] = useState<Votes>(initialVotes);
  const handleVote = (type: VoteType) => {
    setVotes((prev) => ({
      ...prev,
      [type]: prev[type] + 1,
    }));
  };
  // Function to reset votes
  const resetVotes = () => {
    setVotes(initialVotes);
  };
  // Calculate total votes
  const totalVotes = votes.good + votes.neutral + votes.bad;
  // Calculate positive feedback rate
  const positiveRate = totalVotes
    ? Math.round((votes.good / totalVotes) * 100)
    : 0;

  return (
    <div className={css.app}>
      <CafeInfo />
      <VoteOptions
        onVote={handleVote}
        onReset={resetVotes}
        canReset={totalVotes > 0}
      />
      {totalVotes > 0 && (
        <VoteStats
          votes={votes}
          totalVotes={totalVotes}
          positiveRate={positiveRate}
        />
      )}
      {totalVotes === 0 && <Notification />}
    </div>
  );
}

export default App;
