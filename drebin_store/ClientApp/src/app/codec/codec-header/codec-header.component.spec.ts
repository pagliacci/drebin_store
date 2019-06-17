import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodecHeaderComponent } from './codec-header.component';

describe('CodecHeaderComponent', () => {
  let component: CodecHeaderComponent;
  let fixture: ComponentFixture<CodecHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodecHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodecHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
