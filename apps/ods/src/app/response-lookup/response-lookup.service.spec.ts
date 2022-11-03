import { fakeAsync, flush, TestBed } from '@angular/core/testing';
import {
  ApolloTestingController,
  ApolloTestingModule,
} from 'apollo-angular/testing';
import { ResponseLookupService } from './response-lookup.service';

describe('ResponsesService', () => {
  let controller: ApolloTestingController;
  let service: ResponseLookupService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApolloTestingModule],
    });

    service = TestBed.inject(ResponseLookupService);
    controller = TestBed.inject(ApolloTestingController);
  });

  afterEach(() => {
    controller.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call the graphQL query', fakeAsync(async () => {
    //The subscribe will not exit until the response is resolved.
    (await service.getFeedbackResponseById('Test ID')).subscribe((response) => {
      //Make some assertion about the result
      expect(response.data.feedbackResponseByID.firstName).toEqual('Sandy');
    });

    //Catches the outgoing request body held in the controller, which is the acting backend
    const op = controller.expectOne('FeedbackResponseByID');

    //Returns data to the subscribe from before
    op.flush({
      data: {
        feedbackResponseByID: {
          openedDate: 'This date',
          closedDate: 'That date',
          resolved: 'resolved',
          tags: ['Gender'],
          firstName: 'Sandy',
          lastName: 'Sandman',
          grade: 'E-10',
        },
      },
    });
    flush();
  }));
});
