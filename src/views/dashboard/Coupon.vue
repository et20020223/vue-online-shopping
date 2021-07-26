<template>
    <div>
        <loading :active.sync="isLoading"></loading>
        <div class="text-right mt-4">
            <button class="btn btn-primary" @click="openModal(true)">
                建立新的優惠券</button>
        </div>
        <table class="table mt-4">
            <thead>
                <tr>
                    <th width="120">名稱</th>                    
                    <th width="120">折扣百分比</th>
                    <th width="120">到期日</th>
                    <th width="100">是否啟用</th>
                    <th width="120">編輯</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item) in coupon" :key="item.id">
                    <td>{{ item.title }}</td>
                    <td>{{ item.percent }}%</td>
                    <td>
                        {{ item.due_date | date}}
                    </td>
                    <td>
                        <span v-if="item.is_enabled" class="text-success">啟用</span>
                        <span v-else>未啟用</span>
                    </td>
                    <td>
                        <button class="btn btn-outline-primary btn-sm" @click="openModal(false,item)">編輯</button>
                        <button class="btn btn-outline-danger btn-sm" @click="openDelModal(item)">刪除</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <Pagination :pagination="pagination" @changePage="getCoupon"></Pagination>
        <!-- Modal -->
        <div class="modal fade" id="couponModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content border-0">
                    <div class="modal-header bg-dark text-white">
                        <h5 class="modal-title" id="exampleModalLabel">
                            <span>新增優惠券</span>
                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-sm-8">
                                <div class="form-group">
                                    <label for="title">標題</label>
                                    <input type="text" class="form-control" id="title" v-model="tempCoupon.title"
                                        placeholder="請輸入標題">
                                </div>

                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="category">優惠碼</label>
                                        <input type="text" class="form-control" id="category"
                                            v-model="tempCoupon.code" placeholder="請輸入優惠碼">
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="price">到期日</label>
                                        <input type="unit" class="form-control" id="unit" v-model="tempCoupon.due_date"
                                            placeholder="請輸入到期日">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="content">折扣百分比</label>
                                    <input type="unit" class="form-control" id="unit" v-model="tempCoupon.percent"
                                            placeholder="請輸入折扣百分比">
                                </div>
                                <div class="form-group">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" v-model="tempCoupon.is_enabled"
                                            :true-value="1" :false-value="0" id="is_enabled">
                                        <label class="form-check-label" for="is_enabled">
                                            是否啟用
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary" @click="updateCoupon">確認</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="delCouponModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content border-0">
                    <div class="modal-header bg-danger text-white">
                        <h5 class="modal-title" id="exampleModalLabel">
                            <span>刪除優惠券</span>
                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        是否刪除 <strong class="text-danger">{{ tempCoupon.title }}</strong> 商品(刪除後將無法恢復)。
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-danger" @click="deleteCoupon">確認刪除</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import $ from 'jquery';
    export default {
        data() {
            return {
                coupon: [],
                tempCoupon:[],
                pagination: {},
                isLoading: false,
                isNew:false,
            };
        },
        created() {
            this.getCoupon();
        },
        computed: {

        },
        methods: {
            getCoupon(page = 1) {
                const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons?page=${page}`;
                const vm = this;
                vm.isLoading = true;
                this.$http.get(api).then((response) => {
                    console.log(response.data);
                    if (response.data.success) {
                        vm.coupon = response.data.orders;
                        vm.pagination = response.data.pagination;
                        vm.isLoading = false;
                    }
                });
            },
            openModal(isNew, item) {
                if (isNew) {
                    this.tempCoupon = {};
                    this, isNew = true;
                } else {
                    this.tempCoupon = Object.assign({}, item);
                    this, isNew = false;
                }
                $('#couponModal').modal('show');
            },
            openDelModal(item) {
                this.tempCoupon = Object.assign({}, item);
                $('#delCouponModal').modal('show');
            },
            updateCoupon() {
                let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon`;
                let httpMethod = 'post';
                const vm = this;
                if (!vm.isNew) {
                    api =`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;
                    httpMethod = 'put';
                }
                this.$http[httpMethod](api, {data: vm.tempCoupon}).then((response) => {
                    console.log(response.data);
                    if (response.data.success) {
                        $('#couponModal').modal('hide');
                        vm.getCoupon();
                    } else {
                        $('#couponModal').modal('hide');
                        vm.getCoupon();
                        vm.$store.dispatch('updateMessage', response.data.message);
                    }
                });
            },
            deleteCoupon() {
                const vm = this;
                const api =
                    `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;
                this.$http.delete(api, {data: vm.tempCoupon}).then((response) => {
                    console.log(response.data);
                    if (response.data.success) {
                        $('#delCouponModal').modal('hide');
                        vm.getCoupon();
                        //vm.products = response.data.products;
                    } else {
                        $('#delCouponModal').modal('hide');
                        vm.getCoupon();
                        vm.$store.dispatch('updateMessage', response.data.message);
                    }
                });
            },
        }
    }
</script>