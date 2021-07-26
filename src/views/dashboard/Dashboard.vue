<template>
    <div>
        <Navbar></Navbar>
        <Alert></Alert>
        <div class="container-fluid">
            <div class="row">
                <Sidebar></Sidebar>
                <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
                    <router-view></router-view>
                </main>
            </div>
        </div>
    </div>
</template>

<script>
// 元件類的放component
// 頁面類的放view
import Sidebar from '../../components/dashboard/Sidebar.vue';
import Navbar from '../../components/dashboard/Navbar.vue';
import Alert from '../../components/AlertMessage.vue';

export default {
    components: {
    Sidebar,
    Navbar,
    Alert,
    },
    created(){
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
        this.$http.defaults.headers.common.Authorization = `${token}`;
    }
};
</script>
