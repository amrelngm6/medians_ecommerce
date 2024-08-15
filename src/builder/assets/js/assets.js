var imgsCounter = 0,
    assetManagerFilter = null,
    koSourceEditor, draggableContents = "";
var firstThemeInit = "builder_6";
var themesCategories = {
    'Show All Templates': 'Show All Templates',
    'Featured Templates': 'Featured Templates',
    'Neutral': 'Neutral',
    'Animals & Pets': 'Animals &amp; Pets',
    'Art & Creative': 'Art &amp; Creative',
    'Automotive & Transportation': 'Automotive &amp; Transportation',
    'Beauty & Cosmetics': 'Beauty &amp; Cosmetics',
    'Business & Services': 'Business &amp; Services',
    'Architecture & Construction': 'Architecture &amp; Construction',
    'E-Commerce': 'E-Commerce',
    'Education': 'Education',
    'Finance & Insurance': 'Finance &amp; Insurance',
    'Food & Drinks': 'Food &amp; Drinks',
    'Health & Medical': 'Health &amp; Medical',
    'Home & Garden': 'Home &amp; Garden',
    'Music & Entertainment': 'Music &amp; Entertainment',
    'Sports & Fitness': 'Sports &amp; Fitness',
    'Weddings & Events': 'Weddings &amp; Events',
    'Technology': 'Technology',
    'Travel & Lifestyle': 'Travel &amp; Lifestyle',

    'Travel': 'Travel &amp; Lifestyle',
    'Creative Services': 'Creative Services',
    'Food & Drink': 'Food & Drink'
};
if (window.self !== window.top) { window.top.koMenuClose(); }
var cPreviewTimeout, cAppId, cApplyTo, cApplyFunction, cApplyOpt, frameFitTimeout, hideCurrentMenuId = '0',
    hideOverlay, cf_toLoad = 1,
    cc_toLoad = 1,
    koUrl = "https://asd.trykopage.com/",
    koUrl_page = "https://asd.trykopage.com/home",
    defaultImage = "",
    draggableApps = "<div class=\"row\"><div class=\"col-6\" style=\"position:relative\"><a href=\"javascript:void(null)\" class=\"koMenuButton mb-3\" onclick=\"koShowFrame(\'add_module\',\'/admin/builder?p=gallery&addToPage=1\')\"><span class=\"koMenuButton_icon\"><i class=\"fas fa-images fa-2x\"></i></span><span>Photo Gallery<em style=\"display:none\">gallery</em><small></small></span></a></div><div class=\"col-6\" style=\"position:relative\"><a href=\"javascript:void(null)\" class=\"koMenuButton mb-3\" data-kid=\"4016.1\" onclick=\"keditSeparatorAdd(this)\"><span class=\"koMenuButton_icon\"><i class=\"fab fa-youtube fa-2x\"></i></span><span>Video<em style=\"display:none\">video</em><small></small></span></a></div><div class=\"col-6\" style=\"position:relative\"><a href=\"javascript:void(null)\" class=\"koMenuButton mb-3\" data-kid=\"{@paste@}\" rel=\"keditItem\" data-module-opt=\"11\" data-module-id=\"paste\" onclick=\"keditSeparatorAdd(this)\"><span class=\"koMenuButton_icon\"><i class=\"fas fa-code fa-2x\"></i></span><span>Custom HTML Code<em style=\"display:none\">paste</em><small></small></span></a></div><div class=\"col-6\" style=\"position:relative\"><a href=\"javascript:void(null)\" class=\"koMenuButton mb-3\" data-kid=\"{@FDOWNLOAD@}\" rel=\"keditItem\" data-module-opt=\"12\" data-module-id=\"FDOWNLOAD\" onclick=\"keditSeparatorAdd(this)\"><span class=\"koMenuButton_icon\"><i class=\"fas fa-cloud-download-alt fa-2x\"></i></span><span>File download<em style=\"display:none\">FDOWNLOAD</em><small></small></span></a></div><div class=\"col-6\" style=\"position:relative\"><a href=\"javascript:void(null)\" class=\"koMenuButton mb-3\" onclick=\"koShowFrame(\'add_module\',\'/admin/builder?p=form&addToPage=1\')\"><span class=\"koMenuButton_icon\"><i class=\"fas fa-envelope fa-2x\"></i></span><span>Form Builder<em style=\"display:none\">form</em><small></small></span></a></div><div class=\"col-6\" style=\"position:relative\"><a href=\"javascript:void(null)\" class=\"koMenuButton mb-3\" data-kid=\"{@map@}\" rel=\"keditItem\" data-module-opt=\"1\" data-module-id=\"map\" onclick=\"keditSeparatorAdd(this)\"><span class=\"koMenuButton_icon\"><i class=\"fas fa-map-marker-alt fa-2x\"></i></span><span>Location Map<em style=\"display:none\">map</em><small></small></span></a></div><div class=\"col-6\" style=\"position:relative\"><a href=\"javascript:void(null)\" class=\"koMenuButton mb-3\" data-kid=\"{@audioPlayer@}\" rel=\"keditItem\" data-module-opt=\"13\" data-module-id=\"audioPlayer\" onclick=\"keditSeparatorAdd(this)\"><span class=\"koMenuButton_icon\"><i class=\"fas fa-music fa-2x\"></i></span><span>Audio Player<em style=\"display:none\">audioPlayer</em><small></small></span></a></div><div class=\"col-6\" style=\"position:relative\"><a href=\"javascript:void(null)\" class=\"koMenuButton mb-3\" onclick=\"koShowFrame(\'add_module\',\'/admin/builder?p=shop&addToPage=1\')\"><span class=\"koMenuButton_icon\"><i class=\"fas fa-cart-plus fa-2x\"></i></span><span>Shop<em style=\"display:none\">shop</em><small></small></span></a></div><div class=\"col-6\" style=\"position:relative\"><a href=\"javascript:void(null)\" class=\"koMenuButton mb-3\" onclick=\"koShowFrame(\'add_module\',\'/admin/builder?p=slider&addToPage=1\')\"><span class=\"koMenuButton_icon\"><i class=\"far fa-images fa-2x\"></i></span><span>Slider<em style=\"display:none\">slider</em><small></small></span></a></div><div class=\"col-6\" style=\"position:relative\"><a href=\"javascript:void(null)\" class=\"koMenuButton mb-3\" onclick=\"koShowFrame(\'add_module\',\'/admin/builder?p=blog&addToPage=1\')\"><span class=\"koMenuButton_icon\"><i class=\"fas fa-podcast fa-2x\"></i></span><span>Blog<em style=\"display:none\">blog</em><small></small></span></a></div><div class=\"col-6\" style=\"position:relative\"><a href=\"javascript:void(null)\" class=\"koMenuButton mb-3\" data-kid=\"{@vote@}\" rel=\"keditItem\" data-module-opt=\"1\" data-module-id=\"vote\" onclick=\"keditSeparatorAdd(this)\"><span class=\"koMenuButton_icon\"><i class=\"fas fa-tasks fa-2x\"></i></span><span>Voting Poll<em style=\"display:none\">vote</em><small></small></span></a></div><div class=\"col-6\" style=\"position:relative\"><a href=\"javascript:void(null)\" class=\"koMenuButton mb-3\" data-kid=\"{@kb@}\" rel=\"keditItem\" data-module-opt=\"1\" data-module-id=\"kb\" onclick=\"keditSeparatorAdd(this)\"><span class=\"koMenuButton_icon\"><i class=\"fas fa-info-circle fa-2x\"></i></span><span>Knowledge Base<em style=\"display:none\">kb</em><small></small></span></a></div><div class=\"col-6\" style=\"position:relative\"><a href=\"javascript:void(null)\" class=\"koMenuButton mb-3\" data-kid=\"{@faq@}\" rel=\"keditItem\" data-module-opt=\"1\" data-module-id=\"faq\" onclick=\"keditSeparatorAdd(this)\"><span class=\"koMenuButton_icon\"><i class=\"fas fa-question-circle fa-2x\"></i></span><span>Questions & Answers<em style=\"display:none\">faq</em><small></small></span></a></div><div class=\"col-6\" style=\"position:relative\"><a href=\"javascript:void(null)\" class=\"koMenuButton mb-3\" data-kid=\"{@newsletter@}\" rel=\"keditItem\" data-module-opt=\"1\" data-module-id=\"newsletter\" onclick=\"keditSeparatorAdd(this)\"><span class=\"koMenuButton_icon\"><i class=\"fas fa-newspaper fa-2x\"></i></span><span>Newsletter<em style=\"display:none\">newsletter</em><small></small></span></a></div><div class=\"col-6\" style=\"position:relative\"><a href=\"javascript:void(null)\" class=\"koMenuButton mb-3\" onclick=\"koShowFrame(\'add_module\',\'/admin/builder?p=feed&addToPage=1\')\"><span class=\"koMenuButton_icon\"><i class=\"fas fa-rss fa-2x\"></i></span><span>RSS Feed Reader<em style=\"display:none\">feed</em><small></small></span></a></div><div class=\"col-6\" style=\"position:relative\"><a href=\"javascript:void(null)\" class=\"koMenuButton mb-3\" data-kid=\"{@calendar@}\" rel=\"keditItem\" data-module-opt=\"1\" data-module-id=\"calendar\" onclick=\"keditSeparatorAdd(this)\"><span class=\"koMenuButton_icon\"><i class=\"fas fa-calendar-alt fa-2x\"></i></span><span>Calendar<em style=\"display:none\">calendar</em><small></small></span></a></div><div class=\"col-6\" style=\"position:relative\"><a href=\"javascript:void(null)\" class=\"koMenuButton mb-3\" onclick=\"koShowFrame(\'add_module\',\'/admin/builder?p=RestaurantMenu&addToPage=1\')\"><span class=\"koMenuButton_icon\"><i class=\"fas fa-utensils fa-2x\"></i></span><span>Restaurant Menu<em style=\"display:none\">RestaurantMenu</em><small></small></span></a></div><div class=\"col-6\" style=\"position:relative\"><a href=\"javascript:void(null)\" class=\"koMenuButton mb-3\" data-kid=\"{@sitemap@}\" rel=\"keditItem\" data-module-opt=\"1\" data-module-id=\"sitemap\" onclick=\"keditSeparatorAdd(this)\"><span class=\"koMenuButton_icon\"><i class=\"fas fa-sitemap fa-2x\"></i></span><span>Sitemap<em style=\"display:none\">sitemap</em><small></small></span></a></div><div class=\"col-6\" style=\"position:relative\"><a href=\"javascript:void(null)\" class=\"koMenuButton mb-3\" data-kid=\"{@submenu_1@}\" rel=\"keditItem\" data-module-opt=\"1\" data-module-id=\"submenu\" onclick=\"keditSeparatorAdd(this)\"><span class=\"koMenuButton_icon\"><i class=\"fas fa-folder-open fa-2x\"></i></span><span>Subpages Menu<em style=\"display:none\">submenu</em><small></small></span></a></div></div><div class=\"koMenuSectionTitle my-4\">Integrations</div><div class=\"row\"><div class=\"col-6\" style=\"position:relative\"><a href=\"javascript:void(null)\" class=\"koMenuButton mb-3 p-0\" ><div class=\"addElfWidget\"></div></a></div><div class=\"col-6\" style=\"position:relative\"><a href=\"javascript:void(null)\" onclick=\"koLogoMaker();\"  class=\"koMenuButton mb-3\" data-skip=\"\" ><span class=\"koMenuButton_icon\"><i class=\"fas fa-wand-magic-sparkles fa-2x\"></i></span><span>Create a Logo<em style=\"display:none\">logoMaker</em><small></small></span></a></div><div class=\"col-6\" style=\"position:relative\"><a href=\"javascript:void(null)\" class=\"koMenuButton mb-3\" data-kid=\"{@tawkto@}\" rel=\"keditItem\" data-module-opt=\"1\" data-module-id=\"tawkto\" onclick=\"koShowFrame(null,\'/admin/builder?p=tawkto\')\"><span class=\"koMenuButton_icon\"><i class=\"fas fa-comments fa-2x\"></i></span><span>Live Chat<small class=d-block>tawk.to</small><em style=\"display:none\">tawkto</em><small></small></span></a></div><div class=\"col-6\" style=\"position:relative\"><a href=\"javascript:void(null)\" class=\"koMenuButton mb-3\" data-kid=\"{@smartsupp@}\" rel=\"keditItem\" data-module-opt=\"1\" data-module-id=\"smartsupp\" onclick=\"koShowFrame(null,\'/admin/builder?p=smartsupp\')\"><span class=\"koMenuButton_icon\"><i class=\"fas fa-comments fa-2x\"></i></span><span>Live Chat<small class=d-block>Smartsupp</small><em style=\"display:none\">smartsupp</em><small></small></span></a></div><div class=\"col-6\" style=\"position:relative\"><a href=\"javascript:void(null)\" class=\"koMenuButton mb-3\" data-kid=\"{@cal@}\" rel=\"keditItem\" data-module-opt=\"1\" data-module-id=\"cal\" onclick=\"keditSeparatorAdd(this)\"><span class=\"koMenuButton_icon\"><i class=\"fas fa-calendar-alt fa-2x\"></i></span><span>Cal.com<em style=\"display:none\">cal</em><small></small></span></a></div><div class=\"col-6\" style=\"position:relative\"><a href=\"javascript:void(null)\" class=\"koMenuButton mb-3\" data-kid=\"{@calendly@}\" rel=\"keditItem\" data-module-opt=\"1\" data-module-id=\"calendly\" onclick=\"keditSeparatorAdd(this)\"><span class=\"koMenuButton_icon\"><i class=\"fas fa-calendar-alt fa-2x\"></i></span><span>Calendly<em style=\"display:none\">calendly</em><small></small></span></a></div><div class=\"col-6\" style=\"position:relative\"><a href=\"javascript:void(null)\" class=\"koMenuButton mb-3\" data-kid=\"{@ecwid@}\" rel=\"keditItem\" data-module-opt=\"1\" data-module-id=\"ecwid\" onclick=\"keditSeparatorAdd(this)\"><span class=\"koMenuButton_icon\"><i class=\"fas fa-cart-shopping fa-2x\"></i></span><span>Ecwid<small class=d-block>Shopping cart</small><em style=\"display:none\">ecwid</em><small></small></span></a></div></div>",
    documentEditorJS = "https://cdn.jsdelivr.net/combine/npm/editorjs-drag-drop@1.1.13/dist/bundle.js,npm/editorjs-paragraph-with-alignment@3.0.0,npm/editorjs-alert@latest,npm/@editorjs/raw@latest,npm/@editorjs/header@latest,npm/@editorjs/simple-image@latest,npm/@editorjs/delimiter@latest,npm/@editorjs/list@latest,npm/@editorjs/nested-list@latest,npm/@editorjs/underline@latest,npm/@editorjs/checklist@latest,npm/@editorjs/quote@latest,npm/@editorjs/code@latest,npm/@editorjs/embed@latest,npm/@editorjs/table@latest,npm/@editorjs/link@latest,npm/@editorjs/marker@latest,npm/@editorjs/inline-code@latest,npm/editorjs-text-alignment-blocktune@latest,npm/@canburaks/text-align-editorjs@latest,npm/@groupher/editor-collapse@latest,npm/editorjs-youtube-embed@latest,npm/editorjs-toggle-block@0.3.8,npm/@editorjs/editorjs@latest"; 
