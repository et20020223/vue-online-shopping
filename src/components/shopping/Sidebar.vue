<template>
    <div class="col-md-2">
        <!-- 左側選單 (List group) -->
        <div class="list-group sticky-top">
            <a class="list-group-item list-group-item-action active" data-toggle="list" href="#list-gold">
                <i class="fa fa-suitcase" aria-hidden="true"></i> 金牌專賣店</a>
            <a class="list-group-item list-group-item-action" data-toggle="list" href="#list-gift">
                <i class="fa fa-gift" aria-hidden="true"></i> 禮品區</a>
            <a href="#" class="list-group-item list-group-item-action disabled">
                <i class="fa fa-film" aria-hidden="true"></i> 影音商品</a>
            <a href="#" class="list-group-item list-group-item-action disabled">
                <i class="fa fa-paw" aria-hidden="true"></i> 寵物專用</a>
            <a href="#" class="list-group-item list-group-item-action disabled">
                <i class="fa fa-tree" aria-hidden="true"></i> 居家環境</a>
        </div>
    </div>
</template>
<style scope>
    .nav-item {
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>