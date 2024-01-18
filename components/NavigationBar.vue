<template >
    <div class="flex flex-row items-center justify-between px-[4em] py-2 shadow-md bg-white z-50">
        <img class="w-11 h-11" src="/img/logo_dagoz.png"/>

        <div class="flex flex-row gap-6 text-lg text-gray-600">
            <nuxt-link to="/" class="font-bold px-2 hover:text-amber-400" active-class="text-amber-400">Home</nuxt-link>
            <nuxt-link to="/video" class="font-bold px-2 hover:text-amber-400" active-class="text-amber-400">Video</nuxt-link>
            <nuxt-link to="/log/ball_task" class="font-bold px-2 hover:text-amber-400" active-class="text-amber-400">Log</nuxt-link>
        </div>
    </div>    
</template>