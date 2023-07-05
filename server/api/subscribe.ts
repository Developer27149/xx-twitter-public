import { generate501Response, generateApiSuccessResponse } from '~/componsables/request';

import { ESupabaseRPC } from '~/services/common/types';
// get user's subscribe list
import { createClient } from '@supabase/supabase-js';
import { getUserInfoByEvent } from '~/componsables/serverUtils';

export default defineEventHandler(async event => {
  const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);
  const userInfo = await getUserInfoByEvent(event);
  console.log('user info:', userInfo);
  if (userInfo === null) {
    return generate501Response();
  }

  const body = await readBody(event);
  console.log('body:', body);
  const rpcName = body.subscriber === true ? ESupabaseRPC.remove_sub_from_block_group : ESupabaseRPC.add_sub_to_block_group;
  console.log('rpcName', rpcName);
  const { error, data } = await supabase.rpc(rpcName, {
    _id: body.id,
    value: userInfo.user_name,
  });

  console.log('rpc data:', data, error);

  if (error) {
    return generate501Response();
  } else {
    return generateApiSuccessResponse();
  }
});
