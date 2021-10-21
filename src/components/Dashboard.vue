<template>
  <div class="flex flex-col justify-center gap-4">
    <div class="flex flex-row justify-center gap-1">
      <span style="display: none"> Selected range: {{selectedDatePickerRange}}</span>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="setSelectedRange('DAILY')"> 1D </button>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="setSelectedRange('WEEKLY')"> 1W </button>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="setSelectedRange('MONTHLY')"> 1M </button>
      <input
        @change="setSelectedDatePickerRange"
        min='2021-04-08'
        max='2021-10-08'
        type="date"
      />
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
    const selectedDatePickerRange = ref({ param: 'brush' })
    const selectedRange = ref('')

    const setSelectedRange = (rangeType) => {
      selectedRange.value = rangeType
      selectedDatePickerRange.value = { param: 'brush' }
    }

    const setSelectedDatePickerRange = (event) => {
      selectedDatePickerRange.value = formatDate(event.target.value, selectedRange.value)
    }

    function formatDate(date, type) {
      if (type === 'DAILY') {
        const [year, month, day] = date.split('-');
        return [{ year: parseInt(year), month: parseInt(month), date: parseInt(day) }, { year: parseInt(year), month: parseInt(month), date: parseInt(day) + 1 }]
      }
      if (type === 'WEEKLY') {
        const [year, month, day] = date.split('-');
        return [{ year: parseInt(year), month: parseInt(month), date: parseInt(day) }, { year: parseInt(year), month: parseInt(month), date: parseInt(day) + 7 }]
      }
      if (type === 'MONTHLY') {
        const [year, month] = date.split('-');
        return [{ year: parseInt(year), month: parseInt(month) }, { year: parseInt(year), month: parseInt(month) + 1 }]
      }
    }

    // const xAxisScaleDomain = ref(deriveXAxisScaleDomain())
    const { lineChart } = useChartSpecification

    const chart = computed(() => {
      return embed('#chart', lineChart(selectedDatePickerRange.value), {"actions": false})
    });

    return {
      lineChart,
      formatDate,
      chart,
      selectedRange,
      setSelectedRange,
      selectedDatePickerRange,
      setSelectedDatePickerRange
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