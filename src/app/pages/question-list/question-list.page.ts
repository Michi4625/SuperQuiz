import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonButton, IonIcon, IonList, IonItem, IonLabel, IonItemSliding, IonItemOptions, IonItemOption } from '@ionic/angular/standalone';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { Question } from 'src/app/services/Question';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.page.html',
  styleUrls: ['./question-list.page.scss'],
  standalone: true,
  imports: [IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonItem, IonList, IonIcon, IonButton, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class QuestionListPage implements OnInit {

  constructor() { }
  public data = inject(DataService);
    private router = inject(Router);
  

  ngOnInit() {
  }
  show(qid: string) {
   this.router.navigate(['/question', qid]);
  }

  delete(q: Question) {
    this.data.deleteQuestion(q);
  }
}
