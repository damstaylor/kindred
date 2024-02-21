<template>
  <div class="card mt-5">
    <div v-if="getEvent" class="card-header bg-dark text-white pulse">
      {{ getEvent.name }} {{ `${getState === 'OPENED' ? '(en cours)' : '(terminé)'}` }}
    </div>
    <div class="card-body">
      <div class="card-text">
        <div v-if="getMarkets.length" class="container">
          <div v-for="(market, idx) in getMarkets" :key="`${market.id}-${idx}`" class="market">
            <h4>{{ market.name }}</h4>
            <template v-if="getSelectionsFromMarketId(market.id).length <= 3">
              <div class="row mt-1">
                <div
                  class="col"
                  v-for="selection in getSelectionsFromMarketId(market.id)"
                  :key="selection.id"
                >
                  <div class="card bg-primary text-white h-100">
                    <div class="card-body">
                      <p class="card-text">{{ selection.name }} : {{ selection.currentOdd }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </template>
            <template v-else>
              <div
                class="row mt-1"
                v-for="selection in getSelectionsFromMarketId(market.id)"
                :key="selection.id"
              >
                <div class="col">
                  <div class="card bg-primary text-white h-100">
                    <div class="card-body">
                      <p class="card-text">{{ selection.name }} : {{ selection.currentOdd }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
      <router-link to="/lives" class="btn btn-light">
        Retour aux lives
      </router-link>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import fetchJsonData from '@/services/fetchJsonData'

export default {
  name: 'live-details',
  mounted() {
    this.fetchSelections()
  },
  data() {
    return {
      selections: [],
    }
  },
  computed: {
    getEvent() {
      return this.selections.length > 0 ? this.selections[0].market.event : null
    },
    getState() {
      return this.selections.length > 0 ? this.selections[0].state : ''
    },
    getMarkets() {
      if (!this.selections.length) {
        return []
      }
      const markets = this.selections.map((selection) => selection.market)
      let uniqueMarkets = []
      markets.forEach((market) => {
        if (!uniqueMarkets.some(uM => uM.id === market.id)) {
          uniqueMarkets.push(market)
        }
      })
      return uniqueMarkets
    },
  },
  methods: {
    async fetchSelections() {
      this.selections = await fetchJsonData('/selections.json')
    },
    getSelectionsFromMarketId(marketId) {
      return this.selections.filter((selection) => selection.market.id === marketId)
    },
  },
}
</script>
<style scoped>
.market {
  margin-bottom: 24px;
}
</style>
