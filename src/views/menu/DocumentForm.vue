<template>
    <section class="section"> 
        <div class="columns">
            <div class="column is-8 is-offset-2">
                <horizontal-stepper :steps="demoSteps" @completed-step="completeStep"
                                    @active-step="isStepActive" @stepper-finished="alert" 
                >                     
                </horizontal-stepper>
            </div>
        </div>
    </section>
</template>

<script>
    import HorizontalStepper from 'vue-stepper';
 
    // This components will have the content for each stepper step.
    import FormPengajuan from './DocumentDetail/FormPengajuan.vue';
    import FormMenimbang from './DocumentDetail/FormMenimbang.vue';
    import FormMengingat from './DocumentDetail/FormMengingat.vue';
    import FormMemperhatikan from './DocumentDetail/FormMemperhatikan.vue';
    import FormKeputusan from './DocumentDetail/FormKeputusan.vue';
    import FormLampiran from './DocumentDetail/FormLampiran.vue';
    import FormPreview from './DocumentDetail/FormPreview.vue';
 
    export default {
        components: {
            HorizontalStepper,
        },
        data(){
            return {
                demoSteps: [
                    {
                        icon: 'description',
                        name: 'satu',
                        subtitle: '1. Pengajuan',
                        component: FormPengajuan,
                        completed: false
                    },
                    {
                        icon: 'description',
                        name: 'dua',
                        subtitle: '2. Menimbang',
                        component: FormMenimbang,
                        completed: false
                    },
                    {
                        icon: 'description',
                        name: 'tiga',
                        subtitle: '3. Mengingat',
                        component: FormMengingat,
                        completed: false
                    },
                    {
                        icon: 'description',
                        name: 'empat',
                        subtitle: '4. Memperhatikan',
                        component: FormMemperhatikan,
                        completed: false
                    },
                    {
                        icon: 'description',
                        name: 'lima',
                        subtitle: '5. Diktum Keputusan',
                        component: FormKeputusan,
                        completed: false
                    },
                    {
                        icon: 'description',
                        name: 'enam',
                        subtitle: '6. Lampiran',
                        component: FormLampiran,
                        completed: false
                    },
                    {
                        icon: 'description',
                        name: 'tujuh',
                        subtitle: '7. Preview',
                        component: FormPreview,
                        completed: true
                    }
                ]
            }
        },
        methods: {
            // Executed when @completed-step event is triggered
            completeStep(payload) {
                this.demoSteps.forEach((step) => {
                    if (step.name === payload.name) {
                        step.completed = true;
                    }
                })
            },
            // Executed when @active-step event is triggered
            isStepActive(payload) {
                this.demoSteps.forEach((step) => {
                    if (step.name === payload.name) {
                        if(step.completed === true) {
                            step.completed = false;
                        }
                    }
                })
            },
            // Executed when @stepper-finished event is triggered
            alert(payload) {
                alert('end')
            }
        }
    }
</script>

<style>
    .stepper-box .top .steps-wrapper .step .step-title h5 {
        font-size: 12px !important;
        font-weight: bold !important;
    }

    .stepper-box .top .steps-wrapper .step .circle i {
        background-color: #024531 !important;
    }
</style>