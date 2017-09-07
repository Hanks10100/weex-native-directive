<list>
  <cell v-for="(item, index) in group" :key="index">
    <text>{{item.name + index}}</text>
  </cell>
</list>