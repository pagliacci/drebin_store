import { TestBed } from '@angular/core/testing';

import { ProductsManagerService } from './products-manager.service';

describe('ProductsManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductsManagerService = TestBed.get(ProductsManagerService);
    expect(service).toBeTruthy();
  });
});
