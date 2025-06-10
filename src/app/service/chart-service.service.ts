import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface EstadoOriginal {
  estado: string;
  cantidad: number;
}

export interface EstadoCantidad {
  time: string;     // este es el "estado"
  value: number;    // este es la "cantidad"
}

@Injectable({
  providedIn: 'root'
})
export class ChartDataService {
  private apiUrl = 'http://localhost/inventario-api/getEstadoCounts.php';

  constructor(private http: HttpClient) {}

  getEstados(): Observable<EstadoCantidad[]> {
    return this.http.get<EstadoOriginal[]>(this.apiUrl).pipe(
      map((datos) =>
        datos.map(item => ({
          time: item.estado,   // mostramos el estado como texto
          value: item.cantidad
        }))
      )
    );
  }
}