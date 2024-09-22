import {Component, EventEmitter, Output} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [
    MatButtonModule
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
/**
 * Button component
 * @class
 */
export class ButtonComponent {
}
