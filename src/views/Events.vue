<template>
  <div class="event">
    <h1>On KINGILOOSI aeg!</h1>
    <h1>Siin saad luua enda sündmuse jaoks kinkide loosi.</h1>
    <p>
      <select v-model="event.eventLanguage"  id="event_language">
        <option disabled value="">Vali sündmuse keel</option>
        <option>Eesti</option>
        <option>English</option>
        <option>Русский</option>
      </select>
    </p>
    <p>
      <label for="event_date" style="color: rebeccapurple">Sündmuse kuupäev</label><br>
      <input class ="sisend" id="event_date" v-model="event.eventDate" type="date">
    </p>
    <p>
      <input class ="sisend" v-model="event.eventLocation" type="text" placeholder="Sisesta sündmuse asukoht">
    </p>
    <p>
      <button class ="sisend1" v-on:click="addParticipant()">Lisa osaleja</button>
    </p>
    <table align="center">
      <tr v-for="(participant, index) in event.participants">
        <td>
          {{index + 1}}
        </td>
        <td>
          <input class ="sisend1" v-model="participant.name" type="string" placeholder="Sisesta osaleja nimi">
        </td>
        <td>
          <input class ="sisend1" v-model="participant.email" type="email" placeholder="Sisesta osaleja email">
        </td>
        <td>
          <select v-model="participant.participantLanguage" >
            <option disabled value="">Vali osaleja keel</option>
            <option>Eesti</option>
            <option>English</option>
            <option>Русский</option>
          </select>
        </td>
        <td>
          <button class="deletebutton" v-on:click = "deleteRow()">Kustuta</button>
        </td>
      </tr>
    </table>
    <p>
    <input class ="checkbox" type="checkbox" id="checkbox">
    <label for="checkbox" style="color: red">Jah, mul on luba kasutada kingiloosi jaoks osaleja(te) e-posti aadresse</label>
    </p>
    <button v-on:click="createEvent()">Loo sündmus!</button>
    <br><br><br>

  </div>
</template>

<script>

let showResponse=function (response) {
  this.message=response.data;
  alert(this.message)
}

let addParticipantFunction = function () {
  this.event.participants.push({participantLanguage: ""});
}

let createEventFunction = function () {
  let url="http://localhost:8080/createEvent"

  //this.$http.get(url,config)
  let requestBody={}
  this.$http.post(url,this.event)
      .then(this.showResponse)
  //teine variant teha: .then (response=>this.message=response.data);
}
let deleteRow = function (index){
this.event.participants.splice(index,1);
}

export default {
  methods: {
    addParticipant:addParticipantFunction,
    createEvent:createEventFunction,
    showResponse:showResponse,
    deleteRow
  },
  data: function () {
    return {
      event: { eventLanguage:"",
        participants: []
      }
    }
  }
}
</script>
