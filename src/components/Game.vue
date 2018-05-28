<template>
  <div>
    <h2 class="form-signin-heading">Games</h2>
    <div class="alert alert-danger" v-if="error">{{ error }}</div>
  </div>
</template>

<script>
export default {
  name: 'Game',
  data: function () {
    return {
      error: false
    }
  }
}
</script>
