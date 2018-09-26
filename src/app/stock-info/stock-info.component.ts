import { Component, OnInit } from '@angular/core';
import { Stock } from '../model/stock';
import { TradingService } from '../trading.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-stock-info',
  templateUrl: './stock-info.component.html',
  styleUrls: ['./stock-info.component.css']
})
export class StockInfoComponent implements OnInit {

  stockInformation: Observable<Array<Stock>>;
  stockInfoArray: Array<Stock>;

  selectStockToBuy(selectedStock: Stock){
    this.stockService.updateSelectedStock(selectedStock);
    this.router.navigate(['/', 'buy', selectedStock.currentPrice]);
  }

  // selectStockToSell(selectedStock: Stock){
  //   this.stockService.updateSelectedStock(selectedStock);
  //   this.router.navigate(['/', 'sell']);
  // }



  constructor(private router: Router, private stockService: TradingService) {
    this.stockInformation = this.stockService.stocksList$;
    this.stockInformation.subscribe(x => this.stockInfoArray = x);
  }

  ngOnInit() {
  }

}
