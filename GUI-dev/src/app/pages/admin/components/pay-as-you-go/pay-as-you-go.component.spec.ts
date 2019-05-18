import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayAsYouGoComponent } from './pay-as-you-go.component';

describe('PayAsYouGoComponent', () => {
  let component: PayAsYouGoComponent;
  let fixture: ComponentFixture<PayAsYouGoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayAsYouGoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayAsYouGoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
