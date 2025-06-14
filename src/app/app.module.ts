import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router'; // 👈 AÑADE ESTO
import { NgChartsModule } from 'ng2-charts';
<<<<<<< HEAD
//import { Dashboard2Component } from './dashboard-2/dashboard-2.component';
=======
import { Dashboard2Component } from './dashboard-2/dashboard-2.component';
>>>>>>> f3db99084e1341024ef87d2cc7158287917e6f43

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
<<<<<<< HEAD
    //Dashboard2Component
=======
    Dashboard2Component
>>>>>>> f3db99084e1341024ef87d2cc7158287917e6f43
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
<<<<<<< HEAD
export class AppModule {}
=======
export class AppModule {}
>>>>>>> f3db99084e1341024ef87d2cc7158287917e6f43
