import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { AlertController, IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Question } from 'src/app/services/Question';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.page.html',
  styleUrls: ['./quiz.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class QuizPage implements OnInit {
  questions: Question[] = [];
  currentQuestionIndex = 0;
  score = 0;
  currentQuestion: Question | undefined;

  constructor(
    private dataService: DataService,
    private alertController: AlertController,
    private toastController: ToastController,
    private router: Router 
  ) {}

  ngOnInit() {
    // Fragen mischen
    this.questions = [...this.dataService.currentQuiz.questions].sort(() => Math.random() - 0.5);
    this.currentQuestion = this.questions[this.currentQuestionIndex];
  }

  async answerQuestion(answerIndex: number) {
    const currentQuestion = this.questions[this.currentQuestionIndex];
    let message = 'Falsch!';
    if (answerIndex === currentQuestion.correct) {
      this.score++;
      message = 'Richtig!';
    }

    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom', 
      color: message === 'Richtig!' ? 'success' : 'danger' // Farbe abhängig von der Antwort setzen
    });
    await toast.present();

    this.currentQuestionIndex++;

    if (this.currentQuestionIndex >= this.questions.length) {
      // Ergebnis anzeigen
      const alert = await this.alertController.create({
        header: 'Quiz beendet!',
        message: `Dein Ergebnis: ${this.score}/${this.questions.length}`,
        buttons: [
          {
            text: 'OK',
            handler: () => {
              this.router.navigate(['/home']); // Navigiere zur Startseite, wenn alle Fragen durch sind
            }
          }
        ]
      });
      await alert.present();
      this.resetQuiz();
    } else {
      this.currentQuestion = this.questions[this.currentQuestionIndex];
    }
  }

  resetQuiz() {
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.questions = [...this.dataService.currentQuiz.questions].sort(() => Math.random() - 0.5);
    this.currentQuestion = this.questions[this.currentQuestionIndex];
  }
}