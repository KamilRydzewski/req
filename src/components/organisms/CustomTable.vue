<template>
  <q-table class="custom-table" v-bind="$attrs">
    <template v-for="(index, name) in $slots" v-slot:[name]="data" :key="name">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </q-table>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CustomTable',
});
</script>
<style lang="scss">
.custom-table {
  .q-table {
    &__top {
      padding: 16px 0 40px;
      border-bottom: 1px solid rgb(234, 234, 234);
    }
  }
}
</style>
