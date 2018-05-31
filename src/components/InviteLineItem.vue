<template>
  <div class="card w-sm mx-auto">
    <div class="card-body">
      <span class='pull-left username'>{{ username }}</span>
      <span class='pull-right' :class="statusType">{{ status }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InviteLineItem',
  computed: {
    statusType: function () {
      return {
        ready: this.status === 'Ready',
        pending: this.status === 'Pending'
      }
    }
  },
  props: {
    username: { default: '' },
    status: { default: 'Pending' }
  },
  data: function () {
    return {
    }
  }
}
</script>
