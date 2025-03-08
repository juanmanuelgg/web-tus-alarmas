import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-register',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-register.component.html',
  styleUrl: './login-register.component.scss',
})
export class LoginRegisterComponent implements OnInit {
  loginMode: boolean = true;
  loginRequested: boolean = false;
  registerRequested: boolean = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(16),
    ]),
  });

  registerForm = new FormGroup({
    nombres: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    apellidos: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(16),
    ]),
  });

  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);

  constructor() {}

  ngOnInit(): void {
    const email = localStorage.getItem('email');
    if (!!email) this.router.navigate(['/app']);
  }

  public changeMode() {
    this.loginMode = !this.loginMode;
  }

  public onSubmitLogin() {
    this.loginRequested = true;
    console.log(
      this.loginForm.value,
      this.loginForm.valid,
      this.loginForm.controls.email.errors
    );
    if (this.loginForm.valid) {
      localStorage.setItem(
        'email',
        this.loginForm.value.email || 'ya viene lleno'
      );
      this.router.navigateByUrl('/app/lista-alarmas');
    }
  }

  public onSubmitRegister() {
    this.registerRequested = true;
    if (this.registerForm.valid) {
      localStorage.setItem(
        'email',
        this.loginForm.value.email || 'ya viene lleno'
      );
      this.router.navigateByUrl('/app/lista-alarmas');
    }
  }

  public openDialog() {
    this.dialog.open(RememberPasswordDialog);
  }
}

// Elemento auxiliar para el componente LoginRegisterComponent
import { ChangeDetectionStrategy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'remember-password-dialog',
  template: `<h2 mat-dialog-title>Recordar Contraseña</h2>
    <mat-dialog-content
      >Se ha enviado un token de autenticación a tu correo.</mat-dialog-content
    >
    <mat-dialog-actions>
      <button mat-button mat-dialog-close>Close</button>
    </mat-dialog-actions>`,
  imports: [
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatButtonModule,
    MatDialogTitle,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RememberPasswordDialog {}
