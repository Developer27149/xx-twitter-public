export default defineNuxtRouteMiddleware((to, _from) => {
  const user = useSupabaseUser();
  if (to.path !== '/login' && user.value === null) {
    return navigateTo('/login');
  }
  // if (to.path === '/login' && user.value !== null) {
  //   return navigateTo('/');
  // }
});
