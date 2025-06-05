import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
  standalone: false,
})
export class CustomInputComponent implements OnInit {
  @Input() control!: FormControl; 
  @Input() label!: string;
  @Input() type: string = 'text'; 
  @Input() autocomplete: string = 'off';
  @Input() icon: string = '';

  isPassword: boolean = false;
  hide: boolean = true;

  ngOnInit() {
    this.isPassword = this.type === 'password';
  }

  togglePasswordVisibility() {
    this.hide = !this.hide;
  }
}
