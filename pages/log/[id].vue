<template>
    <div class="mx-[25em] mt-[3em] mb-[3em]">
        <!-- <MainForm :data="data"></MainForm> -->
        <!-- <SliderForm :items="paged['sectionContent']"></SliderForm> -->
        <Cards :data="dataAPI['log'][id]" :head="`/log/${id}`"></Cards>
    </div>
</template>

<script setup>
    const url = process.env.NUXT_APP_URL_PARAM;
    const dataAPI = await useFetch(`${url}/param/`)
   
    definePageMeta({
        layout:'log'
    })
    const {id} = useRoute().params

</script>