import forcaIcon from '@/assets/forca-icon.png';

export interface Game {
  id: string;
  title: string;
  description: string;
  path: string;
  available: boolean;
  icon?: string;
  emoji?: string;
}

export const games: Game[] = [
  {
    id: 'forca',
    title: 'Jogo da Forca',
    description: 'Adivinhe a palavra letra por letra antes que o boneco seja completado.',
    path: '/forca',
    available: true,
    icon: forcaIcon,
  },
  {
    id: 'memoria',
    title: 'Jogo da Memória',
    description: 'Encontre todos os pares de cartas no menor número de jogadas.',
    path: '/memoria',
    available: true,
    emoji: '🧠',
  },
  // Para adicionar novos jogos, basta incluir um novo objeto aqui
  // e criar a rota correspondente em App.tsx
];
