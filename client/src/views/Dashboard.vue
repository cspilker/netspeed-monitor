<template>
  <div id="dashboard">
    <div id="nav">
      <h1> Netspeed Monitor</h1>
    </div>
    <div style="float: left; padding-left:5%;">
      <h3> Network Information</h3>
      <div>
        <img
          src="../../public/clock.png"
          alt="Downstream"
          height="16"
          vertical-align="middle"
          style="float: left; padding-top: 4px; padding-right:6px;"
        >
        <h4
          class="mt-0 mb-1"
          id="kpi"
        >{{ status.ping + ' ms' }}</h4>
      </div>
      <div>
        <img
          src="../../public/up-arrow.png"
          alt="Upstream"
          height="16"
          vertical-align="middle"
          style="float: left; padding-top: 4px; padding-right:6px;"
        >
        <h4
          class="mt-0 mb-1"
          id="kpi"
        >{{ status.up + ' Mbit/s' }}</h4>
      </div>
      <div>
        <img
          src="../../public/down-arrow.png"
          alt="Downstream"
          height="16"
          vertical-align="middle"
          style="float: left; padding-top: 4px; padding-right:6px;"
        >
        <h4
          class="mt-0 mb-1"
          id="kpi"
        >{{ status.down + ' Mbit/s' }}</h4>
      </div>
      <div>
        <img
          src="../../public/monitor.png"
          alt="Downstream"
          height="16"
          vertical-align="middle"
          style="float: left; padding-top: 4px; padding-right:6px;"
        >
        <h4
          class="mt-0 mb-1"
          id="kpi"
        >{{ status.devices + ' active' }}</h4>
      </div>

      <body
        v-if="lastUpdate != null"
        id="lastUpdated"
      > {{ lastUpdate }}s ago</body>
    </div>
    <!--    right   -->
    <!--            -->
    <!--            -->
    <div
      style="float: left; margin-left:5%; width:65%;"
      sclass="container"
    >
      <div style="">
        <div style="float: left">
          <h3>Network Monitor</h3>
        </div>
        <template v-if="monitorStat === true">
          <div style="float: left; margin-top: 17px;
        padding: 3px; margin-left: 10px; background-color: green;
        border-radius: 3px">
            <b style="color: white;">active</b>
          </div>
        </template>
      </div>
      <div style=" padding-top: 0px; float:top; clear:both ">
        <button
          v-on:click="changeData"
          style="margin: 5px; margin-right: 25px; float: left;
         font-size: 15px; height:22px; width: 50px"
        >{{ loadText }}<sync-loader
            :loading="loadingSt"
            color="blue"
            size="7px"
          ></sync-loader></button>
        <select @change="onChangeSelect($event)" v-model="key"
        style="margin: 5px; font-size: 15px; float: left;
             height:22px">
          <option value="1">Last Hour</option>
          <option value="2">Last Day</option>
          <option value="3">Last Week</option>
          <option value="4">Other</option>
        </select>
        <template v-if="displayDatePicker === true">
        <datetime
          id="2"
          type="datetime"
          v-model="datetime"
          style="margin: 5px; float: left;
         font-size: 15px"
        ></datetime>
        <datetime
          v-if="displayDatePicker === true"
          id="7"
          type="datetime"
          v-model="datetime"
          style="margin: 5px; float: left;
         font-size: 15px"
        ></datetime>
        </template>
      </div>
      <div
        class="container"
        style="padding-top: 0px; float:top; clear:both; position: relative"
      >
        <div>
          <commit-chart
            :data="dataChart"
            :options="{responsive: true, maintainAspectRatio: false, }"
            style="height: 600px"
          ></commit-chart>
        </div>
        <div style="width: 75px; height: 50px; position: absolute; top: 50%; left: 48%;">
          <sync-loader
            loading=true
            color="blue"
            size="15px"
          ></sync-loader>
        </div>
      </div>
      <br>
    </div>
  </div>

</template>

<script>
// @ is an alias to /src
import { Datetime } from 'vue-datetime';
import SyncLoader from 'vue-spinner/src/BeatLoader.vue';
import CommitChart from '../newChart.vue';
import 'vue-datetime/dist/vue-datetime.css';

const API_URL = 'http://localhost:8081/api/getStatus/';
const API_STATUS = 'http://localhost:8081/api/getStatus/';
const API_STATUS_P = 'http://localhost:8081/api/getStatus/?saved_status=true';

