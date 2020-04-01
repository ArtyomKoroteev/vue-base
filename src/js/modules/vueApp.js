import data from './data';

const vueApp = () => {
  if (Vue) {
    new Vue({
      el: '#app',
      template: `<div class="vue-app-wrapper">
        <div class="posts-container" >
            <div class="card" v-for="post in posts" v-bind:key="post.id" v-if="post.status === status">
              <div class="img-wrap" >
                <img v-if="post.imgUrl !== null" :src="post.imgUrl" alt="test">
                <img v-else src="images/Image-Placeholder-600x600.png" alt="test">
              </div>
              <strong class="title">{{post.title}}</strong>
            </div>
        </div>
      </div>`,
      data() {
        return {
          posts: data,
          status: 'published',
        };
      },
    });
  }
};

const init = () => {
  vueApp();
};

export default init;
