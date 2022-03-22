import { Component, OnDestroy, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { CreateOrgService } from './create-org.service';
import {
  CreateOrgDocument,
  CreateOrgMutation,
  CreateOrgMutationVariables,
  FindManyOrgsDocument,
  FindManyOrgsQuery,
  FindManyOrgsQueryVariables,
  OrgGql,
  OrgTier,
} from '../../../graphql-generated';

@Component({
  selector: 'odst-create-org',
  templateUrl: './create-org.component.html',
  styleUrls: ['./create-org.component.scss'],
})
export class CreateOrgComponent implements OnInit, OnDestroy {
  orgTiers: string[] = Object.values(OrgTier);
  orgAliases: string[] = [];
  orgs: Partial<OrgGql>[];
  querySubscription: Subscription;
  loading = true;
  submitSuccess = false;

  orgForm = this.fb.group({
    orgName: ['', Validators.required],
    orgTier: ['', Validators.required],
    orgAlias: ['', Validators.nullValidator],
    orgParent: ['', Validators.nullValidator],
    orgChildren: ['', Validators.nullValidator],
  });

  constructor(
    private fb: FormBuilder,
    private apollo: Apollo,
    private orgService: CreateOrgService
  ) {}
  // isString(input: string): null | string{
  //   if(!input){
  //     return null;
  //   }
  //   else{
  //     return input;
  //   }
  // }

  // addAlias(): void {
  //   if (this.orgForm.get(['orgAlias'])?.value !== null) {
  //     this.orgAliases.push(this.orgForm.get(['orgAlias'])?.value);
  //     alert(this.orgAliases);
  //   }
  // }
  async ngOnInit(): Promise<void> {
    this.querySubscription = this.apollo
      .watchQuery<FindManyOrgsQuery, FindManyOrgsQueryVariables>({
        query: FindManyOrgsDocument,
      })
      .valueChanges.subscribe(({ data, loading }) => {
        this.loading = loading;
        this.orgs = data.findManyOrgs;
      });
  }

  OrgSubmit(): void {
    this.apollo
      .mutate<CreateOrgMutation, CreateOrgMutationVariables>({
        mutation: CreateOrgDocument,
        variables: {
          orgCreateInput: {
            name: this.orgForm.value['orgName'],
            orgTier: this.orgForm.get(['orgTier'])?.value,
            aliases: [],
            //TODO: Functionality with adding a parent or children orgs to an org being created+
            // parent: {
            //   connect: {
            //     id: this.orgForm.get(["orgParent"])?.value
            //   },
            // },
            // children: {
            //   connect: {
            //     id: this.orgForm.get(["orgChildren"])?.value
            //   },
            // },
          },
        },
      })
      .subscribe( //TODO deprecated
        ({ data }) => {
          this.submitSuccess = true;
        },
        (error) => {
          alert('There was an error sending the query: /n' + error);
          alert(
            this.orgForm.value['orgName'] +
              this.orgForm.get(['orgTier'])?.value +
              this.orgForm.get(['orgParent'])?.value +
              this.orgForm.get(['orgChildren'])?.value
          );
        }
      );
  }
  ngOnDestroy() {
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
    }
  }
}
