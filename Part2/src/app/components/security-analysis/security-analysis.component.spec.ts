import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityAnalysisComponent } from './security-analysis.component';

describe('SecurityAnalysisComponent', () => {
  let component: SecurityAnalysisComponent;
  let fixture: ComponentFixture<SecurityAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecurityAnalysisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SecurityAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
