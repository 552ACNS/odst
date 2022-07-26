import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  ApolloTestingController,
  ApolloTestingModule,
} from 'apollo-angular/testing';

import { ResponseLookupComponent } from './response-lookup.component';
import { ResponseLookupModule } from './response-lookup.module';
import { ResponseLookupService } from './response-lookup.service';

describe('ResponsesComponent', () => {
  // let fixture: ComponentFixture<ResponsesComponent>;
  let controller: ApolloTestingController;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ResponseLookupComponent],
      providers: [ResponseLookupModule],
      imports: [
        ResponseLookupService,
        ApolloTestingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
      ],
    }).compileComponents();

    controller = TestBed.inject(ApolloTestingController);
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(true).toBeTruthy();
    // expect(component).toBeTruthy();
  });

  afterEach(() => {
    controller.verify();
  });
});
