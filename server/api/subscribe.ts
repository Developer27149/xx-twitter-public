// get user's subscribe list
import { createClient } from '@supabase/supabase-js';

export default defineEventHandler(async event => {
  const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);
  // const cookie = await getCookie(event, 'auth');
  // console.log('cookie', cookie);
  // const { data: session, error: sessionError } = await supabase.auth.admin.listUsers();

  // console.log('session', session);
  // console.log('sessionError', sessionError);
  const body = await readBody(event);
  console.log('body', body);
  const { data, error } = await supabase.from('block_group').update({ like: 22 }).eq('id', body.id).select('*');
  if (error) {
    console.log('update error:', error);
    return null;
  } else {
    console.log('update data:', data);
    return data;
  }
});