export default {
  name: 'Dashboard',
  data: () => ({
    displayDatePicker: false,
    loaded: false,
    loadingSt: true,
    loadText: '',
    monitorStat: null,
    monitorActive: null,
    dataChart: {
      ping: [],
      down: [],
      up: [],
      labels: [],
    },

    opts: { type: Object, fill: false },
    error: '',
    status: {
      ping: 0,
      down: 0,
      up: 0,
      devices: 0,
    },
    lastUpdate: null,
  }),

  mounted() {
    this.start();
    // this.dat2();
    this.checkStatus();
  },

  components: {
    CommitChart,
    datetime: Datetime,
    SyncLoader,
  },
  methods: {
    onChangeSelect(event) {
      if (event.target.value === '4') {
        this.displayDatePicker = true;
      } else {
        this.displayDatePicker = false;
      }
      console.log(event.target.value);
      console.log(this.displayDatePicker);
    },
    changeData() {
      // this.loaded = false;
      console.log('Klick!');
      fetch('http://localhost:8081/api/getTestResults/')
        .then((response) => response.json())
        .then((result) => {
          this.dataChart = {
            ping: [],
            down: [],
            up: [],
            labels: [],
          };
          this.dataChart.down = result.down;
          this.dataChart.ping = result.ping;
          this.dataChart.up = result.up;
          this.dataChart.labels = result.labels;
        });
    },
    updateDataExample() {
      this.chartdata.datasets[0].data = this.data;
    },
    checkStatus() {
      fetch('http://localhost:8081/api/getMonitorStatus/')
        .then((response) => response.json())
        .then((result) => {
          console.log(result.monitorActive);
          if (result.monitorActive) {
            this.loadingSt = false;
            this.loadText = 'Start';
            this.monitorStat = true;
          }
        });
    },

    click(api) {
      console.log('Klick!');
      fetch(api)
        .then((response) => response.json())
        .then((result) => {
          fetch('http://localhost:8081/api/getActiveDevices/')
            .then((response2) => response2.json())
            .then((result2) => {
              console.log('down: ', result.down);
              this.status.devices = result2.dev;
              this.status.down = Math.floor(result.down / 1000) / 100;
              this.status.up = Math.floor(result.up / 1000) / 100;
              this.status.ping = Math.floor(result.ping * 100) / 100;
              this.lastUpdate = 0;
              this.$notify({
                group: 'output',
                title: 'Updated Network Informatio',
                text: 'Network Info updated!',
              });
            });
        });
    },
    click2() {
      this.$notify({
        group: 'output',
        position: 'top right',
        title: 'Error',
        text: "Couldn't connect to backend!",
        type: 'error',
      });
    },

    start() {
      this.click(API_STATUS_P);
      setInterval(() => {
        if (this.lastUpdate != null) this.lastUpdate += 1;
        if (this.lastUpdate === 40) {
          this.click(API_STATUS);
        }
      }, 1000);
    },
    dat2() {
      this.loaded = false;
      console.log('Klick!');
      fetch('http://localhost:8081/api/getTestResults/')
        .then((response) => response.json())
        .then((result) => {
          this.chartdata = result.chartdata;
          console.log('d: ', result.chartdata.labels[1]);
          this.updateDataExample();
          this.loaded = true;
        });
    },
    click3() {
      console.log('Klick!');
      fetch(API_URL)
        .then((response) => response.json())
        .then((result) => {
          console.log('down: ', result.down);
          this.status.down = Math.floor(result.down / 1000) / 100;
          this.status.up = Math.floor(result.up / 1000) / 100;
          this.status.ping = Math.floor(result.ping * 100) / 100;
          this.$notify({
            group: 'output',
            title: 'Updated Network Informatio',
            text: 'Information updated!',
          });
        });
    },
    startMonitor() {
      fetch('http://localhost:8081/api/startMonitor/').then((res) => {
        console.log(res);
        this.$notify({
          group: 'output',
          title: 'Monitor is active!',
          text: 'Data will now be written to the database',
          type: 'success',
        });
      });
    },
    stopMonitor() {
      this.$notify({
        group: 'output',
        title: 'Monitor is incative!',
        text: 'NO data will be saved',
        type: 'error',
      });
    },
  },
};
</script>

<style>
#dashboard {
  padding-left: 5px;
}
#kpi {
  font-family: Verdana;
  font-weight: 150;
  font-size: 19px;
}

#lastUpdated {
  font-size: 13px;
  font-style: italic;
}

#sub {
  font-style: normal;
  padding-left: 30px;
}

#nav {
  padding-left: 5%;
  padding-top: 5px;
}

#select {
  text-indent: 5px;
}
</style>
