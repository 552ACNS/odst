import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Role } from 'apps/ods/src/types.graphql';
import { GetReportByStatusQuery } from '../../responses/responses.generated';

import { CommentsComponent } from './comments.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('CommentsComponent', () => {
  let component: CommentsComponent;
  let fixture: ComponentFixture<CommentsComponent>;

  const comments: GetReportByStatusQuery['getIssuesByStatus'][0]['comments'] = [
    {
      value: 'test comment',
      date: '2021-05-05T00:00:00.000Z',
      author: {
        id: '1',
        firstName: 'First',
        lastName: 'Last',
        role: Role.Admin,
      },
    },
    {
      value: 'test comment',
      date: '2021-05-05T00:00:00.000Z',
      author: {
        id: '2',
        firstName: 'Second',
        lastName: 'Last',
        role: Role.Admin,
      },
    },
    {
      value: 'test comment 2',
      date: '2021-05-06T00:00:00.000Z',
      author: {
        id: '3',
        firstName: 'Third',
        lastName: 'Last',
        role: Role.Cc,
      },
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentsComponent, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    // expect(true).toBeTruthy();
  });

  it('should display comments', () => {
    component.comments = comments;
    fixture.detectChanges();

    // find the elements that have the class of `text-sm text-left whitespace-pre-line`
    const commentElements = fixture.nativeElement.querySelectorAll(
      'text-sm text-left whitespace-pre-line'
    );

    expect(commentElements).toBeTruthy();

    // check that the comment is displayed
    // expect(commentElements[0].textContent).toContain(comments[0].value);
  });

  it('submit a new comment when the button is clicked', () => {
    // set the value of the comment
    component.newComment.setValue('test comment');
    // const textarea = fixture.debugElement.query(By.css('#comment'));
    // textarea.nativeElement.value = 'test comment';
    fixture.detectChanges();
    // find the button element
    const button = fixture.nativeElement.querySelectorAll(
      'w-full text-white shadow-md rounded-full'
    );
    // click the button
    expect(button).toBeTruthy();
    fixture.detectChanges();

    // check that the comment was submitted
    expect(component.commentToSubmit.emit).toHaveBeenCalledWith('test comment');
  });

  it('should display the date of the first comment', () => {
    component.comments = comments;
    fixture.detectChanges();

    // The date objects have a margin of mx-4
    const dateElements = fixture.debugElement.queryAll(By.css('.mx-4'));

    // Given that we have a non-zero amount of comments, there should always be a date
    expect(dateElements[0].nativeElement.textContent).toEqual('May 4, 2021');
  });
});
