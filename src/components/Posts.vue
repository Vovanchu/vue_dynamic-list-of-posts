<script lang="ts">
import type { Post } from '../types/Posts.type';
import * as PostApi from '../api/posts'
import PostTable from './PostTable.vue'
import PostDetail from './PostDetail.vue'
import AddNewPost from './AddNewPost.vue'
import EditPost from './EditPost.vue';

export default {
  name: 'PostsComponent',

  components: {
    PostTable,
    PostDetail,
    AddNewPost,
    EditPost,
  },

  props: {
    userId: {
      required: true,
    },
  },

  data() {
    return {
      posts: [] as Post[],
      errorMessage: '',
      selectedPostId: null as number | null,
      addNewPost: false,
      isEditing: false,
    }
  },

  mounted() {
    this.fetchPosts()
  },

  computed: {
    selectedPost(): Post | null {
      return (
        this.posts.find(
          Post => Post.id === this.selectedPostId
        ) ?? null
      )
    },

    isSidebarOpen(): boolean {
      return this.selectedPost !== null || this.addNewPost;
    }
  },

  methods: {
    togglePost(id: number) {
      this.addNewPost = false;
      this.selectedPostId =
        this.selectedPostId === id ? null : id
    },

    async fetchPosts() {
      const userId = localStorage.getItem('userId')
      if (!userId) return

      try {
        this.posts = await PostApi.getAllPostsByUserId(+userId)
      } catch {
        this.errorMessage = 'Failed to load posts'
      }
    },

    handleDeletePost(id: number) {
      this.selectedPostId = null;
      PostApi.deletePost(id)
        .then(() => {
          this.fetchPosts()
        })
        .catch((error) => {
          this.errorMessage = error.message
        })
    },

    handleAddNewPost() {
      this.selectedPostId = null;
      this.addNewPost = true;
    },

    handlePostCreated(postId: number) {
      this.addNewPost = false
      this.fetchPosts()

      this.selectedPostId = postId
    }

  },
}
</script>

<template>
  <div class="posts-layout" :class="{ 'Sidebar--open': isSidebarOpen }">
    <section class="posts-list">
      <header class="posts-list__header">
        <h1 class="posts-list__title">Posts</h1>
        <button class="button button--primary" :class='{ "posts-list__action": addNewPost }' @click="handleAddNewPost">
          Add New Post
        </button>
      </header>

      <p v-if="posts.length === 0" class="posts-list__empty">
        No posts yet.
      </p>

      <PostTable v-else :posts="posts" :selectedPostId="selectedPostId" :togglePost="togglePost" />
    </section>

    <transition name="slide-fade" mode="out-in">
      <div v-if="isEditing" key="edit" class="sidebar">
        <EditPost :selectedPost="selectedPost" @close="isEditing = false" @post-updated="fetchPosts" />
      </div>

      <div v-else-if="selectedPost" key="detail" class="sidebar">
        <PostDetail :selectedPost="selectedPost" @deleted="handleDeletePost" @close="selectedPostId = null"
          @edit="isEditing = true" />
      </div>

      <div v-else-if="addNewPost" key="add" class="sidebar">
        <AddNewPost :addNewPost="addNewPost" @close="addNewPost = false" @post-created="handlePostCreated" />
      </div>
    </transition>

  </div>
</template>

<style scoped>
.posts-layout {
  display: grid;
  align-items: stretch;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  gap: 24px;
  padding: 3rem;
  transition: grid-template-columns 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.Sidebar--open {
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
}

/* LEFT COLUMN */
.posts-list {
  flex: 1;
  display: flex;
  flex-direction: column;

  padding: 20px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1),
    0 0 0 1px rgba(10, 10, 10, 0.05);
}

.posts-list__header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 1.5rem;
}

.posts-list__title {
  font-size: 2rem;
  font-weight: 600;
  color: #363636;
}

.posts-list__empty {
  text-align: center;
  color: #94a3b8;
}

/* RIGHT COLUMN */
.sidebar {
  align-self: stretch;
  height: auto;
  display: flex;
  flex-direction: column;

  padding: 20px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1),
    0 0 0 1px rgba(10, 10, 10, 0.05);
}


/* BUTTONS */
.button {
  cursor: pointer;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 6px;
  border: none;
}

.button--primary {
  background-color: #485fc7;
  color: #fff;
}

.button--primary:hover {
  background-color: #3e56c4;
}

.posts-list__action {
  background-color: #eee;
  color: #3850b7;
}


.posts-list__action:hover {
  background-color: #e6e9f7;
}

/* TRANSITIONS */
.slide-fade-enter-active {
  animation: slideIn 1s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-fade-leave-active {
  animation: slideOut 1s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes slideIn {
  0% {
    transform: translateX(100%);
    opacity: 0;
  }

  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideOut {
  0% {
    transform: translateX(0);
    opacity: 1;
  }

  100% {
    transform: translateX(100%);
    opacity: 0;
  }
}
</style>
