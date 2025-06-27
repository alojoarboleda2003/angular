import { Component } from '@angular/core';

@Component({
  selector: 'app-vender',
  templateUrl: './vender.component.html',
  styleUrls: ['./vender.component.css']
})
export class VenderComponent {

  productos = [
    { id: 1, nombre: 'Hamburguesa', precio: 30000 },
    { id: 2, nombre: 'Perro Caliente', precio: 20000 },
    { id: 3, nombre: 'Coca Cola', precio: 3000 }
  ];

  productoSeleccionado: any = null;
  cantidad: number = 1;

  ventaActual: { producto: any; cantidad: number }[] = [];

  get totalVenta(): number {
    return this.ventaActual.reduce((total, item) => total + (item.producto.precio * item.cantidad), 0);
  }

  agregarProducto() {
    if (this.productoSeleccionado && this.cantidad > 0) {
      const index = this.ventaActual.findIndex(item => item.producto.id === this.productoSeleccionado.id);
      if (index > -1) {
        // Si ya existe, suma la cantidad
        this.ventaActual[index].cantidad += this.cantidad;
      } else {
        this.ventaActual.push({ producto: this.productoSeleccionado, cantidad: this.cantidad });
      }
      this.cantidad = 1;
      this.productoSeleccionado = null;
    }
  }

  eliminarProducto(index: number) {
    this.ventaActual.splice(index, 1);
  }

  finalizarVenta() {
    alert(`Venta finalizada. Total a pagar: ${this.totalVenta.toFixed(2)}`);
    this.ventaActual = [];
  }
}

