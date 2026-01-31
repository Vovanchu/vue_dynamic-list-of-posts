<script lang="ts">
import type { Comment } from '@/types/Comments.type';

export default {
  props: {
    comments: {
      type: Array as () => Comment[],
      required: true
    }
  },

  methods: {
    handleDelete(commentId: number) {
      this.$emit('deleted', commentId);
    }
  }
}
</script>

<template>
  <div v-for="comment in comments" :key="comment.id">
    <article class="comment">
      <div class="message-header">
        <a href="mailto:{{ comment.email }}" class="message-header-name">{{ comment.name }}</a>
        <button type="button" class="delete is-small" aria-label="delete" v-on:click="handleDelete(comment.id)">
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div class="message-body">{{ comment.body }}</div>
    </article>
  </div>
</template>

<style scoped>
.comment {
  margin: 1.5rem 0;
}

.message-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: #4a4a4a;
  color: #fff;
  border-radius: 4px 4px 0 0;

  font-weight: 700;
  line-height: 1.25;
  padding: .75em 1em;
}

.message-header-name {
  color: #fff;
  text-decoration: underline;
  font-size: 12px;
}

.delete.is-small {
  font-size: 16px;
  height: 16px;
  max-height: 16px;
  max-width: 16px;
  min-height: 16px;
  min-width: 16px;
  width: 16px;

  border-radius: 50%;
  border: none;

  background-color: rgb(0, 0, 0, 0.2);
  color: #fff;

  cursor: pointer;
}

.message-body {
  background-color: #dbdbdb;
  border-radius: 0 0 4px 4px;
  color: #4a4a4a;
  padding: .75em 1em;

  font-weight: 400;
  line-height: 1.5;

  font-size: 12px;
}
</style>
