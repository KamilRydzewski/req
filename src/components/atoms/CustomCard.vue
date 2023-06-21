<template>
  <q-card>
    <template v-for="(index, name) in $slots" v-slot:[name]="data">
      <slot v-if="index" :name="name" v-bind="data"></slot>
    </template>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CustomCard',
});
</script>
