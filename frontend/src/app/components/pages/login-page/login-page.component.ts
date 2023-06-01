import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  loginForm!: FormGroup;
  isSubmitted = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get fc() {
    return this.loginForm.controls;
  }

  submit() {
    console.log('Form Submit call');
    this.isSubmitted = true;
    if (this.loginForm.invalid) return;
    console.log('Email: ' + this.fc.email.value);
    console.log('Password: ' + this.fc.password.value);
  }
}
