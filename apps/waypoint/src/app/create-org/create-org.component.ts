import { Component, OnDestroy, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { Org, OrgTier } from '@prisma/client';
import { Subscription } from 'rxjs';
import { CreateOrgService } from './create-org.service';

@Component({
  selector: 'odst-create-org',
  templateUrl: './create-org.component.html',
  styleUrls: ['./create-org.component.scss'],
})
export class CreateOrgComponent implements OnInit, OnDestroy {
  orgTiers: string[] = Object.values(OrgTier);
  orgAliases: string[] = [];
  orgs: Org[] = []
  querySubscription: Subscription;
  loading = true;

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
    const GET_ORGS = this.orgService.queryOrgs();
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
    const SUBMIT_ORG = this.orgService.mutationCreateOrg();

    this.apollo
      .mutate<any>({
        mutation: SUBMIT_ORG,
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
      .subscribe(
        ({ data }) => {
          alert('IOrganization Added!');
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
