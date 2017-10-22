<div>
  <image v-if="sourceA" :src="sourceA">
  <image v-else-if="sourceB" :src="sourceB">
  <image v-else :src="placeholder">
</div>
