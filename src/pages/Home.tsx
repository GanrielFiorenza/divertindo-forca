import React from 'react';
import GameCard from '@/components/GameCard';
import { games } from '@/data/games';
import backgroundImage from '@/assets/background.jpg';

const Home = () => {
  return (
    <div
      className="min-h-screen p-6 md:p-12 flex items-center justify-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <main className="flex flex-wrap justify-center gap-6 animate-fade-in max-w-6xl w-full">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </main>
    </div>
  );
};

export default Home;
