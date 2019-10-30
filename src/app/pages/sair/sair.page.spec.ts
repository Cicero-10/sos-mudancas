import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SairPage } from './sair.page';

describe('SairPage', () => {
  let component: SairPage;
  let fixture: ComponentFixture<SairPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SairPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SairPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
