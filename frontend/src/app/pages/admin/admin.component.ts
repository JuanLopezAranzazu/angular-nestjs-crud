import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../services/users.service';
import { UserRequestDto, UserResponseDto } from '../../types/user.type';
import { UserTableComponent } from '../../components/user-table/user-table.component';
import { UserFormComponent } from '../../components/user-form/user-form.component';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-admin',
  imports: [
    CommonModule,
    UserTableComponent,
    UserFormComponent,
    ButtonModule,
    LoadingSpinnerComponent,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent implements OnInit {
  users: UserResponseDto[] = [];
  selectedUser: UserResponseDto | null = null;
  showModal = false;
  loading = false;
  loadingForm = false;
  errorMessage = '';

  constructor(private readonly usersService: UsersService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  // obtener los usuarios
  getUsers(): void {
    this.loading = true;
    this.errorMessage = '';

    this.usersService.getUsers().subscribe({
      next: (res) => {
        console.log(res);
        this.users = res;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage =
          err.error?.message || 'Error al cargar los usuarios';
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  // guardar un usuario
  onSave(user: UserRequestDto) {
    this.loadingForm = true;
    this.errorMessage = '';

    const request$ = this.selectedUser
      ? this.usersService.updateUser(this.selectedUser.id, user)
      : this.usersService.createUser(user);

    request$.subscribe({
      next: (res) => {
        console.log(res);
        this.getUsers();
        this.showModal = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = err.error?.message || 'Error al guardar el usuario';
        this.loadingForm = false;
      },
      complete: () => {
        this.loadingForm = false;
      },
    });
  }

  // eliminar un usuario
  onDelete(id: number) {
    this.errorMessage = '';

    this.usersService.deleteUser(id).subscribe({
      next: () => {
        this.getUsers();
      },
      error: (err) => {
        console.error(err);
        this.errorMessage =
          err.error?.message || 'Error al eliminar el usuario';
      },
    });
  }

  // crear un usuario
  onCreate() {
    this.selectedUser = null;
    this.showModal = true;
  }

  // editar un usuario
  onEdit(user: UserResponseDto) {
    this.selectedUser = user;
    this.showModal = true;
  }
}
