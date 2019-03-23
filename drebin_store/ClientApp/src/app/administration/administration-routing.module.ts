import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministrationHomeComponent } from './administration-home/administration-home.component';
import { AdministrationAccessGuard } from './guards/administration-access.guard';
import { UsersManagerComponent } from './users-manager/users-manager.component';
import { GroupsManagerComponent } from './groups-manager/groups-manager.component';
import { OrdersManagerComponent } from './orders-manager/orders-manager.component';
import { ProductsManagerComponent } from './products-manager/products-manager.component';
import { AuditComponent } from './audit/audit.component';

const routes: Routes = [
  {
    path: 'administration',
    component: AdministrationHomeComponent,
    canActivate: [AdministrationAccessGuard],
    canActivateChild: [AdministrationAccessGuard],
    children: [
      {
        path: '',
        component: UsersManagerComponent
      },
      {
        path: 'groups',
        component: GroupsManagerComponent
      },
      {
        path: 'orders',
        component: OrdersManagerComponent
      },
      {
        path: 'products',
        component: ProductsManagerComponent
      },
      {
        path: 'audit',
        component: AuditComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
