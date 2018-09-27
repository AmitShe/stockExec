import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TradingService } from '../trading.service';
import { stockPortfolio } from '../model/stockPortfolio';
import { Stock } from '../model/stock';
import { Router } from '@angular/router';
import { StockOwned } from '../model/stockOwned';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  stockInformation: Observable<Array<stockPortfolio>>;
  stockInformationArray: Array<stockPortfolio>;
  totalCostPrafitFromService: number;
  stockHistory: Observable<Array<StockOwned>>;
  sumOfHistory: number = 0;

  
  selectStockToSell(selectedStockPortfolio: stockPortfolio){
    const selectedStock: Stock = this.stockService.stocksList$.getValue().find(stock => stock.symbol === selectedStockPortfolio.symbol)
    this.stockService.updateSelectedStock(selectedStock);
    this.router.navigate(['/', 'sell' , selectedStockPortfolio.avgBuyingPrice]);
  }
  

  calcSumOfHistory(){
    this.stockHistory.subscribe(a => {
      a.forEach(stock => {
        this.sumOfHistory= this.sumOfHistory + +stock.profitPerDeal;
      })
    } )
  }

  constructor(private router: Router, private stockService: TradingService) { 
  this.stockInformation = this.stockService.stockIHave$;
  this.stockInformation.subscribe(x => this.stockInformationArray = x);
  this.stockHistory = this.stockService.stockBuySellHistory$;
  this.calcSumOfHistory();
  }

  ngOnInit() {
  }
}