<template>
    <div class="w-full flex overflow-auto">
        <div class=" w-full relative">
            <close_icon class="absolute top-4 right-4 z-10 cursor-pointer" @click="back" />
            <div id="kt_app_content_container" class="app-container  container-xxl ">
                <div class="action form d-flex flex-column flex-lg-row">
                    
                    <div class="d-flex flex-column gap-7 gap-lg-10 w-100 w-lg-300px mb-7 me-lg-10">
                        <div class="card card-flush py-4">
                            <div class="card-header">
                                <div class="card-title"><h2 v-text="translate('Main picture')"></h2></div>
                            </div>
                            <div class="card-body text-center pt-0 ">

                                <div class="image-input image-input-empty image-input-outline image-input-placeholder mb-3 w-full" >
                                    <vue-medialibrary-field @changed="(val) => { activeItem.picture = val;}" :key="activeItem" name="params[picture]"
                                        :filepath="activeItem.picture" v-if="conf"
                                        :api_url="conf.url"></vue-medialibrary-field>
                                </div>
                                <div class="text-muted fs-7" v-text="translate('allowed media types msg')"></div>
                            </div>
                        </div>
                        <div class="card card-flush py-4">
                            <div class="card-header">
                                <div class="card-title"> <h2 v-text="translate('Status')"></h2></div>
                                <div class="card-toolbar">
                                    <div :class="activeItem.status == 'on' ? 'bg-success' : 'bg-danger'" class="rounded-circle w-15px h-15px" ></div>
                                </div>
                            </div>
                            <div class="card-body pt-0">
                                <form_field :item="activeItem" :column="{required: true, key:'status',title: translate('status') , column_type:'select', text_key: 'title', column_key: 'value', data:[{'value': null,'title':translate('Pending')} , {'value':'on','title':translate('Active')}]}" ></form_field>
                                <div class="text-muted fs-7" v-text="translate('Set the item status')"></div>
                            </div>
                        </div>
                        
                        <div class="card card-flush py-4">
                            <div class="card-header">
                                <div class="card-title"><h2 v-text="translate('Product Details')"></h2></div>
                            </div>
                            <div class="card-body pt-0">
                                <!-- <label class="form-label" v-text="translate('Main Category')"></label>
                                <form_field :item="activeItem" :column="{required: true, key:'category_id',title: translate('Main Category') , column_type:'select', text_key: 'name', column_key: 'category_id', data: categories}" ></form_field> -->

                                <!-- <div class="text-muted fs-7 mb-7" v-text="translate('Add item to its main category')"></div> -->

                                <hr class="my-2" />
                                <label class="form-label" v-text="translate('Categories')"></label>
                                <form_field @callback="(val) => {console.log(val), activeItem.product_categories = val}" :item="activeItem" :column="{multiple:true, key:'product_categories',title: translate('Main Category') , column_type:'select', text_key: 'name', column_key: 'category_id', data: categories}" ></form_field>

                                <div class="text-muted fs-7 mb-7" v-text="translate('Add item to multi categories')"></div>
                                <a href="javascript:;" @click="showAddCategory = true" class="btn btn-light-primary btn-sm mb-10">
                                    <vue-feather class="w-8" type="check-square" />
                                    <span v-text="translate('Create new category')"></span>
                                </a>

                            </div>
                        </div>

                        <div class="card card-flush py-4">
                            <div class="card-header">
                                <div class="card-title"><h2 v-text="translate('Tags')"></h2></div>
                            </div>
                            <div class="card-body pt-0" >
                                <hr class="my-2" />

                                <label class="form-label d-block" v-text="translate('Product Tags')"></label>
                                <vue3-tags-input  @on-tags-changed="val => activeItem.tags = val" :tags="activeItem.tags" placeholder="input tags" />
                                <div class="text-muted fs-7" v-text="translate('Add tags to a item')"></div>
                            </div>
                                
                        </div>

                        <div class="card card-flush py-4">
                            <div class="card-header">
                                <div class="card-title"><h2 v-text="translate('Shipping')"></h2></div>
                            </div>
                            <div class="card-body pt-0" v-if="shipping" :key="shipping">
                                
                                <label class="form-label" v-text="translate('Shipping')"></label>
                                <form_field @callback="(val) => {activeItem.shipping = val}" :item="activeItem" :column="{multiple:true, key:'shipping',title: translate('shipping') , column_type:'select', text_key: 'name', column_key: 'shipping_id', data: shipping}" ></form_field>
                                <div class="text-muted fs-7" v-text="translate('Select shipping types for item')"></div>
                            </div>
                        </div>

                        <div class="card card-flush py-4">
                            <div class="card-header">
                                <div class="card-title"><h2 v-text="translate('Brand')"></h2></div>
                            </div>
                            <div class="card-body pt-0" v-if="brands" :key="brands">
                                <label class="form-label" v-text="translate('Product Brand')"></label>
                                <form_field :key="brands" :item="activeItem.product_fields" :column="{key:'brand_id',title: translate('Brand') , column_type:'select', text_key: 'name', column_key: 'brand_id', data: brands}" ></form_field>
                                <div class="text-muted fs-7 mb-7" v-text="translate('Choose brand of item')"></div>
                            </div>
                        </div>

                        <div class="card card-flush py-4">
                            <div class="card-header">
                                <div class="card-title"><h2 v-text="translate('Page Template')"></h2></div>
                            </div>
                            <div class="card-body pt-0">
                                <label  v-text="translate('Select a item template')" class="form-label"></label>
                                <form_field :item="activeItem.product_fields" :column="{required: true, key:'template',title: translate('Template') , column_type:'select', text_key: 'title', column_key: 'value', data:templates}" ></form_field>
                                <div class="text-muted fs-7" v-text="translate('Assign a template from your current theme to define how a single item is displayed')"></div>
                            </div>
                        </div>

                    </div>
                    <div class="d-flex flex-column flex-row-fluid gap-7 gap-lg-10">
                        <ul
                            class="nav nav-custom nav-tabs nav-line-tabs nav-line-tabs-2x border-0 fs-4 fw-semibold mb-n2">
                            <li class="nav-item" v-for="tab in tabs">
                                <a class="nav-link text-active-primary pb-4 " @click="activeTab = tab"
                                    :class="tab == activeTab ? 'active' : ''" href="javascript:;" v-text="tab"></a>
                            </li>
                        </ul>
                        <div class="tab-content">
                            <div class="tab-pane fade show active" v-if="activeTab == translate('General')" >
                                <div class="d-flex flex-column gap-7 gap-lg-10">
                                    <div class="card card-flush py-4">
                                        <div class="card-header flex flex-nowrap">
                                            <div class="card-title w-full"><h2 v-text="translate('General')"></h2></div>
                                            <ul class="flex gap-10 flex-none">
                                                <li class="text-lg flex py-5 gap-2 cursor-pointer"
                                                    @click="seoLang = langKey.language_code" v-for=" langKey in langs"><img
                                                        :src="langKey.icon"
                                                        class="rounded-full w-10 h-10 border-1 border border-gray-600 p-1" />
                                                    <a href="javascript:;"
                                                        :class="langKey.language_code == seoLang ? 'text-danger font-bold' : 'opacity-75 text-gray-400'"
                                                        v-text="langKey.name"></a></li>
                                            </ul>
                                        </div>
                                        <div class="w-full">
                                            <div v-for="language in langs" :key="seoLang">
                                                <div class="card-body pt-0" v-if="seoLang == language.language_code">
                                                    <div class="mb-10 fv-row">
                                                        <label class="required form-label "><span v-text="translate('Path')"></span><strong class="px-4" v-text="translate(language.language_code)"></strong></label>
                                                        <div class="position-relative flex">
                                                            <input :disabled="true" :value="conf.url" class="bg-gray-200 form-control-solid px-4"  />
                                                            <input type="text" v-model="getLang(activeItem, language.language_code).prefix" class="form-control form-control-solid"  />
                                                        </div>
                                                        <div class="text-muted fs-7" v-text="translate('URL path for the item webpage')"> </div>
                                                    </div>
                                                    <div class="mb-10 fv-row">
                                                        <label class="required form-label "><span v-text="translate('Name')"></span><strong class="px-4" v-text="language.name"></strong></label>
                                                        <input type="text" class="form-control mb-2" v-model="activeItem.content_langs[language.language_code].title" />
                                                        <div class="text-muted fs-7" v-text="translate('Name is required and recommended to be unique')"> </div>
                                                    </div>
                                                    <div>
                                                        <label class="form-label gap-6 flex"><span v-text="translate('Description')"></span><strong class="px-4" v-text="language.name"></strong> </label>
                                                        <textarea class="form-control" v-model="activeItem.content_langs[language.language_code].short"></textarea>
                                                        <div class="text-muted fs-7"
                                                            v-text="translate('Set a description to the item for better visibility')">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="tab-pane fade show active" v-if="activeTab == translate('SEO')" >
                                <div class="d-flex flex-column gap-7 gap-lg-10">

                                    <div class="w-full">
                                        <div v-for="language in langs" :key="language">

                                            <div class="card card-flush py-4" v-if="seoLang == language.language_code">
                                                <div class="card-header flex flex-nowrap">
                                                    <div class="w-full card-title"><h2 v-text="translate('Meta Options')"></h2></div>
                                                    <ul class="flex gap-10 flex-none">
                                                        <li class="text-lg flex py-5 gap-2 cursor-pointer" @click="seoLang = langKey.language_code" v-for="langKey in langs">
                                                            <img :src="langKey.icon" class="rounded-full w-10 h-10 border-1 border border-gray-600 p-1" />
                                                            <a href="javascript:;" :class="langKey.language_code == seoLang ? 'text-danger font-bold' : 'opacity-75 text-gray-400'" v-text="langKey.name"></a>
                                                        </li>
                                                    </ul>
                                                </div>

                                                <div class="card-body pt-0">
                                                    <div class="mb-10">
                                                        <label class="form-label" v-text="translate('Meta Tag Title') + ' (' + language.language_code + ')'"></label>
                                                        <input type="text" class="form-control mb-2" name="meta_title"
                                                            :placeholder="translate('Meta tag name')" v-model="activeItem.content_langs[language.language_code].seo_title" />
                                                        <div class="text-muted fs-7" v-text="translate('Set a meta tag title. Recommended to be simple and precise keywords') + ' (' + language.name + ')'"></div>
                                                    </div>

                                                    <div class="mb-10">
                                                        <label class="form-label" v-text="translate('Meta Tag Description')"></label>
                                                        <textarea v-model="activeItem.content_langs[language.language_code].seo_desc" class=""></textarea>
                                                        <div class="text-muted fs-7" v-text="translate('Set a meta tag description to the item for increased SEO ranking')"></div>
                                                    </div>

                                                    <div>
                                                        <label class="form-label" v-text="translate('Meta Tag Keywords')"></label>
                                                        <input id="kt_ecommerce_add_item_meta_keywords" class="form-control" v-model="activeItem.content_langs[language.language_code].seo_keywords" />
                                                        <div class="text-muted fs-7" v-text="translate('Set a list of keywords that the item is related to. Separate the keywords by adding a comma <code>,</code> between each keyword')"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="tab-pane fade show active" v-if="activeTab == translate('Advanced')" >
                                <div class="d-flex flex-column gap-7 gap-lg-10">

                                    <div class="card card-flush py-4">
                                        <div class="card-header">
                                            <div class="card-title">
                                                <h2 v-text="translate('Product information')"></h2>
                                            </div>
                                        </div>
                                        <div class="card-body pt-0">

                                            <static_field
                                                :column="{ title: translate('SKU'), key: 'sku', column_type: 'text' }"
                                                :system_setting="system_setting" :item="activeItem.product_fields"
                                                :callback="(val) => { activeItem.value.product_fields.sku = val; }">
                                            </static_field>
                                            <static_field
                                                :column="{ title: translate('Barcode'), description: translate('Enter the product barcode number'), key: 'barcode', column_type: 'text' }"
                                                :system_setting="system_setting" :item="activeItem.product_fields"
                                                :callback="(val) => { activeItem.value.product_fields.barcode = val; }">
                                            </static_field>
                                            <static_field
                                                :column="{ title: translate('Unit'), description: translate('Unit of the product to sale'), key: 'unit', column_type: 'text' }"
                                                :system_setting="system_setting" :item="activeItem.product_fields"
                                                :callback="(val) => { activeItem.value.product_fields.unit = val; }">
                                            </static_field>
                                            <static_field
                                                :column="{ title: translate('weight'), description: translate('Enter the product weight'), key: 'weight', column_type: 'text' }"
                                                :system_setting="system_setting" :item="activeItem.product_fields"
                                                :callback="(val) => { activeItem.value.product_fields.weight = val; }">
                                            </static_field>
                                            <static_field
                                                :column="{ title: translate('minimum purchase qty'), description: translate('Minimum quantity to make order'), key: 'min_purchase_qty', column_type: 'number' }"
                                                :system_setting="system_setting" :item="activeItem.product_fields"
                                                :callback="(val) => { activeItem.value.product_fields.min_purchase_qty = val; }">
                                            </static_field>

                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div class="tab-pane fade show active" v-if="activeTab == translate('Attributes')" >
                                <div class="d-flex flex-column gap-7 gap-lg-10">
                                    <div class="card card-flush py-4">
                                        <div class="card-header">
                                            <div class="card-title"><h2 v-text="translate('Colors')"></h2></div>
                                        </div>
                                        <div class="card-body pt-0">
                                            <div class="" data-kt-ecommerce-catalog-add-product="auto-options">
                                                <label class="form-label" v-text="translate('Choose Product colors')"></label>
                                                <div id="kt_ecommerce_add_product_options">
                                                    <div class="form-group">
                                                        <div class="d-flex flex-column gap-3 mb-2"  v-for="(color, key) in activeItem.colors">
                                                            <div class="form-group flex flex-wrap align-items-center gap-5" v-if="color">
                                                                <color_picker :index="key" @callback="handleColors" :color="color"></color_picker>
                                                                <button @click="activeItem.colors[key] = null" type="button" class="btn btn-sm btn-icon btn-light-danger"><vue-feather type="delete" /></button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="form-group mt-5">
                                                        <button type="button" @click="activeItem.colors.push({})" class="btn btn-sm btn-light-primary">
                                                            <vue-feather type="copy" />
                                                            <span v-text="translate('Add')"></span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="card card-flush py-4">

                                        <div class="card-header">
                                            <div class="card-title"><h2 v-text="translate('Sizes')"></h2></div>
                                        </div>
                                        <div class="card-body pt-0">
                                            <div class="" data-kt-ecommerce-catalog-add-product="auto-options">
                                                <label class="form-label" v-text="translate('Choose Product sizes')"></label>
                                                <div id="kt_ecommerce_add_product_options">
                                                    <div class="form-group">
                                                        <div class="d-flex flex-column gap-3 mb-2"  v-for="(size, key) in activeItem.sizes">
                                                            <div class="form-group flex flex-wrap align-items-center gap-5" v-if="size != null">
                                                                <input v-model="activeItem.sizes[key]" type="text" class="form-control mw-100 w-200px" :placeholder="translate('Size')">
                                                                <button @click="activeItem.sizes[key] = null" type="button" class="btn btn-sm btn-icon btn-light-danger"><vue-feather type="delete" /></button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="form-group mt-5">
                                                        <button type="button" @click="activeItem.sizes.push('')"
                                                            class="btn btn-sm btn-light-primary">
                                                            <vue-feather type="copy" />
                                                            <span v-text="translate('Add')"></span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="card card-flush py-4">
                                        <div class="card-header">
                                            <div class="card-title"><h2 v-text="translate('Variations')"></h2></div>
                                        </div>
                                        <div class="card-body pt-0">
                                            <div class="" data-kt-ecommerce-catalog-add-product="auto-options">
                                                <label class="form-label" v-text="translate('Add Product Variations')"></label>
                                                <div id="kt_ecommerce_add_product_options">
                                                    <div class="form-group" v-for="(variant, key) in activeItem.variants">
                                                        <div  class="d-flex flex-column gap-3" v-if="variant">
                                                            <div class="form-group d-flex flex-wrap align-items-center gap-5">
                                                                <div class="w-100 w-md-200px">
                                                                    <input v-model="activeItem.variants[key].title" type="text" class="form-control mw-100 w-200px" :placeholder="translate('title')" />
                                                                </div>
                                                                <input v-model="activeItem.variants[key].value" type="text" class="form-control mw-100 w-200px" :placeholder="translate('Variation')" />

                                                                <button @click="activeItem.variants[key] = null" type="button"  class="btn btn-sm btn-icon bg-gray-100 flex gap-4">
                                                                    <vue-feather type="delete"></vue-feather>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="form-group mt-5">
                                                        <button @click="activeItem.variants.push({})"  type="button" class="btn btn-sm btn-light-primary">
                                                            <vue-feather class="w-25px" type="plus"></vue-feather>
                                                            <span v-text="translate('Add new')"></span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="tab-pane fade show active" v-if="activeTab == translate('Pricing')" >

                                <div class="card card-flush py-4">
                                    <div class="card-header">
                                        <div class="card-title"><h2 v-text="translate('Pricing')"></h2></div>
                                    </div>
                                    <div class="card-body pt-0">

                                        <static_field
                                            :column="{ title: translate('price'), description: translate('Set the product price'), key: 'price', column_type: 'number' }"
                                            :system_setting="system_setting" :item="activeItem"
                                            :callback="(val) => { activeItem.value.price = val; }"></static_field>

                                        <static_field
                                            :column="{ title: translate('Old price'), description: translate('Set the product old price'), key: 'old_price', column_type: 'number' }"
                                            :system_setting="system_setting" :item="activeItem"
                                            :callback="(val) => { activeItem.value.old_price = val; }"></static_field>

                                        <div class="row mb-10">
                                            <div class="col-md-8 fv-row">
                                                <label class="required fs-6 fw-semibold form-label mb-2" v-text="translate('Tax')"></label>
                                                <div class="w-full">
                                                    <form_field :item="activeItem.product_fields" :column="{required: true, key:'tax_type',title: translate('Tax') , column_type:'select', text_key: 'title', column_key: 'value', data:taxsTypes}" ></form_field>
                                                </div>
                                            </div>
                                            <div class="col-md-4 fv-row">
                                                <label class="d-flex align-items-center fs-6 fw-semibold form-label mb-2">
                                                    <span class="required" v-text="translate('Amount')"></span>
                                                </label>
                                                <div class="position-relative">
                                                    <input :disabled="!activeItem.product_fields.tax_type" type="number" v-model="activeItem.product_fields.tax_amount" class="form-control form-control-solid"  />
                                                    <div class="position-absolute translate-middle-y top-50 text-muted end-0 me-3">
                                                        <span v-if="activeItem.product_fields.tax_type == 'percent'"> % </span>
                                                        <span v-if="activeItem.product_fields.tax_type == 'fixed'"> $ </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row mb-10">
                                            <div class="col-md-8 fv-row">
                                                <label class="required fs-6 fw-semibold form-label mb-2" v-text="translate('Vat')"></label>
                                                <div class="w-full">
                                                    <form_field :item="activeItem.product_fields" :column="{required: true, key:'vat_type',title: translate('Vat') , column_type:'select', text_key: 'title', column_key: 'value', data:vatsTypes}" ></form_field>
                                                </div>
                                            </div>
                                            <div class="col-md-4 fv-row">
                                                <label class="d-flex align-items-center fs-6 fw-semibold form-label mb-2">
                                                    <span class="required" v-text="translate('Amount')"></span>
                                                </label>
                                                <div class="position-relative">
                                                    <input :disabled="!activeItem.product_fields.vat_type" type="number" v-model="activeItem.product_fields.vat_amount" class="form-control form-control-solid"  />
                                                    <div class="position-absolute translate-middle-y top-50 text-muted end-0 me-3">
                                                        <span v-if="activeItem.product_fields.vat_type == 'percent'"> % </span>
                                                        <span v-if="activeItem.product_fields.vat_type == 'fixed'"> $ </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane fade show active" v-if="activeTab == translate('Images')">

                                <div class="d-flex flex-column gap-7 gap-lg-10">
                                    <div class="card card-flush py-4">
                                        <div class="card-header flex flex-nowrap">
                                            <div class="card-title">
                                                <h2 v-text="translate('Media')"></h2>
                                            </div>
                                            <div class="flex-end">
                                                <a href="javascript:;" @click="activeItem.images.push({path: '/uploads/img/placeholder.png'})"  class="btn btn-sm btn-flex btn-secondary fw-bold " >
                                                    <vue-feather class="w-8" type="image"></vue-feather>
                                                    <span v-text="translate('Add image')"></span>
                                                </a>
                                            </div>
                                        </div>
                                        <div class="card-body pt-0" :key="activeItem.images">
                                            <div v-for="(image, imageKey) in activeItem.images" >
                                                <vue-medialibrary-field v-if="image" @clear="() => { activeItem.images[imageKey] = null; }" @changed="(val) => { activeItem.images[imageKey] = {path: val}; }" :conf="conf" :filepath="image.path" />
                                            </div>
                                            <div class="text-muted fs-7 py-2" v-text="translate('Set the product media gallery')"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="d-flex justify-content-end">
                            <a href="/admin/products" id="kt_ecommerce_add_product_cancel" class="btn btn-light me-5" v-text="translate('Cancel')"></a>
                            <button @click="save" id="kt_ecommerce_add_product_submit" class="btn btn-primary">
                                <span class="indicator-label" v-text="translate('Save Changes')"> </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <side-form-create ref="activeFormCreate" @callback="closeSide" :auth="auth" :key="showAddCategory" :conf="conf" :model="'ProductCategory.create'" v-if="showAddCategory" :columns="content.fillable_category"  class="col-md-3" />

    </div>
