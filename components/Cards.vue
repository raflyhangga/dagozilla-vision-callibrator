<template>
    <div class="flex flex-col items-center gap-4">
        <div 
            v-if="isThereDetection(idStream)" 
            class="flex flex-row items-center gap-5 shadow-xl rounded-xl bg-white py-3 px-4"
        >
            <div>
                Callibrate with video:
            </div>
            <StreamViewer
                :full-path="`/video/${idStream}`"
                :detect="idStream"
            />
        </div>
        <div v-for="(param,key) in data" class="shadow-xl rounded-xl min-w-[40em] max-w-[65em] h-fit bg-white">
            <Card :title="key" :data="param" :path="`${head}`"></Card>
        </div>
    </div>
</template>

<script setup>
    const {data,head,idStream} = defineProps(['data','head','idStream'])

    const isThereDetection = (value) => value? value.includes("detection") : false
    const tes = ref([])
</script>