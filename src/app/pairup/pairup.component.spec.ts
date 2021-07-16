import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PairupComponent } from './pairup.component';

describe('PairupComponent', () => {
  let component: PairupComponent;
  let fixture: ComponentFixture<PairupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PairupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PairupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