</template>

<script>

import close_icon from '@/components/svgs/Close.vue';
import delete_icon from '@/components/svgs/trash.vue';
import route_icon from '@/components/svgs/route.vue';
import car_icon from '@/components/svgs/car.vue';
import field from '@/components/includes/Field.vue';
import static_field from '@/components/includes/static_form_field.vue';

import 'vue3-easy-data-table/dist/style.css';
import Vue3EasyDataTable from 'vue3-easy-data-table';

import { defineAsyncComponent, computed, ref } from 'vue';
import { translate, handleGetRequest, handleRequest, deleteByKey, showAlert, handleAccess, getPositionAddress, findPlaces, getPlaceDetails } from '@/utils.vue';

const SideFormCreate = defineAsyncComponent(() =>
    import('@/components/includes/side-form-create.vue')
);

const SideFormUpdate = defineAsyncComponent(() =>
    import('@/components/includes/side-form-update.vue')
);

const form_field = defineAsyncComponent(() =>
    import('@/components/includes/form_field.vue')
);
import Vue3TagsInput from 'vue3-tags-input';
import color_picker from '@/components/includes/color-picker.vue';


export default
    {
        components: {
            'datatabble': Vue3EasyDataTable,
            'vue-medialibrary-field': field,
            color_picker,
            static_field,
            Vue3TagsInput,
            SideFormCreate,
            SideFormUpdate,
            close_icon,
            delete_icon,
            car_icon,
            route_icon,
            form_field,
        },
        name: 'Products',
        emits: ['callback'],
        setup(props, { emit }) {


            const showAddCategory = ref(false);
            const showEditSide = ref(false);
            const activeItem = ref({
                "picture": '/uploads/img/placeholder.png',
                "content_langs": { },
                "product_fields": {  },
                "colors": [''],
                "sizes": [''],
                "variants": [{}],
                "images": [],
            });
            const seoLang = ref('english');
            const categories = ref([]);
            const brands = ref([]);
            const shipping = ref([]);
            const activeTab = ref(translate('General'));
            const content = ref({});
            const collapsed = ref(false);
            const taxsTypes = ref([
                {title: translate('Free tax'), value: ''},
                {title: translate('Tax percentage'), value: 'percent'},
                {title: translate('Tax amount'), value: 'fixed'},
            ]);

            const vatsTypes = ref([
                {title: translate('Free Vat'), value: ''},
                {title: translate('Vat percentage'), value: 'percent'},
                {title: translate('Vat amount'), value: 'fixed'},
            ]);

            const templates = ref([{title:  translate('Default'), value:'default'}, {title:  translate('Modern'), value:'modern'}]);

            const tabs = ref([translate('General'), translate('Pricing'),  translate('Attributes'), translate('Advanced'), translate('Images'), translate('SEO')]);

            const url =  props.conf.url+props.path+'?load=json';
            
            function load()
            {
                handleGetRequest( url ).then(response=> {
                    var parsedResponse  = JSON.parse(JSON.stringify(response))
                    if (parsedResponse.item) {
                        activeItem.value = parsedResponse.item ?? activeItem.value
                        activeItem.value.product_fields = parsedResponse.item.product_fields ?? {}
                    }
                    content.value  = parsedResponse 
                    categories.value = content.value.categories 
                    brands.value = content.value.brands
                    shipping.value = content.value.shipping
                });
                
            }
            
            load();
            

            const closeSide = () => {
                load()
                showAddCategory.value  = false;
            }

            const save = () => {
                var params = new URLSearchParams();
                let array = JSON.parse(JSON.stringify(activeItem.value));
                let keys = Object.keys(array)
                let k, d, value = '';
                for (let i = 0; i < keys.length; i++) {
                    k = keys[i]
                    d = (typeof array[k] === 'object' || typeof array[k] === 'array' )? JSON.stringify(array[k]) : array[k]
                    params.append('params[' + k + ']', d)
                }

                let type = array.product_id > 0 ? 'update' : 'create';
                params.append('type', 'Product.' + type)
                handleRequest(params, '/api/' + type).then(response => {
                    handleAccess(response)
                })
            }


            const back = () => {
                emit('callback');
            }

            const selectedObject = (array, key) => {
                const keyValue = activeItem.value[key];
                for (let i = 0; i < array.length; i++) {
                    if (array[i][key] == keyValue) {
                        return array[i]
                    }
                }
                return {}
            }


            const handleColors = (val, index) => {
                activeItem.value.colors[index] = val
            }

            const getLang = (val, index) => {
                activeItem.value.content_langs[index] = val.content_langs[index] ?? {}
                return activeItem.value.content_langs[index]
            }


            return {
                getLang,
                taxsTypes,
                vatsTypes,
                handleColors,
                selectedObject,
                showAddCategory,
                showEditSide,
                closeSide,
                content,
                templates,
                tabs,
                categories,
                brands,
                shipping,
                activeItem,
                activeTab,
                translate,
                collapsed,
                seoLang,
                save,
                back
            };
        },

        props: [
            'conf',
            'path',
            'system_setting',
            'business_setting',
            'langs',
            'setting',
            'item'
        ],

    };
</script>

<style>
textarea {
    width: 100%;
    height: 200px;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.preview {
    margin-top: 20px;
}

.preview h2 {
    margin-bottom: 10px;
}

.preview div {
    padding: 10px;
    border-radius: 4px;
}
</style>