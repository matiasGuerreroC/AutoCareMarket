import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
  standalone: false,
})
export class CustomInputComponent  implements OnInit {

  @Input() control!: FormControl; 
  @Input() label!: string;
  @Input() type!: string; 
  @Input() autocomplete!: string;
  @Input() icon!: string;

  isPassword: boolean =false;
  hide: boolean = true;

  constructor() { }

  ngOnInit() {
    this.isPassword = this.type === 'password'; // Solo se activa si el tipo es "password"

  }

  showPassword() {
    this.hide = !this.hide;
    
    
  }


}
