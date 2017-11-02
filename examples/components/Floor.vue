<!-- http://dotwe.org/vue/629eedbd923c6e391ab8e928766b0ef2 -->

<template recyclable="true">
  <div class="floor">
    <text class="title">{{title}}</text>
    <text class="desc" lines="2">{{desc}}</text>
    <div class="image-section">
      <image class="image" :src="source" v-for="(source, i) in pictures" :key="i" />
    </div>
    <text class="comment" v-if="count">{{count}} 人说好</text>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: '就造专属感，给孩子寻个座椅好玩伴'
      },
      desc: {
        type: String,
        default: '犹记得儿时的风筝带着斑斓的色彩在天空飘过；那小河里躲迷藏的鱼虾，还待着小伙伴们一起去捕捉，如今的孩童没有了这些简单且纯粹的娱乐项目，生活在高楼城市中的他们，该当怎样度过自己的童年才是美好的？',
      },
      count: {
        type: Number,
        default: 237
      },
      pictures: {
        type: Array,
        default: [
          'https://gw.alicdn.com/tfscom/i3/48292642/TB29OtIakz_F1JjSZFkXXcCaXXa_!!48292642.jpg_250x250q90s200.jpg',
          'https://gw.alicdn.com/imgextra/i4/706778912/TB2hvwSXBvBIuJjy1zeXXbGBpXa_!!706778912-0-beehive-scenes.jpg_250x250q90s200.jpg',
          'https://gw.alicdn.com/imgextra/i3/706778912/TB2wX.fcxz9F1JjSZFsXXaCGVXa_!!706778912-0-beehive-scenes.jpg_250x250q90s200.jpg'
        ]
      }
    }
  }
</script>

<style scoped>
  .floor {
    margin-bottom: 15px;
    background-color: #FFF;
  }
  .title {
    font-size: 40px;
    text-align: center;
    padding-top: 35px;
    padding-bottom: 25px;
  }
  .desc {
    lines: 2;
    color: #999;
    font-size: 30px;
    padding-left: 30px;
    padding-right: 30px;
  }
  .image-section {
    flex-direction: row;
    justify-content: space-between;
    margin-top: 20px;
  }
  .image {
    width: 245px;
    height: 245px;
  }
  .comment {
    color: #52bfe6;
    font-size: 32px;
    text-align: right;
    padding-right: 50px;
    margin-top: 25px;
    margin-bottom: 20px;
  }
</style>
