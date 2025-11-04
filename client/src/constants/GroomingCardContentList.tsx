import type { JSX } from 'solid-js';
import { CoffeeIcon, CircleQuestionMark } from 'lucide-solid';

export type GroomingCardContentType = {
  scoreId: number | null;
  scoreComponent: () => JSX.Element | string;
  score: number | null;
};

export const GroomingCardContentList: GroomingCardContentType[] = [
  { scoreId: 1, scoreComponent: () => '1', score: 1 },
  { scoreId: 2, scoreComponent: () => '2', score: 2 },
  { scoreId: 3, scoreComponent: () => '3', score: 3 },
  { scoreId: 4, scoreComponent: () => '5', score: 5 },
  { scoreId: 5, scoreComponent: () => '8', score: 8 },
  { scoreId: 6, scoreComponent: () => '13', score: 13 },
  { scoreId: 7, scoreComponent: () => '21', score: 21 },
  { scoreId: 8, scoreComponent: () => <CoffeeIcon />, score: 0 },
  { scoreId: 9, scoreComponent: () => <CircleQuestionMark />, score: 0 },
];
