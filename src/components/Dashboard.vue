<template>
  <div class="hello">
    <h1>{{chartData}}</h1>
  </div>
</template>

<script>
import { ref, onCreated } from 'vue'
import axios from 'axios'
export default {

  name: 'Dasboard',
  setup () {
    const chartData = ref(null)
    const fetchChart = () => {
      return axios.get('./db.json').then((response) => {
        chartData.value = response.data
      })
    }
    onCreated(() => {
      fetchChart()
    })
    return {
      fetchChart
    }
  },
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
