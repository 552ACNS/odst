import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export enum BirthState {
  Ak = 'AK',
  Al = 'AL',
  Ar = 'AR',
  Az = 'AZ',
  Ca = 'CA',
  Co = 'CO',
  Ct = 'CT',
  De = 'DE',
  Fl = 'FL',
  Ga = 'GA',
  Hi = 'HI',
  Ia = 'IA',
  Id = 'ID',
  Il = 'IL',
  In = 'IN',
  Ks = 'KS',
  Ky = 'KY',
  La = 'LA',
  Ma = 'MA',
  Md = 'MD',
  Me = 'ME',
  Mi = 'MI',
  Mn = 'MN',
  Mo = 'MO',
  Ms = 'MS',
  Mt = 'MT',
  Nc = 'NC',
  Nd = 'ND',
  Ne = 'NE',
  Nh = 'NH',
  Nj = 'NJ',
  Nm = 'NM',
  Nv = 'NV',
  Ny = 'NY',
  Oh = 'OH',
  Ok = 'OK',
  Or = 'OR',
  Other = 'OTHER',
  Pa = 'PA',
  Ri = 'RI',
  Sc = 'SC',
  Sd = 'SD',
  Tn = 'TN',
  Tx = 'TX',
  Ut = 'UT',
  Va = 'VA',
  Vt = 'VT',
  Wa = 'WA',
  Wi = 'WI',
  Wv = 'WV',
  Wy = 'WY'
}

export enum EyeColor {
  Black = 'BLACK',
  Blue = 'BLUE',
  Brown = 'BROWN',
  Green = 'GREEN',
  Hazel = 'HAZEL'
}

export enum HairColor {
  Bald = 'BALD',
  Black = 'BLACK',
  Blonde = 'BLONDE',
  Brown = 'BROWN',
  Gray = 'GRAY',
  Red = 'RED',
  White = 'WHITE'
}

export type IncidentCreateInput = {
  closeDate: Scalars['DateTime'];
  openDate: Scalars['DateTime'];
  reportedDate: Scalars['DateTime'];
  selfReported: Scalars['Boolean'];
};

export type IncidentGql = {
  __typename?: 'IncidentGQL';
  closeDate: Scalars['DateTime'];
  id?: Maybe<Scalars['String']>;
  openDate: Scalars['DateTime'];
  reportedDate: Scalars['DateTime'];
  selfReported: Scalars['Boolean'];
};

export type IncidentWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type LoginUserInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createIncident: IncidentGql;
  createOrg: OrgGql;
  createPerson: PersonGql;
  createUser: UserGql;
  deletePerson: PersonGql;
  deleteUser: UserGql;
  login: TokensGql;
  refreshTokens: TokensGql;
  refreshTokensVar: TokensGql;
  removeOrg: OrgGql;
  signup: TokensGql;
  updateOrg: OrgGql;
  updatePerson: PersonGql;
  updateUser: UserGql;
};


export type MutationCreateIncidentArgs = {
  incidentCreateInput: IncidentCreateInput;
};


export type MutationCreateOrgArgs = {
  orgCreateInput: OrgCreateInput;
};


export type MutationCreatePersonArgs = {
  personCreateInput: PersonCreateInput;
};


export type MutationCreateUserArgs = {
  userCreateInput: UserCreateInput;
};


export type MutationDeletePersonArgs = {
  personWhereUniqueInput: PersonWhereUniqueInput;
};


export type MutationDeleteUserArgs = {
  userWhereUniqueInput: UserWhereUniqueInput;
};


export type MutationLoginArgs = {
  loginUserInput: LoginUserInput;
};


export type MutationRefreshTokensVarArgs = {
  refreshLoginInput: RefreshLoginInput;
};


export type MutationRemoveOrgArgs = {
  orgWhereUniqueInput: OrgWhereUniqueInput;
};


export type MutationSignupArgs = {
  signupUserInput: SignupUserInput;
};


export type MutationUpdateOrgArgs = {
  OrgUpdateInput: OrgUpdateInput;
  OrgWhereUniqueInput: OrgWhereUniqueInput;
};


export type MutationUpdatePersonArgs = {
  PersonUpdateInput: PersonUpdateInput;
  personWhereUniqueInput: PersonWhereUniqueInput;
};


