import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';
import { UserLogin } from '../Models/user.login';
import { FeedBack } from '../Models/feedback';

@Component({
   selector: 'app-login',
   templateUrl: './login.component.html',
   styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

   formData: FormGroup;
   userLogin = new UserLogin('', '');
   feedback = new FeedBack("", "");
   isLoading: boolean = true;

   constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) { }

   ngOnInit() {
      this.formData = this.fb.group({
         userName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
         password: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]]
      });
   }

   onClickSubmit() {
      this.authService.getUserLogin(this.formData.controls.userName.value, this.formData.controls.password.value).subscribe({
         next: (data: UserLogin) => {
            this.userLogin = data[0];
            if (this.userLogin.admin === true) {
               localStorage.setItem('isAdminLoggedIn', "true");
               this.router.navigate(['/'])
                  .then(() => {
                     window.location.reload();
                  });
            } else {
               localStorage.setItem('isUserLoggedIn', "true");
               this.router.navigate(['/'])
                  .then(() => {
                     window.location.reload();
                  });
            }
         },
         error: (err: any) => {
            this.isLoading = false;
            this.feedback = {
                feedbackType: err.feedbackType,
                feedbackmsg: err.feedbackmsg,
            };

            this.formData.reset();
            throw new Error();
        }
      })
   }
}