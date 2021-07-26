import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UTCComponent } from './utc.component';

describe('UTCComponent', () => {
  let component: UTCComponent;
  let fixture: ComponentFixture<UTCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UTCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UTCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
