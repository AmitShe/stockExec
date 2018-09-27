import { Component, OnInit } from '@angular/core';
import { Stock } from '../model/stock';
import { TradingService } from '../trading.service';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-buying-form',
  templateUrl: './buying-form.component.html',
  styleUrls: ['./buying-form.component.css']
})
export class BuyingFormComponent implements OnInit {

  selectedStockFromServerObservite: Observable<Stock>;
  form: FormGroup;
buyingCost: number;

  save(){
    if (this.form.valid){
      this.stockService.buyStock(this.form.value.howMuchTobuy, this.buyingCost);
    }
    else{
      alert(`sell quantity is not valid.
must be greater then 0 not empty!!!`);
    }
  }

  constructor(private activatedRoute: ActivatedRoute, private stockService: TradingService, private fb: FormBuilder) { 
    activatedRoute.params.subscribe(params => {
      this.buyingCost = params['buyingCost'];
    })
    this.selectedStockFromServerObservite = this.stockService.selectedStock$;
    this.form= fb.group({
      howMuchTobuy: ['', Validators.compose([Validators.required, Validators.min(1), Validators.pattern("^[0-9]*$")])]
    });

  }

  ngOnInit() {
  }

}
