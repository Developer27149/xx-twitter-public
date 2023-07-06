import { generate501Response, generateApiSuccessResponse } from '~/componsables/request';

import { ESupabaseRPC } from '~/services/common/types';
import { getUserInfoByEvent } from '~/componsables/serverUtils';
import { useSupabase } from '~/componsables/useSupabase';

export default defineEventHandler(async event => {
  const supabase = useSupabase();
  const userInfo = await getUserInfoByEvent(event);
  if (userInfo === null) {
    return generate501Response();
  }

  const body = await readBody(event);
  const rpcName = body.subscriber === true ? ESupabaseRPC.remove_sub_from_block_group : ESupabaseRPC.add_sub_to_block_group;
  const { error } = await supabase.rpc(rpcName, {
    _id: body.id,
    value: userInfo.user_name,
  });

  if (error) {
    return generate501Response();
  } else {
    return generateApiSuccessResponse();
  }
});
