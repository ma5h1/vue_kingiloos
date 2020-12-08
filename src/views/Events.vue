<template xmlns="http://www.w3.org/1999/html">
  <form class="event">
    <h1>On KINGILOOSI aeg!</h1>
    <h1>Siin saad luua enda sündmuse jaoks kinkide loosi.</h1>
    <p>
      <select v-model="event.eventLanguage" id="event_language" required>
        <option disabled value="">Sündmuse keel</option>
        <option>Eesti</option>
        <option>English</option>
        <option>Русский</option>
      </select>
    </p>
    <p>
      <label for="event_date" style="color: black">Sündmuse kuupäev</label><br>
      <input class="sisend" id="event_date" v-model="event.eventDate" type="date" required>
    </p>
    <p>
      <input class="sisend" v-model="event.eventLocation" type="text" placeholder="Sündmuse asukoht" required>
    </p>
    <p>
      <input class="sisend" v-model="event.eventAmount" type="number" min="0" placeholder="Kingituse hinna limiit eurodes" required>
      <!-- <b>EUR</b> -->
    </p>


      <button class="sisend2" v-on:click="addParticipant()">Lisa osaleja</button>
      <button class="sisend2" v-on:click="isHidden = !isHidden">Lisa osalejad failist</button>



    <table align="center">
      <tr v-for="(participant, index) in event.participants">
        <td>
          {{ index + 1 }}
        </td>
        <td>
          <input class="sisend1" v-model="participant.name" type="string" placeholder="Osaleja nimi" required>
        </td>
        <td>
          <input class="sisend1" v-model="participant.email" type="email" placeholder="Osaleja email" required>
          <span v-if="validateEmail(participant.email)">Invalid</span>
        </td>
        <td>
          <select v-model="participant.participantLanguage">
            <option disabled value="">Osaleja keel</option>
            <option>Eesti</option>
            <option>English</option>
            <option>Русский</option>
          </select>
        </td>
        <td>
          <button class="deletebutton" v-on:click="deleteRow()">Kustuta</button>
        </td>
      </tr>
    </table>
    <div v-if="!isHidden">
      <!--UPLOAD-->
      <h5>Lisage oma sündmusele mitu osalejat korraga. Laadige alla meie <a rel="noopener noreferrer" href="https://drive.google.com/file/d/1TtQcKhONQSlGZHRw_GbaLuvTmbDrDRg_/view?usp=sharing" target="_blank">CSV näidis-fail</a> ja lisage kõikide osalejate nimed, e-maili aadressid ja keeled, keda soovite sündmusele kutsuda.
        Kui fail valmis, saate lohistada selle allolevale väljale ja Teie sõbrad või kolleegid lisatakse sündmusele kiiresti ja hõlpsalt.</h5>
      <form enctype="multipart/form-data" novalidate v-if="true">
        <div>
          <input type="file" multiple :name="uploadFieldName" :disabled="isSaving" @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"
                 accept="text/csv/*" class="input-file">
          <p v-if="isInitial">
            Lohista osalejate fail siia<br> või kliki manustamiseks
          </p>
          <p v-if="isSaving">
            Laeme {{ fileCount }} faile...
          </p>
        </div>
        <!--SUCCESS-->
        <div v-if="isSuccess">
          <h2>Success</h2>
        </div>
        <!--FAILED-->
        <div v-if="isFailed">
          <h2>Upload failed.</h2>
          <p>
            <a href="javascript:void(0)" @click="reset()">Try again</a>
          </p>
          <pre>{{ uploadError }}</pre>
        </div>
      </form>
    </div>
    <p>
      <input class="personaalne" v-model="event.personalText" type="text" placeholder="Personaalne sõnum">
    </p>
    <div>
      <label for="checkbox" style="color: black; font-weight: bold " >Jah, mul on luba kasutada kingiloosi jaoks osaleja(te) e-posti
        aadresse</label>
      <input class="checkbox" type="checkbox" id="checkbox" value="1" v-model="submitButtonActive"/>
      <br>
      <button class="sisend2" id="submit_button" v-on:click="createEvent()" :disabled="!submitButtonActive">Loo sündmus!</button>
      <br><br><br>
    </div>
  </form>

</template>

<script>

let showResponse = function (response) {
  this.message = response.data;
  alert(this.message)
}

let addParticipantFunction = function () {
  this.event.participants.push({participantLanguage: ""});
}

let createEventFunction = function () {
  let url = "http://localhost:8080/createEvent"

  //this.$http.get(url,config)
  let requestBody = {}
  this.$http.post(url, this.event)
      .then(this.showResponse)
  //teine variant teha: .then (response=>this.message=response.data);
}
let deleteRow = function (index) {
  this.event.participants.splice(index, 1);
}

import { upload } from './file-upload.service';

const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3;


export default {
  methods: {
    addParticipant: addParticipantFunction,
    createEvent: createEventFunction,
    showResponse: showResponse,
    deleteRow,
    validateEmail(value) {
      return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
    },
    reset() {
      // reset form to initial state
      this.currentStatus = STATUS_INITIAL;
      this.uploadError = null;
    },
    save(formData) {
      // upload data to the server
      this.currentStatus = STATUS_SAVING;

      upload(formData)
          .then(x => {
            this.event.participants = x
            this.currentStatus = STATUS_SUCCESS;
          })
          .catch(err => {
            this.uploadError = err.response;
            this.currentStatus = STATUS_FAILED;
          });
    },
    filesChange(fieldName, fileList) {
      // handle file changes
      const formData = new FormData();

      if (!fileList.length) return;

      // append the files to FormData
      Array
          .from(Array(fileList.length).keys())
          .map(x => {
            formData.append(fieldName, fileList[x], fileList[x].name);
          });

      // save it
      this.save(formData);
    },
    mounted() {
      this.reset();
    }
  },
  data: function () {
    return {
      event: {
        eventLanguage: "",
        participants: [],
      },
      msg: [],
      isActive: true,
      submitButtonActive: false,
      currentStatus: null,
      uploadFieldName: 'texts',
      isHidden: true
    }
  },
  computed: {
    isInitial() {
      return this.currentStatus === STATUS_INITIAL;
    },
    isSaving() {
      return this.currentStatus === STATUS_SAVING;
    },
    isSuccess() {
      return this.currentStatus === STATUS_SUCCESS;
    },
    isFailed() {
      return this.currentStatus === STATUS_FAILED;
    }
  }
}

</script>
<!-- SASS styling -->
<style>

</style>