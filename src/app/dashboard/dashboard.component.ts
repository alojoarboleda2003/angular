import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  public barChartType: 'bar' = 'bar';

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [], // ← se llenará con nombres como 'Portátiles'
    datasets: [
      {
        data: [], // ← se llenará con valores como 35
        label: 'Cantidad por Categoría',
        backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc', '#f6c23e', '#e74a3b']
      }
    ]
  };



 public barChartOptions: ChartConfiguration<'bar'>['options'] = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'top',
      labels: {
        color: '#222', // color del texto de la leyenda
        font: {
          size: 14,
          weight: 'bold',
          family: 'Poppins, sans-serif'
        }
      }
    },
    tooltip: {
      backgroundColor: '#ffffff',
      titleColor: '#000',
      bodyColor: '#333',
      borderColor: '#ccc',
      borderWidth: 1,
      titleFont: {
        size: 14,
        weight: 'bold',
        family: 'Poppins, sans-serif'
      },
      bodyFont: {
        size: 12,
        family: 'Poppins, sans-serif'
      }
    }
  },
  scales: {
    x: {
      grid: {
        color: '#e0e0e0'
      },
      ticks: {
        color: '#222', // color de las categorías
        font: {
          size: 13,
          family: 'Poppins, sans-serif',
          weight: 500
        }
      }
    },
    y: {
      grid: {
        color: '#e0e0e0'
      },
      beginAtZero: true,
      ticks: {
        color: '#333', // color de los números
        font: {
          size: 12,
          family: 'Poppins, sans-serif',
          weight: 500
        }
      }
    }
  }
};


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost/hermes_angular/getEstadoCounts.php')
      .subscribe(data => {
        setTimeout(() => {
          this.barChartData = { ...this.barChartData };
        });

        console.log('📊 Datos recibidos:', data);

        // ✅ asegurarse que datos no estén vacíos
        if (Array.isArray(data) && data.length > 0) {
          this.barChartData.labels = data.map(item => item.categorias);
          this.barChartData.datasets[0].data = data.map(item => item.cantidad);
        } else {
          console.warn('⚠️ No se recibieron datos para graficar.');
        }
      });
  }

}

