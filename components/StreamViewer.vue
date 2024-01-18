<template>
    <div>
    <UButton label="Open" @click="handleOpenModal" />
    <UModal v-model="isOpen">
        <div class="p-4">
            <div v-if="!pictureTaken">
                <img :src="urlStream" alt="" class="block max-w-full rounded-md shadow-xl">
                <UButton
                    label="Take Picture"
                    @click = "pictureTaken = true"
                    class="mt-4"
                />
            </div>
            <div v-else>
                <img :id="`image${detect}`" :src="urlSnap" alt="" class="block max-w-full rounded-md shadow-xl">
                <div v-if="!cropMode">
                    <UButton
                        label="Crop Image"
                        @click = "handleCropImage"
                        class="mt-4"
                    />
                </div>
                <div v-else>
                    <UButton
                        label="Crop"
                        @click = "handleCropper"
                        class="mt-4"
                    />
                </div>
                <UCard class="my-5 w-[75%] mx-auto" v-show="isCroped">
                    <template #header>
                        <div>
                            Crop Result Here:
                        </div>
                    </template>
                    <div>
                        <canvas :id="`cropped${detect}`" :class="{'w-0':!isCroped,'h-0':!isCroped,'mt-2':isCroped}" class="rounded-md mx-auto shadow-md"/>
                        <div v-if="isCroped">
                            <UButton
                                label="Send"
                                @click="handlerSend"
                                class="mt-5"
                            />
                        </div>
                    </div>

                </UCard>
            </div>
        </div>
    </UModal>
  </div>
</template>

<script setup>
    import Cropper from 'cropperjs';
    import * as cc from "~/assets/libs/color-convert.js";
    import * as d3 from 'd3';
    cc
    // Initialize
    const {fullPath,detect} = defineProps(['fullPath','detect'])
    const runtimeConfig = useRuntimeConfig();
    const colorCode = detect === "obstacle" ? 52 : 40;
    // State
    const cropMode = ref(false)
    const isOpen = ref(false)
    const isCroped = ref(false)
    const pictureTaken = ref(false)
    const cropper = ref()
    const urlSend = 'http://' + runtimeConfig.public.robotIP + ':5820/param/'
    const urlStream = 'http://' + runtimeConfig.public.robotIP + ':5812/stream?topic=/log/camera_task/median_blur_image';
    const urlSnap = 'http://' + runtimeConfig.public.robotIP + ':5812/snapshot?topic=/log/camera_task/median_blur_image';
    

    const handleOpenModal=()=>{
        isOpen.value = true
        cropMode.value = false
        isCroped.value = false
        pictureTaken.value = false
    }

    const handleCropImage = () => {
        cropMode.value = !cropMode.value
        const image = document.querySelector('#image' + detect);
        console.log(image)
        cropper.value = new Cropper(image, {
            aspectRatio: 0,
            minContainerWidth: image.width,
            minContainerHeight: image.height,
            });
            const croppedCanvas = document.querySelector('#cropped');
        }

    const handleCropper = () => {
        const croppedCanvas = cropper.value.getCroppedCanvas();
        
        const canvas = document.querySelector('#cropped'+detect);
        const context = canvas.getContext('2d');
        
        if (croppedCanvas.width * croppedCanvas.height < 25000) {
            isCroped.value = !isCroped.value
            canvas.width = croppedCanvas.width;
            canvas.height = croppedCanvas.height;

            context.drawImage(croppedCanvas, 0, 0, canvas.width, canvas.height);
            canvas.display = "block";
        } else {
            alert("Cropped area is too big!");
        }
    }

    const cleanData = (arr) => {
        const q1 = d3.quantile(arr, 0.25);
        const q3 = d3.quantile(arr, 0.75);
        const iqr = q3 - q1;
    
        const lower_bound = q1 - 1.5 * iqr;
        const upper_bound = q3 + 1.5 * iqr;
    
        let min = arr.find((num) => num >= lower_bound);
        let max = arr.find((num) => num >= upper_bound);
    
        if (min === undefined || min < 0 || min > 255) min = arr[0];
        if (max === undefined || max < 0 || max > 255) max = arr[arr.length - 1];
    
        return { min: min, max: max };
    };

    const handlerSend = () => {
        const canvas = document.querySelector('#cropped' + detect);
        const context = canvas.getContext('2d');
        if (canvas.width > 0) {
        try {
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height, {
            colorSpace: "srgb",
            }); // rgba
            let colors = {
            v0: [],
            v1: [],
            v2: [],
            };
            

            for (let i = 4; i < imageData.data.length; i = i + 4) {
            const { v0, v1, v2 } = colorCode === 40 ? cc.rgbToHsv(imageData.data[i], imageData.data[i + 1], imageData.data[i + 2]) : cc.rgbToHsv(imageData.data[i], imageData.data[i + 1], imageData.data[i + 2]);
            colors.v0.push(Math.round(v0 * 179)); // OpenCV's Hue (H) in its HSV and HLS is in [0, 179]
            colors.v1.push(Math.round(v1 * 255)); // the rest are in [0, 255]
            colors.v2.push(Math.round(v2 * 255));
            }

            colors.v0.sort((a, b) => a - b);
            colors.v1.sort((a, b) => a - b);
            colors.v2.sort((a, b) => a - b);

            colors = {
            v0: cleanData(colors.v0),
            v1: cleanData(colors.v1),
            v2: cleanData(colors.v2),
            };

            const colorParam = {
            [`${fullPath}/in_range/lower/v0`]: colors.v0.min,
            [`${fullPath}/in_range/lower/v1`]: colors.v1.min,
            [`${fullPath}/in_range/lower/v2`]: colors.v2.min,
            [`${fullPath}/in_range/upper/v0`]: colors.v0.max,
            [`${fullPath}/in_range/upper/v1`]: colors.v1.max,
            [`${fullPath}/in_range/upper/v2`]: colors.v2.max,
            };

            // FOR DEPLOYING ONLY
            $fetch(urlSend,{
                method: 'PATCH',
                header: {"content-Type":"application/json"},
                body: colorParam
                }).then((res) =>{
                    console.log(`The value of ${url} successfully updated!`);
                }).catch((err)=>{
                    console.log(err.message);
                })
        }
        catch(err){
            console.log(err.message)
        }
    }


}

</script>