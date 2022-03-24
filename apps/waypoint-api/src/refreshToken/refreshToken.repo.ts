import { RefreshTokenCreateInput } from '@odst/types/waypoint';

export const TestRefreshTokenCreateInput: RefreshTokenCreateInput[] = [
  {
    expires: new Date(),
    user: { connect: { username : "username" } },
    hash: "aabbcc"
  }
]
