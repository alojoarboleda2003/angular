import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router'; // 👈 AÑADE ESTO
import { NgChartsModule } from 'ng2-charts';
//import { Dashboard2Component } from './dashboard-2/dashboard-2.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    //Dashboard2Component
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([]), // 👈 AÑADE ESTO también
    NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}