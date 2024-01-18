<template>
    <div class=" bg-[#F1F1F1]">
        <div class="flex flex-col max-h-screen">
            <NavigationBar/>
    
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
        {label:'ball_task',icon:'i-heroicons-cog-6-tooth-solid',to:'/log/ball_task'},
        {label:'line_task',icon:'i-heroicons-camera-20-solid',to:'/log/line_task'},
        {label:'remap_task',icon:'i-heroicons-globe-alt-solid',to:'/log/remap_task'},
    ]
</script>