<template>
    <div class="app-main w-full " id="kt_app_main">
        <!--begin::Content wrapper-->
        <div class="d-flex flex-column flex-column-fluid">

            <!--begin::Toolbar-->
            <div id="kt_app_toolbar" class="app-toolbar  py-3 py-lg-6 ">

                <!--begin::Toolbar container-->
                <div id="kt_app_toolbar_container"
                    class="app-container  container-xxl d-flex flex-stack ">

                    <!--begin::Page title-->
                    <div
                        class="page-title d-flex flex-column justify-content-center flex-wrap me-3 ">
                        <!--begin::Title-->
                        <h1
                            class="page-heading d-flex text-gray-900 fw-bold fs-3 flex-column justify-content-center my-0"
                            v-text="translate('Order details')">

                        </h1>
                    </div>
                    <close_icon class="p-1 absolute cursor-pointer right-0" @click="back"></close_icon>

                </div>
            </div>
            <div id="kt_app_content" class="app-content  flex-column-fluid ">

                <!--begin::Content container-->
                <div id="kt_app_content_container"
                    class="app-container  container-xxl ">
                    <!--begin::Layout-->
                    <div class="d-flex flex-column flex-lg-row">
                        <!--begin::Content-->
                        <div
                            class="flex-lg-row-fluid me-lg-15 order-2 order-lg-1 mb-10 mb-lg-0">
                            <!--begin::Form-->
                                <!--begin::Customer-->
                                <div class="card card-flush pt-3 mb-5 mb-lg-10">
                                    <div class="card-header">
                                        <div class="card-title">
                                            <h2 class="fw-bold"
                                                v-text="translate('Customer')"></h2>
                                        </div>
                                    </div>
                                    <div class="flex w-full gap-10">
                                        <!--end::Card header-->

                                        <!--begin::Card body-->
                                        <div class="card-body pt-0" v-if="activeItem.customer">
                                            <!--begin::Description-->
                                            <div
                                                class="d-flex align-items-center p-3 mb-2">
                                                <!--begin::Avatar-->
                                                <div 
                                                    class="symbol symbol-60px symbol-circle me-3">
                                                    <img alt="Pic"
                                                        :src="activeItem.customer.picture ?? '/uploads/img/profile.png'" />
                                                </div>
                                                <!--end::Avatar-->

                                                <!--begin::Info-->
                                                <div class="d-flex flex-column">
                                                    <!--begin::Name-->
                                                    <span
                                                        class="fs-2 fw-bold text-gray-900 text-hover-primary me-2"
                                                        v-text="activeItem.customer.name ?? ''"></span>
                                                    <!--end::Name-->

                                                    <!--begin::Email-->
                                                    <span
                                                        class="fw-semibold text-xl text-gray-600 text-hover-primary"
                                                        v-text="activeItem.customer.email"></span>
                                                    <!--end::Email-->
                                                </div>
                                                <!--end::Info-->
                                            </div>
                                        </div>
                                        <!--end::Card body-->
                                        <div class="card mb-6 mb-xl-9">

                                            <div class="card-body py-0">

                                                <h4 class="text-xl py-4 " v-text="translate('Order status')"></h4>
                                                <form_field  @callback="(val) => {console.log(val), activeItem.status = val.status}" :item="activeItem" :column="{key:'status',title: translate('Order status') , column_type:'select', text_key: 'name', column_key: 'status', data: statusList, withLabel:true}" ></form_field>

                                            </div>
                                        </div>
                                                
                                    </div>
                                    <div class="w-full ">
                                        <!--end::Card body-->
                                        <div class="card mb-6 mb-xl-9">

                                            <div class="card-body py-0">

                                                <!--begin::Left Section-->
                                                <div
                                                    class="d-flex flex-wrap flex-stack mb-5">
                                                    <!--begin::Row-->
                                                    <div class="d-flex w-full">
                                                        <div
                                                            class="border border-dashed border-gray-300 w-full rounded my-3 p-4 me-6">
                                                            <span
                                                                class="fs-1 fw-bold text-gray-800 lh-1">
                                                                <span
                                                                    class="counted fw-bold"
                                                                    v-text="currency.symbol +''+activeItem.total_amount"></span>
                                                                <i
                                                                    class="ki-duotone ki-arrow-up fs-1 text-success"><span
                                                                        class="path1"></span><span
                                                                        class="path2"></span></i>
                                                            </span>
                                                            <span
                                                                class="fs-6 fw-semibold text-muted d-block lh-1 pt-2"
                                                                v-text="translate('Total amount')"></span>
                                                        </div>
                                                        <div
                                                            class="border border-dashed border-gray-300 w-full rounded my-3 p-4 me-6">
                                                            <span
                                                                class="fs-1 fw-bold text-gray-800 lh-1">
                                                                <span
                                                                    class="counted"
                                                                    v-text="currency.symbol +''+activeItem.tax_amount"></span>
                                                                <i
                                                                    class="ki-duotone ki-arrow-up fs-1 text-success"><span
                                                                        class="path1"></span><span
                                                                        class="path2"></span></i>
                                                            </span>
                                                            <span
                                                                class="fs-6 fw-semibold text-muted d-block lh-1 pt-2"
                                                                v-text="translate('Tax amount')"></span>
                                                        </div>
                                                        <div
                                                            class="border border-dashed border-gray-300 w-full rounded my-3 p-4 me-6">
                                                            <span
                                                                class="fs-1 fw-bold text-gray-800 lh-1">
                                                                <span
                                                                    class="counted"
                                                                    v-text="currency.symbol +''+activeItem.shipping_amount"></span>
                                                                <i
                                                                    class="ki-duotone ki-arrow-up fs-1 text-success"><span
                                                                        class="path1"></span><span
                                                                        class="path2"></span></i>
                                                            </span>
                                                            <span
                                                                class="fs-6 fw-semibold text-muted d-block lh-1 pt-2"
                                                                v-text="translate('Shipping')"></span>
                                                        </div>
                                                        <div
                                                            class="border border-dashed border-gray-300 w-full rounded my-3 p-4  ">
                                                            <span
                                                                class="fs-1 fw-bold text-gray-800 lh-1">
                                                                <span
                                                                    class="counted"
                                                                    v-text="currency.symbol +''+activeItem.total_discount"></span>
                                                                <i
                                                                    class="ki-duotone ki-arrow-up fs-1 text-success"><span
                                                                        class="path1"></span><span
                                                                        class="path2"></span></i>
                                                            </span>
                                                            <span
                                                                class="fs-6 fw-semibold text-muted d-block lh-1 pt-2"
                                                                v-text="translate('Discount')"></span>
                                                        </div>

                                                    </div>
                                                    <!--end::Row-->
                                                    
                                                </div>
                                                <!--end::Left Section-->
                                            </div>
                                            <!--end::Body-->
                                        </div>
                                    </div>
                                </div>
                                <!--end::Customer-->
                                <!--begin::Pricing-->
                                <div class="card card-flush pt-3 mb-5 mb-lg-10">
                                    <!--begin::Card header-->
                                    <div class="card-header">
                                        <!--begin::Card title-->
                                        <div class="card-title">
                                            <h2 class="fw-bold"
                                                v-text="translate('Products')"></h2>
                                        </div>
                                    </div>
                                    <!--end::Card header-->

                                    <!--begin::Card body-->
                                    <div class="card-body pt-0">
                                        <!--begin::Table wrapper-->
                                        <div class="table-responsive">
                                            <!--begin::Table-->
                                            <table
                                                class="table align-middle table-row-dashed fs-4 fw-semibold gy-4"
                                                id="kt_subscription_products_table">
                                                <thead>
                                                    <tr
                                                        class="text-start text-muted fw-bold fs-7 text-uppercase gs-0">
                                                        <th
                                                            class="min-w-300px"
                                                            v-text="translate('Products')"></th>
                                                        <th
                                                            class="min-w-100px"
                                                            v-text="translate('Options')"></th>
                                                        <th
                                                            class="min-w-100px"
                                                            v-text="translate('Qty')"></th>
                                                        <th
                                                            class="min-w-150px"
                                                            v-text="translate('Total')"></th>
                                                    </tr>
                                                </thead>
                                                <tbody class="text-gray-600">
                                                    <tr
                                                        v-for="orderItem in activeItem.items">
                                                        <td>
                                                            <div
                                                                v-text="orderItem.item.lang_content.title ?? ''"></div>
                                                        </td>
                                                        <td>
                                                            <div
                                                                class="w-full flex gap-2"
                                                                v-if="orderItem.size">
                                                                <span
                                                                    class="fw-bold"
                                                                    v-text="translate('Size')"></span>
                                                                <span
                                                                    v-text="orderItem.size ?? ''"></span>
                                                            </div>
                                                            <div
                                                                class="w-full flex gap-2"
                                                                v-if="orderItem.color">
                                                                <span
                                                                    class="fw-bold"
                                                                    v-text="translate('Color')"></span>
                                                                <span
                                                                    class="p-1 px-2"
                                                                    :style="'background-color: '+orderItem.color"
                                                                    v-text="orderItem.color ?? ''"></span>
                                                            </div>
                                                        </td>
                                                        <td
                                                            v-text="orderItem.quantity"></td>
                                                        <td
                                                            v-text="currency.symbol+''+orderItem.total_amount"></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <!--end::Table-->
                                        </div>
                                        <!--end::Table wrapper-->
                                    </div>
                                    <!--end::Card body-->
                                </div>
                                <!--end::Pricing-->

                                <!--begin::Payment method-->
                                <div class="card card-flush pt-3 mb-5 mb-lg-10"
                                    data-kt-subscriptions-form="pricing">
                                    <!--begin::Card header-->
                                    <div class="card-header">
                                        <!--begin::Card title-->
                                        <div class="card-title">
                                            <h2 class="fw-bold"
                                                v-text="translate('Payment Method')"></h2>
                                        </div>
                                    </div>
                                    <!--end::Card header-->

                                    <!--begin::Card body-->
                                    <div class="card-body pt-0">
                                        <!--begin::Options-->
                                        <div id="kt_create_new_payment_method"
                                            v-if="activeItem.invoice">
                                            <!--begin::Option-->
                                            <div class="py-1">
                                                <!--begin::Header-->
                                                <div
                                                    class="py-3 d-flex flex-stack flex-wrap">
                                                    <!--begin::Toggle-->
                                                    <div
                                                        class="d-flex align-items-center collapsible toggle "
                                                        data-bs-toggle="collapse"
                                                        data-bs-target="#kt_create_new_payment_method_1">
                                                        <!--begin::Arrow-->
                                                        <div
                                                            class="btn btn-sm btn-icon btn-active-color-primary ms-n3 me-2">
                                                            <i
                                                                class="ki-duotone ki-minus-square toggle-on text-primary fs-2"><span
                                                                    class="path1"></span><span
                                                                    class="path2"></span></i>
                                                            <i
                                                                class="ki-duotone ki-plus-square toggle-off fs-2"><span
                                                                    class="path1"></span><span
                                                                    class="path2"></span><span
                                                                    class="path3"></span></i>
                                                        </div>
                                                        <!--end::Arrow-->

                                                        <!--begin::Logo-->
                                                        <img
                                                            v-if="activeItem.invoice"
                                                            :src="'/uploads/img/payment_methods/'+activeItem.invoice.payment_method+'.png'"
                                                            class="w-40px me-3"
                                                            alt />
                                                        <!--end::Logo-->

                                                        <!--begin::Summary-->
                                                        <div class="me-3"
                                                            v-if="activeItem.invoice">
                                                            <div
                                                                class="d-flex align-items-center fw-bold"><div
                                                                    class="text-xl fw-bold"
                                                                    v-text="activeItem.invoice.payment_method ?? ''"></div>
                                                            </div>
                                                            <div
                                                                class="text-lg text-muted"
                                                                v-text="activeItem.invoice.status"></div>
                                                        </div>
                                                        <!--end::Summary-->
                                                    </div>
                                                    <!--end::Toggle-->

                                                    <!--begin::Input-->
                                                    <div
                                                        class="d-flex my-3 ms-9">
                                                        <!--begin::Radio-->
                                                        <label
                                                            class="form-check form-check-custom form-check-solid me-5">
                                                            <input
                                                                class="form-check-input"
                                                                type="radio"
                                                                name="payment_method"
                                                                checked="checked" />
                                                        </label>
                                                        <!--end::Radio-->
                                                    </div>
                                                    <!--end::Input-->
                                                </div>
                                            </div>
                                        </div>
                                        <!--end::Options-->
                                    </div>
                                    <!--end::Card body-->
                                </div>
                                <div class="card card-flush pt-3 mb-5 mb-lg-10">
                                    <!--begin::Card header-->
                                    <div class="card-header">
                                        <!--begin::Card title-->
                                        <div class="card-title">
                                            <h2 class="fw-bold"
                                                v-text="translate('Order Notes')"></h2>
                                        </div>
                                        <!--begin::Card title-->
                                    </div>
                                    <!--end::Card header-->

                                    <!--begin::Card body-->
                                    <div class="card-body pt-0">
                                        <!--begin::Custom fields-->
                                        <div
                                            class="d-flex flex-column mb-15 fv-row">
                                            <!--begin::Label-->
                                            <div
                                                class="fs-5 fw-bold form-label mb-3">
                                                <span
                                                    v-text="translate('Notes')"></span>
                                                <span
                                                    class="ms-2 cursor-pointer">
                                                    <i
                                                        class="ki-duotone ki-information fs-7"><span
                                                            class="path1"></span><span
                                                            class="path2"></span><span
                                                            class="path3"></span></i>
                                                </span>
                                            </div>
                                            <!--end::Label-->

                                            <textarea v-model="activeItem.notes"
                                                class="form-control form-control-solid rounded-3"
                                                rows="4"></textarea>
                                        </div>
                                        <!--end::Invoice footer-->

                                    </div>
                                    <!--end::Card body-->
                                </div>
                                <button @click="saveOrder" type="submit" class="uppercase p-2 mx-2 text-center text-white w-32 rounded-lg bg-danger" v-text="translate('Update order')"></button>
                        </div>
                        <!--end::Content-->

                        <!--begin::Sidebar-->
                        <div
                            class="flex-column flex-lg-row-auto w-100 w-lg-250px w-xl-300px mb-10 order-1 order-lg-2">
                            <!--begin::Card-->
                            <div class="card card-flush pt-3 mb-0">
                                <!--begin::Card header-->
                                <div class="card-header">
                                    <!--begin::Card title-->
                                    <div class="card-title">
                                        <h2 v-text="translate('Summary')"></h2>
                                    </div>
                                    <!--end::Card title-->
                                </div>
                                <!--end::Card header-->

                                <!--begin::Card body-->
                                <div class="card-body pt-0 fs-4">
                                    <!--begin::Section-->
                                    <div class="mb-7">

                                        <!--begin::Title-->
                                        <h5 class="mb-3"
                                            v-text="translate('Customer details')"></h5>
                                        <!--end::Title-->

                                        <!--begin::Details-->
                                        <div
                                            class="d-flex align-items-center mb-1">
                                            <!--begin::Status-->
                                            <span class="text-xl"
                                                v-text="activeItem.field.mobile ?? ''"></span>
                                            <!--end::Status-->
                                        </div>
                                        <!--end::Details-->

                                        <!--begin::Email-->
                                        <span
                                            class="text-xl fw-semibold text-gray-600 text-hover-primary"
                                            v-text="activeItem.field.email"></span>
                                        <!--end::Email-->
                                    </div>
                                    <!--end::Section-->

                                    <!--begin::Seperator-->
                                    <div
                                        class="separator separator-dashed mb-7"></div>
                                    <!--end::Seperator-->

                                    <!--begin::Section-->
                                    <div class="mb-7">
                                        <!--begin::Title-->
                                        <h5 class="mb-3"
                                            v-text="translate('Shipping')"></h5>
                                        <!--end::Title-->

                                        <!--begin::Details-->
                                        <div class="mb-0 ">
                                            <!--begin::Plan-->
                                            <span
                                                class="text-xl"
                                                v-text="activeItem.field.shipping_name ?? ''"></span>
                                            <!--end::Plan-->

                                            <!--begin::Price-->
                                            <span
                                                class="px-4 text-2xl fw-semibold text-gray-600"
                                                v-text="currency.symbol+''+activeItem.shipping_amount"></span>
                                            <!--end::Price-->
                                        </div>
                                        <!--end::Details-->
                                    </div>
                                    <!--end::Section-->

                                    <!--begin::Seperator-->
                                    <div
                                        class="separator separator-dashed mb-7"></div>
                                    <!--end::Seperator-->

                                    <!--begin::Section-->
                                    <div v-if="activeItem.invoice"
                                        class="mb-10">
                                        <!--begin::Title-->
                                        <h5 class="mb-3"
                                            v-text="translate('Payment Details')"></h5>
                                        <!--end::Title-->

                                        <!--begin::Details-->
                                        <div class="mb-0">
                                            <!--begin::Card info-->
                                            <div
                                                class="fw-semibold text-gray-600 d-flex align-items-center py-2">
                                                <span
                                                    v-text="activeItem.invoice.payment_method"></span>
                                                <img
                                                    :src="'/uploads/img/payment_methods/'+activeItem.invoice.payment_method+'.png'"
                                                    class="w-35px ms-2" alt />
                                            </div>
                                            <!--end::Card info-->

                                            <!--begin::Card expiry-->
                                            <div class="w-full gap-4">
                                                <span class="fw-bold"
                                                    v-text="translate('Date')"></span>
                                                <div
                                                    class="fw-semibold text-gray-600"
                                                    v-text="activeItem.invoice.date ?? ''"></div>
                                            </div>
                                            <!--end::Card expiry-->
                                        </div>
                                        <!--end::Details-->
                                    </div>
                                    <!--end::Section-->

                                </div>
                                <!--end::Card body-->
                            </div>
                            <div class="card card-flush pt-3 my-6">

                                <div class="card-body fs-4">
                                    <!--begin::Section-->
                                    <div class="mb-7">

                                        <!--begin::Title-->
                                        <h5 class="mb-3"
                                            v-text="translate('Shipping information')"></h5>
                                        <!--end::Title-->

                                        <!--begin::Details-->
                                        <div
                                            class="d-flex align-items-center mb-1">
                                            <span class="text-xl"
                                                v-text="activeItem.field.first_name ?? ''"></span>
                                            <span class="text-xl"
                                                v-text="activeItem.field.last_name ?? ''"></span>
                                        </div>

                                        <div
                                            class="d-flex align-items-center mb-1">
                                            <span class="text-xl"
                                                v-text="activeItem.field.mobile ?? ''"></span>
                                        </div>
                                        <div
                                            class="d-flex align-items-center mb-1">
                                            <span class="text-xl"
                                                v-text="activeItem.field.email ?? ''"></span>
                                        </div>
                                        <div
                                            class="text-xl d-flex align-items-center mb-1 gap-4">
                                            <span class
                                                v-text="activeItem.field.address ?? ''"></span>
                                        </div>
                                        <div
                                            class="text-xl d-flex align-items-center mb-1 gap-4">
                                            <span class
                                                v-text="activeItem.field.city ?? ''"></span>
                                            <span class
                                                v-text="activeItem.field.state ?? ''"></span>
                                            <span class
                                                v-text="activeItem.field.country ?? ''"></span>
                                        </div>

                                    </div>
                                    <!--end::Section-->

                                    <!--begin::Seperator-->
                                    <div
                                        class="separator separator-dashed mb-7"></div>
                                    <!--end::Seperator-->

                                </div>
                            </div>
                        </div>
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
import { translate, getProgressWidth, durationMonthsDate, handleRequest, deleteByKey, showAlert, handleAccess, getPositionAddress, findPlaces, getPlaceDetails } from '@/utils.vue';

