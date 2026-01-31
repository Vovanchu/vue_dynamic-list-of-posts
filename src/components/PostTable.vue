<script lang="ts">
import type { Post } from '@/types/Posts.type';

export default {
  name: 'postTable',

  props: {
    posts: {
      type: Array as () => Post[],
      required: true,
    },
    selectedPostId: {
      required: true,
    },
    togglePost: {
      type: Function,
      required: true,
    },
  },

  data() {
    return {
      showpostDetail: false,
    };
  },
};
</script>

<template>
  <div class="table-wrapper">
    <table class="post-table">
      <colgroup class="colgroup">
        <col class="col-id" />
        <col class="col-title" />
        <col class="col-actions" />
      </colgroup>

      <thead>
        <tr>
          <th class="table-head table-head--left">ID</th>
          <th class="table-head table-head--left">Title</th>
          <th class="table-head table-head--right">Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="post in posts" :key="post.id" class="table-row">
          <td class="table-cell table-cell--left">
            {{ post.id }}
          </td>

          <td class="table-cell table-cell--left">
            {{ post.title }}
          </td>

          <td class="table-cell table-cell--right">
            <button class="action-button" :class="{ 'action-button--close': selectedPostId === post.id }"
              @click="togglePost(post.id)">
              {{ selectedPostId === post.id ? 'Close' : 'Open' }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
/* WRAPPER */
.table-wrapper {
  width: 100%;
  overflow-x: auto;
}

/* TABLE */
.post-table {
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

/* COLUMN WIDTHS */

.col-id,
.col-title {
  max-width: 150px;
}

.col-actions {
  width: auto;
}

/* HEAD */
.table-head {
  padding: 16px;
  color: rgb(54, 54, 54);
  font-size: 15px;
  font-weight: 600;
  border-bottom: 3px solid #e2e8f0;

  background-color: #eff1fa;
}

.table-head--left {
  text-align: left;
}

.table-head--right {
  text-align: right;
}

/* ROW */
.table-row {
  border-bottom: 1px solid #e2e8f0;
}

/* CELLS */
.table-cell {
  font-size: 15px;
  color: #2d3748;
  font-weight: 500;

  padding: .25em .5em;
}

.table-cell--left {
  text-align: left;
}

.table-cell--right {
  display: flex;
  justify-content: flex-end;
}

/* BUTTON */
.action-button {
  padding: calc(.5em - 1px) 1em;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  background-color: #e6e9f7;
  color: #3850b7;
  font-size: 16px;
}

.action-button--close {
  background-color: #3e56c4;
  color: #fff;
}

.action-button:hover {
  opacity: 0.9;
}
</style>
