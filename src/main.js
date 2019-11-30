import Vue from 'vue'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.vue'
import {
    store
} from './store/store';

new Vue({
    el: '#app',
    store: store,
    render: h => h(App)
})