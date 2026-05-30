import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualCard } from './virtual-card';

describe('VirtualCard', () => {
  let component: VirtualCard;
  let fixture: ComponentFixture<VirtualCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VirtualCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VirtualCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
