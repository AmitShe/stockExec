import { Component, OnInit } from '@angular/core';
import { TradingService } from '../trading.service';
import { Observable } from 'rxjs';
import { Stock } from '../model/stock';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

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

  save(){
    // alert(`Sell: you got it ! ! !`);
// console.log(this.stockService.stockIhave$.getValue());
if (this.form.valid){
  this.stockService.sellStock(this.form.value.howMuchToSell);
}else{
  alert(`sell quantity is not valid.
must be less then owned quantity and not empty!!!`);
}
  }

  constructor(private stockService: TradingService, private fb: FormBuilder) {
    this.selectedStockFromServerObservite = this.stockService.selectedStock$;
    this.selectedStockQuantityFromServerObservite = this.stockService.selectedStockQuantity$;
    this.selectedStockQuantityFromServer = this.stockService.selectedStockQuantity$.getValue();
    this.form= fb.group({
      howMuchToSell: ['', Validators.compose([Validators.required, Validators.min(1), Validators.pattern("^[0-9]*$"), Validators.max(this.selectedStockQuantityFromServer)])]
    });
  }

  ngOnInit() {
  }

}
