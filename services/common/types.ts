export interface IBlockItem {}
export interface IBlockGroup {
  id: number;
  created_at: string;
  title: string;
  intro: string;
  background?: string;
  ban: boolean;
  subscriber_list: string[] | null;
  trust_list: string[];
  default_author: string;
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
  'success' = 0,
  'unauthorized' = 401,
  'server-error' = 500,
  'no-allow-create' = 1001,
}

export interface ICustomResponse<T> {
  code: ECustomHTTPErrorCode;
  message: string;
  data: T;
}

export enum EBlockGroupAction {
  'preview' = 'preview',
  'share' = 'share',
  'delete' = 'delete',
  'ban' = 'ban',
  'subscribe' = 'subscribe',
}

export type TBlockGroupAction = keyof typeof EBlockGroupAction;

export enum ESupabaseRPC {
  'add_sub_to_block_group' = 'add_sub_to_block_group',
  'remove_sub_from_block_group' = 'remove_sub_from_block_group',
}
