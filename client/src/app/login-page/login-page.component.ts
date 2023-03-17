import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  //переменная отвечающая за утечку памяти
  aSub?: Subscription;

  constructor(private auth: AuthService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(this.form, [Validators.required, Validators.email]),
      password: new FormControl(this.form, [Validators.required, Validators.minLength(6)])
    })

    this.route.queryParams.subscribe( (params) => {
      if (params['registered']) {
        //Теперь вы можете зайти в систему используя свои данные
      } else if (params['accessDenied'])
      {
        //Нужно авторизоваться
      }

    })
  }

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }

  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }

  onSubmit() {
    //отключаем форму при выполн. запроса
    this.form.disable();
  //   const user = {
  //     email: this.form.value.email,
  //     password: this.form.value.password
  //   }
  //   this.auth.login(user)
    this.aSub = this.auth.login(this.form.value).subscribe(
      () => this.router.navigate(['/overview']),
      (error) => {
        console.warn(error);
        this.form.enable();
      }
    )
  }
}
