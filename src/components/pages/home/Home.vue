<template>
  <section class="home-page">
    <ul style="width: 100%; list-style-type:none;">
      <li>

      </li>
      <li>

      </li>
      <li>

      </li>
      <li>

      </li>
    </ul>
  </section>
</template>
<script>
export default {
  data() {
    return {}
  },
  mounted() {},
  methods: {},
  components: {}
}
</script>
<style lang="less" scoped>
.home-page {
  > ul {
    max-width: 1100px;
    margin: 0 auto;
    list-style-type: none;
    > li {
      width: 45%;
      float: left;
      padding-left: 10px;
      padding-top: 10px;
    }
  }
}
</style>
