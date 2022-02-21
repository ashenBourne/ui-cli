<template>
    <div class="box-content">
        <div class="left-content">
            这里是scroll组件，可以下拉滚动滑取组件，到时候获取菜单即可
            <ul>
                <li>
                     <router-link to="/zh-CN/component/changelog">更新日志</router-link>
                </li>
                <li>
                     <router-link to="/zh-CN/component/button">button</router-link>
                </li>
            </ul>
           
        </div>
        <div class="right-content">
            <router-view></router-view>
        </div>
        
    </div>
</template>

<script>
    export default {
    
    }
</script>

<style lang="scss" scoped>
.box-content{
    display: flex;
    justify-content: space-between;
    height: 100%;
    //     position: absolute;
    // bottom: 0;
    // top: 20px;
    .left-content{
        width:20%;
        border-right: 1px solid red;
    }
    .right-content{
        width:70%;

    }
}
</style>