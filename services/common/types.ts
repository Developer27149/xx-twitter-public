export interface IBlockItem {}
export interface IBlockGroup {
  id: number;
  created_at: string;
  user_name: string;
  title: string;
  intro: string;
  like: number;
  dislike: number;
  background?: any;
  subscribers: string | null;
  ban: boolean;
  name: string;
  author_avatar: string;
  like_user: string | null;
}

export interface IApp_metadata {
  provider: string;
  providers: string[];
}

export interface IUser_metadata {
  avatar_url: string;
  email: string;
  email_verified: boolean;
  full_name: string;
  iss: string;
  name: string;
  picture: string;
  preferred_username: string;
  provider_id: string;
  sub: string;
  user_name: string;
}

export interface IAmr {
  method: string;
  timestamp: number;
}

export interface IUserMetadata {
  aud: string;
  exp: number;
  sub: string;
  email: string;
  phone: string;
  app_metadata: IApp_metadata;
  user_metadata: IUser_metadata;
  role: string;
  aal: string;
  amr: IAmr[];
  session_id: string;
}

export enum ECustomHTTPErrorCode {
  'no-allow-create' = 1001,
}
