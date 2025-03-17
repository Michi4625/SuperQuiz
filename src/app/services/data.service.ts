import { Injectable } from '@angular/core';
import { Quiz } from './Quiz';
import { Question } from './Question';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public currentQuiz: Quiz = { id: '', quizName: 'newQuiz', questions: [] };
  
  constructor() {
    this.currentQuiz.questions.push({
      id: '1',
      titel: 'How many continents are there?',
      a1: '5',
      a2: '6',
      a3: '7',
      a4: '8',
      correct: 3
    });
   }

   public getNewQuestion(): Question {
      return {
        id: '0',
        titel: '',
        a1: '',
        a2: '',
        a3: '',
        a4: '',
        correct: 1
      };
    }
  
  public getQuestion(qid: string): Question | undefined {
    return this.currentQuiz.questions.find(q => q.id === qid);
  }
}
