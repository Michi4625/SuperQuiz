import { Injectable } from '@angular/core';
import { Quiz } from './Quiz';
import { Question } from './Question';
import { v4 as uuidv4 } from 'uuid';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public currentQuiz: Quiz = { id: '', quizName: 'newQuiz', questions: [] };
  
  constructor() {
    /*this.currentQuiz.questions.push({
      id: '1',
      titel: 'How many continents are there?',
      a1: '5',
      a2: '6',
      a3: '7',
      a4: '8',
      correct: 3
    });*/
    this.loadQuiz();
    console.log("Hallo3");
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

  /*public loadQuiz() {
    let returnPromise = Preferences.get({ key: 'MichiSuperQuiz2025' });
    returnPromise.then((q)=>{
      console.log("Hallo1");
      if(q.value)
      this.currentQuiz = JSON.parse(q.value) as Quiz;
    if (q.value) {
      this.currentQuiz = JSON.parse(q.value) as Quiz;
    }
    console.log("Hallo2");
  }*/

  public async loadQuiz() {
    try {
    let q = await Preferences.get({ key: 'MichiSuperQuiz2025' });
    console.log("Hallo1");
    if(q.value)
      this.currentQuiz = JSON.parse(q.value) as Quiz;
    }catch (e) {
      console.log(e);
    }
    console.log("Hallo2");
  }

  public saveQuiz() {
    Preferences.set({ 
      key: 'MichiSuperQuiz2025',
      value: JSON.stringify(this.currentQuiz)
    });
  }

  public getQuestion(qid: string): Question | undefined {
    return this.currentQuiz.questions.find(q => q.id === qid);
  }

  public addQuestion(q: Question){
    if(q.id === '0'){
      q.id = uuidv4();
    }
    this.currentQuiz.questions.push(q);
    this.saveQuiz();
  }

  public deleteQuestion(q: Question) {
    this.currentQuiz.questions = this.currentQuiz.questions.filter(qq => qq.id !== q.id);
    this.saveQuiz();
  }
  
}
