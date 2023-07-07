import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {

  public env = environment;
  contactForm!: FormGroup;
  contact!: any;
  success: boolean = false;
  firstName: String = "Visitante";

  validationMessages: any = {
    name: {
      required: 'O nome é obrigatório.'
    },
    email: {
      required: 'O email é obrigatório.',
      email: 'Digite um email válido.'
    },
    subject: {
      required: 'O assunto é obrigatório.'
    },
    message: {
      required: 'A mensagem é obrigatória.'
    }
  }

  formErrors: any = {
    name: '',
    email: '',
    subject: '',
    message: ''
  }

  constructor(
    // Injeção de dependências.
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.success = false;

    this.contactForm.valueChanges.subscribe(() => {
      // this.updateValidationMessages();
    });
  }

  createForm() {
    this.contactForm = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3)
        ]
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],
      subject: ['', [Validators.required, Validators.minLength(3)]],
      message: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  updateValidationMessages() {
    for (const field in this.formErrors) {
      if (Object.prototype.hasOwnProperty.call(this.formErrors, field)) {
        this.formErrors[field] = '';
        const control = this.contactForm.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (Object.prototype.hasOwnProperty.call(control.errors, key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }


}
