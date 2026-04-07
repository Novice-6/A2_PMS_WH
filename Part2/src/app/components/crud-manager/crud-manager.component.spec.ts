import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudManagerComponent } from './crud-manager.component';

describe('CrudManagerComponent', () => {
  let component: CrudManagerComponent;
  let fixture: ComponentFixture<CrudManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudManagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrudManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
