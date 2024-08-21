import { Component, signal } from '@angular/core';

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

  incrementLife(): void {
    console.log("Increment")
    this.life.update(n => n +1);
  }

  decrementLife(): void {
    console.log("Decrement")
    this.life.update(n => n - 1);
  }
}
