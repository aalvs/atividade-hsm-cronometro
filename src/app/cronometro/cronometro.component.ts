import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-cronometro',
  templateUrl: './cronometro.component.html',
  styleUrls: ['./cronometro.component.css']
})
export class CronometroComponent implements OnInit {

  centesimas: number = 0;
  segundos: number = 0;
  minutos: number = 0;
  horas: number = 0;
  zero: number = 0;
  interval;

  construirCronometro = new Observable((observer) => {

    this.interval = setInterval(() => {
      if (this.centesimas < 99) {
        this.centesimas++;
        if (this.centesimas < 10) {this.centesimas = this.zero + this.centesimas}
        observer.next(`${this.centesimas} centesimas`);
      } else {
        observer.error("Ops, já passou 1 segundo!");
      }
      if (this.centesimas == 99) {
        this.centesimas = -1;
      }
      if (this.centesimas == 0) {
        this.segundos++;
        if (this.segundos < 10) {this.segundos = this.zero + this.segundos}
        observer.next(`${this.segundos} segundos`);
      }
      if ( this.segundos == 59) {
        this.segundos = -1;
      }
      if (this.centesimas == 0 && this.segundos == 0) {
        this.minutos++;
        if (this.minutos < 10) {this.minutos = this.zero + this.minutos}
        observer.next(`${this.minutos} minutos`);
      }
      if (this.minutos == 59) {
        this.minutos = -1;
      }
      if (this.centesimas == 0 && this.segundos == 0 && this.minutos == 0) {
        this.horas++;
        if (this.horas < 10) {this.horas = this.zero + this.centesimas}
        observer.next(`${this.horas} horas`);
      }
    },10)
  });

  constructor() { }

  ngOnInit(): void {

  }

  inscricaoCronometro: Subscription;
  iniciarCronometro(){
    this.inscricaoCronometro = this.construirCronometro.subscribe({
      next(time) { console.log(time)},
      error(msg) { console.log(msg)}
    })
  }

  ngOnDestroy(): void {
    this.inscricaoCronometro.unsubscribe();
  }
}
