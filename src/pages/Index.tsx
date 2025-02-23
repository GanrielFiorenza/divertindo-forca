
import React, { useState, useEffect } from 'react';
import HangmanDrawing from '@/components/HangmanDrawing';
import Keyboard from '@/components/Keyboard';
import WordDisplay from '@/components/WordDisplay';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';

// Lista de palavras para o jogo
const words = [
  "CACHORRO", "GATO", "ELEFANTE", "GIRAFA", "LEAO",
  "BRASIL", "PORTUGAL", "ESPANHA", "FRANCA", "ITALIA",
  "BANANA", "LARANJA", "MORANGO", "ABACAXI", "UVA",
  "COMPUTADOR", "TELEFONE", "INTERNET", "TECLADO", "MOUSE"
];

const Index = () => {
  const { toast } = useToast();
  const [word, setWord] = useState('');
  const [customWord, setCustomWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [isCustomWordMode, setIsCustomWordMode] = useState(false);

  // Inicializa o jogo
  const initializeGame = (newWord?: string) => {
    const wordToUse = newWord || words[Math.floor(Math.random() * words.length)];
    setWord(wordToUse.toUpperCase());
    setGuessedLetters(new Set());
    setWrongGuesses(0);
    setGameOver(false);
    setWon(false);
    setCustomWord('');
    setIsCustomWordMode(false);
  };

  // Inicia o jogo quando o componente é montado
  useEffect(() => {
    // Removemos a inicialização automática para permitir a escolha da palavra
    setWord('');
  }, []);

  // Verifica se o jogador ganhou
  const checkWin = (currentGuessedLetters: Set<string>) => {
    return word.split('').every(letter => 
      currentGuessedLetters.has(letter.toUpperCase())
    );
  };

  // Processa a tentativa da letra
  const handleGuess = (letter: string) => {
    if (gameOver) return;

    const newGuessedLetters = new Set(guessedLetters).add(letter);
    setGuessedLetters(newGuessedLetters);

    if (!word.toUpperCase().includes(letter)) {
      const newWrongGuesses = wrongGuesses + 1;
      setWrongGuesses(newWrongGuesses);
      
      if (newWrongGuesses >= 6) {
        setGameOver(true);
        toast({
          title: "Fim de Jogo",
          description: `A palavra era: ${word}`,
          variant: "destructive"
        });
      }
    } else if (checkWin(newGuessedLetters)) {
      setWon(true);
      setGameOver(true);
      toast({
        title: "Parabéns!",
        description: "Você venceu!",
      });
    }
  };

  const handleCustomWordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customWord.trim().length === 0) {
      toast({
        title: "Erro",
        description: "Por favor, insira uma palavra",
        variant: "destructive"
      });
      return;
    }
    initializeGame(customWord.trim());
  };

  return (
    <div className="hangman-container">
      <div className="game-container">
        <h1 className="text-3xl font-bold text-center mb-8">Jogo da Forca</h1>
        
        {!word && (
          <div className="mb-8 space-y-4">
            <div className="flex justify-center gap-4">
              <button
                onClick={() => initializeGame()}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg
                         hover:bg-primary/90 transition-colors"
              >
                Usar Palavra Aleatória
              </button>
              <button
                onClick={() => setIsCustomWordMode(true)}
                className="px-6 py-2 bg-secondary text-secondary-foreground rounded-lg
                         hover:bg-secondary/90 transition-colors"
              >
                Inserir Palavra
              </button>
            </div>
            
            {isCustomWordMode && (
              <form onSubmit={handleCustomWordSubmit} className="flex flex-col items-center gap-4">
                <Input
                  type="text"
                  value={customWord}
                  onChange={(e) => setCustomWord(e.target.value.toUpperCase())}
                  placeholder="Digite uma palavra"
                  className="max-w-xs text-center"
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary text-primary-foreground rounded-lg
                           hover:bg-primary/90 transition-colors"
                >
                  Começar Jogo
                </button>
              </form>
            )}
          </div>
        )}
        
        {word && (
          <>
            <HangmanDrawing wrongGuesses={wrongGuesses} />
            
            <WordDisplay 
              word={word} 
              guessedLetters={guessedLetters} 
            />
            
            <Keyboard 
              usedLetters={guessedLetters}
              onLetterClick={handleGuess}
            />
          </>
        )}
        
        {gameOver && (
          <div className="mt-8 text-center">
            <button
              onClick={() => initializeGame()}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg
                       hover:bg-primary/90 transition-colors"
            >
              Jogar Novamente
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
