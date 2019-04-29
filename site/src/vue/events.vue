<template>

    <section id="events-search" class="grid-container grid-container-padded align-center">
      <div class="search-container">
        <div class="filters-toggler">
            <a class="filter-toggle" href="#">
              <span class="more" v-bind:class="[hideClassMore]"><img src="/images/plus.svg" alt="+"> More Filters</span>
              <span class="less" v-bind:class="[hideClassLess]"><img src="/images/minus.svg" alt="-"> Less Filters</span>
            </a>
        </div>

        <form class="search-form" @submit.prevent="search">
          <div class="grid-x grid-margin-x">
            <div class="large-3 cell">
            <label>
              <select v-model="queryBuilder.type">
                <option value="" selected disabled>Select Type</option>
                <option value="">All Types</option>
                <option value="ROAD">Road</option>
                <option value="MTN">Mountain</option>
                <option value="TRACK">Track</option>
                <option value="CX">Cyclo-cross</option>
                <option value="BMX">BMX</option>
              </select>
            </label>
            </div>
            <div class="large-4 cell">
              <label>
                <select v-model="queryBuilder.state" name="state" id="state">
                      <option value="" selected>Select State</option>
                      <option value="">All States</option>
                      <option value="AE">Overseas Military</option>
                      <option value="AL">Alabama</option>
                      <option value="AK">Alaska</option>
                      <option value="AZ">Arizona</option>
                      <option value="AR">Arkansas</option>
                      <option value="CA">California</option>
                      <option value="CO">Colorado</option>
                      <option value="CT">Connecticut</option>
                      <option value="DE">Delaware</option>
                      <option value="DC">District Of Columbia</option>
                      <option value="FL">Florida</option>
                      <option value="GA">Georgia</option>
                      <option value="HI">Hawaii</option>
                      <option value="ID">Idaho</option>
                      <option value="IL">Illinois</option>
                      <option value="IN">Indiana</option>
                      <option value="IA">Iowa</option>
                      <option value="KS">Kansas</option>
                      <option value="KY">Kentucky</option>
                      <option value="LA">Louisiana</option>
                      <option value="ME">Maine</option>
                      <option value="MD">Maryland</option>
                      <option value="MA">Massachusetts</option>
                      <option value="MI">Michigan</option>
                      <option value="MN">Minnesota</option>
                      <option value="MS">Mississippi</option>
                      <option value="MO">Missouri</option>
                      <option value="MT">Montana</option>
                      <option value="NE">Nebraska</option>
                      <option value="NV">Nevada</option>
                      <option value="NH">New Hampshire</option>
                      <option value="NJ">New Jersey</option>
                      <option value="NM">New Mexico</option>
                      <option value="NY">New York</option>
                      <option value="NC">North Carolina</option>
                      <option value="ND">North Dakota</option>
                      <option value="OH">Ohio</option>
                      <option value="OK">Oklahoma</option>
                      <option value="OR">Oregon</option>
                      <option value="PA">Pennsylvania</option>
                      <option value="RI">Rhode Island</option>
                      <option value="PR">Puerto Rico</option>
                      <option value="SC">South Carolina</option>
                      <option value="SD">South Dakota</option>
                      <option value="TN">Tennessee</option>
                      <option value="TX">Texas</option>
                      <option value="UT">Utah</option>
                      <option value="VT">Vermont</option>
                      <option value="VA">Virginia</option>
                      <option value="WA">Washington</option>
                      <option value="WV">West Virginia</option>
                      <option value="WI">Wisconsin</option>
                      <option value="WY">Wyoming</option>
                    </select>
              </label>
            </div>
            <div class="large-1 cell text-center">
            <h6 class="form-text">OR</h6>
            </div>
            <div class="large-4 cell">
              <div class="grid-x grid-margin-x">
                <div class="large-6 cell">
                  <input type="text" v-model="queryBuilder.zip" placeholder="Zip Code">
                </div>
                <div class="large-6 cell">
                  <select v-model="queryBuilder.radius">
                    <option value="" selected>Radius</option>
                    <option value="10" selected>10 mile radius</option>
                    <option value="25" selected>25 mile radius</option>
                    <option value="50" selected>50 mile radius</option>
                    <option value="100" selected>100 mile radius</option>
                    <option value="250" selected>250 mile radius</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div class="more-filters" v-bind:style="{ display: moreFiltersDisplay}">

            <div class="grid-x grid-margin-x">
              <div class="large-7 cell">
                <input type="text" id="raceName" v-model="queryBuilder.name" placeholder="Race Name">
              </div>
              <div class="large-5 cell">
                <div class="grid-x grid-margin-x">
                  <div class="large-6 cell">
                    <datepicker v-model="queryBuilder.starts_from" id="eventStartDate" name="eventStartDate" format="yyyy-MM-dd" placeholder="Event Start Date" :language="en" class="vue-date-picker"></datepicker>
                    <!--<select>
                      <option value="" selected>Age</option>
                    </select> -->
                  </div>
                  <div class="large-6 cell">
                    <datepicker v-model="queryBuilder.starts_to" id="eventEndDate" name="eventEndDate" format="yyyy-MM-dd" placeholder="Event End Date" :language="en" class="vue-date-picker"></datepicker>
                    <!-- <select>
                      <option value="" selected>Distance</option>
                    </select> -->
                  </div>
                </div>

              </div>
            </div>
          <!--  <div class="grid-x grid-margin-x">
              <div class="large-6 cell">
                <datepicker v-model="queryBuilder.starts_from" id="eventStartDate" name="eventStartDate" format="yyyy-MM-dd" placeholder="Event Start Date" :language="en" class="vue-date-picker"></datepicker>
              </div>
              <div class="large-6 cell">
                <datepicker v-model="queryBuilder.starts_to" id="eventEndDate" name="eventEndDate" format="yyyy-MM-dd" placeholder="Event End Date" :language="en" class="vue-date-picker"></datepicker>
              </div>
            </div> -->
          </div>

        <div class="grid-x grid-margin-x grid-padding-x">
            <div class="large-6 cell">
              <!-- <label>
                <select v-model="queryBuilder.type">
                  <option value="" selected disabled>Select Type</option>
                  <option value="ROAD">Road</option>
                  <option value="MTN">Mountain</option>
                  <option value="TRACK">Track</option>
                  <option value="CX">Cyclo-cross</option>
                  <option value="BMX">BMX</option>
                </select>
              </label> -->
            </div>
          </div>
        <!--  <div class="more-filters">
            <div class="grid-x grid-margin-x grid-padding-x">
              <div class="large-4 cell">
                 <label>
                  <select v-model="queryBuilder.state" name="state" id="state"><option value="" selected disabled>Select State</option>
                        <option value="AE">Overseas Military</option>
                        <option value="AL">Alabama</option>
                        <option value="AK">Alaska</option>
                        <option value="AZ">Arizona</option>
                        <option value="AR">Arkansas</option>
                        <option value="CA">California</option>
                        <option value="CO">Colorado</option>
                        <option value="CT">Connecticut</option>
                        <option value="DE">Delaware</option>
                        <option value="DC">District Of Columbia</option>
                        <option value="FL">Florida</option>
                        <option value="GA">Georgia</option>
                        <option value="HI">Hawaii</option>
                        <option value="ID">Idaho</option>
                        <option value="IL">Illinois</option>
                        <option value="IN">Indiana</option>
                        <option value="IA">Iowa</option>
                        <option value="KS">Kansas</option>
                        <option value="KY">Kentucky</option>
                        <option value="LA">Louisiana</option>
                        <option value="ME">Maine</option>
                        <option value="MD">Maryland</option>
                        <option value="MA">Massachusetts</option>
                        <option value="MI">Michigan</option>
                        <option value="MN">Minnesota</option>
                        <option value="MS">Mississippi</option>
                        <option value="MO">Missouri</option>
                        <option value="MT">Montana</option>
                        <option value="NE">Nebraska</option>
                        <option value="NV">Nevada</option>
                        <option value="NH">New Hampshire</option>
                        <option value="NJ">New Jersey</option>
                        <option value="NM">New Mexico</option>
                        <option value="NY">New York</option>
                        <option value="NC">North Carolina</option>
                        <option value="ND">North Dakota</option>
                        <option value="OH">Ohio</option>
                        <option value="OK">Oklahoma</option>
                        <option value="OR">Oregon</option>
                        <option value="PA">Pennsylvania</option>
                        <option value="RI">Rhode Island</option>
                        <option value="PR">Puerto Rico</option>
                        <option value="SC">South Carolina</option>
                        <option value="SD">South Dakota</option>
                        <option value="TN">Tennessee</option>
                        <option value="TX">Texas</option>
                        <option value="UT">Utah</option>
                        <option value="VT">Vermont</option>
                        <option value="VA">Virginia</option>
                        <option value="WA">Washington</option>
                        <option value="WV">West Virginia</option>
                        <option value="WI">Wisconsin</option>
                        <option value="WY">Wyoming</option>
                      </select>
                </label>
              </div>
              <div class="large-4 cell">
                <label>
                  <input type="text" v-model="queryBuilder.zip" placeholder="Zip Code" />
                </label>
              </div>
            </div>
          </div> -->
          <div class="grid-x grid-margin-x grid-padding-x btn-container">
            <div class="large-12 cell text-center">
              <button class="btn-search">Search</button>
              <a @click="clearFiltersButton()" class="clear-filters">Clear All Filters</a>
            </div>
          </div>

          <div class="grid-x grid-margin-x grid-padding-x">
            <div class="large-12 cell">
                <div class="map-switch">
                    <span class="switch-label-map">Map</span>
                    <div class="switch">
                      <input type="radio" class="switch-input" name="view2" value="mapon" id="mapon" checked>
                      <label for="mapon" class="switch-label switch-label-off">ON</label>
                      <input type="radio" class="switch-input" name="view2" value="mapoff" id="mapoff">
                      <label for="mapoff" class="switch-label switch-label-on">OFF</label>
                      <span class="switch-selection"></span>
                    </div>
                </div>
            </div>
          </div>
          <div class="grid-x grid-margin-x grid-padding-x" id="without-map">

            <div class="large-12 cell" v-if="results.length === 0">
              <div class="grid-x grid-margin-x grid-padding-x">
                <div class="large-12 no-event-found">
                  <span class="no-event">No Event Found</span>
                </div>
              </div>
            </div>

            <div class="large-12 cell" v-else>

                <div class="grid-x grid-margin-x grid-padding-x">
                  <div class="large-6 cell events-left">
                    <div v-for="result in results.slice(pageStart, (pageEnd - 4))" :key="'event-id-' + result.event_id" class="event-listing" @click="openModal(result)">
                        <span class="event-heading">{{ result.title }}</span>
                        <div class="event-info">
                          <span class="race-event">Race Event</span>
                          <span class="pipe">|</span>
                          <span class="road">{{ result.org }}</span>
                          <span class="pipe">|</span>
                          <span>Status:</span>
                          <span v-if="result.status == 0" class="status-cancel">Cancelled</span>
                          <span v-else-if="result.status == 1">Permit in process</span>
                          <span v-else-if="result.status == 2">Application in process</span>
                          <span v-else-if="result.status == 3">Permitted</span>
                        </div>
                        <span class="event-date" v-if="result.date_start == result.date_end">{{ result.date_start | friendlyDate() }}</span>
                        <span class="event-date" v-else>{{ result.date_start | friendlyDate() }} - {{ result.date_end | friendlyDate() }}</span>
                        <span class="event-location">{{ result.address.street }}<span v-if="result.address.street !==''" class="event-comma">,</span> {{ result.address.city }}, {{ result.address.state }} {{ result.address.zip }}</span>
                    </div>
                  </div>
                  <div class="large-6 cell events-right">
                      <div v-for="result in results.slice((pageStart + 4), pageEnd)" :key="'event-id-' + result.event_id" class="event-listing" @click="openModal(result)">
                          <span class="event-heading">{{ result.title }}</span>
                          <div class="event-info">
                            <span class="race-event">Race Event</span>
                            <span class="pipe">|</span>
                            <span class="road">{{ result.org }}</span>
                            <span class="pipe">|</span>
                            <span class="permit">Permit #</span>
                          </div>
                          <span class="event-date" v-if="result.date_start == result.date_end">{{ result.date_start | friendlyDate() }}</span>
                          <span class="event-date" v-else>{{ result.date_start | friendlyDate() }} - {{ result.date_end | friendlyDate() }}</span>
                          <span class="event-location">{{ result.address.street }}<span v-if="result.address.street !==''" class="event-comma">,</span> {{ result.address.city }}, {{ result.address.state }} {{ result.address.zip }}</span>
                      </div>
                  </div>
                </div>

                <ul class="pagination center" v-if="results.length > 0">
                  <li :class="['pagination-previous', {'disabled' : page === 1}]">
                      <a @click="setPage(page-1)" aria-label="Next page" v-if="page !== 1">
                          Previous <span class="show-for-sr">page</span>
                      </a>
                      <span v-else>
                          Previous <span class="show-for-sr">page</span>
                      </span>
                  </li>
                  <li v-for="i in pageCount" :key="'page-' + i" :class="[{ 'current' : i === page}]">
                      <a @click="setPage(i)" :aria-label="'Page' + i"><span class="show-for-sr" v-if="i === page">You're on page</span>{{ i }}</a>
                  </li>
                  <li :class="['pagination-next', {'disabled' : page === pageCount}]">
                      <a @click="setPage(page+1)" aria-label="Next page" v-if="page !== pageCount">
                          Next <span class="show-for-sr">page</span>
                      </a>
                      <span v-else>
                          Next <span class="show-for-sr">page</span>
                      </span>
                  </li>
                </ul>
            </div>
          </div>
          <div class="grid-x grid-margin-x grid-padding-x" id="with-map">

                <google-maps :initial-markers="results"></google-maps>

                <div class="large-6 medium-6 cell large-pull-6 medium-pull-6" v-if="results.length === 0">
                    <div id="loader" v-bind:class="{ active: showLoader }">
                      <div class="half-circle-spinner">
                        <div class="circle circle-1"></div>
                        <div class="circle circle-2"></div>
                      </div>
                    </div>
                  <div class="no-event-found">
                    <span class="no-event">No Event Found</span>
                  </div>
                </div>

                <div class="large-6 medium-6 cell large-pull-6 medium-pull-6" v-else>
                    <div id="loader" v-bind:class="{ active: showLoader }">
                    <div class="half-circle-spinner">
                      <div class="circle circle-1"></div>
                      <div class="circle circle-2"></div>
                    </div>
                  </div>
                    <div class="event-listings-container">
                        <div class="event-listings scroll-pane">
                            <div v-for="result in results.slice(pageStart, pageEnd)" :key="'event-id-' + result.event_id" class="event-listing" @click="openModal(result)">
                                <span class="event-heading">{{ result.title }}</span>
                                <div class="event-info">
                                    <span class="race-event">Race Event</span>
                                    <span class="pipe">|</span>
                                    <span class="road">{{ result.org }}</span>
                                    <span class="pipe">|</span>
                                    <span>Status:</span>
                                    <span v-if="result.status == 0" class="status-cancel">Cancelled</span>
                                    <span v-else-if="result.status == 1">Permit in process</span>
                                    <span v-else-if="result.status == 2">Application in process</span>
                                    <span v-else-if="result.status == 3">Permitted</span>
                                </div>
                                <span class="event-date" v-if="result.date_start == result.date_end">{{ result.date_start | friendlyDate() }}</span>
                                <span class="event-date" v-else>{{ result.date_start | friendlyDate() }} - {{ result.date_end | friendlyDate() }}</span>
                                <span class="event-location">{{ result.address.street }}<span class="event-comma" v-if="result.address.street !==''">,</span> {{ result.address.city }}, {{ result.address.state }} {{ result.address.zip }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="grid-x align-center">
                    <ul class="pagination center" v-if="results.length > 0">
                        <li :class="['pagination-previous', {'disabled' : page === 1}]">
                            <a @click="setPage(page-1)" aria-label="Next page" v-if="page !== 1">Previous <span class="show-for-sr">page</span></a>
                            <span v-else>Previous <span class="show-for-sr">page</span></span>
                        </li>
                        <li v-if="pageCount > 5 && currentPage > 1">
                            <a @click="setPage(1)" :aria-label="'Page' + pageCount">1<span v-if="currentPage > 2"> ...</span></a>
                        </li>
                        <li v-for="i in pageCount" :key="'page-' + i" :class="[{ 'current' : i === page}]" v-if="(i >= currentPage && i <= (parseInt(currentPage) + parseInt(5)) || ((parseInt(currentPage) > parseInt(pageCount) - 5) && i >=  parseInt(pageCount) - 5 ))">
                            <a @click="setPage(i)" :aria-label="'Page' + i"><span class="show-for-sr" v-if="i === page">You're on page</span>{{ i }}</a>
                        </li>
                        <li v-if="pageCount > 5 && currentPage < (pageCount - 5)">
                            <a @click="setPage(pageCount)" :aria-label="'Page' + pageCount">... {{pageCount}}</a>
                        </li>
                        <li :class="['pagination-next', {'disabled' : page === pageCount}]">
                            <a @click="setPage(page+1)" aria-label="Next page" v-if="page !== pageCount">
                                Next <span class="show-for-sr">page</span>
                            </a>
                            <span v-else>
                                Next <span class="show-for-sr">page</span>
                            </span>
                        </li>
                    </ul>
                  </div>
                </div>
          </div>
        </form>
      </div>
      <event-modal :data="data" :show="showModal" @close="openModal(data)" v-if="showModal"></event-modal>
    </section>

</template>

<script>
import axios from 'axios';
import { EVENTS } from './events-api';
import moment from 'moment';
//import { extendMoment } from 'moment-range';
import EventModal from './event-modal';
import GoogleMaps from './google-maps';
import Datepicker from 'vuejs-datepicker';
import { en } from 'vuejs-datepicker/dist/locale';

// Google API Key ( FOR NOW ! )
// AIzaSyAYUYnArEE2MHmXmdEz-t8K_NHKcsoR0fI

export default {
    components: {
        EventModal,
        GoogleMaps,
        Datepicker,
    },

    props: {

    },

    data: () => ({
        selected: 'panel-1',
        panel: null,
        isActive: false,
        isLoggedIn: false,
        results: [],
        en: en,
        data: {},
        pageCount: 0,
        page: 1,
        currentPage: 1,
        showButtonText: true,
        showLoader: false,
        showModal: false,
        moreFiltersDisplay: 'none',
        hideClassMore: false,
        hideClassLess: 'hide',
        pageStart: 0,
        pageEnd: 8,
        pageNumBase: 0,
        jumpPage: 1,
        queryBuilder: {
            name: '',
            type: '',
            state: '',
            starts_from: '',
            starts_to: '',
            zip: '',
            radius: '',
        },
        initialParamsCheck: true,
        initialParams: false,
    }),

    methods: {
        clearFiltersButton() {
          this.clearFilters();
          this.search();
        },

        clearFilters() {
            this.queryBuilder.name = '';
            this.queryBuilder.type = '';
            this.queryBuilder.state = '';
            this.queryBuilder.starts_from = '';
            this.queryBuilder.starts_to = '';
            this.queryBuilder.zip = '';
            this.queryBuilder.radius = '';
        },

        jumpPageTo() {
            if (this.jumpPage > this.pageCount) {
                return false;
            }
            this.currentPage = parseInt(this.jumpPage);
            this.setPage(parseInt(this.jumpPage));
        },

        fetchData() {
            this.showLoader = true;
            EVENTS.get('events-multi/?source=initial')
            .then((response) => {
                this.results.splice(0, this.results.length, ...response.data);

                // set showDetails for the results;
                this.results.forEach((element) => {
                    this.$set(element, 'showDetails', false);
                    // need to get the dates
                    this.$set(element, 'raceDates', false);
                    this.$set(element, 'singleDaySelection', '');
                });
                this.showLoader = false;

            })
            .then(() => {
                this.pageCount = Math.ceil(this.results.length / 8);
            });
        },

        getParameterByName(name, url) {
            url = url ? url : window.location.href;
            name = name.replace(/\[\]]/g, '\\$&');

            var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
                results = regex.exec(url);

            if (!results) return null;
            if (!results[2]) return '';

            return decodeURIComponent(results[2].replace(/\+/g, ' '));
        },

        isSelected(panel) {
            if (!this.selected) {
                return false;
            }

            return this.selected === panel;
        },

        openModal(data) {
            this.data = data;
            this.showModal = !this.showModal;
        },

        search() {
            this.isActive = true;
            this.showLoading = true;
            this.showButtonText = false;
            this.showLoader = true;
            // setting pages variable

            //var pages = 0;
            //var activeResults = true;
            var starts_from = this.queryBuilder.starts_from;
            var starts_to = this.queryBuilder.starts_to;

            this.queryBuilder.starts_from ? this.queryBuilder.starts_from = moment(starts_from).format('YYYY/MM/DD') : '';
            this.queryBuilder.starts_to ? this.queryBuilder.starts_to = moment(starts_to).format('YYYY/MM/DD') : '';

            var queryBuilder = this.queryBuilder;

            var searchQuery = Object.keys(queryBuilder).map(function (key) {
                return encodeURIComponent(key) + '=' + encodeURIComponent(queryBuilder[key]);
            }).join('&');

            if (!this.initialParamsCheck) {
                var urlParams = Object.keys(queryBuilder).filter(function (key) {
                    return (encodeURIComponent(queryBuilder[key]) !== '');
                }).map(function (key) {
                    return encodeURIComponent(key) + '=' + encodeURIComponent(queryBuilder[key]);
                }).join('&');
                if (urlParams && urlParams.length > 0) {
                    history.pushState(null, null, location.origin + '' + location.pathname + '?' + urlParams);
                } else {
                    history.pushState(null, null, location.origin + '' + location.pathname);
                }
            }

            EVENTS.get('events-multi/?' + searchQuery)
                .then((response) => {
                      this.results.splice(0, this.results.length, ...response.data);

                    // set showDetails for the results;
                    this.results.forEach((element) => {
                        this.$set(element, 'showDetails', false);
                        // need to get the dates
                        this.$set(element, 'raceDates', false);
                        this.$set(element, 'singleDaySelection', '');
                    });
                  this.showLoader = false;

                })
                .then(() => {
                    this.setPage(1);
                    this.pageCount = Math.ceil(this.results.length / 8);
                });

        },

        select(panel) {
            this.selected = panel || null;
            this.panel = panel || null;
        },

        setPage(page) {
            this.currentPage = parseInt(page);
            this.pageStart = (page - 1) * 8;
            this.pageEnd = 8 * page;
            this.page = page;
        },

        historyBackHandler(e) {
            this.clearFilters();
            this.getUrlParams();
            this.search();
        },

        getUrlParams() {
            if (location.search) {
                var parts = location.search.substring(1).split('&');
                for (var i = 0; i < parts.length; i++) {
                    var items = parts[i].split('=');
                    if (!items[0] || !items[1] || items[0] === '' || items[1] === '') continue;
                    if (this.queryBuilder.hasOwnProperty(items[0])) {
                        this.queryBuilder[items[0]] = decodeURIComponent(items[1]);
                        if (this.initialParamsCheck) {
                            this.initialParams = true;
                        }
                    }
                }
            }
        },

    },

    created() {

        this.eventStartDate = this.getParameterByName('start') ? this.getParameterByName('start') : '';
        this.eventEndDate = this.getParameterByName('end') ? this.getParameterByName('end') : '';
        this.getUrlParams();
        if (this.initialParams) {
            if (this.queryBuilder.name !== '' ||
            this.queryBuilder.starts_from !== '' ||
            this.queryBuilder.starts_to !== '') {
                this.moreFiltersDisplay = 'block';
                this.hideClassMore = 'hide';
                this.hideClassLess = false;
            }
            this.search();
        } else {
            this.fetchData();
        }
        this.initialParamsCheck = false;

        window.onpopstate = this.historyBackHandler;

        // check if a user is logged in:
        axios.get('/API/profile/')
            .then(response => {
                if (response.data.first_name) {
                    this.isLogged = true;
                }
            });
    },

    filters: {
        friendlyDate(value) {
            return moment(value).format('dddd, MMMM D, YYYY');
        },
    },

};
</script>
