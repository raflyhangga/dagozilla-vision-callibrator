<template>
    <Head>
        <Title>{{ id }} | Log</Title>
    </Head>
    <div class="mx-[15em] mt-[3em] mb-[3em]">
        <Cards :data="dataAPI['log'][id]" :head="`/log/${id}`"></Cards>
    </div>
</template>

<script setup>
    const runtimeConfig = useRuntimeConfig();
    const url = 'http://' + runtimeConfig.public.robotIP + ':5820/param/';
    const {data} = await useFetch(url)
    const dataAPI = data.value
   
    definePageMeta({
        layout:'log'
    })
    const {id} = useRoute().params

</script>