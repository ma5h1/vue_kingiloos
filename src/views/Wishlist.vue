<template>
  <div class="about">
    <h1>Siin saad vihjata päkapikule, mida Sulle võiks kinkida :)</h1>
    <p>
      <label for="wishlist" style="color: rebeccapurple">Kingisoov(id)</label><br>
      <input class="sisend" id="wishlist" type="text">
    </p>
  </div>
</template>

<script>
export default {
  methods: {
  },
  data: function () {
    return {

    }
  },
  created() {
    alert(this.$route.params.code);
  }
}
</script>