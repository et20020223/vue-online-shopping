<template>
  <div class="home">
    <a href="#" @click.prevent="signout">登出</a>
  </div>
</template>

<script>


export default {
  name: 'Home',
  methods:{
    signout(){
        const api = `${process.env.VUE_APP_APIPATH}/logout`;
        const vm = this;
        this.$http.post(api).then((response) => {
            console.log(response.data);
            if (response.data.success) {
            vm.$router.push('/login');
            }
        });
    }
  }
}
</script>
