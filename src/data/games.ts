export interface Game {
  id: string;
  title: string;
  description: string;
  path: string;
  available: boolean;
  emoji: string;
}

export const games: Game[] = [
  {
    id: 'forca',
    title: 'Jogo da Forca',
    description: 'Adivinhe a palavra letra por letra antes que o boneco seja completado.',
    path: '/forca',
    available: true,
    emoji: '🎯',
  },
  // Para adicionar novos jogos, basta incluir um novo objeto aqui
  // e criar a rota correspondente em App.tsx
];
