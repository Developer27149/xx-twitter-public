import { ECustomHTTPErrorCode } from '../../services/common/types';
import { createClient } from '@supabase/supabase-js';
import { validUser } from '../../componsables/serverUtils';

export default defineEventHandler(async event => {
  const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);
  // console.log('event:', event.node.req);

  if (event.node.req.headers['referer']?.includes('http://localhost:9000/') === false) {
    return null;
  }
  const method = event.node.req.method;
  if (method === 'GET') {
    const { data, error } = await supabase.from('block_group').select('*').eq('ban', false).order('like', { ascending: false });
    if (error) {
      console.log('fetch data failed:', error);
      return null;
    }
    return data;
  } else if (method === 'POST') {
    const userInfo = await validUser(event);
    if (userInfo === null) return createError('401 unauthorized');
    // check user has permission to create block group
    // check user create block group count

    // check user had create how many block group total
    const { data: blockGroupData, error: blockGroupError } = await supabase.from('block_group').select('*').eq('user_name', userInfo.user_name);
    if (blockGroupError) {
      console.log('fetch block group data failed:', blockGroupError);
      return null;
    }
    if (blockGroupData.length >= 2) {
      console.log('user had create 2 block group');
      return {
        data: null,
        statusCode: ECustomHTTPErrorCode['no-allow-create'],
        message: '目前仅支持单人最多创建两个订阅组',
      };
    }
    const body = await readBody(event);
    const { data, error } = await supabase.from('block_group').insert(body).select();
    if (error) {
      console.log('insert data failed:', error);
      return null;
    }
    console.log('insert data success:', data);
    return data[0];
  }
});
