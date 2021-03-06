import { Injectable } from '@angular/core';
import { Stock } from './model/stock';
import { BehaviorSubject } from 'rxjs';
import { StockOwned } from './model/stockOwned';
import { stockPortfolio } from './model/stockPortfolio';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import * as SocketIO from 'socket.io-client';



@Injectable({
  providedIn: 'root'
})
export class TradingService {

  ioClient = SocketIO.connect(environment.serverUrl);
  stockBuySellHistory$: BehaviorSubject<Array<StockOwned>> = new BehaviorSubject<Array<StockOwned>>([]);
  selectedStock$: BehaviorSubject<Stock> = new BehaviorSubject<Stock>(null);
  selectedStock: Stock;
  selectedStockQuantity$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  stocksList$: BehaviorSubject<Array<Stock>> = new BehaviorSubject<Array<Stock>>([]);
  stockIHave$: BehaviorSubject<Array<stockPortfolio>> = new BehaviorSubject<Array<stockPortfolio>>([]);
  sumOfHistory: number = 0;
  sumOfHistory$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  async sellStock(quantityToSell: number, avgPrice: number) {
    const Profit = (this.selectedStock.currentPrice - avgPrice) * quantityToSell;
    await this.http.get<any>(`${environment.serverUrl}/sell/${this.selectedStock.symbol}/${quantityToSell}/${Profit}`).toPromise(
    ).then(x => {
       this.updateAfterAction(x);
      this.router.navigate(['/', 'myPortfolio']);
    }
    );
  }

  async buyStock(quantityToBuy: number, stockBuyingCost: number) {
    const buyingCost = stockBuyingCost * quantityToBuy;
    await this.http.get<any>(`${environment.serverUrl}/buy/${this.selectedStock.symbol}/${quantityToBuy}/${this.selectedStock.currentPrice}/${buyingCost}`).toPromise(
    ).then(x => {
      this.updateAfterAction(x);
      this.router.navigate(['/', 'myPortfolio']);
    }
    );
  }

  updateAfterAction(stockInfo: JSON) {
    this.stockBuySellHistory$ = new BehaviorSubject<Array<StockOwned>>([]);
    this.stockIHave$ = new BehaviorSubject<Array<stockPortfolio>>([]);
    for (let i = 0; i < stockInfo['history'].length; i++) {
      this.addDataHistory(stockInfo['history'][i]);
    }
    for (let i = 0; i < stockInfo['having'].length; i++) {
      this.addDataIHave(stockInfo['having'][i]);
    }
  }

  calculateStockQuantity(stockTolook: Stock) {
    return this.stockBuySellHistory$.getValue().filter(
      stocks => stocks.symbol === stockTolook.symbol)
      .reduce(
        (accumulator, currentValue) => accumulator + currentValue.numberOfStockBuySell
        , 0
      );
  }

  updateSelectedStock(selectedStock: Stock) {
    this.selectedStock = selectedStock;
    this.selectedStock$.next(selectedStock);
    if (this.stockBuySellHistory$.subscribe(a => a.some(b => b.symbol === selectedStock.symbol))) {
      this.selectedStockQuantity$.next(this.calculateStockQuantity(selectedStock));
    } else {
      this.selectedStockQuantity$.next(0);
    }
  }

  addData(newStock: Stock): void {
    this.stocksList$.next(this.stocksList$.getValue().concat([newStock]));
  }

  addDataHistory(newStock: StockOwned): void {
    this.stockBuySellHistory$.next(this.stockBuySellHistory$.getValue().concat([newStock]));
  }

  addDataIHave(newStock: stockPortfolio): void {
    this.stockIHave$.next(this.stockIHave$.getValue().concat([newStock]));
  }

  async getInitialInfo() {
    this.clearDate();
    await this.http.get<any>(`${environment.serverUrl}/stock`).subscribe(
      x => {
        for (let i = 0; i < x['list'].length; i++) {
          this.addData(x['list'][i]);
        }
        for (let i = 0; i < x['history'].length; i++) {
          this.addDataHistory(x['history'][i]);
        }
        for (let i = 0; i < x['having'].length; i++) {
          this.addDataIHave(x['having'][i]);
        }
      }
    );
  }

  clearDate() {
    this.stocksList$ = new BehaviorSubject<Array<Stock>>([]);
    this.stockBuySellHistory$ = new BehaviorSubject<Array<StockOwned>>([]);
    this.stockIHave$ = new BehaviorSubject<Array<stockPortfolio>>([]);
  }

  constructor(private router: Router, private http: HttpClient) {
    this.getInitialInfo();
    this.ioClient.on('updateStock', x => {
      console.log('updateStock');
      this.updaetNewPrices(x);
    });
  }

  updaetNewPrices(newInfo: Array<Stock>) {
    this.stocksList$.getValue().forEach(stk => {
      const newPrice = newInfo.find(stock => stock.symbol === stk.symbol).currentPrice
      stk.currentPrice = newPrice;
    });
  }
}
