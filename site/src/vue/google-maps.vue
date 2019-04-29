<template>
    <div class="large-6 medium-6 cell large-push-6 medium-push-6 event-map-container">
        <div class="event-map">
            <google-map
                :center="center"
                :zoom="zoom"
                style="width:100%;  height: 570px;"
            >
                <google-marker
                    v-for="(m, index) in populatedMarkers"
                    :key="index"
                    :position="m.position"
                    @click="showModal(m.data, m.position)"
                >
                </google-marker>
            </google-map>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import * as VueGoogleMaps from 'vue2-google-maps';

Vue.component('google-map', VueGoogleMaps.Map);
Vue.component('google-marker', VueGoogleMaps.Marker);

Vue.use(VueGoogleMaps, {
    load: {
        //AIzaSyDy0wL4H7-4TOQGB0yukQnw3n4ECTs2kFU
        //AIzaSyBzlLYISGjL_ovJwAehh6ydhB56fCCpPQw
        key: 'AIzaSyBvyghhSYXS6mVbkB-SYCE4e3x_VxyZr4A',
    },
    installComponents: false,
});


export default {
    components: {
        VueGoogleMaps,
    },
    props: {
        initialMarkers: Array,
    },
    data() {
        return {
            // default map values.
            center: { lat: 39.0997, lng: -94.5786 },
            zoom: 3,
        };
    },

    computed: {
        populatedMarkers: function () {
            var markers = [];

            for (var i = 0; i < this.initialMarkers.length; i++) {
                const marker = {
                    lat: this.initialMarkers[i].lat,
                    lng: this.initialMarkers[i].lon,
                };
                markers.push({ position: marker, data: this.initialMarkers[i] });
            }

            return markers;
        },
    },

    methods: {

        geolocate() {
        navigator.geolocation.getCurrentPosition(position => {
            this.center = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };
            this.zoom = 5;
        });
        },

        showModal(data, center) {
            this.center = center;
            this.$parent.openModal(data);
        },
    },

    created() {
        this.geolocate();
    },
};
</script>
