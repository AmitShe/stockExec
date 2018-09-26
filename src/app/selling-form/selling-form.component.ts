import { Component, OnInit } from '@angular/core';
import { TradingService } from '../trading.service';
import { Observable } from 'rxjs';
import { Stock } from '../model/stock';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-selling-form',
  templateUrl: './selling-form.component.html',
  styleUrls: ['./selling-form.component.css']
})
export class SellingFormComponent implements OnInit {

  selectedStockFromServerObservite: Observable<Stock>;
  selectedStockQuantityFromServerObservite: Observable<number>;
  selectedStockQuantityFromServer: number;
  form: FormGroup;
  avgPrice: number;
  current: number;

  save(){
if (this.form.valid){
  this.stockService.sellStock(this.form.value.howMuchToSell, this.avgPrice);
}else{
  alert(`sell quantity is not valid.
must be less then owned quantity and not empty!!!`);
}
  }

  constructor(private activatedRoute: ActivatedRoute, private stockService: TradingService, private fb: FormBuilder) {
    activatedRoute.params.subscribe(params => {
      this.avgPrice = params['avgPrice'];
    })
    this.selectedStockFromServerObservite = this.stockService.selectedStock$;
    // this.current = this.stockService.selectedStock.currentPrice;
    this.selectedStockQuantityFromServerObservite = this.stockService.selectedStockQuantity$;
    this.selectedStockQuantityFromServer = this.stockService.selectedStockQuantity$.getValue();
    this.form= fb.group({
      howMuchToSell: ['', Validators.compose([Validators.required, Validators.min(1), Validators.pattern("^[0-9]*$"), Validators.max(this.selectedStockQuantityFromServer)])]
    });
  }

  ngOnInit() {
  }

}
