import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email = '';
  password = '';
  rememberMe = false;

  onLogin() {
    console.log('Login attempt', { email: this.email, password: this.password, rememberMe: this.rememberMe });
  }

  onSignup() {
    console.log('Navigate to signup');
  }
}
