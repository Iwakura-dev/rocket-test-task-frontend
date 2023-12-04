<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { ILead } from './types/Lead/Lead.ts'
import axios from '@/config/axios.config.ts'
const columns = [
  {
    title: 'Название',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Бюджет',
    dataIndex: 'price',
    key: 'price'
  },
  {
    title: 'Статус',
    dataIndex: ['status', 'name'],
    key: 'status'
  },
  {
    title: 'Ответственный',
    dataIndex: ['responsible_user', 'name'],
    key: 'responsible'
  },
  {
    title: 'Дата создания',
    dataIndex: 'created_at',
    key: 'created_at'
  }
]
const dataSource = ref([])
const dataLoading = ref(false)
const search = ref('')
// Methods to collect data from the backend
const loadData = async (): Promise<void> => {
  try {
    dataLoading.value = true
    const { data } = await axios.get<ILead[]>(`leads`)
    dataSource.value.push(data)
    dataLoading.value = false
  } catch (error) {
    throw new Error(error.message)
  }
}
onMounted(loadData)
</script>

<template>
  <div>
    <a-card title="Тестовое задание от Iwakura-dev">
      <template #extra>
        <a-input-search v-model="search" placeholder="Search..." />
      </template>
      <a-table
        :columns="columns"
        :data-source="dataSource"
        :loading="dataLoading"
        :row-key="(record) => record.id"
        :expand-column-width="100"
        :pagination="false"
      >
        <template #expandColumnTitle>
          <span>Контакты</span>
        </template>
        <template #expandedRowRender="{ record }">
          <ul>
            <li v-for="contact in record.contacts" :key="contact.id">
              <a-space>
                {{ contact.name }}
                <a :href="'tel:' + contact.phone_number">
                  <PhoneOutlined />
                </a>
                <a :href="'mailto:' + contact.email">
                  <MailOutlined />
                </a>
              </a-space>
            </li>
          </ul>
        </template>
        <template #bodyCeil="{ column, record }">
          <template v-if="column.key === 'status'">
            <span>
              <a-tag :color="record.status.color">
                {{ record.status.name }}
              </a-tag>
            </span>
          </template>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<style scoped></style>