export type MutationUpdateUserArgs = {
  UserUpdateInput: UserUpdateInput;
  userWhereUniqueInput: UserWhereUniqueInput;
};

export type OrgCreateInput = {
  aliases: Array<Scalars['String']>;
  children?: InputMaybe<OrgCreateNestedManyWithoutParentInput>;
  name: Scalars['String'];
  orgTier: OrgTier;
  parent?: InputMaybe<OrgCreateNestedOneWithoutChildrenInput>;
  persons?: InputMaybe<PersonCreateNestedManyWithoutOrgInput>;
};

export type OrgCreateNestedManyWithoutParentInput = {
  connect?: InputMaybe<OrgWhereUniqueInput>;
  connectOrCreate?: InputMaybe<OrgCreateOrConnectWithoutParentInput>;
};

export type OrgCreateNestedOneWithoutChildrenInput = {
  connect?: InputMaybe<OrgWhereUniqueInput>;
  connectOrCreate?: InputMaybe<OrgCreateOrConnectWithoutChildrenInput>;
};

export type OrgCreateNestedOneWithoutPersonsInput = {
  connect?: InputMaybe<OrgWhereUniqueInput>;
  connectOrCreate?: InputMaybe<OrgCreateOrConnectWithoutPersonsInput>;
  create?: InputMaybe<OrgGqlInput>;
};

export type OrgCreateOrConnectWithoutChildrenInput = {
  create: OrgGqlInput;
  where: OrgWhereUniqueInput;
};

export type OrgCreateOrConnectWithoutParentInput = {
  create: OrgGqlInput;
  where: OrgWhereUniqueInput;
};

export type OrgCreateOrConnectWithoutPersonsInput = {
  create: OrgGqlInput;
  where: OrgWhereUniqueInput;
};

export type OrgGql = {
  __typename?: 'OrgGQL';
  aliases: Array<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  orgTier?: Maybe<OrgTier>;
  parentId?: Maybe<Scalars['String']>;
};

export type OrgGqlInput = {
  aliases: Array<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  orgTier?: InputMaybe<OrgTier>;
  parentId?: InputMaybe<Scalars['String']>;
};

export enum OrgTier {
  Group = 'GROUP',
  Other = 'OTHER',
  Squadron = 'SQUADRON',
  Wing = 'WING'
}

export type OrgUpdateInput = {
  aliases?: InputMaybe<Array<Scalars['String']>>;
  children?: InputMaybe<OrgCreateNestedManyWithoutParentInput>;
  name?: InputMaybe<Scalars['String']>;
  orgTier?: InputMaybe<OrgTier>;
  parent?: InputMaybe<OrgCreateNestedOneWithoutChildrenInput>;
  persons?: InputMaybe<Array<PersonUpdateManyWithoutOrgInput>>;
};

export type OrgUpdateOneRequiredWithoutPersonsInput = {
  connect?: InputMaybe<Array<OrgWhereUniqueInput>>;
};

export type OrgWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type PersonCreateInput = {
  NDA?: InputMaybe<Scalars['Boolean']>;
  birthCity: Scalars['String'];
  birthCountry: Scalars['String'];
  birthDate: Scalars['DateTime'];
  birthState: BirthState;
  citizenshipId: Scalars['String'];
  dodId: Scalars['Float'];
  email: Scalars['String'];
  eyeColor: EyeColor;
  firstName: Scalars['String'];
  grade: Scalars['Float'];
  hairColor: HairColor;
  height: Scalars['Float'];
  initialTraining: Scalars['Boolean'];
  lastName: Scalars['String'];
  middleInitial?: InputMaybe<Scalars['String']>;
  org: OrgCreateNestedOneWithoutPersonsInput;
  role: Role;
  spec: Spec;
  ssn: Scalars['Float'];
};

