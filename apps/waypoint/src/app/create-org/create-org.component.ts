import { Component, OnDestroy, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';
import { Org, OrgTier } from '.prisma/client';
import { Subscription } from 'rxjs';

@Component({
  selector: 'odst-create-org',
  templateUrl: './create-org.component.html',
  styleUrls: ['./create-org.component.scss'],
})
export class CreateOrgComponent implements OnInit, OnDestroy {
  orgTiers: string[] = Object.values(OrgTier);
  orgAliases: string[] = [];
  orgs: Partial<Org>[] = [
    { id: '', name: '', aliases: [], orgTier: 'WING', parentId: null },
  ];
  querySubscription: Subscription;
  loading = true;

  orgForm = this.fb.group({
    orgName: ['', Validators.required],
    orgTier: ['', Validators.required],
    orgAlias: ['', Validators.nullValidator],
    orgParent: ['', Validators.nullValidator],
    orgChildren: ['', Validators.nullValidator],
  });

  constructor(private fb: FormBuilder, private apollo: Apollo) {}
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
  ngOnInit(): void {
    const GET_ORGS = gql`
      query {
        findManyOrgs {
          id
          name
          aliases
        }
      }
    `;
    this.querySubscription = this.apollo
      .watchQuery<any>({
        query: GET_ORGS,
      })
      .valueChanges.subscribe(({ data, loading }) => {
        this.loading = loading;
        this.orgs = data.findManyOrgs;
      });
  }

  OrgSubmit(): void {
    const SUBMIT_ORG = gql`
      mutation createOrg($orgCreateInput: OrgCreateInput!) {
        createOrg(orgCreateInput: $orgCreateInput) {
          id
        }
      }
    `;
    this.apollo
      .mutate({
        mutation: SUBMIT_ORG,
        variables: {
          orgCreateInput: {
            name: this.orgForm.value["orgName"],
            orgTier: this.orgForm.get(["orgTier"])?.value,
            aliases: [],
            parent: {
              connect: {
                id: this.orgForm.get(["orgParent"])?.value
              },
            },
            children: {
              connect: {
                id: this.orgForm.get(["orgChildren"])?.value
              },
            },
          },
        },
      })
      .subscribe(
        ({ data }) => {
          alert(data);
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
