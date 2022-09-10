import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterdownComponent } from './footerdown.component';

describe('FooterdownComponent', () => {
  let component: FooterdownComponent;
  let fixture: ComponentFixture<FooterdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
