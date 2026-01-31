<script lang="ts">
import '@fortawesome/fontawesome-free/css/all.min.css'
import { createPost } from '../api/posts';

export default {
  name: 'AddNewPost',

  props: {
    addNewPost: {
      type: Boolean,
      required: true
    }
  },

  data() {
    return {
      titlePost: '',
      bodyPost: '',
      titleError: '',
      bodyError: '',
      errorMessage: '',
    }
  },

  methods: {
    handleSubmit() {
      this.titleError = ''
      this.bodyError = ''
      this.errorMessage = ''

      if (!this.titlePost.trim()) {
        this.titleError = 'Title is required'
      }

      if (!this.bodyPost.trim()) {
        this.bodyError = 'Body is required'
      }

      if (this.titleError || this.bodyError) {
        return
      }

      const userId = localStorage.getItem('userId')
      if (!userId) return

      createPost(userId, this.titlePost, this.bodyPost)
        .then((response) => {
          this.titlePost = ''
          this.bodyPost = ''
          this.$emit('close')
          this.$emit('post-created', response.data.id)
        })
        .catch((error) => {
          this.errorMessage = error.message
        })
    },
    handleCancel() {
      this.titleError = '';
      this.bodyError = '';
      this.titlePost = '';
      this.bodyPost = '';
      this.$emit('close')
    }
  }
}
</script>

<template>
  <div class="add-new-post">
    <h1 class="add-new-post__title">Create new post</h1>

    <form action="submit">
      <div class="add-new-post__form">
        <div class="field">
          <label class="label">Title</label>
          <div class="control has-icons-left has-icons-right custom-input" :class="{ 'is-danger': titleError }">

            <span class="icon is-small is-left">
              <i class="fas fa-user"></i>
            </span>

            <!-- права іконка -->
            <span v-if="titleError" class="icon is-small is-right">
              <i class="fas fa-exclamation-triangle"></i>
            </span>

            <input class="input" type="text" placeholder="Post Title" v-model="titlePost" @input="titleError = ''" />
          </div>

          <span v-if="titleError" class="help is-danger">{{ titleError }}</span>

        </div>

        <div class="field">
          <label class="label">Write Post Body</label>
          <div class="control has-icons-left has-icons-right custom-input" :class="{ 'is-danger': bodyError }">

            <!-- права іконка -->
            <span v-if="bodyError" class="icon is-small is-right">
              <i class="fas fa-exclamation-triangle"></i>
            </span>

            <textarea class="textarea" placeholder="Post Body" v-model="bodyPost" @input="bodyError = ''"></textarea>
          </div>

          <span v-if="bodyError" class="help is-danger">{{ bodyError }}</span>
        </div>
      </div>

      <button @click.prevent="handleSubmit()">Create</button>
      <button @click.prevent="handleCancel()">Cancel</button>
    </form>
  </div>
</template>

<style scoped>
.add-new-post {
  width: 100%;
  display: flex;
  flex-direction: column;
}

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
button {
  padding: 0.7rem 1.6rem;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;
}

button:first-of-type {
  background-color: #485fc7;
  color: #fff;
  margin-right: 0.5rem;
}

button:first-of-type:hover {
  background-color: #3e56c4;
}

button:last-of-type {
  background-color: #e5e7eb;
  color: #363636;
}

button:last-of-type:hover {
  background-color: #d1d5db;
}

button:active {
  transform: scale(0.97);
}
</style>
