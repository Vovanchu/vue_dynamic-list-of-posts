<script lang="ts">
import type { Post } from '@/types/Posts.type';
import { updatePost } from '@/api/posts';

export default {
  props: {
    selectedPost: {
      type: Object as () => Post | null,
      required: true,
    },
  },

  data() {
    return {
      postId: this.selectedPost?.id || 0,
      newTitle: this.selectedPost?.title || '',
      newBody: this.selectedPost?.body || '',
      titleError: '',
      bodyError: '',
      errorMessage: '',
    }
  },

  methods: {
    handleSubmit() {
      this.titleError = ''
      this.bodyError = ''

      if (!this.newTitle?.trim()) {
        this.titleError = 'Title is required'
      }

      if (!this.newBody?.trim()) {
        this.bodyError = 'Body is required'
      }

      if (this.titleError || this.bodyError) {
        return
      }

      const userId = localStorage.getItem('userId')
      if (!userId) return

      updatePost(this.postId, +userId, this.newTitle, this.newBody)
        .then((response) => {
          this.newTitle = ''
          this.newBody = ''
          this.$emit('close')
          this.$emit('post-updated', response.data.id)
        })
        .catch((error) => {
          this.errorMessage = error.message
        })
    },
    handleCancel() {
      this.titleError = '';
      this.bodyError = '';
      this.newTitle = '';
      this.newBody = '';
      this.$emit('close')
    }
  },
}
</script>

<template>
  <h1 class="add-new-post__title title is-4">Post editing</h1>
  <form @submit.prevent="handleSubmit()">
    <div class="add-new-post__form">

      <!-- TITLE -->
      <div class="field">
        <label class="label">Title</label>
        <div class="control has-icons-left has-icons-right custom-input" :class="{ 'is-danger': titleError }">
          <span class="icon is-small is-left">
            <i class="fas fa-user"></i>
          </span>

          <span v-if="titleError" class="icon is-small is-right">
            <i class="fas fa-exclamation-triangle"></i>
          </span>

          <input class="input" type="text" placeholder="Post Title" v-model="newTitle" @input="titleError = ''" />
        </div>
        <span v-if="titleError" class="help is-danger">{{ titleError }}</span>
      </div>

      <!-- BODY -->
      <div class="field">
        <label class="label">Write Post Body</label>
        <div class="control has-icons-left has-icons-right custom-input" :class="{ 'is-danger': bodyError }">
          <span v-if="bodyError" class="icon is-small is-right">
            <i class="fas fa-exclamation-triangle"></i>
          </span>

          <textarea class="textarea" placeholder="Post Body" v-model="newBody" @input="bodyError = ''"></textarea>
        </div>
        <span v-if="bodyError" class="help is-danger">{{ bodyError }}</span>
      </div>

    </div>

    <!-- BUTTONS -->
    <div class="field-group is-grouped mt-4">
      <div class="control">
        <button type="submit" class="button is-primary post-save-button">
          Save
        </button>
      </div>
      <div class="control">
        <button type="button" class="button is-light post-cancel-button" @click="handleCancel()">
          Cancel
        </button>
      </div>
    </div>

  </form>
</template>

<style scoped>
/* TITLE */
.add-new-post__title {
  color: #363636;
  font-weight: 600;
  font-size: 1.75rem;
  margin-bottom: 1.5rem;
}

/* FORM */
.add-new-post__form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

/* LABEL */
.label {
  font-size: 0.95rem;
  font-weight: 600;
  color: #363636;
  margin: 0.5rem;
}

/* INPUT WRAPPER */
.custom-input {
  position: relative;
  width: 100%;
}

/* INPUT + TEXTAREA */
.custom-input .input {
  width: 100%;
  padding: 0.75rem 2.75rem;
  font-size: 0.95rem;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.custom-input .textarea {
  min-height: 120px;
  resize: vertical;

  width: 100%;
  padding: calc(.75em - 1px);
  font-size: 0.95rem;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  transition: border-color 0.2s, box-shadow 0.2s;
}

/* FOCUS */
/* фокус інпута */
.custom-input .input:focus,
.custom-input .textarea:focus {
  outline: none;
  border-color: #485fc7;
  box-shadow: 0 0 0 2px rgba(72, 95, 199, 0.15);
}

/* іконка ТІЛЬКИ коли інпут у фокусі */
.custom-input:focus-within .icon.is-left {
  color: #363636;
}

/* ICONS */
.custom-input .icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}

.custom-input .icon.is-left {
  left: 0.85rem;
  color: #94a3b8;
}

.custom-input .icon.is-right {
  right: 0.85rem;
  color: #ef4444;
}

/* ERROR STATE */
.control.is-danger .input,
.control.is-danger .textarea {
  border-color: #ef4444;
}

.control.is-danger .input:focus,
.control.is-danger .textarea:focus {
  box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2);
}

/* ERROR TEXT */
.help.is-danger {
  font-size: 0.8rem;
  margin-top: 0.25rem;
  color: #ef4444;
}

/* BUTTONS */
.field-group {
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  gap: 0.75rem;
}

button {
  padding: 0.7rem 1.6rem;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;
}

.button.is-primary {
  background-color: #485fc7;
  border-color: transparent;
  color: #fff;
}

.button.is-primary:hover {
  background-color: #3e56c4;
}

.button.is-light {
  background-color: #eff1fa;
  color: #3850b7;
}

.button.is-light:hover {
  background-color: #e6e9f7;
}

button:active {
  transform: scale(0.97);
}
</style>
