<template>
    <div class="mx-[15em] mt-[3em] mb-[3em]">
        <!-- <MainForm :data="data"></MainForm> -->
        <!-- <SliderForm :items="paged['sectionContent']"></SliderForm> -->
        <Cards :data="dataAPI['vision'][id]" :head="`/vision/${id}`"></Cards>
    </div>
</template>

<script setup>
    const runtimeConfig = useRuntimeConfig();
    const url = 'http://' + runtimeConfig.public.robotIP + ':5820/param/';
    const {data} = await useFetch(url)
    const dataAPI = data.value
    const {id} = useRoute().params

    definePageMeta({
        layout:'video'
    })


</script>