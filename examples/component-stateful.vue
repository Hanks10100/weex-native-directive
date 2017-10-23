<!-- http://dotwe.org/vue/4e47594a25abbcc84939ae726caed999 -->

<template>
  <recycle-list :list-data="counters" template-key="type" alias="cell">
    <cell-slot template-type="counter">
      <counter :start="cell.count"></counter>
    </cell-slot>
  </recycle-list>
</template>

<script>
  import Counter from './components/Counter.vue'
  export default {
    components: { Counter },
    data () {
      return {
        counters: [
          { type: 'counter', count: 24 },
          { type: 'counter', count: 42 },
          { type: 'counter', count: 66 },
        ]
      }
    }
  }
</script>
