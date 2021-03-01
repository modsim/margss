<template>
  <div>
    <div>
      <h4>Current Jobs ({{jobs.length}})</h4>
      <b-table sticky-header striped hover :items="jobs">
          <template #cell(samples)="data">
            <a v-if="data.value!=='No samples yet'" :href="data.value">download</a>
            <a v-else>{{data.value}}</a>
          </template>
        <template #cell(rounded_model)="data">
          <a v-if="data.value!=='Model not preprocessed yet'" :href="data.value">download</a>
          <a v-else>{{data.value}}</a>
        </template>
      </b-table>
      <button class="m-3 btn btn-sm btn-danger float-right" @click="removeAllJobs">
        Remove All
      </button>
      <button class="m-3 btn btn-sm btn-warning float-right" @click="showModal=!showModal">
        Remove Single Job
      </button>
      <button class="m-3 btn btn-sm btn-success float-right" @click="showAddModal=!showAddModal">
        Add Job
      </button>
      <b-modal ok-variant="danger" v-model="showModal" @ok="removeJob">
        <h5>Delete Job</h5>
        Enter ID of Job to delete
        <b-form-input id="inputText1" ref="inputText1" v-model="idToDelete" autofocus></b-form-input>
      </b-modal>
      <b-modal v-model="showAddModal" @ok="addJob">
        <h5>Upload files for job</h5>
        <br/>
        <span>name for job</span>
        <b-form-input id="inputText4" ref="inputText4" v-model="name" autofocus></b-form-input>
        <span>model (SBML format)</span><b-form-file label="model" accept=".xml" id="inputText2" ref="inputText2" v-model="modelFile" autofocus></b-form-file>
        <span>settings (JSON format)</span><b-form-file label="settings" accept=".json" id="inputText3" ref="inputText3" v-model="settingsFile" autofocus></b-form-file>
      </b-modal>
    </div>
  </div>
</template>

<script>
import MARGSSDataService from "../services/MARGSSDataService";

export default {
  name: "jobs-list",
  data() {
    return {
      jobs: [],
      showModal: false,
      showAddModal: false,
      name: undefined,
      modelFile: undefined,
      settingsFile: undefined,
      idToDelete: undefined,
      timer: undefined
    };
  },
  methods: {
    getJobs() {
      MARGSSDataService.getAll()
          .then(response => {
            this.jobs = response.data.jobs;
          })
          .catch(e => {
            console.log(e);
          });
    },

    refreshList() {
      this.getJobs();
    },

    removeJob() {
      console.log(`Removing ${this.idToDelete}`)
      MARGSSDataService.delete(this.idToDelete)
          .then(response => {
                console.log(response.data);
                this.idToDelete = undefined;
                this.refreshList();
              }
          )
          .catch(e => {
            console.log(e);
          });
    },

    addJob() {
      const data = {
        name: this.name,
        form: new FormData()
      }
      console.log('adding data with name ' + this.name)
      data.form.append('model', this.modelFile)
      data.form.append('settings', this.settingsFile)
      MARGSSDataService.create(data)
          .then(response => {
            this.name = undefined;
            this.settingsFile = undefined;
            this.modelFile = undefined;
            this.refreshList();
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    },

    removeAllJobs() {
      MARGSSDataService.deleteAll()
          .then(response => {
            console.log(response.data);
            this.refreshList();
          })
          .catch(e => {
            console.log(e);
          });
    },
  },
  mounted() {
    this.getJobs();
    this.timer = setInterval(() => {
      // this.getJobs();
    }, 5000 );
  },
  beforeDestroy() {
    clearInterval(this.timer)
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
