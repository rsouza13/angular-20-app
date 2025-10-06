import { bootstrapApplication } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { provideRouter, RouterOutlet, RouterLink, withHashLocation } from '@angular/router';
import { Timer } from './app/timer/timer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <h3>Router</h3>
    <nav>
      <a routerLink="/">Home</a> |
      <a routerLink="/about">About</a> |
      <a routerLink="/timer">Timer</a>
    </nav>
    <router-outlet></router-outlet>
  `
})
export class App {}

@Component({
  standalone: true,
  template: `<p>Home works!</p>`
})
export class Home {}

@Component({
  standalone: true,
  template: `<p>About works!</p>`
})
export class About {}

const routes = [
  { path: '', component: Home },
  { path: 'about', component: About },
  { path: 'timer', component: Timer }
];

bootstrapApplication(App, {
  providers: [provideRouter(routes, withHashLocation())]
});