<script lang="ts">
import type { Post } from '@/types/Posts.type';
import * as CommentApi from '../api/comments';
import type { Comment } from '@/types/Comments.type';
import CommentsTable from './CommentsTable.vue';
import AddCommentFrom from './AddCommentFrom.vue';

export default {
  name: 'PostDetail',

  components: {
    CommentsTable,
    AddCommentFrom,
  },

  props: {
    selectedPost: {
      type: Object as () => Post,
      required: true,
    },
  },

  data() {
    return {
      comments: [] as Comment[],
      errorMessage: '',
      isAddingComment: false,
    }
  },

  mounted() {
    this.fetchPosts()
  },

  methods: {
    handleDelete() {
      this.$emit('deleted', this.selectedPost.id);
    },

    handleCommentCreated(payload: { name: string; email: string; body: string }) {
      const { name, email, body } = payload;

      CommentApi.createComment(this.selectedPost.id, name, email, body)
        .then(() => {
          this.fetchPosts();
          this.isAddingComment = false;
        })
        .catch((error) => {
          this.errorMessage = error.message;
        });
    },

    handleDeleteComment(commentId: number) {
      if (!commentId) {
        return;
      }

      CommentApi.deleteComment(commentId)
        .then(() => {
          this.fetchPosts()
        })
        .catch((error) => {
          this.errorMessage = error.message
        })
    },

    async fetchPosts() {
      try {
        this.comments = await CommentApi.getAllCommentsByPostId(+this.selectedPost.id)
      } catch {
        this.errorMessage = 'Failed to load posts'
      }
    },
  }
}
</script>

<template>
  <div class="post-detail">
    <div class="post-detail-main-info">
      <div class="post-detail-header">
        <h2 class="post-detail-title">#{{ selectedPost.id }}: {{ selectedPost.title }}</h2>

        <div class="button-wrapper">
          <button @click="$emit('edit')" class="btn edit-btn">
            <i class="fas fa-edit"></i>
          </button>

          <button @click="handleDelete" class="btn delete-btn">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>

      <div class="post-detail-content">
        <p>{{ selectedPost.body }}</p>
      </div>
    </div>

    <div class="comments-wrapper">
      <!-- 1. Немає коментарів і НЕ додаємо -->
      <p v-if="comments.length === 0 && !isAddingComment" class="comments-wrapper-title">
        No comments yet
      </p>

      <!-- 2. Додаємо коментар -->
      <AddCommentFrom v-else-if="isAddingComment" @close="isAddingComment = false"
        @comment-created="handleCommentCreated" />


      <!-- 3. Є коментарі → таблиця -->
      <CommentsTable v-else :comments="comments" @deleted="handleDeleteComment" />
    </div>

    <button v-if="isAddingComment === false" class="button button--primary"
      v-on:click="isAddingComment = !isAddingComment">
      Write Comment
    </button>
  </div>
</template>


<style>
.post-detail {
  margin: 0;
  padding: 0;
}

.post-detail-main-info {
  margin-bottom: 1.5rem;
}

.post-detail-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.post-detail-title {
  font-size: 1.75em;
  margin-bottom: .5714em;

  color: #363636;
  font-weight: 600;
  line-height: 1.125;
}

.button-wrapper {
  display: flex;
  gap: 0.75rem;
}

.btn {
  background-color: #fff;
  border: none;
  cursor: pointer;

  font-size: 16px;
}

.btn.delete-btn {
  color: #f14668;
}

.comments-wrapper {
  margin-bottom: 1.5rem;
}

.comments-wrapper-title {
  color: rgb(54, 54, 54);
  font-size: 2rem;
  font-weight: 600;
  line-height: 1.125;
}

/* ADD COMMENT BUTTON */
.button--primary {
  background-color: #485fc7;
  border-color: transparent;
  color: #fff;
  border-radius: 4px;

  cursor: pointer;
  text-align: center;
  white-space: nowrap;
  font-size: 1rem;

  padding: calc(.5em - 1px) 1em;
}

.button--primary:hover {
  background-color: #3e56c4;
}
</style>
