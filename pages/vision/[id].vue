<template>
    <Head>
        <Title>{{ id }} | Vision</Title>
    </Head>
    <div class="mx-[15em] mt-[3em] mb-[3em]">
        <Cards :data="dataAPI['vision'][id]" :head="`/vision/${id}`" :id-stream="id"></Cards>
    </div>
</template>

<script setup>
    const runtimeConfig = useRuntimeConfig();
    const url = runtimeConfig.public.robotIP + ':' + runtimeConfig.public.portParam + '/param/';
    const {data} = await useFetch(url)
    const dataAPI = data.value
    const {id} = useRoute().params

    console.log(dataAPI)

    definePageMeta({
        layout:'video'
    })

</script>