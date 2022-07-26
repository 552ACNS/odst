import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ResponsesService } from './responses.service';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AddCommentMutationVariables,
  GetReportByStatusQuery,
  UpdateResolvedMutationVariables,
} from './responses.generated';
import { getUserId } from '@odst/helpers';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { reloadPage } from '@odst/helpers';
@Component({
  selector: 'odst-responses',
  templateUrl: './responses.component.html',
  styleUrls: ['./responses.component.scss'],
})
export class ResponsesComponent implements OnInit {
  //#region Variables
  resolutionForm = this.fb.group({
    comment: [''],
  });

  actionTags: string[];

  selectedActionTags: string[] | undefined = [];

  trackingTags: string[];

  selectedTrackingTags: string[] | undefined = [];

  allTags: string[] = [];

  questionsAnswers: [string, string][] = [];
  // comments: [string, string, string, any?][] = [];
  comments: GetReportByStatusQuery['getIssuesByStatus'][0]['comments'] = [];

  AddCommentMutationVariables: AddCommentMutationVariables;

  // TODO [ODST-291]: Change resolved status back to bool
  status: string;

  // This is for the toggle button
  actualResolution: boolean;

  openedDate: Date;

  userId: string;

  numberOfResponses: number;

  displayedIndex: number;

  pageEvent: PageEvent;

  take = 1;

  response: GetReportByStatusQuery['getIssuesByStatus'][0];
  //#endregion

