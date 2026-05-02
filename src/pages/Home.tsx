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
        <header className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg">
            Central de Jogos
          </h1>
          <p className="text-lg text-white/90 drop-shadow">
            Escolha um jogo para começar
          </p>
        </header>

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
