<template>
    <div class="mx-[2em] mb-[3em] overflow-auto">
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