  constructor(
    private fb: UntypedFormBuilder,
    private responsesService: ResponsesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  //#region Main functions
  async ngOnInit(): Promise<void> {
    this.getFeedback(0);

    this.userId = getUserId();
  }

  //uses this method in lieu of displaydata method(which was deleted)
  handlePageEvent(pageEvent: PageEvent): PageEvent {
    if (pageEvent) {
      this.displayedIndex = pageEvent.pageIndex;

      this.getFeedback(this.displayedIndex);
    }
    return pageEvent;
  }

  async getFeedback(index: number): Promise<void> {
    this.responsesService.getTags().subscribe(({ data }) => {
      this.actionTags = data.getTags
        .filter((tag) => tag.type == 'Action')
        .map((tag) => tag.value)
        .sort();
      this.trackingTags = data.getTags
        .filter((tag) => tag.type == 'Resolution')
        .map((tag) => tag.value)
        .sort();
      this.allTags = data.getTags.map((tag) => tag.value).sort();
    });

    // Get resolved value form route params
    this.route.queryParams.subscribe(async (params) => {
      this.status = params['resolved'];
    });
    //method takes the status of the response, the index its querying for, and the number of responses to take
    (
      await this.responsesService.getReportByStatus(
        this.status,
        index,
        this.take
      )
    )
      // eslint-disable-next-line complexity
      .subscribe(({ data }) => {
        //it then uses the data to determin the current status and gets and displays the other appropriate data
        if (this.numberOfResponses !== 0) {
          this.pageEvent = { pageIndex: 0, pageSize: 1, length: 1 };
        }

        //took the get data method and put it in our new method, this one
        this.numberOfResponses = data.ResponseCount[this.status];
        this.pageEvent.length = data.ResponseCount[this.status];

        //getIssuesByStatus invokes findMany, which returns an array.
        //This turns single element array into just the datatype.
        //Use this instead of data.getIssuesByStatus
        this.response = data.getIssuesByStatus[0];

        this.openedDate = this.response.openedDate;

        // Clear contents of QA array
        this.questionsAnswers = [];
        this.comments = [];

        // Handle the Questions & Answers
        this.response.answers?.forEach((answer) => {
          // Clear contents of QA array
          // Create the Question/Answer Array
          this.questionsAnswers.push([
            String(answer?.question?.value),
            answer.value,
          ]);
        });

        this.comments = this.response.comments;

        this.actualResolution = this.response['resolved'];

        //TODO don't hardcode tag types
        this.selectedActionTags = this.response['tags']
          ?.filter((tag) => tag.type == 'Action')
          .map((tag) => tag.value);

        this.selectedTrackingTags = this.response['tags']
          ?.filter((tag) => tag.type == 'Resolution')
          .map((tag) => tag.value);
      });
  }

  /**
   * Creates a list of tags that can be added by filtering out those already in use
   */
  async submitComment(): Promise<void> {
    // if the resolution field is not empty after a trim
    if (this.resolutionForm.value.comment.trim() !== '') {
      this.AddCommentMutationVariables = {
        where: {
          id: this.response.id,
        },
        data: {
          comments: {
            create: [
              {
                value: this.resolutionForm.value.comment.trim(),
                author: {
                  connect: {
                    id: this.userId,
                  },
                },
              },
            ],
          },
        },
      };

      this.responsesService
        .addComment(this.AddCommentMutationVariables)
        .subscribe(({ data, errors }) => {
          if (!errors && data) {
            // Refresh comments afterwards
            this.comments = data.updateFeedbackResponse['comments'];
            this.actualResolution = data.updateFeedbackResponse['resolved'];
            this.resolutionForm.reset();
            //TODO: unable to get page to refresh using other methods.  Need to redo this on another sprint.
            reloadPage();
          }
        });
    }
  }

  updateResolved() {
    let reviewedBy: UpdateResolvedMutationVariables['data']['reviewedBy'];
    //When false, the actual resolution is set to resolved.

    if (!this.actualResolution) {
      reviewedBy = {
        connect: {
          id: this.userId,
        },
      };
    } else {
      reviewedBy = {
        disconnect: true,
      };
    }

    const updateResolvedMutationVariables: UpdateResolvedMutationVariables = {
      where: {
        id: this.response.id,
      },
      data: {
        resolved: {
          set: !this.actualResolution,
        },
        closedDate: {
          set: !this.actualResolution ? Date.now() : null,
        },
        reviewedBy: reviewedBy,
      },
    };
    this.responsesService
      .updateResolved(updateResolvedMutationVariables)
      .subscribe(({ data, errors }) => {
        if (!errors && data) {
          this.actualResolution = data.updateFeedbackResponse['resolved'];
          this.reload();
        }
      });
  }
  //#endregion

  //#region Tags
  /**
   * Removes tag deselected by the user and adds it back to the list of tags not in use
   * @param tagToRemove tag that's been deselected by the user
   */

  // there's some duplication in this code
  async remove(tagToRemove: string): Promise<void> {
    this.responsesService
      .modifyTag({
        where: { id: this.response.id },
        data: { tags: { disconnect: [{ value: tagToRemove }] } },
      })
      .subscribe(({ data, errors }) => {
        if (!errors && data) {
          //Placeholder
        }
      });
  }

  /**
   * User selects a tag from the list of unused and the list of unused tags is updated
   * @param event: MatChipInputEvent is the output of a material chip input box
   * @param event: MatAutocompleteSelectedEvent is the output of a material autocomplete selection
   * @returns list of tags to push to server
   */
  async add(
    event: MatChipInputEvent | MatAutocompleteSelectedEvent
  ): Promise<void> {
    let input =
      (event as MatChipInputEvent).value ??
      (event as MatAutocompleteSelectedEvent).option.value;

    input = input.trim();

    // Convert to title case
    input = input[0].toUpperCase() + input.slice(1).toLowerCase();
    // If the hand typed value is one of the legal tags
    if (this.allTags.includes(input)) {
      this.responsesService
        .modifyTag({
          where: { id: this.response.id },
          data: { tags: { connect: [{ value: input }] } },
        })
        .subscribe(() => {
          //Placeholder
        });
    }
  }
  //#endregion

  //TODO: This will need to be made into a function at the application level.
  async reload(): Promise<void> {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['./'], { relativeTo: this.route });
  }
}
