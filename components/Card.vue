<template>
        <div v-if="(!isObject(data))" class="px-7 py-5">
            <div v-if="isPathSlider(`${path}/${title}`)">
                <UCard>
                    <template #header>
                        <div class="font-semibold">
                            {{ title }}
                        </div>
                    </template>
                    <div class="flex flex-row items-center justify-between gap-2">
                        <URange
                            v-model="paramValue" 
                            :min="sliderData[path + `/${title}`]['min']" 
                            :max="sliderData[path + `/${title}`]['max']" 
                            size="sm"
                            v-on:mouseup="updateData"
                         />
                        <div class="w-[5em]">
                            <UInput v-model="paramValue" type="number" v-on:keyup="updateData"/>
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
                    <UToggle v-model="paramValue" size="xl" @click="updateData" />
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
                            <UInput v-model="paramValue"/>
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
                        <Card :title="key" :data="item" :path="keyParam"></Card>
                    </div>
                </div>
            </UCard>
        </div>
</template>

<script setup>
    import sliderData from '/src/paramSlider.json'
    import axios from 'axios';

    const {title,data,path} = defineProps(['title','data','path'])

    const paramValue = ref(data)
    const runtimeConfig = useRuntimeConfig();
    const url = 'http://' + runtimeConfig.public.robotIP + ':5820/param';
    const keyParam = path + `/${title}`

    const isObject = (value) => typeof value === 'object' && value !== null;
    const isPathSlider = (value) => sliderData.hasOwnProperty(value)
    const isDataBoolean = (value) => typeof value === 'boolean'

    function updateData() {
        if(isDataBoolean(paramValue.value)){
            paramValue.value = !paramValue.value
        }
        console.log(`Updating "${keyParam}" value to ${paramValue.value}`)
        axios
            .patch(url,{[`${keyParam}`]:paramValue.value})
            .then((res) => {
                console.log(`Value of ${keyParam} into ${paramValue.value} successfully updated!`);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

</script>