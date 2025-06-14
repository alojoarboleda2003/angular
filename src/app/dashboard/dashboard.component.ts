import { AfterViewInit, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  createChart,
  IChartApi,
  SeriesDataItemTypeMap,
  AreaSeriesPartialOptions,
  BusinessDay
} from 'lightweight-charts';

interface EstadoCantidad {
  time: string;   // usado internamente por lightweight-charts
  value: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements AfterViewInit, OnInit {
  private chart!: IChartApi;
  private areaSeries: any;
  public datosDesdeBD: EstadoCantidad[] = [];
  public estadoPorFecha: Record<string, string> = {}; // mapa para etiquetas personalizadas

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // this.http.get<any[]>('/inventario-api/getEstadoCounts.php')
    this.http.get<any[]>('http://localhost/inventario-api/getEstadoCounts.php')

      .subscribe(data => {
        console.log('📦 Datos crudos recibidos:', data);

        // Transformar los datos agregando fechas ficticias y guardando el estado
        const transformados: EstadoCantidad[] = data.map((item, index) => {
          const fecha = `2023-10-${(index + 1).toString().padStart(2, '0')}`;
          this.estadoPorFecha[fecha] = item.estado;
          return {
            time: fecha,
            value: item.cantidad
          };
        });

        console.log('✅ Datos convertidos:', transformados);
        this.datosDesdeBD = transformados;
        this.renderChart();
      });
  }

  ngAfterViewInit(): void {
    // El renderChart se ejecuta desde ngOnInit luego de obtener los datos
  }

  renderChart(): void {
    const container = document.getElementById('chart-container')!;
    const legend = document.getElementById('legend')!;

    this.chart = createChart(container, {
      width: container.clientWidth,
      height: 400,
      layout: {
        background: { color: '#0d0d28' },
        textColor: '#f3f4f6',
      },
      grid: {
        vertLines: { color: '#2c365a' },
        horzLines: { color: '#2c365a' },
      },
      timeScale: {
        timeVisible: false,
        tickMarkFormatter: (time: BusinessDay | string) => {
          const key = time as string;
          return this.estadoPorFecha[key] || '';
        }
      }
    });

    const areaOptions: AreaSeriesPartialOptions = {
      topColor: 'rgba(80, 8, 174, 0.5)',
      bottomColor: 'rgba(0, 120, 255, 0)',
      lineColor: 'rgba(0, 120, 255, 1)',
      lineWidth: 2,
    };

    this.areaSeries = this.chart.addAreaSeries(areaOptions);

    const datosValidos = this.datosDesdeBD.filter(item =>
      item && item.time && typeof item.value === 'number'
    );

    if (datosValidos.length > 0) {
      this.areaSeries.setData(datosValidos);
    } else {
      console.warn('⚠️ No hay datos válidos para mostrar en el gráfico.');
    }

    this.chart.subscribeCrosshairMove(param => {
      let priceFormatted = '';
      const point = param.seriesData.get(this.areaSeries) as { value: number } | undefined;
      if (point && param.time) {
        const estado = this.estadoPorFecha[String(param.time)] || '';
        priceFormatted = `${estado}: ${point.value.toFixed(0)}`;
      }
      legend.innerHTML = `<strong>${priceFormatted}</strong>`;
    });

    new ResizeObserver(() => {
      this.chart.applyOptions({
        width: container.clientWidth,
        height: 400,
      });
    }).observe(container);
  }
}