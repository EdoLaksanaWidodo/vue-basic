<template>
    <div id="Layout">
<SideBar/>
<div class="content">
    <main>
        <RouterView/>
    </main>
</div>
    </div>
</template>

<script>
import { RouterView } from 'vue-router';
import SideBar from './SideBar.vue';
export default {
    components:{
        SideBar,
    },
    setup () {
        

        return {}
    }
}
</script>

<style lang="scss" scoped>

</style>