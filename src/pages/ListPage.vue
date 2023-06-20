<template>
  <q-page class="column">
    <custom-table
      class="full-width q-pa-lg"
      flat
      bordered
      :rows="users"
      :columns="columns"
      row-key="name"
      hide-pagination
      :pagination="initialPagination"
    >
      <template #top>
        <div class="row justify-between full-width">
          <custom-input dense filled icon-right="magnifier">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </custom-input>
          <custom-btn
            color="primary"
            label="Add user"
            rounded
            filled
            icon="add"
          />
        </div>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="avatar" :props="props">
            <q-avatar>
              <img :src="props.row.avatar" />
            </q-avatar>
          </q-td>
          <q-td key="full_name" :props="props">
            {{ `${props.row.first_name} ${props.row.last_name}` }}
          </q-td>
          <q-td key="action" :props="props">
            <custom-btn
              class="q-pa-xs"
              color="primary"
              flat
              filled
              icon="edit"
            />
            <custom-btn
              class="q-pa-xs"
              color="primary"
              flat
              filled
              icon="delete"
            />
          </q-td>
        </q-tr>
      </template>
    </custom-table>
    <div class="row q-mt-md">
      <q-pagination
        v-model="page"
        boundary-links
        color="primary"
        :max="totalPages"
      />
    </div>
  </q-page>
</template>

<script lang="ts">
import {
  defineComponent,
  watch,
  onMounted,
  reactive,
  ref,
  computed,
} from 'vue';
import { useUsers } from 'src/composables/useUsers';
import CustomInput from 'src/components/atoms/CustomInput.vue';
import CustomTable from 'src/components/organisms/CustomTable.vue';
import CustomBtn from 'src/components/atoms/CustomButton.vue';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  name: 'IndexPage',
  components: { CustomInput, CustomTable, CustomBtn },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const { getAllUsers, users } = useUsers();
    const routeParams = computed(() => route.query);
    const page = ref(Number(routeParams.value?.page) ?? 1);
    const totalPages = ref(5);
    const initialPagination = reactive({
      sortBy: 'desc',
      descending: false,
      page: 1,
      rowsPerPage: 8,
      // rowsNumber: 0,
    });

    onMounted(() => {
      fetchAllData();
    });

    const fetchAllData = async () => {
      const paginationData = await getAllUsers({
        page: page.value,
        per_page: initialPagination.rowsPerPage,
      });
      page.value = paginationData.page;
      totalPages.value = paginationData.total_pages;

      setRouteParams();
    };

    const setRouteParams = () => {
      void router.push({
        query: { page: page.value },
      });
    };

    watch(
      () => routeParams.value,
      () => {
        page.value = Number(routeParams.value?.page);
      }
    );

    watch(
      () => page.value,
      () => {
        fetchAllData();
      }
    );

    const columns = [
      {
        name: 'avatar',
        align: 'left',
        label: '',
        style: 'width: 100px;',
      },
      {
        name: 'full_name',
        required: true,
        label: 'Full Name',
        align: 'left',
      },
      {
        name: 'action',
        align: 'center',
        label: 'Action',
        style: 'width: 100px;',
      },
    ];

    return {
      totalPages,
      initialPagination,
      users,
      page,
      columns,
    };
  },
});
</script>
