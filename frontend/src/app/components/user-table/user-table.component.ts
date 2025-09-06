import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { UserResponseDto } from '../../types/user.type';

@Component({
  selector: 'app-user-table',
  imports: [CommonModule, TableModule, ButtonModule],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.css',
})
export class UserTableComponent {
  @Input() users: UserResponseDto[] = [];
  @Output() edit = new EventEmitter<UserResponseDto>();
  @Output() delete = new EventEmitter<number>();

  onEdit(note: UserResponseDto) {
    this.edit.emit(note);
  }

  onDelete(id: number) {
    this.delete.emit(id);
  }
}
