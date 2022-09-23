import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CreateOrgComponent } from './create-org.component';
import { CreateOrgService } from './create-org.service';
import { of } from 'rxjs';
import { CreateOrgModule } from './create-org.module';
import { RouterTestingModule } from '@angular/router/testing';
import { OrgTier } from '../../types.graphql';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatOption } from '@angular/material/core';

describe('CreateOrgComponent', () => {
  let component: CreateOrgComponent;
  let fixture: ComponentFixture<CreateOrgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateOrgComponent],
      providers: [
        { provide: CreateOrgService, useValue: mockCreateOrgService },
      ],
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
        MatSnackBarModule,
        BrowserModule,
        NoopAnimationsModule,
        CreateOrgModule,
        RouterTestingModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  const mockCreateOrgService = {
    createOrg: jest.fn(),
    getTierByUser: jest.fn(),
    getOrgsByTierAbove: jest.fn(),
    getOrgsByTierBelow: jest.fn(),
    checkValidChild: jest.fn(),
    generateFilteredOrgs: jest.fn(),
    checkOrg: jest.fn(),
  };

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get tiers based off user on startup', fakeAsync(() => {
    const tiers = ['WING', 'GROUP', 'SQUADRON'];
    mockCreateOrgService.getTierByUser = jest.fn().mockReturnValue(of(tiers));
    component.ngOnInit();
    tick();
    const expected = tiers;
    const actual = component.orgTiers;
    expect(actual).toEqual(expected);
  }));

  it('should get orgs a tier above', fakeAsync(() => {
    const orgs = ['123 TEST', '456 TEST', '789 TEST'];
    const list = ['123 TEST', '456 TEST', '789 TEST', 'N/A'];
    mockCreateOrgService.getOrgsByTierAbove = jest
      .fn()
      .mockReturnValue(of(orgs));
    component.getOrgTierAbove(OrgTier.Group);
    tick();
    const expected = list;
    const actual = component.parentOrgs;
    expect(actual).toEqual(expected);
  }));

  it('should get orgs a tier below', fakeAsync(() => {
    const orgs = ['123 TEST', '456 TEST', '789 TEST'];
    mockCreateOrgService.getOrgsByTierBelow = jest
      .fn()
      .mockReturnValue(of(orgs));
    component.getOrgTierBelow(OrgTier.Group);
    tick();
    const expected = orgs;
    const actual = component.childrenOrgs;
    expect(actual).toEqual(expected);
  }));

  //TODO: Determine how to test checkForChildren(), if at all
  // it('should check for children', fakeAsync(() => {
  //   component.checkForChildren();
  // }));

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

    mockCreateOrgService.checkValidChild = jest.fn().mockReturnValue(of(true));
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

    mockCreateOrgService.generateFilteredOrgs = jest
      .fn()
      .mockReturnValue(of([]));
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
    const orgName = '456 TEST';
    const orgParent = '123 TEST';
    const orgChildren = ['789 TEST'];
    const tier = OrgTier.Group;

    const check = {
      data: {
        checkOrg: false,
      },
    };

    const thing = {
      data: {
        name: orgName,
        parent: orgParent,
        children: orgChildren,
        OrgTier: tier,
        id: '999',
      },
    };

    component.form.setValue({
      orgName: orgName,
      confirmName: orgName,
      orgTier: 'GROUP',
      parentOrg: orgParent,
      childOrg: orgChildren,
      orgInput: '',
    });

    mockCreateOrgService.checkOrg = jest.fn().mockReturnValue(of(check));
    mockCreateOrgService.createOrg = jest.fn().mockReturnValue(of(thing));
    fixture.detectChanges();
    component.submit();
    tick();

    const expected = true;
    const actual = component.submitSuccess;

    expect(actual).toEqual(expected);
  }));
});
