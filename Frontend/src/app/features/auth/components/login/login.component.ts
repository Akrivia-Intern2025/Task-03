import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
 
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
  ) {
this.loginForm = this.fb.group({
email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
 
  onSubmit() {
    if (this.loginForm.valid) {
      // Extract form values
      const credentials = this.loginForm.value;
      console.log("login detailss :",credentials);

      // Call the login method of AuthService
      this.authService.login(credentials).subscribe(
      
        (response: { token: any; }) => {
          // Assuming the response contains the JWT token
          console.log("response",response);
          const token = response.token;
          console.log("token",token);
          if (token) {
            // Store the token in localStorage
            localStorage.setItem('token', token);

            alert('Login successful!');
           // this.toastr.success('Login successful!', 'Success');
            // Redirect to dashboard after successful login
            this.router.navigate(['/dashboard']);
          }
        },
        (error: any) => {
          alert('Login failed. Please check your credentials and try again.');
        //  this.toastr.error('Login failed. Please check your credentials and try again.', 'Error');
          console.error('Login failed', error);
        }
      );
    }
  }

  redirectToRegister(): void {
    this.router.navigate(['/register']);
  }
}