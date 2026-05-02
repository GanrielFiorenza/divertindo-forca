import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import backgroundImage from '@/assets/background.jpg';

const EMOJIS = ['🐶', '🐱', '🦊', '🐻', '🐼', '🦁', '🐯', '🐸'];

interface Card {
  id: number;
  emoji: string;
  flipped: boolean;
  matched: boolean;
}

const shuffle = <T,>(arr: T[]): T[] => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const buildDeck = (): Card[] =>
  shuffle([...EMOJIS, ...EMOJIS]).map((emoji, idx) => ({
    id: idx,
    emoji,
    flipped: false,
    matched: false,
  }));

const Memoria = () => {
  const { toast } = useToast();
  const [cards, setCards] = useState<Card[]>(buildDeck);
  const [selected, setSelected] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [locked, setLocked] = useState(false);

  const restart = () => {
    setCards(buildDeck());
    setSelected([]);
    setMoves(0);
    setLocked(false);
  };

  const handleClick = (id: number) => {
    if (locked) return;
    const card = cards.find((c) => c.id === id);
    if (!card || card.flipped || card.matched) return;

    const newCards = cards.map((c) => (c.id === id ? { ...c, flipped: true } : c));
    const newSelected = [...selected, id];
    setCards(newCards);
    setSelected(newSelected);

    if (newSelected.length === 2) {
      setMoves((m) => m + 1);
      const [a, b] = newSelected;
      const cardA = newCards.find((c) => c.id === a)!;
      const cardB = newCards.find((c) => c.id === b)!;

      if (cardA.emoji === cardB.emoji) {
        setCards((prev) =>
          prev.map((c) =>
            c.id === a || c.id === b ? { ...c, matched: true } : c
          )
        );
        setSelected([]);
      } else {
        setLocked(true);
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === a || c.id === b ? { ...c, flipped: false } : c
            )
          );
          setSelected([]);
          setLocked(false);
        }, 900);
      }
    }
  };

  useEffect(() => {
    if (cards.length > 0 && cards.every((c) => c.matched)) {
      toast({
        title: 'Parabéns!',
        description: `Você venceu em ${moves} jogadas!`,
      });
    }
  }, [cards, moves, toast]);

  return (
    <div
      className="hangman-container"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="game-container">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para a Home
        </Link>
        <h1 className="text-3xl font-bold text-center mb-2">Jogo da Memória</h1>
        <p className="text-center text-white/90 mb-6">Jogadas: {moves}</p>

        <div className="grid grid-cols-4 gap-3 sm:gap-4 max-w-md mx-auto">
          {cards.map((card) => {
            const showFace = card.flipped || card.matched;
            return (
              <button
                key={card.id}
                onClick={() => handleClick(card.id)}
                disabled={showFace || locked}
                className={`aspect-square rounded-xl text-3xl sm:text-4xl font-bold
                            flex items-center justify-center transition-all duration-300
                            ${
                              showFace
                                ? 'bg-white'
                                : 'bg-primary hover:bg-primary/90 text-primary-foreground'
                            }
                            ${card.matched ? 'opacity-70' : ''}
                            shadow-md`}
              >
                {showFace ? card.emoji : '?'}
              </button>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={restart}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg
                     hover:bg-primary/90 transition-colors"
          >
            Reiniciar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Memoria;
