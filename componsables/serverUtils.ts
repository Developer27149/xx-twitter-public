import * as jose from 'jose';

import { H3Event } from 'h3';
import { IUser_metadata } from '~/services/common/types';

export const getUserInfoByEvent = async (event: H3Event): Promise<IUser_metadata | null> => {
  const token = await getCookie(event, 'sb-access-token');
  if (!token) {
    event.node.res.statusCode = 401;
    return null;
  }
  const record = jose.decodeJwt(token);
  const { exp } = record;
  if (exp && exp > Date.now() / 1000) {
    return record.user_metadata as IUser_metadata;
  }
  return null;
};
