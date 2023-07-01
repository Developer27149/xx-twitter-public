<script setup>
definePageMeta({
  layout: false
})

const user = useSupabaseUser()
const supabase = useSupabaseAuthClient();

const login = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'twitter',
  });

  if (error) {
    console.error(error);
  }
};


// watchEffect(() => {
//   if (user) {
//     navigateTo('/')
//   }
// })

</script>

<template>
  <div class="flex flex-col justify-center items-center">
    <div class="fixed top-4 right-4 max-w-max flex items-center gap-4">

      <button @click="login">Login</button>
    </div>
    <div>WHO AM I?</div>
    <br>
    <br>
    <div class="whitespace-pre">{{ user?.user_metadata }}</div>
  </div>
</template>