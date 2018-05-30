<template>
  <div class="card invite-card mx-auto">
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

<style>
.username {
  display: inline-block;
  width: 160px;
  text-align: center;
  background-color: pink;
}
.ready {
  background-color: green;
}
.pending {
  background-color: red;
}
.ready .pending {
  display: inline-block;
  width: 80px;
  text-align: center;
}
.invite-card {
  width: 300px;
}
</style>
