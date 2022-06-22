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

  constructor(private headerService: HeaderService) {}

  async ngOnInit(): Promise<void> {
    (await this.headerService.getCurrentUser()).subscribe(({ me }) => {
      this.user = me;
      this.userTitle = this.setUserTitle(this.user.role);
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
        //TODO [ODST-279] add logic for orgTier, i.e. Squadron Commander?
        return 'Commander';
      case Role.Dei:
        return 'Diversity, Equity and Inclusion';
    }
  }
}
