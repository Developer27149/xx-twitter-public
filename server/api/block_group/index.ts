import { generate501Response, generateApiServerErrorResponse, generateApiSuccessResponse } from '~/componsables/request';

import { ECustomHTTPErrorCode } from '~/services/common/types';
import { getUserInfoByEvent } from '~/componsables/serverUtils';
import { useSupabase } from '~/componsables/useSupabase';

export default defineEventHandler(async event => {
  const supabase = useSupabase();

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
    const { data: blockGroupData, error: blockGroupError } = await supabase.from('block_group').select('*').eq('default_author', userInfo.user_name);
    if (blockGroupError) {
      console.log('get block group data failed:', blockGroupError);
      return generate501Response();
    }
    console.log('block group data:', blockGroupData, userInfo.user_name);
    if (blockGroupData.length >= 2) {
      return generateApiServerErrorResponse({
        code: ECustomHTTPErrorCode['no-allow-create'],
        message: '目前仅支持单人最多创建两个订阅组',
      });
    }
    const body = await readBody(event);
    const insertData = {
      ...body,
      default_author: userInfo.user_name,
      author_list: [userInfo.user_name],
      subscriber_list: [userInfo.user_name],
    };
    const { data, error } = await supabase.from('block_group').insert(insertData).select().single();
    if (error) {
      console.log('insert data failed:', error);
      return generate501Response();
    }
    console.log('insert data success:', data);
    return generateApiSuccessResponse(data);
  }
});
