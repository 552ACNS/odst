import {
  TestBed,
  ComponentFixture,
  fakeAsync,
  tick,
  flush,
} from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { EditOrgComponent } from './edit-org.component';
import { EditOrgService } from './edit-org.service';
import { EditOrgModule } from './edit-org.module';

import { RouterTestingModule } from '@angular/router/testing';

import { of } from 'rxjs';
import { OrgTier } from '../../types.graphql';
import { MatChipInputEvent } from '@angular/material/chips';
import _default from '@apollo/client/utilities/globals/DEV';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatOption, _MatOptionBase } from '@angular/material/core';

describe('EditOrgComponent', () => {
  let component: EditOrgComponent;
  let fixture: ComponentFixture<EditOrgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditOrgComponent],
      providers: [{ provide: EditOrgService, useValue: mockEditOrgService }],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        ApolloTestingModule,
        MatCardModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        MatSelectModule,
        BrowserModule,
        NoopAnimationsModule,
        EditOrgModule,
        RouterTestingModule,
      ],
    }).compileComponents();
  });

  const user = {
    data: {
      id: '1',
    },
  };

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  const mockEditOrgService = {
    getUserOrgsNames: jest.fn(),
    updateOrg: jest.fn(),
    getChildren: jest.fn(),
    getOrgTier: jest.fn(),
    getOrgsByTierBelow: jest.fn(),
    checkOrg: jest.fn(),
    checkValidChild: jest.fn(),
    generateFilteredOrgs: jest.fn(),
    childrenConnection: jest.fn(),
  };

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get all orgs under the user on startup', fakeAsync(() => {
    const parent = ['123 TEST'];
    const children = ['456 TEST', '789 TEST'];
    const orgs = [...children, ...parent];

    mockEditOrgService.getUserOrgsNames = jest.fn().mockReturnValue(of(parent));
    mockEditOrgService.getChildren = jest.fn().mockReturnValue(of(children));
    component.ngOnInit();

    tick();
    const expected = orgs;
    const actual = component.userOrgs;
    expect(actual).toEqual(expected);
  }));

  it('should make input required when any input is added', fakeAsync(() => {
    component.onInputMakeRequired();
    tick();
    const expected = false;
    const actual = component.form.controls['confirmName'].hasValidator(
      Validators.required
    );
    expect(actual).toEqual(expected);
  }));

  it('should get the children', fakeAsync(() => {
    const children = ['456 TEST', '789 TEST'];

    mockEditOrgService.getChildren = jest.fn().mockReturnValue(of(children));
    component.getChildren('123 TEST');

    tick();
    const expected = component.selectedChildren;
    const actual = children;
    expect(actual).toEqual(expected);
  }));

  it('should get orgs by tier below', fakeAsync(() => {
    const org = '123 TEST';
    const orgsBelow = ['456 TEST', '789 TEST'];
    const tier = OrgTier[1];

    mockEditOrgService.getOrgTier = jest.fn().mockReturnValue(of(tier));
    mockEditOrgService.getOrgsByTierBelow = jest
      .fn()
      .mockReturnValue(of(orgsBelow));
    component.getOrgTierBelow(org);

    tick();
    const expected = component.childrenOrgs;
    const actual = orgsBelow;
    expect(actual).toEqual(expected);
  }));

  it('should check if child is a valid choice', fakeAsync(() => {
    const child = '123 TEST';
    component.filteredOrgs = ['456 TEST', '789 TEST'];

    const actual = component.checkValidChild(child);

    tick();
    const expected = false;
    expect(actual).toEqual(expected);
    flush();
  }));

  it('should add the child', fakeAsync(() => {
    const child = '123 TEST';
    component.selectedChildren = [];
    component.filteredOrgs = ['123 TEST'];
    component.childrenOrgs = ['123 TEST', '456 TEST', '789 TEST'];

    const chipInput: Partial<MatChipInputEvent> = {
      value: child,
    };

    mockEditOrgService.checkValidChild = jest.fn().mockReturnValue(of(true));
    component.add(chipInput as MatChipInputEvent);

    tick();
    const expected = child;
    const actual = component.selectedChildren[0];
    expect(actual).toEqual(expected);
  }));

  it('should remove the child', fakeAsync(() => {
    const child = '123 TEST';
    component.selectedChildren = ['123 TEST', '456 TEST', '789 TEST'];
    component.childrenOrgs = ['123 TEST', '456 TEST', '789 TEST'];
    component.remove(child);

    tick();
    const expected = ['456 TEST', '789 TEST'];
    const actual = component.selectedChildren;
    expect(actual).toEqual(expected);
  }));

  it('should handle selecting a child from autocomplete', fakeAsync(() => {
    const child = '123 TEST';
    const optionSelected: Partial<MatAutocompleteSelectedEvent> = {
      option: {
        viewValue: child,
      } as MatOption,
    };

    component.childrenOrgs = ['456 TEST', '789 TEST'];
    component.selectedChildren = [];

    mockEditOrgService.generateFilteredOrgs = jest.fn().mockReturnValue(of([]));
    component.selected(optionSelected as MatAutocompleteSelectedEvent);

    tick();
    const expected = child;
    const actual = component.selectedChildren[0];
    expect(actual).toEqual(expected);
  }));

  it('should generate filtered orgs', fakeAsync(() => {
    const childOne = '123 TEST';
    const childTwo = '456 TEST';
    const children = [childOne, childTwo];
    //  const orgs = [...children, child];

    component.childrenOrgs = children;
    component.selectedChildren = [childOne];
    component.generateFilteredOrgs();
    tick();
    const actual = component.filteredOrgs;
    const expected = [childTwo];
    expect(actual).toEqual(expected);
  }));

  it('should should convert children names into objects', fakeAsync(() => {
    const children = ['123 TEST', '456 TEST', '789 TEST'];

    component.selectedChildren = children;
    const actual = component.childrenConnection(children);

    tick();

    const expected: any[] = [];
    for (let i = 0; i < children.length; i++) {
      expected[i] = { name: children[i] };
    }

    expect(actual).toEqual(expected);
  }));

  it('should submit the form', fakeAsync(() => {
    const orgName = '123 TEST';
    const children = ['456 TEST', '789 TEST'];

    const check = {
      data: {
        checkOrg: false,
      },
    };

    const thing = {
      where: { name: orgName },
      data: {
        name: {
          set: orgName,
        },
        children: {
          set: {
            name: children[0],
          },
        },
      },
    };

    component.form.setValue({
      orgInput: '',
      childOrg: '',
      orgToEdit: orgName,
      orgName: orgName,
      confirmName: orgName,
    });
    component.selectedChildren = children;

    mockEditOrgService.checkOrg = jest.fn().mockReturnValue(of(check));
    mockEditOrgService.updateOrg = jest.fn().mockReturnValue(of(thing));
    fixture.detectChanges();
    component.submit();

    tick();

    const expected = true;
    const actual = component.submitSuccess;

    expect(actual).toEqual(expected);
  }));
});
