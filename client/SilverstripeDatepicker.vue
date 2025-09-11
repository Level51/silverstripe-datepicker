<script setup lang="ts">
import { computed, ref } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import { DateTime } from 'luxon';
import '@vuepic/vue-datepicker/dist/main.css'

const props = defineProps<{
  id: string;
  name: string;
  value?: string | null;
  settings?: Record<string, any>;
}>()

const dates = ref(props.value ? JSON.parse(props.value) : []);

const preparedValue = computed(() => {
  const days = [...dates.value]
    .map((dateString) => DateTime.fromJSDate(dateString).toISODate())
    .sort((a, b) => {
      const aDate = DateTime.fromISO(a);
      const bDate = DateTime.fromISO(b);

      return aDate - bDate;
    });

  return JSON.stringify(days);
});
</script>

<template>
  <div>
    <VueDatePicker
      v-model="dates"
      v-bind="settings" />

    <input
      type="hidden"
      :name="name"
      :value="preparedValue" />
  </div>
</template>
