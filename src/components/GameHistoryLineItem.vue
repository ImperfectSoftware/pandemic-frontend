<template>
  <li v-on:click="updateGameSelection" class="list-group-item mx-auto w-sm">
    <span>{{ id }}</span>
  </li>
</template>

<script>

export default {
  name: 'Invite',
  props: [
    'id'
  ],
  data: function () {
    return {
    }
  },
  methods: {
    updateGameSelection () {
      this.$parent.$emit('changeSelectedGame', { id: this.id })
    }
  }
}
</script>
