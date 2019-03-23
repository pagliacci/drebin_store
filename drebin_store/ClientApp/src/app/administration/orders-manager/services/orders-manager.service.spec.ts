import { TestBed } from '@angular/core/testing';

import { OrdersManagerService } from './orders-manager.service';

describe('OrdersManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrdersManagerService = TestBed.get(OrdersManagerService);
    expect(service).toBeTruthy();
  });
});
