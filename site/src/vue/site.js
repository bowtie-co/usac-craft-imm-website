import 'babel-polyfill';
require('es6-promise').polyfill();

/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');
/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

import Events from './events';
import Resources from './resources';
import Vue from 'vue';
import EventsCarousel from './events-carousel';
import EventsCarouselWidget from './events-carousel-widget';

window.Vue = Vue;

var events = document.getElementById('events');
var resources = document.getElementById('resources-app');
var eventsCarousel = document.getElementById('events-widget');
var eventsCarouselWidget = document.getElementById('events-flex-widget');


if (events) {
    new Vue({
        el: '#events',

        components: {
            Events,
        },
    });
}

if (resources) {
    new Vue({
        el: '#resources-app',

        components: {
            Resources,
        },
    });
}

if (eventsCarousel) {
    new Vue({
        el: '#events-widget',

        components: {
            EventsCarousel,
        },
    });
}

if (eventsCarouselWidget) {
    new Vue({
        el: '#events-flex-widget',

        components: {
            EventsCarouselWidget,
        },
    });
}
