<template>
    <Head>
        <Title>Main | Vision</Title>
    </Head>
    <div class="mx-[15em] mt-[3em] mb-[3em]">
        <Cards :data="filteredData" :head="``"></Cards>
    </div>
</template>

<script setup>
    const runtimeConfig = useRuntimeConfig();
    const url = 'http://' + runtimeConfig.public.robotIP + ':5820/param/';
    const {data} = await useFetch(url)
    const dataAPI = data.value

    definePageMeta({
        layout:'video'
    })

    const {camera_capture,ball_detection,line_detection,obstacle_detection,friend_detection,...filteredData} = dataAPI['vision']

</script>