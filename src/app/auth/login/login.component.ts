import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../shared/auth.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  errors: string = "";
  notifyInfo: string = "";
  loginForm: FormGroup = this.fb.group({
    email: [
      "",
      [
        Validators.required,
        Validators.pattern(
          "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"
        )
      ]
    ],
    password: ["", Validators.required]
  });
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params["registered"] === "success") {
        this.notifyInfo =
          "You have been succesfuly registered! Now you can login in.";
      }
    });
  }

  isInvalidForm(data): boolean {
    return (
      this.loginForm.controls[data].invalid &&
      (this.loginForm.controls[data].dirty ||
        this.loginForm.controls[data].touched)
    );
  }
  login() {
    this.auth.login(this.loginForm.value).subscribe(
      token => {
        this.router.navigate(["/rentals"]);
      },
      err => {
        this.errors = err.error.errors;
      }
    );
  }
}