jQuery('body').addClass('keditLoading');
function koHideLoading() {
    jQuery("#spinnerHolder").removeClass('koLoading');
}
function koInfoNotice(msg) {
    koHideLoading();
}

var sortablesConnectedTo = "",
    keditBlockMaker_el = [],
    _langPreloading = "Loading";
var koparsedNotEditable = false;
sortablesConnectedTo = "#headerContent,#contentArea,#footerContent,.keditColumn";
var managerMode = "files";
var menuPageId = 1,
    menuMenuId = 1,
    templateId = "1",
    themesCDN = "https://cdn.cpanel-sitebuilder.com/themes/4.4/",
    inlineEditItem = "",
    inlineEditLink = "",
    inlineAdd = "",
    keditBlockId = "",
    koVersion = "4.4.2",
    koThemes = "https://cdn.cpanel-sitebuilder.com/themes/4.4/";
var koThemesJson = "",
    koCustomThemesJson = "";
var lazyLoadEnabled = 1;
var showElfsightWidgets = 1;
var showElfsightWidgets_separate = 0;
var showElfsightWidgets_bottom = 0;
var showElfsightWidgets_inSidebar = 0;
var themesHiddenCategories = [];
var leftSavingTimeout, leftSavingTimeout_u, langPhrase = { chooseImage: "Choose an image", description: "Description", elfsightWidgets: "Elfsight Widgets", contentBlockDesigner: "Content block designer", download: "Download", fullWidth: "Full Width", editWidget: "Edit this widget", systemFonts: "System fonts", googleFonts: "Google Fonts", footerLabel: "This is your Website Footer Area", removeSavedColors: "Remove Saved Colors", removeLink: "Remove this link", addPage: "Add a new subpage", blockSettings: "Block Settings", search: "Search", copy: "Copy", edit: "Edit", categories: "Categories", preview: "Preview", install: "Install", blockEdit: "Edit this block", blockAdd: "Add new content or app here", blockMove: "Move this block", blockRemove: "Remove this content block", blockRemoving: "You\'re removing this content block. Are you sure you want to continue", jsSure: "Are you sure", header: "Header", welcomeButton: "Click to change this text", pressTab: "Press \"tab\" button for more options or start typing", imgAlt: "Image Alternative Text", optional: "Optional", text: "Text", image: "Image", video: "Video", apps: "Apps", popular: "Popular", blocks: "Content Blocks", galleryDefault: "Default", gallerySlideshow: "Slideshow", galleryCollage: "Collage", galleryAdd: "Add a Gallery", galleryEffect: "Choose a Gallery Effect", galleryChoose: "Choose a Gallery", vertical: "Vertically", horizontal: "Horizontally", displayMenu: "Display submenu", menuChoose: "select a menu", menuAdd: "Add a website menu", imageEditor: "Image Editor", imageFind: "Choose an image", linkEditor: "Change Link Address", cancel: "Cancel", save: "Save changes", continue: "Continue", chooseIcon: "Choose an Icon", columns: "Columns", headerEl: "Header Element", footerEl: "Footer Element", contentEl: "Content Block", headerSettings: "Header Settings", footerSettings: "Footer Settings", editable: "Editable Area", videoSettings: "Video Settings", separatorSettings: "Separator", addNewContentHere: "Add new content here", yesRemove: "Yes, remove", appsOnThisPage: "Apps on this page", addModuleToThisPage: "Add a Module to this page", dynamicColors: "Dynamic Colors", dynamicColorsTip: "Colors from current Color Scheme", appsOnThisBlock: "Apps on this block", backgroundColor: "Background color", linkUrl: "Link URL", designBlock: "Design a content block", featuredThemes: "Featured Templates", youtubeWelcomeVideo: "https://www.youtube-nocookie.com/embed/7aDO4PhlFOc", deleteConfirm: "Are you sure you want to delete?", header: "Header", loremIpsum: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur", buttonPrimary: "Button Primary", learnMore: "Learn More", column: "Column", subtitle: "Subtitle", separator: "Separator", buttons: "Buttons", image: "Image", list: "List", text: "Text", settings: "Settings", cloneThis: "Clone this item", removeLast: "Remove last item", removeThis: "Remove this item", addAnother: "Add another button", addAnother: "Add another button", none: "None", item: "Item", button: "Button", gallery: "Photo Gallery", video: "Video", paste: "Custom HTML Code", FDOWNLOAD: "File download", form: "Form Builder", map: "Location Map", audioPlayer: "Audio Player", shop: "Shop", slider: "Slider", blog: "Blog", vote: "Voting Poll", kb: "Knowledge Base", faq: "Questions & Answers", newsletter: "Newsletter", feed: "RSS Feed Reader", calendar: "Calendar", RestaurantMenu: "Restaurant Menu", sitemap: "Sitemap", submenu: "Subpages Menu", elfsight: "Elfsight Widgets<small class=d-block></small>", logoMaker: "Create a Logo", tawkto: "Live Chat<small class=d-block>tawk.to</small>", smartsupp: "Live Chat<small class=d-block>Smartsupp</small>", cal: "Cal.com", calendly: "Calendly", ecwid: "Ecwid<small class=d-block>Shopping cart</small>", footer: "Social Networks" };
var sessionRefreshRepeat = 300000;
var sessionRefreshStart = 300000;
var keditableMode = false;
var cbPhrases = {
    'data-aos': "data-skip",
    'id="newKedit': 'id="skipKedit',
    '[PAGENAME]': "Your Website",
    '[GETSTARTED]': "Get started",
    '[EMAIL]': "your@email.com",
    '[UC_PAGENAME]': "Your Website".toUpperCase(),
    '[TITLE1]': "Your Website",
    '[IMGIX_BLEND]': '',
    '[DESC1]': "Sed pede ullamcorper amet ullamcorper primis, nam pretium suspendisse neque, a phasellus sit pulvinar vel integer.",
    '[DESC2]': "Ullamcorper primis, nam pretium suspendisse neque",
    '[VIDEO]': '', //https://www.youtube-nocookie.com/embed/7aDO4PhlFOc',
    '[VIDEO_URL]': 'https://www.youtube.com/watch?v=7aDO4PhlFOc',
    '[BREADCRUMBS]': '<ol class="breadcrumb"><li class="breadcrumb-item"><a href="">Home</a></li><li class="breadcrumb-item"><div class="keditable d-inline-block">Your Website</div></li></ol>',
    '[COLUMN_TITLE]': "Column",
    '[YEAR]': '2023',
    '[COPYRIGHT]': 'All rights reserved',
    '[LOGO]': 'dist/uploads/',
    '[FT_COPYRIGHT]': "Copyright &copy;2023 Company Name, All Rights Reserved",
    '[FT_LOGOALT]': "Company Name",
    '[FT_COMPANY]': "Company Name",
    '[FT_ADDRESS]': '123 Street, San Francisco, USA',

    '[ACTION1]': "Buy Now",
    '[ACTION2]': "More Info",
    '[ACTION3]': "Buy Now",
    '[ACTION4]': "More Info",
    '[ACTION5]': "Contact us",
    '[QUESTION1]': "Do you have any questions?",
    
    // Footer items.
    '{@sitemap@}': '<div class="koparsed kelement" rel="sitemap"><ul class="sitemap"><li>Main Menu<ul><li><a href="#"><span>Home</span></a></li><li><a href="#"><span>About</span></a></li><li><a href="#"><span>Contact us</span></a></li></ul></li></ul><ul class="sitemap"><li>Legal<ul><li><a href="#"><span>Terms of use</span></a></li><li><a href="#"><span>Pricacy Policy</span></a></li></ul></li></ul></div>',
    '{@footer@}': '<div class="koparsed kelement" rel="footer"><div class="footerHolder" id="keditFooterModule"><ul class="social_fa social_bw social_bwh social_footer"><a href="#"><i class="fab fa-facebook-square fa-2x fa-fw"></i></a><a href="#"><i class="fab fa-twitter fa-2x fa-fw"></i></a><a href="#"><i class="fab fa-youtube fa-2x fa-fw"></i></a></ul></div></div>',
    labels: {
        'banners': 'Banners',
        'contents': 'Contents',
        'headers': 'Headers',
        'apps': 'Objects',
        'cta': 'Call to Action',
        'features': 'Features',
        'landing': 'Landing Banners',
        'columns': 'Columns',
        'social': 'Social Media',
        'testimonials': 'Testimonials',
        'teams': 'Teams',
        'pricing': 'Pricing',
        'contacts': 'Contacts',
        'footer': 'Footers',
        'clickToAdd': 'Click to Add',
        'clickToReplaceFooter': 'Click to replace your footer',
        'clickToAdd_objectVideo': 'Video',
        'clickToAdd_objectTable': 'Table',
        'clickToAdd_objectImage': 'Image',
        'clickToAdd_objectCountdown': 'Countdown'
    }
};
var editButtonLabel = "delete",
    dataPath = "",
    draggableType = 0,
    tinyIFrame = null,
    tinyIFrameWindow = null,
    tinyIFrameWindowMedia = null,
    kRemoveElementTimer, keditorElement, focusElement, rspace = 0,
    keditorColorsCode = '',
    refreshTimeout, configLanguage = "en",
    linkClass = '',
    spinnerMoreValue = 0,
    FilexLocation = './files/',
    blockPadding = false,
    blockContents = false,
    koContentBlocks = '/admin/builder/load?page=blocks',
    koContentEmailBlocks = '/admin/builder/load?page=email_blocks',
    koContentBlocksLimit = '',
    proLicense = 1,
    featherEditor, paddleSetup;


function koLogoMaker() {
    var logoColors = jQuery('#cc__Color1').val().substr(1, 6) + '-' + jQuery('#cc__Color2').val().substr(1, 6);
    if (logoColors.length != 13) {
        logoColors = '';
    } else
        logoColors = '&colors=' + logoColors;
    logoColors += "&interface=179BD7-293A4A-005f9b";
    koShowFrame(null, 'https://freelogo.me/logo_sitebuilder.php?title=Company+Name&amp;isKopage=1&amp;lang=en' + logoColors);

}


