// This is an examples of simple export.
//
// You can remove or add your own function in this file.

const vueApp = () => {
  if (Vue) {
    new Vue({
      el: '#app',
      template: '<div class="vue-app-wrapper" >{{ initMessage }}</div>',
      data() {
        return {
          initMessage: 'VueJS Sucessfully Started',
        };
      },
    });
  }
};

const init = () => {
  vueApp();
};

export default init;
