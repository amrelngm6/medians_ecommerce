<template>
    <div class="w-full flex overflow-auto">
        <div class=" w-full relative">

            <close_icon class="absolute top-4 right-4 z-10 cursor-pointer" @click="back" />
            <div class="card mb-9">
                <div class="card-body pt-9 pb-0">
                    <!--begin::Details-->
                    <div class="d-flex flex-wrap flex-sm-nowrap mb-6">
                        <!--begin::Image-->
                        <div
                            class="d-flex flex-center flex-shrink-0 bg-light rounded w-100px h-100px w-lg-150px h-lg-150px me-7 mb-4">
                            <img class="mw-50px mw-lg-75px" :src="activeItem.picture" alt="image">
                        </div>
                        <!--end::Image-->

                        <!--begin::Wrapper-->
                        <div class="flex-grow-1">
                            <!--begin::Head-->
                            <div class="d-flex justify-content-between align-items-start flex-wrap mb-2">
                                <!--begin::Details-->
                                <div class="d-flex flex-column">
                                    <!--begin::Status-->
                                    <div class="d-flex align-items-center mb-1">
                                        <a href="#" class="text-gray-800 text-hover-primary fs-2 fw-bold me-3"
                                            v-text="activeItem.name"></a>
                                        <span class="badge badge-light-success me-auto"
                                            v-text="translate(activeItem.type)"></span>
                                    </div>
                                    <!--end::Status-->

                                    <!--begin::Description-->
                                    <div class="d-flex flex-wrap fw-semibold mb-4 fs-5 text-gray-500 truncate"
                                        v-text="activeItem.description"></div>
                                    <!--end::Description-->
                                </div>
                                <!--end::Details-->
                            </div>
                            <!--end::Head-->

                            <!--begin::Info-->
                            <div class="d-flex flex-wrap justify-content-start">
                                <!--begin::Stats-->
                                <div class="d-flex flex-wrap">
                                    <!--begin::Stat-->
                                    <div
                                        class="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                                        <!--begin::Number-->
                                        <div class="d-flex align-items-center">
                                            <div class="fs-4 fw-bold" v-text="formatCustomTime(activeItem.created_at, 'MM dd, Y - HH:mm a')"></div>
                                        </div>
                                        <!--end::Number-->

                                        <!--begin::Label-->
                                        <div class="fw-semibold fs-6 text-gray-500" v-text="translate('Upload Date')"></div>
                                        <!--end::Label-->
                                    </div>
                                    <!--end::Stat-->

                                    <!--begin::Stat-->
                                    <div
                                        class="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                                        <!--begin::Number-->
                                        <div class="d-flex align-items-center">
                                            <i class="ki-duotone ki-arrow-down fs-3 text-danger me-2"><span
                                                    class="path1"></span><span class="path2"></span></i>
                                            <div class="fs-4 fw-bold counted" v-text="activeItem.views_count"></div>
                                        </div>
                                        <!--end::Number-->

                                        <!--begin::Label-->
                                        <div class="fw-semibold fs-6 text-gray-500" v-text="translate('Views')"></div>
                                        <!--end::Label-->
                                    </div>
                                    <!--end::Stat-->

                                    <!--begin::Stat-->
                                    <div
                                        class="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                                        <!--begin::Number-->
                                        <div class="d-flex align-items-center">
                                            <i class="ki-duotone ki-arrow-up fs-3 text-success me-2"><span
                                                    class="path1"></span><span class="path2"></span></i>
                                            <div class="fs-4 fw-bold counted" v-text="activeItem.comments_count"></div>
                                        </div>
                                        <!--end::Number-->

                                        <!--begin::Label-->
                                        <div class="fw-semibold fs-6 text-gray-500" v-text="translate('Comments')"></div>
                                        <!--end::Label-->
                                    </div>
                                    <!--end::Stat-->
                                </div>
                                <!--end::Stats-->

                                <!--begin::Users-->
                                <div class="symbol-group symbol-hover mb-3">
                                    <!--begin::User-->
                                    <div class="symbol symbol-35px symbol-circle" v-for="comment in activeItem.comments">
                                        <img alt="Pic" v-if="activeItem.picture" :src="activeItem.picture">
                                        <span v-if="!activeItem.picture"  class="symbol-label bg-info text-inverse-info fw-bold" v-text="activeItem.name.substring(0,1)"></span>
                                    </div>

                                    <!--begin::All users-->
                                    <a href="#" class="symbol symbol-35px symbol-circle" >
                                        <span class="symbol-label bg-dark text-inverse-dark fs-8 fw-bold"> +1</span>
                                    </a>
                                    <!--end::All users-->
                                </div>
                                <!--end::Users-->
                            </div>
                            <!--end::Info-->
                        </div>
                        <!--end::Wrapper-->
                    </div>
                    <!--end::Details-->

                    <div class="separator"></div>

                    <!--begin::Nav-->
                    <ul class="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bold">
                        <!--begin::Nav item-->
                        <li class="nav-item">
                            <a class="nav-link text-active-primary py-5 me-6 "
                                href="/metronic8/demo1/apps/projects/project.html">
                                Overview </a>
                        </li>
                        <!--end::Nav item-->
                        <!--begin::Nav item-->
                        <li class="nav-item">
                            <a class="nav-link text-active-primary py-5 me-6 "
                                href="/metronic8/demo1/apps/projects/targets.html">
                                Targets </a>
                        </li>
                        <!--end::Nav item-->
                        <!--begin::Nav item-->
                        <li class="nav-item">
                            <a class="nav-link text-active-primary py-5 me-6 "
                                href="/metronic8/demo1/apps/projects/budget.html">
                                Budget </a>
                        </li>
                        <!--end::Nav item-->
                        <!--begin::Nav item-->
                        <li class="nav-item">
                            <a class="nav-link text-active-primary py-5 me-6 "
                                href="/metronic8/demo1/apps/projects/users.html">
                                Users </a>
                        </li>
                        <!--end::Nav item-->
                        <!--begin::Nav item-->
                        <li class="nav-item">
                            <a class="nav-link text-active-primary py-5 me-6 "
                                href="/metronic8/demo1/apps/projects/files.html">
                                Files </a>
                        </li>
                        <!--end::Nav item-->
                        <!--begin::Nav item-->
                        <li class="nav-item">
                            <a class="nav-link text-active-primary py-5 me-6 "
                                href="/metronic8/demo1/apps/projects/activity.html">
                                Activity </a>
                        </li>
                        <!--end::Nav item-->
                        <!--begin::Nav item-->
                        <li class="nav-item">
                            <a class="nav-link text-active-primary py-5 me-6 active"
                                href="/metronic8/demo1/apps/projects/settings.html">
                                Settings </a>
                        </li>
                        <!--end::Nav item-->
                    </ul>
                    <!--end::Nav-->
                </div>
            </div>


            <div class=" card w-full py-10">
                <div class="w-full stepper stepper-links ">
                    <div class="stepper-nav justify-content-center py-2 ">
                        <div class="stepper-item " v-for="row in fillable" @click="activeTab = row">
                            <h3 :class="activeTab == row ? 'text-danger border-danger' : 'text-gray-400 border-transparent'"
                                class="cursor-pointer pb-3 px-2 stepper-title text-md border-b "
                                v-text="translate(row)"></h3>
                        </div>
                    </div>
                    <div class="w-full">
                        <form :action="'/api/' + (activeItem.translation_id > 0 ? 'update' : 'create')"
                            v-if="activeTab == 'Info'" :key="activeTab">
                            <input type="hidden" name="type"
                                :value="activeItem.translation_id > 0 ? 'Translation.update' : 'Translation.create'" />
                            <input type="hidden" name="params[code]" :value="activeItem.code ?? ''" />
                            <input type="hidden" name="params[translation_id]"
                                :value="activeItem.translation_id ?? ''" />
                            <div class="card-body pt-0">
                                <div class="settings-form">
                                    <div class="max-w-xl mb-6 mx-auto">

                                        <div
                                            class="notice d-flex bg-blue-100 rounded border-primary border border-dashed rounded-3 p-6">
                                            <div class="d-flex flex-stack flex-grow-1 ">
                                                <div class=" fw-semibold">
                                                    <h4 class="text-gray-900 fw-bold"
                                                        v-text="translate('Translate the code')"></h4>
                                                    <div class="fs-6 text-gray-700 "
                                                        v-text="translate('Translate the word into the available languages')">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="max-w-xl mb-6 mx-auto row">
                                            <label class="col-lg-4 col-form-label required fw-semibold fs-6"
                                                :for="'input' + i" v-text="translate('Code')"></label>
                                            <input :disabled="true" autocomplete="off"
                                                class="form-control form-control-solid"
                                                :placeholder="translate('Generated from english translation')"
                                                v-model="activeItem.code">
                                        </div>

                                        <hr class="opacity-10 my-4" />
                                        <div class="w-full mb-6 " v-if="languages">
                                            <div class="w-full mb-6 mx-auto flex gap-4"
                                                v-for="(language, key) in languages">
                                                <label v-if="languages[key]"
                                                    class="flex gap-4 cursor-pointer w-full col-form-label required fw-semibold fs-6">
                                                    <img class="rounded-full w-10 h-10" :src="language.icon" />
                                                    <p v-text="language.name" class="fw-bold fs-4"></p>
                                                </label>

                                                <input autocomplete="off" class="form-control form-control-solid"
                                                    :placeholder="translate('Translate into') + ' ' + translate(language.name)"
                                                    :name="'params[translation][' + language.language_code + ']'"
                                                    v-model="fields[language.language_code]">
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>


                            <p class="text-center mt-10"><button
                                    class="uppercase px-4 py-3 mx-2 text-center text-white rounded-lg bg-danger"
                                    v-text="translate('Submit')"></button></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import close_icon from '@/components/svgs/Close.vue';
