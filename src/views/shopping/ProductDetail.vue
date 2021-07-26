<template>
    <div class="content">
        <div class="photo">
            <img :src="product.image" class="img-fluid" alt="">
        </div>
        <div class="info">
            <h5 class="modal-title" id="exampleModalLabel">{{ product.title }}</h5>
            <blockquote class="blockquote mt-3">
                <p class="mb-0">{{ product.content }}</p>
                <footer class="blockquote-footer text-right">{{ product.description }}</footer>
            </blockquote>
            <div class="d-flex justify-content-between align-items-baseline">
                <div class="h4" v-if="!product.price">{{ product.origin_price }} 元</div>
                <del class="h6" v-if="product.price">原價 {{ product.origin_price }} 元</del>
                <div class="h4" v-if="product.price">現在只要 {{ product.price }} 元</div>
            </div>
            <div>
                <select name="" class="form-control mt-3" v-model="product.num">
                    <option :value="num" v-for="num in 10" :key="num">
                        選購 {{num}} {{product.unit}}
                    </option>
                </select>
            </div>
            <div class="text-muted text-nowrap mr-3">
                小計 <strong>{{ product.num * product.price }}</strong> 元
            </div>
            <div>
                <button type="button" class="btn btn-primary" @click="addtoCart(product.id, product.num)">
                    <i class="fas fa-spinner fa-spin" v-if="product.id === status.loadingItem"></i>
                    加到購物車
                </button>
            </div>

        </div>
    </div>
</template>
<script>
    export default {
        name: 'ProductDetail',
        data() {
            return {
                product: [],
                isLoading: false,
                status: {
                    loadingItem: ''
                }
            }
        },
        created() {
            this.getProductDetail(this.$route.params.id);
        },
        methods: {
            getProductDetail(id) {
                const vm = this;
                const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`;
                vm.isLoading = true;
                this.$http.get(url).then((response) => {
                    vm.product = response.data.product;
                    console.log(response);
                    vm.isLoading = false;
                })
            },
            addToCart(id,qty=1){
                const vm = this;
                const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
                const cart = {
                    product_id:id,
                    qty
                }
                
                this.$http.post(url, {data: cart}).then((response) => {
                    console.log(response.data);
                    if (response.data.success) {

                        //vm.products = response.data.products;
                        //將購物車 寫在action
                        //呼叫更新購物車 aciotn
                        //購物車action=>mutation 更新
                        
                    } else {

                        vm.$store.dispatch('updateMessage', response.data.message);
                    }
                });
            }
        }
    }
</script>
<style scoped>
    .content {
        display: flex;
    }

    .photo {
        width: 60%;
    }

    .content>div {
        margin: 2%;
    }

    .btn-primary {
        width: 100%;
    }

    .info >div {
        margin: 5% 0;
    }
</style>