import {
  TestBed,
  ComponentFixture,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApolloTestingModule } from 'apollo-angular/testing';

import { ResponseLookupComponent } from './response-lookup.component';
import { ResponseLookupService } from './response-lookup.service';
import { ResponseLookupModule } from './response-lookup.module';
import { RouterTestingModule } from '@angular/router/testing';

import { of } from 'rxjs';

describe('ResponsesComponent', () => {
  let component: ResponseLookupComponent;
  let fixture: ComponentFixture<ResponseLookupComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ResponseLookupComponent],
      providers: [
        { provide: ResponseLookupService, useValue: mockResponseLookupService },
      ],
      imports: [
        ApolloTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        ResponseLookupModule,
      ],
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(ResponseLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //Creates an expected servicer response
  const response = {
    data: {
      feedbackResponseByID: {
        openedDate: '2022-07-28T18:51:06.321Z',
        closedDate: '2022-07-28T18:51:18.893Z',
        resolved: true,
        tags: ['Brought in external agency to educate'],
        firstName: 'Admin',
        lastName: 'Admin',
        grade: 'E-∞',
        __typename: 'TrackedFeedback',
      },
    },
  };

  const mockResponseLookupService = {
    getFeedbackResponseById: jest.fn(),
  };

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit a response ID to lookup', fakeAsync(() => {
    //Mocks the service function and the return value it gives as an observable using of()
    mockResponseLookupService.getFeedbackResponseById = jest
      .fn()
      .mockReturnValue(of(response));

    //Sets the user input through the form handler
    component.form.setValue({ reportID: 'Mock ID' });

    //Fires the submit event and detects the changes to the fixture
    component.submit();
    fixture.detectChanges();

    //Waits for the subscribe to resolve all data (Requires fakeAsync to do so)
    tick();

    const expected = response.data.feedbackResponseByID;
    const actual = {
      openedDate: component.openedDate,
      closedDate: component.closedDate,
      resolved: component.status,
      tags: component.tags,
      firstName: component.firstName,
      lastName: component.lastName,
      grade: component.grade,
      __typename: 'TrackedFeedback',
    };

    expect(actual).toEqual(expected);
  }));

  afterEach(() => {
    if (fixture) {
      fixture.destroy();
    }
  });
});
