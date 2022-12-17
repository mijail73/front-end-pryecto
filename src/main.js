import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import Toolbar from '@/components/Toolbar-Component.vue'
import Footer from '@/components/Footer-Component.vue'

Vue.config.productionTip = false

Vue.component('my-toolbar', Toolbar);
Vue.component('my-footer', Footer);

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
