<template>
    <div class="card-panel" :style="styleObj">
        <h6 class="card-title">{{ cardTitle }}</h6>
        <div class="card-content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'cardPanel',
        props: {
            cardTitle: String,
            styleObj: Object
        }
    };
</script>

<style lang="scss" scoped>
    .card-panel {
        .card-title {
            width: 207px;
            height: 27px;
            padding-left: 8px;
            color: #6DCADD;
            font-size: 14px;
            font-weight: bold;
            // line-height: 48px;
            background: url(~@/assets/img/bg-title.png) no-repeat;
        }
        .card-content {
            
        }
    }
</style>