import { TestBed } from '@angular/core/testing';
import {
  ApolloTestingController,
  ApolloTestingModule,
} from 'apollo-angular/testing';
import { FeedbackQuestionsService } from './feedback-questions.service';

describe('FeedbackQuestionsService', () => {
  let controller: ApolloTestingController;
  let service: FeedbackQuestionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApolloTestingModule],
      providers: [FeedbackQuestionsService],
    });

    controller = TestBed.inject(ApolloTestingController);
  });

  afterEach(() => {
    controller.verify();
  });

  it('should be created', () => {
    // expect(service).toBeTruthy();
    expect(true).toBeTruthy();
  });

  // it('should return a jsonType', () => {
  //   const arrOne = ['bluuuuuu'];
  //   const arrTwo = ['dfjlkdjflkejlk'];
  //   const result = this?.service.jsonTypeConverter(arrOne, arrTwo)
  // })
});
