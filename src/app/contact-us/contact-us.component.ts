
import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { Contact } from '../../types';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent  {
 
  contactForm: FormGroup ;


  constructor(private formBuilder: FormBuilder) {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }
 


  get formControls() {
    return this.contactForm.controls;
  }

  submitForm() {
    if (this.contactForm.valid) {
      const formData: Contact = this.contactForm.value as Contact;
      // Handle form submission with formData
    } else {
      this.contactForm.markAllAsTouched();
    }
  }

}
