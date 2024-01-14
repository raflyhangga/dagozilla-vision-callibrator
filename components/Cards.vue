<template>
    <div class="flex flex-col gap-4">
        <div v-for="(param,key) in data" class="shadow-xl rounded-xl min-w-[40em] h-fit bg-white">
            <Card :title="key" :data="param" :path="`${head}`"></Card>
        </div>
    </div>
</template>

<script setup>
    const {data,head} = defineProps(['data','head'])

    const tes = ref([])
</script>