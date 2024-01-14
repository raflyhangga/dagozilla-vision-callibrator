<template>
    <div class="mx-[25em] mt-[3em] mb-[3em]">
        <Cards :data="filteredData" :head="``"></Cards>
    </div>
</template>

<script setup>
    const url = process.env.NUXT_APP_URL_PARAM;
    const dataAPI = await useFetch(`${url}/param/`)

    const {vision,log,...filteredData} = dataAPI
</script>