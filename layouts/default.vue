<template>
    <div class="min-h-screen bg-[#F1F1F1]">
        <NavigationBar/>
        <div class="pt-[3em]"></div>
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