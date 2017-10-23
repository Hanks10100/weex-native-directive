<!-- http://dotwe.org/vue/4e47594a25abbcc84939ae726caed999 -->

<template>
  <recycle-list :list-data="counters" template-key="type" alias="cell" index="i">
    <cell-slot template-type="counter">
      <div class="counter">
        <text class="output">{{cell.count}}</text>
        <text class="button" @click="inc(i, 35)">+</text>
      </div>
    </cell-slot>
  </recycle-list>
</template>

<script>
  export default {
    data () {
      return {
        counters: [
          { type: 'counter', count: 24 },
          { type: 'counter', count: 42 },
          { type: 'counter', count: 66 },
        ]
      }
    },
    methods: {
      inc (index) {
        if (!this.counters[index]) return;
        this.counters[index].count++
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
