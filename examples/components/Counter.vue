<!-- http://dotwe.org/vue/f3f46f5adcb76bd7a408cd369e00d8b7 -->

<template recyclable="true">
  <div class="counter">
    <text class="output">{{count}}</text>
    <text class="button" @click="inc">+</text>
  </div>
</template>

<script>
  export default {
    props: ['start'],
    data () {
      return {
        count: parseInt(this.start, 10) || 42
      }
    },
    methods: {
      inc () {
        this.count++
      }
    }
  }
</script>

<style scoped>
  .output {
    font-size: 150px;
    text-align: center;
    margin: 50px;
  }
  .button {
    border-width: 2px;
    border-color: #DDD;
    font-size: 100px;
    text-align: center;
    background-color: #F5F5F5;
  }
</style>
