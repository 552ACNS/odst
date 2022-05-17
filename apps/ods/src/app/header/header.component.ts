import { Component, OnInit } from '@angular/core';
import { removeTokens } from '@odst/helpers';
import { HeaderService } from './header.service';
import { AuthenticatedUserFragment } from './header.generated';
import { Role } from '../../types.graphql';

@Component({
  selector: 'odst-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user: AuthenticatedUserFragment;
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
        //TODO add logic for orgTier, i.e. Squadron Commander?
        return 'Commander';
      case Role.Dei:
        return 'Diversity, Equity and Inclusion';
      case Role.Eo:
        return 'Equal Opportunity';
    }
  }
}
