<script lang="ts">
export default {
  name: 'HeaderComponent',

  props: {
    userName: {
      required: true,
    },
  },

  methods: {
    goToMain() {
      localStorage.removeItem('userId');

      this.$router.replace('/');
    }
  }
}
</script>

<template>
  <header class="navbar">
    <div class="navbar-item">
      <h1 class="title is-size-4">Vue List Of Posts</h1>
    </div>

    <div class="navbar-end">
      <h2 class="subtitle">User: {{ userName }}</h2>
      <button class="button is-light" @click="goToMain">Logout</button>
    </div>
  </header>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.is-size-4 {
  font-size: 1.5rem !important;
}

.title {
  color: #363636;
  font-size: 2rem;
  font-weight: 600;
  line-height: 1.125;

  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.navbar-end {
  margin-left: auto;
  display: flex;
  align-items: center;

  padding: 8px 12px;

  gap: 20px;
}

.subtitle {
  color: #4a4a4a;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.25;

  text-decoration: none;
}

.button.is-light {
  background-color: #eeeeee;
  border: none;

  cursor: pointer;
  justify-content: center;

  padding: 10px 20px;
  border-radius: 4px;

  font-size: 1rem;
}

.button:hover {
  background-color: #e6e6e6;
}
</style>
