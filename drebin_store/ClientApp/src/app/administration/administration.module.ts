import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { AdministrationHomeComponent } from './administration-home/administration-home.component';
import { OrdersManagerComponent } from './orders-manager/orders-manager.component';
import { ProductsManagerComponent } from './products-manager/products-manager.component';
import { UsersManagerComponent } from './users-manager/users-manager.component';
import { GroupsManagerComponent } from './groups-manager/groups-manager.component';
import { UsersListComponent } from './users-manager/users-list/users-list.component';
import { UserDetailsComponent } from './users-manager/user-details/user-details.component';
import { OrdersListComponent } from './orders-manager/orders-list/orders-list.component';
import { OrderDetailsComponent } from './orders-manager/order-details/order-details.component';
import { ProductsListComponent } from './products-manager/products-list/products-list.component';
import { ProductDetailsComponent } from './products-manager/product-details/product-details.component';
import { ProductAdderComponent } from './products-manager/product-adder/product-adder.component';
import { AuditComponent } from './audit/audit.component';
import { OrderStatePipe } from './orders-manager/pipes/orders-state.pipe';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AdministrationHomeComponent,
    OrdersManagerComponent,
    ProductsManagerComponent,
    UsersManagerComponent,
    GroupsManagerComponent,
    UsersListComponent,
    UserDetailsComponent,
    OrdersListComponent,
    OrderDetailsComponent,
    ProductsListComponent,
    ProductDetailsComponent,
    ProductAdderComponent,
    AuditComponent,
    OrderStatePipe,
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    ReactiveFormsModule
  ]
})
export class AdministrationModule { }
