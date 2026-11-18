import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Nav } from "../nav/nav";

@Component({
  selector: 'app-header',
  imports: [Nav],
  templateUrl: './header.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './header.css',
})
export class Header {

}
