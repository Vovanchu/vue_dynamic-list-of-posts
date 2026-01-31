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
  <nav class="navbar post-navbar">
    <div class="navbar-brand">
      <h1 class="title post-title">Vue List Of Posts</h1>
    </div>

    <div class="navbar-end post-navbar-end">
      <h2 class="subtitle post-subtitle">User: {{ userName }}</h2>
      <button class="button is-light post-button" @click="goToMain">Logout</button>
    </div>
  </nav>
</template>

<style scoped>
/* --- Navbar container --- */
.post-navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0.5rem 1rem;
}

/* --- Title --- */
.post-title {
  color: #363636;
  font-size: 2rem;
  font-weight: 600;
  line-height: 1.125;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

/* --- Navbar end --- */
.post-navbar-end {
  display: flex;
  align-items: center;
  gap: 20px;
}

/* --- Subtitle --- */
.post-subtitle {
  color: #4a4a4a;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.25;
  text-decoration: none;
}

/* --- Button --- */
.post-button {
  background-color: #eeeeee;
  border: none;
  cursor: pointer;
  justify-content: center;
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 1rem;
  transition: background-color 0.2s;
}

.post-button:hover {
  background-color: #e6e6e6;
}
</style>
