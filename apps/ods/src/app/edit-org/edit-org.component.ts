import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { OrgTier } from '../../types.graphql';
import { EditOrgService } from './edit-org.service';
import {
  CustomValidators,
  MyErrorStateMatcher,
  regExpForOrgNames,
  errorMessagesForOrgNames,
} from '@odst/shared/angular';

@Component({
  selector: 'odst-create-org',
  templateUrl: './edit-org.component.html',
  styleUrls: ['./edit-org.component.scss'],
})
export class EditOrgComponent {}
