<template>
    <div>
        <nav class="navbar navbar-light bg-light">
            <a class="navbar-brand" href="shoppingCart.html">
                <i class="fa fa-heart text-info" aria-hidden="true">{{cartNum}}</i>
                六角血拼賣賣
            </a>
            <!-- 購物車內的數量 (Button 內包含 icon, 數量 badge) -->
            <div class="dropdown ml-auto">
                <button class="btn btn-sm btn-cart" data-toggle="dropdown" data-flip="false">
                    <i class="fa fa-shopping-cart text-dark fa-2x" aria-hidden="true"></i>
                    <span class="badge badge-pill badge-danger">9</span>
                    <span class="sr-only">unread messages</span>
                </button>
                <div class="dropdown-menu dropdown-menu-right p-3" style="min-width: 300px" data-offset="400">
                    <h6>已選擇商品</h6>
                    <table class="table table-sm">
                        <tbody>
                            <tr v-for="item in cart" :key="item.id">
                                <td class="align-middle text-center">
                                    <a href="#removeModal" class="text-muted" data-toggle="modal"
                                        data-title="刪除 {{item.product.title}} 1 {{item.product.unit}}"
                                        @click="removeCart(item.id)">
                                        <i class="fa fa-trash-o" aria-hidden="true"></i>
                                    </a>
                                </td>
                                <td class="align-middle">{{item.product.title}}</td>
                                <td class="align-middle">{{item.qty}} {{item.product.unit}}</td>
                                <td class="align-middle text-right">${{item.total}}</td>
                            </tr>
                        </tbody>
                    </table>
                    <a href="shoppingCart-checkout.html" class="btn btn-primary btn-block">
                        <i class="fa fa-cart-plus" aria-hidden="true"></i> 結帳去
                    </a>
                </div>
            </div>
            <div class="modal fade" id="removeModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header bg-danger text-white">
                            <h5 class="modal-title">刪除商品</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <p>是否確認刪除商品</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">否</button>
                            <button type="button" class="btn btn-outline-danger px-5">是</button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>
<script>
    export default {
        data() {
            return {}
        },
        methods: {
            removeCart(id) {
                //OPEN removeModal
                //SET TEMP
                //DELETE
                this.$store.dispatch('removeCart', id);
            }
        },
        computed: {
            cart() {
                return this.$store.state.cart;
            },
            cartNum() {
                return this.$store.state.cart.length;
            }
        }
    }
</script>