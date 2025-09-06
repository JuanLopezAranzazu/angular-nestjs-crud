import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { UserResponseDto } from '../../types/user.type';
import { Role } from '../../types/role.type';

@Component({
  selector: 'app-user-form',
  imports: [
    DialogModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent {
  @Input() visible = false;
  @Input() user: UserResponseDto | null = null;
  @Input() loading: boolean = false;
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  roles = [
    { label: 'Administrador', value: Role.ADMIN },
    { label: 'Usuario', value: Role.USER },
  ];

  userForm!: FormGroup;
  errorMessage = '';

  constructor(private readonly fb: FormBuilder) {}

  ngOnChanges() {
    this.userForm = this.fb.group({
      name: [
        this.user?.name || '',
        [Validators.required, Validators.minLength(3)],
      ],
      email: [this.user?.email || '', [Validators.required, Validators.email]],
      role: [this.user?.role || Role.USER, Validators.required],
      password: [
        '',
        this.user
          ? [Validators.minLength(6)]
          : [Validators.required, Validators.minLength(6)],
      ],
    });
  }

  submit() {
    if (!this.userForm.valid) {
      this.errorMessage = 'Por favor completa todos los campos.';
      return;
    }

    const formValue = { ...this.userForm.value };

    if (this.user && !formValue.password) {
      delete formValue.password;
    }

    this.save.emit(formValue);
  }

  close() {
    this.cancel.emit();
  }
}
