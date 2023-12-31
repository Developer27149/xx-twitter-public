import { generate501Response, generateApiServerErrorResponse, generateApiSuccessResponse } from '~/componsables/request';

import { ECustomHTTPErrorCode } from '~/services/common/types';
import { useSupabase } from '~/componsables/useSupabase';

export default defineEventHandler(async event => {
  const supabase = useSupabase();
  const method = event.node.req.method;
  const { user_name } = event.context.params ?? {};
  if (method === 'GET' || !user_name) {
    const { data, error } = await supabase.from('block_group').select('*').eq('default_author', user_name).order('created_at', { ascending: false });
    if (error) {
      console.log('get my block group failed:', error);
      return generate501Response();
    }
    return generateApiSuccessResponse(data);
  } else {
    return generateApiServerErrorResponse({ code: ECustomHTTPErrorCode['server-error'], message: 'not support method' });
  }
});
