<template>
    <div class=" bg-[#F1F1F1]">
        <div class="flex flex-col max-h-screen">
            <nav >
                <div class="flex flex-row items-center justify-between px-[4em] py-2 shadow-md bg-white z-50">
                    <img class="w-11 h-11" src="/img/logo_dagoz.png"/>
            
                    <div class="flex flex-row gap-6 text-lg text-gray-600">
                        <nuxt-link to="/" class="font-bold px-2 hover:text-amber-400" active-class="text-amber-400">Home</nuxt-link>
                        <nuxt-link to="/video" class="font-bold px-2 hover:text-amber-400" active-class="text-amber-400">Video</nuxt-link>
                        <nuxt-link to="/log/ball_task" class="font-bold px-2 hover:text-amber-400" active-class="text-amber-400">Log</nuxt-link>
                    </div>
                </div>
            </nav>
    
            <div class="grow flex flex-row overflow-y-auto">
                <div class="bg-neutral-100 pl-4 pr-5 shadow-md">
                    <UVerticalNavigation :links="items" class="mt-4" />
                </div>
                <div class="overflow-y-scroll overflow-x-auto w-full z-0">
                    <slot/>
                </div>
            </div>
    
            <div class="bg-slate-800 py-2 object-bottom col-span-2">
                <div class="flex flex-row items-center justify-center gap-4 text-white">
                    <UIcon name="i-heroicons-globe-asia-australia" class="mt-[1px]" />
                    <span class="font-semibold">Dagozilla 2024</span>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script setup>
    const items = [
        {label:'configuration',icon:'i-heroicons-cog-6-tooth-solid',to:'/video/'},
        {label:'camera_capture',icon:'i-heroicons-camera-20-solid',to:'/video/camera_capture'},
        {label:'ball_detection',icon:'i-heroicons-globe-alt-solid',to:'/video/ball_detection'},
        {label:'line_detection',icon:'i-heroicons-bars-arrow-down',to:'/video/line_detection'},
        {label:'obstacle_detection',icon:'i-heroicons-swatch-solid',to:'/video/obstacle_detection'},
        {label:'friend_detection',icon:'i-heroicons-users-16-solid',to:'/video/friend_detection'}
    ]
</script>