import data from './data';

const vueApp = () => {
  Vue.component('ValidationProvider', VeeValidate.ValidationProvider);
  Vue.component('ValidationObserver', VeeValidate.ValidationObserver);

  VeeValidate.extend('search-input', {
    validate: (value) => {
      console.log(value)
      const regex = new RegExp('^[A-Za-z0-9?!,."\'\\s]');
      return regex.test(value);
    },
    message: 'Only letters, numbers and (! ? , . - ‘ “)',
  });

  if (Vue) {
    new Vue({
      el: '#app',
      template: `<div class="vue-app-wrapper">
        <div class="filter-container">
          <ValidationObserver v-slot="{ invalid }">
            <form @submit.prevent="onSubmit" class="filter-form">
              <div class="input-wrapper">
              <validationProvider name="search" rules="search-input" v-slot="{ errors }">
                <input 
                  type="search" 
                  name="search"
                  id="search"
                  v-model="filterData.query">
                <span>{{ errors[0] }}</span>
              </validationProvider>
              </div>
              <div class="input-wrapper">
               <select 
                name="author-filter" 
                id="filter" 
                v-model="filterData.userId">
                  <option v-for="author in authors">{{author}}</option>
              </select>
              </div>
              <button class="submit" :disabled="invalid" type="submit">Submit</button>
            </form>
         </ValidationObserver>
        </div>
        <div class="posts-container">
            <div v-if="filteredPosts[0] === 0">
              <h1>Nothing to find here</h1>
            </div>
            <div class="card" else v-for="post in filteredPosts" v-bind:key="post.id" v-if="post.status === status">
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
          window.history.pushState(null, null, `?${this.getQueryParams}`);
        },
        onSubmit() {
          this.sortedPosts = [];
          // eslint-disable-next-line array-callback-return
          this.posts.filter((value) => {
            if (this.filterData.userId !== null && this.filterData.query === null) {
              if (value.userId === Number(this.filterData.userId)) {
                this.sortedPosts.push(value);
              }
            } else if (this.filterData.userId === null && this.filterData.query !== null) {
              if (value.title.includes(this.filterData.query)) {
                this.sortedPosts.push(value);
              }
            } else if (this.filterData.userId !== null && this.filterData.query !== null) {
              if (value.userId === Number(this.filterData.userId)
                && value.title.includes(this.filterData.query)) {
                this.sortedPosts.push(value);
              }
            }
          });
          // if (!this.sortedPosts.length) {
          //   this.sortedPosts = [0];
          // }
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
              if (this.filterData[key] !== null && this.filterData[key] !== '') {
                queryParameters.push(`${key}=${this.filterData[key]}`);
              }
              options = `${queryParameters.join('&')}`;
            }
          }
          return options;
        },
      },
      created() {
        const params = new URLSearchParams(window.location.search);
        this.filterData.userId = params.get('userId');
        this.filterData.query = params.get('query');
        this.onSubmit();
      },
    });
  }
};

const init = () => {
  vueApp();
};

export default init;
