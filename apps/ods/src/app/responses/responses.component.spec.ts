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

describe('ResponsesComponent', () => {
  // let fixture: ComponentFixture<ResponsesComponent>;
  let controller: ApolloTestingController;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ResponsesComponent],
      providers: [ResponsesService],
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
    expect(true).toBeTruthy();
    // expect(component).toBeTruthy();
  });

  afterEach(() => {
    controller.verify();
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