export type PersonCreateManyOrgInputEnvelope = {
  data: Array<PersonCreateInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type PersonCreateNestedManyWithoutOrgInput = {
  connect?: InputMaybe<PersonWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PersonCreateNestedManyWithoutOrgInput>;
};

export type PersonCreateNestedOneWithoutUserInput = {
  connect?: InputMaybe<PersonWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PersonCreateOrConnectWithoutUserInput>;
  create?: InputMaybe<PersonGqlInput>;
};

export type PersonCreateOrConnectWithoutUserInput = {
  create: PersonGqlInput;
  where: PersonWhereUniqueInput;
};

export type PersonCreateWithoutOrgInput = {
  NDA?: InputMaybe<Scalars['Boolean']>;
  birthCity: Scalars['String'];
  birthCountry: Scalars['String'];
  birthDate: Scalars['DateTime'];
  birthState: BirthState;
  citizenshipId: Scalars['String'];
  dodId: Scalars['Float'];
  email: Scalars['String'];
  eyeColor: EyeColor;
  firstName: Scalars['String'];
  grade: Scalars['Float'];
  hairColor: HairColor;
  height: Scalars['Float'];
  initialTraining: Scalars['Boolean'];
  lastName: Scalars['String'];
  middleInitial?: InputMaybe<Scalars['String']>;
  role: Role;
  spec: Spec;
  ssn: Scalars['Float'];
};

export type PersonGql = {
  __typename?: 'PersonGQL';
  NDA: Scalars['Boolean'];
  birthCity: Scalars['String'];
  birthCountry: Scalars['Boolean'];
  birthDate: Scalars['DateTime'];
  birthState: BirthState;
  citizenshipId: Scalars['String'];
  dodId: Scalars['Float'];
  email: Scalars['String'];
  eyeColor: EyeColor;
  firstName: Scalars['String'];
  grade: Scalars['Float'];
  hairColor: HairColor;
  height: Scalars['Float'];
  id?: Maybe<Scalars['String']>;
  initialTraining: Scalars['Boolean'];
  lastName: Scalars['String'];
  middleInitial?: Maybe<Scalars['String']>;
  orgId: Scalars['String'];
  role: Role;
  spec: Spec;
  ssn: Scalars['Float'];
};

export type PersonGqlInput = {
  NDA: Scalars['Boolean'];
  birthCity: Scalars['String'];
  birthCountry: Scalars['Boolean'];
  birthDate: Scalars['DateTime'];
  birthState: BirthState;
  citizenshipId: Scalars['String'];
  dodId: Scalars['Float'];
  email: Scalars['String'];
  eyeColor: EyeColor;
  firstName: Scalars['String'];
  grade: Scalars['Float'];
  hairColor: HairColor;
  height: Scalars['Float'];
  id?: InputMaybe<Scalars['String']>;
  initialTraining: Scalars['Boolean'];
  lastName: Scalars['String'];
  middleInitial?: InputMaybe<Scalars['String']>;
  orgId: Scalars['String'];
  role: Role;
  spec: Spec;
  ssn: Scalars['Float'];
};

export type PersonUpdateInput = {
  NDA?: InputMaybe<Scalars['Boolean']>;
  birthCity?: InputMaybe<Scalars['String']>;
  birthCountry?: InputMaybe<Scalars['String']>;
  birthDate?: InputMaybe<Scalars['DateTime']>;
  birthState?: InputMaybe<BirthState>;
  citizenshipId?: InputMaybe<Scalars['String']>;
  dodId?: InputMaybe<Scalars['Float']>;
  email?: InputMaybe<Scalars['String']>;
  eyeColor?: InputMaybe<EyeColor>;
  firstName?: InputMaybe<Scalars['String']>;
  grade?: InputMaybe<Scalars['Float']>;
  hairColor?: InputMaybe<HairColor>;
  height?: InputMaybe<Scalars['Float']>;
  initialTraining?: InputMaybe<Scalars['Boolean']>;
  lastName?: InputMaybe<Scalars['String']>;
  middleInitial?: InputMaybe<Scalars['String']>;
  org: Array<OrgUpdateOneRequiredWithoutPersonsInput>;
  role?: InputMaybe<Role>;
  spec?: InputMaybe<Spec>;
  ssn?: InputMaybe<Scalars['Float']>;
};

export type PersonUpdateManyWithoutOrgInput = {
  create: Array<PersonCreateWithoutOrgInput>;
  createMany: PersonCreateManyOrgInputEnvelope;
  update: Array<PersonUpdateWithWhereUniqueWithoutOrgInput>;
};

export type PersonUpdateOneRequiredWithoutUserInput = {
  connect?: InputMaybe<PersonWhereUniqueInput>;
};

export type PersonUpdateWithWhereUniqueWithoutOrgInput = {
  data: PersonUpdateInput;
  where: Scalars['String'];
};

export type PersonWhereUniqueInput = {
  dodId?: InputMaybe<Scalars['Float']>;
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  ssn?: InputMaybe<Scalars['Float']>;
};

export type Query = {
  __typename?: 'Query';
  findManyOrgs: Array<OrgGql>;
  findManyPersons: Array<PersonGql>;
  findManyPersonsInOrg: Array<PersonGql>;
  findManyUsers: Array<UserGql>;
  findUniqueIncident: IncidentGql;
  findUniqueOrg: OrgGql;
  findUniquePerson: PersonGql;
  findUniqueUser: UserGql;
  getSubOrgs: Array<OrgGql>;
};


export type QueryFindManyPersonsInOrgArgs = {
  personWhereUniqueInput: PersonWhereUniqueInput;
};


export type QueryFindUniqueIncidentArgs = {
  incidentWhereUniqueInput: IncidentWhereUniqueInput;
};


export type QueryFindUniqueOrgArgs = {
  orgWhereUniqueInput: OrgWhereUniqueInput;
};


export type QueryFindUniquePersonArgs = {
  personWhereUniqueInput: PersonWhereUniqueInput;
};


export type QueryFindUniqueUserArgs = {
  userWhereUniqueInput: UserWhereUniqueInput;
};


export type QueryGetSubOrgsArgs = {
  orgWhereUniqueInput: OrgWhereUniqueInput;
};

export type RefreshLoginInput = {
  refreshToken: Scalars['String'];
};

export type RefreshTokenCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<RefreshTokenWhereUniqueInput>;
  connectOrCreate?: InputMaybe<RefreshTokenCreateOrConnectWithoutUserInput>;
};

