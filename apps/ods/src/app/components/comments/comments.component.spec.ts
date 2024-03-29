import { ComponentFixture, TestBed } from '@angular/core/testing';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Role } from 'apps/ods/src/types.graphql';
import { GetReportByStatusQuery } from '../../responses/responses.generated';

import { CommentsComponent } from './comments.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { formatDate } from '@angular/common';

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
      value: 'test comment 2',
      date: '2021-05-05T00:00:00.000Z',
      author: {
        id: '2',
        firstName: 'Second',
        lastName: 'Last',
        role: Role.Admin,
      },
    },
    {
      value: 'test comment 3',
      date: '2021-05-06T00:00:00.000Z',
      author: {
        id: '3',
        firstName: 'Third',
        lastName: 'Last',
        role: Role.Cc,
      },
    },
    {
      value: 'test comment 4',
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

  it('should display comments', () => {
    component.comments = comments;
    fixture.detectChanges();

    // comment elements have the class of `items-start`
    const commentElements = fixture.debugElement.queryAll(
      By.css('.items-start')
    );

    // check that the comments are displayed
    expect(commentElements.length).toEqual(comments.length);
  });

  describe('ensures the date is properly displaying', () => {
    it('should display the date of the first comment', () => {
      component.comments = comments;
      fixture.detectChanges();

      // The date objects have a margin of mx-4
      const dateElements = fixture.debugElement.queryAll(By.css('.mx-4'));

      const expected = formatDate(comments[0].date, 'longDate', 'en-US');
      const actual = dateElements[0].nativeElement.textContent;

      expect(expected).toEqual(actual);
    });
    it('should display the date when the day changes', () => {
      component.comments = comments;
      fixture.detectChanges();

      // The date objects have a margin of mx-4
      const dateElements = fixture.debugElement.queryAll(By.css('.mx-4'));

      const expected = formatDate(comments[2].date, 'longDate', 'en-us');
      const actual = dateElements[1].nativeElement.textContent;

      expect(actual).toEqual(expected);
    });
  });

  describe('ensure that author comments are on the right', () => {
    it('should display the user comment on the right', () => {
      component.comments = comments;
      component.userId = comments[0].author.id;
      fixture.detectChanges();

      // All comments have the CSS of 'items-start'. The users comments have an additional
      // class of 'items-end' which takes precedence over 'items-start'
      const userComment = fixture.debugElement.query(By.css('.items-end'));

      const expected = comments[0].value;
      const actual = userComment.nativeElement.textContent;
      expect(actual).toContain(expected);
    });
  });

  describe('ensure that the authors information is properly displayed', () => {
    it('should display the author name above the first new comment after the users', () => {
      component.comments = comments;
      component.userId = comments[0].author.id;
      fixture.detectChanges();

      // The author name is displayed in a p with css of `text-xs`
      const authorNames = fixture.debugElement.queryAll(By.css('p.text-xs'));

      const expected = comments[1].author.firstName;
      const actual = authorNames[0].nativeElement.textContent;
      expect(actual).toContain(expected);
    });
    it('shouldnt display the author name above a comment when the same user left the previous comment', () => {
      component.comments = comments;
      component.userId = comments[0].author.id;
      fixture.detectChanges();

      const authorNames = fixture.debugElement.queryAll(By.css('div.flex-col'));

      const expected = comments[2].author.firstName;
      const actual = authorNames[3].nativeElement.textContent;
      expect(actual).not.toContain(expected);
    });

    it('should display the author name above a comment when a different user left the previous comment', () => {
      component.comments = comments;
      component.userId = comments[0].author.id;
      fixture.detectChanges();

      const authorNames = fixture.debugElement.queryAll(By.css('div.flex-col'));

      const expected = comments[2].author.firstName;
      const actual = authorNames[2].nativeElement.textContent;
      expect(actual).toContain(expected);
    });
  });

  describe('ensure that the time is properly displayed below the comment', () => {
    it('should display the time below when theres only 1 comment', () => {
      const oneComment: GetReportByStatusQuery['getIssuesByStatus'][0]['comments'] =
        [
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
        ];

      component.comments = oneComment;
      fixture.detectChanges();

      const time = fixture.debugElement.query(By.css('div.flex-col'));

      const expected = formatDate(oneComment[0].date, 'HH:mm', 'en-us');
      const actual = time.nativeElement.textContent;

      expect(actual).toContain(expected);
    });

    it('should display the time only below the last comment when the same user made the previous', () => {
      component.comments = comments;
      fixture.detectChanges();

      const times = fixture.debugElement.queryAll(By.css('div.flex-col'));

      const expected = formatDate(comments[0].date, 'HH:mm', 'en-us');
      const actual = times[2].nativeElement.textContent;
      const actual2 = times[3].nativeElement.textContent;

      expect(actual).not.toContain(expected);
      expect(actual2).toContain(expected);
    });
    it('should display the time below the comments when a different user made the previous', () => {
      component.comments = comments;
      fixture.detectChanges();

      const times = fixture.debugElement.queryAll(By.css('div.flex-col'));

      const expected = formatDate(comments[0].date, 'HH:mm', 'en-us');
      const actual = times[0].nativeElement.textContent;
      const actual2 = times[1].nativeElement.textContent;

      expect(actual).toContain(expected);
      expect(actual2).toContain(expected);
    });

    it('should display the time below both comments when commenting on a new day', () => {
      component.comments = comments.slice(0, 3);
      fixture.detectChanges();

      const times = fixture.debugElement.queryAll(By.css('div.flex-col'));

      const expected = formatDate(comments[0].date, 'HH:mm', 'en-us');
      const actual = times[1].nativeElement.textContent;
      const actual2 = times[2].nativeElement.textContent;

      expect(actual).toContain(expected);
      expect(actual2).toContain(expected);
    });
  });

  describe('ensure the submit button functions properly', () => {
    it('should call the submit function when the button is clicked', () => {
      const spy = jest.spyOn(component, 'submitComment');
      component.comments = comments;
      component.newComment.setValue('test comment');
      fixture.detectChanges();

      const submitButton = fixture.debugElement.query(By.css('button'));
      submitButton.nativeElement.click();
      fixture.detectChanges();

      expect(spy).toHaveBeenCalled();
    });
  });
});
