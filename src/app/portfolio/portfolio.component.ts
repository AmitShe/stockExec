import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TradingService } from '../trading.service';
import { stockPortfolio } from '../model/stockPortfolio';
import { Stock } from '../model/stock';
import { Router } from '@angular/router';
import { BuySellHistoryComponent } from '../buy-sell-history/buy-sell-history.component';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  stockInformation: Observable<Array<stockPortfolio>>; // change to stock!!!!
  stockInformationArray: Array<stockPortfolio>;
  totalCostPrafitFromService: number;

  
  selectStockToSell(selectedStockPortfolio: stockPortfolio){
    const selectedStock: Stock = this.stockService.stocksList$.getValue().find(stock => stock.symbol === selectedStockPortfolio.symbol)
    this.stockService.updateSelectedStock(selectedStock);
    this.router.navigate(['/', 'sell' , selectedStockPortfolio.avgBuyingPrice]);
  }
  
  constructor(private router: Router, private stockService: TradingService) { 
    this.stockInformation = this.stockService.stockIHave$;
  this.stockInformation.subscribe(x => this.stockInformationArray = x);
  // this.stockService.calcSumOfHistory();
  // this.totalCostPrafitFromService = history.sumOfHistory;


  }

  ngOnInit() {
  }

}
