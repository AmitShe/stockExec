import { Route } from "@angular/router";
import { PortfolioComponent } from "./portfolio/portfolio.component";
import { BuySellHistoryComponent } from "./buy-sell-history/buy-sell-history.component";
import { BuyingFormComponent } from "./buying-form/buying-form.component";
import { SellingFormComponent } from "./selling-form/selling-form.component";


export const ROUTES: Route[] = [
    {
        path: 'myPortfolio', component: PortfolioComponent
    },
    {
        path: 'history', component: BuySellHistoryComponent
    },
    {
        path: 'buy', component: BuyingFormComponent
    },
    {
        path: 'sell', component: SellingFormComponent
    },
    {
        path: '', pathMatch: 'full', redirectTo: '/myPortfolio'
    }
];