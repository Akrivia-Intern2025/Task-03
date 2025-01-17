import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],

})
export class RegisterComponent {
  signupForm: FormGroup;

 constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    //private toastr: ToastrService
 )
 {
    this.signupForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/[^A-Za-z0-9]/), // At least one special character
        ],
      ],
    });
  }

  onSubmit(): void {
    
    if (this.signupForm.valid) {
      // Extract form values
      const userData = this.signupForm.value;
      console.log("userdata",userData);


      // Call the register method of AuthService
      this.authService.register(userData).subscribe(
        (response) => {
          // Redirect to login after successful registration
          alert('Register successful!');
          this.router.navigate(['/login']);
         
        },
       (error) => {
    // Check if the error indicates that the user already exists
    if (error.status === 500) { // Assuming 409 Conflict status code for existing user
      alert('User already exists. Please use a different email.');
    } else {
      // Handle other errors
      alert('Registration failed. Please check your credentials and try again.');
    }
    console.error('Registration failed', error);
  }
      );
    }
  }

  redirectToLogin(): void {
    this.router.navigate(['/login']);
  }
}