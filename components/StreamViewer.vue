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
                <img id="image" :src="urlSnap" alt="" class="block max-w-full rounded-md shadow-xl">
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
                <canvas id="cropped" :class="{'w-0':!isCroped,'h-0':!isCroped,'mt-5':isCroped}" />
                <div v-if="isCroped">
                    <UButton
                        label="Send"
                        @click="handlerSend"
                        class="mt-4"
                    />
                </div>
            </div>
        </div>
    </UModal>
  </div>
</template>

<script setup>
    import Cropper from 'cropperjs';
    // DEBUGIN PURPOSES
    const dummySnap = ref('https://fastly.picsum.photos/id/11/2500/1667.jpg?hmac=xxjFJtAPgshYkysU_aqx2sZir-kIOjNR9vx0te7GycQ')
    // ====================================

    const cropMode = ref(false)
    const isOpen = ref(false)
    const isCroped = ref(false)
    const pictureTaken = ref(false)
    const cropper = ref()
    const runtimeConfig = useRuntimeConfig();
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
        const image = document.querySelector('#image');
        console.log(image)
        cropper.value = new Cropper(image, {
            aspectRatio: 0,
            minContainerWidth: image.width,
            minContainerHeight: image.height,
            });
            const croppedCanvas = document.querySelector('#cropped');
            // croppedCanvas.width = 0;
            // croppedCanvas.height = 0;
        }

    const handleCropper = () => {
        isCroped.value = !isCroped.value
        const croppedCanvas = cropper.value.getCroppedCanvas();

        const canvas = document.querySelector('#cropped');
        const context = canvas.getContext('2d');

        if (croppedCanvas.width * croppedCanvas.height < 25000) {
            canvas.width = croppedCanvas.width;
            canvas.height = croppedCanvas.height;

            context.drawImage(croppedCanvas, 0, 0, canvas.width, canvas.height);
            canvas.display = "block";
        } else {
            alert("Cropped area is too big!");
        }
    }

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

            // // FOR DEPLOYING ONLY
            // $fetch(url,{
            //     method: 'PATCH',
            //     header: {"content-Type":"application/json"},
            //     body: colorParam
            //     }).then((res) =>{
            //         console.log(`The value of ${url} successfully updated!`);
            //     }).catch((err)=>{
            //         console.log(err.message);
            //     })
        }
        catch(err){
            console.log(err.message)
        }
    }
}

</script>