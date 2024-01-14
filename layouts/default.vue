<template>
    <div class="min-h-screen bg-[#F1F1F1]">
        <div class="flex flex-row items-center fixed top-0 right-0 left-0 justify-between px-[4em] py-2 shadow-md bg-white z-50">
            <img class="w-11 h-11" src="/img/logo_dagoz.png"/>
    
            <div class="flex flex-row gap-6 text-lg text-gray-600">
                <nuxt-link to="/" class="font-bold px-2 hover:text-amber-400" active-class="text-amber-400">Home</nuxt-link>
                <nuxt-link to="/video" class="font-bold px-2 hover:text-amber-400" active-class="text-amber-400">Video</nuxt-link>
                <nuxt-link to="/log" class="font-bold px-2 hover:text-amber-400" active-class="text-amber-400">Log</nuxt-link>
            </div>
        </div>
        <div class="pt-[6em]"></div>
        <slot/>
        <div class="mt-[4em]"></div>
    
        <div class="bg-slate-800 py-2 object-bottom">
            <div class="flex flex-row items-center justify-center gap-4 text-white">
                <UIcon name="i-heroicons-globe-asia-australia" class="mt-[1px]" />
                <span class="font-semibold">Dagozilla 2024</span>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>