import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  form!: FormGroup;

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(this.form, [Validators.required, Validators.email]),
      password: new FormControl(this.form, [Validators.required, Validators.minLength(6)])
    })
  }

  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }

  onSubmit() {

  }

}
