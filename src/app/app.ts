import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./component/header/header";
import { Nav } from "./component/nav/nav";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Nav],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('front-matriculas');
}
