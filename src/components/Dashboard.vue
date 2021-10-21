<template>
  <div class="flex flex-wrap justify-center gap-4" style="position: relative;">
    <div class="flex flex-row justify-center gap-1" style="position: absolute; top: 40px; right: calc(50% - 500px); z-index: 1;">
      <span style="display: none"> Selected range: {{selectedDatePickerRange}} {{selectedRange}}</span>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" :class="{'bg-blue-700': selectedRange === 'DAILY'}" @click="setSelectedRange('DAILY')"> 1D </button>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" :class="{'bg-blue-700': selectedRange === 'WEEKLY'}" @click="setSelectedRange('WEEKLY')"> 1W </button>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" :class="{'bg-blue-700': selectedRange === 'MONTHLY'}" @click="setSelectedRange('MONTHLY')"> 1M </button>
      <input
        @change="setSelectedDatePickerRange"
        min='2021-04-08'
        max='2021-10-08'
        type="date"
        class="date-picker"
      />
    </div>
    <div class="chart-container flex flex-wrap content-center justify-center shadow-md min-w-min">
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

    const formatDate = (date, type) => {
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
      setSelectedDatePickerRange,
    }
  }
}
</script>

<style scoped>
 #chart {
   box-shadow: 30px;
   border-radius: 10px;
 }

.date-picker {
  border: 1px solid #3b82f6;
  border-radius: 4px;
}

.chart-container {
  height: 500px;
  width: 1100px;
}
</style>