const SideFormCreate = defineAsyncComponent(() =>
    import('@/components/includes/side-form-create.vue')
);

const SideFormUpdate = defineAsyncComponent(() =>
    import('@/components/includes/side-form-update.vue')
);

const form_field = defineAsyncComponent(() =>
    import('@/components/includes/form_field.vue')
);

export default
    {
        components: {
            'datatabble': Vue3EasyDataTable,
            SideFormCreate,
            SideFormUpdate,
            close_icon,
            delete_icon,
            car_icon,
            route_icon,
            form_field,
        },
        name: 'Orders',
        emits: ['callback'],
        setup(props, { emit }) {

            const showEditSide = ref(false);
            const activeItem = ref({});
            const activeTab = ref(props.usertype);
            const content = ref({});
            const searchText = ref('');
            const statusList = ref();

            if (props.item) {
                activeItem.value = props.item
            }

            statusList.value = [
                {'name': translate('New'), 'status':'new'},
                {'name': translate('Shipping'), 'status':'shipping'},
                {'name': translate('Completed'), 'status':'completed'},
                {'name': translate('Cancelled'), 'status':'cancelled'},
                {'name': translate('Out of stock'), 'status':'out_of_stock'},
            ];

            const saveOrder = () => {
                var params = new URLSearchParams();
                let array = JSON.parse(JSON.stringify(activeItem.value));
                let keys = Object.keys(array)
                let k, d, value = '';
                for (let i = 0; i < keys.length; i++) {
                    k = keys[i]
                    d = typeof array[k] === 'object' ? JSON.stringify(array[k]) : array[k]
                    params.append('params[' + k + ']', d)
                }

                let type = array.order_id > 0 ? 'update' : 'create';
                params.append('type', 'Order.' + type)
                handleRequest(params, '/api/' + type).then(response => {
                    handleAccess(response)
                })
            }

            const back = () => {
                emit('callback');
            }


            const progressWidth = () => {
                let requiredData = ['model_id', 'package_id', 'start_date', 'payment_type', 'daily_trips', 'payment_status'];

                return getProgressWidth(requiredData, activeItem);
            }

            const checkSimilarUser = (item) => {
                let name = (item.name).toLowerCase().includes(searchText.value.toLowerCase()) ? true : false;
                let email = name ? name : (item.mobile).toLowerCase().includes(searchText.value.toLowerCase()) ? true : false;
                return email ? email : ((item.parent.name).toLowerCase().includes(searchText.value.toLowerCase()) ? true : false);
            }

            const setUser = (model) => {
                activeItem.value.model_id = model.customer_id;
                activeItem.value.model = model;
                activeItem.value.user_type = props.usertype;
                activeTab.value = 'Package';
                searchText.value = null;
            }

            const findUser = () => {
                for (let i = 0; i < props.userslist.length; i++) {
                    props.userslist[i].show = searchText.value.trim() ? checkSimilarUser(props.userslist[i]) : 1;
                }
            }


            const checkSimilarPackage = (item) => {
                let name = (item.name).toLowerCase().includes(searchText.value.toLowerCase()) ? true : false;
                return name ? name : ((item.description).toLowerCase().includes(searchText.value.toLowerCase()) ? true : false);
            }

            const setPackage = (packageItem) => {
                activeItem.value.package_id = packageItem.package_id;
                activeItem.value.package = packageItem;
                activeTab.value = 'Subscription';
                searchText.value = null;
            }

            const findPackage = () => {
                if (props.packages) {
                    for (let i = 0; i < props.packages.length; i++) {
                        props.packages[i].show = searchText.value.trim() ? checkSimilarPackage(props.packages[i]) : 1;
                    }
                }
            }

            const setType = (val) => {
                activeItem.value.payment_type = val;
                dateChanged()
            }

            const dateChanged = () => {

                if (!activeItem.value.start_date)
                    return null;

                let value = 0;
                if (activeItem.value.payment_type == 'month')
                    value = 1;

                if (activeItem.value.payment_type == 'quarter')
                    value = 3;

                if (activeItem.value.payment_type == 'year')
                    value = 12;

                activeItem.value.end_date = durationMonthsDate(activeItem.value.start_date, value);
            }

            const showTip = ref(false);

            const totalCost = () => {

                let priceType = (activeItem.value.daily_trips == 1) ? ('single_cost_' + activeItem.value.payment_type) : ('double_cost_' + activeItem.value.payment_type);

                activeItem.value.total_cost = activeItem.value.package[priceType];

                return activeItem.value.total_cost;
            }


            return {
                statusList,
                totalCost,
                showTip,
                dateChanged,
                setType,
                findPackage,
                checkSimilarPackage,
                setPackage,
                findUser,
                setUser,
                checkSimilarUser,
                progressWidth,
                showEditSide,
                content,
                activeItem,
                activeTab,
                translate,
                saveOrder,
                searchText,
                back
            };
        },

        props: [
            'conf',
            'path',
            'system_setting',
            
            'item',
            'userslist',
            'usertype',
            'packages',
            'currency'
        ],

    };
</script>