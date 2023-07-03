import * as jose from 'jose';

import { H3Event } from 'h3';
import { IUserMetadata } from '~/services/common/types';

export const validUser = async (event: H3Event): Promise<IUserMetadata | null> => {
  const token = await getCookie(event, 'sb-access-token');
  if (!token) {
    event.node.res.statusCode = 401;
    return null;
  }
  const record = jose.decodeJwt(token);
  const { exp } = record;
  if (exp && exp > Date.now() / 1000) {
    return record.user_metadata as IUserMetadata;
  }
  return null;
};
