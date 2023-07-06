import { generateApiServerErrorResponse, generateApiSuccessResponse } from '~/componsables/request';

import { ECustomHTTPErrorCode } from '~/services/common/types';
import { getUserInfoByEvent } from '~/componsables/serverUtils';
import { useSupabase } from '~/componsables/useSupabase';

export default defineEventHandler(async event => {
  const supabase = useSupabase();
  const userInfo = await getUserInfoByEvent(event);
  if (userInfo === null) {
    return generateApiServerErrorResponse({
      code: ECustomHTTPErrorCode.unauthorized,
      message: '用户未登录',
    });
  }

  const { data, error } = await supabase.from('block_group').select('*').eq('user_name', userInfo.user_name);
  if (error) {
    return generateApiServerErrorResponse({
      code: ECustomHTTPErrorCode['server-error'],
      message: error.message,
    });
  }
  return generateApiSuccessResponse(data);
});
