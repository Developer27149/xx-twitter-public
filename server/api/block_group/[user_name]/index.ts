import { generateApiServerErrorResponse, generateApiSuccessResponse } from '~/componsables/request';

import { ECustomHTTPErrorCode } from '~/services/common/types';
import { createClient } from '@supabase/supabase-js';

export default defineEventHandler(async event => {
  const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);
  const method = event.node.req.method;
  const { user_name } = event.context.params ?? {};
  if (method === 'GET' || !user_name) {
    console.log('user_name:', user_name);
    const { data, error } = await supabase.from('block_group').select('*').contains('auth_user', [user_name]).order('created_at', { ascending: false });
    console.log('data-:', data);
    console.log('error-:', error);
    return generateApiSuccessResponse(data);
  } else {
    return generateApiServerErrorResponse({ code: ECustomHTTPErrorCode['server-error'], message: 'not support method' });
  }
});
