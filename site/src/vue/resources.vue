<template>
<section id="resources-search" class="grid-container align-center">
<div class="grid-x grid-padding-x align-middle">
<div class="cell large-8 hide-for-small-only">
  <!-- loop over all letters, set the ones active which actually contain entries -->
  <ul class="pagination">
            <li v-for="letter in alphabet" :key="letter.id" :class="[{ 'active' : letter.count > 0 }, { 'selected' : isSelected(letter.title) }]">
      <a @click="filterByLetters(letter.title)" :aria-label="'Search' + letter.title">{{ letter.title }}</a>
    </li>
  </ul>
</div>
<div class="cell large-4 large-text-right search-area">
  <form class="search-form" @submit.prevent="searchResources()">
    <input type="search" id="searchResource" v-model="searchResource" placeholder="Search">
    <button type="submit" id="searchSubmit"><img src="/images/search.svg" alt="search"></button>
  </form>
  <button class="filter-toggle-resources text-right"><img src="/images/filter-toggle.png" alt="Filter Toggle"></button>
</div>
</div>
  <div class="grid-x grid-padding-x results-area">
    <div class="large-4 cell filters-area">
      <div class="mobile-filter text-center">
        <span class="mobile-filter-title">Filter</span>
      </div>

      <span class="filter-heading">Types</span>
      <div class="checkboxes">
        <div class="styled-checkbox" v-for="type in setTypes" :key="'type-' + type.id">
          <input type="checkbox" class="filter-checkbox" :id="'type-' + type.id" :value="type.title" @change="filterByTypes(type.id)" :checked="filters['type'].indexOf(parseInt(type.id)) !== -1">
          <label :for="'type-' + type.id">{{ type.title }}</label>
        </div>
      </div>

      <span class="filter-heading">Categories</span>
      <div class="checkboxes">
        <div class="styled-checkbox" v-for="category in setCategories" :key="'category-' + category.id">
          <input type="checkbox" class="filter-checkbox" :id="'category-' + category.id" :value="category.title" @change="filterByCategories(category.id)" :checked="filters['category'].indexOf(parseInt(category.id)) !== -1">
          <label :for="'category-' + category.id">{{ category.title }}</label>
        </div>
      </div>

      <div class="mobile-filter button-area text-center">
        <button class="btn-lg btn-clear" @click="clearFilters()"><span>Clear</span></button>
        <button class="btn-lg btn-apply">Apply</button>
      </div>
    </div>

    <div class="large-8 cell resources-output">
      <div class="grid-x grid-padding-x">
        <template v-if="!this.dataFetched">
                        <div class="large-12 cell">
                        <span class="nothing-found">{{ this.dataStatusMessage }}</span>
                        </div>
        </template>
        <template v-else-if="(setResources.length === 0 || this.totalFilteredResources === 0) && this.dataFetched">
                        <div class="large-12 cell">
                        <span class="nothing-found">No resources found using your search criteria</span>
                        </div>
        </template>
        <template v-else>
                        <div class="large-6 cell">
                            <div v-for="letter in setResources.slice(0, filteredResourcesMidpointReference)" :key="'letter-id-' + letter.id">
                              <template v-if="letter.show">
                                <div class="resource-letter">{{ letter.title }}</div>
                                <div class="resource-links">
                                    <a v-for="resource in letter.resources" :key="'resource-id-' + resource.id" :href="resource.asset" target="_blank">
                                        <template v-if="resource.show">
                                          {{ resource.title }}
                                        </template>
                                    </a>
                                </div>
                              </template>
                            </div>
                        </div>
                        <div class="large-6 cell">
                            <div v-for="letter in setResources.slice(filteredResourcesMidpointReference, totalResources)" :key="'letter-id-' + letter.id">
                              <template v-if="letter.show">
                                <div class="resource-letter">{{ letter.title }}</div>
                                <div class="resource-links">
                                    <a v-for="resource in letter.resources" :key="'resource-id-' + resource.id" :href="resource.asset" target="_blank">
                                        <template v-if="resource.show">
                                          {{ resource.title }}
                                        </template>
                                    </a>
                                </div>
                              </template>
                            </div>
                        </div>
        </template>
      </div>
    </div>
  </div>
</section>
</template>

<script>
import {
  RESOURCES,
} from './resources-api';

