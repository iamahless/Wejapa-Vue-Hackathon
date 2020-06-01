<template>
  <div class="o-page">
    <div class="container">
      <div class="row u-justify-center u-mt-xlarge">
        <div class="col-lg-8 u-text-center">
          <h2 class="u-mb-small">Hello {{ name }}, Welcome to WeJapa :)</h2>
          <p class="u-text-large u-mb-large">
            WeJapa helps techies gain access to tech jobs across Africa, Europe
            and North America.
          </p>
        </div>
      </div>

      <div class="row">
        <div class="col-md-7 u-m-auto">
          <div class="row">
            <div class="col-xl-12 u-m-auto" v-for="job in jobs" :key="job._id">
              <router-link
                :to="`/jobs/${job._id}`"
                class="o-line u-pb-small u-mb-small u-border-bottom"
              >
                <div class="o-media">
                  <div class="o-media__img u-mr-small">
                    <div class="c-avatar c-avatar--xsmall">
                      <svg
                        width="36"
                        height="36"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clip-path="url(#clip0)">
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M39.562 13.8603L30.1611 21.727L20.7603 12.8614L9.97692 21.9767L5.27649 17.4815L21.0368 3.99576L30.4376 12.9862L35.2763 8.99047L39.9768 13.4857L39.562 13.8603Z"
                            fill="#FED430"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M21.1749 16.982L35.2762 30.4677L24.9076 39.3333L20.3454 34.9629L25.3224 30.7174L20.2072 25.7227L15.3685 21.1026L20.6219 16.6074L21.1749 16.982ZM17.4422 28.2201L4.86163 38.8338L0.0229492 34.2137L13.0183 23.1005L17.857 27.7206L17.4422 28.2201Z"
                            fill="#1DBF69"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M30.4376 0C31.82 0 32.926 0.499471 33.7555 1.37354C34.585 2.12275 34.9997 3.12169 34.9997 4.37037C34.8615 5.49418 34.3085 6.49312 33.479 7.24233C32.6495 7.99153 31.4053 8.36614 30.1611 8.36614C28.9168 8.36614 27.6726 7.7418 26.9813 6.99259C26.1519 6.24339 25.5989 5.11958 25.7371 3.99577C25.7371 2.87196 26.2901 1.87302 27.1196 1.12381C28.0873 0.374603 29.1933 0 30.4376 0Z"
                            fill="black"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0">
                            <rect width="40" height="39.3333" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  </div>

                  <div class="o-media__body u-text-left">
                    <h6>{{ job.title }}</h6>
                    <p>{{ job.type }}</p>
                  </div>
                </div>

                <h6 class="u-text-right">
                  ${{ formatSalary(job.salary) }}
                  <template v-if="job.status === 'Closed'">
                    <span class="u-color-danger u-block">{{ job.status }}</span>
                  </template>
                  <template v-else>
                    <span class="u-color-success u-block">{{ job.status }}</span>
                  </template>
                </h6>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Jobs",
  data() {
    return {
      name: "name",
      jobs: []
    };
  },
  mounted() {
    this.getUserDetails();
    this.getJobs();
  },
  methods: {
    getUserDetails() {
      const user = JSON.parse(localStorage.getItem("user"));
      this.name = user.developer.name;
    },
    formatSalary(value) {
      let val = (value / 1).toFixed(2).replace(",", ".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    getJobs() {
      const token = localStorage.getItem("token");

      const options = {
        headers: {
          AUTHORIZATION: `Bearer ${token}`
        }
      };
      axios
        .get("job/all", options)
        .then(resp => {
          console.log(resp.data.data.jobs);
          this.jobs = resp.data.data.jobs;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>