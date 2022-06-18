import { Spieler } from './../../model/spieler.interface';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-spielerdaten',
  templateUrl: './spielerdaten.component.html',
  styleUrls: ['./spielerdaten.component.scss'],
})
export class SpielerdatenComponent implements OnInit {
  @Output()
  readonly spielerBereit: EventEmitter<Spieler> = new EventEmitter<Spieler>();

  spielerForm: FormGroup = this.fb.group({
    spielername: ['', [Validators.required]],
    alter: ['', [Validators.required]],
  });

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {}

  start() {
    var name = this.spielerForm.controls['spielername'].value;
    var alter = this.spielerForm.controls['alter'].value;

    var spieler: Spieler = { name, alter };
    this.spielerBereit.emit(spieler);
  }
}
