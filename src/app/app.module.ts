import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppFormComponent } from './app-form/app-form.component';
import { StockInfoComponent } from './stock-info/stock-info.component';
import { ROUTES } from './routering';
import { RouterModule } from '@angular/router';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { BuySellHistoryComponent } from './buy-sell-history/buy-sell-history.component';
import { BuyingFormComponent } from './buying-form/buying-form.component';
import { SellingFormComponent } from './selling-form/selling-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatTableModule, MatMenuModule, MatFormFieldModule, MatInputModule, MatPaginatorModule} from '@angular/material';



@NgModule({
  declarations: [
    AppComponent,
    AppFormComponent,
    StockInfoComponent,
    PortfolioComponent,
    BuySellHistoryComponent,
    BuyingFormComponent,
    SellingFormComponent
    ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatTableModule,
    MatMenuModule,
    MatInputModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
