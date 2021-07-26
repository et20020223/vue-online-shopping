<template>
  <div class="home">
      <Navbar></Navbar>
      <Banner></Banner>
      <div class="container-fluid">
            <div class="row">
                <Sidebar></Sidebar>
                <main  class="col-md-9 ml-sm-auto col-lg-10 px-4">
                    <router-view></router-view>
                </main>
            </div>
        </div>
  </div>
</template>

<script>
import Navbar from '../../components/shopping/Navbar.vue';
import Sidebar from '../../components/shopping/Sidebar.vue';
import Banner from '../../components/shopping/Banner.vue';


export default {
  name: 'Index',
  components:{
    Navbar,
    Sidebar,
    Banner
  },
  methods:{

  }
}
</script>

