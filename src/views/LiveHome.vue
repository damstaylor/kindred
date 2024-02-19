<template>
  <div>
    <div v-if="lives.length > 0" class="card mt-5">
      <div class="card-header bg-dark text-white pulse">
        <h4>
          Live(s) en cours
          <span class="badge bg-danger">{{ lives.length }}</span>
        </h4>
      </div>
      <div class="card-body">
        <div class="card-text">
          <div
            class="card centeralign addmargin"
            style="width: 18rem"
            v-for="live in lives"
            :key="live.id"
          >
            <div class="card-body" @click="goToLive(live.id)">
              <h4 class="card-title font-weight-bold text-justify">
                {{ live.name }}
              </h4>
              <ul class="list-group text-justify text-center">
                <li class="list-group-item">
                  {{ live.nbMarkets }} marché(s) ouvert(s)
                </li>
                <li class="list-group-item">
                  {{ live.nbSelections }} selection(s) ouverte(s)
                </li>
                <li class="list-group-item">
                  {{ live.nbBets }} pari(s) enregistré(s)
                </li>
              </ul>
              <a class="btn btn-primary mt-3" @click="goToLive(live.id)">
                <span style="color: #212121">
                  Parier sur {{ live.name }}
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card mt-5" v-else>
      <h5>Aucun événément n'est en direct</h5>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import fetchJsonData from '@/services/fetchJsonData'

export default {
  name: 'live',
  mounted() {
    this.fetchLives()
  },
  data() {
    return {
      lives: [],
    }
  },
  components: {
  },
  methods: {
    goToLive(id) {
      this.$router.push(`/livedetails/${id}`)
    },
    async fetchLives() {
      this.lives = await fetchJsonData('/lives.json')
    },
  },
}
</script>

<style scoped>
.header-logo {
  /*margin-left: -50%;*/
}

.addmargin {
  margin-top: 10px;
  margin-bottom: 10px;
}

.vue-logo-back {
  background-color: black;
}
</style>
