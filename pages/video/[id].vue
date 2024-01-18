<template>
    <div class="mx-[15em] mt-[3em] mb-[3em]">
        <div 
            v-if="isThereDetection(id)" 
            class="flex flex-row items-center gap-5 shadow-xl rounded-xl bg-white mb-4 py-3 px-4"
        >
            <div>
                Callibrate with video:
            </div>
            <StreamViewer
                :full-path="`/video/${id}`"
                :detect="id"
            />
        </div>
        <Cards :data="dataAPI['vision'][id]" :head="`/vision/${id}`"></Cards>
    </div>
</template>

<script setup>
    const runtimeConfig = useRuntimeConfig();
    const url = 'http://' + runtimeConfig.public.robotIP + ':5820/param/';
    const {data} = await useFetch(url)
    const dataAPI = data.value
    const {id} = useRoute().params

    console.log(dataAPI)

    definePageMeta({
        layout:'video'
    })

    const isThereDetection = (value) => value.includes("detection")
</script>