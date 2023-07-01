import { createClient } from '@supabase/supabase-js';

export default defineEventHandler(async event => {
  console.log('event', event);
  const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);
  const { data, error } = await supabase.from('block_group').select('*').order('like', { ascending: false });
  if (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  } else {
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  }
});
