import { generate501Response, generateApiServerErrorResponse, generateApiSuccessResponse } from '~/componsables/request';

import { ECustomHTTPErrorCode } from '~/services/common/types';
import { getUserInfoByEvent } from '~/componsables/serverUtils';
import { useSupabase } from '~/componsables/useSupabase';

export default defineEventHandler(async event => {
  const userInfo = await getUserInfoByEvent(event);
  if (!userInfo) return generateApiServerErrorResponse({ code: ECustomHTTPErrorCode['unauthorized'], message: '请先登录' });

  const { method } = event.node.req;
  if (method !== 'GET') return generateApiServerErrorResponse({ code: ECustomHTTPErrorCode['server-error'], message: 'not support method' });
  const supabase = useSupabase();
  const { user_name } = event.context.params ?? {};
  if (!user_name) return generate501Response();
  const { data, error } = await supabase.from('block').select('group_id').or(`user_name.eq.${user_name},name.eq.${user_name}`);
  console.log('query data', data, error);
  if (error) {
    return generate501Response();
  }
  // get target group
  const { data: groupData, error: groupError } = await supabase
    .from('block_group')
    .select('*')
    .in(
      'id',
      data.map(i => i.group_id),
    )
    .eq('ban', false);
  if (groupError) {
    return generate501Response();
  }
  return generateApiSuccessResponse(groupData);
});
