// get user's subscribe list
import { createClient } from '@supabase/supabase-js';

export default defineEventHandler(async event => {
  const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);
  try {
    const body = await readBody(event);
    const { isLike, id, user_name } = body;
    const { error, data } = await supabase.from('block_group').select('*').eq('id', id).single();
    if (error) {
      console.log('fetch newest block group failed.error', error);
      throw createError('500 server error');
    }
    console.log('body', body);
    const likeUserList = (data.like_user ? data.like_user.split(',') : []) as string[];
    const newData = {
      ...data,
      like: isLike ? data.like + 1 : data.like - 1,
      dislike: isLike ? data.dislike - 1 : data.dislike + 1,
      like_user: isLike ? likeUserList.concat(user_name).join(',') : likeUserList.filter(item => item !== user_name).join(','),
    };
    if (newData.like < 0) newData.like = 0;
    if (newData.dislike < 0) newData.dislike = 0;

    const { data: updateData, error: updateError } = await supabase.from('block_group').update(newData).eq('id', body.id).select('*');
    if (updateError) {
      console.log('update error:', updateError);
      throw createError('500 server error');
    } else {
      console.log('update data:', updateData);
      return updateData;
    }
  } catch (error) {
    console.log('try to update like status failed:', error);
    throw createError('500 server error');
  }
});
