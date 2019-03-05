import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodecHomeComponent } from './codec-home.component';

describe('CodecHomeComponent', () => {
  let component: CodecHomeComponent;
  let fixture: ComponentFixture<CodecHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodecHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodecHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
