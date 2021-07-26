<template>
    <nav class="col-md-2 d-none d-md-block bg-light sidebar">
        <div class="sidebar-sticky">
            <ul class="nav flex-column">
                <li class="nav-item">
                    <i class="fas fa-box-open"></i>
                    <router-link class="nav-link font-weight-bold" to="/admin/products">
                        產品列表
                    </router-link>
                </li>
                <li class="nav-item">
                    <i class="far fa-list-alt"></i>
                    <router-link class="nav-link font-weight-bold" to="/admin/orders">
                        訂單列表
                    </router-link>
                </li>
                <li class="nav-item">
                    <i class="fas fa-ticket-alt"></i>
                    <router-link class="nav-link font-weight-bold" to="/admin/coupon">
                        優惠券
                    </router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>
<style scope>
    .nav-item {
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>