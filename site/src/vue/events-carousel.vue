<template>

    <section id="events-carousel">
            <carousel :navigationEnabled="true" :perPageCustom="[[0, 1], [768, 2], [1024, 3]]" :mouse-drag="false" :navigationPrevLabel="'&#8592'" :navigationNextLabel="'&#8594'">
              <slide v-for="result in eventResults" :key="result.event_id">
                <div class="event-listing" @click="openModal(result)">
                  <div class="event-card-parent-container">
                  <div class="event-card-container">
                  <div class="event-card-content-block grid-x">
                    <div class="cell event-info">
                      <div class="event-category-label event-category">{{ result.org }}</div>
                      <h5 class="event-title">{{ result.title }}</h5>
                      <p class="event-date">{{ result.date_start | friendlyDate() }} <span v-if="result.date_start !== result.date_end">- {{ result.date_end | friendlyDate() }}</span></p>
                      <p class="event-location">{{ result.address.street }} {{ result.address.city }}, {{ result.address.state }} {{ result.address.zip }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </slide>
          </carousel>
    <event-modal :data="data" :show="showModal" @close="openModal(result)" v-if="showModal"></event-modal>
    </section>
</template>

<script>

import { Carousel, Slide } from 'vue-carousel';
import { RESOURCES } from './resources-api';
import { EVENTS } from './events-api';
import moment from 'moment';
import EventModal from './event-modal';


export default {
    components: {
        EventModal,
        Carousel,
        Slide,
    },

    props: {

    },

    data: () => ({
        result: '',
        dateRange: [],
        eventIds: [],
        results: [],
        allResults: [],
        noResults: [],
        eventDataArray: [],
        eventResults: [],
        showModal: false,
    }),

    methods: {
        fetchIds() {
          var eventIdsArray = [];
          RESOURCES.get('event-ids.json')
            .then(response => {
              this.eventIds = response.data.data[0].eventIds;
              for (var i = 0; i < this.eventIds.length; i++) {
                var newId = this.eventIds[i].eventId.replace(/-/g , '&eid=');
                eventIdsArray.push(newId);
              }
              eventIdsArray.forEach(id => {
                    EVENTS.get('events-multi/?year=' + id)
                    .then((response, index) => {
                        this.results[index] = response;
                        if (this.results[index].data.length !== 0) {
                                this.eventResults.push(this.results[index].data[0]);
                              }
                        });
                    });
              });
        },

        openModal(data) {
            this.data = data;
            this.showModal = !this.showModal;
        },
    },

    created() {
        this.fetchIds();

    },

    filters: {
        friendlyDate(value) {
            return moment(value).format('ll');
        },
    },

};
</script>
