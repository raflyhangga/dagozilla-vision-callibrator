<template>
    <div class="mx-[10em] mt-[3em] mb-[3em]">
        <Cards :data="filteredData" :head="``"></Cards>
    </div>
</template>

<script setup>
    const runtimeConfig = useRuntimeConfig();
    const url = 'http://' + runtimeConfig.public.robotIP + ':5820/param/';
    const {data} = await useFetch(url)
    const dataAPI = data.value

    const {vision,log,...filteredData} = dataAPI
</script>