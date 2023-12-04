import { createApp } from 'vue'
import App from './App.vue'
// Import the Antd design
import 'ant-design-vue/dist/reset.css'
import { PhoneOutlined, MailOutlined } from '@ant-design/icons-vue'
import Antd from 'ant-design-vue'
const app = createApp(App)
app.mount('#app')
app.use(Antd)
app.component('PhoneOutlined', PhoneOutlined)
app.component('MailOutlined', MailOutlined)
