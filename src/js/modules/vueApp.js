import data from './data';

const vueApp = () => {
  if (Vue) {
    new Vue({
      el: '#app',
      template: `<div class="vue-app-wrapper">
        <div class="filter-container">
        <div class="search-container">
          <input 
            type="search" 
            name="search-field" 
            id="search"
            v-model="filterData.query">
            <button id="search" @click="searchPosts(filterData.query)">Search</button>
        </div>
          <select name="author-filter" 
            id="filter" 
            v-model="filterData.userId"
            @change="sortPosts(filterData.userId, null)">
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
          searchResults: [],
          filterData: {
            userId: '',
            query: '',
          },
        };
      },
      methods: {
        setQueryParams() {
          window.history.pushState(null, null, `${this.getQueryParams}`);
        },
        sortPosts(category) {
          if (category === null) {
            return;
          }
          this.sortedPosts = [];
          // eslint-disable-next-line array-callback-return
          this.posts.filter((value) => {
            if (value.userId === Number(category)) {
              this.sortedPosts.push(value);
            }
          });
          this.setQueryParams();
        },

        searchPosts(queryParam) {
          if (queryParam === null) {
            return;
          }
          console.log(this.sortedPosts);
          if (!this.sortedPosts.length) {
            // eslint-disable-next-line array-callback-return
            this.posts.filter((value) => {
              if (value.title.includes(queryParam)) {
                this.searchResults.push(value);
              }
            });
            this.sortedPosts = this.searchResults;
          } else {
            // eslint-disable-next-line array-callback-return
            this.sortedPosts.filter((value) => {
              if (value.title.includes(queryParam)) {
                this.searchResults.push(value);
              }
            });
            this.sortedPosts = this.searchResults;
          }

          this.setQueryParams();
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
        getQueryParams() {
          const queryParameters = [];
          let options = '';

          // eslint-disable-next-line no-restricted-syntax
          for (const key in this.filterData) {
            if (Object.prototype.hasOwnProperty.call(this.filterData, key)) {
              if (this.filterData[key] !== null) {
                queryParameters.push(`${key}=${this.filterData[key]}`);
              }
              options = `?${queryParameters.join('&')}`;
            }
          }
          return options;
        },
      },
      created() {
        const params = new URLSearchParams(window.location.search);
        this.filterData.userId = params.get('userId');
        this.filterData.query = params.get('query');
        this.sortPosts(this.filterData.userId);
        this.searchPosts(this.filterData.query);
      },
    });
  }
};

const init = () => {
  vueApp();
};

export default init;
