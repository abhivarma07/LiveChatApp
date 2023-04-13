/* eslint-disable */
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
};

export type Mutation = {
  __typename?: 'Mutation';
  register?: Maybe<Register>;
  update?: Maybe<Response>;
};


export type MutationRegisterArgs = {
  date_of_birth?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  first_name: Scalars['String'];
  gender?: InputMaybe<Scalars['String']>;
  last_name: Scalars['String'];
  phone_number: Scalars['String'];
  profile_picture?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateArgs = {
  date_of_birth: Scalars['String'];
  first_name: Scalars['String'];
  gender: Scalars['String'];
  last_name: Scalars['String'];
  phone_number: Scalars['String'];
  profile_picture: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  user?: Maybe<User>;
};

export type Register = {
  __typename?: 'Register';
  access_token?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

export type Response = {
  __typename?: 'Response';
  message?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  _id?: Maybe<Scalars['String']>;
  date_of_birth?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  first_name?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['String']>;
  last_name?: Maybe<Scalars['String']>;
  phone_number?: Maybe<Scalars['String']>;
  profile_picture?: Maybe<Scalars['String']>;
};
