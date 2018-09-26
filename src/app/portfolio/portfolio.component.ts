import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TradingService } from '../trading.service';
import { stockPortfolio } from '../model/stockPortfolio';
import { Stock } from '../model/stock';
import { Router } from '@angular/router';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  stockInformation: Observable<Array<stockPortfolio>>;
  stockInformationArray: Array<stockPortfolio>;
  
  selectStockToSell(selectedStock: Stock){
    this.stockService.updateSelectedStock(selectedStock);
    this.router.navigate(['/', 'sell']);
  }
  
  constructor(private router: Router, private stockService: TradingService) { 
    this.stockInformation = this.stockService.stockIHave$;
  this.stockInformation.subscribe(x => this.stockInformationArray = x);

  }

  ngOnInit() {
  }

}
