export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('clickOutside', {
    mounted(el, { value }) {
      const onMissclick = (e: Event) => {
        if (e.target !== el && !el.contains(e.target)) value();
      };
      document.body.addEventListener('click', onMissclick)
    },
  });
})