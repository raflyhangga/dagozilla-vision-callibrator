<template>
    <div class="mx-[2em] mb-[3em] overflow-auto">
        <Cards :data="filteredData" :head="``"></Cards>
    </div>
</template>

<script setup>

    const runtimeConfig = useRuntimeConfig();
    const url =runtimeConfig.public.robotIP + ':' + runtimeConfig.public.portParam + '/param/';
    const {data} = await useFetch(url)
    const dataAPI = data.value

    const {vision,log,...filteredData} = dataAPI
</script>