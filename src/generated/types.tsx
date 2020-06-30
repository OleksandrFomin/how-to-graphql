import gql from "graphql-tag";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Query = {
  __typename?: "Query";
  info: Scalars["String"];
  feed: Feed;
};

export type QueryFeedArgs = {
  filter?: Maybe<Scalars["String"]>;
  skip?: Maybe<Scalars["Int"]>;
  first?: Maybe<Scalars["Int"]>;
  orderBy?: Maybe<LinkOrderByInput>;
};

export enum LinkOrderByInput {
  DescriptionAsc = "description_ASC",
  DescriptionDesc = "description_DESC",
  UrlAsc = "url_ASC",
  UrlDesc = "url_DESC",
  CreatedAtAsc = "createdAt_ASC",
  CreatedAtDesc = "createdAt_DESC",
}

export type Feed = {
  __typename?: "Feed";
  links: Array<Link>;
  count: Scalars["Int"];
};

export type FetchLinksData = {
  feed: Feed;
};

export type Link = {
  __typename?: "Link";
  id: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  description: Scalars["String"];
  url: Scalars["String"];
  postedBy?: Maybe<User>;
  votes: Array<Vote>;
};

export type User = {
  __typename?: "User";
  id: Scalars["ID"];
  name: Scalars["String"];
  email: Scalars["String"];
  links: Array<Link>;
};

export type Vote = {
  __typename?: "Vote";
  id: Scalars["ID"];
  link: Link;
  user: User;
};

export type Mutation = {
  __typename?: "Mutation";
  post: Link;
  signup?: Maybe<AuthPayload>;
  login?: Maybe<AuthPayload>;
  vote: Vote;
};

export type MutationPostData = {
  post: Link;
};

export type MutationPostArgs = {
  url: Scalars["String"];
  description: Scalars["String"];
};

export type MutationSignupArgs = {
  email: Scalars["String"];
  password: Scalars["String"];
  name: Scalars["String"];
};

export type MutationLoginArgs = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type MutationVoteArgs = {
  linkId: Scalars["ID"];
};

export type AuthPayload = {
  __typename?: "AuthPayload";
  token?: Maybe<Scalars["String"]>;
  user?: Maybe<User>;
};
export type LoginData = {
  login: AuthPayload;
};

export type Subscription = {
  __typename?: "Subscription";
  newLink?: Maybe<Link>;
  newVote?: Maybe<Vote>;
};

export type IsLoggedIn = {
  isLoggedIn: boolean;
};
