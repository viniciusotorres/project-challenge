import {Component, EventEmitter, Output} from '@angular/core';
import {MatPaginatorModule, PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [
    MatPaginatorModule
  ],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss'
})
export class PaginatorComponent {
  @Output() pageChange = new EventEmitter<PageEvent>();

  onPageChange(event: PageEvent): void {
    this.pageChange.emit(event);
  }
}
