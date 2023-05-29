import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../local-storage.service';

@Component({
  selector: 'login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LocalStorageService],
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup;
  hidePassword: boolean = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      remember: [true],
    });
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  submitForm(): void {
    if (this.validateForm.valid) {
       console.log('submit', this.validateForm.value);

      // Store the form data in local storage
      const formData = this.validateForm.value;
      this.localStorageService.setItem('formData', JSON.stringify(formData));

      // Perform your login logic here
      // For example, you can send the data to your server for authentication
      // Once the login is successful, retrieve the access token from the server
      const accessToken =
        'AQAAANCMnd8BFdERjHoAwE/Cl+sBAAAAzDOfh2lJf0ah+wWGVFW2JQQAAAACAAAAAAAQZgAAAAEAACAAAAD6VD59U182uWyonHf0Ftg0CwmS84hVmwVn3yXTNrA+vwAAAAAOgAAAAAIAACAAAABdIL53G5c945N+QeXFWtHCzrZ7fMPGU7+euiausTm2HoAAAADlp4nW8HSTb9UvJOJYm9R+rxsBIJ/pcnHmyfy55ylVnQeVP6r1SkjjxmOJgdiFcBO0Pst8wzx9JuuW0mL0ZO52xK9hC8CzSDcOsqlHqQ//YmxfRtgq+cpmdS3GZDmoFPSqphV9Ik4mC3jpmW2za3wLuT+vnVwLCgvGEYUaVc2F0EAAAAA9aXhisnsJBESLMq3cRNwb5cANIh422XvFJ/iPQyuhk5vsBF9qLCuT9lbof0CIrp5pC22MSmWH2d9jQRf5U5LQ'; // Replace with your actual access token

      // Store the access token in local storage or a secure storage mechanism
      this.localStorageService.setItem('accessToken', accessToken);

      // Redirect to the desired page
      this.router.navigate(['']); // Replace '/dashboard' with the desired route
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
