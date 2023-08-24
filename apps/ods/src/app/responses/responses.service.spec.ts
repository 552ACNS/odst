import { fakeAsync, flush, TestBed } from '@angular/core/testing';
import {
  ApolloTestingController,
  ApolloTestingModule,
} from 'apollo-angular/testing';
import { ResponsesService } from './responses.service';
describe('ResponsesService', () => {
  let controller: ApolloTestingController;
  let service: ResponsesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApolloTestingModule],
      providers: [ResponsesService],
    });
    service = TestBed.inject(ResponsesService);
    controller = TestBed.inject(ApolloTestingController);
  });

  afterEach(() => {
    controller.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update a resolved response', fakeAsync(async () => {
    const testData: any = {
      data: {
        id: 'test id',
      },
      where: {
        resolved: {
          set: true,
        },
      },
    };
    (await service.updateResolved(testData)).subscribe((response) => {
      expect(response.data?.updateFeedbackResponse.resolved).toEqual(true);
    });

    const op = controller.expectOne('UpdateResolved');
    op.flush({
      data: {
        updateFeedbackResponse: {
          resolved: true,
        },
      },
    });
    // flush();
  }));

  // test('expect and answer', () => {
  //   //Scaffold the component
  //   const fixture = TestBed.createComponent(ResponsesComponent);
  //   const component = fixture.componentInstance;

  //   //Call the relevant method
  //   component.ngOnInit()

  //   // The following `expectOne()` will match the operation's document.
  //   // If no requests or multiple requests matched that document
  //   // `expectOne()` would throw.
  //   const op = controller.expectOne(GET_DOG_QUERY);

  //   // Assert that one of variables is Mr Apollo.
  //   expect(op.operation.variables.name).toEqual('Mr Apollo');

  //   // Respond with mock data, causing Observable to resolve.
  //   op.flush({
  //     data: {
  //       dog: {
  //         id: 0,
  //         name: 'Mr Apollo',
  //         breed: 'foo',
  //       },
  //     },
  //   });

  //   // Finally, assert that there are no outstanding operations.
  //   controller.verify();
  // });
});
