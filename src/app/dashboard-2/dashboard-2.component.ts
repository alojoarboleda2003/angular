import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartConfiguration } from 'chart.js';


@Component({
  selector: 'app-dashboard-2',
  templateUrl: './dashboard-2.component.html',
  styleUrls: ['./dashboard-2.component.css']
})
export class Dashboard2Component {
public barChartType: 'bar' = 'bar';

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [], // ← se llenará con nombres como 'Portátiles'
    datasets: [
      {
        data: [], // ← se llenará con valores como 35
        label: 'Cantidad por Estado',
        backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc', '#f6c23e', '#e74a3b', '#e74a3b']
      }
    ]
  };

  

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    scales: {
      x: {},
      y: {
        beginAtZero: true
      }
    },
    plugins: {
      legend: {
        display: true
      }
    }
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost/hermes_angular2/getEstadoCounts.php')
      .subscribe(data => {
        setTimeout(() => {
  this.barChartData = { ...this.barChartData };
});

        console.log('📊 Datos recibidos:', data);

        // ✅ asegurarse que datos no estén vacíos
        if (Array.isArray(data) && data.length > 0) {
          this.barChartData.labels = data.map(item => item.estados);
          this.barChartData.datasets[0].data = data.map(item => item.cantidad);
        } else {
          console.warn('⚠️ No se recibieron datos para graficar.');
        }
      });
  }
}