export type RefreshTokenCreateOrConnectWithoutUserInput = {
  create: RefreshTokenGqlInput;
  where: RefreshTokenWhereUniqueInput;
};

export type RefreshTokenGqlInput = {
  expires: Scalars['DateTime'];
  hash: Scalars['String'];
  id: Scalars['String'];
  isRevoked: Scalars['Boolean'];
  issued: Scalars['DateTime'];
  userId: Scalars['String'];
};

export type RefreshTokenWhereUniqueInput = {
  hash?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
};

export enum Role {
  Admin = 'ADMIN',
  Dev = 'DEV',
  None = 'NONE',
  Sm = 'SM'
}

export type SignupUserInput = {
  password: Scalars['String'];
  person: PersonCreateNestedOneWithoutUserInput;
  username: Scalars['String'];
};

export enum Spec {
  Civilian = 'CIVILIAN',
  Contractor = 'CONTRACTOR',
  Enlisted = 'ENLISTED',
  Officer = 'OFFICER',
  Other = 'OTHER',
  Warrant = 'WARRANT'
}

export type TokensGql = {
  __typename?: 'TokensGQL';
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
};

export type UserCreateInput = {
  enabled: Scalars['Boolean'];
  password: Scalars['String'];
  person: PersonCreateNestedOneWithoutUserInput;
  refreshTokens: RefreshTokenCreateNestedManyWithoutUserInput;
  username: Scalars['String'];
};

export type UserGql = {
  __typename?: 'UserGQL';
  enabled: Scalars['Boolean'];
  id?: Maybe<Scalars['String']>;
  personId: Scalars['String'];
  username: Scalars['String'];
};

export type UserGqlInput = {
  enabled: Scalars['Boolean'];
  id?: InputMaybe<Scalars['String']>;
  personId: Scalars['String'];
  username: Scalars['String'];
};

export type UserUpdateInput = {
  enabled: Scalars['Boolean'];
  password: Scalars['String'];
  person: PersonUpdateOneRequiredWithoutUserInput;
  username: Scalars['String'];
};

export type UserWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
  personId?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type FindUniquePersonQueryVariables = Exact<{
  personWhereUniqueInput: PersonWhereUniqueInput;
}>;


export type FindUniquePersonQuery = { __typename?: 'Query', findUniquePerson: { __typename?: 'PersonGQL', id?: string | null, firstName: string, lastName: string, dodId: number, ssn: number } };

