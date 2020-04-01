import data from './data';

const vueApp = () => {
  if (Vue) {
    // eslint-disable-next-line no-use-before-define
    new Vue({
      el: '#app',
      template: `<div class="vue-app-wrapper">
        <div class="filter-container">
          <select name="author-filter" 
            id="filter" 
            v-model="selectedValue"
            @change="sortPosts(selectedValue)">
              <option selected value="">All posts</option>
              <option v-for="author in authors">{{author}}</option>
          </select>
        </div>
        <div class="posts-container">
            <div class="card" v-for="post in filteredPosts" v-bind:key="post.id" v-if="post.status === status">
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
          sortedPosts: [],
          selectedValue: '',
        };
      },
      methods: {
        sortPosts(category) {
          this.sortedPosts = [];
          // eslint-disable-next-line array-callback-return
          this.posts.filter((value) => {
            if (value.userId === Number(category)) {
              this.sortedPosts.push(value);
            }
          });
        },
      },
      computed: {
        authors() {
          const authors = [];
          // eslint-disable-next-line array-callback-return
          this.posts.map((value) => {
            if (!authors.includes(value.userId)) {
              authors.push(value.userId);
            }
          });
          return authors;
        },

        filteredPosts() {
          return this.sortedPosts.length
            ? this.sortedPosts
            : this.posts;
        },
      },
    });
  }
};

const init = () => {
  vueApp();
};

export default init;
