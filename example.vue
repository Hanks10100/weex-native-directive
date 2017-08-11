<template>
  <recycle-list :list-data="cellList" template-key="type">
    <cell-slot template-type="A" class="cell" :key="index">
      <text :data-label="label">Current Label: {{label}}</text>
      <text v-if="number > 20">Large</text>
      <text v-else-if="number > 10">Medium</text>
      <text v-else>Small</text>
    </cell-slot>
    <cell-slot template-type="B" class="cell" :key="index">
      <div v-for="(item, i) in dataset">
        <text>{{banner}}</text>
        <text>{{i}}: {{item.name}}</text>
      </div>
    </cell-slot>
    <cell-slot template-type="C" class="cell" :key="index">
      <div @click="increase(index)">
        <text class="block">Number: {{count}}</text>
        <child class="block" :count="count"></child>
      </div>
    </cell-slot>
  </recycle-list>
</template>

<script>
  function generateData (seq) {
    return seq.split('').map((type, index) => {
      const props = {}

      if (type === 'A') {
        props.label = 'A'.repeat(Math.floor(Math.random() * 3 + 3))
        props.number = Math.floor(Math.random() * 30)
      }
      if (type === 'B') {
        props.dataset = []
        let n = Math.floor(Math.random() * 4 + 2)
        while (n--) {
          props.dataset.push({
            name: Math.random().toString(36).substr(2, 6).toUpperCase()
          })
        }
      }
      if (type === 'C') {
        props.count = Math.floor(Math.random() * 15)
      }

      return Object.assign({ type, index }, props)
    })
  }
  export default {
    components: {
      child: {
        props: ['count'],
        data () { return { ratio: 2 } },
        created () { this.ratio++ },
        beforeUpdate () { this.ratio++ },
        render (h) {
          return h('text', {}, `${this.count} x ${this.ratio} = ${this.count * this.ratio}`)
        }
      }
    },
    data () {
      return {
        banner: '-----',
        cellList: generateData('ACBCCABAACB'),
      }
    },
    methods: {
      increase (index) {
        const cell = this.longList[index]
        if (cell) {
          cell.count++
        }
      }
    }
  }
</script>

<style scoped>
  .cell {
    width: 650px;
    margin-left: 50px;
    margin-top: 50px;
    border-width: 2px;
    border-style: solid;
    border-color: #DDD;
  }
  .block {
    width: 400px;
    font-size: 50px;
    margin-top: 50px;
    margin-left: 50px;
    border-width: 2px;
    border-style: solid;
    border-color: #CCC;
    background-color: #F4F4F4;
  }
</style>
