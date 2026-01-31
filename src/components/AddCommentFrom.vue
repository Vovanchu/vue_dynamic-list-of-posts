<script lang="ts">
export default {
  data() {
    return {
      errorName: '',
      errorEmail: '',
      errorBody: '',

      name: '',
      email: '',
      body: '',
    }
  },

  methods: {
    handleSubmit() {
      this.errorName = '';
      this.errorEmail = '';
      this.errorBody = '';

      if (!this.name.trim()) {
        this.errorName = 'Name is required';
      }

      if (!this.email.trim()) {
        this.errorEmail = 'Email is required';
      }

      if (!this.body.trim()) {
        this.errorBody = 'Body is required';
      }

      if (this.errorName || this.errorEmail || this.errorBody) {
        return;
      }

      this.$emit('comment-created', {
        name: this.name,
        email: this.email,
        body: this.body,
      });
    }
  }
}
</script>

<template>
  <form action="submit" @submit.prevent="handleSubmit">
    <div class="field">
      <label class="label" for="author_name">Author Name</label>
      <div class="control has-icons-left has-icons-right custom-input" :class="{ 'is-danger': errorName }">

        <span class="icon is-small is-left">
          <i class="fas fa-user"></i>
        </span>

        <span v-if="errorName" class="icon is-small is-right">
          <i class="fas fa-exclamation-triangle"></i>
        </span>

        <input class="input" type="text" id="author_name" placeholder="Your Name" v-on:input="errorName = ''"
          v-model="name" />
      </div>
      <span class="help is-danger">
        {{ errorName }}
      </span>
    </div>

    <div class="field">
      <label class="label" for="author_email">Author Email</label>
      <div class="control has-icons-left has-icons-right custom-input" :class="{ 'is-danger': errorEmail }">

        <span class="icon is-small is-left">
          <i class="fas fa-envelope"></i>
        </span>

        <span v-if="errorEmail" class="icon is-small is-right">
          <i class="fas fa-exclamation-triangle"></i>
        </span>

        <input class="input" type="text" id="author_email" placeholder="Your Email" v-on:input="errorEmail = ''"
          v-model="email" />
      </div>

      <span class="help is-danger">
        {{ errorEmail }}
      </span>
    </div>

    <div class="field">
      <label class="label" for="commnet_body">Write Post Body</label>
      <div class="control has-icons-left has-icons-right custom-input" :class="{ 'is-danger': errorBody }">
        <textarea class="textarea" type="text" id="commnet_body" placeholder="Comment" v-on:input="errorBody = ''"
          v-model="body"> </textarea>
      </div>

      <span class="help is-danger">
        {{ errorBody }}
      </span>
    </div>

    <div class="button_wrapper">
      <button class="btn btn-primary" type="submit">
        Add comment
      </button>

      <button class="btn btn-secondary" type="button" @click="$emit('close')">
        Cancel
      </button>
    </div>
  </form>
</template>

<style scoped>
.field:not(:last-child) {
  margin-bottom: 1.5rem;
}

/* LABEL */
.label {
  color: #363636;
  display: block;
  font-size: 1rem;
  font-weight: 700;

  margin-bottom: .5em;
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

/* CONTROL */
.control {
  margin-bottom: 0;
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
  display: block;
  margin-top: 0.25rem;
  padding-left: 0.25rem;

  font-size: 0.8rem;
  line-height: 1.2;
  color: #b91c1c;
}

.button_wrapper {
  display: flex;
  justify-content: flex-start;
  gap: 0.75rem;
  margin-top: 1.25rem;
}

/* BASE BUTTON */
.btn {
  padding: 0.65rem 1.5rem;
  font-size: 0.95rem;
  font-weight: 200;
  border-radius: 4px;
  border: 1px solid transparent;
  cursor: pointer;
  transition: background-color .2s, box-shadow .2s, border-color .2s;
}

/* PRIMARY */
.btn-primary {
  background-color: #485fc7;
  color: #fff;
}

.btn-primary:hover {
  background-color: #3e56c4;
}

.btn-primary:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(72, 95, 199, 0.25);
}

/* SECONDARY */
.btn-secondary {
  background-color: #eff1fa;
  color: #485fc7;
}

.btn-secondary:hover {
  background-color: #e6e9f7;

}

.btn-secondary:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(209, 213, 219, 0.6);
}
</style>
