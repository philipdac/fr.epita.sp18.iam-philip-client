import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConfirmCancelComponent } from './dialog-confirm-cancel.component';

describe('DialogConfirmCancelComponent', () => {
  let component: DialogConfirmCancelComponent;
  let fixture: ComponentFixture<DialogConfirmCancelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogConfirmCancelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogConfirmCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
