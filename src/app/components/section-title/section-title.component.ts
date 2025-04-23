import { I } from '@angular/common/common_module.d-Qx8B6pmN';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-section-title',
  templateUrl: './section-title.component.html',
  styleUrls: ['./section-title.component.scss'],
  standalone: false,
})

export class SectionTitleComponent {
  @Input() title: string = '';
}
