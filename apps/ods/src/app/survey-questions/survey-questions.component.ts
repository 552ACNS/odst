import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { SurveyQuestionsService } from './survey-questions.service';
import {
  CreateSurveyWithQuestions_FormDocument,
  CreateSurveyWithQuestions_FormMutation,
  CreateSurveyWithQuestions_FormMutationVariables,
  FindManyOrgs_FormDocument,
  FindManyOrgs_FormQuery,
  FindManyOrgs_FormQueryVariables,
  CreateSurveyResponse_FormMutation,
  CreateSurveyResponse_FormMutationVariables,
  CreateSurveyResponse_FormDocument,
  OrgGql,
  QuestionGql,
  FindQuestionsBySurvey_FormQuery,
  FindQuestionsBySurvey_FormQueryVariables,
  FindQuestionsBySurvey_FormDocument,
} from '../../graphql-generated';
import { Router } from '@angular/router';

@Component({
  selector: 'odst-survey-questions',
  templateUrl: './survey-questions.component.html',
  styleUrls: ['./survey-questions.component.scss'],
})
export class SurveyQuestionsComponent implements OnInit, OnDestroy {
  questions = [
    'What squadron did the event occur in?',
    'Please describe the event of a microaggression or discrimination that took place in your squadron. Please refrain from using names or identifying information.',
    'Was the person performing the microaggression or discrimination active duty, civilian, guard/reserve or a contractor?',
    'Who is your SQ/CC?',
    'Are you active duty, a civilian, guard/reserve or contractor?',
    'What impacts did this event have on you or your work environment',
  ];

  questionObjects: QuestionGql[];
  surveyID?: string | null;

  outsideRouting = false;
  answers: string[];
  openDate = new Date();
  orgs: string[];
  CCs: string[] = ['Matos, Emmanuel Lt. Col.'];
  querySubscription: Subscription;
  loading = true;
  submitSuccess = false;
  violatorSpec = '';
  personSpec = '';

  constructor(
    private fb: FormBuilder,
    private apollo: Apollo,
    private router: Router,
    private surveyService: SurveyQuestionsService
  ) {}

  private violatorSpecification(): string {
    if (this.form.value['violatorSpec'] === 'other') {
      return this.form.value['violatorOtherSpec'];
    } else {
      return this.form.value['violatorSpec'];
    }
  }
  private personSpecification(): string {
    if (this.form.value['personSpec'] === 'other') {
      return this.form.value['personOtherSpec'];
    } else {
      return this.form.value['personSpec'];
    }
  }

  //validators didnt need to be inside the formControlName and caused it to break, so i removed
  //them. Also, all form controls need to be specificed in their or else they all will not
  //load properly.
  // eslint-disable-next-line @typescript-eslint/member-ordering
  form = this.fb.group({
    eventOrg: ['', [Validators.required]],
    event: ['', [Validators.required]],
    violatorSpec: ['', [Validators.required]],
    violatorOtherSpec: [],
    CC: ['', [Validators.required]],
    personSpec: ['', [Validators.required]],
    personOtherSpec: [],
    impact: ['', [Validators.required]],
    outsideRouting: [],
  });

  async ngOnInit(): Promise<void> {
    (await this.surveyService.getManyOrgs()).subscribe((data) => {
      this.orgs = data;
    });
    // this.querySubscription = this.apollo
    //   .watchQuery<FindManyOrgs_FormQuery, FindManyOrgs_FormQueryVariables>({
    //     query: FindManyOrgs_FormDocument,
    //   })
    //   .valueChanges.subscribe(({ data, loading }) => {
    //     this.loading = loading;
    //     this.orgs = data.findManyOrgs;
    //   });
  }
  //TODO find out a way to fix without this
  outsideRoutingWorking(): boolean {
    if (this.form.get(['outsideRouting'])?.value == true) {
      return true;
    } else {
      return false;
    }
  }
  submit() {
    this.apollo
      .mutate<
        CreateSurveyWithQuestions_FormMutation,
        CreateSurveyWithQuestions_FormMutationVariables
      >({
        mutation: CreateSurveyWithQuestions_FormDocument,
        variables: {
          questionPrompts: this.questions,
        },
      })
      .subscribe(({ data, errors }) => {
        this.surveyID = data?.createSurveyWithQuestions.id;
        //this.submitSuccess = (!errors);
        this.querySubscription = this.apollo
          .watchQuery<
            FindQuestionsBySurvey_FormQuery,
            FindQuestionsBySurvey_FormQueryVariables
          >({
            query: FindQuestionsBySurvey_FormDocument,
            variables: {
              surveyWhereUniqueInput: {
                id: this.surveyID,
              },
            },
          })
          .valueChanges.subscribe(({ data, loading }) => {
            this.loading = loading;
            this.questionObjects = data.getSubQuestions;
            console.log(this.surveyID);
            console.log(this.questionObjects);
            this.apollo
              .mutate<
                CreateSurveyResponse_FormMutation,
                CreateSurveyResponse_FormMutationVariables
              >({
                mutation: CreateSurveyResponse_FormDocument,
                variables: {
                  surveyResponseCreateInput: {
                    routeOutside: this.outsideRoutingWorking(),
                    answers: {
                      createMany: {
                        data: [
                          {
                            value: this.form.get(['eventOrg'])?.value,
                            questionId: this.questionObjects[0].id,
                          },
                          {
                            value: this.form.value['event'].trim(),
                            questionId: this.questionObjects[1].id,
                          },
                          {
                            value: this.violatorSpecification(),
                            questionId: this.questionObjects[2].id,
                          },
                          {
                            value: this.form.get(['CC'])?.value,
                            questionId: this.questionObjects[3].id,
                          },
                          {
                            value: this.personSpecification(),
                            questionId: this.questionObjects[4].id,
                          },
                          {
                            value: this.form.value['impact'].trim(),
                            questionId: this.questionObjects[5].id,
                          },
                        ],
                      },
                    },
                    survey: {
                      connect: {
                        id: this.surveyID,
                      },
                    },
                  },
                },
              })
              .subscribe(({ data, errors }) => {
                this.submitSuccess = !errors;
                alert(this.submitSuccess);
                alert(data);
              });
          });
      });

    // this.answers = [
    //   this.form.get(['eventOrg'])?.value,
    //   this.form.value['event'].trim(),
    //   this.violatorSpecification(),
    //   this.form.value['CC'],
    //   this.personSpecification(),
    //   this.form.value['impact'].trim(),
    //   this.outsideRoutingWorking()
    // ]
    //  return alert(this.answers)
  }
  ngOnDestroy() {
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
    }
  }
}
