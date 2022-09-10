import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApipagesComponent } from './apipages.component';

describe('ApipagesComponent', () => {
  let component: ApipagesComponent;
  let fixture: ComponentFixture<ApipagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApipagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApipagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
