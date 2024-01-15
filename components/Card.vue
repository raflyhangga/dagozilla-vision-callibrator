<template>
        <div v-if="(!isObject(data))" class="px-7 py-5">
            <div v-if="isPathSlider(url)">
                <UCard>
                    <template #header>
                        <div class="font-semibold">
                            {{ title }}
                        </div>
                    </template>
                    <div class="flex flex-row items-center justify-between gap-2">
                        <URange v-model="value" :min="sliderData[path + `/${title}`]['min']" :max="sliderData[path + `/${title}`]['max']" size="sm"></URange>
                        <div class="w-[5em]">
                            <UInput v-model="value" type="number"/>
                        </div>
                    </div>
                </UCard>
            </div>
            <div v-else-if="isDataBoolean(data)">
                <UCard>
                    <template #header>
                        <div class="font-semibold">
                            {{ title }}
                        </div>
                    </template>
                    <UToggle v-model="value" size="xl" />
                </UCard>
            </div>
            <div v-else>
                <UCard>
                    <template #header>
                        <div class="font-semibold">
                            {{ title }}
                        </div>
                    </template>
                    <div>
                            <UInput v-model="value"/>
                        <div class="flex justify-end mt-4">
                            <UButton @click.prevent="updateData">Submit</UButton>
                        </div>
                    </div>
                </UCard>
            </div>
        </div>
        <div v-else class="px-7 py-5">
            <UCard>
                <template #header>
                    <div class="font-semibold">
                        {{ title }}
                    </div>
                </template>

                <div class="flex gap-5 flex-col">
                    <div v-for="(item,key) in data">
                        <Card :title="key" :data="item" :path="url"></Card>
                    </div>
                </div>
            </UCard>
        </div>
</template>

<script setup>
    import sliderData from '../../public/paramSlider.json'

    const {title,data,path} = defineProps(['title','data','path'])

    const value = ref(data)
    const runtimeConfig = useRuntimeConfig();
    const url = 'http://' + runtimeConfig.public.robotIP + ':5820/param/';
    const keyParam = path + `/${title}`

    async function updateData() {
        await $fetch(url,{
            method: 'PATCH',
            header: {"content-Type":"application/json"},
            body: {[`${keyParam}`]:data}
        }).then((res) =>{
            console.log(`The value of ${url} successfully updated!`);
        }).catch((err)=>{
            console.log(err.message);
        })
    }

    const isObject = (value) => typeof value === 'object' && value !== null;
    const isPathSlider = (value) => sliderData.hasOwnProperty(url)
    const isDataBoolean = (value) => typeof value === 'boolean'
</script>