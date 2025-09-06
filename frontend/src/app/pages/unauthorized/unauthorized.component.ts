import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-unauthorized',
  imports: [ButtonModule, RouterModule],
  templateUrl: './unauthorized.component.html',
  styleUrl: './unauthorized.component.css',
})
export class UnauthorizedComponent {}
