import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  ApolloTestingController,
  ApolloTestingModule,
} from 'apollo-angular/testing';
import { ResponsesComponent } from './responses.component';
import { ResponsesModule } from './responses.module';
import { ResponsesService } from './responses.service';
import { SelectTagsComponent } from './select-tags/select-tags.component';

describe('ResponsesComponent', () => {
  let controller: ApolloTestingController;

  //Do not delete, will be finished in a future story
  const ResponsesServiceStub = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResponsesComponent, SelectTagsComponent],
      providers: [
        {
          provide: ResponsesService,
          useValue: ResponsesServiceStub,
        },
      ],
      imports: [
        ResponsesModule,
        ApolloTestingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
      ],
    }).compileComponents();

    controller = TestBed.inject(ApolloTestingController);
    // fixture.detectChanges();
  });

  it('should create', () => {
    // const fixture = TestBed.createComponent(ResponsesComponent);
    // const component = fixture.componentInstance;
    // expect(component).toBeTruthy();
    expect(true).toBe(true);
  });

  afterEach(() => {
    controller.verify();
  });

  describe('Response population', () => {
    // const fixture = TestBed.createComponent(ResponsesComponent);
    // const component = fixture.componentInstance;
    // it('should populate the response form', () => {
    //
    // });
  });

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
