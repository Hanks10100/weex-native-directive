<!-- http://dotwe.org/vue/fb7a11d69722f0cb94e9dfa2664d5882 -->

<template>
  <recycle-list :list-data="listData" template-key="type" alias="item" index="cellIndex">
    <cell-slot template-type="static">
      <text class="text">-- static --</text>
    </cell-slot>
    <cell-slot template-type="dynamic">
      <div class="card">
        <text class="card-title">{{cellIndex}}</text>
        <div class="card-body">
          <text class="card-label">{{item.label}}</text>
        </div>
      </div>
    </cell-slot>
  </recycle-list>
</template>

<script>
  function generateData (sentence) {
    return sentence.split('').map((type, index) => {
      if (type === '_') {
        return { type: 'static' }
      }
      return {
        type: 'dynamic',
        label: type
      }
    })
  }
  export default {
    data () {
      return {
        listData: generateData('_MAY_THE_FORCE_BE_WITH_YOU_')
      }
    }
  }
</script>

<style scoped>
  .text {
    text-align: center;
    font-size: 50px;
    padding: 15px;
    color: #606060;
    background-color: #E8E8E8;
  }
  .card {
    width: 650px;
    border-width: 4px;
    border-style: solid;
    border-color: #E8E8E8;
    border-radius: 20px;
    margin: 50px;
  }
  .card-title {
    text-align: center;
    font-size: 40px;
    color: #888;
    background-color: #F5F5F5;
    padding: 12px;
    border-bottom-width: 2px;
    border-bottom-style: solid;
    border-bottom-color: #E0E0E0;
  }
  .card-body {
    height: 200px;
    justify-content: center;
  }
  .card-label {
    text-align: center;
    font-size: 100px;
    color: #1FB5FC;
  }
</style>
