import { ECustomHTTPErrorCode } from '~/services/common/types';
import { generateApiServerErrorResponse } from '~/componsables/request';
import { getUserInfoByEvent } from '~/componsables/serverUtils';
import { useSupabase } from '~/componsables/useSupabase';

export default defineEventHandler(async event => {
  const userInfo = await getUserInfoByEvent(event);
  if (userInfo === null) return generateApiServerErrorResponse({ code: ECustomHTTPErrorCode['unauthorized'], message: '请先登录' });
  const { method } = event.node.req;
  if (method !== 'POST') return generateApiServerErrorResponse({ code: ECustomHTTPErrorCode['server-error'], message: 'not support method' });
  const supabase = useSupabase();
  const body = await readBody(event);
  // type check
  if (typeof body.id !== 'number' || typeof body.ban !== 'boolean') return generateApiServerErrorResponse({ code: ECustomHTTPErrorCode['no-allow-create'], message: 'bad request' });

  const { data, error } = await supabase.from('block_group').update({ ban: body.ban }).eq('id', body.id).eq('default_author', userInfo.user_name).single();
  if (error) {
    console.log('update data failed:', error);
    return generateApiServerErrorResponse({ code: ECustomHTTPErrorCode['server-error'], message: 'update data failed' });
  }
  console.log('update data success:', data);
  return generateApiServerErrorResponse({ code: ECustomHTTPErrorCode['success'], message: 'update data success' });
});
