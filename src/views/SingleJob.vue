<template>
   <div class="o-page">
      <div class="container">
         <div class="row u-mt-xlarge">
            <div class="col-md-8 u-m-auto">
               <div class="row">
                  <div class="col-xl-12 u-m-auto u-text-left">
                     <div class="job-header">
                        <template v-if="job.status === 'Closed'">
                           <span class="u-bg-danger u-ph-xsmall u-text-white u-text-small">{{ job.status }}</span>
                        </template>
                        <template v-else>
                           <span class="u-bg-success u-ph-xsmall u-text-white u-text-small">{{ job.status }}</span>
                        </template>
                        <span
                           class="u-bg-info u-ph-xsmall u-text-white u-ml-small u-text-small">{{ job.experience }}</span>
                        <h2 class="u-text-bold">{{ job.title }}</h2>
                        <h5>{{ job.location }}</h5>
                     </div>
                     <div class="job-content">
                        <div class="u-mb-medium">
                           <div class="row">
                              <div class="col-md-4 u-text-center">
                                 <h6>Salary</h6>
                                 ${{ formatSalary(job.salary) }}
                              </div>
                              <div class="col-md-4 u-text-center">
                                 <h6>Hours per Week</h6>
                                 {{ job.hoursPerWeek }}hrs/Wk
                              </div>
                              <div class="col-md-4 u-text-center">
                                 <h6>Job type</h6>
                                 {{ job.type }}
                              </div>
                           </div>
                        </div>

                        <div class="u-mb-medium">
                           <h4>Description</h4>
                           <hr class="u-mb-xsmall">
                           <p>{{ job.description }}</p>
                        </div>

                        <div class="u-mb-medium">
                           <h4>Benefits</h4>
                           <hr class="u-mb-xsmall">
                           <ul v-for="(benefit,index) in job.benefits" :key="index">
                              <li>{{benefit}}</li>
                           </ul>
                        </div>

                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
   import axios from 'axios';

   export default {
      name: "SingleJob",
      data() {
         return {
            name: '',
            job: []
         }
      },
      mounted() {
         this.getJob()
      },
      methods: {
         formatSalary(value) {
            let val = (value / 1).toFixed(2).replace(",", ".");
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
         },
         getJob() {
            const token = localStorage.getItem("token");
            const id = this.$route.params.id;

            const options = {
               headers: {
                  AUTHORIZATION: `Bearer ${token}`
               }
            };
            axios
               .get(`job/${id}`, options)
               .then(resp => {
                  console.log(resp.data.data);
                  this.job = resp.data.data;
               })
               .catch(err => {
                  this.$router.push({
                     name: 'PageNotFound'
                  })
                  console.log(err);
               });
         }
      },
   }
</script>

<style scoped>
   .job-header {
      background: #fed52f;
      color: #031805;
      padding: 7%;
      margin: 1rem 0 0 0;
   }
   .job-header p {
      color: #000;
      margin-top: 7px;
   }

   .job-content {
      background: white;
      color: #2c303a;
      padding: 7%;
   }

   .job-content p {
      color: #000;
      font-size: 1rem;
   }
</style>