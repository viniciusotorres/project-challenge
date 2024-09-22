import {Component, EventEmitter, Output} from '@angular/core';
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    MatInputModule,
    MatIconModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
/**
 * Componente de busca
 * @export
 * @class SearchComponent
 */
export class SearchComponent {
  /**
    * Evento de busca
   * @memberof SearchComponent
   * @type {EventEmitter<Event>}
   */
  @Output() search = new EventEmitter<Event>();


  /**
   * Método que emite o evento de busca
   * @param {Event} event
   * @memberof SearchComponent
   */
  onSearch(event: Event): void {
    this.search.emit(event);
  }

}
