import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServicioFamiliarService {

  hermanoMayor?: string = '';
  hermanoMenor?: string = '';

  getHermanoMayor(): string {
    return this.hermanoMayor || '';
  }
  setHermanoMayor(hermano: string) {
    this.hermanoMayor = hermano;
  }

  getHermanoMenor(): string {
    return this.hermanoMenor || '';
  }
  setHermanoMenor(hermano: string) {
    this.hermanoMenor = hermano;
  }

  saludar(hermano: string){
    console.log(`Hola ${hermano}`);
  }

  preguntarporHijo(): string {
    return 'Como está su hijo?';
  }

  constructor() { }
}
