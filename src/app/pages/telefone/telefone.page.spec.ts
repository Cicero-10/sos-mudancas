import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TelefonePage } from './telefone.page';

describe('TelefonePage', () => {
  let component: TelefonePage;
  let fixture: ComponentFixture<TelefonePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelefonePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelefonePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
