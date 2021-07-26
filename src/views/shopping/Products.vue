<template>
    <div>
        <loading :active.sync="isLoading"></loading>
        <div class="row mt-4">
            <div class="col-md-4 mb-4" v-for="item in products" :key="item.id">
                <div class="card border-0 shadow-sm">
                    <div style="height: 150px; background-size: cover; background-position: center"
                        :style="{backgroundImage: `url(${item.imageUrl})`}">
                    </div>
                    <div class="card-body">
                        <span class="badge badge-secondary float-right ml-2">{{ item.category }}</span>
                        <h5 class="card-title">
                            <a href="#" class="text-dark">{{ item.title }}</a>
                        </h5>
                        <p class="card-text">{{ item.content }}</p>
                        <div class="d-flex justify-content-between align-items-baseline">
                            <div class="h5" v-if="!item.price">{{ item.origin_price }} 元</div>
                            <del class="h6" v-if="item.price">原價 {{ item.origin_price }} 元</del>
                            <div class="h5" v-if="item.price">現在只要 {{ item.price }} 元</div>
                        </div>
                    </div>
                    <div class="card-footer d-flex">
                        <button type="button" class="btn btn-outline-secondary btn-sm" @click="getProduct(item.id)">
                            <i class="fas fa-spinner fa-spin" v-if="status.loadingItem ===item.id"></i>
                            查看更多
                        </button>
                        <button type="button" class="btn btn-outline-danger btn-sm ml-auto" @click="addToCart(item.id)">
                            <i class="fas fa-spinner fa-spin" v-if="status.loadingItem ===item.id"></i>
                            加到購物車
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                products: [],
                isLoading: false,
                status:{
                    loadingItem:''
                }
            };
        },
        methods: {
            getProducts() {
                const vm = this;
                const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products`;
                vm.isLoading = true;
                this.$http.get(url).then((response) => {
                    vm.products = response.data.products;
                    console.log(response);
                    vm.isLoading = false;
                });
            },
            getProduct(id){
                this.$router.push(`/index/product/${id}`);
            },
            addToCart(id){
                const vm = this;
                const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
                const cart = {
                    product_id:id,
                    qty: 1
                }
                vm.isLoading = true;
                this.$http.post(url, {data: cart}).then((response) => {
                    console.log(response.data);
                    if (response.data.success) {

                        vm.$store.dispatch('getCart');
                        vm.isLoading = false;
                    } else {

                        vm.$store.dispatch('updateMessage', response.data.message);
                    }
                });
            }
        },
        created() {
            this.getProducts();
        },
    };
</script>