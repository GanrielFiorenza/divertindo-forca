import React from 'react';
import { Link } from 'react-router-dom';
import { Game } from '@/data/games';

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const content = (
    <div
      className={`group relative overflow-hidden rounded-2xl bg-[#5e78ff] p-6 shadow-md border border-border/50 w-full sm:w-72
                  transition-all duration-300 ${
                    game.available
                      ? 'hover:shadow-xl hover:-translate-y-1 cursor-pointer'
                      : 'opacity-60 cursor-not-allowed'
                  }`}
    >
      <div className="h-20 w-20 flex items-center justify-center mb-4">
        {game.icon ? (
          <img src={game.icon} alt={game.title} className="h-20 w-20 object-contain" />
        ) : (
          <div className="text-6xl leading-none">{game.emoji}</div>
        )}
      </div>
      <h3 className="text-xl font-bold mb-2">{game.title}</h3>
      <p className="text-sm text-white mb-4">{game.description}</p>
      {!game.available && (
        <span className="inline-block text-xs font-semibold px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
          Em breve
        </span>
      )}
      {game.available && (
        <span className="inline-block text-sm font-semibold text-primary group-hover:underline">
          Jogar →
        </span>
      )}
    </div>
  );

  if (!game.available) return content;

  return <Link to={game.path}>{content}</Link>;
};

export default GameCard;