export type CreatePersonMutationVariables = Exact<{
  personCreateInput: PersonCreateInput;
}>;


export type CreatePersonMutation = { __typename?: 'Mutation', createPerson: { __typename?: 'PersonGQL', id?: string | null, firstName: string, lastName: string, dodId: number, ssn: number } };

export type CreateOrgMutationVariables = Exact<{
  orgCreateInput: OrgCreateInput;
}>;


export type CreateOrgMutation = { __typename?: 'Mutation', createOrg: { __typename?: 'OrgGQL', id?: string | null, name: string, aliases: Array<string>, orgTier?: OrgTier | null, parentId?: string | null } };

export type FindManyPersonsQueryVariables = Exact<{ [key: string]: never; }>;


export type FindManyPersonsQuery = { __typename?: 'Query', findManyPersons: Array<{ __typename?: 'PersonGQL', id?: string | null, firstName: string, lastName: string, dodId: number, ssn: number }> };

export type FindManyOrgsQueryVariables = Exact<{ [key: string]: never; }>;


export type FindManyOrgsQuery = { __typename?: 'Query', findManyOrgs: Array<{ __typename?: 'OrgGQL', id?: string | null, name: string, aliases: Array<string>, orgTier?: OrgTier | null, parentId?: string | null }> };

export type LoginMutationVariables = Exact<{
  loginUserInput: LoginUserInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'TokensGQL', accessToken: string, refreshToken: string } };

export type OrgFieldsFragment = { __typename?: 'OrgGQL', id?: string | null, name: string, aliases: Array<string>, orgTier?: OrgTier | null, parentId?: string | null };

export type PersonFieldsFragment = { __typename?: 'PersonGQL', id?: string | null, firstName: string, lastName: string, dodId: number, ssn: number };

export type TokenFieldsFragment = { __typename?: 'TokensGQL', accessToken: string, refreshToken: string };

export const OrgFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"orgFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OrgGQL"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"aliases"}},{"kind":"Field","name":{"kind":"Name","value":"orgTier"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}}]}}]} as unknown as DocumentNode<OrgFieldsFragment, unknown>;
export const PersonFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"personFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PersonGQL"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"dodId"}},{"kind":"Field","name":{"kind":"Name","value":"ssn"}}]}}]} as unknown as DocumentNode<PersonFieldsFragment, unknown>;
export const TokenFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"tokenFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TokensGQL"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]} as unknown as DocumentNode<TokenFieldsFragment, unknown>;
export const FindUniquePersonDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findUniquePerson"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"personWhereUniqueInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PersonWhereUniqueInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findUniquePerson"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"personWhereUniqueInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"personWhereUniqueInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"personFields"}}]}}]}},...PersonFieldsFragmentDoc.definitions]} as unknown as DocumentNode<FindUniquePersonQuery, FindUniquePersonQueryVariables>;
export const CreatePersonDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createPerson"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"personCreateInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PersonCreateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPerson"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"personCreateInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"personCreateInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"personFields"}}]}}]}},...PersonFieldsFragmentDoc.definitions]} as unknown as DocumentNode<CreatePersonMutation, CreatePersonMutationVariables>;
export const CreateOrgDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createOrg"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orgCreateInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OrgCreateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createOrg"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orgCreateInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orgCreateInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"orgFields"}}]}}]}},...OrgFieldsFragmentDoc.definitions]} as unknown as DocumentNode<CreateOrgMutation, CreateOrgMutationVariables>;
export const FindManyPersonsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findManyPersons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findManyPersons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"personFields"}}]}}]}},...PersonFieldsFragmentDoc.definitions]} as unknown as DocumentNode<FindManyPersonsQuery, FindManyPersonsQueryVariables>;
export const FindManyOrgsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findManyOrgs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findManyOrgs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"orgFields"}}]}}]}},...OrgFieldsFragmentDoc.definitions]} as unknown as DocumentNode<FindManyOrgsQuery, FindManyOrgsQueryVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"loginUserInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"loginUserInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"loginUserInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"tokenFields"}}]}}]}},...TokenFieldsFragmentDoc.definitions]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;