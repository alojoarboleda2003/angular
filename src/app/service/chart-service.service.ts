import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

// Representa la respuesta cruda del backend
export interface EstadoOriginal {
  estado: string;
  cantidad: number;
}

// Estructura transformada para gráficos o visualización
export interface EstadoCantidad {
  time: string;     // aquí usamos 'estado' como 'time'
  value: number;    // aquí usamos 'cantidad' como 'value'
}

@Injectable({
  providedIn: 'root'
})
export class ChartDataService {
  private apiUrl = 'http://localhost/hermes_angular/getEstadoCounts.php';

  constructor(private http: HttpClient) {}

  getEstados(): Observable<EstadoCantidad[]> {
    return this.http.get<EstadoOriginal[]>(this.apiUrl).pipe(
      map((datos: EstadoOriginal[]) =>
        datos.map((item: EstadoOriginal) => ({
          time: item.estado,
          value: item.cantidad
        }))
      )
    );
  }
}