<template>
  <div style="justify-content:center">
    <text class="text">{{content}}</text>
  </div>
</template>

<style scoped>
  .text {
    font-size: 80px;
    text-align: center;
  }
</style>

<script>
  export default {
    props: {
      content: {
        type: String,
        default: '- nothing -'
      }
    }
  }
</script>
