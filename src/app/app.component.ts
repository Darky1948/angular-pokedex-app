import { Component, computed, effect, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  name = 'Pikachu';
  life = signal(21);
  doubleLife = computed(() => this.life() * 2);

  constructor() {
    effect(() => {
      console.log('The life counter has been updated:', this.life());
    })
  }
  incrementLife(): void {
    console.log("Increment")
    this.life.update(n => n +1);
  }

  decrementLife(): void {
    console.log("Decrement")
    this.life.update(n => n - 1);
  }
}