export default {
  props: {

    },
    data: () => ({
        alphabet: [],
        types: [],
        categories: [],
        resources: [],
        totalFilteredResources: 0,
        totalFilteredResourceLetters: 0,
        selected: '',
        filters: {
            title: '',
            category: [],
            type: [],
        },
        searchResource: '',
        dataFetched:false,
        dataStatusMessage:'Loading Resources...',
        urlVars: {
          category:[],
          type:[],
        },
    }),
    computed: {

    setTypes: function () {
      return this.types.filter(type => type.total > 0);
    },

    setCategories: function () {
      return this.categories.filter(category => category.total > 0);
    },

    setResources: function () {
      var results = this.resources.filter(resource => resource.count > 0);
      this.totalFilteredResources = 0;
      this.totalFilteredResourceLetters = 0;
      var resourceArray = [];
      var title = typeof this.filters !== 'undefined' && 'title' in this.filters ? this.filters.title : null;
      var category = typeof this.filters !== 'undefined' && 'category' in this.filters ? this.filters.category : [];
      var type = typeof this.filters !== 'undefined' && 'type' in this.filters ? this.filters.type : [];
      var tmpLetterFiltered = false;
      if (title && title.length !== 0) { // check if title was filtered
        tmpLetterFiltered = true;
      }
      var max = results.length;
      for (var i = 0; i < max; i++) {
        var letter = results[i];
        letter['show'] = false;
        // check if title filter matches
        if (tmpLetterFiltered) {
          if (results[i].title === title) {
            letter['show'] = true;
          } else {
            continue;
          }
        }

        //check if filter by category
        var resourcesBuilder = [];
        var tmpShowLetter = false;
        //var l = this[i].resources.length; // ? length limiter based on previous resources length
        var l = results[i].resources.length;
        for (var x = 0; x < l; x++) {

          resourcesBuilder.push(results[i].resources[x]);  

          // updated category and type filtering to accomodate array of multiple filters from data
          if ((category.length !== 0 || type.length !== 0) && 
            letter !== null) {
            if ('categories' in results[i].resources[x] &&
              'types' in results[i].resources[x] &&
              Array.isArray(results[i].resources[x].categories) &&
              Array.isArray(results[i].resources[x].types)) {
                var tmpCategoryFound = false;
                if (results[i].resources[x].categories.length > 0) {
                  for (var xa = 0; xa < results[i].resources[x].categories.length; xa++) {
                    if (category.indexOf(parseInt(results[i].resources[x].categories[xa].id,10)) !== -1) {
                      tmpCategoryFound = true;
                      break;
                    }
                  }
                }
                var tmpTypeFound = false;
                if (!tmpCategoryFound && results[i].resources[x].types.length > 0) {
                  for (var xb = 0; xb < results[i].resources[x].types.length; xb++) {
                    if (type.indexOf(parseInt(results[i].resources[x].types[xb].id,10)) !== -1) {
                      tmpTypeFound = true;
                      break;
                    }
                  }
                }
                if (tmpCategoryFound || tmpTypeFound) {
                  resourcesBuilder[x]['show'] = true;
                  tmpShowLetter = true;
                  this.totalFilteredResources++;
                } else {
                  resourcesBuilder[x]['show'] = false;
                }
            } else {
              resourcesBuilder[x]['show'] = false;
            }
          } else {
              resourcesBuilder[x]['show'] = true;
              tmpShowLetter = true;
              this.totalFilteredResources++;
            }
        } 

        if (tmpShowLetter) {
          this.totalFilteredResourceLetters++;
          letter['show'] = true;
        }

        if (letter !== null && resourcesBuilder.length !== 0) {
          letter.resources = resourcesBuilder;
          resourceArray.push(letter);
        }
      }
      return resourceArray;
    },
    totalResources: function () {
      return this.setResources.length;
    },
    filteredResourcesMidpointReference: function () {
      var tmpRef = 0;
      var tmpCount = 0;
      for (var i = 0; i < this.setResources.length; i++) {
        tmpRef++;
        for (var x = 0; x < this.setResources[i].resources.length; x++) {
          if (this.setResources[i].resources[x].show === true) {
            tmpCount++;
          }
        }
        if (tmpCount >= Math.ceil(this.totalFilteredResources / 2)) {
          break;
        }
      }
      return tmpRef;
    },

  },
  methods: {
    clearFilters() {
      this.filters.title = '';
      this.filters.category = [];
      this.filters.type = [];
      this.updateUrlParams();
    },

    fetchNav() {
      RESOURCES.get('by-letter.json')
        .then((response) => {
          this.alphabet = response.data.data;
          this.resources = response.data.data;
          this.dataFetched = true;
        });
    },

    fetchTypes() {
      RESOURCES.get('types.json')
        .then((response) => {
          this.types = response.data.data;
          this.filterTypesFromUrlParams();
        });
    },

    fetchCategories() {
      RESOURCES.get('categories.json')
        .then((response) => {
          this.categories = response.data.data;
          this.filterCategoriesFromUrlParams();
        });
    },

    filterByLetters(letter) {
      this.filters.title === letter ? this.filters.title = '' : this.filters.title = letter;
      this.select(letter);

    },

    filterByTypes(type) {
        if (this.filters.type.indexOf(parseInt(type)) !== -1) {
            this.filters.type = this.filters.type.filter(item => !type.includes(item));
        } else {
            this.filters.type.push(parseInt(type));
        }
        this.updateUrlParams();
    },

    filterByCategories(category) {
        if (this.filters.category.indexOf(parseInt(category)) !== -1) {
            this.filters.category = this.filters.category.filter(item => !category.includes(item));
        } else {
            this.filters.category.push(parseInt(category));
        }
        this.updateUrlParams();
    },

    filterCategoriesFromUrlParams() {
      this.filters.category = [];
      if (this.urlVars.category && this.urlVars.category.length > 0) { 
        for (var cat = 0; cat < this.urlVars.category.length; cat++) {
          if (!this.urlVars.category[cat] || this.urlVars.category[cat].length === 0) continue;
          var urlCategory = this.urlVars.category[cat];
          if (isNaN(urlCategory)) { // convert url categories to id number
            urlCategory = this.formatFilter(urlCategory);
            for (var i = 0; i < this.categories.length; i++) {
              if (urlCategory === this.formatFilter(this.categories[i].slug)) {
                urlCategory = this.categories[i].id;
                break;
              }
            }
          }
          this.filters.category.push(parseInt(urlCategory));
        }
      }
    },

    filterTypesFromUrlParams() {
      this.filters.type = [];
      if (this.urlVars.type && this.urlVars.type.length > 0) { 
        for (var typ = 0; typ < this.urlVars.type.length; typ++) {
          if (!this.urlVars.type[typ] || this.urlVars.type[typ].length === 0) continue;
          var urlType = this.urlVars.type[typ];
          if (isNaN(urlType)) { // convert url types to id number
            urlType = this.formatFilter(urlType);
            for (var i = 0; i < this.types.length; i++) {
              if (urlType === this.formatFilter(this.types[i].slug)) {
                urlType = this.types[i].id;
                break;
              }
            }
          }
          this.filters.type.push(parseInt(urlType));
        }
      }
    },

    updateUrlParams() {
      this.urlVars = { 
        category:[],
        type:[],
      };
      var urlQuery = '?';
      if (this.filters.category.length > 0 && this.filters.category[0] && this.filters.category[0].length !== 0) {
        urlQuery += 'category=';
        for (var i = 0; i < this.filters.category.length; i++) {
          if (!this.filters.category[i] || this.filters.category[i].length === 0) continue;
          var urlCategory = parseInt(this.filters.category[i],10);
          for (var j = 0; j < this.categories.length; j++) { // convert from number to slug
            if (urlCategory === parseInt(this.categories[j].id,10)) {
              urlCategory = this.categories[j].slug;
              break;
            }
          }
          if (i > 0) urlQuery += '&';
          urlQuery += urlCategory;
        }
      }
      if (this.filters.type.length > 0 && this.filters.type[0] && this.filters.type[0].length !== 0) {
        if (urlQuery.length > 1) urlQuery += ';';
        urlQuery += 'type=';
        for (i = 0; i < this.filters.type.length; i++) {
          if (!this.filters.type[i] || this.filters.type[i].length === 0) continue;
          var urlType = parseInt(this.filters.type[i],10);
          for (j = 0; j < this.types.length; j++) { // convert from number to slug
            if (urlType === parseInt(this.types[j].id,10)) {
              urlType = this.types[j].slug;
              break;
            }
          }
          if (i > 0) urlQuery += '&';
          urlQuery += urlType;
        }
      }
      if (urlQuery.length > 1) {
        history.pushState(null, null, location.origin + '' + location.pathname + '' + urlQuery);
      } else {
        history.pushState(null, null, location.origin + '' + location.pathname);
      }
    },

    historyBackHandler(e) {
      this.urlVars = {
        category:[],
        type:[],
      };
      this.getUrlParams();
      this.filterCategoriesFromUrlParams();
      this.filterTypesFromUrlParams();
    },

    isSelected(letter) {
        if (!this.selected) {
            return false;
        }

        return this.selected === letter;
    },

    searchResources() {
        RESOURCES.get('search.json?q=' + this.searchResource)
        .then((response) => {
            this.resources = response.data.data;
        });
    },

    select(letter) {
        this.selected === letter ? this.selected = '' : this.selected = letter;
    },

    getUrlParams() {  
      if (location.search) {
          var parts = location.search.substring(1).split(';');
          for (var i = 0; i < parts.length; i++) {
              var filters = parts[i].split('=');
              if (!filters[0]) continue;
              if (filters[0] === 'category' || filters[0] === 'type') {
                var items = filters[1].split('&');
                for (var j = 0; j < items.length; j++) {
                  this.urlVars[filters[0]].push(items[j]);
                }
              }
          }
      }
    },

    formatFilter(text) {
      return text.toLowerCase().replace(/ /g,'-').replace('&','and');
    },

  },
  created() {
      this.fetchNav();
      this.fetchTypes();
      this.fetchCategories();
      this.getUrlParams();
      window.onpopstate = this.historyBackHandler;
  },
};
</script>
