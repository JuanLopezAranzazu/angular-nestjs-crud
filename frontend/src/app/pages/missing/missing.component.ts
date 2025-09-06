import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-missing',
  imports: [ButtonModule, RouterModule],
  templateUrl: './missing.component.html',
  styleUrl: './missing.component.css',
})
export class MissingComponent {}
