import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';
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

  outsideRouting = false;
  answers: string[];
  openDate = new Date();
  orgs: Partial<OrgGql>[];
  CCs: string[] = ['Matos, Emmanuel Lt. Col.',];
  querySubscription: Subscription;
  loading = true;
  submitSuccess = false;
  violatorSpec = { name: '' };
  personSpec = { name: '' };

  constructor(private fb: FormBuilder, private apollo: Apollo, private router: Router) {}

  private violatorSpecification(): string {
    if(this.form.value['violatorSpec'] === 'other')
    {
      return this.form.value['violatorOtherSpec']
    }
    else
    {
      return this.form.value['violatorSpec'];
    }
  }
  private personSpecification(): string {
    if(this.form.value['personSpec'] === 'other')
    {
      return this.form.value['personOtherSpec']
    }
    else
    {
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
    this.querySubscription = this.apollo
      .watchQuery<FindManyOrgs_FormQuery, FindManyOrgs_FormQueryVariables>({
        query: FindManyOrgs_FormDocument,
      })
      .valueChanges.subscribe(({ data, loading }) => {
        this.loading = loading;
        this.orgs = data.findManyOrgs;
      });
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
      .subscribe(
        ({ data, errors }) => {
          this.submitSuccess = (!errors);
          alert(this.submitSuccess);
        },
      );

      // this.apollo
      // .mutate<CreateSurveyResponse_FormMutation,
      // CreateSurveyResponse_FormMutationVariables
      // >({
      //   mutation: CreateSurveyResponse_FormDocument,
      //   variables: {
      //     surveyResponseCreateInput: {
      //       routeOutside: this.outsideRoutingWorking(),
      //       answers: {
      //         createMany: {
      //           data: [
      //             {
      //               value: this.form.get(['eventOrg'])?.value,
      //               questionId: "a092c178-2055-4bb6-af4a-413f405ec069",
      //             },
      //             {
      //               value: this.form.value['event'].trim(),
      //               questionId: "d545c7e5-2c92-44cc-8c31-d7df3a5d1774",
      //             },
      //             {
      //               value: this.violatorSpec.name,
      //               questionId: "309735b4-8a76-42f1-bf74-889f1ddb85cd",
      //             },
      //             {
      //               value: this.form.get(['CC'])?.value,
      //               questionId: "1128de41-93c6-40d4-9698-db51ef38058b",
      //             },
      //             {
      //               value: this.personSpec.name,
      //               questionId: "4128de11-b4dc-44ed-8bd4-1352c7b59bfc",
      //             },
      //             {
      //               value: this.form.value['impact'].trim(),
      //               questionId: "ed0ff38e-5e63-45da-8a09-3289b0467c8e",
      //             }
      //           ]
      //         }
      //       },
      //       survey: {
      //         connect: {
      //           id: "3230ed3d-edb0-418b-8ee0-e91d36309523"
      //         }
      //       }
      //     }
      //   },
      // })
      // .subscribe(
      //   ({ data, errors }) => {
      //     this.submitSuccess = (!errors);
      //     alert(this.submitSuccess);
      //   },
      // );

    
    
    

    this.answers = [
      this.form.get(['eventOrg'])?.value,
      this.form.value['event'].trim(),
      this.violatorSpecification(),
      this.form.value['CC'],
      this.personSpecification(),
      this.form.value['impact'].trim(),
      this.outsideRoutingWorking()
    ]
     return alert(this.answers)
  }
  back() {
    this.router.navigate(['disclaimer']);
  }
  ngOnDestroy() {
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
    }
  }
}

