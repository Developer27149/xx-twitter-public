import { generate501Response, generateApiServerErrorResponse, generateApiSuccessResponse } from '~/componsables/request';

import { ECustomHTTPErrorCode } from '~/services/common/types';
import { getUserInfoByEvent } from '~/componsables/serverUtils';
import { useSupabase } from '~/componsables/useSupabase';

export default defineEventHandler(async event => {
  const { method } = event.node.req;
  if (method !== 'GET') return generateApiServerErrorResponse({ code: ECustomHTTPErrorCode['server-error'], message: 'not support method' });
  const userInfo = await getUserInfoByEvent(event);
  if (userInfo === null) return generateApiServerErrorResponse({ code: ECustomHTTPErrorCode['unauthorized'], message: '请先登录' });
  const { user_name } = event.context.params ?? {};
  if (!user_name) return generate501Response();
  const supabase = useSupabase();
  const { data, error } = await supabase.from('profiles').select('full_name').ilike('full_name', `%${user_name}%`);
  if (error) return generate501Response();
  return generateApiSuccessResponse(data);
});
