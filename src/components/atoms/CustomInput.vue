<template>
  <q-input v-bind="$attrs">
    <template v-for="(index, name) in $slots" v-slot:[name]="data">
      <slot v-if="index" :name="name" v-bind="data"></slot>
    </template>
  </q-input>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CustomInput',
});
</script>
