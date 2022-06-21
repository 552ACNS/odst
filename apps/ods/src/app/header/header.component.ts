import { Component, OnInit } from '@angular/core';
import { removeTokens } from '@odst/helpers';
import { HeaderService } from './header.service';
import { Role } from '../../types.graphql';
import { CurrentUserQuery } from './header.generated';

@Component({
  selector: 'odst-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user: CurrentUserQuery['me'];
  userTitle: string;
  totalCount: number;
  dataSource;
  data: any;

  constructor(private headerService: HeaderService) {}

  async ngOnInit(): Promise<void> {
    (await this.headerService.getCurrentUser()).subscribe(({ me }) => {
      this.user = me;
      this.userTitle = this.setUserTitle(this.user.role);
    });
    this.headerService.getRequestedAccounts().subscribe(({ data }) => {
      this.dataSource = this.data.findManyAccountRequests;
      console.log(this.dataSource.length);
      this.totalCount = this.dataSource.length;
    });
  }

  removeTokens() {
    removeTokens();
  }

  setUserTitle(role: Role): string {
    switch (role) {
      case Role.Admin:
        return 'Administrator';
      case Role.Cc:
        //TODO add logic for orgTier, i.e. Squadron Commander?
        return 'Commander';
      case Role.Dei:
        return 'Diversity, Equity and Inclusion';
    }
  }
}
