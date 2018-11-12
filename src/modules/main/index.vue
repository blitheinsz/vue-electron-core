<template>
    <div class="main">
        <div class="title">
            <span class="letter" data-letter="知">知</span>
            <span class="letter" data-letter="学">学</span>
            <span class="letter" data-letter="云">云</span>
            <span class="letter" data-letter="转">转</span>
            <span class="letter" data-letter="码">码</span>
        </div>
        <div class="content">
            <router-view/>
        </div>
    </div>
</template>
<script>
    export default {
        mounted() {
            if (this.$route.path === '/') {
                this.$router.push('/home');
            }
        },
    };
</script>
