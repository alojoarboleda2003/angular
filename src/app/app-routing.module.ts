import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosComponent } from './productos/productos.component';
import { VenderComponent } from './vender/vender.component';
import { PedidosComponent } from './pedidos/pedidos.component';

const routes: Routes = [
  { path: 'productos', component: ProductosComponent },
  { path: 'vender', component: VenderComponent },
  { path: 'pedidos', component: PedidosComponent },
  // otras rutas aquí
 // { path: '', redirectTo: '/productos', pathMatch: 'full' } // ruta por defecto
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

