import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { NgPipesModule } from "ngx-pipes";

import { RentalListComponent } from "./rental-list/rental-list.component";
import { RentalListItemComponent } from "./rental-list-item/rental-list-item.component";
import { HomeComponent } from "./home.component";
import { RentalService } from "./shared/rental.service";
import { RentalDetailComponent } from "./rental-detail/rental-detail.component";
import { MapModule } from "../map/map.module";
import { Daterangepicker } from "ng2-daterangepicker";

import { UppercasePipe } from "../pipes/uppercase.pipe";
import { RentalDetailBookingComponent } from './rental-detail/rental-detail-booking/rental-detail-booking.component';

const routes: Routes = [
  {
    path: "rentals",
    component: HomeComponent,
    children: [
      { path: "", component: RentalListComponent },
      { path: ":rentalId", component: RentalDetailComponent }
    ]
  }
];

@NgModule({
  declarations: [
    RentalListComponent,
    RentalListItemComponent,
    HomeComponent,
    RentalDetailComponent,
    UppercasePipe,
    RentalDetailBookingComponent
  ],
  imports: [
    CommonModule,
    NgPipesModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    MapModule,
    Daterangepicker
  ],
  providers: [RentalService]
})
export class HomeModule {}
