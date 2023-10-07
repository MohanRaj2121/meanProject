import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudendcrudComponent } from './studendcrud.component';

describe('StudendcrudComponent', () => {
  let component: StudendcrudComponent;
  let fixture: ComponentFixture<StudendcrudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudendcrudComponent]
    });
    fixture = TestBed.createComponent(StudendcrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
