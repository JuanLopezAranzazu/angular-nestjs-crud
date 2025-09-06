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
import { TextareaModule } from 'primeng/textarea';
import { NoteResponseDto } from '../../types/note.type';

@Component({
  selector: 'app-note-form',
  imports: [
    DialogModule,
    ButtonModule,
    InputTextModule,
    TextareaModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './note-form.component.html',
  styleUrl: './note-form.component.css',
})
export class NoteFormComponent {
  @Input() visible = false;
  @Input() note: NoteResponseDto | null = null;
  @Input() loading: boolean = false; 
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  noteForm!: FormGroup;

  constructor(private readonly fb: FormBuilder) {}

  ngOnChanges() {
    this.noteForm = this.fb.group({
      title: [
        this.note?.title || '',
        [Validators.required, Validators.minLength(2)],
      ],
      content: [
        this.note?.content || '',
        [Validators.required, Validators.minLength(5)],
      ],
    });
  }

  submit() {
    if (this.noteForm.valid) {
      this.save.emit(this.noteForm.value);
    } else {
      this.noteForm.markAllAsTouched();
    }
  }

  close() {
    this.cancel.emit();
  }
}
