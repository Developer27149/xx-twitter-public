import { ECustomHTTPErrorCode, IUserMetadata } from '~/services/common/types';
import { generateApiServerErrorResponse, generateApiSuccessResponse } from '~/componsables/request';

import { createClient } from '@supabase/supabase-js';
import { getUserInfoByEvent } from '~/componsables/serverUtils';

export default defineEventHandler(async event => {
  const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);
  const userInfo: IUserMetadata | null = await getUserInfoByEvent(event);
  if (userInfo === null) {
    return generateApiServerErrorResponse({
      code: ECustomHTTPErrorCode.unauthorized,
      message: '用户未登录',
    });
  }

  const { data, error } = await supabase.from('block_group').select('*').eq('user_name', userInfo.user_metadata.user_name);
  if (error) {
    return generateApiServerErrorResponse({
      code: ECustomHTTPErrorCode['server-error'],
      message: error.message,
    });
  }
  console.log('my subscribe data:', data);
  return generateApiSuccessResponse(data);
});
