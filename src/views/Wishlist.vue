<template>
  <div>
    <h1>Siin saad vihjata päkapikule anonüümselt, mida Sulle võiks kinkida :)</h1>
    <p>
      <label for="wishlist" style="color: black">Kingisoov(id)</label><br>
      <textarea class="personaalne" id="wishlist" type="text" v-model="participant.wishlist"></textarea>
    </p>
    <br>
    <button id="sendwish" v-on:click="sendWish()">Saada kingisoov!</button>
    <br><br><br>
  </div>
</template>

<script>
let sendWishFunction = function () {
  let url = "http://localhost:8080/wishlist"

  this.participant.uuid = this.$route.params.code;
  this.$http.post(url, this.participant)
  alert("Aitäh! Kingisoov saadetud :)")
  //teine variant teha: .then (response=>this.message=response.data);
}

export default {
  methods: {
    sendWish: sendWishFunction
  },
  data: function () {
    return {
      participant: {}
    }
  }
}
</script>