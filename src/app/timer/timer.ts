import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-timer',
  imports: [],
  templateUrl: './timer.html',
  styleUrl: './timer.css'
})
export class Timer implements OnInit, OnDestroy {
  targetDate = new Date('2025-10-06T23:59:59'); // ✅ Altere para a data desejada
  timeLeft: string = '';
  private subscription!: Subscription;

  ngOnInit(): void {
    this.updateTimeLeft(); // Atualiza imediatamente
    this.subscription = interval(1000).subscribe(() => {
      this.updateTimeLeft();
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private updateTimeLeft(): void {
    const now = new Date().getTime();
    const distance = this.targetDate.getTime() - now;

    if (distance <= 0) {
      this.timeLeft = '00:00:00';
      this.subscription?.unsubscribe();
      return;
    }

    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);

    this.timeLeft = `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;
  }

  private pad(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }
}
