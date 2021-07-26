<template>
    <div>
        <loading :active.sync="isLoading"></loading>
        <table class="table mt-4">
            <thead>
                <tr>
                    <th width="120">購買時間</th>                    
                    <th width="120">Email</th>
                    <th width="120">購買品項</th>
                    <th width="100">應付金額</th>
                    <th width="120">是否付款</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item) in orders" :key="item.id">
                    <td>{{ item.create_at | date }}</td>
                    <td>{{ item.user.email }}</td>
                    <td>
                        <p v-for="products in item.products" :key="products.id">
                        {{ products.product.title }} 數量: {{ products.qty}}{{ products.product.unit}}
                        </p>
                    </td>
                    <td class="text-right">
                        {{ item.total  | currency }}
                    </td>
                    <td :class="{'text-success':item.is_paid }">
                        {{ item.is_paid ? '已付款': '未付款' }}
                    </td>
                </tr>
            </tbody>
        </table>
        <Pagination :pagination="pagination" @changePage="getOrders"></Pagination>
    </div>
</template>
<script>
    import $ from 'jquery';
    export default {
        data() {
            return {
                orders: [],
                pagination: {},
                isLoading: false,
            };
        },
        created() {
            this.getOrders();
        },
        computed: {

        },
        methods: {
            getOrders(page = 1) {
                const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/orders?page=${page}`;
                const vm = this;
                vm.isLoading = true;
                this.$http.get(api).then((response) => {
                    console.log(response.data);
                    if (response.data.success) {
                        vm.orders = response.data.orders;
                        vm.pagination = response.data.pagination;
                        vm.isLoading = false;
                    }
                });
            },
        }
    }
</script>