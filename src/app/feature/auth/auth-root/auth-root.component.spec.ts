import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthRootComponent } from './auth-root.component';

describe('AuthRootComponent', () => {
  let component: AuthRootComponent;
  let fixture: ComponentFixture<AuthRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthRootComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
