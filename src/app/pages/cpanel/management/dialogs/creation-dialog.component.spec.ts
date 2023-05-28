import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationDialogComponent } from './creation-dialog.component';

describe('CreationDialogComponent', () => {
  let component: CreationDialogComponent;
  let fixture: ComponentFixture<CreationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreationDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
