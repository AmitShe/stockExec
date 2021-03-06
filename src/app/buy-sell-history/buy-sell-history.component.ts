import { Component, OnInit, ViewChild } from '@angular/core';
import { TradingService } from '../trading.service';
import { StockOwned } from '../model/stockOwned';
import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material';

@Component({
  selector: 'app-buy-sell-history',
  templateUrl: './buy-sell-history.component.html',
  styleUrls: ['./buy-sell-history.component.css']
})
export class BuySellHistoryComponent implements OnInit {
  stockInformation: Observable<Array<StockOwned>>;
  stockInformationArray: Array<StockOwned>;

  constructor(private stockService: TradingService) { 
  this.stockInformation = this.stockService.stockBuySellHistory$;
  this.stockInformation.subscribe(x => this.stockInformationArray = x);
  }
  
  ngOnInit() {
  }
}