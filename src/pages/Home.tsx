import React from 'react';
import GameCard from '@/components/GameCard';
import { games } from '@/data/games';
import backgroundImage from '@/assets/background.jpg';

const Home = () => {
  return (
    <div
      className="min-h-screen p-6 md:p-12"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="max-w-6xl mx-auto">

        <main className="flex flex-wrap justify-center gap-6 animate-fade-in">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </main>
      </div>
    </div>
  );
};

export default Home;
