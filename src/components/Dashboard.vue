<template>
  <div class="flex flex-col justify-center gap-4">
    <div class="flex flex-row justify-center gap-1">
      Selected range: {{xAxisScaleDomain}}
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="rangeChange('day')"> 1D </button>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="rangeChange('week')"> 1W </button>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="rangeChange('month')"> 1M </button>
    </div>
    <div class="shadow-md min-w-min">
      <div id="chart"></div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import embed from 'vega-embed'
import useChartSpecification from '@/composables/chartSpecification'

export default {
  name: 'Dasboard',
  setup () {
    const deriveXAxisScaleDomain = (val) => {
      switch(val) {
        case 'day': {
          return {"unionWith": [{"expr": "now()"}, "2021-09-01T00:00:00"]}
        }
        case 'week': {
          return {"unionWith": [{"expr": "now()"}, "2021-04-01T00:00:00"]}
        }
        case 'month': {
          return [{"expr": "now() - 30"}]
        }
        default: {
          return {"unionWith": [{"expr": "now()"}, "2021-04-01T00:00:00"]}
        }
      }
    }

    const xAxisScaleDomain = ref(deriveXAxisScaleDomain())
    const { lineChart } = useChartSpecification

    const chart = computed(() => {
      return embed('#chart', lineChart(deriveXAxisScaleDomain(xAxisScaleDomain.value)), {"actions": false})
    });

    const rangeChange = (val) => {
      xAxisScaleDomain.value = val
    }

    return {
      lineChart,
      rangeChange,
      xAxisScaleDomain,
      chart
    }
  }
}
</script>

<style scoped>
 #chart {
   box-shadow: 30px;
   border-radius: 10px;
 }

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>