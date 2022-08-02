import {
  TestBed,
  ComponentFixture,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  ApolloTestingController,
  ApolloTestingModule,
} from 'apollo-angular/testing';

import { ResponseLookupComponent } from './response-lookup.component';
import { ResponseLookupService } from './response-lookup.service';
import { ResponseLookupModule } from './response-lookup.module';
import { RouterTestingModule } from '@angular/router/testing';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
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
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatListModule,
      ],
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(ResponseLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

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
    getFeedbackReponseById: jest.fn(),
  };

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit a response ID to lookup', fakeAsync(() => {
    mockResponseLookupService.getFeedbackReponseById = jest
      .fn()
      .mockReturnValue(of(response));
    component.form.setValue({ reportID: 'Mock ID' });
    component.submit();
    fixture.detectChanges();
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
