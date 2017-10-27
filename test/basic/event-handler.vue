<div v-on:click="onclick(index)">
  <text @disappear="hide(25, 'text')"></text>
  <text @appear="onappear(index, 'static', type, $event)">Button</text>
</div>
