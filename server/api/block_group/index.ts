import { generate501Response, generateApiServerErrorResponse, generateApiSuccessResponse } from '~/componsables/request';

import { ECustomHTTPErrorCode } from '~/services/common/types';
import { createClient } from '@supabase/supabase-js';
import { getUserInfoByEvent } from '~/componsables/serverUtils';

export default defineEventHandler(async event => {
  const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);

  if (event.node.req.headers['referer']?.includes(process.env.DOMAIN!) === false) {
    return generate501Response();
  }
  const method = event.node.req.method;
  if (method === 'GET') {
    const { data, error } = await supabase.from('block_group').select('*').eq('ban', false);
    if (error) {
      return generate501Response();
    }
    return generateApiSuccessResponse(data);
  } else if (method === 'POST') {
    const userInfo = await getUserInfoByEvent(event);
    if (userInfo === null) return generateApiServerErrorResponse({ code: ECustomHTTPErrorCode['unauthorized'], message: '请先登录' });
    // check user had create how many block group total
    const { data: blockGroupData, error: blockGroupError } = await supabase.from('block_group').select('*').eq('user_name', userInfo.user_metadata.user_name);
    if (blockGroupError) {
      return generate501Response();
    }
    if (blockGroupData.length >= 2) {
      return generateApiServerErrorResponse({
        code: ECustomHTTPErrorCode['no-allow-create'],
        message: '目前仅支持单人最多创建两个订阅组',
      });
    }
    const body = await readBody(event);
    const { data, error } = await supabase.from('block_group').insert(body).select();
    if (error) {
      console.log('insert data failed:', error);
      return generate501Response();
    }
    console.log('insert data success:', data);
    return generateApiSuccessResponse(data[0]);
  }
});
