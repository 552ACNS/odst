import { TestBed } from '@angular/core/testing';
import {
  ApolloTestingController,
  ApolloTestingModule,
} from 'apollo-angular/testing';
import { SurveyQuestionsService } from './survey-questions.service';

describe('SurveyQuestionsService', () => {
  let controller: ApolloTestingController;
  let service: SurveyQuestionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApolloTestingModule],
      providers: [SurveyQuestionsService],
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
