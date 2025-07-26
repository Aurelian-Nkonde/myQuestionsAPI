import { Target } from 'generated/prisma';

export class DeckEntity {
  uniqueId: string;
  userId: string;
  coverImage?: string;
  numberOfQuestions: number;
  target: Target;
  questions: Questions[];
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type Questions = {
  questionText: string;
  answer: string;
  possibleAnswers: Question[];
};

type Question = {
  text: string;
  id: string;
};

export enum deckCountType {
  ALL_DECKS = 'ALL_DECKS',
  USER_ALL_DECKS = 'USER_ALL_DECKS',
  USER_ACTIVE_DECKS = 'USER_ACTIVE_DECKS',
  USER_UNACTIVE_DECKS = 'USER_UNACTIVE_DECKS',
  ALL_DECKS_ACTIVE = 'ALL_DECKS_ACTIVE',
  ALL_DECKS_UNACTIVE = 'ALL_DECKS_UNACTIVE',
}
