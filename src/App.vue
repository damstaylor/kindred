<template>
  <div id="app">
    <div class="home">
      <div class="vue-logo-back">
        <div class="centeralign bg-white" style="height: 30px">
          <span class="float-left">
            <router-link to="/lives">
              <img
                :src="require('./assets/logo-unibet.png')"
                alt="Logo Unibet"
                class="header-logo"
              />
            </router-link>
          </span>
          <div class="text-dark float-right mr-3">
            <div class="text-secondary mr-3">
              Login : <span class="font-weight-bold">{{ username }}</span>
            </div>
            <div class="text-secondary mr-3">
              Balance : <span class="font-weight-bold">{{ balance }} € </span>
            </div>
          </div>
          <nav id="nav" class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
              <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <ul class="navbar-nav">
                  <li class="nav-item">
                    <router-link tag="a" class="nav-link" to="/lives">
                      En direct
                    </router-link>
                  </li>
                  <li class="nav-item">
                    <router-link tag="a" class="nav-link" to="/livedetails/1">
                      Mes paris
                    </router-link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import fetchJsonData from '@/services/fetchJsonData'

export default {
  name: 'App',
  created() {
    this.balanceInterval = setInterval(this.fetchBalance, 5000)
  },
  mounted() {
    this.fetchBalance()
  },
  destroyed() {
    this.balanceInterval = null
  },
  data() {
    return {
      balanceInterval: null,
      username: '',
      balance: 0,
    }
  },
  methods: {
    async fetchBalance() {
      const { pseudo, balance } = await fetchJsonData('/user.json')
      this.username = pseudo
      this.balance = balance
    },
  },
  beforeDestroy() {
    clearInterval(this.balanceInterval)
  },
}
</script>

<style>
#app {
  height: 100vh;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.home {
  height: 100%;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.vue-logo-back {
  background-color: black;
}

.header-logo {
  width: 50px;
  aspect-ratio: 1/1;
}

.centeralign {
  display: block;
  margin-left: auto;
  margin-right: auto;
}

/* Animation live */
@keyframes shadow-pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.2);
  }

  100% {
    box-shadow: 0 0 0 35px rgba(0, 0, 0, 0);
  }
}

.pulse {
  animation: shadow-pulse 1s infinite;
}
</style>
