<template>
    <div :class="['modal-wrapper', { 'usac-modal-open' : show }]" @click.self="closeModal()">
        <div class="reveal modal" id="event-modal">
        <h1>{{ data.title }}</h1>
        <p class="modal-date" v-if="data.date_start == data.date_end">Dates: {{ data.date_start | printedDate }}</p>
        <p class="modal-date" v-else>Dates: {{ data.date_start | printedDate }} - {{ data.date_end | printedDate }}</p>
        <p>Address: <br> {{ data.address.street }} {{ data.address.city }}, {{ data.address.state }} {{ data.address.zip }}</p>
        <p>Status:
            <span v-if="data.status == 0" class="status-cancel">Cancelled</span>
            <span v-else-if="data.status == 1">Permit in process</span>
            <span v-else-if="data.status == 2">Application in process</span>
            <span v-else-if="data.status == 3">Permitted</span>
        </p>
        <div v-if="data.date_end >= currentDate" class="grid-x grid-margin-x date-area">
            <div class="large-12 cell">
                <p class="one-day-permit">Get One Day License:</p>
            </div>
            <div class="cell large-8">
                <select class="date-select" v-model="selectedDate">
                    <option value selected>Select Date</option>
                    <template v-if="data.series_dates">
                        <option v-for="(date, i) in data.series_dates" v-if="date >= currentDate" :key="'date-' + i" :value="$options.filters.formatDate(date)">{{ date | formatDate }}</option>
                    </template>
                    <template v-else>
                        <template v-if="data.date_start >= currentDate"><option :value="$options.filters.formatDate(data.date_start)">{{ data.date_start | formatDate }}</option></template>
                        <template v-if="data.date_start != data.date_end"><option :value="$options.filters.formatDate(data.date_end)">{{ data.date_end | formatDate }}</option></template>
                    </template>
                </select>
                <a v-show="selectedDate" class="btn-lg inverse register-btn buy-btn" :href="'/user-login?Return_URL=https://legacy.usacycling.org/myusac/index.php?pagename=registration%26eventid=' + data.event_id + '%26year=' + data.event_year + '%26mode=add_oneday%26day=' + selectedDate">BUY</a>
            </div>
        </div>
        <div class="grid-x grid-margin-x register-area">
            <div class="large-6 medium-6 cell text-left">
                <a class="btn-lg event-btn" :href="eventFlyerURL" target="_blank">View Event Flyer</a>
                <a class="btn-lg event-btn" v-if="data.web_page" :href="'http://' + data.web_page" target="_blank">View Event Website</a>
                <a class="btn-lg event-btn ceo" v-if="data.email" :href="'mailto:' + data.email" target="_blank">Contact Event Organizer</a>
            </div>
            <!--<a href="" target="_blank" style="position: relative; float: left; display: inline-block; background-color: rgb(214, 11, 48); padding: 8px; color: rgb(255, 255, 255); margin-left: 4px;">GO</a>-->
            <div class="large-6 medium-6 cell text-right">
              <div v-if="data.date_start >= currentDate">
                <a v-if="data.reg_url && data.usac_registration == 'N'" class="btn-lg inverse register-btn" :href="'http://' + data.reg_url" target="_blank">Register for event</a>
                <a v-else class="btn-lg inverse register-btn" :href="'/user-login?Return_URL=https://legacy.usacycling.org/myusac/index.php?pagename=registration%26eventid=' + data.event_id + '%26year=' + data.event_year" target="_blank">Register for event</a>
              </div>
                <div v-else>
                  <a class="btn-lg inverse register-btn" :href="'https://legacy.usacycling.org/results/index.php?year=' + data.event_year + '&amp;id=' + data.event_id" target="_blank">Results</a>
                </div>
            </div>
        </div>
        <button class="close-button" aria-label="Close modal" type="button" @click="closeModal()">
            <span aria-hidden="true"><img src="/images/x.svg" alt="X"></span>
        </button>
        </div>
        <div class="reveal-overlay" style="display: block;"></div>
    </div>
</template>

<script>

//import { EVENTS } from './events-api';
import moment from 'moment';
import { extendMoment } from 'moment-range';

export default {
    props: {
        data: {},
        show: true,
    },

    data: () => ({
        dateRange: [],
        selectedDate: '',
        currentDate: '',

    }),

    computed: {
        eventFlyerURL: function () {
            var tmpURL = this.data.flyer_url;
            if (this.validateURL(tmpURL)) {
                return tmpURL;
            } else {
                return 'https://legacy.usacycling.org/events/getflyer.php?permit=' + this.data.id;
            }
        },
    },

    methods: {
        closeModal() {
            this.$emit('close', this.data);
        },

        createRange() {
            const momentExtended = extendMoment(moment);
            if (this.data.date_start && this.data.date_end) {
                const startDate = momentExtended(this.data.date_start, 'YYYY-MM-DD');
                const endDate = momentExtended(this.data.date_end, 'YYYY-MM-DD');
                const range = momentExtended.range(startDate, endDate);

                const dates = Array.from(range.by('days'));
                dates.map(m => m.format('YYYY-MM-DD'));
                this.dateRange = dates;
            }
        },
        getDate() {
            const now = moment().format('YYYY-MM-DD');
            this.currentDate = now;
        },
        validateURL(str) {
            var regexp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
            if (regexp.test(str)) {
                return true;
            } else {
                return false;
            }
        },
    },

    filters: {
        formatDate(value) {
            return moment(value).format('YYYY-MM-DD');
        },
        printedDate(value) {
            return moment(value).format('LL');
        },
    },

    created() {
        this.createRange();
        this.getDate();

        if (this.data.series_dates) {
            return false;
        } else {
            this.selectedDate = moment(this.data.date_start).format('YYYY-MM-DD');
        }
    },
};
</script>
