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
    .map((item) => {
      if (item) {
        // is already an ISO date string (e.g. 2025-09-11)
        if (typeof item === 'string' && item.length === 10) {
          return item;
        }

        if (item instanceof Date) {
          return DateTime.fromJSDate(item).toISODate()
        }
      }

      return null;
    })
    .filter(Boolean)
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
