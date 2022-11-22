<template>
  <div class="dashboard">
    <transaction-approvals />
    <loan-analytics />
    <user-analytics v-bind:users="users"/>
  </div>
</template>

<script>
// @ is an alias to /src
import TransactionApprovals from '../components/TransactionApprovals.vue'
import LoanAnalytics from '../components/LoanAnalytics.vue'
import UserAnalytics from '../components/UserAnalytics.vue'
import DataService from '../services/DataService.js'

export default {
  name: 'HomeView',
  components: {
    TransactionApprovals,
    LoanAnalytics,
    UserAnalytics
  },
  data() {
    return {
      users: [],
      loans: []
    }
  },
  created() {
    DataService.getData().then((response) => {
      if (response.status == 200) {
        console.log(response);
        this.users = response.data.users;
        this.loans = response.data.loans;
      }
    })
  },
}
</script>

<style>
.dashboard {
  background-color: rgb(236, 236, 236);
  box-shadow: 0 0 5px 5px rgba(97, 97, 97, 0.303);
  position: absolute;
  width: 91vw;
  height: 95vh;
  margin-left: 130px;
  margin-right: 0px;
  margin-top: -10px;
  left: 0;
  right: 0;
  text-align: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: flex-start;
}

</style>

