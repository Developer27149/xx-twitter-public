import { generate501Response, generateApiServerErrorResponse, generateApiSuccessResponse } from '~/componsables/request';

import { ECustomHTTPErrorCode } from '~/services/common/types';
import { useSupabase } from '~/componsables/useSupabase';

export default defineEventHandler(async event => {
  const supabase = useSupabase();
  const { user_name } = event.context.params ?? {};
  if (!user_name) return generate501Response();
  if (event.node.req.method === 'GET') {
    const { data, error } = await supabase.from('block_group').select('*').contains('subscriber_list', [user_name]).eq('ban', false).order('created_at', { ascending: false });
    if (error) {
      console.log('get my block group failed:', error);
      return generate501Response();
    }
    return generateApiSuccessResponse(data);
  } else {
    // now allow method
    return generateApiServerErrorResponse({ code: ECustomHTTPErrorCode['no-allow-create'], message: 'not support method' });
  }
});
