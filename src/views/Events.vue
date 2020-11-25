<template>
  <div class="event">
    <h1>Tere tulemast kingiloosi veebilehele!</h1>
    <h1>Siin saad luua enda ürituse jaoks kinkide loosi.</h1>
    <label for="event_date">Ürituse kuupäev</label>
    <p>
      <input class ="sisend" id="event_date" v-model="event.date" type="date">
    </p>
    <p>
      <input class ="sisend" v-model="event.location" type="text" placeholder="Sisesta ürituse asukoht">
    </p>
    <p>
      <input class ="sisend" v-model="event.nrparticipants" type="number" min="1" placeholder="Sisesta osalejate arv">
    </p>
    <p>
      <input class ="sisend" v-model="event.language" type="string" placeholder="Sisesta ürituse keel">
    </p>
    <p1>
      <input class ="sisend1" v-model="participant.name" type="string" placeholder="Sisesta osaleja nimi">
    </p1>
    <p1>
      <input class ="sisend1" v-model="participant.email" type="email" placeholder="Sisesta osaleja email">
    </p1>
    <p1>
      <input class ="sisend1" v-model="participant.language" type="string" placeholder="Sisesta osaleja keel">
    </p1>
    <p1>
      <button class ="sisend1" v-on:click="addParticipant()">Lisa osaleja</button>
    </p1>
    <p>
    <input class ="checkbox" type="checkbox" id="checkbox">
    <label for="checkbox">Jah, mul on luba kasutada kingiloosi jaoks osaleja(te) e-posti aadresse</label>
    </p>
    <button v-on:click="createEvent()">Loo üritus!</button>
    <br><br><br>

  </div>
</template>

<script>

let addParticipantFunction = function () {
alert ("Lisa osaleja!")
}




export default {
  methods: {
    addParticipant:addParticipantFunction
  },
  data: function () {
    return {
      event: {},
      participant: {}
    }
  }
}
</script>
