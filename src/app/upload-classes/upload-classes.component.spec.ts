import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadClassesComponent } from './upload-classes.component';

describe('UploadClassesComponent', () => {
  let component: UploadClassesComponent;
  let fixture: ComponentFixture<UploadClassesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadClassesComponent]
    });
    fixture = TestBed.createComponent(UploadClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
