import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ApolloTestingModule } from 'apollo-angular/testing';

import { ResponsesComponent } from './responses.component';
import { ResponsesModule } from './responses.module';
import { ResponsesService } from './responses.service';

import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('ResponsesComponent', () => {
  let component: ResponsesComponent;
  let fixture: ComponentFixture<ResponsesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResponsesComponent],
      providers: [
        { provide: ResponsesService, useValue: mockResponsesService },
      ],
      imports: [
        ResponsesModule,
        ApolloTestingModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        RouterTestingModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  const mockResponsesService = {
    updateResolved: jest.fn(),
  };

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit a custom response', fakeAsync(() => {
    const testId = 'test id';
    const testResponse = 'test response';
    component.response = {
      id: testId,
      openedDate: new Date(),
      closedDate: undefined,
      routeOutside: false,
      resolvedComment: testResponse,
      resolved: false,
    };
    component.response.id = testId;
    component.resolvedComment = testResponse;

    const testData = {
      where: {
        id: testId,
      },
      data: {
        resolvedComment: {
          set: testResponse,
        },
      },
    };
    mockResponsesService.updateResolved.mockReturnValue(of(testData));
    component.submitResolvedComment();

    tick();

    expect(component.resolvedCommentSuccess).toBe(true);
  }));

  // afterEach(() => {
  //   controller.verify();
  // });

  // describe('load response ids', () => {
  //   it('should return response ids', (done) => {
  //     const mockResponseIDs  = ['a uuid', 'another uuid', 'yet another uuid'];

  //     (service.getResponseIDsByStatus(true)).subscribe(serverResponse => {
  //       expect(serverResponse).toEqual(mockResponseIDs);
  //       done();
  //     });

  //     // const req = controller.expectOne(GetIssuesByStatusDocument);

  //     // expect(req.operation.operationName).toBe('getIssuesByStatus');
  //     // req.flush({
  //     //   data: {
  //     //     users: [
  //     //       mockResponseIDs
  //     //     ]
  //     //   }
  //     // });

  //     // controller.verify();
  //   });
  // });
});
