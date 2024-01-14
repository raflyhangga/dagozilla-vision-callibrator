<template>
    <div class="mx-[25em] mt-[3em] mb-[3em]">
        <!-- <MainForm :data="data"></MainForm> -->
        <!-- <SliderForm :items="paged['sectionContent']"></SliderForm> -->
        <Cards :data="dataAPI['vision'][id]" :head="`/vision/${id}`"></Cards>
    </div>
</template>

<script setup>
    const url = process.env.NUXT_APP_URL_PARAM;
    const dataAPI = await useFetch(`${url}/param/`)
    const {id} = useRoute().params

    const paged = computed(()=>{
        return items.find(obj => obj['section'] === id)
    })

    definePageMeta({
        layout:'video'
    })


</script>