import delete_icon from '@/components/svgs/trash.vue';
import route_icon from '@/components/svgs/route.vue';
import car_icon from '@/components/svgs/car.vue';

import 'vue3-easy-data-table/dist/style.css';
import Vue3EasyDataTable from 'vue3-easy-data-table';

import { defineAsyncComponent, ref } from 'vue';
import { translate, getProgressWidth, handleRequest, formatCustomTime, showAlert, handleAccess, getPositionAddress, findPlaces, getPlaceDetails } from '@/utils.vue';

const SideFormCreate = defineAsyncComponent(() =>
    import('@/components/includes/side-form-create.vue')
);

const SideFormUpdate = defineAsyncComponent(() =>
    import('@/components/includes/side-form-update.vue')
);

const form_field = defineAsyncComponent(() =>
    import('@/components/includes/form_field.vue')
);
import field from '@/components/includes/Field.vue';

export default
    {
        components: {
            'vue-medialibrary-field': field,
            'datatabble': Vue3EasyDataTable,
            SideFormCreate,
            SideFormUpdate,
            close_icon,
            delete_icon,
            car_icon,
            route_icon,
            form_field,
        },
        name: 'Translations',
        emits: ['callback'],
        setup(props, { emit }) {

            const showEditSide = ref(false);
            const fields = ref([]);
            const activeItem = ref({ translations: props.languages });
            const activeTab = ref('Info');
            const content = ref({});
            const fillable = ref(['Info']);

            if (props.item) {
                activeItem.value = props.item
                fields.value = props.item.translation ?? []
            }

            const back = () => {
                emit('callback');
            }

            const progressWidth = () => {
                let requiredData = ['name', 'description', 'double_cost_month', 'double_cost_quarter', 'double_cost_year', 'status'];

                return getProgressWidth(requiredData, activeItem);
            }

            const switchField = (field, key) => {
                console.log(field, key)
                activeField.value = key;
                showModal.value = true
            }
            const addField = () => {
                if (!activeItem.value.fields) {
                    activeItem.value.fields = [{ 'title': '' }];
                } else {
                    activeItem.value.fields.push({ 'title': '' })
                }

                activeField.value = activeItem.value.fields.length - 1;
                showModal.value = true
            }

            const activeField = ref(0);
            const showModal = ref(false);

            return {
                fields,
                showModal,
                switchField,
                addField,
                activeField,
                progressWidth,
                showEditSide,
                content,
                fillable,
                activeItem,
                activeTab,
                translate,
                formatCustomTime,
                back
            };
        },

        props: [
            'conf',
            'path',
            'system_setting',
            'setting',
            'item',
            'languages',
        ],

    };
</script>