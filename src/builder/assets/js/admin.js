function k_jQueryCheck() {
    if (!window.jQuery) {
        var e = document.createElement("script");
        e.type = "text/javascript";
        e.src = "https://cdn.jsdelivr.net/npm/jquery@3.6.1/dist/jquery.min.js";
        document.getElementsByTagName("head")[0].appendChild(e);
    }
}
k_jQueryCheck();
var refreshWithSave = 1,
    ktempCode,
    ktempCodeId = null,
    moveType,
    $cc__Color1,
    $cc__Color2;
function showYouTube(e) {
    $("body").prepend(
        '<div id="videoFrame" style="background:rgba(0,0,0,0.5);text-align:center;position:fixed;left:0;right:0;top:0;bottom:0;height:100vw;z-index:7777770;vertical-align:middle"><iframe style="box-shadow:5px 5px 35px rgba(0,0,0,0.5);position:fixed;left:15vw;right:15vw;top:8%;display:block;margin:0;padding:10px;background:#fff;width:70vw;height:40vw;max-height:90%;z-index:77771;border:0;" src="' +
            e +
            '?autoplay=1&showinfo=0&rel=0&autohide=1&disablekb=1&modestbranding=1" allow="accelerometer; clipboard-write; gyroscope; picture-in-picture" allowfullscreen></iframe><a href="javascript:void(null)" onclick="$(\'#videoFrame\').remove();" style="display:block;height:8vw;width:8vw;line-height:8vw;font-size:4vw;padding:0;text-align:center;color:#fff;background:#333;position:fixed;top:5%;right:5vw;border-radius:10vw;box-shadow:5px 5px 35px rgba(0,0,0,0.8);"><i class="fas fa-times"></i></a></div>'
    );
}
function koShowLoading(e) {
    $("#spinnerHolder").addClass("koLoading");
}
function koConfirm(e, a) {
    var t = { title: "<p>" + langPhrase.deleteConfirm + "</p>", cancel: langPhrase.cancel, continue: langPhrase.yesRemove, action: null };
    if (typeof e === "object" && e !== null) {
        if (typeof e.title !== "undefined") t.title = "<p>" + e.title + "</p>";
        if (typeof e.cancel !== "undefined") t.cancel = e.cancel;
        if (typeof e.continue !== "undefined") t.continue = e.continue;
    }
    if (typeof a === "function") {
        t.action = { title: t.continue, fn: a };
    }
    basicModal.show({ body: t.title, closable: !0, buttons: { cancel: { title: t.cancel, fn: basicModal.close }, action: t.action } });
}
var koFontList =
        "-apple-system.BlinkMacSystemFont.avenir next.avenir.segoe ui.helvetica neue.helvetica.Ubuntu.roboto.noto.arial.sans-serif|latin/latin-ext,Iowan Old Style.Apple Garamond.Baskerville.Times New Roman.Droid Serif.Times.Source Serif Pro.serif.Apple Color Emoji.Segoe UI Emoji.Segoe UI Symbol|latin/latin-ext,Menlo.Consolas.Monaco.Liberation Mono.Lucida Console.monospace|latin/latin-ext,Arial.sans-serif|latin/latin-ext,Times New Roman.serif|latin/latin-ext,ABeeZee|latin/latin-ext,Abel|latin,Abhaya Libre|latin/latin-ext/sinhala,Aboreto|latin/latin-ext,Abril Fatface|latin/latin-ext,Abyssinica SIL|ethiopic/latin/latin-ext,Aclonica|latin,Acme|latin,Actor|latin,Adamina|latin,Advent Pro|cyrillic/cyrillic-ext/greek/latin/latin-ext,Aguafina Script|latin/latin-ext,Akaya Kanadaka|kannada/latin/latin-ext,Akaya Telivigala|latin/latin-ext/telugu,Akronim|latin/latin-ext,Akshar|devanagari/latin/latin-ext,Aladin|latin/latin-ext,Alata|latin/latin-ext/vietnamese,Alatsi|cyrillic-ext/latin/latin-ext/vietnamese,Albert Sans|latin/latin-ext,Aldrich|latin,Alef|hebrew/latin,Alegreya|cyrillic/cyrillic-ext/greek/greek-ext/latin/latin-ext/vietnamese,Alegreya SC|cyrillic/cyrillic-ext/greek/greek-ext/latin/latin-ext/vietnamese,Alegreya Sans|cyrillic/cyrillic-ext/greek/greek-ext/latin/latin-ext/vietnamese,Alegreya Sans SC|cyrillic/cyrillic-ext/greek/greek-ext/latin/latin-ext/vietnamese,Aleo|latin/latin-ext,Alex Brush|latin/latin-ext/vietnamese,Alexandria|arabic/latin/latin-ext/vietnamese,Alfa Slab One|latin/latin-ext/vietnamese,Alice|cyrillic/cyrillic-ext/latin/latin-ext,Alike|latin,Alike Angular|latin,Alkalami|arabic/latin/latin-ext,Allan|latin/latin-ext,Allerta|latin,Allerta Stencil|latin,Allison|latin/latin-ext/vietnamese,Allura|latin/latin-ext/vietnamese,Almendra|latin/latin-ext,Almendra Display|latin/latin-ext,Almendra SC|latin,Alumni Sans|cyrillic/cyrillic-ext/latin/latin-ext/vietnamese,Alumni Sans Collegiate One|cyrillic/latin/latin-ext/vietnamese,Alumni Sans Inline One|latin/latin-ext/vietnamese,Alumni Sans Pinstripe|cyrillic/cyrillic-ext/latin/latin-ext/vietnamese,Amarante|latin/latin-ext,Amaranth|latin,Amatic SC|cyrillic/hebrew/latin/latin-ext/vietnamese,Amethysta|latin,Amiko|devanagari/latin/latin-ext,Amiri|arabic/latin/latin-ext,Amiri Quran|arabic/latin,Amita|devanagari/latin/latin-ext,Anaheim|latin/latin-ext,Andada Pro|latin/latin-ext/vietnamese,Andika|cyrillic/cyrillic-ext/latin/latin-ext/vietnamese,Anek Bangla|bengali/latin/latin-ext,Anek Devanagari|devanagari/latin/latin-ext,Anek Gujarati|gujarati/latin/latin-ext,Anek Gurmukhi|gurmukhi/latin/latin-ext,Anek Kannada|kannada/latin/latin-ext,Anek Latin|latin/latin-ext/vietnamese,Anek Malayalam|latin/latin-ext/malayalam,Anek Odia|latin/latin-ext/oriya,Anek Tamil|latin/latin-ext/tamil,Anek Telugu|latin/latin-ext/telugu,Angkor|khmer/latin,Annie Use Your Telescope|latin,Anonymous Pro|cyrillic/greek/latin/latin-ext,Antic|latin,Antic Didone|latin,Antic Slab|latin,Anton|latin/latin-ext/vietnamese,Antonio|latin/latin-ext,Anybody|latin/latin-ext/vietnamese,Arapey|latin,Arbutus|latin/latin-ext,Arbutus Slab|latin/latin-ext,Architects Daughter|latin,Archivo|latin/latin-ext/vietnamese,Archivo Black|latin/latin-ext,Archivo Narrow|latin/latin-ext/vietnamese,Are You Serious|latin/latin-ext/vietnamese,Aref Ruqaa|arabic/latin/latin-ext,Aref Ruqaa Ink|arabic/latin/latin-ext,Arima|greek/greek-ext/latin/latin-ext/malayalam/tamil/vietnamese,Arima Madurai|latin/latin-ext/tamil/vietnamese,Arimo|cyrillic/cyrillic-ext/greek/greek-ext/hebrew/latin/latin-ext/vietnamese,Arizonia|latin/latin-ext/vietnamese,Armata|latin/latin-ext,Arsenal|cyrillic/cyrillic-ext/latin/latin-ext/vietnamese,Artifika|latin,Arvo|latin,Arya|devanagari/latin/latin-ext,Asap|latin/latin-ext/vietnamese,Asap Condensed|latin/latin-ext/vietnamese,Asar|devanagari/latin/latin-ext,Asset|latin,Assistant|hebrew/latin/latin-ext,Astloch|latin,Asul|latin,Athiti|latin/latin-ext/thai/vietnamese,Atkinson Hyperlegible|latin/latin-ext,Atma|bengali/latin/latin-ext,Atomic Age|latin,Aubrey|latin,Audiowide|latin/latin-ext,Autour One|latin/latin-ext,Average|latin/latin-ext,Average Sans|latin/latin-ext,Averia Gruesa Libre|latin/latin-ext,Averia Libre|latin,Averia Sans Libre|latin,Averia Serif Libre|latin,Azeret Mono|latin/latin-ext,B612|latin,B612 Mono|latin,BIZ UDGothic|cyrillic/greek-ext/japanese/latin/latin-ext,BIZ UDMincho|cyrillic/greek-ext/japanese/latin/latin-ext,BIZ UDPGothic|cyrillic/greek-ext/japanese/latin/latin-ext,BIZ UDPMincho|cyrillic/greek-ext/japanese/latin/latin-ext,Babylonica|latin/latin-ext/vietnamese,Bad Script|cyrillic/latin,Bahiana|latin/latin-ext,Bahianita|latin/latin-ext/vietnamese,Bai Jamjuree|latin/latin-ext/thai/vietnamese,Bakbak One|devanagari/latin/latin-ext,Ballet|latin/latin-ext/vietnamese,Baloo 2|devanagari/latin/latin-ext/vietnamese,Baloo Bhai 2|gujarati/latin/latin-ext/vietnamese,Baloo Bhaijaan 2|arabic/latin/latin-ext/vietnamese,Baloo Bhaina 2|latin/latin-ext/oriya/vietnamese,Baloo Chettan 2|latin/latin-ext/malayalam/vietnamese,Baloo Da 2|bengali/latin/latin-ext/vietnamese,Baloo Paaji 2|gurmukhi/latin/latin-ext/vietnamese,Baloo Tamma 2|kannada/latin/latin-ext/vietnamese,Baloo Tammudu 2|latin/latin-ext/telugu/vietnamese,Baloo Thambi 2|latin/latin-ext/tamil/vietnamese,Balsamiq Sans|cyrillic/cyrillic-ext/latin/latin-ext,Balthazar|latin,Bangers|latin/latin-ext/vietnamese,Barlow|latin/latin-ext/vietnamese,Barlow Condensed|latin/latin-ext/vietnamese,Barlow Semi Condensed|latin/latin-ext/vietnamese,Barriecito|latin/latin-ext/vietnamese,Barrio|latin/latin-ext,Basic|latin/latin-ext,Baskervville|latin/latin-ext,Battambang|khmer/latin,Baumans|latin,Bayon|khmer/latin,Be Vietnam Pro|latin/latin-ext/vietnamese,Beau Rivage|latin/latin-ext/vietnamese,Bebas Neue|latin/latin-ext,Belgrano|latin,Bellefair|hebrew/latin/latin-ext,Belleza|latin/latin-ext,Bellota|cyrillic/latin/latin-ext/vietnamese,Bellota Text|cyrillic/latin/latin-ext/vietnamese,BenchNine|latin/latin-ext,Benne|kannada/latin/latin-ext,Bentham|latin,Berkshire Swash|latin/latin-ext,Besley|latin/latin-ext,Beth Ellen|latin,Bevan|latin/latin-ext/vietnamese,BhuTuka Expanded One|gurmukhi/latin/latin-ext,Big Shoulders Display|latin/latin-ext/vietnamese,Big Shoulders Inline Display|latin/latin-ext/vietnamese,Big Shoulders Inline Text|latin/latin-ext/vietnamese,Big Shoulders Stencil Display|latin/latin-ext/vietnamese,Big Shoulders Stencil Text|latin/latin-ext/vietnamese,Big Shoulders Text|latin/latin-ext/vietnamese,Bigelow Rules|latin/latin-ext,Bigshot One|latin,Bilbo|latin/latin-ext/vietnamese,Bilbo Swash Caps|latin/latin-ext,BioRhyme|latin/latin-ext,BioRhyme Expanded|latin/latin-ext,Birthstone|latin/latin-ext/vietnamese,Birthstone Bounce|latin/latin-ext/vietnamese,Biryani|devanagari/latin/latin-ext,Bitter|cyrillic/cyrillic-ext/latin/latin-ext/vietnamese,Black And White Picture|korean/latin,Black Han Sans|korean/latin,Black Ops One|cyrillic-ext/latin/latin-ext/vietnamese,Blaka|arabic/latin/latin-ext,Blaka Hollow|arabic/latin/latin-ext,Blaka Ink|arabic/latin/latin-ext,Blinker|latin/latin-ext,Bodoni Moda|latin/latin-ext,Bokor|khmer/latin,Bona Nova|cyrillic/cyrillic-ext/greek/hebrew/latin/latin-ext/vietnamese,Bonbon|latin,Bonheur Royale|latin/latin-ext/vietnamese,Boogaloo|latin,Bowlby One|latin,Bowlby One SC|latin/latin-ext,Brawler|latin,Bree Serif|latin/latin-ext,Brygada 1918|cyrillic/cyrillic-ext/greek/latin/latin-ext/vietnamese,Bubblegum Sans|latin/latin-ext,Bubbler One|latin/latin-ext,Buenard|latin/latin-ext,Bungee|latin/latin-ext/vietnamese,Bungee Hairline|latin/latin-ext/vietnamese,Bungee Inline|latin/latin-ext/vietnamese,Bungee Outline|latin/latin-ext/vietnamese,Bungee Shade|latin/latin-ext/vietnamese,Bungee Spice|latin/latin-ext/vietnamese,Butcherman|latin/latin-ext,Butterfly Kids|latin/latin-ext,Cabin|latin/latin-ext/vietnamese,Cabin Condensed|latin/latin-ext/vietnamese,Cabin Sketch|latin,Caesar Dressing|latin,Cagliostro|latin,Cairo|arabic/latin/latin-ext,Cairo Play|arabic/latin/latin-ext,Caladea|latin/latin-ext,Calistoga|latin/latin-ext/vietnamese,Calligraffitti|latin,Cambay|devanagari/latin/latin-ext,Cambo|latin/latin-ext,Candal|latin,Cantarell|latin/latin-ext,Cantata One|latin/latin-ext,Cantora One|latin/latin-ext,Capriola|latin/latin-ext,Caramel|latin/latin-ext/vietnamese,Carattere|latin/latin-ext/vietnamese,Cardo|greek/greek-ext/latin/latin-ext,Carme|latin,Carrois Gothic|latin,Carrois Gothic SC|latin,Carter One|latin,Castoro|latin/latin-ext,Catamaran|latin/latin-ext/tamil,Caudex|greek/greek-ext/latin/latin-ext,Caveat|cyrillic/cyrillic-ext/latin/latin-ext,Caveat Brush|latin/latin-ext,Cedarville Cursive|latin,Ceviche One|latin/latin-ext,Chakra Petch|latin/latin-ext/thai/vietnamese,Changa|arabic/latin/latin-ext,Changa One|latin,Chango|latin/latin-ext,Charis SIL|cyrillic/cyrillic-ext/latin/latin-ext/vietnamese,Charm|latin/latin-ext/thai/vietnamese,Charmonman|latin/latin-ext/thai/vietnamese,Chathura|latin/telugu,Chau Philomene One|latin/latin-ext,Chela One|latin/latin-ext,Chelsea Market|latin/latin-ext,Cherish|latin/latin-ext/vietnamese,Cherry Cream Soda|latin,Cherry Swash|latin/latin-ext,Chewy|latin,Chicle|latin/latin-ext,Chilanka|latin/malayalam,Chivo|latin/latin-ext/vietnamese,Chivo Mono|latin/latin-ext/vietnamese,Chonburi|latin/latin-ext/thai/vietnamese,Cinzel|latin/latin-ext,Cinzel Decorative|latin,Clicker Script|latin/latin-ext,Climate Crisis|latin/latin-ext,Coda|latin/latin-ext,Codystar|latin/latin-ext,Coiny|latin/latin-ext/tamil/vietnamese,Combo|latin/latin-ext,Comfortaa|cyrillic/cyrillic-ext/greek/latin/latin-ext/vietnamese,Comforter|cyrillic/latin/latin-ext/vietnamese,Comforter Brush|cyrillic/latin/latin-ext/vietnamese,Comic Neue|latin,Coming Soon|latin,Commissioner|cyrillic/cyrillic-ext/greek/latin/latin-ext/vietnamese,Concert One|latin/latin-ext,Condiment|latin/latin-ext,Contrail One|latin,Convergence|latin/latin-ext,Cookie|latin,Copse|latin,Corben|latin/latin-ext,Corinthia|latin/latin-ext/vietnamese,Cormorant|cyrillic/cyrillic-ext/latin/latin-ext/vietnamese,Cormorant Garamond|cyrillic/cyrillic-ext/latin/latin-ext/vietnamese,Cormorant Infant|cyrillic/cyrillic-ext/latin/latin-ext/vietnamese,Cormorant SC|cyrillic/cyrillic-ext/latin/latin-ext/vietnamese,Cormorant Unicase|cyrillic/cyrillic-ext/latin/latin-ext/vietnamese,Cormorant Upright|latin/latin-ext/vietnamese,Courgette|latin/latin-ext,Courier Prime|latin/latin-ext,Cousine|cyrillic/cyrillic-ext/greek/greek-ext/hebrew/latin/latin-ext/vietnamese,Coustard|latin,Covered By Your Grace|latin,Crafty Girls|latin,Creepster|latin,Crete Round|latin/latin-ext,Crimson Pro|latin/latin-ext/vietnamese,Crimson Text|latin/latin-ext/vietnamese,Croissant One|latin/latin-ext,Crushed|latin,Cuprum|cyrillic/cyrillic-ext/latin/latin-ext/vietnamese,Cute Font|korean/latin,Cutive|latin/latin-ext,Cutive Mono|latin/latin-ext,DM Mono|latin/latin-ext,DM Sans|latin/latin-ext,DM Serif Display|latin/latin-ext,DM Serif Text|latin/latin-ext,Damion|latin,Dancing Script|latin/latin-ext/vietnamese,Dangrek|khmer/latin,Darker Grotesque|latin/latin-ext/vietnamese,David Libre|hebrew/latin/latin-ext/vietnamese,Dawning of a New Day|latin,Days One|latin,Dekko|devanagari/latin/latin-ext,Dela Gothic One|cyrillic/greek/japanese/latin/latin-ext/vietnamese,Delius|latin,Delius Swash Caps|latin,Delius Unicase|latin,Della Respira|latin,Denk One|latin/latin-ext,Devonshire|latin/latin-ext,Dhurjati|latin/telugu,Didact Gothic|cyrillic/cyrillic-ext/greek/greek-ext/latin/latin-ext,Diplomata|latin/latin-ext,Diplomata SC|latin/latin-ext,Do Hyeon|korean/latin,Dokdo|korean/latin,Domine|latin/latin-ext,Donegal One|latin/latin-ext,Dongle|korean/latin/latin-ext/vietnamese,Doppio One|latin/latin-ext,Dorsa|latin,Dosis|latin/latin-ext/vietnamese,DotGothic16|cyrillic/japanese/latin/latin-ext,Dr Sugiyama|latin/latin-ext,Duru Sans|latin/latin-ext,DynaPuff|cyrillic-ext/latin/latin-ext,Dynalight|latin/latin-ext,EB Garamond|cyrillic/cyrillic-ext/greek/greek-ext/latin/latin-ext/vietnamese,Eagle Lake|latin/latin-ext,East Sea Dokdo|korean/latin,Eater|latin/latin-ext,Economica|latin/latin-ext,Eczar|devanagari/greek/greek-ext/latin/latin-ext,Edu NSW ACT Foundation|latin,Edu QLD Beginner|latin,Edu SA Beginner|latin,Edu TAS Beginner|latin,Edu VIC WA NT Beginner|latin,El Messiri|arabic/cyrillic/latin/latin-ext,Electrolize|latin,Elsie|latin/latin-ext,Elsie Swash Caps|latin/latin-ext,Emblema One|latin/latin-ext,Emilys Candy|latin/latin-ext,Encode Sans|latin/latin-ext/vietnamese,Encode Sans Condensed|latin/latin-ext/vietnamese,Encode Sans Expanded|latin/latin-ext/vietnamese,Encode Sans SC|latin/latin-ext/vietnamese,Encode Sans Semi Condensed|latin/latin-ext/vietnamese,Encode Sans Semi Expanded|latin/latin-ext/vietnamese,Engagement|latin,Englebert|latin/latin-ext,Enriqueta|latin/latin-ext,Ephesis|latin/latin-ext/vietnamese,Epilogue|latin/latin-ext/vietnamese,Erica One|latin/latin-ext,Esteban|latin/latin-ext,Estonia|latin/latin-ext/vietnamese,Euphoria Script|latin/latin-ext,Ewert|latin/latin-ext,Exo|latin/latin-ext/vietnamese,Exo 2|cyrillic/cyrillic-ext/latin/latin-ext/vietnamese,Expletus Sans|latin/latin-ext,Explora|cherokee/latin/latin-ext/vietnamese,Fahkwang|latin/latin-ext/thai/vietnamese,Familjen Grotesk|latin/latin-ext/vietnamese,Fanwood Text|latin,Farro|latin/latin-ext,Farsan|gujarati/latin/latin-ext/vietnamese,Fascinate|latin,Fascinate Inline|latin,Faster One|latin,Fasthand|khmer/latin,Fauna One|latin/latin-ext,Faustina|latin/latin-ext/vietnamese,Federant|latin,Federo|latin,Felipa|latin/latin-ext,Fenix|latin/latin-ext,Festive|latin/latin-ext/vietnamese,Figtree|latin/latin-ext,Finger Paint|latin,Finlandica|cyrillic/cyrillic-ext/latin/latin-ext,Fira Code|cyrillic/cyrillic-ext/greek/greek-ext/latin/latin-ext,Fira Mono|cyrillic/cyrillic-ext/greek/greek-ext/latin/latin-ext,Fira Sans|cyrillic/cyrillic-ext/greek/greek-ext/latin/latin-ext/vietnamese,Fira Sans Condensed|cyrillic/cyrillic-ext/greek/greek-ext/latin/latin-ext/vietnamese,Fira Sans Extra Condensed|cyrillic/cyrillic-ext/greek/greek-ext/latin/latin-ext/vietnamese,Fjalla One|latin/latin-ext,Fjord One|latin,Flamenco|latin,Flavors|latin/latin-ext,Fleur De Leah|latin/latin-ext/vietnamese,Flow Block|cyrillic/cyrillic-ext/latin/latin-ext/vietnamese,Flow Circular|cyrillic/cyrillic-ext/latin/latin-ext/vietnamese,Flow Rounded|cyrillic/cyrillic-ext/latin/latin-ext/vietnamese,Fondamento|latin/latin-ext,Fontdiner Swanky|latin,Forum|cyrillic/cyrillic-ext/latin/latin-ext,Fragment Mono|cyrillic-ext/latin/latin-ext,Francois One|latin/latin-ext/vietnamese,Frank Ruhl Libre|hebrew/latin/latin-ext,Fraunces|latin/latin-ext/vietnamese,Freckle Face|latin/latin-ext,Fredericka the Great|latin/latin-ext,Fredoka|hebrew/latin/latin-ext,Fredoka One|latin,Freehand|khmer/latin,Fresca|latin/latin-ext,Frijole|latin,Fruktur|cyrillic-ext/latin/latin-ext/vietnamese,Fugaz One|latin,Fuggles|latin/latin-ext/vietnamese,Fuzzy Bubbles|latin/latin-ext/vietnamese,Gabriela|cyrillic/cyrillic-ext/latin,Gaegu|korean/latin,Gafata|latin/latin-ext,Gajraj One|devanagari/latin/latin-ext,Galada|bengali/latin,Galdeano|latin,Galindo|latin/latin-ext,Gamja Flower|korean/latin,Gantari|latin/latin-ext,Gayathri|latin/malayalam,Gelasio|latin/latin-ext/vietnamese,Gemunu Libre|latin/latin-ext/sinhala,Genos|cherokee/latin/latin-ext/vietnamese,Gentium Book Basic|latin/latin-ext,Gentium Book Plus|cyrillic/cyrillic-ext/greek/greek-ext/latin/latin-ext/vietnamese,Gentium Plus|cyrillic/cyrillic-ext/greek/greek-ext/latin/latin-ext/vietnamese,Geo|latin,Georama|latin/latin-ext/vietnamese,Geostar|latin,Geostar Fill|latin,Germania One|latin,Gideon Roman|latin/latin-ext/vietnamese,Gidugu|latin/telugu,Gilda Display|latin/latin-ext,Girassol|latin/latin-ext,Give You Glory|latin,Glass Antiqua|latin/latin-ext,Glegoo|devanagari/latin/latin-ext,Gloock|cyrillic-ext/latin/latin-ext,Gloria Hallelujah|latin,Glory|latin/latin-ext/vietnamese,Gluten|latin/latin-ext/vietnamese,Goblin One|latin,Gochi Hand|latin,Goldman|latin/latin-ext/vietnamese,Golos Text|cyrillic/cyrillic-ext/latin/latin-ext,Gorditas|latin,Gothic A1|korean/latin,Gotu|devanagari/latin/latin-ext/vietnamese,Goudy Bookletter 1911|latin,Gowun Batang|korean/latin/latin-ext/vietnamese,Gowun Dodum|korean/latin/latin-ext/vietnamese,Graduate|latin,Grand Hotel|latin/latin-ext,Grandstander|latin/latin-ext/vietnamese,Grape Nuts|latin/latin-ext/vietnamese,Gravitas One|latin,Great Vibes|latin/latin-ext/vietnamese,Grechen Fuemen|latin/latin-ext/vietnamese,Grenze|latin/latin-ext/vietnamese,Grenze Gotisch|latin/latin-ext/vietnamese,Grey Qo|latin/latin-ext/vietnamese,Griffy|latin/latin-ext,Gruppo|latin/latin-ext,Gudea|latin/latin-ext,Gugi|korean/latin,Gulzar|arabic/latin/latin-ext,Gupter|latin,Gurajada|latin/telugu,Gwendolyn|latin/latin-ext/vietnamese,Habibi|latin/latin-ext,Hachi Maru Pop|cyrillic/japanese/latin/latin-ext,Hahmlet|korean/latin/latin-ext/vietnamese,Halant|devanagari/latin/latin-ext,Hammersmith One|latin/latin-ext,Hanalei|latin/latin-ext,Hanalei Fill|latin/latin-ext,Handlee|latin,Hanken Grotesk|cyrillic-ext/latin/latin-ext/vietnamese,Hanuman|khmer/latin,Happy Monkey|latin/latin-ext,Harmattan|arabic/latin/latin-ext,Headland One|latin/latin-ext,Heebo|hebrew/latin,Henny Penny|latin,Hepta Slab|latin/latin-ext/vietnamese,Herr Von Muellerhoff|latin/latin-ext,Hi Melody|korean/latin,Hina Mincho|cyrillic/japanese/latin/latin-ext/vietnamese,Hind|devanagari/latin/latin-ext,Hind Guntur|latin/latin-ext/telugu,Hind Madurai|latin/latin-ext/tamil,Hind Siliguri|bengali/latin/latin-ext,Hind Vadodara|gujarati/latin/latin-ext,Holtwood One SC|latin,Homemade Apple|latin,Homenaje|latin,Hubballi|kannada/latin/latin-ext,Hurricane|latin/latin-ext/vietnamese,IBM Plex Mono|cyrillic/cyrillic-ext/latin/latin-ext/vietnamese,IBM Plex Sans|cyrillic/cyrillic-ext/greek/latin/latin-ext/vietnamese,IBM Plex Sans Arabic|arabic/cyrillic-ext/latin/latin-ext,IBM Plex Sans Condensed|cyrillic-ext/latin/latin-ext/vietnamese,IBM Plex Sans Devanagari|cyrillic-ext/devanagari/latin/latin-ext,IBM Plex Sans Hebrew|cyrillic-ext/hebrew/latin/latin-ext,IBM Plex Sans JP|cyrillic/japanese/latin/latin-ext,IBM Plex Sans KR|korean/latin/latin-ext,IBM Plex Sans Thai|cyrillic-ext/latin/latin-ext/thai,IBM Plex Sans Thai Looped|cyrillic-ext/latin/latin-ext/thai,IBM Plex Serif|cyrillic/cyrillic-ext/latin/latin-ext/vietnamese,IM Fell DW Pica|latin,IM Fell DW Pica SC|latin,IM Fell Double Pica|latin,IM Fell Double Pica SC|latin,IM Fell English|latin,IM Fell English SC|latin,IM Fell French Canon|latin,IM Fell French Canon SC|latin,IM Fell Great Primer|latin,IM Fell Great Primer SC|latin,Ibarra Real Nova|latin/latin-ext,Iceberg|latin,Iceland|latin,Imbue|latin/latin-ext/vietnamese,Imperial Script|latin/latin-ext/vietnamese,Imprima|latin/latin-ext,Inconsolata|latin/latin-ext/vietnamese,Inder|latin/latin-ext,Indie Flower|latin,Ingrid Darling|latin/latin-ext/vietnamese,Inika|latin/latin-ext,Inknut Antiqua|devanagari/latin/latin-ext,Inria Sans|latin/latin-ext,Inria Serif|latin/latin-ext,Inspiration|latin/latin-ext/vietnamese,Inter|cyrillic/cyrillic-ext/greek/greek-ext/latin/latin-ext/vietnamese,Inter Tight|cyrillic/cyrillic-ext/greek/greek-ext/latin/latin-ext/vietnamese,Irish Grover|latin,Island Moments|latin/latin-ext/vietnamese,Istok Web|cyrillic/cyrillic-ext/latin/latin-ext,Italiana|latin,Italianno|latin/latin-ext/vietnamese,Itim|latin/latin-ext/thai/vietnamese,Jacques Francois|latin,Jacques Francois Shadow|latin,Jaldi|devanagari/latin/latin-ext,JetBrains Mono|cyrillic/cyrillic-ext/greek/latin/latin-ext/vietnamese,Jim Nightshade|latin/latin-ext,Joan|latin/latin-ext,Jockey One|latin/latin-ext,Jolly Lodger|latin/latin-ext,Jomhuria|arabic/latin/latin-ext,Jomolhari|latin/tibetan,Josefin Sans|latin/latin-ext/vietnamese,Josefin Slab|latin,Jost|cyrillic/latin/latin-ext,Joti One|latin/latin-ext,Jua|korean/latin,Judson|latin/latin-ext/vietnamese,Julee|latin,Julius Sans One|latin/latin-ext,Junge|latin,Jura|cyrillic/cyrillic-ext/greek/greek-ext/kayah-li/latin/latin-ext/vietnamese,Just Another Hand|latin,Just Me Again Down Here|latin/latin-ext,K2D|latin/latin-ext/thai/vietnamese,Kadwa|devanagari/latin,Kaisei Decol|cyrillic/japanese/latin/latin-ext,Kaisei HarunoUmi|cyrillic/japanese/latin/latin-ext,Kaisei Opti|cyrillic/japanese/latin/latin-ext,Kaisei Tokumin|cyrillic/japanese/latin/latin-ext,Kalam|devanagari/latin/latin-ext,Kameron|latin,Kanit|latin/latin-ext/thai/vietnamese,Kantumruy Pro|khmer/latin/latin-ext,Karantina|hebrew/latin/latin-ext,Karla|latin/latin-ext,Karma|devanagari/latin/latin-ext,Katibeh|arabic/latin/latin-ext,Kaushan Script|latin/latin-ext,Kavivanar|latin/latin-ext/tamil,Kavoon|latin/latin-ext,Kdam Thmor Pro|khmer/latin/latin-ext,Keania One|latin/latin-ext,Kelly Slab|cyrillic/latin/latin-ext,Kenia|latin,Khand|devanagari/latin/latin-ext,Khula|devanagari/latin/latin-ext,Kings|latin/latin-ext/vietnamese,Kirang Haerang|korean/latin,Kite One|latin,Kiwi Maru|cyrillic/japanese/latin/latin-ext,Klee One|cyrillic/greek-ext/japanese/latin/latin-ext,Knewave|latin/latin-ext,KoHo|latin/latin-ext/thai/vietnamese,Kodchasan|latin/latin-ext/thai/vietnamese,Koh Santepheap|khmer/latin,Kolker Brush|latin/latin-ext/vietnamese,Kosugi|cyrillic/japanese/latin/latin-ext,Kosugi Maru|cyrillic/japanese/latin/latin-ext,Kotta One|latin/latin-ext,Koulen|khmer/latin,Kranky|latin,Kreon|latin/latin-ext,Kristi|latin,Krona One|latin/latin-ext,Krub|latin/latin-ext/thai/vietnamese,Kufam|arabic/latin/latin-ext/vietnamese,Kulim Park|latin/latin-ext,Kumar One|gujarati/latin/latin-ext,Kumar One Outline|gujarati/latin/latin-ext,Kumbh Sans|latin/latin-ext,Kurale|cyrillic/cyrillic-ext/devanagari/latin/latin-ext,La Belle Aurore|latin,Labrada|latin/latin-ext/vietnamese,Lacquer|latin,Laila|devanagari/latin/latin-ext,Lakki Reddy|latin/telugu,Lalezar|arabic/latin/latin-ext/vietnamese,Lancelot|latin/latin-ext,Langar|gurmukhi/latin/latin-ext,Lateef|arabic/latin/latin-ext,Lato|latin/latin-ext,Lavishly Yours|latin/latin-ext/vietnamese,League Gothic|latin/latin-ext/vietnamese,League Script|latin,League Spartan|latin/latin-ext/vietnamese,Leckerli One|latin,Ledger|cyrillic/latin/latin-ext,Lekton|latin/latin-ext,Lemon|latin,Lemonada|arabic/latin/latin-ext/vietnamese,Lexend|latin/latin-ext/vietnamese,Lexend Deca|latin/latin-ext/vietnamese,Lexend Exa|latin/latin-ext/vietnamese,Lexend Giga|latin/latin-ext/vietnamese,Lexend Mega|latin/latin-ext/vietnamese,Lexend Peta|latin/latin-ext/vietnamese,Lexend Tera|latin/latin-ext/vietnamese,Lexend Zetta|latin/latin-ext/vietnamese,Libre Barcode 128|latin,Libre Barcode 128 Text|latin,Libre Barcode 39|latin,Libre Barcode 39 Extended|latin,Libre Barcode 39 Extended Text|latin,Libre Barcode 39 Text|latin,Libre Barcode EAN13 Text|latin,Libre Baskerville|latin/latin-ext,Libre Bodoni|latin/latin-ext/vietnamese,Libre Caslon Display|latin/latin-ext,Libre Caslon Text|latin/latin-ext,Libre Franklin|latin/latin-ext/vietnamese,Licorice|latin/latin-ext/vietnamese,Life Savers|latin/latin-ext,Lilita One|latin/latin-ext,Lily Script One|latin/latin-ext,Limelight|latin/latin-ext,Linden Hill|latin,Literata|cyrillic/cyrillic-ext/greek/greek-ext/latin/latin-ext/vietnamese,Liu Jian Mao Cao|chinese-simplified/latin,Livvic|latin/latin-ext/vietnamese,Lobster|cyrillic/cyrillic-ext/latin/latin-ext/vietnamese,Lobster Two|latin,Londrina Outline|latin,Londrina Shadow|latin,Londrina Sketch|latin,Londrina Solid|latin,Long Cang|chinese-simplified/latin,Lora|cyrillic/cyrillic-ext/latin/latin-ext/vietnamese,Love Light|latin/latin-ext/vietnamese,Love Ya Like A Sister|latin,Loved by the King|latin,Lovers Quarrel|latin/latin-ext/vietnamese,Luckiest Guy|latin,Lusitana|latin,Lustria|latin,Luxurious Roman|latin/latin-ext/vietnamese,Luxurious Script|latin/latin-ext/vietnamese,M PLUS 1|japanese/latin/latin-ext/vietnamese,M PLUS 1 Code|japanese/latin/latin-ext/vietnamese,M PLUS 1p|cyrillic/cyrillic-ext/greek/greek-ext/hebrew/japanese/latin/latin-ext/vietnamese,M PLUS 2|japanese/latin/latin-ext/vietnamese,M PLUS Code Latin|latin/latin-ext/vietnamese,M PLUS Rounded 1c|cyrillic/cyrillic-ext/greek/greek-ext/hebrew/japanese/latin/latin-ext/vietnamese,Ma Shan Zheng|chinese-simplified/latin,Macondo|latin,Macondo Swash Caps|latin,Mada|arabic/latin,Magra|latin/latin-ext,Maiden Orange|latin,Maitree|latin/latin-ext/thai/vietnamese,Major Mono Display|latin/latin-ext/vietnamese,Mako|latin,Mali|latin/latin-ext/thai/vietnamese,Mallanna|latin/telugu,Mandali|latin/telugu,Manjari|latin/latin-ext/malayalam,Manrope|cyrillic/cyrillic-ext/greek/latin/latin-ext/vietnamese,Mansalva|greek/latin/latin-ext/vietnamese,Manuale|latin/latin-ext/vietnamese,Marcellus|latin/latin-ext,Marcellus SC|latin/latin-ext,Marck Script|cyrillic/latin/latin-ext,Margarine|latin/latin-ext,Marhey|arabic/latin/latin-ext,Markazi Text|arabic/latin/latin-ext/vietnamese,Marko One|latin,Marmelad|cyrillic/cyrillic-ext/latin/latin-ext/vietnamese,Martel|devanagari/latin/latin-ext,Martel Sans|devanagari/latin/latin-ext,Martian Mono|cyrillic/cyrillic-ext/latin/latin-ext,Marvel|latin,Mate|latin,Mate SC|latin,Maven Pro|latin/latin-ext/vietnamese,McLaren|latin/latin-ext,Mea Culpa|latin/latin-ext/vietnamese,Meddon|latin,MedievalSharp|latin/latin-ext,Medula One|latin,Meera Inimai|latin/tamil,Megrim|latin,Meie Script|latin/latin-ext,Meow Script|latin/latin-ext/vietnamese,Merienda|latin/latin-ext/vietnamese,Merienda One|latin,Merriweather|cyrillic/cyrillic-ext/latin/latin-ext/vietnamese,Merriweather Sans|cyrillic-ext/latin/latin-ext/vietnamese,Metal|khmer/latin,Metal Mania|latin/latin-ext,Metamorphous|latin/latin-ext,Metrophobic|latin/latin-ext/vietnamese,Michroma|latin,Milonga|latin/latin-ext,Miltonian|latin,Miltonian Tattoo|latin,Mina|bengali/latin/latin-ext,Mingzat|latin/latin-ext/lepcha,Miniver|latin,Miriam Libre|hebrew/latin/latin-ext,Mirza|arabic/latin/latin-ext,Miss Fajardose|latin/latin-ext,Mitr|latin/latin-ext/thai/vietnamese,Mochiy Pop One|japanese/latin,Mochiy Pop P One|japanese/latin,Modak|devanagari/latin/latin-ext,Modern Antiqua|latin/latin-ext,Mogra|gujarati/latin/latin-ext,Mohave|latin/latin-ext,Molengo|latin/latin-ext,Monda|latin/latin-ext/vietnamese,Monofett|latin,Monoton|latin,Monsieur La Doulaise|latin/latin-ext,Montaga|latin,Montagu Slab|latin/latin-ext/vietnamese,MonteCarlo|latin/latin-ext/vietnamese,Montez|latin,Montserrat|cyrillic/cyrillic-ext/latin/latin-ext/vietnamese,Montserrat Alternates|cyrillic/cyrillic-ext/latin/latin-ext/vietnamese,Montserrat Subrayada|latin,Moo Lah Lah|latin/latin-ext/vietnamese,Moon Dance|latin/latin-ext/vietnamese,Moul|khmer/latin,Moulpali|khmer/latin,Mountains of Christmas|latin,Mouse Memoirs|latin/latin-ext,Mr Bedfort|latin/latin-ext,Mr Dafoe|latin/latin-ext,Mr De Haviland|latin/latin-ext,Mrs Saint Delafield|latin/latin-ext,Mrs Sheppards|latin/latin-ext,Ms Madi|latin/latin-ext/vietnamese,Mukta|devanagari/latin/latin-ext,Mukta Mahee|gurmukhi/latin/latin-ext,Mukta Malar|latin/latin-ext/tamil,Mukta Vaani|gujarati/latin/latin-ext,Mulish|cyrillic/cyrillic-ext/latin/latin-ext/vietnamese,Murecho|cyrillic/cyrillic-ext/greek/japanese/latin/latin-ext,MuseoModerno|latin/latin-ext/vietnamese,My Soul|latin/latin-ext/vietnamese,Mynerve|greek/latin/latin-ext/vietnamese,Mystery Quest|latin/latin-ext,NTR|latin/telugu,Nabla|cyrillic-ext/latin/latin-ext/math/vietnamese,Nanum Brush Script|korean/latin,Nanum Gothic|korean/latin,Nanum Gothic Coding|korean/latin,Nanum Myeongjo|korean/latin,Nanum Pen Script|korean/latin,Neonderthaw|latin/latin-ext/vietnamese,Nerko One|latin/latin-ext,Neucha|cyrillic/latin,Neuton|latin/latin-ext,New Rocker|latin/latin-ext,New Tegomin|japanese/latin/latin-ext,News Cycle|latin/latin-ext,Newsreader|latin/latin-ext/vietnamese,Niconne|latin/latin-ext,Niramit|latin/latin-ext/thai/vietnamese,Nixie One|latin,Nobile|latin/latin-ext,Nokora|khmer/latin,Norican|latin/latin-ext,Nosifer|latin/latin-ext,Notable|latin,Nothing You Could Do|latin,Noticia Text|latin/latin-ext/vietnamese,Noto Music|latin/latin-ext/music,Noto Naskh Arabic|arabic/latin/latin-ext,Noto Nastaliq Urdu|arabic/latin/latin-ext,Noto Rashi Hebrew|hebrew/latin/latin-ext,Noto Sans|cyrillic/cyrillic-ext/devanagari/greek/greek-ext/latin/latin-ext/vietnamese,Noto Sans Adlam|adlam/latin/latin-ext,Noto Sans Adlam Unjoined|adlam/latin/latin-ext,Noto Sans Armenian|armenian/latin/latin-ext,Noto Sans Avestan|avestan/latin/latin-ext,Noto Sans Balinese|balinese/latin/latin-ext,Noto Sans Bamum|bamum/latin/latin-ext,Noto Sans Bassa Vah|bassa-vah/latin/latin-ext,Noto Sans Batak|batak/latin/latin-ext,Noto Sans Bengali|bengali/latin/latin-ext,Noto Sans Buginese|buginese/latin/latin-ext,Noto Sans Buhid|buhid/latin/latin-ext,Noto Sans Canadian Aboriginal|canadian-aboriginal/latin/latin-ext,Noto Sans Chakma|chakma/latin/latin-ext,Noto Sans Cham|cham/latin/latin-ext,Noto Sans Cherokee|cherokee/latin/latin-ext,Noto Sans Coptic|coptic/latin/latin-ext,Noto Sans Devanagari|devanagari/latin/latin-ext,Noto Sans Display|cyrillic/cyrillic-ext/greek/greek-ext/latin/latin-ext/vietnamese,Noto Sans Ethiopic|ethiopic/latin/latin-ext,Noto Sans Georgian|georgian/latin/latin-ext,Noto Sans Grantha|grantha/latin/latin-ext,Noto Sans Gujarati|gujarati/latin/latin-ext,Noto Sans Gurmukhi|gurmukhi/latin/latin-ext,Noto Sans HK|chinese-hongkong/latin,Noto Sans Hanifi Rohingya|hanifi-rohingya/latin/latin-ext,Noto Sans Hanunoo|hanunoo/latin/latin-ext,Noto Sans Hebrew|hebrew/latin/latin-ext,Noto Sans JP|japanese/latin,Noto Sans Javanese|javanese/latin/latin-ext,Noto Sans KR|korean/latin,Noto Sans Kannada|kannada/latin/latin-ext,Noto Sans Kayah Li|kayah-li/latin/latin-ext,Noto Sans Khmer|khmer/latin/latin-ext,Noto Sans Khojki|khojki/latin/latin-ext,Noto Sans Lao|lao/latin/latin-ext,Noto Sans Lao Looped|lao/latin/latin-ext,Noto Sans Lepcha|latin/latin-ext/lepcha,Noto Sans Limbu|latin/latin-ext/limbu,Noto Sans Lisu|latin/latin-ext/lisu,Noto Sans Malayalam|latin/latin-ext/malayalam,Noto Sans Masaram Gondi|latin/latin-ext/masaram-gondi,Noto Sans Medefaidrin|latin/latin-ext/medefaidrin,Noto Sans Meetei Mayek|latin/latin-ext/meetei-mayek,Noto Sans Mende Kikakui|latin/latin-ext/mende-kikakui,Noto Sans Miao|latin/latin-ext/miao,Noto Sans Modi|latin/latin-ext/modi,Noto Sans Mongolian|latin/latin-ext/mongolian,Noto Sans Mono|cyrillic/cyrillic-ext/greek/greek-ext/latin/latin-ext/vietnamese,Noto Sans Mro|latin/latin-ext/mro,Noto Sans Multani|latin/latin-ext/multani,Noto Sans NKo|latin/latin-ext/nko,Noto Sans New Tai Lue|latin/latin-ext/new-tai-lue,Noto Sans Newa|latin/latin-ext/newa,Noto Sans Ol Chiki|latin/latin-ext/ol-chiki,Noto Sans Oriya|latin/latin-ext/oriya,Noto Sans Osage|latin/latin-ext/osage,Noto Sans Osmanya|latin/latin-ext/osmanya,Noto Sans Pahawh Hmong|latin/latin-ext/pahawh-hmong,Noto Sans Pau Cin Hau|latin/latin-ext/pau-cin-hau,Noto Sans Rejang|latin/latin-ext/rejang,Noto Sans SC|chinese-simplified/latin,Noto Sans Saurashtra|latin/latin-ext/saurashtra,Noto Sans Sharada|latin/latin-ext/sharada,Noto Sans Siddham|latin/latin-ext/siddham,Noto Sans SignWriting|latin/latin-ext/signwriting,Noto Sans Sinhala|latin/latin-ext/sinhala,Noto Sans Sora Sompeng|latin/latin-ext/sora-sompeng,Noto Sans Sundanese|latin/latin-ext/sundanese,Noto Sans Syloti Nagri|latin/latin-ext/syloti-nagri,Noto Sans Symbols|latin/latin-ext/symbols,Noto Sans Symbols 2|latin/latin-ext/symbols,Noto Sans TC|chinese-traditional/latin,Noto Sans Tagalog|latin/latin-ext/tagalog,Noto Sans Tagbanwa|latin/latin-ext/tagbanwa,Noto Sans Tai Le|latin/latin-ext/tai-le,Noto Sans Tai Tham|latin/latin-ext/tai-tham,Noto Sans Tai Viet|latin/latin-ext/tai-viet,Noto Sans Takri|latin/latin-ext/takri,Noto Sans Tamil|latin/latin-ext/tamil,Noto Sans Tangsa|latin/latin-ext/tangsa,Noto Sans Telugu|latin/latin-ext/telugu,Noto Sans Thaana|latin/latin-ext/thaana,Noto Sans Thai|latin/latin-ext/thai,Noto Sans Tifinagh|latin/latin-ext/tifinagh,Noto Sans Vai|latin/latin-ext/vai,Noto Sans Wancho|latin/latin-ext/wancho,Noto Sans Warang Citi|latin/latin-ext/warang-citi,Noto Sans Yi|latin/latin-ext/yi,Noto Sans Zanabazar Square|latin/latin-ext/zanabazar-square,Noto Serif|cyrillic/cyrillic-ext/greek/greek-ext/latin/latin-ext/vietnamese,Noto Serif Ahom|ahom/latin/latin-ext,Noto Serif Armenian|armenian/latin/latin-ext,Noto Serif Balinese|balinese/latin/latin-ext,Noto Serif Bengali|bengali/latin/latin-ext,Noto Serif Devanagari|devanagari/latin/latin-ext,Noto Serif Display|cyrillic/cyrillic-ext/greek/greek-ext/latin/latin-ext/vietnamese,Noto Serif Ethiopic|ethiopic/latin/latin-ext,Noto Serif Georgian|georgian/latin/latin-ext,Noto Serif Grantha|grantha/latin/latin-ext,Noto Serif Gujarati|gujarati/latin/latin-ext,Noto Serif Gurmukhi|gurmukhi/latin/latin-ext,Noto Serif HK|chinese-hongkong/cyrillic/latin/latin-ext/vietnamese,Noto Serif Hebrew|hebrew/latin/latin-ext,Noto Serif JP|japanese/latin,Noto Serif KR|korean/latin,Noto Serif Kannada|kannada/latin/latin-ext,Noto Serif Khmer|khmer/latin/latin-ext,Noto Serif Khojki|khojki/latin/latin-ext,Noto Serif Lao|lao/latin/latin-ext,Noto Serif Malayalam|latin/latin-ext/malayalam,Noto Serif NP Hmong|latin/nyiakeng-puachue-hmong,Noto Serif Oriya|latin/latin-ext/oriya,Noto Serif SC|chinese-simplified/latin,Noto Serif Sinhala|latin/latin-ext/sinhala,Noto Serif TC|chinese-traditional/latin,Noto Serif Tamil|latin/latin-ext/tamil,Noto Serif Telugu|latin/latin-ext/telugu,Noto Serif Thai|latin/latin-ext/thai,Noto Serif Tibetan|latin/latin-ext/tibetan,Noto Serif Toto|latin/latin-ext/toto,Nova Cut|latin,Nova Flat|latin,Nova Mono|greek/latin,Nova Oval|latin,Nova Round|latin,Nova Script|latin,Nova Slim|latin,Nova Square|latin,Numans|latin,Nunito|cyrillic/cyrillic-ext/latin/latin-ext/vietnamese,Nunito Sans|cyrillic/cyrillic-ext/latin/latin-ext/vietnamese,Nuosu SIL|latin/latin-ext/yi,Odibee Sans|latin,Odor Mean Chey|khmer/latin,Offside|latin,Oi|cyrillic/cyrillic-ext/greek/latin/latin-ext/tamil/vietnamese,Old Standard TT|cyrillic/cyrillic-ext/latin/latin-ext/vietnamese,Oldenburg|latin/latin-ext,Ole|latin/latin-ext/vietnamese,Oleo Script|latin/latin-ext,Oleo Script Swash Caps|latin/latin-ext,Oooh Baby|latin/latin-ext/vietnamese,Open Sans|cyrillic/cyrillic-ext/greek/greek-ext/hebrew/latin/latin-ext/vietnamese,Oranienbaum|cyrillic/cyrillic-ext/latin/latin-ext,Orbitron|latin,Oregano|latin/latin-ext,Orelega One|cyrillic/cyrillic-ext/latin/latin-ext,Orienta|latin/latin-ext,Original Surfer|latin,Oswald|cyrillic/cyrillic-ext/latin/latin-ext/vietnamese,Outfit|latin,Over the Rainbow|latin,Overlock|latin/latin-ext,Overlock SC|latin/latin-ext,Overpass|cyrillic/cyrillic-ext/latin/latin-ext/vietnamese,Overpass Mono|cyrillic/cyrillic-ext/latin/latin-ext/vietnamese,Ovo|latin,Oxanium|latin/latin-ext,Oxygen|latin/latin-ext,Oxygen Mono|latin/latin-ext,PT Mono|cyrillic/cyrillic-ext/latin/latin-ext,PT Sans|cyrillic/cyrillic-ext/latin/latin-ext,PT Sans Caption|cyrillic/cyrillic-ext/latin/latin-ext,PT Sans Narrow|cyrillic/cyrillic-ext/latin/latin-ext,PT Serif|cyrillic/cyrillic-ext/latin/latin-ext,PT Serif Caption|cyrillic/cyrillic-ext/latin/latin-ext,Pacifico|cyrillic/cyrillic-ext/latin/latin-ext/vietnamese,Padauk|latin/latin-ext/myanmar,Padyakke Expanded One|kannada/latin/latin-ext,Palanquin|devanagari/latin/latin-ext,Palanquin Dark|devanagari/latin/latin-ext,Pangolin|cyrillic/cyrillic-ext/latin/latin-ext/vietnamese,Paprika|latin/latin-ext,Parisienne|latin/latin-ext,Passero One|latin/latin-ext,Passion One|latin/latin-ext,Passions Conflict|latin/latin-ext/vietnamese,Pathway Gothic One|latin/latin-ext,Patrick Hand|latin/latin-ext/vietnamese,Patrick Hand SC|latin/latin-ext/vietnamese,Pattaya|cyrillic/latin/latin-ext/thai/vietnamese,Patua One|latin,Pavanam|latin/latin-ext/tamil,Paytone One|latin/latin-ext/vietnamese,Peddana|latin/telugu,Peralta|latin/latin-ext,Permanent Marker|latin,Petemoss|latin/latin-ext/vietnamese,Petit Formal Script|latin/latin-ext,Petrona|latin/latin-ext/vietnamese,Philosopher|cyrillic/cyrillic-ext/latin/vietnamese,Phudu|cyrillic-ext/latin/latin-ext/vietnamese,Piazzolla|cyrillic/cyrillic-ext/greek/greek-ext/latin/latin-ext/vietnamese,Piedra|latin/latin-ext,Pinyon Script|latin/latin-ext/vietnamese,Pirata One|latin/latin-ext,Plaster|latin/latin-ext,Play|cyrillic/cyrillic-ext/greek/latin/latin-ext/vietnamese,Playball|latin/latin-ext/vietnamese,Playfair Display|cyrillic/latin/latin-ext/vietnamese,Playfair Display SC|cyrillic/latin/latin-ext/vietnamese,Plus Jakarta Sans|cyrillic-ext/latin/latin-ext/vietnamese,Podkova|cyrillic/cyrillic-ext/latin/latin-ext/vietnamese,Poiret One|cyrillic/latin/latin-ext,Poller One|latin,Poly|latin,Pompiere|latin,Pontano Sans|latin/latin-ext,Poor Story|korean/latin,Poppins|devanagari/latin/latin-ext,Port Lligat Sans|latin,Port Lligat Slab|latin,Potta One|japanese/latin/latin-ext/vietnamese,Pragati Narrow|devanagari/latin/latin-ext,Praise|latin/latin-ext/vietnamese,Prata|cyrillic/cyrillic-ext/latin/vietnamese,Preahvihear|khmer/latin,Press Start 2P|cyrillic/cyrillic-ext/greek/latin/latin-ext,Pridi|latin/latin-ext/thai/vietnamese,Princess Sofia|latin/latin-ext,Prociono|latin,Prompt|latin/latin-ext/thai/vietnamese,Prosto One|cyrillic/latin/latin-ext,Proza Libre|latin/latin-ext,Public Sans|latin/latin-ext/vietnamese,Puppies Play|latin/latin-ext/vietnamese,Puritan|latin,Purple Purse|latin/latin-ext,Qahiri|arabic/latin,Quando|latin/latin-ext,Quantico|latin,Quattrocento|latin/latin-ext,Quattrocento Sans|latin/latin-ext,Questrial|latin/latin-ext/vietnamese,Quicksand|latin/latin-ext/vietnamese,Quintessential|latin/latin-ext,Qwigley|latin/latin-ext/vietnamese,Qwitcher Grypen|latin/latin-ext/vietnamese,Racing Sans One|latin/latin-ext,Radio Canada|latin/latin-ext/vietnamese,Radley|latin/latin-ext,Rajdhani|devanagari/latin/latin-ext,Rakkas|arabic/latin/latin-ext,Raleway|cyrillic/cyrillic-ext/latin/latin-ext/vietnamese,Raleway Dots|latin/latin-ext,Ramabhadra|latin/telugu,Ramaraja|latin/telugu,Rambla|latin/latin-ext,Rammetto One|latin/latin-ext,Rampart One|cyrillic/japanese/latin/latin-ext,Ranchers|latin/latin-ext,Rancho|latin,Ranga|devanagari/latin/latin-ext,Rasa|gujarati/latin/latin-ext/vietnamese,Rationale|latin,Ravi Prakash|latin/telugu,Readex Pro|arabic/latin/latin-ext/vietnamese,Recursive|cyrillic-ext/latin/latin-ext/vietnamese,Red Hat Display|latin/latin-ext,Red Hat Mono|latin/latin-ext,Red Hat Text|latin/latin-ext,Red Rose|latin/latin-ext/vietnamese,Redacted|latin/latin-ext,Redacted Script|latin/latin-ext,Redressed|latin,Reem Kufi|arabic/latin/latin-ext/vietnamese,Reem Kufi Fun|arabic/latin/latin-ext/vietnamese,Reem Kufi Ink|arabic/latin/latin-ext/vietnamese,Reenie Beanie|latin,Reggae One|cyrillic/japanese/latin/latin-ext,Revalia|latin/latin-ext,Rhodium Libre|devanagari/latin/latin-ext,Ribeye|latin/latin-ext,Ribeye Marrow|latin/latin-ext,Righteous|latin/latin-ext,Risque|latin/latin-ext,Road Rage|latin/latin-ext/vietnamese,Roboto|cyrillic/cyrillic-ext/greek/greek-ext/latin/latin-ext/vietnamese,Roboto Condensed|cyrillic/cyrillic-ext/greek/greek-ext/latin/latin-ext/vietnamese,Roboto Flex|cyrillic/cyrillic-ext/greek/latin/latin-ext/vietnamese,Roboto Mono|cyrillic/cyrillic-ext/greek/latin/latin-ext/vietnamese,Roboto Serif|cyrillic-ext/latin/latin-ext/vietnamese,Roboto Slab|cyrillic/cyrillic-ext/greek/greek-ext/latin/latin-ext/vietnamese,Rochester|latin,Rock Salt|latin,RocknRoll One|cyrillic/japanese/latin/latin-ext,Rokkitt|latin/latin-ext/vietnamese,Romanesco|latin/latin-ext,Ropa Sans|latin/latin-ext,Rosario|latin/latin-ext/vietnamese,Rosarivo|latin/latin-ext,Rouge Script|latin,Rowdies|latin/latin-ext/vietnamese,Rozha One|devanagari/latin/latin-ext,Rubik|cyrillic/cyrillic-ext/hebrew/latin/latin-ext,Rubik 80s Fade|cyrillic/cyrillic-ext/hebrew/latin/latin-ext,Rubik Beastly|cyrillic/cyrillic-ext/hebrew/latin/latin-ext,Rubik Bubbles|cyrillic/cyrillic-ext/hebrew/latin/latin-ext,Rubik Burned|cyrillic/cyrillic-ext/hebrew/latin/latin-ext,Rubik Dirt|cyrillic/cyrillic-ext/hebrew/latin/latin-ext,Rubik Distressed|cyrillic/cyrillic-ext/hebrew/latin/latin-ext,Rubik Gemstones|cyrillic/cyrillic-ext/hebrew/latin/latin-ext,Rubik Glitch|cyrillic/cyrillic-ext/hebrew/latin/latin-ext,Rubik Iso|cyrillic/cyrillic-ext/hebrew/latin/latin-ext,Rubik Marker Hatch|cyrillic/cyrillic-ext/hebrew/latin/latin-ext,Rubik Maze|cyrillic/cyrillic-ext/hebrew/latin/latin-ext,Rubik Microbe|cyrillic/cyrillic-ext/hebrew/latin/latin-ext,Rubik Mono One|cyrillic/latin/latin-ext,Rubik Moonrocks|cyrillic/cyrillic-ext/hebrew/latin/latin-ext,Rubik Puddles|cyrillic/cyrillic-ext/hebrew/latin/latin-ext,Rubik Spray Paint|cyrillic/cyrillic-ext/hebrew/latin/latin-ext,Rubik Storm|cyrillic/cyrillic-ext/hebrew/latin/latin-ext,Rubik Vinyl|cyrillic/cyrillic-ext/hebrew/latin/latin-ext,Rubik Wet Paint|cyrillic/cyrillic-ext/hebrew/latin/latin-ext,Ruda|cyrillic/latin/latin-ext/vietnamese,Rufina|latin/latin-ext,Ruge Boogie|latin/latin-ext/vietnamese,Ruluko|latin/latin-ext,Rum Raisin|latin/latin-ext,Ruslan Display|cyrillic/latin/latin-ext,Russo One|cyrillic/latin/latin-ext,Ruthie|latin/latin-ext/vietnamese,Rye|latin/latin-ext,STIX Two Text|cyrillic/cyrillic-ext/greek/latin/latin-ext/vietnamese,Sacramento|latin/latin-ext,Sahitya|devanagari/latin,Sail|latin/latin-ext,Saira|latin/latin-ext/vietnamese,Saira Condensed|latin/latin-ext/vietnamese,Saira Extra Condensed|latin/latin-ext/vietnamese,Saira Semi Condensed|latin/latin-ext/vietnamese,Saira Stencil One|latin/latin-ext/vietnamese,Salsa|latin,Sanchez|latin/latin-ext,Sancreek|latin/latin-ext,Sansita|latin/latin-ext,Sansita Swashed|latin/latin-ext/vietnamese,Sarabun|latin/latin-ext/thai/vietnamese,Sarala|devanagari/latin/latin-ext,Sarina|latin/latin-ext,Sarpanch|devanagari/latin/latin-ext,Sassy Frass|latin/latin-ext/vietnamese,Satisfy|latin,Sawarabi Gothic|cyrillic/japanese/latin/latin-ext/vietnamese,Sawarabi Mincho|japanese/latin/latin-ext,Scada|cyrillic/cyrillic-ext/latin/latin-ext,Scheherazade New|arabic/latin/latin-ext,Schoolbell|latin,Scope One|latin/latin-ext,Seaweed Script|latin/latin-ext,Secular One|hebrew/latin/latin-ext,Sedgwick Ave|latin/latin-ext/vietnamese,Sedgwick Ave Display|latin/latin-ext/vietnamese,Sen|latin/latin-ext,Send Flowers|latin/latin-ext/vietnamese,Sevillana|latin/latin-ext,Seymour One|cyrillic/latin/latin-ext,Shadows Into Light|latin,Shadows Into Light Two|latin/latin-ext,Shalimar|latin/latin-ext/vietnamese,Shantell Sans|cyrillic/cyrillic-ext/latin/latin-ext/vietnamese,Shanti|latin,Share|latin/latin-ext,Share Tech|latin,Share Tech Mono|latin,Shippori Antique|japanese/latin/latin-ext,Shippori Antique B1|japanese/latin/latin-ext,Shippori Mincho|japanese/latin/latin-ext,Shippori Mincho B1|japanese/latin/latin-ext,Shojumaru|latin/latin-ext,Short Stack|latin,Shrikhand|gujarati/latin/latin-ext,Sigmar One|latin/latin-ext/vietnamese,Signika|latin/latin-ext/vietnamese,Signika Negative|latin/latin-ext/vietnamese,Silkscreen|latin/latin-ext,Simonetta|latin/latin-ext,Sintony|latin/latin-ext,Sirin Stencil|latin,Six Caps|latin,Skranji|latin/latin-ext,Slabo 13px|latin/latin-ext,Slabo 27px|latin/latin-ext,Slackey|latin,Smokum|latin,Smooch|latin/latin-ext/vietnamese,Smooch Sans|latin/latin-ext/vietnamese,Smythe|latin,Sniglet|latin/latin-ext,Snippet|latin,Snowburst One|latin/latin-ext,Sofadi One|latin,Sofia|latin,Sofia Sans|cyrillic/cyrillic-ext/greek/latin/latin-ext,Sofia Sans Condensed|cyrillic/cyrillic-ext/greek/latin/latin-ext,Sofia Sans Extra Condensed|cyrillic/cyrillic-ext/greek/latin/latin-ext,Sofia Sans Semi Condensed|cyrillic/cyrillic-ext/greek/latin/latin-ext,Solitreo|hebrew/latin/latin-ext,Solway|latin,Song Myung|korean/latin,Sono|latin/latin-ext/vietnamese,Sonsie One|latin/latin-ext,Sora|latin/latin-ext,Sorts Mill Goudy|latin/latin-ext,Source Code Pro|cyrillic/cyrillic-ext/greek/greek-ext/latin/latin-ext/vietnamese,Source Sans 3|cyrillic/cyrillic-ext/greek/greek-ext/latin/latin-ext/vietnamese,Source Sans Pro|cyrillic/cyrillic-ext/greek/greek-ext/latin/latin-ext/vietnamese,Source Serif 4|cyrillic/cyrillic-ext/greek/latin/latin-ext/vietnamese,Source Serif Pro|cyrillic/cyrillic-ext/greek/latin/latin-ext/vietnamese,Space Grotesk|latin/latin-ext/vietnamese,Space Mono|latin/latin-ext/vietnamese,Special Elite|latin,Spectral|cyrillic/latin/latin-ext/vietnamese,Spectral SC|cyrillic/latin/latin-ext/vietnamese,Spicy Rice|latin,Spinnaker|latin/latin-ext,Spirax|latin,Splash|latin/latin-ext/vietnamese,Spline Sans|latin/latin-ext,Spline Sans Mono|latin/latin-ext,Squada One|latin,Square Peg|latin/latin-ext/vietnamese,Sree Krushnadevaraya|latin/telugu,Sriracha|latin/latin-ext/thai/vietnamese,Srisakdi|latin/latin-ext/thai/vietnamese,Staatliches|latin/latin-ext,Stalemate|latin/latin-ext,Stalinist One|cyrillic/latin/latin-ext,Stardos Stencil|latin,Stick|cyrillic/japanese/latin/latin-ext,Stick No Bills|latin/latin-ext/sinhala,Stint Ultra Condensed|latin/latin-ext,Stint Ultra Expanded|latin/latin-ext,Stoke|latin/latin-ext,Strait|latin,Style Script|latin/latin-ext/vietnamese,Stylish|korean/latin,Sue Ellen Francisco|latin,Suez One|hebrew/latin/latin-ext,Sulphur Point|latin/latin-ext,Sumana|devanagari/latin/latin-ext,Sunshiney|latin,Supermercado One|latin,Sura|devanagari/latin/latin-ext,Suranna|latin/telugu,Suravaram|latin/telugu,Suwannaphum|khmer/latin,Swanky and Moo Moo|latin,Syncopate|latin,Syne|greek/latin/latin-ext,Syne Mono|latin/latin-ext,Syne Tactile|latin/latin-ext,Tai Heritage Pro|latin/latin-ext/tai-viet/vietnamese,Tajawal|arabic/latin,Tangerine|latin,Tapestry|latin/latin-ext/vietnamese,Taprom|khmer/latin,Tauri|latin/latin-ext,Taviraj|latin/latin-ext/thai/vietnamese,Teko|devanagari/latin/latin-ext,Telex|latin/latin-ext,Tenali Ramakrishna|latin/telugu,Tenor Sans|cyrillic/latin/latin-ext,Text Me One|latin/latin-ext,Texturina|latin/latin-ext/vietnamese,Thasadith|latin/latin-ext/thai/vietnamese,The Girl Next Door|latin,The Nautigal|latin/latin-ext/vietnamese,Tienne|latin,Tillana|devanagari/latin/latin-ext,Timmana|latin/telugu,Tinos|cyrillic/cyrillic-ext/greek/greek-ext/hebrew/latin/latin-ext/vietnamese,Tiro Bangla|bengali/latin/latin-ext,Tiro Devanagari Hindi|devanagari/latin/latin-ext,Tiro Devanagari Marathi|devanagari/latin/latin-ext,Tiro Devanagari Sanskrit|devanagari/latin/latin-ext,Tiro Gurmukhi|gurmukhi/latin/latin-ext,Tiro Kannada|kannada/latin/latin-ext,Tiro Tamil|latin/latin-ext/tamil,Tiro Telugu|latin/latin-ext/telugu,Titan One|latin/latin-ext,Titillium Web|latin/latin-ext,Tomorrow|latin/latin-ext,Tourney|latin/latin-ext/vietnamese,Trade Winds|latin,Train One|cyrillic/japanese/latin/latin-ext,Trirong|latin/latin-ext/thai/vietnamese,Trispace|latin/latin-ext/vietnamese,Trocchi|latin/latin-ext,Trochut|latin,Truculenta|latin/latin-ext/vietnamese,Trykker|latin/latin-ext,Tulpen One|latin,Turret Road|latin/latin-ext,Twinkle Star|latin/latin-ext/vietnamese,Ubuntu|cyrillic/cyrillic-ext/greek/greek-ext/latin/latin-ext,Ubuntu Condensed|cyrillic/cyrillic-ext/greek/greek-ext/latin/latin-ext,Ubuntu Mono|cyrillic/cyrillic-ext/greek/greek-ext/latin/latin-ext,Uchen|latin/tibetan,Ultra|latin,Unbounded|cyrillic/cyrillic-ext/latin/latin-ext/vietnamese,Uncial Antiqua|latin,Underdog|cyrillic/latin/latin-ext,Unica One|latin/latin-ext/vietnamese,UnifrakturMaguntia|latin,Unkempt|latin,Unlock|latin,Unna|latin/latin-ext,Updock|latin/latin-ext/vietnamese,Urbanist|latin/latin-ext,VT323|latin/latin-ext/vietnamese,Vampiro One|latin/latin-ext,Varela|latin/latin-ext,Varela Round|hebrew/latin/latin-ext/vietnamese,Varta|latin/latin-ext/vietnamese,Vast Shadow|latin,Vazirmatn|arabic/latin/latin-ext,Vesper Libre|devanagari/latin/latin-ext,Viaoda Libre|cyrillic/cyrillic-ext/latin/latin-ext/vietnamese,Vibes|arabic/latin,Vibur|latin,Vidaloka|latin,Viga|latin/latin-ext,Voces|latin/latin-ext,Volkhov|latin,Vollkorn|cyrillic/cyrillic-ext/greek/latin/latin-ext/vietnamese,Vollkorn SC|cyrillic/cyrillic-ext/latin/latin-ext/vietnamese,Voltaire|latin,Vujahday Script|latin/latin-ext/vietnamese,Waiting for the Sunrise|latin,Wallpoet|latin,Walter Turncoat|latin,Warnes|latin/latin-ext,Water Brush|latin/latin-ext/vietnamese,Waterfall|latin/latin-ext/vietnamese,Wellfleet|latin/latin-ext,Wendy One|latin/latin-ext,Whisper|latin/latin-ext/vietnamese,WindSong|latin/latin-ext/vietnamese,Wire One|latin,Work Sans|latin/latin-ext/vietnamese,Xanh Mono|latin/latin-ext/vietnamese,Yaldevi|latin/latin-ext/sinhala,Yanone Kaffeesatz|cyrillic/latin/latin-ext/vietnamese,Yantramanav|devanagari/latin/latin-ext,Yatra One|devanagari/latin/latin-ext,Yellowtail|latin,Yeon Sung|korean/latin,Yeseva One|cyrillic/cyrillic-ext/latin/latin-ext/vietnamese,Yesteryear|latin,Yomogi|cyrillic/japanese/latin/latin-ext/vietnamese,Yrsa|latin/latin-ext/vietnamese,Yuji Boku|cyrillic/japanese/latin/latin-ext,Yuji Mai|cyrillic/japanese/latin/latin-ext,Yuji Syuku|cyrillic/japanese/latin/latin-ext,Yusei Magic|japanese/latin/latin-ext,ZCOOL KuaiLe|chinese-simplified/latin,ZCOOL QingKe HuangYou|chinese-simplified/latin,ZCOOL XiaoWei|chinese-simplified/latin,Zen Antique|cyrillic/greek/japanese/latin/latin-ext,Zen Antique Soft|cyrillic/greek/japanese/latin/latin-ext,Zen Dots|latin/latin-ext,Zen Kaku Gothic Antique|cyrillic/japanese/latin/latin-ext,Zen Kaku Gothic New|cyrillic/japanese/latin/latin-ext,Zen Kurenaido|cyrillic/greek/japanese/latin/latin-ext,Zen Loop|latin/latin-ext,Zen Maru Gothic|cyrillic/greek/japanese/latin/latin-ext,Zen Old Mincho|cyrillic/greek/japanese/latin/latin-ext,Zen Tokyo Zoo|latin/latin-ext,Zeyada|latin,Zhi Mang Xing|chinese-simplified/latin,Zilla Slab|latin/latin-ext,Zilla Slab Highlight|latin/latin-ext",
    koFontInit,
    koFontInput;
function koFontFilter(e) {
    var l = $("#koFontFinder").val(),
        t = "",
        r = document.getElementById("koFontSelector");
    if (e === 0) {
        $("#koFontFinder").val("");
        l = "";
    }
    if ($("#koFontFinder_cyrillic").prop("checked")) {
        t = "cyrillic";
    } else if ($("#koFontFinder_latin").prop("checked")) {
        t = "latin-ext";
    } else if ($("#koFontFinder_greek").prop("checked")) {
        t = "greek";
    }
    if (l.length > 0) {
        $("#koFontFinderReset").show();
        $("#koFontSelector .koMenuSectionTitle").hide();
    } else {
        $("#koFontFinderReset").hide();
        $("#koFontSelector .koMenuSectionTitle").show();
    }
    var i,
        n,
        a,
        o = l.toUpperCase();
    i = r.getElementsByTagName("a");
    for (a = 0; a < i.length; a++) {
        n = i[a].getElementsByTagName("em")[0];
        if (n.innerText.toUpperCase().indexOf(o) > -1 || o.length == 0) {
            if (t.length < 1 || n.innerHTML.indexOf(t) > -1) i[a].style.display = "";
            else if (t.length > 0 || n.innerHTML.indexOf(t) < 0) i[a].style.display = "none";
        } else {
            i[a].style.display = "none";
        }
    }
}
function koFontModal(e, a) {
    if (typeof a !== "undefined") {
        koFontInput = a;
    } else koFontInput = undefined;
    koMoreMenuOpen("fonts");
    if (typeof koFontInit === "undefined") {
        koShowLoading();
        setTimeout(function () {
            koFontInit = koFontList.split(",");
            koFontList = '<div class="koMenuSectionTitle my-4">' + langPhrase.systemFonts + "</div>";
            for (i = 0; i < koFontInit.length; i++) {
                var e = koFontInit[i];
                if (i < 5) e = e.replace(/\./g, ", ");
                else if (i == 5) {
                    koFontList += '<div class="koMenuSectionTitle my-4">' + langPhrase.googleFonts + "</div>";
                }
                e = e.split("|");
                koFontLabel = e[0];
                if (i == 0) koFontLabel = "Sans-serif";
                else if (i == 1) koFontLabel = "Serif";
                else if (i == 2) koFontLabel = "Mono";
                else if (i == 3) koFontLabel = "Arial";
                else if (i == 4) koFontLabel = "Times New Roman";
                koFontList +=
                    '<a href="javascript:void(null)" onClick="koFontSelect(this)" rel="' +
                    koFontLabel +
                    '" style="font-family:' +
                    e[0] +
                    ';font-size: 25px;color: #000;text-decoration:none"><img data-src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" data-font="' +
                    e[0] +
                    '" class="';
                if (i > 4) koFontList += "lazyFont";
                koFontList += '"><em style="display:block;font-style:normal">' + koFontLabel + '<span style="display:none">' + e[1] + "</span></em></a>";
            }
            $("#koFontSelector").html('<div class="koFontSelector">' + koFontList + "</div>");
            koFontInit = !0;
            function a(e) {
                $(e).after('<link href="//fonts.googleapis.com/css?family=' + escape($(e).attr("data-font")) + "&text=" + escape($(e).attr("data-font")) + '&display=swap" rel="stylesheet" type="text/css" />');
                $(e).remove();
            }
            var t = new LazyLoad({ elements_selector: ".lazyFont", container: document.getElementById("koFontSelector"), callback_enter: a });
            lazyLoadInstance.update();
            koHideLoading();
        }, 200);
    }
    setTimeout("$('#koFontFinder').focus();", 500);
    return !0;
}
function koFontSelect(e) {
    var a = $(e).attr("rel"),
        i = "",
        t = 1,
        n = a;
    if (typeof systemFonts[a] !== "undefined") {
        a = systemFonts[a];
        t = 0;
    }
    if (configLanguage == "pl" && t > 0) {
        i = '<link href="//fonts.googleapis.com/css?family=' + escape(a) + '&amp;text=ęóąśłżźćńĘÓĄŚŁŻŹĆŃ" rel="stylesheet" type="text/css" />';
    }
    if (typeof koFontInput === "undefined") {
        $(focusElement).css("font-family", a).attr("data-font", n).find("link").remove();
        if (t > 0) $(focusElement).prepend('<link type="text/css" rel="stylesheet" href="//fonts.googleapis.com/css?family=' + escape(a) + '&amp;subset=latin,latin-ext">' + i);
    } else {
        $(koFontInput).css("font-family", a).val(n);
        koPageFonts();
        koFontInput = undefined;
    }
    koMenuClose();
}
function trimChar(e, a) {
    while (e.charAt(0) == a) {
        e = e.substring(1);
    }
    while (e.charAt(e.length - 1) == a) {
        e = e.substring(0, e.length - 1);
    }
    return e;
}
function redirectWindowP(e) {
    koShowLoading();
    window.top.location.href = e;
}
(function (e, a) {
    "use strict";
    function g() {}
    function n(e, a) {
        if (e) {
            typeof e == "object" && (e = [].slice.call(e));
            for (var t = 0, i = e.length; t < i; t++) a.call(e, e[t], t);
        }
    }
    function S(e, t) {
        var i = Object.prototype.toString.call(t).slice(8, -1);
        return t !== a && t !== null && i === e;
    }
    function s(e) {
        return S("Function", e);
    }
    function p(e) {
        return S("Array", e);
    }
    function B(e) {
        var t = e.split("/"),
            a = t[t.length - 1],
            i = a.indexOf("?");
        return i !== -1 ? a.substring(0, i) : a;
    }
    function l(e) {
        ((e = e || g), e._done) || (e(), (e._done = 1));
    }
    function I(e, a, i, l) {
        var n = typeof e == "object" ? e : { test: e, success: !a ? !1 : p(a) ? a : [a], failure: !i ? !1 : p(i) ? i : [i], callback: l || g },
            o = !!n.test;
        return o && !!n.success ? (n.success.push(n.callback), t.load.apply(null, n.success)) : o || !n.failure ? l() : (n.failure.push(n.callback), t.load.apply(null, n.failure)), t;
    }
    function h(e) {
        var a = {},
            t,
            i;
        if (typeof e == "object") for (t in e) !e[t] || (a = { name: t, url: e[t] });
        else a = { name: B(e), url: e };
        return ((i = f[a.name]), i && i.url === a.url) ? i : ((f[a.name] = a), a);
    }
    function m(e) {
        e = e || f;
        for (var a in e) if (e.hasOwnProperty(a) && e[a].state !== d) return !1;
        return !0;
    }
    function E(e) {
        e.state = M;
        n(e.onpreload, function (e) {
            e.call();
        });
    }
    function L(e) {
        e.state === a &&
            ((e.state = x),
            (e.onpreload = []),
            C({ url: e.url, type: "cache" }, function () {
                E(e);
            }));
    }
    function P() {
        var e = arguments,
            a = e[e.length - 1],
            i = [].slice.call(e, 1),
            l = i[0];
        return (s(a) || (a = null), p(e[0]))
            ? (e[0].push(a), t.load.apply(null, e[0]), t)
            : (l
                  ? (n(i, function (e) {
                        s(e) || !e || L(h(e));
                    }),
                    b(
                        h(e[0]),
                        s(l)
                            ? l
                            : function () {
                                  t.load.apply(null, i);
                              }
                    ))
                  : b(h(e[0])),
              t);
    }
    function A() {
        var e = arguments,
            a = e[e.length - 1],
            i = {};
        return (s(a) || (a = null), p(e[0]))
            ? (e[0].push(a), t.load.apply(null, e[0]), t)
            : (n(e, function (e) {
                  e !== a && ((e = h(e)), (i[e.name] = e));
              }),
              n(e, function (e) {
                  e !== a &&
                      ((e = h(e)),
                      b(e, function () {
                          m(i) && l(a);
                      }));
              }),
              t);
    }
    function b(e, a) {
        if (((a = a || g), e.state === d)) {
            a();
            return;
        }
        if (e.state === w) {
            t.ready(e.name, a);
            return;
        }
        if (e.state === x) {
            e.onpreload.push(function () {
                b(e, a);
            });
            return;
        }
        e.state = w;
        C(e, function () {
            e.state = d;
            a();
            n(c[e.name], function (e) {
                l(e);
            });
            r &&
                m() &&
                n(c.ALL, function (e) {
                    l(e);
                });
        });
    }
    function j(e) {
        e = e || "";
        var a = e.split("?")[0].split(".");
        return a[a.length - 1].toLowerCase();
    }
    function C(a, t) {
        function r(a) {
            a = a || e.event;
            n.onload = n.onreadystatechange = n.onerror = null;
            t();
        }
        function s(l) {
            l = l || e.event;
            (l.type === "load" || (/loaded|complete/.test(n.readyState) && (!i.documentMode || i.documentMode < 9))) &&
                (e.clearTimeout(a.errorTimeout), e.clearTimeout(a.cssTimeout), (n.onload = n.onreadystatechange = n.onerror = null), t());
        }
        function c() {
            if (a.state !== d && a.cssRetries <= 20) {
                for (var t = 0, l = i.styleSheets.length; t < l; t++)
                    if (i.styleSheets[t].href === n.href) {
                        s({ type: "load" });
                        return;
                    }
                a.cssRetries++;
                a.cssTimeout = e.setTimeout(c, 250);
            }
        }
        var n, o, l;
        t = t || g;
        o = j(a.url);
        o === "css"
            ? ((n = i.createElement("link")), (n.type = "text/" + (a.type || "css")), (n.rel = "stylesheet"), (n.href = a.url), (a.cssRetries = 0), (a.cssTimeout = e.setTimeout(c, 500)))
            : ((n = i.createElement("script")), (n.type = "text/" + (a.type || "javascript")), (n.src = a.url));
        n.onload = n.onreadystatechange = s;
        n.onerror = r;
        n.async = !1;
        n.defer = !1;
        a.errorTimeout = e.setTimeout(function () {
            r({ type: "timeout" });
        }, 7e3);
        l = i.head || i.getElementsByTagName("head")[0];
        l.insertBefore(n, l.lastChild);
    }
    function O() {
        for (var e, n = i.getElementsByTagName("script"), a = 0, l = n.length; a < l; a++)
            if (((e = n[a].getAttribute("data-headjs-load")), !!e)) {
                t.load(e);
                return;
            }
    }
    function D(e, a) {
        var u, h, o;
        return e === i
            ? (r ? l(a) : v.push(a), t)
            : (s(e) && ((a = e), (e = "ALL")), p(e))
            ? ((u = {}),
              n(e, function (e) {
                  u[e] = f[e];
                  t.ready(e, function () {
                      m(u) && l(a);
                  });
              }),
              t)
            : typeof e != "string" || !s(a)
            ? t
            : ((h = f[e]), (h && h.state === d) || (e === "ALL" && m() && r))
            ? (l(a), t)
            : ((o = c[e]), o ? o.push(a) : (o = c[e] = [a]), t);
    }
    function o() {
        if (!i.body) {
            e.clearTimeout(t.readyTimeout);
            t.readyTimeout = e.setTimeout(o, 50);
            return;
        }
        r ||
            ((r = !0),
            O(),
            n(v, function (e) {
                l(e);
            }));
    }
    function k() {
        i.addEventListener ? (i.removeEventListener("DOMContentLoaded", k, !1), o()) : i.readyState === "complete" && (i.detachEvent("onreadystatechange", k), o());
    }
    var i = e.document,
        v = [],
        c = {},
        f = {},
        T = "async" in i.createElement("script") || "MozAppearance" in i.documentElement.style || e.opera,
        r,
        y = (e.head_conf && e.head_conf.head) || "head",
        t = (e[y] =
            e[y] ||
            function () {
                t.ready.apply(null, arguments);
            }),
        x = 1,
        M = 2,
        w = 3,
        d = 4,
        u;
    if (i.readyState === "complete") o();
    else if (i.addEventListener) i.addEventListener("DOMContentLoaded", k, !1), e.addEventListener("load", o, !1);
    else {
        i.attachEvent("onreadystatechange", k);
        e.attachEvent("onload", o);
        u = !1;
        try {
            u = !e.frameElement && i.documentElement;
        } catch (H) {}
        u &&
            u.doScroll &&
            (function F() {
                if (!r) {
                    try {
                        u.doScroll("left");
                    } catch (a) {
                        e.clearTimeout(t.readyTimeout);
                        t.readyTimeout = e.setTimeout(F, 50);
                        return;
                    }
                    o();
                }
            })();
    }
    t.load = t.js = T ? A : P;
    t.test = I;
    t.ready = D;
    t.ready(i, function () {
        m() &&
            n(c.ALL, function (e) {
                l(e);
            });
        t.feature && t.feature("domloaded", !0);
    });
})(window);
!(function (e, a, t) {
    function i(e) {
        return void 0 !== e;
    }
    function y(e) {
        return "string" == typeof e;
    }
    function g(e) {
        return "object" == typeof e;
    }
    function b(e) {
        return Object.keys(e).length;
    }
    function o(e, a, t) {
        return a > e ? a : e > t ? t : e;
    }
    function d(e, a) {
        return parseInt(e, a || 10);
    }
    function l(e) {
        return Math.round(e);
    }
    function r(e) {
        var t,
            i,
            n,
            c,
            f,
            o,
            r,
            s,
            u = +e[0],
            d = +e[1],
            a = +e[2];
        switch (((c = Math.floor(6 * u)), (f = 6 * u - c), (o = a * (1 - d)), (r = a * (1 - f * d)), (s = a * (1 - (1 - f) * d)), (c = c || 0), (r = r || 0), (s = s || 0), c % 6)) {
            case 0:
                (t = a), (i = s), (n = o);
                break;
            case 1:
                (t = r), (i = a), (n = o);
                break;
            case 2:
                (t = o), (i = a), (n = s);
                break;
            case 3:
                (t = o), (i = r), (n = a);
                break;
            case 4:
                (t = s), (i = o), (n = a);
                break;
            case 5:
                (t = a), (i = o), (n = r);
        }
        return [l(255 * t), l(255 * i), l(255 * n)];
    }
    function n(e) {
        return k(r(e));
    }
    function c(e) {
        var a,
            l = +e[0],
            i = +e[1],
            n = +e[2],
            o = Math.max(l, i, n),
            r = Math.min(l, i, n),
            t = o - r,
            s = 0 === o ? 0 : t / o,
            c = o / 255;
        switch (o) {
            case r:
                a = 0;
                break;
            case l:
                (a = i - n + t * (n > i ? 6 : 0)), (a /= 6 * t);
                break;
            case i:
                (a = n - l + 2 * t), (a /= 6 * t);
                break;
            case n:
                (a = l - i + 4 * t), (a /= 6 * t);
        }
        return [a, s, c];
    }
    function k(e) {
        var a = +e[2] | (+e[1] << 8) | (+e[0] << 16);
        return (a = "000000" + a.toString(16)), a.slice(-6);
    }
    function u(e) {
        return c(p(e));
    }
    function p(e) {
        return 3 === e.length && (e = e.replace(/./g, "$&$&")), [d(e[0] + e[1], 16), d(e[2] + e[3], 16), d(e[4] + e[5], 16)];
    }
    function h(e) {
        return [+e[0] / 360, +e[1] / 100, +e[2] / 100];
    }
    function v(e) {
        return [l(360 * +e[0]), l(100 * +e[1]), l(100 * +e[2])];
    }
    function x(e) {
        return [+e[0] / 255, +e[1] / 255, +e[2] / 255];
    }
    function w(e) {
        if (g(e)) return e;
        var a = /\s*rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)\s*$/i.exec(e),
            t = /\s*hsv\s*\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*\)\s*$/i.exec(e),
            i = "#" === e[0] && e.match(/^#([\da-f]{3}|[\da-f]{6})$/i);
        return i ? u(e.slice(1)) : t ? h([+t[1], +t[2], +t[3]]) : a ? c([+a[1], +a[2], +a[3]]) : [0, 1, 1];
    }
    var s = "__instance__",
        f = "firstChild",
        m = setTimeout;
    !(function (e) {
        (e.version = "1.4.2"),
            (e[s] = {}),
            (e.each = function (a, t) {
                return (
                    m(
                        function () {
                            var t,
                                i = e[s];
                            for (t in i) a.call(i[t], t, i);
                        },
                        0 === t ? 0 : t || 1
                    ),
                    e
                );
            }),
            (e.parse = w),
            (e._HSV2RGB = r),
            (e._HSV2HEX = n),
            (e._RGB2HSV = c),
            (e._HEX2HSV = u),
            (e._HEX2RGB = function (e) {
                return x(p(e));
            }),
            (e.HSV2RGB = function (e) {
                return r(h(e));
            }),
            (e.HSV2HEX = function (e) {
                return n(h(e));
            }),
            (e.RGB2HSV = function (e) {
                return v(c(e));
            }),
            (e.RGB2HEX = k),
            (e.HEX2HSV = function (e) {
                return v(u(e));
            }),
            (e.HEX2RGB = p);
    })(
        (e[t] = function (l, c, u) {
            function M(e, a, t) {
                e = e.split(/\s+/);
                for (var i = 0, n = e.length; n > i; ++i) a.addEventListener(e[i], t, !1);
            }
            function B(e, a, t) {
                e = e.split(/\s+/);
                for (var i = 0, n = e.length; n > i; ++i) a.removeEventListener(e[i], t);
            }
            function ie(e, a) {
                var t = "touches",
                    i = "clientX",
                    n = "clientY",
                    o = a[t] ? a[t][0][i] : a[i],
                    r = a[t] ? a[t][0][n] : a[n],
                    l = W(e);
                return { x: o - l.l, y: r - l.t };
            }
            function W(a) {
                var t, i, n;
                return a === e ? ((t = e.pageXOffset || O.scrollLeft), (i = e.pageYOffset || O.scrollTop)) : ((n = a.getBoundingClientRect()), (t = n.left), (i = n.top)), { l: t, t: i };
            }
            function V(e, a) {
                for (; (e = e.parentElement) && e !== a; );
                return e;
            }
            function K(e) {
                e && e.preventDefault();
            }
            function w(a) {
                return a === e ? { w: e.innerWidth, h: e.innerHeight } : { w: a.offsetWidth, h: a.offsetHeight };
            }
            function D(e) {
                return X || (i(e) ? e : !1);
            }
            function H(e) {
                X = e;
            }
            function le(e, a, t) {
                return i(e) ? (i(a) ? (i(v[e]) || (v[e] = {}), i(t) || (t = b(v[e])), (v[e][t] = a), d) : v[e]) : v;
            }
            function oe(e, a) {
                return i(e) ? (i(a) ? (delete v[e][a], d) : ((v[e] = {}), d)) : ((v = {}), d);
            }
            function p(e, a, t) {
                if (!i(v[e])) return d;
                if (i(t)) i(v[e][t]) && v[e][t].apply(d, a);
                else for (var n in v[e]) v[e][n].apply(d, a);
                return d;
            }
            function S(e, a) {
                (e && "h" !== e) || p("change:h", a), (e && "sv" !== e) || p("change:sv", a), p("change", a);
            }
            function U() {
                return k.parentNode;
            }
            function F(t, i) {
                function O(e) {
                    var a = e.target,
                        t = a === l || V(a, l) === l;
                    t ? !U() && (F(), p("enter")) : d.exit();
                }
                function b(e) {
                    var a = (r(h), r([h[0], 1, 1]));
                    (C.style.backgroundColor = "rgb(" + a.join(",") + ")"), H(h), K(e);
                }
                function le(e) {
                    var a = o(ie(I, e).y, 0, f);
                    (h[0] = (f - a) / f), (z.style.top = a - T / 2 + "px"), b(e);
                }
                function oe(e) {
                    var a = ie(C, e),
                        t = o(a.x, 0, s),
                        i = o(a.y, 0, m);
                    (h[1] = 1 - (s - t) / s), (h[2] = (m - i) / m), (E.style.right = s - t - L / 2 + "px"), (E.style.top = i - P / 2 + "px"), b(e);
                }
                function g(e) {
                    j && (le(e), (x = [n(h)]), N || (p("drag:h", x), p("drag", x), S("h", x))), G && (oe(e), (x = [n(h)]), q || (p("drag:sv", x), p("drag", x), S("sv", x))), (N = 0), (q = 0);
                }
                function W(e) {
                    var a = e.target,
                        i = j ? "h" : "sv",
                        t = [n(h), d],
                        r = a === l || V(a, l) === l,
                        o = a === k || V(a, k) === k;
                    r || o ? o && (p("stop:" + i, t), p("stop", t), S(i, t)) : U() && c !== !1 && (d.exit(), S(0, t)), (j = 0), (G = 0);
                }
                function Z(e) {
                    (N = 1), (j = 1), g(e), K(e), p("start:h", x), p("start", x), S("h", x);
                }
                function X(e) {
                    (q = 1), (G = 1), g(e), K(e), p("start:sv", x), p("start", x), S("sv", x);
                }
                t || ((u || i || ne).appendChild(k), (d.visible = !0)), (Q = w(k).w), (Y = w(k).h);
                var v = w(C),
                    y = w(E),
                    f = w(I).h,
                    s = v.w,
                    m = v.h,
                    T = w(z).h,
                    L = y.w,
                    P = y.h;
                t
                    ? ((k.style.left = k.style.top = "-9999px"),
                      c !== !1 && M(c, l, O),
                      (d.create = function () {
                          return F(1), p("create"), d;
                      }),
                      (d.destroy = function () {
                          return c !== !1 && B(c, l, O), d.exit(), H(!1), p("destroy"), d;
                      }))
                    : J(),
                    (R = function () {
                        (h = D(h)), b(), (z.style.top = f - T / 2 - f * +h[0] + "px"), (E.style.right = s - L / 2 - s * +h[1] + "px"), (E.style.top = m - P / 2 - m * +h[2] + "px");
                    }),
                    (d.exit = function () {
                        var t = U();
                        return t && (t.removeChild(k), (d.visible = !1)), B(A, I, Z), B(A, C, X), B(ee, a, g), B(ae, a, W), B(te, e, J), p("exit"), d;
                    }),
                    R(),
                    t || (M(A, I, Z), M(A, C, X), M(ee, a, g), M(ae, a, W), M(te, e, J));
            }
            function J() {
                return d.fit();
            }
            var ne = a.body,
                O = a.documentElement,
                d = this,
                T = e[t],
                X = !1,
                v = {},
                k = a.createElement("div"),
                A = "touchstart mousedown",
                ee = "touchmove mousemove",
                ae = "touchend mouseup",
                te = "orientationchange resize";
            if (!(d instanceof T)) return new T(l, c);
            (T[s][l.id || l.name || b(T[s])] = d),
                (i(c) && c !== !0) || (c = A),
                H(T.parse(l.getAttribute("data-color") || l.value || [0, 1, 1])),
                (k.className = "color-picker"),
                (k.innerHTML = '<div class="color-picker-container"><span class="color-picker-h"><i></i></span><span class="color-picker-sv"><i></i></span></div>');
            var R,
                Z = k[f].children,
                h = D([0, 1, 1]),
                I = Z[0],
                C = Z[1],
                z = I[f],
                E = C[f],
                N = 0,
                q = 0,
                j = 0,
                G = 0,
                L = 0,
                P = 0,
                Q = 0,
                Y = 0,
                x = [n(h)];
            return (
                F(1),
                m(function () {
                    var e = [n(h)];
                    p("create", e), S(0, e);
                }, 0),
                (d.fit = function (a) {
                    var n = w(e),
                        h = w(O),
                        m = n.w - h.w,
                        b = n.h - O.clientHeight,
                        t = W(e),
                        r = W(l);
                    if (((L = r.l + t.l), (P = r.t + t.t + w(l).h), g(a))) i(a[0]) && (L = a[0]), i(a[1]) && (P = a[1]);
                    else {
                        var s = t.l,
                            c = t.t,
                            f = t.l + n.w - Q - m,
                            u = t.t + n.h - Y - b;
                        (L = o(L, s, f) >> 0), (P = o(P, c, u) >> 0);
                    }
                    return (k.style.left = L + "px"), (k.style.top = P + "px"), p("fit"), d;
                }),
                (d.set = function (e) {
                    return i(e) ? (y(e) && (e = T.parse(e)), H(e), R(), d) : D();
                }),
                (d.get = function (e) {
                    return D(e);
                }),
                (d.source = l),
                (d.self = k),
                (d.visible = !1),
                (d.on = le),
                (d.off = oe),
                (d.fire = p),
                (d.hooks = v),
                (d.enter = function (e) {
                    return F(0, e), p("enter"), d;
                }),
                d
            );
        })
    );
})(window, document, "CP");
faIcons = new Array(
    "fas fa-0|digitzeronadanonezerozilch",
    "fas fa-1|digitoneone",
    "fas fa-2|digittwotwo",
    "fas fa-3|digitthreethree",
    "fas fa-4|digitfourfour",
    "fas fa-5|digitfivefive",
    "fas fa-6|digitsixsix",
    "fas fa-7|digitsevenseven",
    "fas fa-8|digiteighteight",
    "fas fa-9|digitninenine",
    "fab fa-42-group",
    "fab fa-500px",
    "fas fa-a|latincapitalletteralatinsmallletteraletter",
    "fab fa-accessible-icon|accessibilityhandicappersonwheelchairwheelchairalt",
    "fab fa-accusoft",
    "fas fa-address-book|contactdirectoryindexlittleblackbookrolodex",
    "fas fa-address-card|aboutcontactididentificationpostcardprofileregistration",
    "fab fa-adn",
    "fab fa-adversal",
    "fab fa-affiliatetheme",
    "fab fa-airbnb",
    "fab fa-algolia",
    "fas fa-align-center|formatmiddleparagraphtext",
    "fas fa-align-justify|formatparagraphtext",
    "fas fa-align-left|formatparagraphtext",
    "fas fa-align-right|formatparagraphtext",
    "fab fa-alipay",
    "fab fa-amazon",
    "fab fa-amazon-pay",
    "fab fa-amilia",
    "fas fa-anchor|anchorberthboatdockembedlinkmaritimemoorportsecureshiptool",
    "fas fa-anchor-circle-check|marinanotaffectedokokayport",
    "fas fa-anchor-circle-exclamation|affectedmarinaport",
    "fas fa-anchor-circle-xmark|destroymarinaport",
    "fas fa-anchor-lock|closedlockdownmarinaportquarantine",
    "fab fa-android|robot",
    "fab fa-angellist",
    "fas fa-angle-down|downarrowheadarrowcaretdownloadexpand",
    "fas fa-angle-left|singleleftpointinganglequotationmarkarrowbackcaretlessprevious",
    "fas fa-angle-right|singlerightpointinganglequotationmarkarrowcareforwardmorenext",
    "fas fa-angle-up|uparrowheadarrowcaretcollapseupload",
    "fas fa-angles-down|arrowscaretdownloadexpand",
    "fas fa-angles-left|leftpointingdoubleanglequotationmarkarrowsbackcaretlaquopreviousquote",
    "fas fa-angles-right|rightpointingdoubleanglequotationmarkarrowscaretforwardmorenextquoteraquo",
    "fas fa-angles-up|arrowscaretcollapseupload",
    "fab fa-angrycreative",
    "fab fa-angular",
    "fas fa-ankh|ankhamuletcoppercopticchristianitycoptscruxansataegyptvenus",
    "fab fa-app-store",
    "fab fa-app-store-ios",
    "fab fa-apper",
    "fab fa-apple|fruitiosmacoperatingsystemososx",
    "fab fa-apple-pay",
    "fas fa-apple-whole|applefallfruitfujigreengreenapplemacintoshorchardredredappleseasonalvegan",
    "fas fa-archway|arcmonumentroadstreettunnel",
    "fas fa-arrow-down|downwardsarrowdownload",
    "fas fa-arrow-down-1-9|arrangefilternumbersordersortnumericasc",
    "fas fa-arrow-down-9-1|arrangefilternumbersordersortnumericasc",
    "fas fa-arrow-down-a-z|alphabeticalarrangefilterordersortalphaasc",
    "fas fa-arrow-down-long|downloadlongarrowdown",
    "fas fa-arrow-down-short-wide|arrangefilterordersortamountasc",
    "fas fa-arrow-down-up-across-line|bordercrossingtransfer",
    "fas fa-arrow-down-up-lock|borderclosedcrossinglockdownquarantinetransfer",
    "fas fa-arrow-down-wide-short|arrangefilternumberordersortamountasc",
    "fas fa-arrow-down-z-a|alphabeticalarrangefilterordersortalphaasc",
    "fas fa-arrow-left|leftwardsarrowbackprevious",
    "fas fa-arrow-left-long|backlongarrowleftprevious",
    "fas fa-arrow-pointer|arrowcursorselect",
    "fas fa-arrow-right|rightwardsarrowforwardnext",
    "fas fa-arrow-right-arrow-left|rightwardsarrowoverleftwardsarrowarrowarrowsreciprocatereturnswaptransfer",
    "fas fa-arrow-right-from-bracket|arrowexitleavelogoutlogout",
    "fas fa-arrow-right-long|forwardlongarrowrightnext",
    "fas fa-arrow-right-to-bracket|arrowenterjoinloginloginsigninsignupsigninsigninsignup",
    "fas fa-arrow-right-to-city|buildingcityexodusruralurban",
    "fas fa-arrow-rotate-left|anticlockwiseopencirclearrowbackcontrolzexchangeoopsreturnrotateswap",
    "fas fa-arrow-rotate-right|clockwiseopencirclearrowforwardrefreshreloadrepeat",
    "fas fa-arrow-trend-down|linestockstrend",
    "fas fa-arrow-trend-up|linestockstrend",
    "fas fa-arrow-turn-down|arrow",
    "fas fa-arrow-turn-up|arrow",
    "fas fa-arrow-up|upwardsarrowforwardupload",
    "fas fa-arrow-up-1-9|arrangefilternumbersordersortnumericdesc",
    "fas fa-arrow-up-9-1|arrangefilternumbersordersortnumericdesc",
    "fas fa-arrow-up-a-z|alphabeticalarrangefilterordersortalphadesc",
    "fas fa-arrow-up-from-bracket|sharetransferupload",
    "fas fa-arrow-up-from-ground-water|groundwaterspringwatersupplywatertable",
    "fas fa-arrow-up-from-water-pump|floodgroundwaterpumpsubmersiblesumppump",
    "fas fa-arrow-up-long|longarrowupupload",
    "fas fa-arrow-up-right-dots|growthincreasepopulation",
    "fas fa-arrow-up-right-from-square|newopensendshare",
    "fas fa-arrow-up-short-wide|arrangefilterordersortamountdesc",
    "fas fa-arrow-up-wide-short|arrangefilterordersortamountdesc",
    "fas fa-arrow-up-z-a|alphabeticalarrangefilterordersortalphadesc",
    "fas fa-arrows-down-to-line|scaledownsink",
    "fas fa-arrows-down-to-people|affectedfocustargeted",
    "fas fa-arrows-left-right|expandhorizontallandscaperesizewide",
    "fas fa-arrows-left-right-to-line|analysisexpandgap",
    "fas fa-arrows-rotate|clockwiserightandleftsemicirclearrowsexchangerefreshreloadrotateswap",
    "fas fa-arrows-spin|cyclerotatespinwhirl",
    "fas fa-arrows-split-up-and-left|agilesplit",
    "fas fa-arrows-to-circle|centerconcentratecoordinatecoordinationfocalpointfocus",
    "fas fa-arrows-to-dot|assemblypointcentercondensefocusminimize",
    "fas fa-arrows-to-eye|centercoordinatedassessmentfocus",
    "fas fa-arrows-turn-right|arrows",
    "fas fa-arrows-turn-to-dots|destinationnexus",
    "fas fa-arrows-up-down|expandportraitresizetallvertical",
    "fas fa-arrows-up-down-left-right|arrowarrowsbiggerenlargeexpandfullscreenmovepositionreorderresize",
    "fas fa-arrows-up-to-line|risescaleup",
    "fab fa-artstation",
    "fas fa-asterisk|asteriskheavyasteriskannotationdetailsreferencestar",
    "fab fa-asymmetrik",
    "fas fa-at|commercialataddressauthoremailemailfluctuatehandle",
    "fab fa-atlassian",
    "fas fa-atom|atheismatheistatomatomsymbolchemistryelectronionisotopeneutronnuclearprotonscience",
    "fab fa-audible",
    "fas fa-audio-description|blindnarrationvideovisual",
    "fas fa-austral-sign|australsigncurrency",
    "fab fa-autoprefixer",
    "fab fa-avianex",
    "fab fa-aviato",
    "fas fa-award|honorpraiseprizerecognitionribbontrophy",
    "fab fa-aws",
    "fas fa-b|latincapitalletterblatinsmallletterbletter",
    "fas fa-baby|userspeople",
    "fas fa-baby-carriage|buggycarrierinfantpushstrollertransportationwalkwheels",
    "fas fa-backward|arrowdoublefastreversebuttonpreviousrewind",
    "fas fa-backward-fast|arrowbeginningfirstlasttrackbuttonpreviousprevioussceneprevioustrackrewindstarttriangle",
    "fas fa-backward-step|beginningfirstpreviousrewindstart",
    "fas fa-bacon|baconbltbreakfastfoodhamlardmeatpancettaporkrasher",
    "fas fa-bacteria|antibioticantibodycovid19healthorganismsick",
    "fas fa-bacterium|antibioticantibodycovid19healthorganismsick",
    "fas fa-bag-shopping|buycheckoutgrocerypaymentpurchase",
    "fas fa-bahai|bahaibahstar",
    "fas fa-baht-sign|currency",
    "fas fa-ban|abortbanblockcanceldeleteentryforbiddenhidenonotprohibitprohibitedremovestoptrash",
    "fas fa-ban-smoking|bancancelforbiddennonosmokingnonsmokingnotprohibitedsmoking",
    "fas fa-bandage|adhesivebandagebandagebooboofirstaidouch",
    "fab fa-bandcamp",
    "fas fa-bangladeshi-taka-sign|bdtcurrencytk",
    "fas fa-barcode|infolaserpricescanupc",
    "fas fa-bars|checklistdraghamburgerlistmenunavnavigationolreordersettingstodoul",
    "fas fa-bars-progress|checklistdownloadingdownloadsloadingpollprogressprojectmanagementsettingstodo",
    "fas fa-bars-staggered|flowlisttimeline",
    "fas fa-baseball|ballbaseballfoulglovehardballleagueleathermlbsoftballsportunderarm",
    "fas fa-baseball-bat-ball|batleaguemlbsluggersoftballsport",
    "fas fa-basket-shopping|buycheckoutgrocerypaymentpurchase",
    "fas fa-basketball|ballbasketballdribbledunkhoopnba",
    "fas fa-bath|bathbathtubcleanshowertubwash",
    "fas fa-battery-empty|chargedeadpowerstatus",
    "fas fa-battery-full|batterbatterychargepowerstatus",
    "fas fa-battery-half|chargepowerstatus",
    "fas fa-battery-quarter|chargelowpowerstatus",
    "fas fa-battery-three-quarters|chargepowerstatus",
    "fab fa-battle-net",
    "fas fa-bed|hospitalhotellodgingmattresspatientpersoninbedrestsleeptravel",
    "fas fa-bed-pulse|ekgbedelectrocardiogramhealthhospitallifepatientvital",
    "fas fa-beer-mug-empty|alcoholalebarbeveragebrewbrewerydrinkfoamlagerliquormugstein",
    "fab fa-behance",
    "fas fa-bell|alarmalertbelbellchimenotificationreminder",
    "fas fa-bell-concierge|attentionbellbellhopbellhopbellhotelreceptionistservicesupport",
    "fas fa-bell-slash|alertbellbellwithslashcanceldisabledforbiddenmutenotificationoffquietremindersilent",
    "fas fa-bezier-curve|curvesillustratorlinespathvector",
    "fas fa-bicycle|bicyclebikegearspedaltransportationvehicle",
    "fab fa-bilibili",
    "fab fa-bimobject",
    "fas fa-binoculars|glassesmagnifyscenicspyglassview",
    "fas fa-biohazard|biohazardcovid19dangerdangerousepidemichazmatmedicalpandemicradioactivesigntoxicwastezombie",
    "fab fa-bitbucket|atlassianbitbucketsquaregit",
    "fab fa-bitcoin",
    "fas fa-bitcoin-sign|bitcoinsigncurrency",
    "fab fa-bity",
    "fab fa-black-tie",
    "fab fa-blackberry",
    "fas fa-blender|cocktailmilkshakemixerpureesmoothie",
    "fas fa-blender-phone|appliancecocktailfantasymilkshakemixerpureesillysmoothie",
    "fas fa-blog|journallogonlinepersonalpostweb20wordpresswriting",
    "fab fa-blogger",
    "fab fa-blogger-b",
    "fab fa-bluetooth|signal",
    "fab fa-bluetooth-b",
    "fas fa-bold|emphasisformattext",
    "fas fa-bolt|chargedangerelectricelectricityflashhighvoltagelightningvoltageweatherzap",
    "fas fa-bolt-lightning|electricityflashlightningweatherzap",
    "fas fa-bomb|bombcomicerrorexplodefusegrenadewarning",
    "fas fa-bone|bonecalciumdogskeletalskeletontibia",
    "fas fa-bong|aparatuscannabismarijuanapipesmokesmoking",
    "fas fa-book|bookcoverdecorateddiarydocumentationjournallibrarynotebooknotebookwithdecorativecoverreadresearch",
    "fas fa-book-atlas|bookdirectionsgeographyglobelibrarymapresearchtravelwayfinding",
    "fas fa-book-bible|bookcatholicismchristianitygodholy",
    "fas fa-book-bookmark|libraryresearch",
    "fas fa-book-journal-whills|bookforcejedisithstarwarsyoda",
    "fas fa-book-medical|diarydocumentationhealthhistoryjournallibraryreadrecordresearch",
    "fas fa-book-open|bookbookflyerlibrarynotebookopenopenbookpamphletreadingresearch",
    "fas fa-book-open-reader|flyerlibrarynotebookopenbookpamphletreadingresearch",
    "fas fa-book-quran|bookislammuslimreligion",
    "fas fa-book-skull|dungeonsdragonscrossbonesdddarkartsdeathdnddocumentationevilfantasyhalloweenholidaylibrarynecronomiconreadresearchskullspell",
    "fas fa-book-tanakh|bookjewishjudaismreligion",
    "fas fa-bookmark|bookmarkfavoritelibrarymarkmarkerreadrememberresearchsave",
    "fab fa-bootstrap",
    "fas fa-border-all|cellgridoutlinestroketable",
    "fas fa-border-none|cellgridoutlinestroketable",
    "fas fa-border-top-left|celloutlinestroketable",
    "fas fa-bore-hole|boreburydrillhole",
    "fab fa-bots",
    "fas fa-bottle-droplet|alcoholdrinkoiloliveoilwine",
    "fas fa-bottle-water|h2oplasticwater",
    "fas fa-bowl-food|catfooddogfoodfoodrice",
    "fas fa-bowl-rice|boiledcookedcookedricericesteamed",
    "fas fa-bowling-ball|alleycandlepingutterlanestriketenpin",
    "fas fa-box|archiveboxcontainerpackageparcelstorage",
    "fas fa-box-archive|boxpackagesavestorage",
    "fas fa-box-open|archivecontainerpackagestorageunpack",
    "fas fa-box-tissue|coughcovid19kleenexmucusnosesneezesnot",
    "fas fa-boxes-packing|archiveboxpackagestoragesupplies",
    "fas fa-boxes-stacked|archivesinventorystoragewarehouse",
    "fas fa-braille|alphabetblinddotsraisedvision",
    "fas fa-brain|braincerebellumgraymatterintellectintelligentmedullaoblongatamindnoodlewit",
    "fas fa-brazilian-real-sign|brazilianrealsigncurrency",
    "fas fa-bread-slice|bakebakerybakingdoughflourglutengrainsandwichsourdoughtoastwheatyeast",
    "fas fa-bridge|bridgeroad",
    "fas fa-bridge-circle-check|bridgenotaffectedokokayroad",
    "fas fa-bridge-circle-exclamation|affectedbridgeroad",
    "fas fa-bridge-circle-xmark|bridgedestroyroad",
    "fas fa-bridge-lock|bridgeclosedlockdownquarantineroad",
    "fas fa-bridge-water|bridgeroad",
    "fas fa-briefcase|bagbriefcasbriefcasebusinessluggageofficework",
    "fas fa-briefcase-medical|doctoremtfirstaidhealth",
    "fas fa-broom|broomcleancleaningfireboltflyhalloweennimbus2000quidditchsweepsweepingwitch",
    "fas fa-broom-ball|ballbludgerbroomgoldensnitchharrypotterhogwartsquafflesportwizard",
    "fas fa-brush|artbristlescolorhandlepaint",
    "fab fa-btc",
    "fas fa-bucket|bucketpailsandcastle",
    "fab fa-buffer",
    "fas fa-bug|beetleerrorglitchinsectrepairreport",
    "fas fa-bug-slash|beetlefixglitchinsectoptimizerepairreportwarning",
    "fas fa-bugs|bedbuginfestationliceplagueticks",
    "fas fa-building|apartmentbuildingbusinesscitycompanyofficeofficebuildingurbanwork",
    "fas fa-building-circle-arrow-right|buildingcitydistributioncenteroffice",
    "fas fa-building-circle-check|buildingcitynotaffectedofficeokokay",
    "fas fa-building-circle-exclamation|affectedbuildingcityoffice",
    "fas fa-building-circle-xmark|buildingcitydestroyoffice",
    "fas fa-building-columns|bankbuildingcollegeeducationinstitutionmuseumstudents",
    "fas fa-building-flag|citybuildingdiplomatembassyflagheadquartersunitednations",
    "fas fa-building-lock|buildingcityclosedlocklockdownquarantinesecure",
    "fas fa-building-ngo|citybuildingnongovernmentalorganizationoffice",
    "fas fa-building-shield|buildingcitypoliceprotectsafety",
    "fas fa-building-un|buildingcityofficeunitednations",
    "fas fa-building-user|apartmentbuildingcity",
    "fas fa-building-wheat|agriculturebuildingcityusda",
    "fas fa-bullhorn|bullhornannouncementbroadcastloudlouderloudspeakermegaphonepublicaddressshare",
    "fas fa-bullseye|archerygoalobjectivetarget",
    "fas fa-burger|baconbeefburgerburgerkingcheeseburgerfastfoodgrillgroundbeefmcdonaldssandwich",
    "fab fa-buromobelexperte",
    "fas fa-burst|boomcrashexplosion",
    "fas fa-bus|busoncomingoncomingbuspublictransportationtransportationtravelvehicle",
    "fas fa-bus-simple|mtapublictransportationtransportationtravelvehicle",
    "fas fa-business-time|alarmbriefcasebusinesssocksclockflightoftheconchordsreminderwednesday",
    "fab fa-buy-n-large",
    "fab fa-buysellads",
    "fas fa-c|latincapitalletterclatinsmalllettercletter",
    "fas fa-cable-car|aerialtramwaycablegondolaliftmountainmountaincablewaytramtramwaytrolley",
    "fas fa-cake-candles|anniversarybakerybirthdaybirthdaycakecakecandlescelebrationdessertfrostingholidaypartypastrysweet",
    "fas fa-calculator|pocketcalculatorabacusadditionarithmeticcountingmathmultiplicationsubtraction",
    "fas fa-calendar|calendarcalendarodatedayeventmonthscheduletearoffcalendartimewhenyear",
    "fas fa-calendar-check|acceptagreeappointmentconfirmcorrectdatedaydoneeventmonthokscheduleselectsuccessticktimetodowhenyear",
    "fas fa-calendar-day|datedaydetaileventfocusmonthschedulesingledaytimetodaywhenyear",
    "fas fa-calendar-days|calendardatedayeventmonthscheduletimewhenyear",
    "fas fa-calendar-minus|calendardatedaydeleteeventmonthnegativeremovescheduletimewhenyear",
    "fas fa-calendar-plus|addcalendarcreatedatedayeventmonthnewpositivescheduletimewhenyear",
    "fas fa-calendar-week|datedaydetaileventfocusmonthschedulesingleweektimetodaywhenyear",
    "fas fa-calendar-xmark|archivecalendardatedaydeleteeventmonthremovescheduletimewhenxyear",
    "fas fa-camera|imagelensphotopicturerecordshuttervideo",
    "fas fa-camera-retro|cameraimagelensphotopicturerecordshuttervideo",
    "fas fa-camera-rotate|flipfrontfacingphotoselfie",
    "fas fa-campground|campingfalloutdoorsteepeetenttipi",
    "fab fa-canadian-maple-leaf|canadaflagfloranatureplant",
    "fas fa-candy-cane|candychristmasholidaymintpeppermintstripedxmas",
    "fas fa-cannabis|budchronicdrugsendicaendoganjamarijuanamaryjanepotreefersativaspliffweedwhackytabacky",
    "fas fa-capsules|drugsmedicinepillsprescription",
    "fas fa-car|autoautomobilecaroncomingoncomingautomobilesedantransportationtravelvehicle",
    "fas fa-car-battery|autoelectricmechanicpower",
    "fas fa-car-burst|accidentautoautomobileinsurancesedantransportationvehiclewreck",
    "fas fa-car-on|alarmcarcarjackwarning",
    "fas fa-car-rear|autoautomobilesedantransportationtravelvehicle",
    "fas fa-car-side|autoautomobilecarsedantransportationtravelvehicle",
    "fas fa-car-tunnel|roadtunnel",
    "fas fa-caravan|campermotorhomervtrailertravel",
    "fas fa-caret-down|arrowdropdownexpandmenumoretriangle",
    "fas fa-caret-left|arrowbackprevioustriangle",
    "fas fa-caret-right|arrowforwardnexttriangle",
    "fas fa-caret-up|arrowcollapsetriangle",
    "fas fa-carrot|bugsbunnycarrotfoodorangeveganvegetable",
    "fas fa-cart-arrow-down|downloadsaveshopping",
    "fas fa-cart-flatbed|carryinventoryshippingtransport",
    "fas fa-cart-flatbed-suitcase|airportbagbaggagesuitcasetravel",
    "fas fa-cart-plus|addcreatenewpositiveshopping",
    "fas fa-cart-shopping|buycartcheckoutgrocerypaymentpurchaseshoppingshoppingcarttrolley",
    "fas fa-cash-register|buychachingchangecheckoutcommerceleaerboardmachinepaypaymentpurchasestore",
    "fas fa-cat|catfelinehalloweenholidaykittenkittymeowpet",
    "fab fa-cc-amazon-pay",
    "fab fa-cc-amex|amex",
    "fab fa-cc-apple-pay",
    "fab fa-cc-diners-club",
    "fab fa-cc-discover",
    "fab fa-cc-jcb",
    "fab fa-cc-mastercard",
    "fab fa-cc-paypal",
    "fab fa-cc-stripe",
    "fab fa-cc-visa",
    "fas fa-cedi-sign|cedisigncurrency",
    "fas fa-cent-sign|centsigncurrency",
    "fab fa-centercode",
    "fab fa-centos|linuxoperatingsystemos",
    "fas fa-certificate|badgestarverified",
    "fas fa-chair|chairfurnitureseatsit",
    "fas fa-chalkboard|blackboardlearningschoolteachingwhiteboardwriting",
    "fas fa-chalkboard-user|blackboardinstructorlearningprofessorschoolwhiteboardwriting",
    "fas fa-champagne-glasses|alcoholbarbeveragecelebratecelebrationchampagneclinkclinkingglassesdrinkglassholidaynewyearsevepartytoast",
    "fas fa-charging-station|electricevteslavehicle",
    "fas fa-chart-area|analyticsareachartgraph",
    "fas fa-chart-bar|analyticsbarchartgraph",
    "fas fa-chart-column|barbarchartchartgraphtracktrend",
    "fas fa-chart-gantt|chartgraphtracktrend",
    "fas fa-chart-line|activityanalyticschartdashboardgaingraphincreaseline",
    "fas fa-chart-pie|analyticschartdiagramgraphpie",
    "fas fa-chart-simple|analyticsbarchartcolumngraphrowtrend",
    "fas fa-check|checkmarkacceptagreecheckcheckmarkcheckmarkconfirmcorrectdonemarknoticenotificationnotifyokselectsuccessticktodoyes",
    "fas fa-check-double|acceptagreecheckmarkconfirmcorrectdonenoticenotificationnotifyokselectsuccessticktodo",
    "fas fa-check-to-slot|acceptcastelectionpoliticspositivevotingyes",
    "fas fa-cheese|cheddarcurdgoudameltparmesansandwichswisswedge",
    "fas fa-chess|boardcastlecheckmategamekingrookstrategytournament",
    "fas fa-chess-bishop|blackchessbishopboardcheckmategamestrategy",
    "fas fa-chess-board|boardcheckmategamestrategy",
    "fas fa-chess-king|blackchesskingboardcheckmategamestrategy",
    "fas fa-chess-knight|blackchessknightboardcheckmategamehorsestrategy",
    "fas fa-chess-pawn|boardcheckmatechesschesspawndupeexpendablegamestrategy",
    "fas fa-chess-queen|blackchessqueenboardcheckmategamestrategy",
    "fas fa-chess-rook|blackchessrookboardcastlecheckmategamestrategy",
    "fas fa-chevron-down|arrowdownloadexpand",
    "fas fa-chevron-left|leftpointinganglebracketarrowbackbracketprevious",
    "fas fa-chevron-right|rightpointinganglebracketarrowbracketforwardnext",
    "fas fa-chevron-up|arrowcollapseupload",
    "fas fa-child|boygirlkidtoddleryoungyouth",
    "fas fa-child-combatant|combatant",
    "fas fa-child-dress|boygirlkidtoddleryoungyouth",
    "fas fa-child-reaching|boygirlkidtoddleryoungyouth",
    "fas fa-children|boychildgirlkidkidsyoungyouth",
    "fab fa-chrome|browser",
    "fab fa-chromecast",
    "fas fa-church|christianbuildingcathedralchapelchurchcommunitycrossreligion",
    "fas fa-circle|blackcircleblacklargecircleblackcirclebluebluecirclebrownbrowncirclechartcirclecirclethindiameterdotellipsefillgeometricgreengreencirclenotificationorangeorangecircleprogresspurplepurplecircleredredcircleroundwhitecircleyellowyellowcircle",
    "fas fa-circle-arrow-down|download",
    "fas fa-circle-arrow-left|backprevious",
    "fas fa-circle-arrow-right|forwardnext",
    "fas fa-circle-arrow-up|upload",
    "fas fa-circle-check|acceptaffectedagreeclearconfirmcorrectdoneokselectsuccessticktodoyes",
    "fas fa-circle-chevron-down|arrowdownloaddropdownmenumore",
    "fas fa-circle-chevron-left|arrowbackprevious",
    "fas fa-circle-chevron-right|arrowforwardnext",
    "fas fa-circle-chevron-up|arrowcollapseupload",
    "fas fa-circle-dollar-to-slot|contributegenerositygiftgive",
    "fas fa-circle-dot|bullseyebuttongeometricnotificationradioradiobuttontarget",
    "fas fa-circle-down|arrowcircleodowndownload",
    "fas fa-circle-exclamation|affectalertdamagedangererrorimportantnoticenotificationnotifyproblemwarning",
    "fas fa-circle-h|circledlatincapitalletterhcliniccovid19emergencylettermap",
    "fas fa-circle-half-stroke|circlewithlefthalfblackadjustchartcontrastdarkfilllightpieprogresssaturation",
    "fas fa-circle-info|detailshelpinformationmoresupport",
    "fas fa-circle-left|arrowcircleoleftbackprevious",
    "fas fa-circle-minus|deletehidenegativeremoveshapetrash",
    "fas fa-circle-nodes|clusterconnectnetwork",
    "fas fa-circle-notch|circleonotchdiameterdotellipseroundspinner",
    "fas fa-circle-pause|holdwait",
    "fas fa-circle-play|audiomusicplayingsoundstartvideo",
    "fas fa-circle-plus|addcreateexpandnewpositiveshape",
    "fas fa-circle-question|helpinformationsupportunknown",
    "fas fa-circle-radiation|dangerdangerousdeadlyhazardnuclearradioactivesignwarning",
    "fas fa-circle-right|arrowcircleorightforwardnext",
    "fas fa-circle-stop|blockboxcirclesquare",
    "fas fa-circle-up|arrowcircleoup",
    "fas fa-circle-user|userspeople",
    "fas fa-circle-xmark|closecrossdestroyexitincorrectnoticenotificationnotifyproblemwrongx",
    "fas fa-city|buildingsbusycitycityscapeskyscrapersurbanwindows",
    "fas fa-clapperboard|cameraclapperclapperboarddirectorfilmmovierecord",
    "fas fa-clipboard|clipboarclipboardcopynotespasterecord",
    "fas fa-clipboard-check|acceptagreeconfirmdoneokselectsuccessticktodoyes",
    "fas fa-clipboard-list|checklistcompleteddonefinishedintineraryolscheduleticktodoul",
    "fas fa-clipboard-question|assistanceinterviewqueryquestion",
    "fas fa-clipboard-user|attendancerecordrosterstaff",
    "fas fa-clock|004400clockdatefourfouroclockhourlateminuteoclockoclockscheduletickingtimetimertimestampwatch",
    "fas fa-clock-rotate-left|rewindclockreversetimetimemachinetimetravel",
    "fas fa-clone|arrangecopyduplicatepaste",
    "fas fa-closed-captioning|ccdeafhearingsubtitlesubtitlingtextvideo",
    "fas fa-cloud|atmospherecloudfogovercastsaveuploadweather",
    "fas fa-cloud-arrow-down|downloadexportsave",
    "fas fa-cloud-arrow-up|importsaveupload",
    "fas fa-cloud-bolt|boltcloudcloudwithlightninglightningprecipitationrainstormweather",
    "fas fa-cloud-meatball|fldsmdfrfoodspaghettistorm",
    "fas fa-cloud-moon|crescenteveninglunarnightpartlycloudysky",
    "fas fa-cloud-moon-rain|crescenteveninglunarnightpartlycloudyprecipitationrainskystorm",
    "fas fa-cloud-rain|raincloudcloudwithrainprecipitationrainskystorm",
    "fas fa-cloud-showers-heavy|precipitationrainskystorm",
    "fas fa-cloud-showers-water|clouddelugefloodrainstormsurge",
    "fas fa-cloud-sun|clearclouddaydaytimefalloutdoorsovercastpartlycloudysunsunbehindcloud",
    "fas fa-cloud-sun-rain|clouddayovercastprecipitationrainstormsummersunsunbehindraincloudsunshower",
    "fab fa-cloudflare",
    "fab fa-cloudscale",
    "fab fa-cloudsmith",
    "fab fa-cloudversify",
    "fas fa-clover|4charmcloverfourfourleafcloverfourleafcloverleafleprechaunlucklucky",
    "fab fa-cmplid",
    "fas fa-code|bracketscodedevelopmenthtml",
    "fas fa-code-branch|branchgitgithubrebasesvnvcsversion",
    "fas fa-code-commit|commitgitgithubhashrebasesvnvcsversion",
    "fas fa-code-compare|comparegitgithubsvnversion",
    "fas fa-code-fork|forkgitgithubsvnversion",
    "fas fa-code-merge|gitgithubmergeprrebasesvnvcsversion",
    "fas fa-code-pull-request|gitgithubprsvnversion",
    "fab fa-codepen",
    "fab fa-codiepie",
    "fas fa-coins|currencydimefinancialgoldmoneypenny",
    "fas fa-colon-sign|colonsigncurrency",
    "fas fa-comment|rightspeechbubblebubblechatcommentingconversationfeedbackmessagenotenotificationsmsspeechtexting",
    "fas fa-comment-dollar|bubblechatcommentingconversationfeedbackmessagemoneynotenotificationpaysmsspeechspendtextingtransfer",
    "fas fa-comment-dots|balloonbubblechatcomiccommentingconversationdialogfeedbackmessagemorenotenotificationreplysmsspeechspeechballoontexting",
    "fas fa-comment-medical|advicebubblechatcommentingconversationdiagnosefeedbackmessagenotenotificationprescriptionsmsspeechtexting",
    "fas fa-comment-slash|bubblecancelchatcommentingconversationfeedbackmessagemutenotenotificationquietsmsspeechtexting",
    "fas fa-comment-sms|chatconversationmessagemobilenotificationphonesmstexting",
    "fas fa-comments|twospeechbubblesbubblechatcommentingconversationfeedbackmessagenotenotificationsmsspeechtexting",
    "fas fa-comments-dollar|bubblechatcommentingconversationfeedbackmessagemoneynotenotificationpaysmsspeechspendtextingtransfer",
    "fas fa-compact-disc|opticaldisciconalbumbluraybluraycdcomputerdiscdiskdvdmediamoviemusicopticalopticaldiskrecordvideovinyl",
    "fas fa-compass|compassdirectionsdirectorylocationmagneticmenunavigationorienteeringsafaritravel",
    "fas fa-compass-drafting|designmapmechanicaldrawingplotplotting",
    "fas fa-compress|collapsefullscreenminimizemoveresizeshrinksmaller",
    "fas fa-computer|computerdesktopdisplaymonitortower",
    "fas fa-computer-mouse|clickcomputercomputermousecursorinputperipheral",
    "fab fa-confluence|atlassian",
    "fab fa-connectdevelop",
    "fab fa-contao",
    "fas fa-cookie|bakedgoodchipschocolatecookiedesserteatsnacksweettreat",
    "fas fa-cookie-bite|bakedgoodbittenchipschocolateeatsnacksweettreat",
    "fas fa-copy|cloneduplicatefilefilesopaperpaste",
    "fas fa-copyright|brandccopyrightmarkregistertrademark",
    "fab fa-cotton-bureau|clothingtshirtstshirts",
    "fas fa-couch|chaircushionfurniturerelaxsofa",
    "fas fa-cow|agricultureanimalbeefbovinecocowfarmfaunalivestockmammalmilkmoo",
    "fab fa-cpanel",
    "fab fa-creative-commons",
    "fab fa-creative-commons-by",
    "fab fa-creative-commons-nc",
    "fab fa-creative-commons-nc-eu",
    "fab fa-creative-commons-nc-jp",
    "fab fa-creative-commons-nd",
    "fab fa-creative-commons-pd",
    "fab fa-creative-commons-pd-alt",
    "fab fa-creative-commons-remix",
    "fab fa-creative-commons-sa",
    "fab fa-creative-commons-sampling",
    "fab fa-creative-commons-sampling-plus",
    "fab fa-creative-commons-share",
    "fab fa-creative-commons-zero",
    "fas fa-credit-card|buycardcheckoutcreditcreditcardcreditcardaltdebitmoneypaymentpurchase",
    "fab fa-critical-role|dungeonsdragonsdddndfantasygamegamingtabletop",
    "fas fa-crop|designframemaskresizeshrink",
    "fas fa-crop-simple|designframemaskresizeshrink",
    "fas fa-cross|christianheavylatincrosscatholicismchristianitychurchcrossjesuslatincrossreligion",
    "fas fa-crosshairs|aimbullseyegpdpickerposition",
    "fas fa-crow|birdbullfrogfaunahalloweenholidaytoad",
    "fas fa-crown|awardclothingcrownfavoritekingqueenroyaltiara",
    "fas fa-crutch|caneinjurymobilitywheelchair",
    "fas fa-cruzeiro-sign|cruzeirosigncurrency",
    "fab fa-css3|code",
    "fab fa-css3-alt",
    "fas fa-cube|3dblockdicepackagesquaretesseract",
    "fas fa-cubes|3dblockdicepackagepyramidsquarestacktesseract",
    "fas fa-cubes-stacked|blockscubessugar",
    "fab fa-cuttlefish",
    "fas fa-d|latincapitalletterdlatinsmallletterdletter",
    "fab fa-d-and-d",
    "fab fa-d-and-d-beyond|dungeonsdragonsdddndfantasygamingtabletop",
    "fab fa-dailymotion",
    "fab fa-dashcube",
    "fas fa-database|computerdevelopmentdirectorymemorystorage",
    "fab fa-deezer",
    "fas fa-delete-left|erasetotheleftcommanddeleteerasekeyboardundo",
    "fab fa-delicious",
    "fas fa-democrat|americandemocraticpartydonkeyelectionleftleftwingliberalpoliticsusa",
    "fab fa-deploydog",
    "fab fa-deskpro",
    "fas fa-desktop|computercpudemodesktopdesktopcomputerdeviceimacmachinemonitorpcscreen",
    "fab fa-dev",
    "fab fa-deviantart",
    "fas fa-dharmachakra|buddhistbuddhismbuddhistdharmareligionwheelwheelofdharma",
    "fab fa-dhl|dalseyhillblomandlynngermanpackageshipping",
    "fas fa-diagram-next|cellschartganttrowsubtasksuccessortable",
    "fas fa-diagram-predecessor|cellschartganttpredecessorpreviousrowsubtasktable",
    "fas fa-diagram-project|chartgraphnetworkpert",
    "fas fa-diagram-successor|cellschartganttnextrowsubtasksuccessortable",
    "fas fa-diamond|cardcardsdiamondsuitgamegemgemstonepokersuit",
    "fas fa-diamond-turn-right|mapnavigationsignturn",
    "fab fa-diaspora",
    "fas fa-dice|chancedicediegamblinggamegamedieroll",
    "fas fa-dice-d20|dungeonsdragonschancedddndfantasygamblinggameroll",
    "fas fa-dice-d6|dungeonsdragonschancedddndfantasygamblinggameroll",
    "fas fa-dice-five|dieface5chancegamblinggameroll",
    "fas fa-dice-four|dieface4chancegamblinggameroll",
    "fas fa-dice-one|dieface1chancegamblinggameroll",
    "fas fa-dice-six|dieface6chancegamblinggameroll",
    "fas fa-dice-three|dieface3chancegamblinggameroll",
    "fas fa-dice-two|dieface2chancegamblinggameroll",
    "fab fa-digg",
    "fab fa-digital-ocean",
    "fab fa-discord",
    "fab fa-discourse",
    "fas fa-disease|bacteriacancercoronaviruscovid19fluillnessinfectionpandemicsicknessvirus",
    "fas fa-display|screencomputerdesktopimac",
    "fas fa-divide|divisionsignarithmeticcalculusdividedivisionmathsign",
    "fas fa-dna|biologistdnadoublehelixevolutiongenegeneticgeneticshelixlifemoleculeprotein",
    "fab fa-dochub",
    "fab fa-docker",
    "fas fa-dog|animalcaninedogfaunamammalpetpoochpuppywoof",
    "fas fa-dollar-sign|dollarsigncurrencydollarheavydollarsignmoney",
    "fas fa-dolly|carryshippingtransport",
    "fas fa-dong-sign|dongsigncurrency",
    "fas fa-door-closed|doodoorenterexitlocked",
    "fas fa-door-open|enterexitwelcome",
    "fas fa-dove|birddovefaunaflyflyingpeacewar",
    "fas fa-down-left-and-up-right-to-center|collapsefullscreenminimizemoveresizeshrinksmaller",
    "fas fa-down-long|downloadlongarrowdown",
    "fas fa-download|exportharddrivesavetransfer",
    "fab fa-draft2digital",
    "fas fa-dragon|dungeonsdragonsdddnddragonfairytalefantasyfirelizardserpent",
    "fas fa-draw-polygon|anchorslinesobjectrendershape",
    "fab fa-dribbble",
    "fab fa-dropbox",
    "fas fa-droplet|coldcolorcomicdropdropletraindropsweatwaterdrop",
    "fas fa-droplet-slash|colordropdropletraindropwaterdrop",
    "fas fa-drum|drumdrumsticksinstrumentmusicpercussionsnaresound",
    "fas fa-drum-steelpan|calypsoinstrumentmusicpercussionreggaesnaresoundsteeltropical",
    "fas fa-drumstick-bite|bonechickenlegmeatpoultryturkey",
    "fab fa-drupal",
    "fas fa-dumbbell|exercisegymstrengthweightweightlifting",
    "fas fa-dumpster|alleybincommercialtrashwaste",
    "fas fa-dumpster-fire|alleybincommercialdangerdangerouseuphemismflameheathottrashwaste",
    "fas fa-dungeon|dungeonsdragonsbuildingdddnddoorentrancefantasygate",
    "fab fa-dyalog",
    "fas fa-e|latincapitalletterelatinsmalllettereletter",
    "fas fa-ear-deaf|earhearingsignlanguage",
    "fas fa-ear-listen|amplifyaudiodeafearheadsethearingsound",
    "fab fa-earlybirds",
    "fas fa-earth-africa|africaallcountryeartheuropeglobalglobegpslanguagelocalizelocationmaponlineplaceplanettranslatetravelworld",
    "fas fa-earth-americas|allamericacountryearthglobalglobegpslanguagelocalizelocationmaponlineplaceplanettranslatetravelworld",
    "fas fa-earth-asia|allasiaaustraliacountryearthglobalglobegpslanguagelocalizelocationmaponlineplaceplanettranslatetravelworld",
    "fas fa-earth-europe|allcountryeartheuropeglobalglobegpslanguagelocalizelocationmaponlineplaceplanettranslatetravelworld",
    "fas fa-earth-oceania|allaustraliacountryearthglobalglobegpslanguagelocalizelocationmapmelanesiamicronesianewzealandonlineplaceplanetpolynesiatranslatetravelworld",
    "fab fa-ebay",
    "fab fa-edge|browserie",
    "fab fa-edge-legacy",
    "fas fa-egg|breakfastchickeneastereggfoodshellyolk",
    "fas fa-eject|abortcancelcddischargeejectejectbutton",
    "fab fa-elementor",
    "fas fa-elevator|accessibilityelevatorhoistliftuserspeople",
    "fas fa-ellipsis|dotsdragkebablistmenunavnavigationolpacmanreordersettingsul",
    "fas fa-ellipsis-vertical|dotsdragkebablistmenunavnavigationolreordersettingsul",
    "fab fa-ello",
    "fab fa-ember",
    "fab fa-empire",
    "fas fa-envelope|backofenvelopeemailemailenvelopelettermailmessagenotificationsupport",
    "fas fa-envelope-circle-check|checkemailenvelopemailnotaffectedokokayreadsent",
    "fas fa-envelope-open|emailemaillettermailmessagenotificationsupport",
    "fas fa-envelope-open-text|emailemaillettermailmessagenotificationsupport",
    "fas fa-envelopes-bulk|archiveenvelopeletterpostofficepostalpostcardsendstampusps",
    "fab fa-envira|leaf",
    "fas fa-equals|equalssignarithmeticevenmatchmath",
    "fas fa-eraser|artdeleteremoverubber",
    "fab fa-erlang",
    "fab fa-ethereum",
    "fas fa-ethernet|cablecat5cat6connectionhardwareinternetnetworkwired",
    "fab fa-etsy",
    "fas fa-euro-sign|eurosigncurrency",
    "fab fa-evernote",
    "fas fa-exclamation|exclamationmarkalertdangererrorexclamationimportantmarknoticenotificationnotifyoutlinedproblempunctuationredexclamationmarkwarningwhiteexclamationmark",
    "fas fa-expand|biggercropenlargefocusfullscreenresizeviewfinder",
    "fab fa-expeditedssl",
    "fas fa-explosion|blastblowupboomcrashdetonationexplosion",
    "fas fa-eye|bodyeyelookopticseeseenshowsightviewsvisible",
    "fas fa-eye-dropper|beakerclonecolorcopyeyedropperpipette",
    "fas fa-eye-low-vision|blindeyesight",
    "fas fa-eye-slash|blindhideshowtoggleunseenviewsvisiblevisiblity",
    "fas fa-f|latincapitalletterflatinsmallletterfletter",
    "fas fa-face-angry|angryangryfacedisapproveemoticonfacemadupset",
    "fas fa-face-dizzy|dazeddeaddisapproveemoticonface",
    "fas fa-face-flushed|dazedembarrassedemoticonfaceflushedflushedface",
    "fas fa-face-frown|disapproveemoticonfacefrownfrowningfaceratingsad",
    "fas fa-face-frown-open|disapproveemoticonfacefrownfrowningfacewithopenmouthmouthopenratingsad",
    "fas fa-face-grimace|cringeemoticonfacegrimacegrimacingfaceteeth",
    "fas fa-face-grin|emoticonfacegringrinningfacelaughsmile",
    "fas fa-face-grin-beam|emoticoneyefacegrinningfacewithsmilingeyeslaughmouthopensmile",
    "fas fa-face-grin-beam-sweat|coldembarassemoticonfacegrinningfacewithsweatopensmilesweat",
    "fas fa-face-grin-hearts|emoticoneyefacelovesmilesmilingfacewithhearteyes",
    "fas fa-face-grin-squint|emoticonfacegrinningsquintingfacelaughmouthsatisfiedsmile",
    "fas fa-face-grin-squint-tears|emoticonfacefloorhappylaughrollingrollingonthefloorlaughingsmile",
    "fas fa-face-grin-stars|emoticoneyesfacegrinningstarstarstruckstarryeyed",
    "fas fa-face-grin-tears|lolemoticonfacefacewithtearsofjoyjoylaughtear",
    "fas fa-face-grin-tongue|lolemoticonfacefacewithtonguetongue",
    "fas fa-face-grin-tongue-squint|lolemoticoneyefacehorriblesquintingfacewithtonguetastetongue",
    "fas fa-face-grin-tongue-wink|lolemoticoneyefacejoketonguewinkwinkingfacewithtongue",
    "fas fa-face-grin-wide|emoticonfacegrinningfacewithbigeyeslaughmouthopensmile",
    "fas fa-face-grin-wink|emoticonfaceflirtlaughsmile",
    "fas fa-face-kiss|besoemoticonfacekisskissingfacelovesmooch",
    "fas fa-face-kiss-beam|besoemoticoneyefacekisskissingfacewithsmilingeyeslovesmilesmooch",
    "fas fa-face-kiss-wink-heart|besoemoticonfacefaceblowingakisskisslovesmooch",
    "fas fa-face-laugh|lolemoticonfacelaughsmile",
    "fas fa-face-laugh-beam|lolbeamingfacewithsmilingeyesemoticoneyefacegrinhappysmile",
    "fas fa-face-laugh-squint|lolemoticonfacehappysmile",
    "fas fa-face-laugh-wink|lolemoticonfacehappysmile",
    "fas fa-face-meh|deadpanemoticonfacemehneutralneutralfacerating",
    "fas fa-face-meh-blank|emoticonfacefacewithoutmouthmouthneutralquietratingsilent",
    "fas fa-face-rolling-eyes|emoticoneyerolleyesfacefacewithrollingeyesneutralratingrolling",
    "fas fa-face-sad-cry|cryemoticonfaceloudlycryingfacesadsobteartears",
    "fas fa-face-sad-tear|crycryingfaceemoticonfacesadteartears",
    "fas fa-face-smile|approveemoticonfacehappyratingsatisfiedslightlysmilingfacesmile",
    "fas fa-face-smile-beam|blushemoticoneyefacehappypositivesmilesmilingfacewithsmilingeyes",
    "fas fa-face-smile-wink|emoticonfacehappyhintjokewinkwinkingface",
    "fas fa-face-surprise|emoticonfacefacewithopenmouthmouthopenshockedsympathy",
    "fas fa-face-tired|angryemoticonfacegrumpytiredtiredfaceupset",
    "fab fa-facebook|facebookofficialsocialnetwork",
    "fab fa-facebook-f|facebook",
    "fab fa-facebook-messenger",
    "fas fa-fan|acairconditioningbladeblowercoolhot",
    "fab fa-fantasy-flight-games|dungeonsdragonsdddndfantasygamegamingtabletop",
    "fas fa-faucet|covid19drinkingdriphousehygienekitchenpotablepotablewatersanitationsinkwater",
    "fas fa-faucet-drip|drinkingdriphousehygienekitchenpotablepotablewatersanitationsinkwater",
    "fas fa-fax|faxiconbusinesscommunicatecopyfacsimilefaxfaxmachinesend",
    "fas fa-feather|birdfeatherflightlightpluckedplumagequillwrite",
    "fas fa-feather-pointed|birdlightpluckedquillwrite",
    "fab fa-fedex|federalexpresspackageshipping",
    "fab fa-fedora|linuxoperatingsystemos",
    "fas fa-ferry|bargeboatcarryferryboatship",
    "fab fa-figma|appdesigninterface",
    "fas fa-file|emptydocumentdocumentnewpagepagefacinguppdfresume",
    "fas fa-file-arrow-down|documentexportsave",
    "fas fa-file-arrow-up|documentimportpagesave",
    "fas fa-file-audio|documentmp3musicpageplaysound",
    "fas fa-file-circle-check|documentfilenotaffectedokokaypaper",
    "fas fa-file-circle-exclamation|documentfilepaper",
    "fas fa-file-circle-minus|documentfilepaper",
    "fas fa-file-circle-plus|adddocumentfilenewpagepaperpdf",
    "fas fa-file-circle-question|documentfilepaper",
    "fas fa-file-circle-xmark|documentfilepaper",
    "fas fa-file-code|cssdevelopmentdocumenthtml",
    "fas fa-file-contract|agreementbindingdocumentlegalsignature",
    "fas fa-file-csv|documentexcelnumbersspreadsheetstable",
    "fas fa-file-excel|csvdocumentnumbersspreadsheetstable",
    "fas fa-file-export|downloadsave",
    "fas fa-file-image|documentwithpicturedocumentimagejpgphotopng",
    "fas fa-file-import|copydocumentsendupload",
    "fas fa-file-invoice|accountbillchargedocumentpaymentreceipt",
    "fas fa-file-invoice-dollar|accountbillchargedocumentdollarsignmoneypaymentreceiptusd",
    "fas fa-file-lines|documentdocumentwithtextdocumentfiletextinvoicenewpagepdf",
    "fas fa-file-medical|documenthealthhistoryprescriptionrecord",
    "fas fa-file-pdf|acrobatdocumentpreviewsave",
    "fas fa-file-pen|editmemopenpencilupdatewrite",
    "fas fa-file-powerpoint|displaydocumentkeynotepresentation",
    "fas fa-file-prescription|documentdrugsmedicalmedicinerx",
    "fas fa-file-shield|antivirusdatadocumentprotectsafesafetysecure",
    "fas fa-file-signature|johnhancockcontractdocumentname",
    "fas fa-file-video|documentm4vmoviemp4play",
    "fas fa-file-waveform|documenthealthhistoryprescriptionrecord",
    "fas fa-file-word|documenteditpagetextwriting",
    "fas fa-file-zipper|zipbundlecompresscompressiondownloadzip",
    "fas fa-fill|bucketcolorpaintpaintbucket",
    "fas fa-fill-drip|bucketcolordroppaintpaintbucketspill",
    "fas fa-film|cinemafilmfilmframesframesmoviestripvideo",
    "fas fa-filter|funneloptionsseparatesort",
    "fas fa-filter-circle-dollar|filtermoneyoptionsseparatesort",
    "fas fa-filter-circle-xmark|cancelfunneloptionsremoveseparatesort",
    "fas fa-fingerprint|humanididentificationlocksmudgetouchuniqueunlock",
    "fas fa-fire|burncalientefireflameheathotpopulartool",
    "fas fa-fire-burner|cookfireflamekitchenstove",
    "fas fa-fire-extinguisher|burncalienteextinguishfirefireextinguisherfirefighterflameheathotquenchrescue",
    "fas fa-fire-flame-curved|burncalienteflameheathotpopular",
    "fas fa-fire-flame-simple|calienteenergyfireflamegasheathot",
    "fab fa-firefox|browser",
    "fab fa-firefox-browser|browser",
    "fab fa-first-order",
    "fab fa-first-order-alt",
    "fab fa-firstdraft",
    "fas fa-fish|piscesfaunafishgoldseafoodswimmingzodiac",
    "fas fa-fish-fins|fishfisherypiscesseafood",
    "fas fa-flag|blackflagcountrynoticenotificationnotifypolereportsymbolwaving",
    "fas fa-flag-checkered|checkeredchequeredchequeredflagfinishnoticenotificationnotifypoleracingreportstartsymbolwin",
    "fas fa-flag-usa|betsyrosscountryflaflagunitedstatesoldglorystarsstripessymbol",
    "fas fa-flask|beakerexperimentallabsscience",
    "fas fa-flask-vial|ampulechemistrylablaboratorytesttesttube",
    "fab fa-flickr",
    "fab fa-flipboard",
    "fas fa-floppy-disk|blackhardshellfloppydiskcomputerdiskdownloadfloppyfloppydiskfloppyo",
    "fas fa-florin-sign|currency",
    "fab fa-fly",
    "fas fa-folder|blackfolderarchivedirectorydocumentfilefilefolderfolder",
    "fas fa-folder-closed|file",
    "fas fa-folder-minus|archivedeletedirectorydocumentfilenegativeremove",
    "fas fa-folder-open|openfolderarchivedirectorydocumentemptyfilefoldernewopenopenfilefolder",
    "fas fa-folder-plus|addarchivecreatedirectorydocumentfilenewpositive",
    "fas fa-folder-tree|archivedirectorydocumentfilesearchstructure",
    "fas fa-font|alphabetglyphtexttypetypeface",
    "fas fa-font-awesome|awesomeflagfonticonstypeface",
    "fab fa-fonticons",
    "fab fa-fonticons-fi",
    "fas fa-football|americanamericanfootballballfallfootballnflpigskinseasonal",
    "fab fa-fort-awesome|castle",
    "fab fa-fort-awesome-alt|castle",
    "fab fa-forumbee",
    "fas fa-forward|arrowdoublefastfastforwardbuttonforwardnextskip",
    "fas fa-forward-fast|arrowendlastnextnextscenenexttracknexttrackbuttontriangle",
    "fas fa-forward-step|endlastnext",
    "fab fa-foursquare",
    "fas fa-franc-sign|frenchfrancsigncurrency",
    "fab fa-free-code-camp",
    "fab fa-freebsd",
    "fas fa-frog|amphibianbullfrogfaunahopkermitkissprinceribbittoadwart",
    "fab fa-fulcrum",
    "fas fa-futbol|ballfootballmlssoccersoccerball",
    "fas fa-g|latincapitalletterglatinsmalllettergletter",
    "fab fa-galactic-republic|politicsstarwars",
    "fab fa-galactic-senate|starwars",
    "fas fa-gamepad|arcadecontrollerdpadjoystickvideovideogame",
    "fas fa-gas-pump|cardieselfuelfuelpumpfuelpumpgasgasolinepetrolpumpstation",
    "fas fa-gauge|dashboardfastodometerspeedspeedometer",
    "fas fa-gauge-high|dashboardfastodometerspeedspeedometer",
    "fas fa-gauge-simple|dashboardfastodometerspeedspeedometer",
    "fas fa-gauge-simple-high|dashboardfastodometerspeedspeedometer",
    "fas fa-gavel|hammerjudgelawlawyeropinion",
    "fas fa-gear|cogcogwheelgearmechanicalsettingssprockettoolwheel",
    "fas fa-gears|gearsmechanicalsettingssprocketwheel",
    "fas fa-gem|diamondgemgemstonejeweljewelrysapphirestonetreasure",
    "fas fa-genderless|androgynousasexualgendersexless",
    "fab fa-get-pocket",
    "fab fa-gg",
    "fab fa-gg-circle",
    "fas fa-ghost|apparitionblinkyclydecreaturefacefairytalefantasyfloatingghosthalloweenholidayinkymonsterpacmanpinkyspirit",
    "fas fa-gift|boxcelebrationchristmasgenerositygiftgivingholidaypartypresentwrappedwrappedgiftxmas",
    "fas fa-gifts|christmasgenerositygivingholidaypartypresentwrappedxmas",
    "fab fa-git",
    "fab fa-git-alt",
    "fab fa-github|octocat",
    "fab fa-github-alt|octocat",
    "fab fa-gitkraken",
    "fab fa-gitlab|axosoft",
    "fab fa-gitter",
    "fas fa-glass-water|potablewater",
    "fas fa-glass-water-droplet|potablewater",
    "fas fa-glasses|hipsternerdreadingsightspectaclesvision",
    "fab fa-glide",
    "fab fa-glide-g",
    "fas fa-globe|allcoordinatescountryearthglobalglobeglobewithmeridiansgpsinternetlanguagelocalizelocationmapmeridiansnetworkonlineplaceplanettranslatetravelworld",
    "fab fa-gofore",
    "fab fa-golang",
    "fas fa-golf-ball-tee|caddyeagleputttee",
    "fab fa-goodreads",
    "fab fa-goodreads-g",
    "fab fa-google",
    "fab fa-google-drive",
    "fab fa-google-pay",
    "fab fa-google-play",
    "fab fa-google-plus|googlepluscirclegoogleplusofficial",
    "fab fa-google-plus-g|googleplussocialnetwork",
    "fab fa-google-wallet",
    "fas fa-gopuram|buildingentrancehinduismtempletower",
    "fas fa-graduation-cap|capcelebrationceremonyclothingcollegegraduategraduationgraduationcaphatlearningschoolstudent",
    "fab fa-gratipay|favoriteheartlikelove",
    "fab fa-grav",
    "fas fa-greater-than|greaterthansignarithmeticcomparemath",
    "fas fa-greater-than-equal|arithmeticcomparemath",
    "fas fa-grip|affordancedragdropgrabhandle",
    "fas fa-grip-lines|affordancedragdropgrabhandle",
    "fas fa-grip-lines-vertical|affordancedragdropgrabhandle",
    "fas fa-grip-vertical|affordancedragdropgrabhandle",
    "fab fa-gripfire",
    "fas fa-group-arrows-rotate|communityengagementspinsync",
    "fab fa-grunt",
    "fas fa-guarani-sign|guaranisigncurrency",
    "fab fa-guilded",
    "fas fa-guitar|acousticinstrumentmusicrockrockandrollsongstrings",
    "fab fa-gulp",
    "fas fa-gun|firearmpistolweapon",
    "fas fa-h|latincapitalletterhlatinsmallletterhletter",
    "fab fa-hacker-news",
    "fab fa-hackerrank",
    "fas fa-hammer|adminfixhammerrecoveryrepairsettingstool",
    "fas fa-hamsa|amuletchristianityislamjewishjudaismmuslimprotection",
    "fas fa-hand|raisedhandbackhandgamehaltpalmraisedraisedbackofhandroshambostop",
    "fas fa-hand-back-fist|fistgameroshambo",
    "fas fa-hand-dots|allergyfreckleshandhivespalmpoxskinspots",
    "fas fa-hand-fist|dungeonsdragonsclencheddddndfantasyfisthandkimonkpunchraisedfistresiststrengthunarmedcombat",
    "fas fa-hand-holding|carrylift",
    "fas fa-hand-holding-dollar|carrydollarsigndonationgivingliftmoneyprice",
    "fas fa-hand-holding-droplet|carrycovid19droughtgrowliftsanitation",
    "fas fa-hand-holding-hand|caregivehelpholdprotect",
    "fas fa-hand-holding-heart|carrycharitygiftliftpackage",
    "fas fa-hand-holding-medical|carecovid19donatehelp",
    "fas fa-hand-lizard|gameroshambo",
    "fas fa-hand-middle-finger|fingerflipthebirdgesturehandhatemiddlefingerrude",
    "fas fa-hand-peace|handresttrucevvictoryvictoryhand",
    "fas fa-hand-point-down|fingerhandodownpoint",
    "fas fa-hand-point-left|backfingerhandoleftleftpointprevious",
    "fas fa-hand-point-right|fingerforwardhandorightnextpointright",
    "fas fa-hand-point-up|fingerhandhandoupindexindexpointinguppointup",
    "fas fa-hand-pointer|arrowcursorselect",
    "fas fa-hand-scissors|cutgameroshambo",
    "fas fa-hand-sparkles|cleancovid19hygienemagicpalmsoapwash",
    "fas fa-hand-spock|fingerhandlivelongpalmprospersalutespockstartrekvulcanvulcansalute",
    "fas fa-handcuffs|arrestcriminalhandcuffsjaillockpolicewrist",
    "fas fa-hands|translateasldeafhands",
    "fas fa-hands-asl-interpreting|asldeaffingerhandinterpretspeak",
    "fas fa-hands-bound|abductionboundhandcuffwrist",
    "fas fa-hands-bubbles|covid19hygienesoapwash",
    "fas fa-hands-clapping|applauseclapclappinghandshand",
    "fas fa-hands-holding|carryholdlift",
    "fas fa-hands-holding-child|caregivehelpholdprotect",
    "fas fa-hands-holding-circle|circlegiftprotection",
    "fas fa-hands-praying|kneelpreachreligionworship",
    "fas fa-handshake|agreementgreetingmeetingpartnership",
    "fas fa-handshake-angle|aidassistancehandshakepartnershipvolunteering",
    "fas fa-handshake-simple|agreementgreetinghandhandshakemeetingpartnershipshake",
    "fas fa-handshake-simple-slash|brokencovid19socialdistance",
    "fas fa-handshake-slash|brokencovid19socialdistance",
    "fas fa-hanukiah|candelabrumcandlecandlestickhanukkahjewishjudaismlightmenorahreligion",
    "fas fa-hard-drive|harddiskcpuharddriveharddrivemachinesavestorage",
    "fab fa-hashnode",
    "fas fa-hashtag|numbersigntwitterinstagrampoundsocialmediatag",
    "fas fa-hat-cowboy|buckaroohorsejackeroojohnboldwestpardnerranchrancherrodeowesternwrangler",
    "fas fa-hat-cowboy-side|buckaroohorsejackeroojohnboldwestpardnerranchrancherrodeowesternwrangler",
    "fas fa-hat-wizard|dungeonsdragonsaccessorybuckleclothingdddndfantasyhalloweenheadholidaymagemagicpointywitch",
    "fas fa-head-side-cough|coughcovid19germslungsrespiratorysick",
    "fas fa-head-side-cough-slash|coughcovid19germslungsrespiratorysick",
    "fas fa-head-side-mask|breathcoronaviruscovid19filterfluinfectionpandemicrespiratorvirus",
    "fas fa-head-side-virus|coldcoronaviruscovid19fluinfectionpandemicsick",
    "fas fa-heading|formatheadertexttitle",
    "fas fa-headphones|audioearbudheadphonelistenmusicsoundspeaker",
    "fas fa-headphones-simple|audiolistenmusicsoundspeaker",
    "fas fa-headset|audiogamergaminglistenlivechatmicrophoneshotcallersoundsupporttelemarketer",
    "fas fa-heart|blackblackheartblueblueheartbrownbrownheartcardevilfavoritegamegreengreenheartheartheartsuitlikeloveorangeorangeheartpurplepurpleheartredheartrelationshipvalentinewhitewhiteheartwickedyellowyellowheart",
    "fas fa-heart-circle-bolt|cardiogramekgelectricheartlovepacemaker",
    "fas fa-heart-circle-check|favoriteheartlovenotaffectedokokay",
    "fas fa-heart-circle-exclamation|favoriteheartlove",
    "fas fa-heart-circle-minus|favoriteheartlove",
    "fas fa-heart-circle-plus|favoriteheartlove",
    "fas fa-heart-circle-xmark|favoriteheartlove",
    "fas fa-heart-crack|breakbreakupbrokenbrokenheartcrusheddislikedumpedgrieflovelovesickrelationshipsad",
    "fas fa-heart-pulse|ekgelectrocardiogramhealthlifelinevitalsigns",
    "fas fa-helicopter|airwolfapachechopperflightflyhelicoptertravelvehicle",
    "fas fa-helicopter-symbol|chopperhelicopterlandingpadwhirlybird",
    "fas fa-helmet-safety|constructionhardhathelmetsafety",
    "fas fa-helmet-un|helmetunitednations",
    "fas fa-highlighter|editmarkersharpieupdatewrite",
    "fas fa-hill-avalanche|mudslidesnowwinter",
    "fas fa-hill-rockslide|mudslide",
    "fas fa-hippo|animalfaunahippohippopotamushungrymammal",
    "fab fa-hips",
    "fab fa-hire-a-helper",
    "fab fa-hive",
    "fas fa-hockey-puck|icenhlsport",
    "fas fa-holly-berry|catwomanchristmasdecorationflorahalleholidayororomunroeplantstormxmas",
    "fab fa-hooli",
    "fab fa-hornbill",
    "fas fa-horse|equestrianequusfaunahorsemammmalmareneighponyracehorseracing",
    "fas fa-horse-head|equusfaunamammmalmareneighpony",
    "fas fa-hospital|buildingcovid19doctoremergencyroomhospitalmedicalcentermedicine",
    "fas fa-hospital-user|covid19doctornetworkpatientprimarycare",
    "fas fa-hot-tub-person|jacuzzispa",
    "fas fa-hotdog|bunchilifrankfurtfrankfurterhotdoghotdogkosherpolishsandwichsausageviennaweiner",
    "fas fa-hotel|buildinghotelinnlodgingmotelresorttravel",
    "fab fa-hotjar",
    "fas fa-hourglass|hourhourglasshourglassnotdoneminutesandstopwatchtimetimer",
    "fas fa-hourglass-end|hourhourglassdoneminutesandstopwatchtimetimer",
    "fas fa-hourglass-half|hourminutesandstopwatchtime",
    "fas fa-hourglass-start|hourminutesandstopwatchtime",
    "fas fa-house|abodebuildinghomehousemainresidence",
    "fas fa-house-chimney|abodebuildingchimneyhousemainresidencesmokestack",
    "fas fa-house-chimney-crack|buildingdevastationdisasterearthquakehomeinsurance",
    "fas fa-house-chimney-medical|covid19doctorgeneralpractitionerhospitalinfirmarymedicineofficeoutpatient",
    "fas fa-house-chimney-user|covid19homeisolationquarantine",
    "fas fa-house-chimney-window|abodebuildingfamilyhomeresidence",
    "fas fa-house-circle-check|abodehomehousenotaffectedokokay",
    "fas fa-house-circle-exclamation|abodeaffectedhomehouse",
    "fas fa-house-circle-xmark|abodedestroyhomehouse",
    "fas fa-house-crack|buildingdevastationdisasterearthquakehomeinsurance",
    "fas fa-house-fire|burnemergencyhome",
    "fas fa-house-flag|camphome",
    "fas fa-house-flood-water|damagefloodwater",
    "fas fa-house-flood-water-circle-arrow-right|damagefloodwater",
    "fas fa-house-laptop|computercovid19deviceofficeremoteworkfromhome",
    "fas fa-house-lock|closedhomehouselockdownquarantine",
    "fas fa-house-medical|covid19doctorfacilitygeneralpractitionerhealthhospitalinfirmarymedicineofficeoutpatient",
    "fas fa-house-medical-circle-check|clinichospitalnotaffectedokokay",
    "fas fa-house-medical-circle-exclamation|affectedclinichospital",
    "fas fa-house-medical-circle-xmark|clinicdestroyhospital",
    "fas fa-house-medical-flag|clinichospitalmash",
    "fas fa-house-signal|abodebuildingconnectfamilyhomeresidencesmarthomewifi",
    "fas fa-house-tsunami|damagefloodtidalwavewave",
    "fas fa-house-user|house",
    "fab fa-houzz",
    "fas fa-hryvnia-sign|hryvniasigncurrency",
    "fab fa-html5",
    "fab fa-hubspot",
    "fas fa-hurricane|corioliseffecteyestormtropicalcyclonetyphoon",
    "fas fa-i|latincapitalletterilatinsmallletteriletter",
    "fas fa-i-cursor|editingibeamtypewriting",
    "fas fa-ice-cream|chocolateconecreamdessertfrozeniceicecreamscoopsorbetsweetvanillayogurt",
    "fas fa-icicles|coldfrozenhangingiceseasonalsharp",
    "fas fa-icons|boltemojiheartimagemusicphotosymbols",
    "fas fa-id-badge|addresscontactidentificationlicenseprofile",
    "fas fa-id-card|contactdemographicsdocumentidentificationissuedprofileregistration",
    "fas fa-id-card-clip|contactdemographicsdocumentidentificationissuedprofile",
    "fab fa-ideal",
    "fas fa-igloo|domedwellingeskimohomehouseicesnow",
    "fas fa-image|albumlandscapephotopicture",
    "fas fa-image-portrait|idimagephotopictureselfie",
    "fas fa-images|albumlandscapephotopicture",
    "fab fa-imdb",
    "fas fa-inbox|archivedeskemailmailmessage",
    "fas fa-indent|alignjustifyparagraphtab",
    "fas fa-indian-rupee-sign|indianrupeesigncurrency",
    "fas fa-industry|buildingfactoryindustrialmanufacturingmillwarehouse",
    "fas fa-infinity|infinityeternityforeverinfinitymathunboundeduniversal",
    "fas fa-info|detailshelpinformationmoresupport",
    "fab fa-instagram",
    "fab fa-instalod",
    "fab fa-intercom|appcustomermessenger",
    "fab fa-internet-explorer|browserie",
    "fab fa-invision|appdesigninterface",
    "fab fa-ioxhost",
    "fas fa-italic|editemphasisfontformattexttype",
    "fab fa-itch-io",
    "fab fa-itunes",
    "fab fa-itunes-note",
    "fas fa-j|latincapitalletterjlatinsmallletterjletter",
    "fas fa-jar|jamjellystorage",
    "fas fa-jar-wheat|flourstorage",
    "fab fa-java",
    "fas fa-jedi|crestforcesithskywalkerstarwarsyoda",
    "fab fa-jedi-order|starwars",
    "fab fa-jenkins",
    "fas fa-jet-fighter|airforceairplaneairportfastflygoosemarinesmaverickmilitaryplanequicktopguntransportationtravel",
    "fas fa-jet-fighter-up|airforceairplaneairportfastflygoosemarinesmaverickmilitaryplanequicktopguntransportationtravel",
    "fab fa-jira|atlassian",
    "fab fa-joget",
    "fas fa-joint|bluntcannabisdoobiedrugsmarijuanaroachsmokesmokingspliff",
    "fab fa-joomla",
    "fab fa-js",
    "fab fa-jsfiddle",
    "fas fa-jug-detergent|detergentlaundrysoapwash",
    "fas fa-k|latincapitalletterklatinsmallletterkletter",
    "fas fa-kaaba|muslimbuildingcubeislamkaabamuslimreligion",
    "fab fa-kaggle",
    "fas fa-key|keylockpasswordprivatesecretunlock",
    "fab fa-keybase",
    "fas fa-keyboard|accessorycomputereditinputkeyboardtexttypewrite",
    "fab fa-keycdn",
    "fas fa-khanda|adishaktichakkarsikhsikhismsword",
    "fab fa-kickstarter",
    "fab fa-kickstarter-k",
    "fas fa-kip-sign|kipsigncurrency",
    "fas fa-kit-medical|emergencyemthealthmedicalrescue",
    "fas fa-kitchen-set|chefcookcupkitchenpanpotskillet",
    "fas fa-kiwi-bird|birdfaunanewzealand",
    "fab fa-korvue",
    "fas fa-l|latincapitalletterllatinsmallletterlletter",
    "fas fa-land-mine-on|bombdangerexplosionwar",
    "fas fa-landmark|buildingclassicalhistoricmemorablemonumentmuseumpolitics",
    "fas fa-landmark-dome|buildinghistoricmemorablemonumentpolitics",
    "fas fa-landmark-flag|capitolflaglandmarkmemorial",
    "fas fa-language|dialectidiomlocalizespeechtranslatevernacular",
    "fas fa-laptop|computercpudelldemodevicelaptopmacmacbookmachinepcpersonal",
    "fas fa-laptop-code|computercpudelldemodevelopdevicemacmacbookmachinepc",
    "fas fa-laptop-file|computereducationlaptoplearningremotework",
    "fas fa-laptop-medical|computerdeviceehrelectronichealthrecordshistory",
    "fab fa-laravel",
    "fas fa-lari-sign|larisigncurrency",
    "fab fa-lastfm",
    "fas fa-layer-group|arrangedeveloplayersmapstack",
    "fas fa-leaf|ecofloranatureplantvegan",
    "fab fa-leanpub",
    "fas fa-left-long|backlongarrowleftprevious",
    "fas fa-left-right|arrowarrowshexpandhorizontallandscapeleftrightarrowresizewide",
    "fas fa-lemon|citrusfruitlemonlemonadelimetart",
    "fab fa-less",
    "fas fa-less-than|lessthansignarithmeticcomparemath",
    "fas fa-less-than-equal|arithmeticcomparemath",
    "fas fa-life-ring|coastguardhelpoverboardsavesupport",
    "fas fa-lightbulb|bulbcomicelectricenergyideainspirationlightlightbulb",
    "fab fa-line",
    "fas fa-lines-leaning|canteddominofallingresilienceresilienttipped",
    "fas fa-link|attachattachmentchainconnectlinlink",
    "fas fa-link-slash|attachmentchainchainbrokenremove",
    "fab fa-linkedin|linkedinsquare",
    "fab fa-linkedin-in|linkedin",
    "fab fa-linode",
    "fab fa-linux|tux",
    "fas fa-lira-sign|lirasigncurrency",
    "fas fa-list|checklistcompleteddonefinishedoltodoul",
    "fas fa-list-check|checklistdownloadingdownloadsloadingprogressprojectmanagementsettingstodo",
    "fas fa-list-ol|checklistcompleteddonefinishednumbersoltodoul",
    "fas fa-list-ul|checklistcompleteddonefinishedoltodoul",
    "fas fa-litecoin-sign|currency",
    "fas fa-location-arrow|addresscompasscoordinatedirectiongpsmapnavigationplace",
    "fas fa-location-crosshairs|addresscoordinatedirectiongpslocationmapnavigationplacewhere",
    "fas fa-location-dot|addresscoordinatesdestinationgpslocalizelocationmapnavigationpaperpinplacepointofinterestpositionroutetravel",
    "fas fa-location-pin|addresscoordinatesdestinationgpslocalizelocationmapnavigationpaperpinplacepointofinterestpositionroutetravel",
    "fas fa-location-pin-lock|closedlockdownmapquarantine",
    "fas fa-lock|adminclosedlocklockedopenpasswordprivateprotectsecurity",
    "fas fa-lock-open|adminlockopenpasswordprivateprotectsecurityunlock",
    "fas fa-locust|hordeinfestationlocustplagueswarm",
    "fas fa-lungs|airbreathcovid19exhalationinhalationlungsorganrespirationrespiratory",
    "fas fa-lungs-virus|breathcoronaviruscovid19fluinfectionpandemicrespiratorysick",
    "fab fa-lyft",
    "fas fa-m|latincapitallettermlatinsmalllettermletter",
    "fab fa-magento",
    "fas fa-magnet|attractattractionhorseshoelodestonemagnetmagnetictool",
    "fas fa-magnifying-glass|biggerenlargefindglassmagnifymagnifyingmagnifyingglasstiltedleftpreviewsearchtoolzoom",
    "fas fa-magnifying-glass-arrow-right|findnextsearch",
    "fas fa-magnifying-glass-chart|analysischart",
    "fas fa-magnifying-glass-dollar|biggerenlargefindmagnifymoneypreviewzoom",
    "fas fa-magnifying-glass-location|biggerenlargefindmagnifypreviewzoom",
    "fas fa-magnifying-glass-minus|minifynegativesmallerzoomzoomout",
    "fas fa-magnifying-glass-plus|biggerenlargemagnifypositivezoomzoomin",
    "fab fa-mailchimp",
    "fas fa-manat-sign|manatsigncurrency",
    "fab fa-mandalorian",
    "fas fa-map|addresscoordinatesdestinationgpslocalizelocationmapnavigationpaperpinplacepointofinterestpositionroutetravelworldworldmap",
    "fas fa-map-location|addresscoordinatesdestinationgpslocalizelocationmapnavigationpaperpinplacepointofinterestpositionroutetravel",
    "fas fa-map-location-dot|addresscoordinatesdestinationgpslocalizelocationmapnavigationpaperpinplacepointofinterestpositionroutetravel",
    "fas fa-map-pin|addressagreecoordinatesdestinationgpslocalizelocationmapmarkernavigationpinplacepositionpushpinroundpushpintravel",
    "fab fa-markdown",
    "fas fa-marker|designeditsharpieupdatewrite",
    "fas fa-mars|gendermalemalesignman",
    "fas fa-mars-and-venus|maleandfemalesignfemalegenderintersexmaletransgender",
    "fas fa-mars-and-venus-burst|genderviolence",
    "fas fa-mars-double|doubledmalesigngaygendermalemen",
    "fas fa-mars-stroke|malewithstrokesigngendertransgender",
    "fas fa-mars-stroke-right|horizontalmalewithstrokesigngender",
    "fas fa-mars-stroke-up|verticalmalewithstrokesigngender",
    "fas fa-martini-glass|alcoholbarbeveragecocktailcocktailglassdrinkglassliquor",
    "fas fa-martini-glass-citrus|alcoholbeveragedrinkginglassmargaritamartinivodka",
    "fas fa-martini-glass-empty|alcoholbarbeveragedrinkliquor",
    "fas fa-mask|carnivalecostumedisguisehalloweensecretsuperhero",
    "fas fa-mask-face|breathcoronaviruscovid19filterfluinfectionpandemicrespiratorvirus",
    "fas fa-mask-ventilator|breathgasmaskoxygenrespiratorventilator",
    "fas fa-masks-theater|artcomedymaskperformperformingperformingartstheatertheatretragedy",
    "fab fa-mastodon",
    "fas fa-mattress-pillow|airmattressmattresspillowrestsleep",
    "fab fa-maxcdn",
    "fas fa-maximize|biggerenlargefullscreenmoveresize",
    "fab fa-mdb",
    "fas fa-medal|awardmedalribbonsportsmedalstartrophy",
    "fab fa-medapps",
    "fab fa-medium",
    "fab fa-medrt",
    "fab fa-meetup",
    "fab fa-megaport",
    "fas fa-memory|dimmramhardwarestoragetechnology",
    "fab fa-mendeley",
    "fas fa-menorah|candlehanukkahjewishjudaismlight",
    "fas fa-mercury|mercurygenderhybridtransgender",
    "fas fa-message|bubblechatcommentingconversationfeedbackmessagenotenotificationsmsspeechtexting",
    "fab fa-meta",
    "fas fa-meteor|armageddonasteroidcometshootingstarspace",
    "fab fa-microblog",
    "fas fa-microchip|cpuhardwareprocessortechnology",
    "fas fa-microphone|addressaudioinformationpodcastpublicrecordsingsoundvoice",
    "fas fa-microphone-lines|audiomicmicrophonemusicpodcastrecordsingsoundstudiostudiomicrophonevoice",
    "fas fa-microphone-lines-slash|audiodisablemutepodcastrecordsingsoundvoice",
    "fas fa-microphone-slash|audiodisablemutepodcastrecordsingsoundvoice",
    "fas fa-microscope|covid19electronlensmicroscopeopticsscienceshrinktestingtool",
    "fab fa-microsoft",
    "fas fa-mill-sign|millsigncurrency",
    "fas fa-minimize|collapsefullscreenminimizemoveresizeshrinksmaller",
    "fas fa-minus|endashminussigncollapsedeletehidemathminifyminusnegativeremovesigntrash",
    "fas fa-mitten|clothingcoldglovehandsknittedseasonalwarmth",
    "fab fa-mix",
    "fab fa-mixcloud",
    "fab fa-mixer",
    "fab fa-mizuni",
    "fas fa-mobile|androidcallcellcellphonedevicemobilemobilephonenumberphonescreentelephonetext",
    "fas fa-mobile-button|applecallcellphonedeviceiphonenumberscreentelephone",
    "fas fa-mobile-retro|cellphonecellularphone",
    "fas fa-mobile-screen|androidcallcellphonedevicenumberscreentelephonetext",
    "fas fa-mobile-screen-button|applecallcellphonedeviceiphonenumberscreentelephone",
    "fab fa-modx",
    "fab fa-monero",
    "fas fa-money-bill|buycashcheckoutmoneypaymentpricepurchase",
    "fas fa-money-bill-1|buycashcheckoutmoneypaymentpricepurchase",
    "fas fa-money-bill-1-wave|buycashcheckoutmoneypaymentpricepurchase",
    "fas fa-money-bill-transfer|bankconversiondepositmoneytransferwithdrawal",
    "fas fa-money-bill-trend-up|bankbondsinflationmarketstockstrade",
    "fas fa-money-bill-wave|buycashcheckoutmoneypaymentpricepurchase",
    "fas fa-money-bill-wheat|agribusinessagriculturefarmingfoodlivelihoodsubsidy",
    "fas fa-money-bills|atmcashmoneymoolah",
    "fas fa-money-check|bankcheckbuycheckoutchequemoneypaymentpricepurchase",
    "fas fa-money-check-dollar|bankcheckbuycheckoutchequemoneypaymentpricepurchase",
    "fas fa-monument|buildinghistoriclandmarkmemorable",
    "fas fa-moon|powersleepsymbolcontrastcrescentcrescentmoondarklunarmoonnight",
    "fas fa-mortar-pestle|crushculinarygrindmedicalmixpharmacyprescriptionspices",
    "fas fa-mosque|muslimbuildingislamlandmarkmosquemuslimreligion",
    "fas fa-mosquito|bitebugmosquitowestnile",
    "fas fa-mosquito-net|bitemalariamosquitonet",
    "fas fa-motorcycle|bikemachinemotorcycleracingtransportationvehicle",
    "fas fa-mound|barrierhillpitcherspeedbump",
    "fas fa-mountain|coldglacierhikinghilllandscapemountainsnowsnowcappedmountaintravelview",
    "fas fa-mountain-city|locationruralurban",
    "fas fa-mountain-sun|countryhikinglandscaperuraltravelview",
    "fas fa-mug-hot|beveragecalientecocoacoffeecupdrinkholidayhothotbeveragehotchocolatesteamsteamingteawarmth",
    "fas fa-mug-saucer|beveragebreakfastcafedrinkfallmorningmugseasonaltea",
    "fas fa-music|lyricsmelodymusicmusicalnotenotesingsound",
    "fas fa-n|latincapitalletternlatinsmallletternletternayno",
    "fas fa-naira-sign|nairasigncurrency",
    "fab fa-napster",
    "fab fa-neos",
    "fas fa-network-wired|computerconnectethernetinternetintranet",
    "fas fa-neuter|neutergender",
    "fas fa-newspaper|articleeditorialheadlinejournaljournalismnewsnewspaperpaperpress",
    "fab fa-nfc-directional|connectdatanearfieldcommunicationnfcscansignaltransferwireless",
    "fab fa-nfc-symbol|connectdatanearfieldcommunicationnfcscansignaltransferwireless",
    "fab fa-nimblr",
    "fab fa-node",
    "fab fa-node-js",
    "fas fa-not-equal|arithmeticcomparemath",
    "fas fa-notdef|closemissing",
    "fas fa-note-sticky|messagenotepaperremindersticker",
    "fas fa-notes-medical|clipboarddoctorehrhealthhistoryrecords",
    "fab fa-npm",
    "fab fa-ns8",
    "fab fa-nutritionix",
    "fas fa-o|latincapitalletterolatinsmallletteroletter",
    "fas fa-object-group|combinecopydesignmergeselect",
    "fas fa-object-ungroup|copydesignmergeselectseparate",
    "fab fa-octopus-deploy",
    "fab fa-odnoklassniki",
    "fab fa-odysee",
    "fas fa-oil-can|autocrudegasolinegreaselubricatepetroleum",
    "fas fa-oil-well|drilloilrig",
    "fab fa-old-republic|politicsstarwars",
    "fas fa-om|hindubuddhismhinduismjainismmantraomreligion",
    "fab fa-opencart",
    "fab fa-openid",
    "fab fa-opera",
    "fab fa-optin-monster",
    "fab fa-orcid",
    "fab fa-osi",
    "fas fa-otter|animalbadgerfaunafishingfurmammalmartenotterplayful",
    "fas fa-outdent|alignjustifyparagraphtab",
    "fas fa-p|latincapitalletterplatinsmallletterpletter",
    "fab fa-padlet",
    "fab fa-page4",
    "fab fa-pagelines|ecofloraleafleavesnatureplanttree",
    "fas fa-pager|beepercellphonecommunicationpagepager",
    "fas fa-paint-roller|acrylicartbrushcolorfillpaintpigmentwatercolor",
    "fas fa-paintbrush|acrylicartbrushcolorfillpaintpaintbrushpaintingpigmentwatercolor",
    "fas fa-palette|acrylicartartistpalettebrushcolorfillmuseumpaintpaintingpalettepigmentwatercolor",
    "fab fa-palfed",
    "fas fa-pallet|archiveboxinventoryshippingwarehouse",
    "fas fa-panorama|imagelandscapephotowide",
    "fas fa-paper-plane|airfloatfoldmailpapersend",
    "fas fa-paperclip|attachattachmentconnectlinkpaperclipaperclip",
    "fas fa-parachute-box|aidassistancegoodsreliefrescuesupplies",
    "fas fa-paragraph|pilcrowsigneditformattextwriting",
    "fas fa-passport|documentididentificationissuedtravel",
    "fas fa-paste|clipboardcopydocumentpaper",
    "fab fa-patreon",
    "fas fa-pause|bardoubleholdpausepausebuttonverticalwait",
    "fas fa-paw|animalcatdogpetprint",
    "fab fa-paypal",
    "fas fa-peace|peacepeacesymbolserenitytranquilitytrucewar",
    "fas fa-pen|ballpointdesigneditpenupdatewrite",
    "fas fa-pen-clip|designeditupdatewrite",
    "fas fa-pen-fancy|blacknibdesigneditfountainfountainpennibpenupdatewrite",
    "fas fa-pen-nib|designeditfountainpenupdatewrite",
    "fas fa-pen-ruler|designdraftdrawpencil",
    "fas fa-pen-to-square|editpenpencilupdatewrite",
    "fas fa-pencil|lowerleftpencildesigndraweditleadpencilupdatewrite",
    "fas fa-people-arrows|distanceisolationseparatesocialdistancinguserspeople",
    "fas fa-people-carry-box|userspeople",
    "fas fa-people-group|familygroupteam",
    "fas fa-people-line|groupneed",
    "fas fa-people-pulling|forcedreturnyanking",
    "fas fa-people-robbery|criminalhandsuplootingrobberysteal",
    "fas fa-people-roof|familygroupmanagepeoplesafeshelter",
    "fas fa-pepper-hot|buffalowingscapsicumchilichillihabanerohothotpepperjalapenomexicanpepperspicytabascovegetable",
    "fab fa-perbyte",
    "fas fa-percent|percentsigndiscountfractionproportionrateratio",
    "fab fa-periscope",
    "fas fa-person|manpersonstandingstandstandingwoman",
    "fas fa-person-arrow-down-to-line|groundindigenousnative",
    "fas fa-person-arrow-up-from-line|populationrise",
    "fas fa-person-biking|bicyclebikebikingcyclistpedalpersonbikingsummerwheel",
    "fas fa-person-booth|changingroomcurtainvotevoting",
    "fas fa-person-breastfeeding|babychildinfantmothernutritionsustenance",
    "fas fa-person-burst|abuseaccidentcrashexplodeviolence",
    "fas fa-person-cane|agingcaneelderlyoldstaff",
    "fas fa-person-chalkboard|blackboardinstructorkeynotelessonpresentationteacher",
    "fas fa-person-circle-check|approvednotaffectedokokay",
    "fas fa-person-circle-exclamation|affectedalertlostmissing",
    "fas fa-person-circle-minus|deleteremove",
    "fas fa-person-circle-plus|addfound",
    "fas fa-person-circle-question|lostmissing",
    "fas fa-person-circle-xmark|deadremoved",
    "fas fa-person-digging|buryconstructiondebrisdigmenatwork",
    "fas fa-person-dots-from-line|allergydiagnosis",
    "fas fa-person-dress|manskirtwoman",
    "fas fa-person-dress-burst|abuseaccidentcrashexplodeviolence",
    "fas fa-person-drowning|drownemergencyswim",
    "fas fa-person-falling|accidentfalltrip",
    "fas fa-person-falling-burst|accidentcrashdeathfallhomicidemurder",
    "fas fa-person-half-dress|gendermanrestroomtransgenderwoman",
    "fas fa-person-harassing|abusescreamshameshoutyell",
    "fas fa-person-hiking|autumnfallhikemountainoutdoorssummerwalk",
    "fas fa-person-military-pointing|armycustomsguard",
    "fas fa-person-military-rifle|armedforcesarmymilitaryriflewar",
    "fas fa-person-military-to-person|civiliancoordinationmilitary",
    "fas fa-person-praying|kneelplaceofworshipreligionthankworship",
    "fas fa-person-pregnant|babybirthchildpregnantpregnantwomanwoman",
    "fas fa-person-rays|affectedfocusshine",
    "fas fa-person-rifle|armycombatantgunmilitaryriflewar",
    "fas fa-person-running|exitfleemarathonpersonrunningracerunning",
    "fas fa-person-shelter|houseinsideroofsafesafetyshelter",
    "fas fa-person-skating|figureskatingiceolympicsrinkskatewinter",
    "fas fa-person-skiing|downhillolympicsskiskiersnowwinter",
    "fas fa-person-skiing-nordic|crosscountryolympicswinter",
    "fas fa-person-snowboarding|olympicsskisnowsnowboardsnowboarderwinter",
    "fas fa-person-swimming|oceanpersonswimmingpoolseaswimwater",
    "fas fa-person-through-window|doorexitforcedentryleaverobberystealwindow",
    "fas fa-person-walking|crosswalkexercisehikemovepersonwalkingwalkwalking",
    "fas fa-person-walking-arrow-loop-left|populationreturnreturn",
    "fas fa-person-walking-arrow-right|exitinternallydisplacedleaverefugee",
    "fas fa-person-walking-dashed-line-arrow-right|exitrefugee",
    "fas fa-person-walking-luggage|bagbaggagebriefcasecarryondeploymentrolling",
    "fas fa-person-walking-with-cane|blindcane",
    "fas fa-peseta-sign|pesetasigncurrency",
    "fas fa-peso-sign|pesosigncurrency",
    "fab fa-phabricator",
    "fab fa-phoenix-framework",
    "fab fa-phoenix-squadron",
    "fas fa-phone|lefthandtelephonereceivercallearphonenumberphonereceiversupporttelephonetelephonereceivervoice",
    "fas fa-phone-flip|righthandtelephonereceivercallearphonenumbersupporttelephonevoice",
    "fas fa-phone-slash|callcancelearphonemutenumbersupporttelephonevoice",
    "fas fa-phone-volume|callearphonenumbersoundsupporttelephonevoicevolumecontrolphone",
    "fas fa-photo-film|avfilmimagelibrarymedia",
    "fab fa-php",
    "fab fa-pied-piper",
    "fab fa-pied-piper-alt",
    "fab fa-pied-piper-hat|clothing",
    "fab fa-pied-piper-pp",
    "fas fa-piggy-bank|banksavesavings",
    "fas fa-pills|drugsmedicineprescriptiontablets",
    "fab fa-pinterest",
    "fab fa-pinterest-p",
    "fab fa-pix",
    "fas fa-pizza-slice|cheesechicagoitalianmozzarellanewyorkpepperonipiesliceteenagemutantninjaturtlestomato",
    "fas fa-place-of-worship|buildingchurchholymosquesynagogue",
    "fas fa-plane|airplaneairportdestinationflylocationmodetraveltrip",
    "fas fa-plane-arrival|aeroplaneairplaneairplanearrivalairportarrivalsarrivingdestinationflylandlandinglocationmodetraveltrip",
    "fas fa-plane-circle-check|airplaneairportflightflynotaffectedokokaytravel",
    "fas fa-plane-circle-exclamation|affectedairplaneairportflightflytravel",
    "fas fa-plane-circle-xmark|airplaneairportdestroyflightflytravel",
    "fas fa-plane-departure|aeroplaneairplaneairplanedepartureairportcheckindepartingdeparturedeparturesdestinationflylocationmodetakeofftakingofftraveltrip",
    "fas fa-plane-lock|airplaneairportclosedflightflylockdownquarantinetravel",
    "fas fa-plane-slash|airplanemodeairportcanceledcovid19delayedgroundedtravel",
    "fas fa-plane-up|airplaneairportinternetsignalskywifiwireless",
    "fas fa-plant-wilt|droughtplantingvegetationwilt",
    "fas fa-plate-wheat|bowlhungerrationswheat",
    "fas fa-play|arrowaudiomusicplayplaybuttonplayingrightsoundstarttrianglevideo",
    "fab fa-playstation",
    "fas fa-plug|connectelectricelectricplugelectricityonlineplugpower",
    "fas fa-plug-circle-bolt|electricelectricityplugpower",
    "fas fa-plug-circle-check|electricelectricitynotaffectedokokayplugpower",
    "fas fa-plug-circle-exclamation|affectedelectricelectricityplugpower",
    "fas fa-plug-circle-minus|electricelectricityplugpower",
    "fas fa-plug-circle-plus|electricelectricityplugpower",
    "fas fa-plug-circle-xmark|destroyelectricelectricityoutageplugpower",
    "fas fa-plus|plussignaddcreateexpandmathnewpluspositiveshapesign",
    "fas fa-plus-minus|plusminussignaddmathsubtract",
    "fas fa-podcast|audiobroadcastmusicsound",
    "fas fa-poo|crapdungfacemonsterpileofpoopoopoopshitsmileturd",
    "fas fa-poo-storm|boltcloudeuphemismlightningmesspoopshitturd",
    "fas fa-poop|crappoopshitsmileturd",
    "fas fa-power-off|powersymbolcancelcomputeronrebootrestart",
    "fas fa-prescription|drugsmedicalmedicinepharmacyrx",
    "fas fa-prescription-bottle|drugsmedicalmedicinepharmacyrx",
    "fas fa-prescription-bottle-medical|drugsmedicalmedicinepharmacyrx",
    "fas fa-print|printscreensymbolprintericonbusinesscomputercopydocumentofficepaperprinter",
    "fab fa-product-hunt",
    "fas fa-pump-medical|antibacterialcleancovid19disinfecthygienemedicalgradesanitizersoap",
    "fas fa-pump-soap|antibacterialcleancovid19disinfecthygienesanitizersoap",
    "fab fa-pushed",
    "fas fa-puzzle-piece|addonaddoncluegameinterlockingjigsawpiecepuzzlepuzzlepiecesection",
    "fab fa-python",
    "fas fa-q|latincapitalletterqlatinsmallletterqletter",
    "fab fa-qq",
    "fas fa-qrcode|barcodeinfoinformationscan",
    "fas fa-question|questionmarkhelpinformationmarkoutlinedpunctuationquestionredquestionmarksupportunknownwhitequestionmark",
    "fab fa-quinscape",
    "fab fa-quora",
    "fas fa-quote-left|leftdoublequotationmarkmentionnotephrasetexttype",
    "fas fa-quote-right|rightdoublequotationmarkmentionnotephrasetexttype",
    "fas fa-r|latincapitalletterrlatinsmallletterrletter",
    "fab fa-r-project",
    "fas fa-radiation|dangerdangerousdeadlyhazardnuclearradioactivewarning",
    "fas fa-radio|ambroadcastfmfrequencymusicnewsradioreceivertransmittertunervideo",
    "fas fa-rainbow|goldleprechaunprismrainrainbowsky",
    "fas fa-ranking-star|chartfirstplacepodiumrankwin",
    "fab fa-raspberry-pi",
    "fab fa-ravelry",
    "fab fa-react",
    "fab fa-reacteurope",
    "fab fa-readme",
    "fab fa-rebel",
    "fas fa-receipt|accountingbookkeepingcheckevidenceinvoicemoneypayproofreceipttable",
    "fas fa-record-vinyl|lpalbumanalogmusicphonographsound",
    "fas fa-rectangle-ad|advertisementmedianewspaperpromotionpublicity",
    "fas fa-rectangle-list|checklistcompleteddonefinishedoltodoul",
    "fas fa-rectangle-xmark|browsercancelcomputerdevelopment",
    "fas fa-recycle|recyclingsymbolforgenericmaterialsuniversalrecyclingsymbolwastecompostgarbagerecyclerecyclingsymbolreusetrash",
    "fab fa-red-river",
    "fab fa-reddit",
    "fab fa-reddit-alien",
    "fab fa-redhat|linuxoperatingsystemos",
    "fas fa-registered|copyrightmarkrregisteredtrademark",
    "fab fa-renren",
    "fas fa-repeat|arrowclockwiseflipreloadrepeatrepeatbuttonrewindswitch",
    "fas fa-reply|mailmessagerespond",
    "fas fa-reply-all|mailmessagerespond",
    "fab fa-replyd",
    "fas fa-republican|americanconservativeelectionelephantpoliticsrepublicanpartyrightrightwingusa",
    "fab fa-researchgate",
    "fab fa-resolving",
    "fas fa-restroom|bathroomtoiletwaterclosetwc",
    "fas fa-retweet|refreshreloadshareswap",
    "fab fa-rev",
    "fas fa-ribbon|badgecausecelebrationlapelpinreminderreminderribbonribbon",
    "fas fa-right-from-bracket|arrowexitleavelogoutlogoutsignout",
    "fas fa-right-left|arrowarrowsexchangereciprocatereturnswaptransfer",
    "fas fa-right-long|forwardlongarrowrightnext",
    "fas fa-right-to-bracket|arrowenterjoinloginloginsigninsignupsigninsigninsignup",
    "fas fa-ring|dungeonsdragonsgollumbandbindingdddndengagementfantasygoldjewelrymarriageprecious",
    "fas fa-road|highwaymapmotorwaypavementroadroutestreettravel",
    "fas fa-road-barrier|blockbordernoentryroadblock",
    "fas fa-road-bridge|bridgeinfrastructureroadtravel",
    "fas fa-road-circle-check|freewayhighwaynotaffectedokokaypavementroad",
    "fas fa-road-circle-exclamation|affectedfreewayhighwaypavementroad",
    "fas fa-road-circle-xmark|destroyfreewayhighwaypavementroad",
    "fas fa-road-lock|closedfreewayhighwaylockdownpavementquarantineroad",
    "fas fa-road-spikes|barrierroadblockspikes",
    "fas fa-robot|androidautomatecomputercyborgfacemonsterrobot",
    "fas fa-rocket|aircraftappjetlaunchnasaspace",
    "fab fa-rocketchat",
    "fab fa-rockrms",
    "fas fa-rotate|anticlockwisearrowcounterclockwisecounterclockwisearrowsbuttonexchangerefreshreloadrotateswapwithershins",
    "fas fa-rotate-left|backcontrolzexchangeoopsreturnswap",
    "fas fa-rotate-right|forwardrefreshreloadrepeat",
    "fas fa-route|directionsnavigationtravel",
    "fas fa-rss|blogfeedjournalnewswriting",
    "fas fa-ruble-sign|rublesigncurrency",
    "fas fa-rug|blanketcarpetrugtextile",
    "fas fa-ruler|designdraftlengthmeasureplanningrulerstraightedgestraightruler",
    "fas fa-ruler-combined|designdraftlengthmeasureplanning",
    "fas fa-ruler-horizontal|designdraftlengthmeasureplanning",
    "fas fa-ruler-vertical|designdraftlengthmeasureplanning",
    "fas fa-rupee-sign|rupeesigncurrency",
    "fas fa-rupiah-sign|currency",
    "fab fa-rust",
    "fas fa-s|latincapitalletterslatinsmalllettersletter",
    "fas fa-sack-dollar|bagburlapcashdollarmoneymoneybagmoneybagrobbersantausd",
    "fas fa-sack-xmark|bagburlaprations",
    "fab fa-safari|browser",
    "fas fa-sailboat|dinghymastsailboatsailingyacht",
    "fab fa-salesforce",
    "fab fa-sass",
    "fas fa-satellite|communicationshardwareorbitsatellitespace",
    "fas fa-satellite-dish|setiantennacommunicationsdishhardwareradarreceiversatellitesatelliteantennasaucersignalspace",
    "fas fa-scale-balanced|librabalancebalancescalebalancedjusticelawlegalmeasurerulescaleweightzodiac",
    "fas fa-scale-unbalanced|justicelegalmeasureunbalancedweight",
    "fas fa-scale-unbalanced-flip|justicelegalmeasureunbalancedweight",
    "fab fa-schlix",
    "fas fa-school|buildingeducationlearnschoolstudentteacher",
    "fas fa-school-circle-check|notaffectedokokayschoolhouse",
    "fas fa-school-circle-exclamation|affectedschoolhouse",
    "fas fa-school-circle-xmark|destroyschoolhouse",
    "fas fa-school-flag|educateflagschoolschoolhouse",
    "fas fa-school-lock|closedlockdownquarantineschoolhouse",
    "fas fa-scissors|blacksafetyscissorswhitescissorsclipcuttingscissorssniptool",
    "fab fa-screenpal",
    "fas fa-screwdriver|adminfixmechanicrepairscrewscrewdriversettingstool",
    "fas fa-screwdriver-wrench|adminfixrepairscrewdriversettingstoolswrench",
    "fab fa-scribd",
    "fas fa-scroll|dungeonsdragonsannouncementdddndfantasypaperscriptscroll",
    "fas fa-scroll-torah|bookjewishjudaismreligionscroll",
    "fas fa-sd-card|imagememoryphotosave",
    "fab fa-searchengin",
    "fas fa-section|sectionsignlawlegalsilcrow",
    "fas fa-seedling|environmentfloragrowplantsaplingseedlingveganyoung",
    "fab fa-sellcast|eercast",
    "fab fa-sellsy",
    "fas fa-server|computercpudatabasehardwarenetwork",
    "fab fa-servicestack",
    "fas fa-shapes|blocksbuildcirclesquaretriangle",
    "fas fa-share|forwardsavesendsocial",
    "fas fa-share-from-square|forwardsavesendsocial",
    "fas fa-share-nodes|forwardsavesendsocial",
    "fas fa-sheet-plastic|plasticplasticwrapprotecttarptarpaulinwaterproof",
    "fas fa-shekel-sign|newsheqelsigncurrencyilsmoney",
    "fas fa-shield|achievementarmorawardblockclericdefenddefenseholypaladinprotectsafetysecurityshieldweaponwinner",
    "fas fa-shield-cat|animalfelinepetprotectsafetyveterinary",
    "fas fa-shield-dog|animalcaninepetprotectsafetyveterinary",
    "fas fa-shield-halved|achievementarmorawardblockclericdefenddefenseholypaladinsecurityshieldweaponwinner",
    "fas fa-shield-heart|loveprotectsafesafetyshield",
    "fas fa-shield-virus|antibodiesbarriercoronaviruscovid19fluhealthinfectionpandemicprotectsafetyvaccine",
    "fas fa-ship|boatpassengerseashipwater",
    "fas fa-shirt|clothingfashiongarmentshirtshortsleevetshirttshirt",
    "fab fa-shirtsinbulk",
    "fas fa-shoe-prints|feetfootprintsstepswalk",
    "fas fa-shop|bodegabuildingbuymarketpurchaseshoppingstore",
    "fas fa-shop-lock|bodegabuildingbuyclosedlocklockdownmarketpurchasequarantineshopshoppingstore",
    "fas fa-shop-slash|buildingbuyclosedcovid19purchaseshopping",
    "fab fa-shopify",
    "fab fa-shopware",
    "fas fa-shower|bathcleanfaucetshowerwater",
    "fas fa-shrimp|allergycrustaceanprawnseafoodshellfishshrimptail",
    "fas fa-shuffle|arrowarrowscrossedshuffleshuffletracksbuttonsortswapswitchtransfer",
    "fas fa-shuttle-space|astronautmachinenasarocketspacetransportation",
    "fas fa-sign-hanging|directionsrealestatesignagewayfinding",
    "fas fa-signal|antennaantennabarsbarbarscellgraphmobileonlinephonereceptionstatus",
    "fas fa-signature|johnhancockcursivenamewriting",
    "fas fa-signs-post|directionsdirectorymapsignagewayfinding",
    "fas fa-sim-card|harddrivehardwareportablestoragetechnologytiny",
    "fab fa-simplybuilt",
    "fas fa-sink|bathroomcovid19faucetkitchenwash",
    "fab fa-sistrix",
    "fas fa-sitemap|directoryhierarchyiainformationarchitectureorganization",
    "fab fa-sith",
    "fab fa-sitrox",
    "fab fa-sketch|appdesigninterface",
    "fas fa-skull|bonesdeathfacefairytalemonsterskeletonskullxrayyorick",
    "fas fa-skull-crossbones|blackskullandcrossbonesdungeonsdragonsalertbonescrossbonesdddangerdangerousareadeaddeadlydeathdndfacefantasyhalloweenholidayjollyrogermonsterpiratepoisonskeletonskullskullandcrossboneswarning",
    "fab fa-skyatlas",
    "fab fa-skype",
    "fab fa-slack|anchorhashhashtag",
    "fas fa-slash|cancelclosemuteoffstopx",
    "fas fa-sleigh|christmasclausflyholidaysantasledsnowxmas",
    "fas fa-sliders|adjustsettingssliderstoggle",
    "fab fa-slideshare",
    "fas fa-smog|dragonfoghazepollutionsmokeweather",
    "fas fa-smoking|cancercigarettenicotinesmokingsmokingstatustobacco",
    "fab fa-snapchat",
    "fas fa-snowflake|heavychevronsnowflakecoldprecipitationrainsnowsnowfallsnowflakewinter",
    "fas fa-snowman|colddecorationfrostfrostyholidaysnowsnowmansnowmanwithoutsnow",
    "fas fa-snowplow|cleanupcoldroadstormwinter",
    "fas fa-soap|barbathingbubblescleancleaningcovid19hygienelathersoapsoapdishwash",
    "fas fa-socks|businesssocksbusinesstimeclothingfeetflightoftheconchordssocksstockingwednesday",
    "fas fa-solar-panel|cleanecofriendlyenergygreensun",
    "fas fa-sort|filterorder",
    "fas fa-sort-down|arrowdescendingfilterordersortdesc",
    "fas fa-sort-up|arrowascendingfilterordersortasc",
    "fab fa-soundcloud",
    "fab fa-sourcetree",
    "fas fa-spa|floramassagemindfulnessplantwellness",
    "fab fa-space-awesome|adventurerocketshipshuttle",
    "fas fa-spaghetti-monster-flying|agnosticismatheismflyingspaghettimonsterfsm",
    "fab fa-speakap",
    "fab fa-speaker-deck",
    "fas fa-spell-check|dictionaryediteditorgrammartext",
    "fas fa-spider|arachnidbugcharlottecrawleighthalloweeninsectspider",
    "fas fa-spinner|circleloadingprogress",
    "fas fa-splotch|inkblobblotchglobstain",
    "fas fa-spoon|cutlerydiningscoopsilverwarespoontableware",
    "fab fa-spotify",
    "fas fa-spray-can|paintaerosoldesigngraffititag",
    "fas fa-spray-can-sparkles|carcleandeodorizefreshpinescent",
    "fas fa-square|blacksquareblackmediumsquareblockboxgeometricshapesquarewhitemediumsquare",
    "fas fa-square-arrow-up-right|diagonalnewopensendshare",
    "fab fa-square-behance",
    "fas fa-square-caret-down|arrowcaretsquareodowndropdownexpandmenumoretriangle",
    "fas fa-square-caret-left|arrowbackcaretsquareoleftprevioustriangle",
    "fas fa-square-caret-right|arrowcaretsquareorightforwardnexttriangle",
    "fas fa-square-caret-up|arrowcaretsquareoupcollapsetriangleupload",
    "fas fa-square-check|acceptagreeboxbuttoncheckcheckboxwithcheckcheckmarkbuttoncheckmarkconfirmcorrectdonemarkokselectsuccessticktodoyes",
    "fab fa-square-dribbble",
    "fas fa-square-envelope|emailemaillettermailmessagenotificationsupport",
    "fab fa-square-facebook|socialnetwork",
    "fab fa-square-font-awesome",
    "fab fa-square-font-awesome-stroke",
    "fas fa-square-full|blacklargesquareblockbluebluesquareboxbrownbrownsquaregeometricgreengreensquareorangeorangesquarepurplepurplesquareredredsquareshapesquarewhitelargesquareyellowyellowsquare",
    "fab fa-square-git",
    "fab fa-square-github|octocat",
    "fab fa-square-gitlab",
    "fab fa-square-google-plus|socialnetwork",
    "fas fa-square-h|directionsemergencyhospitalhotellettermap",
    "fab fa-square-hacker-news",
    "fab fa-square-instagram",
    "fab fa-square-js",
    "fab fa-square-lastfm",
    "fas fa-square-minus|collapsedeletehideminifynegativeremoveshapetrash",
    "fas fa-square-nfi|nonfooditemsupplies",
    "fab fa-square-odnoklassniki",
    "fas fa-square-parking|autocargaragemeterparking",
    "fas fa-square-pen|editpencilsquareupdatewrite",
    "fas fa-square-person-confined|captivityconfined",
    "fas fa-square-phone|callearphonenumbersupporttelephonevoice",
    "fas fa-square-phone-flip|callearphonenumbersupporttelephonevoice",
    "fab fa-square-pied-piper",
    "fab fa-square-pinterest",
    "fas fa-square-plus|addcreateexpandnewpositiveshape",
    "fas fa-square-poll-horizontal|chartgraphresultssurveytrendvotevoting",
    "fas fa-square-poll-vertical|chartgraphresultssurveytrendvotevoting",
    "fab fa-square-reddit",
    "fas fa-square-root-variable|arithmeticcalculusdivisionmath",
    "fas fa-square-rss|blogfeedjournalnewswriting",
    "fas fa-square-share-nodes|forwardsavesendsocial",
    "fab fa-square-snapchat",
    "fab fa-square-steam",
    "fab fa-square-tumblr",
    "fab fa-square-twitter|socialnetworktweet",
    "fas fa-square-up-right|arrowdiagonaldirectionexternallinksquareintercardinalnewnortheastopenshareuprightarrow",
    "fab fa-square-viadeo",
    "fab fa-square-vimeo",
    "fas fa-square-virus|coronaviruscovid19diseasefluinfectionpandemic",
    "fab fa-square-whatsapp",
    "fab fa-square-xing",
    "fas fa-square-xmark|closecrosscrossmarkbuttonincorrectmarknoticenotificationnotifyproblemsquarewindowwrongx",
    "fab fa-square-youtube",
    "fab fa-squarespace",
    "fab fa-stack-exchange",
    "fab fa-stack-overflow",
    "fab fa-stackpath",
    "fas fa-staff-snake|asclepiusasklepianhealthserpentwellness",
    "fas fa-stairs|exitstepsup",
    "fas fa-stamp|artcertificateimprintrubberseal",
    "fas fa-stapler|desktopmiltonofficepaperclipstaple",
    "fas fa-star|achievementawardfavoriteimportantnightratingscorestar",
    "fas fa-star-and-crescent|muslimislammuslimreligionstarandcrescent",
    "fas fa-star-half|achievementawardratingscorestarhalfemptystarhalffull",
    "fas fa-star-half-stroke|achievementawardratingscorestarhalfemptystarhalffull",
    "fas fa-star-of-david|davidjewjewishjewishjudaismreligionstarstarofdavid",
    "fas fa-star-of-life|doctoremtfirstaidhealthmedical",
    "fab fa-staylinked",
    "fab fa-steam",
    "fab fa-steam-symbol",
    "fas fa-sterling-sign|poundsigncurrency",
    "fas fa-stethoscope|covid19diagnosisdoctorgeneralpractitionerhearthospitalinfirmarymedicineofficeoutpatientstethoscope",
    "fab fa-sticker-mule",
    "fas fa-stop|blockboxsquarestopstopbutton",
    "fas fa-stopwatch|clockreminderstopwatchtime",
    "fas fa-stopwatch-20|abcscountdowncovid19happybirthdayiwillsurviveremindersecondstimetimer",
    "fas fa-store|bodegabuildingbuymarketpurchaseshoppingstore",
    "fas fa-store-slash|buildingbuyclosedcovid19purchaseshopping",
    "fab fa-strava",
    "fas fa-street-view|directionslocationmapnavigation",
    "fas fa-strikethrough|canceleditfontformattexttype",
    "fab fa-stripe",
    "fab fa-stripe-s",
    "fas fa-stroopwafel|caramelcookiedessertsweetswaffle",
    "fab fa-stubber",
    "fab fa-studiovinari",
    "fab fa-stumbleupon",
    "fab fa-stumbleupon-circle",
    "fas fa-subscript|editfontformattexttype",
    "fas fa-suitcase|baggageluggagemovepackingsuitcasetraveltrip",
    "fas fa-suitcase-medical|firstaidfirstaidhealthhelpmedicalsupplysupport",
    "fas fa-suitcase-rolling|baggageluggagemovesuitcasetraveltrip",
    "fas fa-sun|brightbrightencontrastdaylighterrayssolsolarstarsunsunnyweather",
    "fas fa-sun-plant-wilt|ariddroopdrought",
    "fab fa-superpowers",
    "fas fa-superscript|editexponentialfontformattexttype",
    "fab fa-supple",
    "fab fa-suse|linuxoperatingsystemos",
    "fas fa-swatchbook|pantonecolordesignhuepalette",
    "fab fa-swift",
    "fab fa-symfony",
    "fas fa-synagogue|jewjewishbuildingjewishjudaismreligionstarofdavidsynagoguetemple",
    "fas fa-syringe|covid19doctorimmunizationsmedicalmedicineneedleshotsicksyringevaccinatevaccine",
    "fas fa-t|latincapitallettertlatinsmalllettertletter",
    "fas fa-table|dataexcelspreadsheet",
    "fas fa-table-cells|blocksboxesgridsquares",
    "fas fa-table-cells-large|blocksboxesgridsquares",
    "fas fa-table-columns|browserdashboardorganizepanessplit",
    "fas fa-table-list|checklistcompleteddonefinishedoltodoul",
    "fas fa-table-tennis-paddle-ball|ballbatgamepaddlepingpongtabletennis",
    "fas fa-tablet|devicekindlescreen",
    "fas fa-tablet-button|appledeviceipadkindlescreen",
    "fas fa-tablet-screen-button|appledeviceipadkindlescreen",
    "fas fa-tablets|drugsmedicinepillsprescription",
    "fas fa-tachograph-digital|datadistancespeedtachometer",
    "fas fa-tag|discountlabelabelpriceshopping",
    "fas fa-tags|discountlabelpriceshopping",
    "fas fa-tape|designpackagesticky",
    "fas fa-tarp|protectiontarptentwaterproof",
    "fas fa-tarp-droplet|protectiontarptentwaterproof",
    "fas fa-taxi|cabcabbiecarcarservicelyftmachineoncomingoncomingtaxitaxitransportationtravelubervehicle",
    "fab fa-teamspeak",
    "fas fa-teeth|bitedentaldentistgumsmouthsmiletooth",
    "fas fa-teeth-open|dentaldentistgumsbitemouthsmiletooth",
    "fab fa-telegram",
    "fas fa-temperature-arrow-down|airconditionercoldheatermercurythermometerwinter",
    "fas fa-temperature-arrow-up|airconditionercoldheatermercurythermometerwinter",
    "fas fa-temperature-empty|coldmercurystatustemperature",
    "fas fa-temperature-full|feverhotmercurystatustemperature",
    "fas fa-temperature-half|mercurystatustemperaturethermometerweather",
    "fas fa-temperature-high|cookcovid19mercurysummerthermometerwarm",
    "fas fa-temperature-low|coldcoolcovid19mercurythermometerwinter",
    "fas fa-temperature-quarter|mercurystatustemperature",
    "fas fa-temperature-three-quarters|mercurystatustemperature",
    "fab fa-tencent-weibo",
    "fas fa-tenge-sign|tengesigncurrency",
    "fas fa-tent|bivouaccampgroundrefugeesheltertent",
    "fas fa-tent-arrow-down-to-line|permanentrefugeeshelter",
    "fas fa-tent-arrow-left-right|refugeesheltertransition",
    "fas fa-tent-arrow-turn-left|refugeesheltertemporary",
    "fas fa-tent-arrows-down|refugeeshelterspontaneous",
    "fas fa-tents|bivouaccampgroundrefugeesheltertent",
    "fas fa-terminal|codecodingcommandconsoledevelopmentpromptterminal",
    "fas fa-text-height|editfontformattexttype",
    "fas fa-text-slash|cancelfontformatremovestyletext",
    "fas fa-text-width|editfontformattexttype",
    "fab fa-the-red-yeti",
    "fab fa-themeco",
    "fab fa-themeisle",
    "fas fa-thermometer|covid19mercurystatustemperature",
    "fab fa-think-peaks",
    "fas fa-thumbs-down|1disagreedisapprovedislikedownhandsocialthumbthumbsdownthumbsodown",
    "fas fa-thumbs-up|1agreeapprovefavoritehandlikeokokaysocialsuccessthumbthumbsupthumbsoupupyesyougotitdude",
    "fas fa-thumbtack|blackpushpincoordinateslocationmarkerpinpushpinthumbtack",
    "fas fa-ticket|admissionadmissionticketsmoviepasssupportticket",
    "fas fa-ticket-simple|moviepasssupportticket",
    "fab fa-tiktok",
    "fas fa-timeline|chronologicaldeadlinehistorylinear",
    "fas fa-toggle-off|buttonoffonswitch",
    "fas fa-toggle-on|buttonoffonswitch",
    "fas fa-toilet|bathroomflushjohnloopeeplumbingpoopporcelainpottyrestroomthronetoiletoiletwashroomwastewc",
    "fas fa-toilet-paper|bathroomcovid19halloweenholidaylavatorypapertowelsprankprivyrestroomrollrollofpapertoilettoiletpaperwipe",
    "fas fa-toilet-paper-slash|bathroomcovid19halloweenholidaylavatoryleavesprankprivyrestroomrolltoilettroubleutohwipe",
    "fas fa-toilet-portable|outhousetoilet",
    "fas fa-toilets-portable|outhousetoilet",
    "fas fa-toolbox|adminchestcontainerfixmechanicrepairsettingstooltoolboxtools",
    "fas fa-tooth|bicuspiddentaldentistmolarmouthteethtooth",
    "fas fa-torii-gate|buildingreligionshintoshintoshrineshintoismshrine",
    "fas fa-tornado|cloudcyclonedorothylandspouttornadotototwistervortextwaterspoutweatherwhirlwind",
    "fas fa-tower-broadcast|airwavesantennacommunicationemergencyradioreceptionwaves",
    "fas fa-tower-cell|airwavesantennacommunicationradioreceptionwaves",
    "fas fa-tower-observation|firetowerview",
    "fas fa-tractor|agriculturefarmtractorvehicle",
    "fab fa-trade-federation",
    "fas fa-trademark|copyrightmarkregistersymboltmtrademarktrademark",
    "fas fa-traffic-light|directionlightroadsignaltraffictravelverticaltrafficlight",
    "fas fa-trailer|carryhaulmovingtravel",
    "fas fa-train|bulletcommutelocomotiverailwaysubwaytrain",
    "fas fa-train-subway|machinerailwaytraintransportationvehicle",
    "fas fa-train-tram|crossingmachinemountainsseasonaltramtransportationtrolleybus",
    "fas fa-transgender|femalegenderintersexmaletransgendertransgendersymbol",
    "fas fa-trash|deletegarbagehideremove",
    "fas fa-trash-arrow-up|backcontrolzdeletegarbagehideoopsremoveundo",
    "fas fa-trash-can|deletegarbagehideremovetrasho",
    "fas fa-trash-can-arrow-up|backcontrolzdeletegarbagehideoopsremoveundo",
    "fas fa-tree|barkevergreentreefallfloraforestnatureplantseasonaltree",
    "fas fa-tree-city|buildingcityurban",
    "fab fa-trello|atlassian",
    "fas fa-triangle-exclamation|alertdangererrorimportantnoticenotificationnotifyproblemwarninwarning",
    "fas fa-trophy|achievementawardcupgameprizetrophywinner",
    "fas fa-trowel|buildconstructiontool",
    "fas fa-trowel-bricks|buildconstructionreconstructiontool",
    "fas fa-truck|blacktruckcargodeliverydeliverytruckshippingtruckvehicle",
    "fas fa-truck-arrow-right|accessfastshippingtransport",
    "fas fa-truck-droplet|thirsttruckwaterwatersupply",
    "fas fa-truck-fast|expressfedexmailovernightpackageups",
    "fas fa-truck-field|suppliestruck",
    "fas fa-truck-field-un|suppliestruckunitednations",
    "fas fa-truck-front|shuttletruckvan",
    "fas fa-truck-medical|ambulancecliniccovid19emergencyemterhelphospitalmobilesupportvehicle",
    "fas fa-truck-monster|offroadvehiclewheel",
    "fas fa-truck-moving|cargoinventoryrentalvehicle",
    "fas fa-truck-pickup|cargopickuppickuppickuptrucktruckvehicle",
    "fas fa-truck-plane|airplaneplanetransportationtruckvehicle",
    "fas fa-truck-ramp-box|boxcargodeliveryinventorymovingrentalvehicle",
    "fas fa-tty|communicationdeaftelephoneteletypewritertext",
    "fab fa-tumblr",
    "fas fa-turkish-lira-sign|turkishlirasigncurrency",
    "fas fa-turn-down|arrowdownleveldownrightarrowcurvingdown",
    "fas fa-turn-up|arrowleveluprightarrowcurvingup",
    "fas fa-tv|computerdisplaymonitortelevision",
    "fab fa-twitch",
    "fab fa-twitter|socialnetworktweet",
    "fab fa-typo3",
    "fas fa-u|latincapitalletterulatinsmallletteruletter",
    "fab fa-uber",
    "fab fa-ubuntu|linuxoperatingsystemos",
    "fab fa-uikit",
    "fab fa-umbraco",
    "fas fa-umbrella|protectionrainstormwet",
    "fas fa-umbrella-beach|beachbeachwithumbrellaprotectionrecreationsandshadesummersunumbrella",
    "fab fa-uncharted",
    "fas fa-underline|editemphasisformattextwriting",
    "fab fa-uniregistry",
    "fab fa-unity",
    "fas fa-universal-access|userspeople",
    "fas fa-unlock|adminlockopenpasswordprivateprotectunlockunlocked",
    "fas fa-unlock-keyhole|adminlockpasswordprivateprotect",
    "fab fa-unsplash",
    "fab fa-untappd",
    "fas fa-up-down|updownblackarrowarrowarrowsvexpandportraitresizetallupdownarrowvertical",
    "fas fa-up-down-left-right|arrowarrowsbiggerenlargeexpandfullscreenmovepositionreorderresize",
    "fas fa-up-long|longarrowupupload",
    "fas fa-up-right-and-down-left-from-center|arrowsbiggerenlargefullscreenresize",
    "fas fa-up-right-from-square|externallinknewopenshare",
    "fas fa-upload|harddriveimportpublish",
    "fab fa-ups|unitedparcelservicepackageshipping",
    "fab fa-usb",
    "fas fa-user|adultbustbustinsilhouettegenderneutralpersonprofilesilhouetteunspecifiedgenderuserspeople",
    "fas fa-user-astronaut|avatarclothingcosmonautnasaspacesuit",
    "fas fa-user-check|userspeople",
    "fas fa-user-clock|userspeople",
    "fas fa-user-doctor|covid19healthjobmedicalnurseoccupationphysicianprofilesurgeonworker",
    "fas fa-user-gear|userspeople",
    "fas fa-user-graduate|userspeople",
    "fas fa-user-group|bustbustsinsilhouettesilhouetteuserspeople",
    "fas fa-user-injured|userspeople",
    "fas fa-user-large|userspeople",
    "fas fa-user-large-slash|userspeople",
    "fas fa-user-lock|userspeople",
    "fas fa-user-minus|deletenegativeremove",
    "fas fa-user-ninja|assassinavatardangerousdeadlyfighterhiddenninjasneakystealth",
    "fas fa-user-nurse|covid19doctorhealthmdmedicalmidwifephysicianpractitionersurgeonworker",
    "fas fa-user-pen|userspeople",
    "fas fa-user-plus|addavatarpositivesignupsignupteam",
    "fas fa-user-secret|detectivesleuthspyuserspeople",
    "fas fa-user-shield|protectsafety",
    "fas fa-user-slash|bandeleteremove",
    "fas fa-user-tag|userspeople",
    "fas fa-user-tie|avatarbusinessclothingformalprofessionalsuit",
    "fas fa-user-xmark|archivedeleteremovex",
    "fas fa-users|userspeople",
    "fas fa-users-between-lines|coveredgrouppeople",
    "fas fa-users-gear|userspeople",
    "fas fa-users-line|groupneedpeople",
    "fas fa-users-rays|affectedfocusedgrouppeople",
    "fas fa-users-rectangle|focusgrouppeoplereached",
    "fas fa-users-slash|userspeople",
    "fas fa-users-viewfinder|focusgrouppeopletargeted",
    "fab fa-usps|americanpackageshippingusa",
    "fab fa-ussunnah",
    "fas fa-utensils|cookingcutlerydiningdinnereatfoodforkforkandknifekniferestaurant",
    "fas fa-v|latincapitallettervlatinsmalllettervletter",
    "fab fa-vaadin",
    "fas fa-van-shuttle|airportbusmachineminibuspublictransportationtransportationtravelvehicle",
    "fas fa-vault|bankimportantlockmoneysafe",
    "fas fa-vector-square|anchorslinesobjectrendershape",
    "fas fa-venus|femalefemalesigngenderwoman",
    "fas fa-venus-double|doubledfemalesignfemalegenderlesbian",
    "fas fa-venus-mars|interlockedfemaleandmalesignfemalegenderheterosexualmale",
    "fas fa-vest|bikerfashionstyle",
    "fas fa-vest-patches|bikerfashionstyle",
    "fab fa-viacoin",
    "fab fa-viadeo",
    "fas fa-vial|ampulechemistchemistryexperimentlabsamplesciencetesttesttube",
    "fas fa-vial-circle-check|ampulechemistchemistrynotaffectedokokaysuccesstesttubetubevaccine",
    "fas fa-vial-virus|ampulecoronaviruscovid19flueinfectionlablaboratorypandemictesttesttubevaccine",
    "fas fa-vials|ampuleexperimentlabsamplesciencetesttesttube",
    "fab fa-viber",
    "fas fa-video|camerafilmmovierecordvideocamera",
    "fas fa-video-slash|addcreatefilmnewpositiverecordvideo",
    "fas fa-vihara|buddhismbuddhistbuildingmonastery",
    "fab fa-vimeo",
    "fab fa-vimeo-v|vimeo",
    "fab fa-vine",
    "fas fa-virus|bugcoronaviruscovid19fluhealthinfectionpandemicsickvaccineviral",
    "fas fa-virus-covid|bugcovid19fluhealthinfectionpandemicvaccineviralvirus",
    "fas fa-virus-covid-slash|bugcovid19fluhealthinfectionpandemicvaccineviralvirus",
    "fas fa-virus-slash|bugcoronaviruscovid19cureeliminatefluhealthinfectionpandemicsickvaccineviral",
    "fas fa-viruses|bugscoronaviruscovid19fluhealthinfectionmultiplypandemicsickspreadvaccineviral",
    "fab fa-vk",
    "fab fa-vnv",
    "fas fa-voicemail|answerinboxmessagephone",
    "fas fa-volcano|calderaeruptionlavamagmamountainsmokevolcano",
    "fas fa-volleyball|ballbeachgameolympicssportvolleyball",
    "fas fa-volume-high|audiohigherloudloudermusicsoundspeakerspeakerhighvolume",
    "fas fa-volume-low|audiolowermusicquietersoftsoundspeakerspeakerlowvolume",
    "fas fa-volume-off|audiobanmusicmutequietsilentsound",
    "fas fa-volume-xmark|audiomusicquietsoundspeaker",
    "fas fa-vr-cardboard|3daugmentgooglerealityvirtual",
    "fab fa-vuejs",
    "fas fa-w|latincapitalletterwlatinsmallletterwletter",
    "fas fa-walkie-talkie|communicationcopyintercomoverportableradiotwowayradio",
    "fas fa-wallet|billfoldcashcurrencymoney",
    "fas fa-wand-magic|autocompleteautomaticmagemagicspellwandwitchwizard",
    "fas fa-wand-magic-sparkles|automagicmagicwandtrickwitchwizard",
    "fas fa-wand-sparkles|autocompleteautomaticfantasyhalloweenholidaymagicweaponwitchwizard",
    "fas fa-warehouse|buildingcapacitygarageinventorystorage",
    "fab fa-watchman-monitoring",
    "fas fa-water|lakeliquidoceanseaswimwet",
    "fas fa-water-ladder|ladderrecreationswimwater",
    "fas fa-wave-square|frequencypulsesignal",
    "fab fa-waze",
    "fab fa-weebly",
    "fab fa-weibo",
    "fas fa-weight-hanging|anvilheavymeasurement",
    "fas fa-weight-scale|healthmeasurementscaleweight",
    "fab fa-weixin",
    "fab fa-whatsapp",
    "fas fa-wheat-awn|agricultureautumnfallfarminggrain",
    "fas fa-wheat-awn-circle-exclamation|affectedfaminefoodglutenhungerstarvestraw",
    "fas fa-wheelchair|userspeople",
    "fas fa-wheelchair-move|accesshandicapimpairmentphysicalwheelchairsymbol",
    "fas fa-whiskey-glass|alcoholbarbeveragebourbondrinkglassliquorneatryescotchshottumblertumblerglasswhisky",
    "fab fa-whmcs",
    "fas fa-wifi|connectionhotspotinternetnetworkwireless",
    "fab fa-wikipedia-w",
    "fas fa-wind|airblowbreezefallseasonalweather",
    "fas fa-window-maximize|maximizebrowsercomputerdevelopmentexpand",
    "fas fa-window-minimize|minimizebrowsercollapsecomputerdevelopment",
    "fas fa-window-restore|browsercomputerdevelopment",
    "fab fa-windows|microsoftoperatingsystemos",
    "fas fa-wine-bottle|alcoholbeveragecabernetdrinkglassgrapesmerlotsauvignon",
    "fas fa-wine-glass|alcoholbarbeveragecabernetdrinkglassgrapesmerlotsauvignonwinewineglass",
    "fas fa-wine-glass-empty|alcoholbeveragecabernetdrinkgrapesmerlotsauvignon",
    "fab fa-wirsindhandwerk",
    "fab fa-wix",
    "fab fa-wizards-of-the-coast|dungeonsdragonsdddndfantasygamegamingtabletop",
    "fab fa-wodu",
    "fab fa-wolf-pack-battalion",
    "fas fa-won-sign|wonsigncurrency",
    "fab fa-wordpress",
    "fab fa-wordpress-simple",
    "fas fa-worm|dirtgardenwormwriggle",
    "fab fa-wpbeginner",
    "fab fa-wpexplorer",
    "fab fa-wpforms",
    "fab fa-wpressr|rendact",
    "fas fa-wrench|constructionfixmechanicplumbingsettingsspannertoolupdatewrench",
    "fas fa-x|latincapitalletterxlatinsmallletterxletter",
    "fas fa-x-ray|healthmedicalradiologicalimagesradiologyskeleton",
    "fab fa-xbox",
    "fab fa-xing",
    "fas fa-xmark|cancellationxmultiplicationsignmultiplicationxcancelclosecrosscrossmarkerrorexitincorrectmarkmultiplicationmultiplynoticenotificationnotifyproblemsignwrongx",
    "fas fa-xmarks-lines|barricadebarrierfencepoisonroadblock",
    "fas fa-y|latincapitalletterylatinsmallletteryletteryayyes",
    "fab fa-y-combinator",
    "fab fa-yahoo",
    "fab fa-yammer",
    "fab fa-yandex",
    "fab fa-yandex-international",
    "fab fa-yarn",
    "fab fa-yelp",
    "fas fa-yen-sign|yensigncurrency",
    "fas fa-yin-yang|daoismoppositesreligiontaotaoismtaoistyangyinyinyang",
    "fab fa-yoast",
    "fab fa-youtube|filmvideoyoutubeplayyoutubesquare",
    "fas fa-z|latincapitalletterzlatinsmallletterzletter",
    "fab fa-zhihu"
);
function escapeHtml(e) {
    if (typeof e == "undefined") return "";
    return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
function guidGenerator() {
    var e = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return e() + e();
}
var ID = function () {
    return Math.random().toString(36).substring(2, 11);
};
function koBlockRemovePrompt(e) {
    keditableToolbar("hide");
    $(".keditRemove").remove();
    $("#kEdit_" + e).before(
        '<div class="keditRemove kelement"><div><i class="fas fa-fw fa-trash"></i>  <button type="button" onclick="$(\'#blockId\').val(\'' +
            e +
            "');koBlockRemove();\">" +
            langPhrase.yesRemove +
            '</button><button type="button" onclick="$(this).parent().parent().remove();">' +
            langPhrase.cancel +
            "</button></div><span>" +
            langPhrase.blockRemoving +
            "</span></div>"
    );
    setTimeout(function () {
        $(".keditRemove").addClass("active");
    }, 100);
    return;
}
var k_EditInitCounter = 0;
function k_EditInit(e, a, t) {
    var r = 0;
    if (koparsedNotEditable != !1) {
        if (koparsedNotEditable == "SEARCH") return;
        else var r = 1;
    }
    if ($("#kEdit_" + a).length > 0) return;
    if (t == "h") {
        var i = "";
    } else if (t == "f") {
        var i = "";
        $(e).attr("data-label", langPhrase.footerEl);
    } else {
        if ($(e).hasClass("keditRow") || $(e).find(".koparsed").length === 0) {
            $(e).attr("data-label", langPhrase.contentEl);
            if ($(e).children().first().hasClass("k_Edit")) return;
        }
        var i = "";
    }
    var s = $(e).attr("rel"),
        n = 1,
        l = 1,
        o = "",
        c = "",
        f = "";
    if (typeof s !== "undefined" || $(e).hasClass("keditHeader")) {
        n = 0;
        l = 0;
    }
    if (t == "f") {
        if (k_EditInitCounter == 1) return !0;
        k_EditInitCounter++;
        n = 0;
        l = 0;
    }
    if ($(e).hasClass("keditRow")) {
        o = " keditLayout";
    }
    if ($(e).hasClass("keditNoEdit")) return;
    i += '<div contenteditable="false" class="k_Edit kelement ' + o + '" id="kEdit_' + a + '">';
    i += '<span class="k_EditMore kelement">';
    i +=
        '<a href="javascript:void(null)" class="" data-balloon="' +
        langPhrase.blockSettings +
        '" data-balloon-pos="downright" onclick="koToolbarTabs(\'Block\',$(this).parent().parent().parent().attr(\'id\'))"><i class="fas fa-cog"></i></a>';
    if (l == 1) {
        i += '<a href="javascript:void(null)" class="k_Remove" data-balloon="' + langPhrase.blockRemove + '" data-balloon-pos="downright" onclick="koBlockRemovePrompt(\'' + a + '\')"><i class="fas fa-trash"></i></a>';
    }
    if ($(e)[0].hasAttribute("data-keditor")) {
        i +=
            '<a href="javascript:void(null)" class="k_BlockDesigner" data-balloon="' +
            langPhrase.contentBlockDesigner +
            '" data-balloon-pos="downright" onclick="$(\'#blockId\').val(\'' +
            a +
            "');koShowFrame('html','editor');return false;\"><i class=\"fas fa-pencil-ruler fa-fw\"></i></a>";
    }
    i += "</span>";
    if (r == 0) {
        if (n == 1) {
            i += '<a href="javascript:void(null)" class="k_Move" data-balloon="' + langPhrase.blockMove + '" data-balloon-pos="downright"><i></i></a>';
        }
    }
    i += "</div>";
    i = $(i);
    $(e).prepend(i);
    return !0;
}
function keditSeparatorZIndex(e) {
    if (e == 1) {
        $("#website").addClass("koHeaderZIndex_lower");
        $(".dropdown-menu.show").removeClass("show");
    } else {
        $("#website").removeClass("koHeaderZIndex_lower");
    }
}
function keditSeparatorCode(e, a, t) {
    if (!e) var e = ID();
    if (!a) var a = "";
    if (typeof t === "undefined") var i = langPhrase.addNewContentHere;
    else if (t == "header") var i = "Add new content to header";
    else if (t == "footer") var i = "Add new content to footer";
    return (
        '<nav class="keditSeparator kelement ' +
        a +
        '" id="' +
        e +
        '" onmouseover="keditSeparatorZIndex(1)" onmouseout="keditSeparatorZIndex(0)"><div><a href="javascript:void(null)" onclick="showNewContents(\'' +
        e +
        '\')" data-balloon="' +
        i +
        '" data-balloon-pos="down"><span><i class="fas fa-plus"></i></span></a></div></nav>'
    );
}
var idInUse = [];
function keditPrepare(e, a) {
    var t = "",
        i;
    if (typeof e === "object") {
        i = e;
    } else {
        t = e.substring(1, 2);
        i = e;
    }
    if (a == "header" || a == "footer") {
        t = a.substring(0, 1);
    }
    var n = 0;
    $(i).each(function (a) {
        n++;
        var l = "kpg_";
        if (typeof $(this).attr("rel") !== "undefined") l += $(this).attr("rel");
        if (l == "kpg_") var l = "kpg_" + Math.floor(Math.random() * 1000000) + a;
        var i = $(this).attr("id");
        if (typeof i === "undefined" || idInUse.indexOf(i) > -1) {
            $(this).attr("id", l);
            i = l;
        }
        idInUse.push(i);
        initKeditable(this);
        k_EditInit(this, i, t);
        if (e == "#footerContent") {
            $(this).attr("data-label", "Footer Element");
        }
    });
    if (a != "noSeparators") {
        keditSeparators();
    }
}
function initKeditable(e) {
    var t = !1,
        i = typeof e;
    if (i === "undefined") {
        var a = $(".kedit");
    } else if (i === "object") {
        var a = $(e);
        e = $(e).attr("id");
        var t = !0;
    } else {
        var a = $("#" + e),
            t = !0;
    }
    a.each(function (a, i) {
        var n = $(i).find(".koparsed");
        if (typeof n !== "undefined" && n.length > 0) {
            var o = n.find(".koInModuleMenu");
            if (o.length === 0) return !0;
            $(i).prepend(o.outerHTML());
            return !0;
        }
        var l = $(i).find(".keditable");
        if (l.length > 0) {
            $(l).each(function () {
                keditableToolbar(this);
            });
        } else {
            $(i).html('<div class="keditable keditable-auto">' + $(i).html() + "</div>");
            keditableToolbar($(i).find(".keditable-auto"));
        }
        if (t && $("#" + e + " .kedit").length === 0) {
            $("#" + e + " a").editableLinks();
            $("#" + e + " img").editableImages();
            $("#" + e + " .koIcon").editableIcons();
            $("#" + e + " .koTable").editableTables();
            $("#" + e + " .koSeparator,#footerContent .koSeparator").editableSeparators();
            $("#" + e + " .kvideo-centered").editableVideos();
        }
    });
}
function hideModalManager() {
    $("a.koToolbarTabsClose,a.koToolbarTabsApply,a.koToolbarTabsRemove").css({ left: "" });
    $("html, body").css("overflow", "auto");
    hideCurrentMenuId = "0";
    koMenuClose();
}
function showModalManager(e, a, t) {
    koLeftMenuShow();
    if (t == "img") {
        $("#managerApplyToImage").val(e);
        $("#managerApplyTo").val("");
    } else if (t == "tinymce") {
        window.tinymceCallback = e;
    } else {
        $("#managerApplyTo").val(e);
        $("#managerApplyToImage").val("");
    }
    return koMoreMenuOpen("files");
}
function kAssetManager(e, a, t) {
    showModalManager(e, t, "tinymce");
    return;
}
var tinyMceMoreOptionsStatus = 1;
function k_EditCancel() {
    if (ktempCodeId != null) {
        $("#k_Edit").hide();
        $("#k_EditActive").remove();
        $("#" + ktempCodeId)
            .html(ktempCode)
            .removeClass("keditActive");
        ktempCodeId = null;
    }
}
function koScriptLoader(e, a) {
    var t = e.length;
    function i(e) {
        return function () {
            --t;
            if (t < 1) {
                a();
            }
        };
    }
    function l(e) {
        if (e.slice(-4) == ".css") {
            var a = document.createElement("link");
            a.setAttribute("rel", "stylesheet");
            a.setAttribute("type", "text/css");
            a.setAttribute("href", e);
            a.onload = i(e);
        } else {
            var a = document.createElement("script");
            a.setAttribute("src", e);
            a.onload = i(e);
            a.async = null;
        }
        document.getElementsByTagName("head")[0].appendChild(a);
    }
    for (var n of e) {
        l(n);
    }
}
function k_htmlApply() {
    var a = $("#blockId").val();
    if (typeof koSourceEditor === "undefined") {
        var e = $("#k_htmlEditor").val();
    } else {
        var e = koSourceEditor.getValue();
    }
    $("#" + a).html(e);
    $("#" + a)
        .find("script")
        .remove();
    k_EditSave();
}
function k_htmlFormat(e) {
    var a = "\n",
        t = "\t",
        i = 0,
        n = [];
    e = e.replace(/ <\/a>/g, "</a>");
    e = e.replace(/ ></g, ">\n<");
    return e;
}
function k_RawHTML(e, a) {
    $("body").append('<div id="k_TempSave"></div>');
    $(e)
        .find("#newKeditItem")
        .each(function (e, a) {
            $(this).attr("id", "kedit_" + ID());
        });
    $("#k_TempSave").html($(e).html());
    $("#k_TempSave .koparsed").each(function () {
        var e = $(this).attr("rel");
        if (typeof e !== "undefined") {
            if (e == "documentEditor") {
                $(this).replaceWith("(((documentEditor(((" + $(this).closest(".kapp").attr("data-value") + ")))");
            } else {
                var a = $(this).attr("data-kopased-addon");
                if (typeof a !== "undefined" && a != "") e += "," + a;
                $(this).replaceWith("{%" + e + "%}");
            }
        } else $(this).replaceWith($(this).html());
    });
    $("#k_TempSave .kedit").removeClass("noedit kedit_fw blockKeditActive ui-sortable-helper ui-sortable").removeAttr("ondrag ondrop onpaste contenteditable spellcheck style data-label");
    $("#k_TempSave .keditable").removeAttr("spellcheck contenteditable ondrag ondrop onpaste data-gramm data-lt-tmp-id");
    $(
        "#k_TempSave .kelement, #k_TempSave .koInModuleMenu, #k_TempSave .keditLinkEdit, #k_TempSave .keditPlaceholderEdit, #k_TempSave grammarly-btn, #k_TempSave grammarly-extension, #k_TempSave .google-auto-placed, #k_TempSave lt-highlighter, #k_TempSave editor-squiggler, #k_TempSave pwa-container-wrapper, #k_TempSave pwa-editor-bar-cnt"
    ).remove();
    keditImageTags = $("#k_TempSave img");
    if (a === "html") {
        keditImageTags.each(function () {
            if (!$(this).is("[src]") && $(this).is("[data-src]")) {
                $(this).attr("src", $(this).attr("data-src"));
            }
            $(this).removeAttr("data-src data-was-processed data-ll-status").removeClass("loaded lazy loading error entered exited");
        });
    } else {
        keditImageTags.each(function () {
            if (!$(this).is("[src]") && $(this).is("[data-src]")) {
                $(this).attr("src", $(this).attr("data-src"));
            }
            $(this).removeAttr("data-src data-was-processed data-ll-status");
            $(this).removeClass("loaded loading entered exited error lazy");
            if (!$(this).hasClass("nolazy") && lazyLoadEnabled == 1) {
                $(this).addClass("lazy");
                $(this).attr("data-src", $(this).attr("src"));
                $(this).removeAttr("src");
            }
        });
    }
    var i = $("#k_TempSave .keditImage").remove();
    if (i.length > 0) {
        $("#k_TempSave span.keditImageWrap").each(function () {
            $(this).replaceWith($(this).find("img"));
        });
    }
    $("#k_TempSave div.keditImageWrap").each(function () {
        var e = $(this).find("iframe");
        if (e.length > 0) {
            $(this).replaceWith('<div class="kvideo-centered">' + e.parent().html() + "</div>");
        } else {
            $(this).replaceWith($(this).find(".koSeparator").parent().html());
        }
    });
    $("#k_TempSave span.keditIconWrap").each(function () {
        $(this).replaceWith($(this).find("i:not(.systemicon)"));
    });
    $("#k_TempSave .keditInlineEdit").remove();
    $("#k_TempSave .kedit").each(function () {
        var e = "";
        $(this).removeAttr("data-was-processed data-ll-status");
        var l = $(this).attr("data-background"),
            t = $(this).attr("data-background-pos"),
            i = $(this).attr("data-bgcolor"),
            a = $(this).attr("data-bgradient"),
            r = "50% 0";
        if (typeof t !== "undefined") {
            keditBgPosition_ = t.split("-");
            t = keditBgPosition_[0];
            if (keditBgPosition_[1] != "") r = keditBgPosition_[1];
        }
        if (typeof l != "undefined" && l.length > 0) {
            if (lazyLoadEnabled == 1) {
                e += " url() ";
                $(this).addClass("lazy");
                $(this).attr("data-src", l);
            } else {
                e += " url(" + l + ") ";
                $(this).removeClass("lazy");
                $(this).removeAttr("data-src");
            }
            if (t == 2) {
                e += "left top repeat;";
            } else if (t == 3) {
                e += "left top repeat-x;";
            } else if (t == 4) {
                e += "left top repeat-y;";
            } else if (t == 5) {
                e += "center center no-repeat;";
            } else e += "no-repeat " + r + ";background-size:cover;";
        }
        if (typeof a != "undefined" && a.indexOf("/") > 0) {
            a = a.split("/");
            e += " linear-gradient(";
            if (a[2] == 1) e += "to bottom";
            else if (a[2] == 3) e += "to right";
            else if (a[2] == 5) e += "135deg";
            e += "," + a[0] + "," + a[1] + ");";
        }
        if (typeof i == "undefined") i = "";
        else {
            var o = i;
            if (i.indexOf("--color") > -1 && i.indexOf("var(") < 0) {
                o = "var(" + i + ")";
            }
            if (e == "") e += o;
            else e += ";background-color:" + o;
        }
        if (e.length > 3) e = "background:" + e;
        var n = $(this).attr("data-padding");
        if (typeof n !== "undefined") {
            n = n.split("-");
            e += ";padding-top:" + n[0] + "px;padding-bottom:" + n[1] + "px";
        }
        $(this).attr("style", e);
    });
    $("#k_TempSave .keditPlaceholder").each(function () {
        var e = $(this).find("span").text();
        $(this).replaceWith(e);
    });
    $("#k_TempSave .aos-init").removeClass("aos-init");
    $("#k_TempSave .aos-animate").removeClass("aos-animate");
    $("#k_TempSave .ui-sortable").removeClass("ui-sortable");
    $("#k_TempSave .keditableActive").removeClass("keditableActive");
    $("#k_TempSave #k_EditActive").remove();
    $("#k_TempSave .adminTip").remove();
    $("#k_TempSave #jsMenusSetup").remove();
    $("#k_TempSave .kedit-drag-widget,#k_TempSave .kedit-data-widget").remove();
    var t = $("#k_TempSave").html();
    $("#k_TempSave").remove();
    t = t.replace(' style="background:"', "");
    t = t.replace(' style=""', "");
    return t.trim();
}
function k_EditSave(e, a) {
    keditableToolbar("hide");
    if ($(".WxEditableArea").hasClass("WxNoSave")) return !0;
    $(window).unbind("beforeunload");
    $(window).on("beforeunload", function () {
        koShowLoading("unload");
        $(".active").removeClass("active");
    });
    $("#dragHelper").attr("rel", "");
    k_EditCancel();
    if (a != "noloading" && a != "startDraft") koShowLoading();
    if (typeof a === "string" && (a == "cancelDraft" || a == "startDraft")) {
    } else {
        koMenuLoading("undo");
    }
    $(".blockKeditActive").removeClass("blockKeditActive");
    $(".keditModuleEditPlaceholder").removeClass("keditModuleEditPlaceholder");
    var n = {},
        i = null;
    $("#contentArea,#footerContent").each(function () {
        i = k_RawHTML(this);
        if (i.trim() == "" && this.id == "contentArea") i = "";
        n[this.id] = i.trim();
        i = null;
    });
    var t = "id=" + jQuery("#content-id").val() + "&lang=" + jQuery("#lang-page").val() + "&supermode="+configUpdateType+"&liveEdit=1&liveOption=subpage&pageMenuId=" + menuMenuId + "&templateId="+templateId+"&pageId=" + menuPageId;
    if (typeof a === "string") {
        if (a == "publishDraft") {
            t += "&publishDraft=1";
        } else if (a == "cancelDraft") {
            t += "&cancelDraft=1";
        } else if (a == "startDraft") {
            t += "&startDraft=1";
        }
    }
    t += "&contentJSON=" + encodeURIComponent(JSON.stringify(n));
    jQuery.ajax({
        type: "POST",
        url: "admin/builder/submit",
        data: t,
        success: function (t) {
            if (t == "OK") {
                if (typeof a === "string" && a == "startDraft") {
                    koDraftInit(1);
                    return !0;
                } else if (typeof a === "string" && a == "cancelDraft") {
                    koDraftInit(2);
                    window.top.location.href = window.top.location.href;
                    return !0;
                } else if (e == "norefresh") {
                    koHideLoading();
                    if (typeof a === "string" && a == "publishDraft") {
                        koDraftInit(2);
                    }
                } else {
                    refreshWindow();
                }
            } else if (t == "OK-REFRESH") {
                refreshWindow();
            }

            if (e == 'reload')
            {
                window.location.reload()
            }
        },
    });
    n = {};
    t = null;
}
function koKeyFilter(e, a) {
    var t = $(e).val();
    if (t == "") $(a + " li").show();
    else {
        $(a + " li").hide();
        $(a + " li:containsi(" + t + ")").show();
    }
}
function koToolbarTabs_newContent(e) {
    var t = ID();
    if (typeof e === "undefined") {
        var a = $(".WxEditableArea");
        a.prepend('<nav class="keditSeparator kelement" id="' + t + '"></nav>');
    } else {
        var a = $(".WxEditableArea #" + e);
        a.before('<nav class="keditSeparator kelement" id="' + t + '"></nav>');
    }
    keditSeparatorMore(t);
}
function keditSeparatorAdd(e, a) {
    if (typeof inlineAdd == "string" && inlineAdd.length == 0) inlineAdd = "contentArea";
    if (typeof inlineAdd == "undefined" || inlineAdd == null) inlineAdd = "contentArea/";
    if (inlineAdd.indexOf("contentArea") > -1) {
        if (inlineAdd.indexOf("/") > -1) {
            $("#contentArea").append("<div class=keditItem></div>");
        } else {
            $("#contentArea").prepend("<div class=keditItem></div>");
        }
    } else {
        $("#" + inlineAdd).replaceWith("<div class=keditItem></div>");
    }
    $("#contentAreaElement").remove();
    $("#contentArea").prepend('<div id="contentAreaElement" class="kelement"></div>');
    var t = $(".keditItem");
    if (t.length > 0) t = t.offset().top - 100;
    else t = 0;
    $("html, body").animate({ scrollTop: t });
    koMenuClose();
    keditExtraAdd(e);
    keditSeparators();
    $("body").removeClass("koEditingMode");
}
function keditSeparatorModal_add(e, a) {
    if (a == "gallery") {
        var i = $("input[name=galleryEffect]:checked").val(),
            t = $("#galleryId_" + e).val();
        if (i == 2) t += ",slideshow";
        else if (i == 3) t += ",collage";
        else if (i == 20) t += ",vertical";
        else if (i == 21) t += ",horizontal";
        if (inlineAdd.indexOf("contentArea") > -1) {
            if (inlineAdd.indexOf("/") > -1) {
                $("#contentArea").append("<div class=keditItem></div>");
            } else {
                $("#contentArea").prepend("<div class=keditItem></div>");
            }
        } else $("#" + inlineAdd).replaceWith("<div class=keditItem></div>");
        updateNewKeditItem("{%" + t + "%}", "save");
        keditSeparators();
    }
}
function keditSeparatorModal(e) {
    var a = "";
    if (e == "gallery") {
        jQuery.ajax({
            type: "POST",
            url: "admin/builder/submit",
            data: "supermode=moduleInfo&liveEdit=" + encodeURIComponent(e),
            success: function (t) {
                if (loginFirst(t)) return;
                if (loginFirst(t)) {
                    return;
                }
                var c = "",
                    s = 0;
                if (t.indexOf("|") == 0) {
                    var n = t.split("|"),
                        l = "",
                        i = "",
                        o = n.length,
                        r = 0;
                    for (e = 0; e < o; e++) {
                        if (n[e].length > 0) {
                            r++;
                            i = n[e].split("#");
                            if (typeof i[1] === "undefined") i[1] = i[0];
                            if (i[1] == "gallery") continue;
                            l +=
                                '<input type="radio" name="galleryId" id="galleryId_' +
                                e +
                                '" value="' +
                                i[1] +
                                '"><label class="koBg2Hover" onclick="keditSeparatorModal_add(' +
                                e +
                                ",'gallery')\" for=\"galleryId_" +
                                e +
                                '"><span>' +
                                i[0] +
                                "</span></label>";
                            s++;
                        }
                    }
                    a += '<h3 class="koBg3" style="text-align:left;">' + langPhrase.galleryAdd + "</h3>";
                    a += '<div style="padding:30px;overflow:auto"><h4>' + langPhrase.galleryEffect + "</h4>";
                    a += '<input type="radio" name="galleryEffect" id="galleryEffect1" value="1" checked="checked"><label class="koBg2Hover"" for="galleryEffect1"><span>' + langPhrase.galleryDefault + "</span></label>";
                    a += '<input type="radio" name="galleryEffect" id="galleryEffect2" value="2"><label class="koBg2Hover"" for="galleryEffect2"><span>' + langPhrase.gallerySlideshow + "</span></label>";
                    a += '<input type="radio" name="galleryEffect" id="galleryEffect3" value="3"><label class="koBg2Hover" for="galleryEffect3"><span>' + langPhrase.galleryCollage + "</span></label>";
                    a += "</div>";
                    a += '<div style="padding:0 30px 30px;overflow:auto"><h4>' + langPhrase.galleryChoose + "</h4>";
                    a += l;
                    a += "</div>";
                } else alert(t);
            },
        });
    } else if (e == "submenu") {
        jQuery.ajax({
            type: "POST",
            url: "admin/builder/submit",
            data: "supermode=moduleInfo&liveEdit=" + encodeURIComponent(e),
            success: function (t) {
                if (loginFirst(t)) return;
                if (loginFirst(t)) {
                    return;
                }
                var c = "",
                    s = 0;
                if (t.indexOf("|") == 0) {
                    var n = t.split("|"),
                        l = "",
                        i = "",
                        o = n.length,
                        r = 0;
                    for (e = 0; e < o; e++) {
                        if (n[e].length > 0) {
                            r++;
                            i = n[e].split("#");
                            if (typeof i[1] === "undefined") i[1] = i[0];
                            if (i[1] == "menu") continue;
                            l +=
                                '<input type="radio" name="galleryId" id="galleryId_' +
                                e +
                                '" value="' +
                                i[1] +
                                '"><label class="koBg2Hover" onclick="keditSeparatorModal_add(' +
                                e +
                                ",'gallery')\" for=\"galleryId_" +
                                e +
                                '"><span>' +
                                i[0] +
                                "</span></label>";
                            s++;
                        }
                    }
                    a += '<h3 class="koBg3" style="text-align:left;">' + langPhrase.menuAdd + "</h3>";
                    a += '<div style="padding:30px;overflow:auto"><h4>' + langPhrase.displayMenu + "</h4>";
                    a += '<input type="radio" name="galleryEffect" id="galleryEffect1" value="20" checked="checked"><label class="koBg2Hover"" for="galleryEffect1"><span>' + langPhrase.vertical + "</span></label>";
                    a += '<input type="radio" name="galleryEffect" id="galleryEffect2" value="21"><label class="koBg2Hover"" for="galleryEffect2"><span>' + langPhrase.horizontal + "</span></label>";
                    a += "</div>";
                    a += '<div style="padding:0 30px 30px;overflow:auto"><h4>' + langPhrase.menuChoose + "</h4>";
                    a += l;
                    a +=
                        '<input type="radio" name="galleryId" id="galleryId_' +
                        e +
                        '" value="' +
                        i[1] +
                        '"><label class="koBg1Hover" onclick="keditSeparatorMore(0);koShowFrame(null,\'admin/builder/submit?e=menu\')" for="galleryId_' +
                        e +
                        '"><span><i class="fas fa-plus"></i> ' +
                        langPhrase.menuAdd +
                        "</span></label>";
                    a += "</div>";
                } else alert(t);
            },
        });
    }
}
function keditSeparatorMore(e) {
    koToolbar("hide");
    koHideFrame();
    if (e === 0) {
        $("body").removeClass("koEditingMode");
        return;
    }
}
function keditSeparators(e, a, t) {
    if (typeof skipInlineKeditSeparators !== "undefined") {
        return !0;
    }
    var i = !1;
    if (typeof e === "undefined") {
        $(".keditSeparator").remove();
        e = $(".kedit");
        i = !0;
    }
    $(e).each(function (e) {
        $(this).after(keditSeparatorCode(ID()));
    });
    $("#contentArea").prepend(keditSeparatorCode(ID()));
    e = $(".keditColumn .kedit:first-child");
    $(e).each(function (e) {
        $(this).before(keditSeparatorCode(ID()));
    });
    if (i) {
        $(".k_EditEmpty").remove();
        if ($("#footerContent .kedit").length == 0) $("#footerContent").append(keditSeparatorCode(null, "k_EditEmpty"));
        if ($("#contentArea .kedit").length == 0) $("#contentArea").append(keditSeparatorCode(null, "k_EditEmpty"));
    }
}
function keditAddItem(e, a) {
    if ($("#" + _id).length > 0) {
        $("#" + _id).replaceWith('<div class="keditItem"></div>');
    } else {
        $(".WxEditableArea").prepend('<div class="keditItem"></div>');
    }
}
function keditDraggable(e, a) {
    var i = "kpg_" + Math.round(1000000 * Math.random()),
        n = $(e).html();
    $(e).attr("id", i);
    n = "";
    if (typeof a !== "undefined" && a == "noedit") {
        k_EditCancel();
    } else {
        if ($(e).parents("#footerContent").length > 0) {
            keditPrepare(e, "footer");
        } else keditPrepare(e);
        if ($("#" + i).hasClass("keditRow")) {
            // setupDraggableAndSortable();
            keditPrepare(e.find(".kedit"));
        } else {
            var t = $("#" + i).find(".kapp");
            if (t.length > 0) {
                kappInit(t);
            }
            t = $("#" + i).find(".videoLightbox");
            if (t.length > 0) {
                t.koVideoLightbox();
            }
        }
        koHideLoading();
    }
    $("#k_Content,#k_Modules").removeClass("k_slideIn");
    $("#koLeftToolbar a").removeClass("kt_slideIn");
}
function loginFirst(e) {
    if (e == "<!--LOGIN-->") {
        /*window.location.href='index.php?open=login';*/ koHideLoading();
        $("#kedit_modulePromptClose").trigger("click");
        jQuery("#modal-FManager").modal("hide");
        updateNewKeditItem(null, "cancel");
        return !0;
    } else return !1;
}
function koEditLayout(e, a) {
    var l = 0,
        n = $(e).closest(".kedit"),
        t = n.attr("class").split(/\s+/);
    for (var i = 0; i < t.length; i++) {
        if (t[i].indexOf("keditLayout_") > -1) {
            l = 1;
            n.removeClass(t[i]);
            t = t[i].split("_");
            t = parseInt(t[1]) + 1;
            if (t > a) {
                t = 0;
            } else n.addClass("keditLayout_" + t);
        }
    }
    if (l == 0) n.addClass("keditLayout_1");
    k_EditSave("norefresh", "noloading");
}
function refreshSession() {
    clearTimeout(refreshTimeout);
    if ($("#k_FrameOverlay").is(":visible")) {
        refreshTimeout = setTimeout("refreshSession()", sessionRefreshRepeat);
        return;
    }
    $("#koSessionRefresh").fadeIn();
    jQuery.ajax({
        type: "POST",
        url: "admin/builder/submit",
        data: "supermode="+configUpdateType+"&alive=1",
        success: function (e) {
            $("#koSessionRefresh").fadeOut();
            if (e == "OK") {
                refreshTimeout = setTimeout("refreshSession()", sessionRefreshRepeat);
            } else {
                loginFirst("<!--LOGIN-->");
            }
        },
    });
}
function setupDraggableAndSortable() {
    if (typeof wizardMode !== "undefined") return !0;
    jQuery("#contentArea,.keditColumn").sortable({
        items: ".kedit",
        handle: ".k_Move",
        opacity: 1,
        helper: "clone",
        forceHelperSize: !0,
        forcePlaceholderSize: !0,
        placeholder: "wxSortPlaceholder",
        connectWith: "#contentArea,.keditColumn",
        sortablesConnectedTo,
        zIndex: 6555800,
        scrollSensitivity: 200,
        scroll: !0,
        revert: !0,
        start: function (e, a) {
            $("body").addClass("koEditableActive_4");
            a.placeholder.height(a.helper.outerHeight());
        },
        stop: function (e, a) {
            $("body").removeClass("koEditableActive_4");
            $(".koEditableActiveItem").removeClass("koEditableActiveItem");
        },
        update: function (e, a) {
            if (draggableType == "new") {
                draggableType = "";
            } else {
                setTimeout("k_EditSave('norefresh')", 300);
            }
            koToolbar("hide");
            keditSeparators();
        },
    });
    $("body").removeClass("keditLoading");
}
function koEmbedHTML() {
    jQuery.ajax({
        type: "POST",
        url: "admin/builder/submit",
        data: "supermode="+configUpdateType+"&liveEdit=1&liveEditEmbedB=" + encodeURIComponent(window.btoa($("#kedit_EmbedHTML").val())),
        success: function (e) {
            if (loginFirst(e)) return;
            if (e.indexOf("|") > 0) {
                e = e.split("|");
                if (e[0] == "OK") {
                    updateNewKeditItem("{%" + e[1] + "%}", "save");
                    $("#kedit_modulePrompt").fadeOut();
                }
            } else alert(e);
        },
    });
}
function saveCustomThemeCode() {
    koShowLoading();
    if (typeof koSourceEditor === "undefined") {
        var e = $("#customThemeCode").val();
    } else {
        var e = koSourceEditor.getValue();
    }
    jQuery.ajax({
        type: "POST",
        url: "admin/builder/submit",
        data: "supermode="+configUpdateType+"&iSplashTheme=" + templateId + "&iSplash=1&iSplashElement=customCode&content=" + encodeURIComponent(e) + "&pageMenuId=" + menuMenuId + "&pageId=" + menuPageId,
        success: function (e) {
            if (loginFirst(e)) return;
            if (e == "OK") {
                refreshWindow("open=info-saved");
            }
        },
    });
}
function koHideFrame() {
    $("#koFrameOverlay").removeClass("active");
    $("a.koToolbarTabsClose,a.koToolbarTabsApply,a.koToolbarTabsRemove").css({ left: "" });
    $("html, body").css("overflow", null);
    $("#koMoreFrame").html("");
    keditableToolbar("hide");
}
function koHideSettings() {
    koHideFrame();
    koToolbar("hide");
}
function koPageSettings() {
    koShowLoading();
    jQuery.ajax({
        type: "POST",
        url: "admin/builder/submit",
        data:
            "supermode="+configUpdateType+"&liveEdit=1&liveOption=config&title=" +
            encodeURIComponent($("#k_websiteTitle").val()) +
            "&slogan=" +
            encodeURIComponent($("#k_websiteSlogan").val()) +
            "&logo=" +
            encodeURIComponent($("#k_websiteLogo").val()) +
            "&pageMenuId=" +
            menuMenuId +
            "&pageId=" +
            menuPageId,
        success: function (e) {
            if (loginFirst(e)) return;
            if (e == "OK") {
                refreshWindow();
            } else alert(e);
        },
    });
}
var ccData = "";
function koColorSettings() {
    koShowLoading();
    jQuery.ajax({
        type: "POST",
        url: "admin/builder/submit",
        async: !1,
        data: "supermode="+configUpdateType+"&liveEdit=1&liveOption=colors&colorSchemeTemplate=4_0&colorScheme=4_0&pageMenuId=" + menuMenuId + "&pageId=" + menuPageId + "&templateId="+templateId+"&ccData=" + encodeURIComponent(ccData),
        success: function (e) {
            if (loginFirst(e)) return;
            if (e == "OK") {
                koHideLoading();
                koMenuClose();
                koMenuLoading("undo");
            } else alert(e);
        },
    });
}
function koMenuSettings() {
    jQuery.ajax({
        type: "POST",
        url: "admin/builder/submit",
        data:
            "supermode="+configUpdateType+"&liveEdit=1&showInMenu=" +
            encodeURIComponent($("#menuShowThisSubpage:checked").length) +
            "&isLandingPage=" +
            encodeURIComponent($("#menuLandingSubpage:checked").length) +
            "&isAccentPage=" +
            encodeURIComponent($("input[name=menuShowThisSubpageAsType]:checked").val()) +
            "&pageId=" +
            menuPageId +
            "&pageMenuId=" +
            menuMenuId +
            "&pageName=" +
            encodeURIComponent($("#k_subpageName").val()),
        success: function (e) {
            if (loginFirst(e)) return;
            if (e == "OK") {
                koShowLoading();
                refreshWindow();
            } else {
                alert(e);
            }
        },
    });
    return;
}
function createCookie(e, a, t) {
    if (t) {
        var i = new Date();
        i.setTime(i.getTime() + t * 24 * 60 * 60 * 1000);
        var n = "; expires=" + i.toGMTString();
    } else var n = "";
    document.cookie = e + "=" + a + n + "; path=/";
}
function changeMenuStyle(e) {
    $("#headerMenu").removeClass("koMenu1 koMenu2 koMenu3 koMenu4 koMenu5 koMenu6 koMenu7 koMenu8 koMenu9 koMenu9");
    var t = "menuClass",
        a = "";
    if (e > 0) {
        if (e == 10) {
            var a = "koMenu4 koMenu10";
        } else var a = "koMenu" + e;
        $("#headerMenu").addClass(a);
    }
    saveToTheme(t, a, 1);
    koToolbar("hide");
}
var logoAlignClass = $("#website").attr("class");
if (typeof logoAlignClass !== "string") {
    logoAlignClass = "";
}
logoAlignClass = logoAlignClass.toLowerCase();
function changeMenuLayout(e) {
    $("#website").removeClass("logoCentered logoRight logoLeft");
    var t = "headerClass",
        a = "";
    if (e == 1) {
        var a = "logoLeft";
        $("#website").addClass(a);
    } else if (e == 2) {
        var a = "logoCentered";
        $("#website").addClass(a);
    } else if (e == 3) {
        var a = "logoRight";
        $("#website").addClass(a);
    }
    logoAlignClass = a.toLowerCase();
    saveToTheme(t, a);
    koToolbar("hide");
}
function koBlockMove(e) {
    var t = $("#" + keditBlockId);
    if (e == 1) {
        var a = t.prev();
    } else {
        var a = t.next();
    }
    if (a.prop("tagName") != "SECTION") {
        if (e == 1) {
            var a = a.prev();
        } else {
            var a = a.next();
        }
    }
    if (a.prop("tagName") == "SECTION") {
        if (e == 1) {
            t.insertBefore(a);
        } else {
            t.insertAfter(a);
        }
        koMenuClose();
        keditSeparators();
        var i = t.offset();
        $("html, body").animate({ scrollTop: i.top - 100 });
        if (typeof lazyLoadInstance !== "undefined") lazyLoadInstance.update();
        t.find(".videoLightbox").koVideoLightbox();
    }
}
function koBlockClone(e) {
    $("#koBlockCopy").hide();
    var n = $("#" + keditBlockId),
        l = "kedit_" + ID();
    $("body").append('<div id="cloneBlock" style="display:none"></div>');
    $(n).clone().attr("id", l).appendTo("#cloneBlock");
    var i = k_RawHTML($("#cloneBlock"));
    $("#cloneBlock").remove();
    if (typeof e === "string") {
        var a = e.split("_");
        if (a[0] > 0 && a[1] > 0) {
            jQuery.ajax({
                type: "POST",
                url: "admin/builder/submit",
                data: "supermode="+configUpdateType+"&cloneToPage=" + encodeURIComponent(a[0] + "-" + a[1]) + "&blockHTML=" + encodeURIComponent(i),
                success: function (e) {
                    if (e == "OK") {
                        window.top.location = "index.php?p=" + a[0] + "_" + a[1];
                    } else alert(e);
                },
            });
        }
    } else {
        if (typeof e !== "undefined" && e == 1) n.after(i);
        else n.before(i);
        koMenuClose();
        var t = $("#" + l);
        keditDraggable(t);
        var o = t.offset();
        $("html, body").animate({ scrollTop: o.top - 100 });
        if (typeof lazyLoadInstance !== "undefined") lazyLoadInstance.update();
        t.find(".videoLightbox").koVideoLightbox();
    }
}
function saveToTheme(e, a, t, i) {
    jQuery.ajax({
        type: "POST",
        url: "admin/builder/submit",
        data: "supermode="+configUpdateType+"&iSplashTheme=1&iSplash=1&iSplashElement=" + encodeURIComponent(e) + "&pageMenuId=" + menuMenuId + "&pageId=" + menuPageId + "&templateId="+templateId+"&content=" + encodeURIComponent(a) + "&doBackup=" + encodeURIComponent(i),
        success: function (e) {
            if (loginFirst(e)) {
                return;
            }
            if (e == "OK") {
                if (t == 1) refreshWindow();
            } else alert(e);
        },
    });
}
function saveToThemeArray(e, a, t) {
    jQuery.ajax({
        type: "POST",
        url: "admin/builder/submit",
        data: "supermode="+configUpdateType+"&iSplashTheme=1&iSplash=1&iSplashElement=themeArray&pageMenuId=" + menuMenuId + "&pageId=" + menuPageId + "&templateId="+templateId+"&content=" + encodeURIComponent(JSON.stringify(e)) + "&doBackup=" + encodeURIComponent(t),
        success: function (e) {
            if (loginFirst(e)) {
                return;
            }
            if (e == "OK") {
                if (a == 1) refreshWindow();
            } else alert(e);
        },
    });
}
function changeTheme(e, a) {
    var i = 0;
    if ($("html").hasClass("koTheme4") && e != 4) {
        i = 1;
    } else if (e == 4) i = 1;
    if (e > 0) {
        var n = "htmlClass",
            t = "koTheme" + e;
        $("html").attr("class", t);
    } else {
        var n = "bodyClass",
            t = "koTheme" + e;
        if (e == "Dark" && a == !0) $("html").addClass(t);
        saveToTheme("koBodyDark", 1);
        if (e == "Dark" && a == !1) {
            $("html").removeClass(t);
            saveToTheme("koBodyDark", 0);
        }
    }
}
function koBlockRemove() {
    var e = $("#blockId").val();
    koHideSettings();
    keditableToolbar("hide");
    $("#" + e).slideUp(function () {
        $("#" + e).remove();
        setTimeout(function () {
            k_EditSave("norefresh", "noloading");
            keditSeparators();
            $(".k_EditEmpty").remove();
            if ($("#footerContent .kedit").length == 0) $("#footerContent").append(keditSeparatorCode(null, "k_EditEmpty"));
            if ($("#contentArea .kedit").length == 0) $("#contentArea").append(keditSeparatorCode(null, "k_EditEmpty"));
        }, 500);
    });
}
function koVideoSettings() {
    var e = koEmbedVideo($("#k_videoPath").val(), 1);
    if (!e) return !1;
    var a = $(inlineEditItem).parent().find("iframe");
    a.attr("src", e);
    k_EditSave("norefresh");
    koMenuClose();
}
function koLineSettings(e) {
    var a = $(inlineEditItem).parent().find(".koSeparator");
    if (e == "remove") {
        $(inlineEditItem).parent().remove();
    } else {
        var t = $("#koSep_Color").val();
        a.attr("data-bg", t);
        if ($("#koSep_WidthPx:visible").length > 0) {
            a.css("width", $("#koSep_Width_px").val());
            a.attr("data-width", null);
        } else {
            a.attr("data-width", $("#koSep_Width_percent").val());
            a.css("width", $("#koSep_Width_percent").val() + "%");
        }
        var i = $("#koSepAlign input:checked").attr("id");
        a.removeClass("koSeparatorLeft koSeparatorRight");
        if (i == "koSep_AlignLeft") a.addClass("koSeparatorLeft");
        else if (i == "koSep_AlignRight") a.addClass("koSeparatorRight");
        if (t.indexOf("--color") > -1) {
            t = "var(" + t + ")";
        }
        if ($("#koSep_Gradient:checked").val() > 0) {
            t = "linear-gradient(to right,transparent," + t + ",transparent)";
        }
        a.css({ height: $("#koSep_Height").val(), background: t, "margin-top": $("#koSep_MarginTop").val() + "px", "margin-bottom": $("#koSep_MarginBottom").val() + "px" });
    }
    k_EditSave("norefresh");
    koMenuClose();
}
function koImageSettings() {
    var a = $(inlineEditItem).parent().find("img");
    a.attr({ src: $("#k_imagePath").val(), alt: $("#k_imageAlt").val(), title: $("#k_imageTitle").val() });
    var o = $("#k_imageLinkHrefSwitch").prop("checked"),
        e = a.parent().parent();
    if (e.prop("tagName") == "A") {
        var i = "";
        if (o == !0) {
            var t = $("#k_imageLinkHref").val();
            e.attr("href", t);
            i = t.substr(t.lastIndexOf(".") + 1);
            i = i.toLowerCase();
            if (t.indexOf("www.youtube.com/watch?") > 1 || t.indexOf("youtu.be/") > 1 || t.indexOf("vimeo.com/") > 1) {
                e.addClass("videoLightbox");
                var l = !0;
            } else {
                if (e.hasClass("videoLightbox")) {
                    e.find(".koVideoPlay").remove();
                    var l = !0;
                }
                e.removeClass("videoLightbox");
            }
        } else {
            if (e.hasClass("videoLightbox")) {
                e.find(".koVideoPlay").remove();
            }
            $(e).replaceWith(e.html());
        }
        e = a.parent().parent();
        if ($("#k_imageLinkBlank:checked").val() > 0) {
            if (i == "jpg" || i == "jpeg" || i == "png") {
                e.removeAttr("target");
                e.addClass("lightbox");
                a.attr("data-lightbox", 1);
            } else {
                e.attr("target", "_blank");
                e.removeClass("lightbox").off();
                a.attr("data-lightbox", null);
            }
        } else {
            if (e.attr("target") == "_blank") e.attr("target", null);
            e.removeClass("lightbox").off();
            a.attr("data-lightbox", null);
        }
    } else {
        if (o == !0) {
            e = a.parent();
            if ($("#k_imageLinkHref").val().indexOf("www.youtube.com/watch?") > 1) {
                var n = ' class="videoLightbox"',
                    l = !0;
            } else var n = "";
            if ($("#k_imageLinkBlank:checked").val() > 0) {
                n += " target='_blank'";
            }
            $(e).wrap('<a href="' + $("#k_imageLinkHref").val() + '"' + n + "></a>");
        }
    }
    if (typeof l !== "undefined") $("a.videoLightbox").koVideoLightbox();
    k_EditSave("norefresh");
    koMenuClose();
}
function koLinkGoto() {
    if ($("#k_linkType_1").is(":checked")) {
        $("#koLinkGotoClicker").attr({ target: null, href: "javascript:void(null)" });
        window.top.location.href = $("#k_linkHref").val();
    } else if ($("#k_linkType_2").is(":checked")) {
        $("#koLinkGotoClicker").attr({ target: null, href: "javascript:void(null)" });
        window.top.location.href = $("#k_linkPage").val();
    } else if ($("#k_linkType_3").is(":checked")) {
        $("#koLinkGotoClicker").attr({ target: null, href: "javascript:void(null)" });
        koLinkSettingsSection();
    } else if ($("#k_linkType_4").is(":checked")) {
        $("#koLinkGotoClicker").attr({ target: null, href: "mailto:" + $("#k_linkEmail").val() });
    } else if ($("#k_linkType_5").is(":checked")) {
        $("#koLinkGotoClicker").attr({ target: null, href: "tel:" + $("#k_linkPhone").val() });
    } else if ($("#k_linkType_6").is(":checked")) {
        $("#koLinkGotoClicker").attr({ href: "" + $("#k_linkFile").val(), target: "_blank" });
    }
}
function koLinkSettings() {
    var e = $(inlineEditLink).parent("a"),
        n = "",
        o = 0;
    if ($("#k_linkType_1").is(":checked")) {
        var t = $("#k_linkHref").val();
        if (t.indexOf("www.") === 0) {
            t = "https://" + t;
        }
        n = t.substr(t.lastIndexOf(".") + 1);
        n = n.toLowerCase();
        e.attr("href", t);
        o = 1;
    } else if ($("#k_linkType_2").is(":checked")) {
        e.attr("href", $("#k_linkPage").val());
        o = 1;
    } else if ($("#k_linkType_3").is(":checked")) {
        e.attr("href", "#" + $("#k_linkSection").val());
        o = 1;
    } else if ($("#k_linkType_4").is(":checked")) {
        var d = $("#k_linkEmail").val();
        d = d.replace(/[^a-zA-Z0-9_.+-\@]/gm, "");
        e.attr("href", "mailto:" + d);
    } else if ($("#k_linkType_5").is(":checked")) {
        var f = $("#k_linkPhone").val();
        f = f.replace(/[^0-9]/gm, "");
        e.attr("href", "tel:" + f);
    } else if ($("#k_linkType_6").is(":checked")) {
        e.attr("href", $("#k_linkFile").val());
        o = 1;
        var t = $("#k_linkFile").val();
        n = t.substr(t.lastIndexOf(".") + 1);
        n = n.toLowerCase();
    }
    if ($("#k_linkBlank:checked").val() > 0 && o > 0) {
        if (n == "jpg" || n == "jpeg" || n == "png") {
            e.removeAttr("target");
            e.addClass("lightbox");
        } else {
            e.attr("target", "_blank");
            e.removeClass("lightbox").off();
        }
    } else {
        if (e.attr("target") == "_blank") e.attr("target", null);
        e.removeClass("lightbox").off();
    }
    var h = e.find("span"),
        m = e.find("em");
    if ($("#k_linkTitle").length > 0 && h.length > 0) {
        h.html("<strong>" + $("#k_linkTitle").val() + "</strong>" + $("#k_linkText").val());
        if ($("#k_linkImage").length > 0 && m.length > 0) {
            m.attr("style", "background-image:url(" + $("#k_linkImage").val() + ")");
        }
    } else {
        var c = $("#k_linkText").val(),
            p = $("input[name=k_linkIcon]:checked").val();
        if (p > 1) {
            var l = $("#koToolbar_linkIconSelect").find(".iconpicker-selected");
            if (l.length > 0) {
                var s = e.attr("class");
                if (typeof s !== "undefined" && s.indexOf("btn") > -1) {
                    if (s.indexOf("btn-xl") > -1 || s.indexOf("btn-lg") > -1) var a = "3";
                    else var a = "2";
                } else {
                    var a = "1";
                }
                var u = e.find("i");
                if (u.length > 0) {
                    var r = u.attr("class");
                    for (i = 1; i < 6; i++) {
                        if (r.indexOf("mr-" + i) > -1) {
                            a = i;
                            break;
                        }
                        if (r.indexOf("my-" + i) > -1) {
                            a = i;
                            break;
                        }
                        if (r.indexOf("ms-" + i) > -1) {
                            a = i;
                            break;
                        }
                        if (r.indexOf("ml-" + i) > -1) {
                            a = i;
                            break;
                        }
                    }
                }
                l = l.find("i");
                l = l.attr("class");
                if (p == 2) {
                    c = '<i class="' + l + " mr-" + a + " my-" + a + '"></i>' + c;
                } else {
                    c += '<i class="' + l + " ml-" + a + " my-" + a + '"></i>';
                }
            }
        }
        e.html(c);
    }
    e.editableLinks();
    k_EditSave("norefresh");
    koMenuLoading("saved");
    koMenuClose();
}
function koBlockSettings(e) {
    var n = keditBlockId,
        t = $("#" + n);
    t.removeClass("keditDisplay-m keditDisplay-mt keditDisplay-md keditDisplay-mtd keditDisplay-t keditDisplay-td keditDisplay-d keditDisplay-none");
    if ($("#blockVisibility").prop("checked")) {
    } else {
        if ($("#blockVisibilityM:checked").length > 0 && $("#blockVisibilityT:checked").length > 0 && $("#blockVisibilityD:checked").length > 0) {
        } else {
            var u = "keditDisplay-";
            if ($("#blockVisibilityM:checked").length > 0) u += "m";
            if ($("#blockVisibilityT:checked").length > 0) u += "t";
            if ($("#blockVisibilityD:checked").length > 0) u += "d";
            if (u == "keditDisplay-") u += "none";
            t.addClass(u);
        }
    }
    var s = $("#blockBackground").val(),
        m = $("#blockBackgroundImage").val(),
        c = $("#blockBackgroundPosition").val(),
        a = "",
        i = "",
        l = "";
    t.css("box-shadow", null);
    blockDarkCheck(1);
    if (m.length > 0) {
        t.attr("data-background", m);
        a = a + " url(" + m + ") ";
        if (c == 1) {
            a += "no-repeat " + $("#blockBackgroundPosition_align").val() + ";background-size:cover;";
            $("#blockBackgroundPosition_align").removeClass("d-none");
        } else {
            $("#blockBackgroundPosition_align").addClass("d-none");
            if (c == 2) {
                a += "left top repeat;";
            } else if (c == 3) {
                a += "left top repeat-x;";
            } else if (c == 4) {
                a += "left top repeat-y;";
            } else if (c == 5) {
                a += "center center no-repeat;";
            }
        }
        i += ' data-background="' + m + '"';
        i += ' data-background-pos="' + c + "-" + $("#blockBackgroundPosition_align").val() + '"';
        t.attr("data-background-pos", c + "-" + $("#blockBackgroundPosition_align").val());
    } else {
        t.attr("data-background", null).attr("data-src", null).removeClass("lazy");
    }
    var f = $("#blockBackgroundGradient_from").val(),
        d = $("#blockBackgroundGradient_to").val();
    if (typeof f == "undefined" || f == "") f = "transparent";
    if (typeof d == "undefined" || d == "") d = "transparent";
    if (f == "transparent" && d == "transparent") {
        t.removeAttr("data-bgradient");
    } else {
        t.attr("data-bgradient", f + "/" + d + "/1");
        a = "linear-gradient(to bottom," + f + "," + d + ");";
    }
    if (s.length > 0) {
        var y = s;
        if (s.indexOf("--color") > -1 && s.indexOf("var(") < 0) {
            y = "var(" + s + ")";
        }
        t.attr("data-bgcolor", s);
        if (a == "") a += y;
        else a += "background-color:" + y;
        i += ' data-bgcolor="' + s + '"';
    } else t.attr("data-bgcolor", null);
    if ($("#blockParallax:checked").length > 0) {
        i += ' data-parallax="1" ';
        l += " parallax-window ";
    }
    if ($("#blockDark:checked").length > 0) {
        l += " keditDark ";
    }
    if ($("#blockShadows:checked").length > 0) {
        l += " keditTextShadow ";
    }
    if ($("#blockDefaultPadding:checked").length > 0) {
        t.attr("data-padding", null);
    } else {
        var k = $("#koBlockPaddingTop").text().replace("px", ""),
            v = $("#koBlockPaddingBottom").text().replace("px", "");
        t.attr("data-padding", k + "-" + v);
        i += ' data-padding="' + k + "-" + v + '" ';
        a = a + ";padding-top:" + k + "px;padding-bottom:" + v + "px;";
    }
    t.find(".keditLayer_video").remove();
    if ($("#blockVideoBG").val() == "") {
    } else {
        var g = $("#blockVideoBG").val(),
            h = "",
            b = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/,
            o = g.match(b);
        if (o && o[2].length == 11) {
            h = "https://www.youtube-nocookie.com/embed/" + o[2] + "?playlist=" + o[2] + "&iv_load_policy=3&enablejsapi=1&disablekb=1&autoplay=1&controls=0&mute=1&showinfo=0&rel=0&loop=1&widgetid=1&autohide=1&modestbranding=1";
        } else {
            b = /(?:vimeo)\.com.*(?:videos|video|channels|)\/([\d]+)/i;
            o = g.match(b);
            if (o && o.length > 0) var h = "https://player.vimeo.com/video/" + o[1] + "?autoplay=1&loop=1";
        }
        if (h == "") {
        } else {
            t.append('<div class="keditLayer_overlay keditLayer_video" data-video="' + g + '"><iframe src="' + h + '" allow="autoplay;"></iframe></div>');
        }
    }
    if ($("#blockDividers:checked").length > 0) {
        blockDividers("apply");
    } else {
        t.find(".keditLayer_footer").remove();
        t.find(".keditLayer_header").remove();
    }
    $("#blockBG_more").hide();
    if ($("#" + n).hasClass("keditLeft") && n != "headerContent") {
        i += ' data-align="keditLeft" ';
        l += " keditLeft ";
    } else if ($("#" + n).hasClass("keditRight") && n != "headerContent") {
        i += ' data-align="keditRight" ';
        l += " keditRight ";
    }
    if ($("#blockFilter:checked").val() > 0) {
        l += " kfilter" + $("#blockFilterOption").val() + " ";
    }
    if (l.length > 0) l = ' class="' + l + '"';
    if (n != "body") i += l;
    $("#" + n).attr("style", "background:" + a);
    if (n == "footerContent") {
        var p = "footerData";
        saveToTheme(p, i + ' style="background:' + a + '"');
    } else if (n == "body") {
        var p = "bodyData";
        saveToTheme(p, i + ' style="background:' + a + '"');
    } else if (n == "headerContent") {
        var p = "headerData";
        saveToTheme(p, i + ' style="background:' + a + '"');
        var w = " ";
        saveToTheme("headerFilter", w);
    } else {
        var r = $("#koContentBlock_id").text(),
            x = $("#koContentBlock_idBak").text();
        r = r.replace(/[^a-zA-Z0-9\_]/gm, "-");
        r = r.replace(/^\-+|\-+$/g, "");
        if (r !== x) {
            if ($("#" + r).length > 0) {
            } else {
                $("#" + n).attr("id", r);
            }
        }
    }
    k_EditSave("norefresh");
    $(window).trigger("resize");
    if (e != 1) koMenuClose();
}
function koBlockHashPreview() {
    var e = $("#koContentBlock_id").text();
    e = e.replace(/[^a-zA-Z0-9\_]/gm, "-");
    e = e.replace(/^\-+|\-+$/g, "");
    window.history.pushState({}, "", koUrl_page + "#" + e);
}
function koBlockInit() {
    var e = keditBlockId,
        p = $("#" + e),
        x = e,
        o = p,
        r = o.attr("data-label");
    keditableToolbar("hide");
    koMenuOpen("block");
    $("#blockEditButton_after,#blockEditButton_before").html(null);
    var h = o.find(".koparsed"),
        c = "",
        t = "";
    if (h.length > 0) {
        h.each(function () {
            var e = $(this).attr("rel");
            e = e.split("_");
            var a = "admin/builder/submit?p=quickEdit&module=" + e[0];
            if (e.length > 1) {
                a += "&item=" + e[1];
            }
            if (typeof langPhrase[e[0]] == "undefined") {
                t = e[0];
                t = t[0].toUpperCase() + t.slice(1);
                t = t.split("_");
                t = t[0];
            } else t = langPhrase[e[0]];
            if (h.length == 1) {
                if (e[0] == "elfsight") {
                    c +=
                        "<a href=\"javascript:void(null)\" onclick=\"$(this).attr({'href':'https://apps.elfsight.com/panel/applications/?affise_offer_id=4&affise_pid=39','target':'_blank'});koMenuClose();\" class=\"accent\"><i class=\"fas fa-edit\"></i> " +
                        langPhrase.edit +
                        ' <strong style="font-weight:var(--ui-font-bold)">' +
                        t +
                        "</strong></a>";
                } else if (e[0] == "sitemap" || e[0] == "submenu") {
                    c +=
                        '<a href="javascript:void(null)" class="accent" onclick="$(\'#koMenuItem_settings\').click()"><i class="fas fa-edit"></i> ' +
                        langPhrase.edit +
                        ' <strong style="font-weight:var(--ui-font-bold)">' +
                        t +
                        "</strong></a>";
                } else {
                    c += '<a href="javascript:void(null)" class="accent" onclick="koSideFrame(null,\'' + a + '\')"><i class="fas fa-edit"></i> ' + langPhrase.edit + ' <strong style="font-weight:var(--ui-font-bold)">' + t + "</strong></a>";
                }
            } else {
                if (e[0] == "sitemap" || e[0] == "submenu") {
                    c += '<a href="javascript:void(null)" onclick="$(\'#koMenuItem_settings\').click()">' + t + "</a>";
                } else {
                    c += '<a href="javascript:void(null)" onclick="koSideFrame(null,\'' + a + "')\">" + t + "</a>";
                }
            }
        });
        if (typeof r !== "undefined") {
            if (r.toLowerCase().indexOf("footer") > -1) {
                var r = "footer";
            }
        }
        var g = '<div class="koMenuSeparator my-3"></div>';
        if (r == "footer" && $("#koBlockFooterContents_button").length == 0) {
            g = "";
        }
        if (h.length == 1) $("#blockEditButton_after").html(g + c);
        else $("#blockEditButton_after").html(g + '<div class="koMenuTabsGroup"><div class="koMenuTabsTitle"><i class="fas fa-star"></i> ' + langPhrase.appsOnThisBlock + "</div>" + c + "</div>");
    }
    var f = o.attr("data-bgcolor");
    if (typeof f !== "undefined" && f.length > 0) {
        var s = f;
        if (f.indexOf("--color") > -1) {
            s = "var(" + f + ")";
        }
        $("#blockBackground").val(f).css({ "background-color": s });
        $(".koColor,.blockColorPreview").css("background-color", s);
    } else {
        $("#blockBackground").val("").css({ "background-color": "", color: "" });
        $(".koColor,.blockColorPreview").css("background-color", "#fff");
    }
    var u = o.attr("data-background"),
        l = o.attr("data-background-pos");
    $(".blockButtonRemoveImage").hide();
    if (typeof s == "undefined") s = "#fff";
    else {
        $(".blockButtonRemoveImage").show();
    }
    if (typeof u !== "undefined" && u.length > 0) {
        $("#blockBackgroundImage").val(u);
        $(".blockButtonRemoveImage").show();
        $("#preview_blockBackgroundImage").attr("src", u);
        $("#bgPreview_blockBackgroundImage").css({ "background-image": "url(" + u + ")", "background-size": "cover", "background-color": s });
    } else {
        $("#blockBackgroundImage").val("");
        $("#preview_blockBackgroundImage").attr("src", defaultImage);
        $("#bgPreview_blockBackgroundImage").css({ "background-image": "url(" + defaultImage + ")", "background-size": "100px", "background-color": s });
    }
    $("#blockBackgroundPosition").val(1);
    $("#blockBackgroundPosition_align").val("50% 0").removeClass("d-none");
    if (typeof l !== "undefined") {
        l = l.split("-");
        if (l[0] > 0) {
            $("#blockBackgroundPosition").val(l);
            if (l[0] > 1) {
                $("#blockBackgroundPosition_align").addClass("d-none");
            }
        }
        var y = o.attr("style");
        if (l[1] != "undefined" && typeof l[1] !== "undefined" && l[1] != "") {
            $("#blockBackgroundPosition_align").val(l[1]);
        }
    }
    $("#blockGradients").hide();
    var n = o.attr("data-bgradient");
    if (typeof n !== "undefined" && n.length > 0) {
        n = n.split("/");
        $("#blockBackgroundGradient_from").val(n[0]);
        $("#blockBackgroundGradient_to").val(n[1]);
        $("#blockBackgroundGradient_from .blockColorPreview").css("background-color", n[0]);
        $("#blockBackgroundGradient_to .blockColorPreview").css("background-color", n[1]);
        var m = "";
        m += "linear-gradient(to right,";
        m += n[0] + "," + n[1] + ")";
        $("#blockBackgroundGradient_preview").css("background", m);
        $("#blockGradients").show();
        $(".blockButtonRemoveImage").show();
    } else {
        $("#blockBackgroundGradient_preview .blockColorPreview").css("background-color", "#fff");
        $("#blockBackgroundGradient_preview").css("background", "#fff");
        $("#blockBackgroundGradient_from").val("");
        $("#blockBackgroundGradient_to").val("");
    }
    if ($("#blockBG_more").is(":visible")) $("#blockGradients").show();
    $("#ffilepath_blockBackgroundImage,#ffilepath2_blockBackgroundImage").hide();
    if (o.hasClass("parallax")) $("#blockParallax").prop("checked", !0);
    else $("#blockParallax").prop("checked", !1);
    if (o.hasClass("keditFullHeight")) $("#blockFullHeight").prop("checked", !0);
    else $("#blockFullHeight").prop("checked", !1);
    var i = o.attr("class");
    if (i.indexOf("keditDisplay-") > -1) {
        $("#blockVisibility,#blockVisibilityM,#blockVisibilityT,#blockVisibilityD").prop("checked", !1);
        if (i.indexOf("keditDisplay-m") > -1 || i.indexOf("keditDisplay-mt") > -1 || i.indexOf("keditDisplay-md") > -1) {
            $("#blockVisibilityM").prop("checked", !0);
        }
        if (i.indexOf("keditDisplay-t") > -1 || i.indexOf("keditDisplay-mt") > -1 || i.indexOf("keditDisplay-td") > -1) {
            $("#blockVisibilityT").prop("checked", !0);
        }
        if (i.indexOf("keditDisplay-d") > -1 || i.indexOf("keditDisplay-md") > -1 || i.indexOf("keditDisplay-td") > -1) {
            $("#blockVisibilityD").prop("checked", !0);
        }
    } else {
        $("#blockVisibility,#blockVisibilityM,#blockVisibilityT,#blockVisibilityD").prop("checked", !0);
    }
    $("#blockCustomVisibility").show();
    blockVisibilityCheck();
    $("#blockFilterOptions").hide();
    if (e == "footerContent") {
        $("#footerBlockSettings").show();
    } else {
        $("#footerBlockSettings").hide();
    }
    if ($("#blockBackgroundImage").val().length == 0 || e == "body") {
        $("#blockParallaxCheckbox").hide();
    } else {
        $("#blockParallaxCheckbox").show();
    }
    $("#blockFilterCheckbox").show();
    $("html, body").animate({ scrollTop: $("#" + e).offset().top - 100 });
    if (typeof $("#" + e).attr("data-parallax") === "undefined") $("#blockParallax").prop("checked", !1);
    else $("#blockParallax").prop("checked", !0);
    $("#koBlockBody_input").hide();
    if ($("#" + e).hasClass("keditDark")) {
        $("#blockDark").prop("checked", !0);
    } else $("#blockDark").prop("checked", !1);
    if ($("#" + e).hasClass("keditTextShadow")) {
        $("#blockShadows").prop("checked", !0);
    } else $("#blockShadows").prop("checked", !1);
    let firstDiv = $("#" + e + " > div:not(.kelement):first");
    $("#blockContainerCheckbox").show();
    $("#blockContainer").prop("checked", !1);
    if (firstDiv.hasClass("container")) $("#blockContainer").prop("checked", !0);
    else if (!firstDiv.hasClass("no-container") && !firstDiv.hasClass("container-fluid")) $("#blockContainerCheckbox").hide();
    if (
        $("#" + e)
            .closest("section")
            .attr("data-keditor")
    ) {
        $("#blockEditButton_cbDesigner").show();
    } else {
        $("#blockEditButton_cbDesigner").hide();
    }
    $("#koBlockClone_button,#koBlockMoveHigher_button,#koBlockMoveLower_button").show();
    $("#koBlockCopy,#koBlockFooterContents_button,#koBlockFooterColors_button").hide();
    if (typeof r !== "undefined") {
        if (r.toLowerCase().indexOf("footer") > -1) {
            var r = "footer";
        }
        if (r == "footer") {
            $("#koBlockClone_button,#koBlockMoveHigher_button,#koBlockMoveLower_button").hide();
            $("#koBlockFooterContents_button,#koBlockFooterColors_button").show();
            $("#blockCustomVisibility").hide();
        }
    }
    blockDefaultPadding("init");
    blockDividers("init");
    $("#blockVideoBG").val("");
    if ($("#" + e).find(".keditLayer_video").length > 0) {
        var v = $("#" + e).find(".keditLayer_video");
        $("#blockVideoBG").val(v.attr("data-video"));
    }
    $("#blockZeroPaddingCheckbox").hide();
    $("#koBlockAlign_input").hide();
    if (e.indexOf("kpg_") > -1 && (p.hasClass("keditLeft") || p.hasClass("keditRight"))) {
        var d = $("#koBlockAlign_input");
        d.show();
        d.find("a").removeClass("active");
        if (p.hasClass("keditLeft")) d.find("a:eq(0)").addClass("active");
        else if (p.hasClass("keditRight")) d.find("a:eq(2)").addClass("active");
        else d.find("a:eq(1)").addClass("active");
    }
    $("#blockZeroPaddingCheckbox,#blockEditButton_HTML").show();
    $("#koContentBlock_info").hide();
    if (e == "footerContent") {
        $("#koBlockBody_input").show();
        $("#blockMoreSettings_footer,#blockEditButton_HTML,#blockZeroPaddingCheckbox").hide();
        $("#blockMoreSettings_header,#blockMoreSettings_body").show();
    }
    if (e == "headerContent") {
        $("#koBlockBody_input").show();
        $("#blockMoreSettings_header,#blockEditButton_HTML").hide();
        $("#blockMoreSettings_footer,#blockMoreSettings_body").show();
        $("#koBlockSettingsHolder").show();
        $("#koBlockContentsHolder").show();
        $("#splashBlockSettings").hide();
    } else {
        $("#splashBlockSettings").hide();
        $("#koBlockSettingsHolder").show();
    }
    $("#koContentBlock_id,#koContentBlock_idBak").html(e);
    var b = $("#" + e).attr("data-pcid"),
        k = $("#" + e).parent();
    if (k.attr("id") != "footerContent") $("#koContentBlock_info").show();
    if (typeof b !== "undefined") $("#koContentBlock_cb").html("#" + b);
    else $("#koContentBlock_cb").html("unknown");
    if (e == "body") {
        $("#blockDarkCheckbox,#blockFilterCheckbox,#blockZeroPaddingCheckbox,#blockEditButton_HTML").hide();
        $("#blockEditButton,#blockColumnsNavigation").hide();
        $("#blockMoreSettings_body").hide();
        $("#blockMoreSettings_footer,#blockMoreSettings_header,#koBlockBody_input").show();
    } else if ($("#" + e).hasClass("keditRow")) {
        $("#blockEditButton").parent().hide();
        $("#blockColumnsNavigation").show();
    } else {
        $("#blockEditButton").parent().show();
        $("#blockColumnsNavigation").hide();
        $("#blockEditButton").show();
    }
    var a = $("#" + e).attr("class");
    if (typeof a === "undefined") a = "";
    a = a.toLowerCase();
    if (a.indexOf("kfilter") >= 0) {
        $("#blockFilter").prop("checked", !0);
        $("#blockFilterOptions").show();
        a = a.split("kfilter");
        a = a[1].split(" ");
        a = a[0];
        if (a === "color1") a = "Color1";
        else if (a === "color2") a = "Color2";
        $("#blockFilterOption_" + a).prop("selected", !0);
    } else {
        $("#blockFilter").prop("checked", !1);
        $("#blockFilterOptions").hide();
    }
}
function imageFilterCheck(e) {
    if (e == "video") {
        var a = "k_videoStyle",
            t = $(inlineEditItem).parent().find("iframe");
    } else {
        var a = "k_imageStyle",
            t = $(inlineEditItem).parent().find("img");
    }
    var i = $("#" + a).val();
    t.removeClass("kimgfilter kimgfilter1 kimgfilter2 kimgfilter3 kimgfilter4 kimgfilter5 kimgfilter6 kimgfilter7 kimgfilter8");
    if ($("#" + a).val() > 0) t.addClass("kimgfilter" + $("#" + a).val());
}
function imageRatioCheck(e) {
    var a = $(inlineEditItem).parent().parent();
    if (a.prop("tagName") == "A") a = a.parent();
    var t = a.attr("class");
    if (t.indexOf("kimgRatio") > -1) {
        a.removeClass("kimgRatio kimgRatio1 kimgRatio2 kimgRatio3 kimgRatio4 kimgRatio5 kimgRatio6 kimgRatio7 kimgRatio8");
        a.addClass("kimgRatio" + $("#k_imageRatio").val());
    }
}
function blockVisibilityCheck() {
    if ($("#blockVisibility:checked").length > 0) {
        $("#blockCustomVisibility").removeClass("active");
        $("#blockVisibilityOptions").addClass("d-none");
    } else {
        $("#blockCustomVisibility").addClass("active");
        $("#blockVisibilityOptions").removeClass("d-none");
    }
}
function blockFilterCheck(e) {
    var a = $("#blockId").val();
    $("#" + a).removeClass("kfilter1 kfilter2 kfilter3 kfilter4 kfilter5 kfilter6 kfilter11 kfilter12 kfilter13 kfilter14 kfilter15 kfilter16 kfilter21 kfilter22 kfilter23 kfilter24 kfilterColor1 kfilterColor2 kfiltercolor1 kfiltercolor2");
    if (e == 1) $("#blockFilter").prop("checked", !0);
    if ($("#blockFilter:checked").val() > 0) {
        $("#" + a).addClass("kfilter" + $("#blockFilterOption").val());
        $("#blockFilterOptions").show();
    } else $("#blockFilterOptions").hide();
    if (a == "headerContent" || a == "footerContent") koBlockSettings();
    else setTimeout("k_EditSave('norefresh');", 500);
}
function blockParallaxCheck() {
    var e = $("#blockId").val();
    if ($("#blockParallax:checked").val() > 0) {
        $("#" + e)
            .attr({ "data-parallax": 1 })
            .addClass("parallax-window")
            .parallax();
    } else {
        $("#" + e)
            .attr({ "data-parallax": null })
            .removeClass("parallax-window")
            .parallax("destroy");
    }
    if (e == "headerBanner" || e == "footerContent") koBlockSettings();
    else setTimeout("k_EditSave('norefresh');", 500);
}
function blockContainerCheck() {
    var e = $("#blockId").val();
    if ($("#blockContainer:checked").val() > 0) {
        $("#" + e + " div.no-container,#" + e + " div.container-fluid")
            .addClass("container")
            .removeClass("no-container")
            .removeClass("container-fluid");
    } else {
        $("#" + e + " div.container")
            .addClass("no-container")
            .removeClass("container");
    }
}
function blockDarkCheck(e) {
    var a = $("#blockId").val();
    if ($("#blockDark:checked").val() > 0) {
        $("#" + a).addClass("keditDark");
    } else {
        $("#" + a).removeClass("keditDark");
    }
    if ($("#blockShadows:checked").val() > 0) {
        $("#" + a).addClass("keditTextShadow");
    } else {
        $("#" + a).removeClass("keditTextShadow");
    }
    if (typeof e === "undefined") koBlockSettings(1);
}
function blockZeroPadding() {
    var e = $("#blockId").val();
    if ($("#blockZeroPadding:checked").val() > 0) {
        $("#" + e).addClass("koZeroPadding");
    } else {
        $("#" + e).removeClass("koZeroPadding");
    }
    koBlockSettings(1);
}
function koSliderInit(e, a, t) {
    console.log("#" + e + "_slider")
    console.log()
    console.log(jQuery("#" + e + "_slider"))
    // if ($("#" + e + "_slider .ui-slider-handle").length > 0) $("#" + e + "_slider").slider("destroy");
    if (!$("#" + e + "_slider").length)
        return;
    
    jQuery("#" + e + "_slider").slider({
        min: 0,
        max: 300,
        value: a,
        step: 10,
        slide: function (a, i) {
            $("#" + e).text(i.value + "px");
            $("#" + keditBlockId).css(t, i.value);
            if ($("#" + keditBlockId).hasClass("p-0")) $("#" + keditBlockId).removeClass("p-0");
        },
    });
    $("#" + e).text($("#" + e + "_slider").slider("value") + "px");
}
jQuery.fn.outerHTML = function () {
    return jQuery("<div />").append(this.eq(0).clone()).html();
};
function blockDividers_apply() {
    blockDividers("apply");
}
function blockDividers(e) {
    if ($("#blockDividers:checked").val() > 0) {
        $("#blockBackgroundDividers").addClass("active");
    } else {
        $("#blockBackgroundDividers").removeClass("active");
    }
    var t = $("#" + keditBlockId);
    if (e == "init") {
        if (t.find(".keditLayer_header").length > 0) {
            var f = t.find(".keditLayer_header");
            $("#blockDividers_header").val(f.attr("data-style"));
            $("#blockDividers_headerHeight").val(f.attr("data-height"));
            $("#blockDividers_headerColor").val(f.attr("data-color")).css("background-color", f.attr("data-color"));
            if (typeof f.attr("data-mirror") !== "undefined") $("#blockDividers_headerMirror").prop("checked", !0);
            else $("#blockDividers_headerMirror").prop("checked", !1);
        } else {
            $("#blockDividers_header").val(0);
            $("#blockDividers_headerHeight").val("h-auto");
            $("#blockDividers_headerColor").val("").css("background-color", "#fff");
            $("#blockDividers_headerMirror").prop("checked", !1);
        }
        if (t.find(".keditLayer_footer").length > 0) {
            var c = t.find(".keditLayer_footer");
            $("#blockDividers_footer").val(c.attr("data-style"));
            $("#blockDividers_footerHeight").val(c.attr("data-height"));
            $("#blockDividers_footerColor").val(c.attr("data-color")).css("background-color", c.attr("data-color"));
            if (typeof c.attr("data-mirror") !== "undefined") $("#blockDividers_footerMirror").prop("checked", !0);
            else $("#blockDividers_footerMirror").prop("checked", !1);
        } else {
            $("#blockDividers_footer").val(0);
            $("#blockDividers_footerHeight").val("h-auto");
            $("#blockDividers_footerColor").val("").css("background-color", "#fff");
            $("#blockDividers_footerMirror").prop("checked", !1);
        }
        if (t.find(".keditLayer_footer").length > 0 || t.find(".keditLayer_header").length > 0) {
            $("#blockBackgroundDividers").addClass("active");
            $("#blockDividers").prop("checked", !0);
        } else {
            $("#blockBackgroundDividers").removeClass("active");
            $("#blockDividers").prop("checked", !1);
        }
    } else if (e == "apply") {
        var o = $("#blockDividers_header").val(),
            d = $("#blockDividers_headerHeight").val(),
            p = $("#blockDividers_headerColor").val(),
            g = $("#blockDividers_headerMirror:checked").length,
            r = $("#blockDividers_footer").val(),
            u = $("#blockDividers_footerHeight").val(),
            h = $("#blockDividers_footerColor").val(),
            b = $("#blockDividers_footerMirror:checked").length;
        if (r == 10 || r == 11 || r == 12) {
            u = "h-auto";
            $("#blockDividers_footerHeight").val("h-auto").attr("disabled", !0);
        } else if (r == 17 || r == 19 || r == 20) {
            u = "h-100";
            $("#blockDividers_footerHeight").val("h-100").attr("disabled", !0);
        } else $("#blockDividers_footerHeight").attr("disabled", !1);
        if (o == 10 || o == 11 || o == 12) {
            d = "h-auto";
            $("#blockDividers_headerHeight").val("h-auto").attr("disabled", !0);
        } else if (o == 17 || o == 19 || o == 20) {
            d = "h-100";
            $("#blockDividers_headerHeight").val("h-100").attr("disabled", !0);
        } else $("#blockDividers_headerHeight").attr("disabled", !1);
        if (p.length > 3) {
            var l = p;
        } else {
            var i = t.prev();
            if (i.hasClass("keditSeparator")) i = i.prev();
            var l = i.attr("data-bgcolor");
            if (typeof l == "undefined") {
                var l = "#fff";
            }
        }
        if (l.substring(0, 2) == "--") l = "var(" + l + ")";
        if (h.length > 3) {
            var n = h;
        } else {
            var i = t.next();
            if (i.hasClass("keditSeparator")) i = i.next();
            if (typeof i.attr("id") == "undefined") {
                var i = $("#footerContent section:eq(0)");
            }
            var n = i.attr("data-bgcolor");
            if (typeof n == "undefined") {
                var n = "#fff";
            }
        }
        if (n.substring(0, 2) == "--") n = "var(" + n + ")";
        t.find(".keditLayer_footer").remove();
        t.find(".keditLayer_header").remove();
        var s,
            a = {};
        if (r > 0) {
            s = $("#dividerStore_footer svg:eq(" + r + ")").outerHTML();
            if (b == 0) {
                a.style = "";
                a.attr = "";
            } else {
                a.style = "transform: scale(-1,1)";
                a.attr = ' data-mirror="1"';
            }
            t.append('<div class="keditLayer_footer ' + u + '"' + a.attr + ' data-color="' + n + '" data-style="' + r + '" data-height="' + u + '" style="fill:' + n + ";color:" + n + ";" + a.style + '">' + s + "</div>");
        }
        if (o > 0) {
            s = $("#dividerStore_footer svg:eq(" + o + ")").outerHTML();
            if (g == 0) {
                a.style = "transform: scale(1,-1)";
                a.attr = "";
            } else {
                a.style = "transform: scale(-1,-1)";
                a.attr = ' data-mirror="1"';
            }
            var m = "gradient-" + guidGenerator();
            s = s.replace(/\[SVG\_ID\]/g, m);
            t.append('<div class="keditLayer_header ' + d + '"' + a.attr + ' data-color="' + l + '" data-style="' + o + '" data-height="' + d + '" style="fill:' + l + ";color:" + l + ";" + a.style + '">' + s + "</div>");
        }
    }
}
function blockDefaultPadding(e) {
    var t = $("#blockId").val();
    if (e == "init") {
        if ($("#" + t).hasClass("koZeroPadding")) {
            var a = "0-0";
            $("#" + t).removeClass("koZeroPadding");
        } else {
            var a = $("#" + t).attr("data-padding");
        }
        if (typeof a !== "undefined") {
            $("#blockDefaultPadding").prop("checked", !1);
            $("#blockCustomPadding").addClass("active");
            a = a.split("-");
            koSliderInit("koBlockPaddingTop", a[0], "padding-top");
            koSliderInit("koBlockPaddingBottom", a[1], "padding-bottom");
        } else {
            $("#blockDefaultPadding").prop("checked", !0);
            $("#blockCustomPadding").removeClass("active");
        }
    } else {
        if ($("#blockDefaultPadding:checked").val() > 0) {
            $("#blockCustomPadding").removeClass("active");
            $("#" + keditBlockId)
                .attr("data-padding", null)
                .css({ "padding-top": 0, "padding-bottom": 0 });
        } else {
            $("#blockCustomPadding").addClass("active");
            koSliderInit("koBlockPaddingTop", 0, "padding-top");
            koSliderInit("koBlockPaddingBottom", 0, "padding-bottom");
        }
    }
}
function blockSplashHeightCheck() {
    var e = $("#blockId").val();
    if ($("#blockSplashHeight:checked").val() > 0) {
        $("#" + e).removeClass("koHeaderAutoHeight");
    } else {
        $("#" + e).addClass("koHeaderAutoHeight");
    }
    koBlockSettings(1);
}
function blockHeightCheck() {
    var e = $("#blockId").val();
    if ($("#blockFullHeight:checked").val() > 0) {
        $("#" + e)
            .addClass("keditFullHeight")
            .removeClass("koHeaderAutoHeight");
    } else {
        $("#" + e)
            .removeClass("keditFullHeight")
            .removeClass("koHeaderAutoHeight");
    }
    koBlockSettings(1);
}
function blockSplashShowCheck() {
    var e = $("#blockId").val();
    if ($("#blockSplashShow:checked").val() > 0) {
        $("#" + e).removeClass("koHeaderHide");
        $("#blockSplashHeightCheckbox").show();
    } else {
        $("#" + e).addClass("koHeaderHide");
        $("#" + e).removeClass("koHeaderAutoHeight");
        $("#blockSplashHeightCheckbox").hide();
    }
    koBlockSettings(1);
}
function koInsertModule(e) {
    keditSeparatorAdd(e);
}
!(function (e) {
    "use strict";
    var i = function () {
            return document.createElement("canvas").getContext("2d");
        },
        n = function (e, a) {
            var t = new Image(),
                n = e.src || e;
            "data:" !== n.substring(0, 5) && (t.crossOrigin = "Anonymous"),
                (t.onload = function () {
                    var e = i("2d");
                    e.drawImage(t, 0, 0);
                    var n = e.getImageData(0, 0, t.width, t.height);
                    a && a(n.data);
                }),
                (t.src = n);
        },
        a = function (e) {
            return ["rgb(", e, ")"].join("");
        },
        l = function (e) {
            return e.map(function (e) {
                return a(e.name);
            });
        },
        o = 5,
        r = 10,
        t = {};
    (t.colors = function (e, t) {
        t = t || {};
        var i = t.exclude || [],
            s = t.paletteSize || r;
        n(e, function (n) {
            for (
                var m = e.width * e.height || n.length,
                    u = {},
                    r = "",
                    p = [],
                    c = {
                        dominant: { name: "", count: 0 },
                        palette: Array.apply(null, new Array(s))
                            .map(Boolean)
                            .map(function () {
                                return { name: "0,0,0", count: 0 };
                            }),
                    },
                    f = 0;
                m > f;

            ) {
                if (((p[0] = n[f]), (p[1] = n[f + 1]), (p[2] = n[f + 2]), (r = p.join(",")), (u[r] = r in u ? u[r] + 1 : 1), -1 === i.indexOf(a(r)))) {
                    var d = u[r];
                    d > c.dominant.count
                        ? ((c.dominant.name = r), (c.dominant.count = d))
                        : c.palette.some(function (e) {
                              return d > e.count ? ((e.name = r), (e.count = d), !0) : void 0;
                          });
                }
                f += 4 * o;
            }
            if (t.success) {
                var h = l(c.palette);
                t.success({ dominant: a(c.dominant.name), secondary: h[0], palette: h });
            }
        });
    }),
        (e.RGBaster = e.RGBaster || t);
})(window);
function blockContrastCheck(e, a) {
    e += " ";
    if (e == "" || e.indexOf("gradient") > 1) {
        if (a == 1) return "black";
        $("#blockDark").prop("checked", !1).trigger("change");
        return !0;
    }
    var i, n, t;
    if (e.indexOf(".") > -1 && e.indexOf("(") < 0) {
        RGBaster.colors(e, {
            success: function (e) {
                t = e.secondary.substring(4).replace(")", "").split(",");
                i = parseInt(t[0], 16);
                n = parseInt(t[1], 16);
                t = parseInt(t[2], 16);
                var a = (i * 299 + n * 587 + t * 114) / 1000,
                    l = a >= 180 ? "black" : "white";
                if (l == "white") $("#blockDark").prop("checked", !0).trigger("change");
                else $("#blockDark").prop("checked", !1).trigger("change");
            },
        });
    } else {
        if (e.indexOf("--color") > -1) {
            e = getComputedStyle(document.body).getPropertyValue(e.trim());
        }
        if (e.charAt(0) == "#") {
            e = e.slice(1);
        }
        if (e.length === 3) {
            e = e.replace(/([0-9a-f])/gi, "$1$1");
        }
        if (e.indexOf("rgb(") > -1 || e.indexOf("rgba(") > -1) {
            e = e.split("(");
            e = e[1].split(")");
            e = e[0].split(",");
            i = parseInt(e[0]);
            n = parseInt(e[1]);
            t = parseInt(e[2]);
        } else {
            i = parseInt(e.substr(0, 2), 16);
            n = parseInt(e.substr(2, 2), 16);
            t = parseInt(e.substr(4, 2), 16);
        }
        var o = (i * 299 + n * 587 + t * 114) / 1000,
            l = o >= 180 ? "black" : "white";
        if (a == 1) return l;
        else if (a == 2) {
            if (l == "white") {
                return "rgba(255,255,255,0.8)";
            } else {
                return "rgba(0,0,0,0.8)";
            }
        }
        if (l == "white") $("#blockDark").prop("checked", !0).trigger("change");
        else $("#blockDark").prop("checked", !1).trigger("change");
    }
}
function blockTextAlign(e) {
    var i = $("#blockId").val(),
        a;
    $("#" + i).removeClass("keditLeft keditRight keditCenter");
    var t = $("#koBlockAlign_input");
    t.find("a").removeClass("active");
    if (e == 1) {
        a = "keditLeft";
        t.find("a:eq(0)").addClass("active");
    } else if (e == 2) {
        a = "keditRight";
        t.find("a:eq(2)").addClass("active");
    } else if (e == 3) {
        a = "keditCenter";
        t.find("a:eq(1)").addClass("active");
    }
    $("#" + i)
        .attr({ "data-align": a })
        .addClass(a);
    setTimeout("k_EditSave('norefresh');", 500);
}
if (typeof templateoEditor === "undefined")
    var templateoEditor = {
        apiKey: "kopage4",
        allowUploads: !1,
        defaultLanguage: configLanguage,
        postURL: koUrl + "admin/builder/submit?supermode=photoEditor",
        callbackInit: function () {
            koHideLoading();
        },
    };
function humanFileSize(e, a) {
    var i = a ? 1000 : 1024;
    if (Math.abs(e) < i) {
        return e + " B";
    }
    var n = a ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"] : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"],
        t = -1;
    do {
        e /= i;
        ++t;
    } while (Math.abs(e) >= i && t < n.length - 1);
    return e.toFixed(1) + " " + n[t];
}
function imageCompressor(e, a) {
    var t = a;
    if (a.indexOf("://") < 0) {
        a = a.replace(koUrl, "");
        a = koUrl + a;
    }
    koShowLoading();
    jQuery.ajax({
        type: "POST",
        url: "admin/builder/submit",
        data: "supermode="+configUpdateType+"&photoCompressor=" + encodeURIComponent(a) + "&photoSource=" + encodeURIComponent(t),
        success: function (e) {
            koHideLoading();
            if (e.substring(0, 2) == "OK") {
                var a = e.split("|");
                alert("Image is now " + humanFileSize(a[1], !0) + " smaller");
            } else alert(e);
        },
    });
}
function generateQRCode() {
    $("#qrcodeImage").html("");
    new QRCode(document.getElementById("qrcodeImage"), { text: window.location.href, width: 512, height: 512 });
    $("#qrcodeAction").html(
        '<small class="my-3 bg-white p-3 rounded d-block"><strong class="d-block">' +
            langPhrase.linkUrl +
            ":</strong>" +
            window.location.href +
            '</small><a href="javascript:void(null)" class="btn btn-ui-primary btn-block btn-lg" id="btn_download" download="qr-code.png" onclick="$(this).attr(\'href\',$(\'#qrcodeImage img\').attr(\'src\'))"><i class="fas fa-fw fa-cloud-download-alt ko-mr-2"></i>' +
            langPhrase.download +
            "</a>"
    );
}
function launchEditor(e, a) {
    if (a.indexOf("://") < 0) {
        a = a.replace(koUrl, "");
        a = koUrl + a;
    }
    koShowLoading();
    templateoEditor.imageID = e;
    if (typeof templateoEditor.loaded === "undefined") {
        templateoEditor.callbackReady = function () {
            koHideLoading();
        };
        templateoEditor.callbackInit = function () {
            imageEditorOpen(a);
        };
        var t = document.createElement("script");
        t.setAttribute("src", "https://templateo.com/imageEditor/init.js");
        t.async = null;
        document.getElementsByTagName("head")[0].appendChild(t);
    } else {
        imageEditorOpen(a);
        koHideLoading();
    }
}
function keditImage(e, a) {
    var t = $(e).parent().find("img");
    if (typeof t.attr("id") === "undefined") {
        t.attr("id", ID());
    }
    if (typeof a === "undefined") showModalManager(t.attr("id"), null, "img");
    else if (a == "edit") {
        return launchEditor(t.attr("id"), t.src);
    }
}
function iconStyleCheck() {
    $("#styleIcon_Tab .koIconHolder").removeClass("koIconSquare");
    if ($("#k_koIconSquare:checked").length > 0) {
        $("#styleIcon_Tab .koIconHolder").addClass("koIconSquare");
    }
    keditIcon(0);
}
function keditIcon(e, a) {
    var n = $(inlineEditItem).parent("i");
    if (typeof e === "number") {
        if (e == -1) {
            k_EditSave("norefresh");
            koMenuClose();
        } else {
            n.removeClass("fa-2x fa-3x fa-3x fa-4x fa-5x");
            var t = n.parent(),
                i = t.attr("class").split(" ");
            t.removeClass(
                "koIconStyle1 koIconStyle2 koIconStyle3 koIconStyle4 koIconStyle5 koIconStyle11 koIconStyle12 koIconStyle13 koIconStyle14 koIconStyle15 koIconStyle21 koIconStyle22 koIconHolder koIconSize100 koIconSize125 koIconSize150 koIconSize175 koIconSize200 koIconSquare"
            );
            t.addClass("koIconHolder");
            if (i.length > 0) {
                for (x = 0; x < i.length; x++) {
                    if (i[x].indexOf("koIconStyle") == 0 && e == 0) {
                        t.addClass("koIconStyle" + i[x].replace("koIconStyle", ""));
                    }
                }
            }
            if (e > 0) {
                t.addClass("koIconStyle" + e);
            }
            if ($("#k_koIconSquare:checked").length > 0 && e != -2) {
                t.addClass("koIconSquare");
            }
            var l = $("input[name=koIcon_Size]:checked").attr("id");
            t.addClass(l);
        }
    } else if (typeof e === "string") {
        n.attr("class", "koIcon " + $("#kedit_iconSize").val() + " " + e);
        if (typeof a !== "undefined") {
        }
        k_EditSave("norefresh");
        keditableToolbar("hide");
    }
}
function koPreviewFrameSize(e) {
    $("#koMenu_preview").width(e);
}
function cPreview(e, a) {
    if (typeof e === "string") var t = e;
    else var t = $(e).css("background-color");
    var i = t;
    if (t.indexOf("--color") > -1) {
        i = "var(" + t + ")";
        if (typeof cApplyTo === "object" && (cApplyTo.attr("id") == "cc__Color1" || cApplyTo.attr("id") == "cc__Color2")) {
            i = getComputedStyle(document.documentElement).getPropertyValue(t);
            t = i;
        }
    }
    if (typeof a !== "undefined") {
        if (typeof e !== "string") {
            $(e).addClass("cu");
            setCookie("colorsInUse", getCookie("colorsInUse") + a + "|", 365);
        }
        if (cApplyTo === "*") {
            setTimeout(function () {
                $(focusElement).focus();
                if (keditorSavedRange != null) {
                    if (window.getSelection) {
                        var e = window.getSelection();
                        if (e.rangeCount > 0) e.removeAllRanges();
                        e.addRange(keditorSavedRange);
                    } else if (document.createRange) {
                        window.getSelection().addRange(keditorSavedRange);
                    } else if (document.selection) {
                        keditorSavedRange.select();
                    }
                    keditor("foreColor", i);
                }
            }, 100);
        } else {
            cApplyTo
                .val(t)
                .css({ background: i, color: blockContrastCheck(t, 1) })
                .removeClass("bg-white bg-color1 bg-color2");
            if (hideCurrentMenuId == "koMenu_block") {
                var n = cApplyTo.attr("id");
                if (n.substring(0, 13) == "blockDividers" || n.substring(0, 23) == "blockBackgroundGradient") {
                } else {
                }
            }
        }
        koMenuClose();
        if (typeof cApplyFunction !== "undefined") {
            window[cApplyFunction]();
            cApplyFunction = undefined;
        }
    } else {
        clearTimeout(cPreviewTimeout);
        $(".colorPreview").fadeIn().css("background", t);
        cPreviewTimeout = setTimeout(function () {
            $(".colorPreview").fadeOut();
        }, 3000);
    }
}
function koMenuLoading(e) {
    clearTimeout(leftSavingTimeout);
    clearTimeout(leftSavingTimeout_u);
    if (e == "cancel") {
        $("#koLeftMenuSaving").removeClass("active_undo active_saved active isLoading");
    } else {
        $("#koLeftMenuSaving").removeClass("active_undo active_saved").addClass("active isLoading");
        if (e == "undo") {
            leftSavingTimeout = setTimeout("$('#koLeftMenuSaving').removeClass('active isLoading').addClass('active_undo');", 1500);
            leftSavingTimeout_u = setTimeout("$('#koLeftMenuSaving').removeClass('active_undo');", 5000);
        } else if (e == "saved") {
            leftSavingTimeout = setTimeout("$('#koLeftMenuSaving').removeClass('active isLoading').addClass('active_saved');", 1000);
            leftSavingTimeout_u = setTimeout("$('#koLeftMenuSaving').removeClass('active_saved');", 2500);
        } else {
            var a = 2500;
            if (typeof e == "number" && e > 999) a = e;
            leftSavingTimeout = setTimeout("$('#koLeftMenuSaving').removeClass('active isLoading');", a);
        }
    }
}
function koMenuFit(e) {
    $(".frameFit").removeClass("frameFit").removeAttr("style");
    var a = $(".koLeftSubmenu.active");
    if (a.attr("id") == "koMenu_sideframe" || a.attr("id") == "koMenu_mainframe" || a.attr("id") == "koMenu_help" || a.attr("id") == "koMenu_frame") {
        a.addClass("frameFit").css({ width: Math.round(e * 1), "max-width": "100%" });
    }
}
function koMenuClose(e) {
    $("#koLeftMenu").removeClass("activeBottomMenu");
    $(".koBottomMessage").removeClass("active");
    $(".koLeftSubmenu.active").removeClass("active frameFit").removeAttr("style");
    $("html").removeClass("editingHeaderBanner");
    if (hideCurrentMenuId != "0") {
        if (hideCurrentMenuId == "fffkoMenu_settings") {
            $("#koMenuItem_settings").click();
        } else {
            $("#" + hideCurrentMenuId).addClass("active");
            hideCurrentMenuId = "0";
        }
    } else {
        $("body").removeClass("koEditingMode");
        $("#website").removeClass("websitePreviewMode active").removeAttr("style");
        if (typeof e === "undefined") {
            $(".koLeftButton.active").removeClass("active");
        } else {
            $("#" + e).removeClass("active");
            $(".koLeftButton.active").removeClass("active");
        }
        $("#koFrameOverlay").removeClass("active");
    }
    $("#kt_Frame").hide();
    keditableToolbar("hide");
    koLightbox(0);
    $(".keditRemove").remove();
    if (typeof koMenuClose_trigger === "function") koMenuClose_trigger();
}
function koMoreMenuOpen(e, a, t) {
    clearTimeout(frameFitTimeout);
    var i = 0;
    if (e.indexOf("/") > 0) {
        var i = e.split("/");
        e = i[0];
        if (i[1] > 0) i = i[1];
        else i = 0;
    }
    if (typeof hideOverlay === "undefined") $("#koFrameOverlay").addClass("active");
    else hideOverlay = undefined;
    var l = $(".koLeftSubmenu.active");
    if (l.length > 0) {
        hideCurrentMenuId = l.attr("id");
        l.removeClass("active");
    } else hideCurrentMenuId = "0";
    if (e == "files") {
        $("#filesTab_1").click();
        var s = new bootstrap.Tab($("#filesTab_1")[0]);
        s.show();
    }
    $("#koMenu_" + e).addClass("active");
    if (e == "colors") {
        $("#koMenu_colors .koMenu").scrollTop(0);
        i = 1;
        if (typeof cApplyTo == "object" && cApplyTo.val() != "") {
            $("#customColorValue").val(cApplyTo.val());
        } else $("#customColorValue").val("");
    } else if (e == "qrcode") {
        if (typeof QRCode === "undefined") {
            var n = document.createElement("script"),
                o = document.getElementsByTagName("script")[0];
            n.async = !0;
            n.src = "https://cdn.jsdelivr.net/npm/qrcode-js-package@1.0.4/qrcode.min.js";
            n.setAttribute("crossorigin", "*");
            n.setAttribute("onload", "generateQRCode()");
            o.parentNode.insertBefore(n, o);
        } else {
            generateQRCode();
        }
    } else if (e == "themes") {
        $("#website").removeClass("websitePreviewMode active").removeAttr("style");
        var r = $("#koThemesList");
        if (r.html() == "") {
            koShowThemes();
        }
    }
    if (i > 0) {
        i--;
        $("#koMenu_" + e + " .koMenuTabs a")
            .eq(i)
            .click();
    }
}
function cPreviewInit() {
    $(".colorPicker").each(function () {
        var a,
            e = $(this).val();
        if (typeof e !== "undefined") {
            if (e.indexOf("--color") > -1) {
                a = "var(" + e + ")";
            } else a = e;
            $(this).css({ "background-color": a, color: blockContrastCheck(e, 1) });
        }
    });
}
function koMenuPageSettings() {
    return koMainFrame("subpageSettings", "admin/builder/submit?p=edit&idd=" + menuPageId + "&menu=menu" + menuMenuId + "&lmode=light&liveEdit=more");
}
function _koThemesTab(e, a) {
    $(".koThemesTab.active,#koThemesCategories .active").removeClass("active");
    $("#koThemesTab_" + e).addClass("active");
    $(a).addClass("active");
    $(".koMenu").scrollTop(0);
}
var themesDataInit = 0;
function koMenuOpen(e, a, t) {
    koLeftMenuShow();
    hideCurrentMenuId = "0";
    $(".koMenu").scrollTop(0);
    var i = 0;
    if (e.indexOf("/") > 0) {
        var i = e.split("/");
        e = i[0];
        if (i[1] > 0) i = i[1];
        else i = 0;
    }
    if (typeof t === "undefined") {
        if ($("#koMenu_" + e).hasClass("active")) {
            koMenuClose();
            return !0;
        }
        koMenuClose();
        koMenuLoading("cancel");
        $("body").addClass("koEditingMode");
        $("#koMenu_" + e).addClass("active");
        $("#koFrameOverlay").addClass("active");
        if (typeof a !== "undefined") {
            if (typeof a === "string") $("#" + a).addClass("active");
            else $(a).addClass("active");
        }
        if (e == "block_DEV" || e == "design") {
            var d = $("#koMenu_" + e).width() + 150;
            $("#website")
                .attr("data-preview-title", langPhrase.preview)
                .addClass("websitePreviewMode")
                .css("left", d + "px");
            setTimeout(function () {
                $("#website").addClass("active");
            }, 300);
        }
        if (e == "modules") {
            koShowFrame("manage_modules");
        } else if (e == "help") {
            koShowFrame("help");
        } else if (e == "menumaker") {
            kt_Load($("#menuStyleData").html());
        } else if (e == "design") {
            if (cf_toLoad > 0) cf_Load($("#fontStyleData").html());
            if (cc_toLoad > 0) cc_Load($("#colorStyleData").html());
        } else if (e == "files") {
            $("#managerApplyToImage").val("");
            $("#managerApplyTo").val("");
            $("#filesTab_1").click();
            var f = new bootstrap.Tab($("#filesTab_1")[0]);
            f.show();
        } else if (e == "settings") {
            if ($("#menuitem_" + menuMenuId + "_" + menuPageId).offset().top - $(window).scrollTop() + 200 > $(".koMenu").height()) {
                $(".koMenu").animate({ scrollTop: $("#menuitem_" + menuMenuId + "_" + menuPageId).offset().top - 200 }, 10);
            }
            setTimeout(function () {
                $("#menuitem_" + menuMenuId + "_" + menuPageId).focus();
            }, 100);
        } else if (e == "themes") {
            var c = $("#koThemesList");
            if (c.html() == "") {
                koShowThemes();
            }
        } else if (e == "free" || e == "license") {
            if (e == "free") e = "license";
            $(".koLeftButtonLast .dotBadge").remove();
        } else if (e == "headerMenubar") {
            $("html").addClass("editingHeaderBanner");
            if ($("#headerMenuBar_content").hasClass("justify-content-center")) {
                $("#mb__centerItems").prop("checked", !0);
            } else {
                $("#mb__centerItems").prop("checked", !1);
            }
            if ($(".headerBanner_social").is(":visible")) {
                $("#mb__socialButtons").prop("checked", !0);
            } else {
                $("#mb__socialButtons").prop("checked", !1);
            }
            if ($(".headerBanner_close").is(":visible")) {
                $("#mb__closeButton").prop("checked", !0);
            } else {
                $("#mb__closeButton").prop("checked", !1);
            }
            if ($("#headerMenuBar").hasClass("d-none")) {
                $("#mb__showBanner,#koHeaderMenuBar").prop("checked", !1);
            } else {
                $("#mb__showBanner,#koHeaderMenuBar").prop("checked", !0);
            }
            var o = $("#headerMenuBar").attr("data-colors").toString();
            o = o.split("|");
            $("#mb__textColor").val(o[0]);
            $("#mb__backgroundColor").val(o[1]);
            var n = "",
                l = {};
            $("#headerMenuBar_content .headerBanner_item").each(function (e) {
                var a = $(this).attr("class");
                a = a.split("headerBanner_item headerBanner_");
                n += '<li class="dd-item';
                if (a[1] == "html") n += " dd-html";
                n += '" id="dd-item--count-' + e + '">' + $(".dd-item--" + a[1]).html() + "</li>";
                l[e] = $(this).html();
            });
            $(".sortableBannerItems").html(n);
            $(".sortableBannerItems .dd-item--draggable").remove();
            $("#headerMenuBar_content .headerBanner_item").each(function (e) {
                if ($(this).attr("class").indexOf("headerBanner_html") > 0) {
                    $("#dd-item--count-" + e + " textarea").val(l[e]);
                } else {
                    $("#dd-item--count-" + e + " input").val(l[e]);
                }
            });
            l = {};
        }
    } else {
        var s = $(".koLeftSubmenu.active");
        if (s.length > 0) {
        }
    }
    if (i > 0) {
        i--;
        var r = new bootstrap.Tab($("#koMenu_" + e + " .koMenuTabs a").eq(i)[0]);
        r.show();
    }
    cPreviewInit();
    $(".koMenu").scrollTop(0);
}
var koShowThemes = function () {
        if (typeof themesData != "object") {
            if (themesDataInit == 0) {
                themesDataInit = 1;
                $.ajax({
                    url: themesCDN + koThemesJson,
                    jsonpCallback: "kopageJSON",
                    dataType: "jsonp",
                    success: function (e) {
                        if (typeof koCustomThemes === "undefined") {
                            themesData = e;
                        } else {
                            $.ajax({
                                url: koCustomThemes + koCustomThemesJson,
                                jsonpCallback: "kopageJSON",
                                dataType: "jsonp",
                                success: function (a) {
                                    if (typeof koOnlyCustomThemes !== "undefined") {
                                        themesData = a;
                                    } else {
                                        var t = {};
                                        $.extend(!0, t, a, e);
                                        themesData = t;
                                    }
                                },
                            });
                        }
                    },
                });
            }
            setTimeout(function () {
                koShowThemes();
            }, 100);
        } else {
            _koShowThemes();
        }
    },
    themesFilterList = [];
function _koShowThemes(e) {
    var s = $("#koThemesList"),
        l = {};
    var a = "",
        t = '<div class="koMenuTabsTitle">' + langPhrase.categories + "</div>",
        n = 0,
        o = 0,
        c = [];
    $.each(themesData, function (e, i) {
        t += '<a data-category="' + e.replace(/[^a-z0-9+]+/gi, "") + '" href="javascript:void(null)" onclick="_koThemesTab(' + n + ',this)"';
        if (n == 0) t += ' class="active"';
        t += ">";
        if (typeof themesCategories[e] !== "undefined") {
            if (themesCategories[e] == "Show All Templates") t += langPhrase.featuredThemes;
            else t += themesCategories[e];
        } else t += e;
        t += "</a>";
        a += '<div class="koThemesTab';
        if (n == 0) a += " active";
        a += '" id="koThemesTab_' + n + '">';
        n++;
        $.each(i, function (t, i) {
            o++;
            if (typeof i.screenshot === "undefined") {
                i.thumb = koThemes + "img/" + t + "_360.jpg";
                i.screenshot = koThemes + "img/" + t + "_960.jpg";
            }
            if (typeof l[t] === "undefined") {
                l[t] = [];
                if (typeof i.tags === "undefined") {
                    i.tags = t;
                    if (i.name.toLowerCase() != t) i.tags += " " + i.name;
                }
                l[t].push({ id: t, name: i.name, tags: i.tags, screen: i.screenshot });
            }
            var n = i.screenshot;
            if (typeof i.thumb !== "undefined") n = i.thumb;
            a += '<div data-category="' + e.replace(/[^a-z0-9+]+/gi, "") + '" data-theme="' + t.replace(/[^a-z0-9+]+/gi, "") + '" class="browser-mockup">';
            if (typeof themesLimit == "number" && o > themesLimit) {
                a += '<div class="probadge"><i class="fas fa-star"></i><i class="fas fa-unlock"></i></div>';
            }
            if (typeof firstThemeInit !== "undefined" && t == firstThemeInit) a += '<div class="probadge"><i class="fas fa-check"></i></div>';
            a +=
                '<span><a style="box-shadow:0 0 10px rgba(0,0,0,0.1);" class="" href="javascript:void(null)" onclick="window.top.koMainFrame(null,\'admin/builder/submit?supermode=teditor&installTemplate=' +
                t +
                "')\"><strong>" +
                i.name +
                '</strong><img data-src="' +
                n +
                '" class="lazy"></a></span><div class="browser-preview" style=""><a href="javascript:void(null)" onclick="koLightbox(\'' +
                i.screenshot +
                "', '" +
                i.name +
                '\')" class=" btn btn-ui-primary mt-0"><i class="fas fa-search fa-fw"></i> ' +
                langPhrase.preview +
                '</a><a href="javascript:void(null)" onclick="window.top.';
            if (typeof themesLimit == "number" && o > themesLimit) {
                a += "koMenuOpen('";
                if (typeof proLicense !== "undefined") a += "package";
                else a += "free";
                a += "');";
            } else {
                if (compareVer(koVersion, i.version) > -1) {
                    a += "koMainFrame(null,'admin/builder/submit?supermode=teditor&installTemplate=" + t + "')";
                } else {
                    a += "koShowFrame(null,'admin/builder/submit?e=update&info=theme')";
                }
            }
            a += '" class=" btn btn-ui-primary btn-ui-primary-install mt-0">' + langPhrase.install + ' <i class="fas fa-angle-right fa-fw"></i></a></div></div>';
        });
        a += "</div>";
    });
    s.html(a);
    $("#koThemesCategories").html(t + "</ul>");
    a = null;
    var r = [];
    if (themesHiddenCategories.length > 0) {
        $(themesHiddenCategories).each(function () {
            $('[data-category="' + this + '"]').each(function () {
                $(this).hide();
                if ($(this).attr("data-theme") !== "undefined") {
                    $('[data-theme="' + $(this).attr("data-theme") + '"]').hide();
                    r.push($(this).attr("data-theme"));
                }
            });
        });
    }
    themesFilterList = [];
    if (typeof Fuse !== "undefined") {
        $.each(l, function (e, a) {
            if (r.indexOf(e) < 0) themesFilterList.push({ id: a[0].id, name: a[0].name, tags: a[0].tags, screen: a[0].screen });
        });
        l = null;
        $("#koThemesFilter input")
            .on("keyup", function () {
                var l = this.value;
                if (l.length < 2) {
                    $("#koThemesTab_searchResult").removeClass("active");
                    $("#koThemesFilterCancel").remove();
                    return !0;
                }
                var s = new Fuse(themesFilterList, { keys: ["tags"] });
                var e = s.search(l);
                $("#sampleResult,#koThemesTab_searchResult").html("");
                $("#koThemesFilterCancel").remove();
                if (e != null && e.length > 0) {
                    $("#koThemesTab_searchResult").addClass("active").scrollTop(0);
                    $("#koThemesFilter").append(
                        '<button class="btn btn-outline-secondary" type="button" id="koThemesFilterCancel" onclick="$(\'#koThemesFilter input\').val(null).trigger(\'keyup\').focus()"><i class="fas fa-fw fa-times"></i></button>'
                    );
                    var n = "";
                    for (let i = 0; i < e.length; i++) {
                        var a = e[i].item.id,
                            r = a.charAt(0).toUpperCase() + a.slice(1),
                            t = e[i].item.screen;
                        t = t.replace("_960.", "_360.");
                        var o =
                            '<div class="browser-mockup mt-5"><span><a style="box-shadow:0 0 10px rgba(0,0,0,0.1);" class="" href="javascript:void(null)" onclick="window.top.koMainFrame(null,\'admin/builder/submit?supermode=teditor&installTemplate=' +
                            a +
                            "')\"><strong>" +
                            r +
                            '</strong><img src="' +
                            t +
                            '"></a></span><div class="browser-preview" style=""><a href="javascript:void(null)" onclick="koLightbox(\'' +
                            e[i].item.screen +
                            "', '" +
                            a +
                            '\')" class=" btn btn-ui-primary mt-0"><i class="fas fa-search fa-fw"></i> ' +
                            langPhrase.preview +
                            '</a><a href="javascript:void(null)" onclick="window.top.koMainFrame(null,\'admin/builder/submit?supermode=teditor&amp;installTemplate=' +
                            a +
                            '\')" class=" btn btn-ui-primary btn-ui-primary-install mt-0">' +
                            langPhrase.install +
                            ' <i class="fas fa-angle-right fa-fw"></i></a></div></div>';
                        n += o;
                    }
                    $("#koThemesTab_searchResult").append(n);
                    n = "";
                } else {
                    $("#koThemesTab_searchResult").removeClass("active");
                }
            })
            .focus();
    }
    if (typeof lazyLoadInstance !== "undefined") lazyLoadInstance.update();
}
function compareVer(e, a) {
    function i(e) {
        return "." + (e.toLowerCase().charCodeAt(0) - 2147483647) + ".";
    }
    e = ("" + e).replace(/[^0-9\.]/g, i).split(".");
    a = ("" + a).replace(/[^0-9\.]/g, i).split(".");
    var n = Math.max(e.length, a.length);
    for (var t = 0; t < n; t++) {
        e[t] = ~~e[t];
        a[t] = ~~a[t];
        if (e[t] > a[t]) return 1;
        else if (e[t] < a[t]) return -1;
    }
    return 0;
}
function koLightbox(e, a) {
    if (typeof e === "string") {
        $("body")
            .addClass("noScrollbars")
            .append(
                '<div class="koLightbox"><div class="koLightboxOverlay"></div><a href="javascript:void(null)" onclick="koLightbox(0)"><i class="fas fa-times"></i></a><div class="browser-mockup"><strong>' +
                    a +
                    '</strong><div class="koLightboxHolder"><img src="' +
                    e +
                    '"></div></div></div>'
            );
    } else {
        $(".koLightbox").remove();
        $("body").removeClass("noScrollbars");
    }
}
function koDraftInit(e) {
    if (e == 1) {
        $("#koBottomButton_liveMode,#koBottomButton_draftModeLoading").addClass("d-none");
        $("#koBottomButton_draftModeFloating").addClass("active");
        $("#koBottomButton_draftMode").removeClass("d-none");
        koHideLoading();
    } else if (e == 2) {
        $("#koBottomButton_draftMode,#koBottomButton_draftModeLoading").addClass("d-none");
        $("#koBottomButton_liveMode").removeClass("d-none");
        $("#koBottomButton_draftModeFloating").removeClass("active");
        koHideLoading();
    } else {
        $("#koBottomButton_draftModeLoading").removeClass("d-none");
        $("#koBottomButton_draftMode,#koBottomButton_liveMode").addClass("d-none");
        k_EditSave("norefresh", "startDraft");
    }
}
function koMenuLoaded() {
    $(".koPlaceholder").removeClass("koPlaceholder");
}
function koMenuUnload(e) {
    $("#" + e).addClass("koPlaceholder");
}
function featherEditorInit() {}
function setCookie(e, a, t) {
    var n;
    if (t) {
        var i = new Date();
        i.setTime(i.getTime() + t * 24 * 60 * 60 * 1000);
        n = "; expires=" + i.toGMTString();
    } else {
        n = "";
    }
    document.cookie = encodeURIComponent(e) + "=" + encodeURIComponent(a) + n + "; path=/";
}
function getCookie(e) {
    var i = encodeURIComponent(e) + "=",
        n = document.cookie.split(";");
    for (var t = 0; t < n.length; t++) {
        var a = n[t];
        while (a.charAt(0) === " ") a = a.substring(1, a.length);
        if (a.indexOf(i) === 0) return decodeURIComponent(a.substring(i.length, a.length));
    }
    return null;
}
function removeCookie(e) {
    setCookie(e, "", -1);
}
function colorPairPicker(e) {
    if (typeof e === "undefined") {
        pair[0] = $("#cc__Color1").val();
        pair[1] = $("#cc__Color2").val();
    } else {
        pair = e.split("-");
    }
    $c = '<div class="cc"><div class="ccInfo"><i class="fa fa-fw fa-magic"></i><span data-balloon="' + langPhrase.dynamicColorsTip + '" data-balloon-pos="upright">' + langPhrase.dynamicColors + "</span></div>";
    $cv = 25;
    for (i = 1; i < 8; i++) {
        var n = shade(pair[0], $cv),
            t = "",
            a = "_" + $cv;
        if (i == 4) {
            n = pair[0];
            t = " cx3";
            a = "";
        }
        $c += '<div class="c' + t + '" style="background:var(--color1' + a + ')" data-color="--color1' + a + '" onmousedown="cPreview(\'--color1' + a + '\',1)" onmouseover="cPreview(this)"></div>';
        $cv = $cv + 25;
    }
    $c += '</div><div class="cc">';
    $cv = 25;
    for (i = 1; i < 8; i++) {
        var n = shade(pair[1], $cv),
            t = "",
            a = "_" + $cv;
        if (i == 4) {
            n = pair[1];
            t = " cx3";
            a = "";
        }
        $c += '<div class="c' + t + '" style="background:var(--color2' + a + ')" data-color="--color2' + a + '" onmousedown="cPreview(\'--color2' + a + '\',1)" onmouseover="cPreview(this)"></div>';
        $cv = $cv + 25;
    }
    $c += "</div>";
    $("#colorListSchemes").html($c);
}
function colorPairSet(e) {
    pair = e.split("-");
    $("#cc__Color1")
        .val("#" + pair[0])
        .css({ "background-color": "#" + pair[0], color: blockContrastCheck(pair[0], 1) });
    $("#cc__Color2")
        .val("#" + pair[1])
        .css({ "background-color": "#" + pair[1], color: blockContrastCheck(pair[1], 1) });
    cc_Generate(null, e);
}
function colorPairsPrepare() {
    var a = [
            "a30015-2b2d42",
            "01C8B4-1F2966",
            "EEAF00-1D1E20",
            "370031-ce8964",
            "af8d86-5f4842",
            "537d8d-ffc53a",
            "bdd9bf-2e4052",
            "412234-bdd9bf",
            "79aea3-412234",
            "ffbc42-d81159",
            "5e4b56-afd2e9",
            "292f36-4ecdc4",
            "4ecdc4-ff6b6b",
            "292f36-ffe66d",
            "73648a-453750",
            "462255-62a87c",
            "d4cb92-395c6b",
            "c1c1c1-2c4251",
            "2c4251-b6c649",
            "d16666-2c4251",
            "d16666-c1c1c1",
            "b6c649-382633",
            "5bc0eb-fde74c",
            "5bc0eb-b6c649",
            "b6c649-3b7080",
            "cb48b7-2e2d4d",
            "2e2d4d-6d9f71",
            "afbed1-eac5d8",
            "f19a3e-403233",
            "51355a-fff8f0",
            "51355a-9e2b25",
            "a9aca9-30343f",
            "c3acce-89909f",
            "5d576b-e6ebe0",
            "4392f1-006494",
            "d05353-f9e784",
            "5e5768-30343f",
            "39304a-635c51",
            "212d40-364156",
            "202c59-f0a202",
            "7d7461-202030",
            "5171a5-3f3047",
            "6247aa-102b3f",
            "a06cd5-062726",
            "4392f1-dc493a",
            "aa4465-f0dfad",
            "ff9b42-d9e5d6",
            "9bc1bc-f4f1bb",
            "f0a202-f18805",
            "003049-d62828",
            "e07a5f-3d405b",
            "19323c-f6ae2d",
            "81b29a-f2cc8f",
            "22333b-e3b505",
            "00a7e1-d9e5d6",
            "ff82a9-ffc0be",
            "7f95d1-080708",
            "42273b-70566d",
            "11151c-212d40",
            "364156-7d4e57",
            "cf5c36-d3d5d7",
            "abc8c0-70566d",
            "5b2333-564d4a",
            "5b7553-437f97",
            "cc2936-6b818c",
            "9bc1bc-5d576b",
            "519e8a-50514f",
            "0e79b2-bf1363",
            "22333b-c6ac8f",
            "457b9d-a8dadc",
            "a63d40-30343f",
            "a8dadc-1d3557",
            "5386e4-4c4b63",
            "949396-bcebcb",
            "5e6973-949396",
            "5e6973-f5e0b7",
            "59344f-8bbf9f",
            "5e6973-ddc4dd",
            "2e6171-1a3a3a",
            "824c71-1a3a3a",
            "031927-c8e0f4",
            "19323c-f3f7f0",
            "270722-9fb798",
            "f3a712-534d41",
            "7d7e75-bfc3ba",
            "255957-f7c548",
            "17bebb-2e282a",
            "542344-808080",
            "d7c9aa-7b2d26",
            "36413e-5d5e60",
            "503d42-84c318",
            "626868-d3c1d2",
            "70cad1-3e517a",
            "6290c3-c2e7da",
            "1a1b41-baff29",
            "fcbfb7-334e58",
            "693668-1b1b3a",
            "2c2c54-acc3a6",
            "89023e-30343f",
            "afd2e9-d81e5b",
            "afd2e9-16425b",
            "70877f-454372",
            "292e1e-afbbf2",
            "dba159-16425b",
            "66c7f4-c1cad6",
            "30343f-90a959",
            "0074D9-001f3f",
            "30343f-6494aa",
        ],
        e = "";
    $.each(a, function (a, t) {
        pair = t.split("-");
        e += '<div style="width:50%;display:inline-block;';
        if (a % 2 != 0) e += "padding-right:0;padding-left:10px;";
        e +=
            '"><a href="javascript:void(null)" onclick="colorPairSet(\'' +
            t +
            '\')" style="display:block;overflow:auto;"><span style="float:left;display:block;width:50%;"><span style="background:#' +
            pair[0] +
            ';display:block;width:100%;height:60px;"></span><span style="background:' +
            shade("#" + pair[0], 0.25) +
            ';float:left;display:block;width:50%;height:15px;"></span><span style="background:' +
            shade("#" + pair[0], -0.75) +
            ';float:left;display:block;width:50%;height:15px;"></span><span style="background:' +
            shade("#" + pair[0], 0.5) +
            ';float:left;display:block;width:50%;height:15px;"></span><span style="background:' +
            shade("#" + pair[0], -0.5) +
            ';float:left;display:block;width:50%;height:15px;"></span><span style="background:' +
            shade("#" + pair[0], 0.75) +
            ';float:left;display:block;width:50%;height:15px;"></span><span style="background:' +
            shade("#" + pair[0], -0.25) +
            ';float:left;display:block;width:50%;height:15px;"></span></span><span style="float:left;display:block;width:50%;height:50px;"><span style="background:#' +
            pair[1] +
            ';display:block;width:100%;height:60px;"></span><span style="background:' +
            shade("#" + pair[1], 0.25) +
            ';float:left;display:block;width:50%;height:15px;"></span><span style="background:' +
            shade("#" + pair[1], -0.75) +
            ';float:left;display:block;width:50%;height:15px;"></span><span style="background:' +
            shade("#" + pair[1], 0.5) +
            ';float:left;display:block;width:50%;height:15px;"></span><span style="background:' +
            shade("#" + pair[1], -0.5) +
            ';float:left;display:block;width:50%;height:15px;"></span><span style="background:' +
            shade("#" + pair[1], 0.75) +
            ';float:left;display:block;width:50%;height:15px;"></span><span style="background:' +
            shade("#" + pair[1], -0.25) +
            ';float:left;display:block;width:50%;height:15px;"></span></span></a></div>';
    });
    $("#colorPairs").append(e);
}
function themeDarkCheck() {
    if ($("#koDarkTheme:checked").val() > 0) {
        changeTheme("Dark", !0);
    } else {
        changeTheme("Dark", !1);
    }
    $("#cc__body").val("");
    cc_Generate(1);
}
function shadeColor(e, a) {
    var t = parseInt(e.slice(1), 16),
        i = a < 0 ? 0 : 255,
        n = a < 0 ? a * -1 : a,
        l = t >> 16,
        o = (t >> 8) & 0x00ff,
        r = t & 0x0000ff;
    return "#" + (0x1000000 + (Math.round((i - l) * n) + l) * 0x10000 + (Math.round((i - o) * n) + o) * 0x100 + (Math.round((i - r) * n) + r)).toString(16).slice(1);
}
function blendColors(e, a, t) {
    var i = parseInt(e.slice(1), 16),
        n = parseInt(a.slice(1), 16),
        l = i >> 16,
        o = (i >> 8) & 0x00ff,
        r = i & 0x0000ff,
        s = n >> 16,
        c = (n >> 8) & 0x00ff,
        f = n & 0x0000ff;
    return "#" + (0x1000000 + (Math.round((s - l) * t) + l) * 0x10000 + (Math.round((c - o) * t) + o) * 0x100 + (Math.round((f - r) * t) + r)).toString(16).slice(1);
}
function shadeRGBColor(e, a) {
    var t = e.split(","),
        i = a < 0 ? 0 : 255,
        n = a < 0 ? a * -1 : a,
        l = parseInt(t[0].slice(4)),
        o = parseInt(t[1]),
        r = parseInt(t[2]);
    return "rgb(" + (Math.round((i - l) * n) + l) + "," + (Math.round((i - o) * n) + o) + "," + (Math.round((i - r) * n) + r) + ")";
}
function blendRGBColors(e, a, t) {
    var i = e.split(","),
        n = a.split(","),
        l = parseInt(i[0].slice(4)),
        o = parseInt(i[1]),
        r = parseInt(i[2]);
    return "rgb(" + (Math.round((parseInt(n[0].slice(4)) - l) * t) + l) + "," + (Math.round((parseInt(n[1]) - o) * t) + o) + "," + (Math.round((parseInt(n[2]) - r) * t) + r) + ")";
}
function shade(e, a) {
    if (e.length > 7) return shadeRGBColor(e, a);
    else return shadeColor(e, a);
}
function blend(e, a, t) {
    if (e.length > 7) return blendRGBColors(e, a, t);
    else return blendColors(e, a, t);
}
function hsla_getCol(e) {
    let gradient = [];
    if (e === "h")
        for (let h = 0; h <= 360; h += 20) {
            gradient.push("hsla(" + h + "," + hsla[1] + "%," + hsla[2] + "%," + hsla[3] + ")");
        }
    else if (e === "s")
        for (let s = 0; s <= 100; s += 50) {
            gradient.push("hsla(" + hsla[0] + "," + s + "%," + hsla[2] + "%," + hsla[3] + ")");
        }
    else if (e === "l")
        for (let l = 0; l <= 100; l += 10) {
            gradient.push("hsla(" + hsla[0] + "," + hsla[1] + "%," + l + "%," + hsla[3] + ")");
        }
    else if (e === "a")
        for (let a = 0; a < 2; a++) {
            gradient.push("hsla(" + hsla[0] + "," + hsla[1] + "%," + hsla[2] + "%," + a + ")");
        }
    return gradient;
}
function hsl2rgb(e, a, t) {
    var i, n, l, s, o, r;
    if (!isFinite(e)) e = 0;
    if (!isFinite(a)) a = 0;
    if (!isFinite(t)) t = 0;
    e /= 60;
    if (e < 0) e = 6 - (-e % 6);
    e %= 6;
    a = Math.max(0, Math.min(1, a / 100));
    t = Math.max(0, Math.min(1, t / 100));
    o = (1 - Math.abs(2 * t - 1)) * a;
    r = o * (1 - Math.abs((e % 2) - 1));
    if (e < 1) {
        i = o;
        n = r;
        l = 0;
    } else if (e < 2) {
        i = r;
        n = o;
        l = 0;
    } else if (e < 3) {
        i = 0;
        n = o;
        l = r;
    } else if (e < 4) {
        i = 0;
        n = r;
        l = o;
    } else if (e < 5) {
        i = r;
        n = 0;
        l = o;
    } else {
        i = o;
        n = 0;
        l = r;
    }
    s = t - o / 2;
    i = Math.round((i + s) * 255);
    n = Math.round((n + s) * 255);
    l = Math.round((l + s) * 255);
    return { r: i, g: n, b: l };
}
function hsla_update() {
    for (let i = 0; i < 4; i++) {
        hsla[i] = hsla_sliders[i].value;
        let fill = "linear-gradient(to right, " + hsla_getCol(hsla_letters[i]) + ")";
        hsla_sliders[i].style.background = fill;
    }
    let color = "hsla(" + hsla[0] + "," + hsla[1] + "%," + hsla[2] + "%," + hsla[3] + ")";
    currentHSL.style.background = color;
    let rgb = hsl2rgb(hsla[0], hsla[1], hsla[2]);
    colorInput.value = "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + "," + hsla[3] + ")";
}
var currentHSL, colorInput;
const hsla_sliders = [];
const hsla = [200, 80, 40, 1];
const hsla_letters = ["h", "s", "l", "a"];
function colorPickerCreate() {
    if (getCookie("colorsInUse") == null) setCookie("colorsInUse", "|", 365);
    var n = 100,
        a = 70,
        e = "",
        t = "";
    e += '<div class="cc">';
    a = 0;
    var l = { "0": "#000000", "5": "#2a2a2a", "10": "#545454", "20": "#989898", "30": "#c5c5c5", "40": "#dedede", "50": "#ececec", "60": "#f3f3f3", "70": "#f7f7f7", "80": "#ffffff" };
    const keys = Object.values(l);
    for (const key of keys) {
        e += '<div class="c cwt" style="background-color:' + key + '" onmousedown="cPreview(this,1)" onmouseover="cPreview(this)"></div>';
    }
    e += '</div><div class="csp"></div>';
    a = 70;
    e += '<div id="colorListSchemes"></div><div class="csp"></div>';
    for (ii = 0; ii < 361; ii++) {
        n = ii;
        ii = Math.round(ii + 10);
        e += '<div class="cc">';
        for (i = 10; i > 0; i--) {
            t = i + "." + ii;
            e += '<div class="c';
            if (getCookie("colorsInUse").indexOf("|" + t + "|") > -1) e += " cu";
            e += '" style="background-color: hsl(' + n + ", " + a + "%, " + Math.round(i * 8 + 15) + '%);" onmousedown="cPreview(this,\'' + t + '\')" onmouseover="cPreview(this)"></div>';
        }
        e += "</div>";
    }
    e +=
        '<hr class="border-0 mt-0 mb-0" style="clear:both"><a href="javascript:void(null)" class="btn btn-block btn-outline-secondary my-3" onClick="$(\'.colorList .c.cu\').removeClass(\'cu\');removeCookie(\'colorsInUse\');">' +
        langPhrase.removeSavedColors +
        "</a>";
    $(".colorList").append(e).parent().addClass("active");
    colorPairPicker($cc__Color1 + "-" + $cc__Color2);
}
function koTableEditor(e, a, t) {
    $(".koTableEditor").hide();
    if (typeof koTableEditor_r === "undefined" || koTableEditor_r == null) a = 2;
    else if (typeof koTableEditor_c === "undefined" || koTableEditor_c == null) a = 1;
    if (a == 1) {
        if (t == 1) {
            var n = $(koTableEditor_r).html();
            $(koTableEditor_r).after("<tr>" + n + "</tr>");
        } else if (t == 2) {
            $(koTableEditor_r).remove();
        }
    } else if (a == 2) {
        if (t == 1) {
            $(koTableEditor_t)
                .find("tr")
                .each(function () {
                    $(this).find("th").eq(koTableEditor_cc).after('<th class="keditable">...</th>');
                    $(this).find("td").eq(koTableEditor_cc).after('<td class="keditable">...</td>');
                });
        } else if (t == 2) {
            $(koTableEditor_t)
                .find("tr")
                .each(function () {
                    $(this).find("td").eq(koTableEditor_cc).remove();
                    $(this).find("th").eq(koTableEditor_cc).remove();
                });
        }
    }
    $(koTableEditor_t).editableTables();
    var i = $(koTableEditor_t).closest(".kedit").attr("id");
    initKeditable(i);
}
var koTableEditor_t, koTableEditor_r, koTableEditor_c, koTableEditor_cc;
$.fn.extend({
    editableImages: function (e) {
        var t = {
            wrap: '<span class="keditImageWrap keditImageWrap-dd"/>',
            wrapBlock: '<span class="keditImageWrap keditImageWrap-dd d-block"/>',
            wrapFull: '<span class="keditImageWrap keditImageWrap-dd d-block w-100 h-100"/>',
            wrapFullAbsolute: '<span class="position-absolute keditImageWrap keditImageWrap-dd d-block w-100 h-100" style="top:0;left:0" />',
            wrapLeft: '<span class="keditImageWrap keditImageWrap-dd float-left"/>',
            wrapRight: '<span class="keditImageWrap keditImageWrap-dd float-right"/>',
        };
        var e = $.extend(t, e),
            a = e;
        return this.each(function (e) {
            var t = $(this),
                l = t.outerHeight(),
                n = t.closest(".kelement");
            if (n.length > 0) {
                return;
            }
            n = t.closest(".koSquare");
            if (n.length > 0) return;
            if (t.hasClass("keditIgnore")) {
                return;
            }
            if (t.hasClass("img-fluid")) {
                if (t.hasClass("h-100")) t.wrap(a.wrapBlock.replace("keditImageWrap", "keditImageWrap h-100"));
                else t.wrap(a.wrapBlock);
            } else if (t.hasClass("img-full")) t.wrap(a.wrapFull);
            else if (t.hasClass("position-absolute-expand")) t.wrap(a.wrapFullAbsolute);
            else if (t.hasClass("float-left")) t.wrap(a.wrapLeft);
            else if (t.hasClass("float-right")) t.wrap(a.wrapRight);
            else t.wrap(a.wrap);
            if (typeof t.attr("data-lightbox") !== "undefined") {
                t.closest(".lightbox").off();
            }
            t.after(
                '<a data-balloon="' +
                    langPhrase.imageFind +
                    '" data-balloon-pos="in" class="keditInlineEdit keditImage keditImageImg koBgHover1" contenteditable="false" href="javascript:void(null)" onclick="inlineEditItem=this;koToolbarTabs(\'Image\')"><i class="fas fa-cog"></i></a>'
            );
            var i = $(this).closest(".keditImageWrap-dd");
            if (i.length == 1) {
                i = i[0];
                i.addEventListener("dragover", function (e) {
                    if (e.dataTransfer.items.length) {
                        var a = e.dataTransfer.items[0];
                        if (a.type.startsWith("image/")) {
                            $(this).addClass("keditImg--drop");
                        }
                    }
                });
                i.addEventListener("dragleave", function (e) {
                    $(this).removeClass("keditImg--drop");
                });
                i.addEventListener("dragout", function (e) {
                    $(this).removeClass("keditImg--drop");
                });
                i.addEventListener("drop", function (e) {
                    $(this).removeClass("keditImg--drop");
                    e.stopPropagation();
                    e.preventDefault();
                    var o = this;
                    if (e.dataTransfer.files.length) {
                        var n = e.dataTransfer.files[0];
                        if (n.type.startsWith("image/")) {
                            koShowLoading();
                            var i = new FileReader();
                            i.readAsDataURL(n);
                            i.onload = () => {
                                var a = $(o).find("img");
                                if (a.length > 0) {
                                    var t = ID();
                                    if (a.is("[data-tmp-drop]")) {
                                        t = a.attr("data-tmp-drop");
                                    } else {
                                        a.attr({ "data-src": null, "data-tmp-drop": t });
                                    }
                                    $("#managerApplyTo").val("[drop]" + t);
                                    var l = $("#bottomUploadButton")[0];
                                    l.files = e.dataTransfer.files;
                                    $("#bottomUploadButtonSubmit").click();
                                    setTimeout(function () {
                                        $("#managerApplyTo").val(null);
                                    }, 250);
                                }
                            };
                        }
                    }
                });
            }
        });
    },
    editableTables: function (e) {
        var a = {
            rowEdit:
                '<div class="kelement koTableEditor koTableEditorRow" contenteditable="false"><button type="button" onclick="koTableEditor(this,1,1)"><i class="fas fa-plus fa-fw "></i></button><button onclick="koTableEditor(this,1,2)"><i class="fas fa-fw fa-trash"></i></button></div>',
        };
        var e = $.extend(a, e),
            t = e;
        return this.each(function (e) {
            var t = $(this),
                o = t.outerHeight(),
                n;
            t.append(a.rowEdit);
            var i = t.find(".koTableEditorRow"),
                l = t.closest(".kelement");
            if (l.length > 0) return;
            t.find("tbody tr").each(function (e) {
                var a = $(this);
                a.hover(
                    function () {
                        clearTimeout(n);
                        var l = $(window).scrollTop(),
                            e = a.offset();
                        koTableEditor_r = a;
                        koTableEditor_c = null;
                        koTableEditor_t = t;
                        koTableEditor_cc = null;
                        i.css({ top: e.top - l + 8, left: e.left + t.width() + 8 }).show();
                    },
                    function () {
                        n = setTimeout(function () {
                            i.hide();
                        }, 1000);
                    }
                );
            });
            t.find("thead th").each(function (e) {
                var a = $(this);
                a.hover(
                    function () {
                        clearTimeout(n);
                        var o = $(window).scrollTop(),
                            l = a.offset(),
                            r = a.position();
                        koTableEditor_r = null;
                        koTableEditor_c = a;
                        koTableEditor_t = t;
                        koTableEditor_cc = e;
                        i.css({ top: l.top + 10, left: l.left + a.width() - 50, right: "inherit" }).show();
                    },
                    function () {
                        n = setTimeout(function () {
                            i.hide();
                        }, 1000);
                    }
                );
            });
        });
    },
    editableVideos: function (e) {
        var t = { wrap: '<div class="keditImageWrap" contenteditable="false" style="display:block;"/>' };
        var e = $.extend(t, e),
            a = e;
        return this.each(function (e) {
            var t = $(this),
                n = t.outerHeight(),
                i = t.closest(".kelement");
            if (i.length > 0) return;
            t.wrap(a.wrap);
            t.after(
                '<a data-balloon="' +
                    langPhrase.videoSettings +
                    '" data-balloon-pos="in" class="keditInlineEdit keditImage koBgHover1 kelement" contenteditable="false" href="javascript:void(null)" onclick="inlineEditItem=this;koToolbarTabs(\'Video\')"><i class="fas fa-cog"></i></a>'
            );
        });
    },
    editableIcons: function (e) {
        return this.each(function (e) {
            var i = '<span class="koIconHolder"/>',
                a = $(this),
                n = a.outerHeight(),
                t = a.closest(".kelement");
            if (t.length > 0) return;
            t = a.closest(".keditInlineEdit");
            if (t.length > 0) return;
            if (!a.parent().hasClass("koIconHolder")) {
                a.removeClass("mr-1 mr-2 mr-3 mr-4 mr-5 mb-1 mb-2 mb-3 mb-4 mb-5");
                a.wrap(i);
            }
            a.html(
                '<a data-balloon="' +
                    langPhrase.chooseIcon +
                    '" data-balloon-pos="in" class="keditInlineEdit keditIcon koBgHover1 koBg3" contenteditable="false" href="javascript:void(null)" onclick="inlineEditItem=this;koToolbarTabs(\'Icon\')" ><i class="fas fa-cog systemicon"></i></a>'
            );
        });
    },
    editableSeparators: function (e) {
        var t = { wrap: '<div class="keditImageWrap keditSeparatorWrap" contenteditable="false" style="display:block;"/>' };
        var e = $.extend(t, e),
            a = e;
        return this.each(function (e) {
            var t = $(this),
                n = t.outerHeight(),
                i = t.closest(".kelement");
            if (i.length > 0) return;
            t.wrap(a.wrap);
            t.after(
                '<a data-balloon="' +
                    langPhrase.separatorSettings +
                    '" data-balloon-pos="in" class="keditInlineEdit keditImage koBgHover1 kelement" contenteditable="false" href="javascript:void(null)" onclick="inlineEditItem=this;koToolbarTabs(\'Line\')"><i class="fas fa-cog"></i></a>'
            );
        });
    },
    editableLinks: function () {
        return this.each(function (e) {
            var a = $(this),
                i = "up",
                t = a.closest(".kelement");
            if (t.length > 0 || a.hasClass("keditable") || a.hasClass("kignore")) return;
            t = a.find("img");
            if (t.length > 0) return;
            t = a.closest(".koSquare");
            if (t.length > 0) i = "left";
            if (a.hasClass("poweredBy")) {
                a.append(
                    '<a contenteditable="false" data-balloon="' +
                        langPhrase.removeLink +
                        '" data-balloon-pos="right" class="keditInlineEdit keditLinkEdit koBg3 koBgHover1" href="javascript:void(null)" onclick="if(confirm(\'Are you sure?\')){$(this).parent().remove();k_EditSave(\'norefresh\');}"><i class="fas fa-link"></i></a>'
                );
                return;
            }
            if (a.hasClass("lightbox")) a.off();
            a.append(
                '<a contenteditable="false" data-balloon="' +
                    langPhrase.linkEditor +
                    '" data-balloon-pos="' +
                    i +
                    '" class="keditInlineEdit keditLinkEdit koBg3 koBgHover1" href="javascript:void(null)" onclick="window.focus();inlineEditLink=this;koToolbarTabs(\'Link\')"></a>'
            );
        });
    },
});
keditPrepare("#contentArea .kedit");
keditPrepare("#footerContent .kedit", "noSeparators");
// setupDraggableAndSortable();
function koMenuTabs(e) {
    $(".koMenuTab").removeClass("active");
    $(".koMenuTab." + $("input[name=" + e + "]:checked").attr("class")).addClass("active");
}
function updateContentPreview() {
    $(".koContentBlockPreview").each(function () {
        var e = $(this).outerHeight();
        e = e - e * 0.4;
        $(this).css("margin-bottom", 20 - e);
    });
    $(".koNewContentsMenu .isLoading").remove();
    $(".koNewContentsMenu .tab-content").removeAttr("style");
}
function replaceTags(e) {
    for (var a in cbPhrases) {
        e = e.split(a).join(cbPhrases[a]);
    }
    return e;
}
function filterAppsList(e, a) {
    if (e.length > 0) {
        var n = e.toLowerCase().replace(/([^a-z]+)/gi, " ");
        e = n;
    }
    var t = "#tab_c-0 .col-6";
    if (a == 2) t = "#manageModulesList .col-6";
    $(t).removeClass("d-none");
    $("#manageModules_integrationsTitle").removeClass("d-none");
    if (e.length === 0) {
    } else {
        var i = 1;
        $(t).each(function () {
            if ($(this).text().toLowerCase().indexOf(e) < 0) {
                $(this).addClass("d-none");
            } else {
                if ($(this).attr("data-integration") == 1) i = 0;
            }
        });
        if (i == 1) {
            $("#manageModules_integrationsTitle").addClass("d-none");
        }
    }
}
function showNewContents(e, a) {
    var t = $("#koMenuItem_content");
    if (typeof e == "undefined") {
        if ($(document).height() / 2 > $(document).scrollTop()) {
            inlineAdd = "contentArea";
        } else {
            inlineAdd = "contentArea/";
        }
    } else inlineAdd = e;
    if (t.hasClass("isLoaded")) {
        koMenuOpen("content", t);
        updateContentPreview();
        if (typeof a !== "undefined") {
            var i = new bootstrap.Tab("#contentsTab_" + a);
            i.show();
        }
    } else {
        koShowLoading();
        koMenuOpen("content", t);
        $.ajaxSetup({ cache: !1 });
        $.getJSON(blockUri, function (e) {
            var l = 0,
                r = '<div class="koMenuTabs koTabs">';
            r += "<label></label>";
            var n = '<div class="koMenuTabs"><ul class="nav" id="addContentsTablist" role="tablist"><li>',
                i = 
                    '<div class="koMenu koNewContentsMenu" id="website2" style="width:520px;box-shadow:none;background:none;margin:0"><div class="tab-content">';
            i +=
                '<div class="tab-pane" style="" id="tab_c-0"><input class="form-control appsModuleFilter align-self-center" id="addAppsModuleFilter" type="search" autocomplete="off" placeholder="' +
                langPhrase.search +
                '..." onkeyup="filterAppsList($(this).val(),1)" onclick="$(\'#addAppsModuleFilter\').val(\'\').trigger(\'keyup\').focus()" required autofocus ><a href="javascript:void(null)" onclick="$(\'#addAppsModuleFilter\').val(\'\').click()"><i class="fa fa-times"></i></a><div class="my-3"></div>' +
                draggableApps +
                "</div>";
            koHideLoading();

            $.each(e, function (e, a) {
                n += '<a data-toggle="tab" data-bs-toggle="tab" id="contentsTab_' + e + '" href="#tab_c-' + Math.round(l + 1) + '" ';
                if (l == 0) n += ' class="active"';
                n += " ><span>";
                if (typeof cbPhrases.labels[e] !== "undefined") n += cbPhrases.labels[e];
                else n += e.charAt(0).toUpperCase() + e.slice(1);
                n += "</span></a>";
                i += '<div class="tab-pane';
                if (l == 0) i += ' active"';
                l++;
                i += '" id="tab_c-' + l + '">';
                if (typeof a == "object") {
                console.log(a)

                    var t = 0;
                    $.each(a, function (e) {
                        t = a[e].id;
                        e = a[e].html;
                        if (koContentBlocksLimit.length > 0 && koContentBlocksLimit.indexOf(t) >= 0) {
                            return;
                        }
                        i += '<div class="';
                        if (t == "4016.1vvv") i += "koContentBlockPreview_live";
                        else i += "koContentBlockPreview";
                        i += '"><a onclick="keditSeparatorAdd(this)" href="javascript:void(null)" data-kid="' + t + '" class="';
                        i += 'koContentBlockPreviewIn"><span><i class="fas fa-plus-circle fa-fw text-left mr-1" style="color:var(--ui-color-accent)"></i>';
                        var n = parseFloat(t);
                        if (n > 5500 && n < 5501) {
                            i += cbPhrases.labels["clickToReplaceFooter"];
                        } else {
                            i += cbPhrases.labels["clickToAdd"];
                        }

                        if (typeof cbPhrases.labels["isLocal"] !== "undefined") i += " (#" + t + ")";
                        i += '</span></a><div style="overflow:auto;pointer-events:none;">';
                        i += replaceTags(e);
                        i += "</div></div>";
                    });
                }
                i += "</div>";
            });
            // n += '<a id="contentsTab_systemApps" data-toggle="tab" data-bs-toggle="tab" href="#tab_c-0"><span style="font-weight:700">' + langPhrase.apps + ' <i class="fas fa-fw fa-angle-right "></i> </span></a>';
            if (showElfsightWidgets_inSidebar == 1 && showElfsightWidgets_bottom != 1) n += '<div class="addElfWidget"></div>';
            n +=
                '<div class="koMenuSeparator my-3"></div><a href="javascript:void(null)" class="button" onclick="keditBlockMaker_el=[];koMenuOpen(\'contentDesigner\',$(\'#koMenuItem_content\'));keditBlockMaker_init();"><i class="fas fa-pencil-ruler fa-fw"></i> ' +
                langPhrase.designBlock +
                "</a>";
            if (showElfsightWidgets_inSidebar == 1 && showElfsightWidgets_bottom == 1) n += '<div class="addElfWidget"></div>';
            n += "</li></ul></div>";
            i += "</div></div>";
            $("#koMenu_content")
                .append('<div class="koMenuContainer">' + n + i + "</div>")
                .ready(function () {
                console.log('koMenu_content loaded')

                    if (showElfsightWidgets == 1) {
                        if (showElfsightWidgets_separate == 1) $(".addElfWidget").before('<div class="koMenuSeparator my-3"></div>');
                        $(".addElfWidget").append('<a href="javascript:void(null)" onclick="window.open(\'https://go.elfsight.io/click?pid=39&offer_id=4\')"><i class="fas fa-info-circle mx-0"></i></a>');
                        ElfsightEmbedSDK.setReferral("4f4309ae-c416-44c5-916a-59bc72c31919");
                        ElfsightEmbedSDK.displayButton(
                            document.querySelector(".addElfWidget"),
                            function (e) {
                                if (typeof e === "object" && typeof e.id !== "undefined") {
                                    keditSeparatorAdd("elfsight_" + e.id);
                                }
                            },
                            { type: "create", size: "medium", colors: [!1, !1, !1], text: langPhrase.elfsightWidgets }
                        );
                    }
                });
            n = null;
            i = null;
            var o = $("#tab_c-1 img");
            imgsCounter = o.length;
            if (imgsCounter == 0) {
                o = $("#tab_c-2 img");
                imgsCounter = o.length;
            }
            o.on("load", function () {
                console.log('loaded')
                imgsCounter--;
                if (imgsCounter < 3) {
                    t.addClass("isLoaded");
                    $("#addContentsTablist a").on("shown.bs.tab", function (e) {
                        if (e.target.toString().indexOf("#tab_c-0") > -1) {
                            $("#addAppsModuleFilter").val("").click();
                        }
                        $(".koMenu").scrollTop(0);
                        updateContentPreview();
                    });
                    if (typeof a !== "undefined") {
                        var e = new bootstrap.Tab("#contentsTab_" + a);
                        e.show();
                    }
                    updateContentPreview();
                }
            });
        });
    }
}
function linkHrefType() {
    if ($("#k_linkHrefType:checked").val() > 0) {
        $("#linkHrefPage").show();
        $("#linkHrefUrl").hide();
    } else {
        $("#linkHrefPage").hide();
        $("#linkHrefUrl").show();
    }
}
function linkImageHref() {
    if ($("#k_imageLinkHrefSwitch:checked").val() > 0) {
        $("#imageHrefUrl").show();
    } else {
        $("#imageHrefUrl").hide();
    }
}
function keditlinkStyle() {
    var a = $("#k_linkStyle option:selected"),
        e = a.attr("data-class");
    if (a.val() < 5) {
        $("#k_linkSizeHolder").hide();
    } else {
        $("#k_linkSizeHolder").show();
        e += " " + $("#k_linkSize option:selected").attr("data-class");
        e += " " + $("#k_linkShape option:selected").attr("data-class");
        e += " " + $("#k_linkShadow option:selected").attr("data-class");
    }
    var t = $(inlineEditLink).parent("a");
    $(t)
        .removeClass(
            "a-nostyle btn btn-default btn-color1 btn-outline-color1 btn-color2 btn-outline-color2 btn-secondary btn-outline-secondary btn-primary btn-outline-primary btn-success btn-outline-success btn-info btn-outline-info btn-light btn-outline-light btn-dark btn-outline-dark btn-warning btn-outline-warning btn-danger btn-outline-danger btn-ghost btn-link btn-xs btn-sm btn-lg btn-xl rounded rounded-0 rounded-pill bs-0 bs-2 bs-3"
        )
        .addClass(e);
}
function kt_FrameHide() {
    $("#kt_PreviewFrame").attr("src", "");
    $("#kt_PreviewFrameHolder").removeClass("previewSizeTablet previewSizeMobile previewSizeMargin");
    var e = $("#kt_Frame");
    if (e.hasClass("previewPage")) {
        $("#koFrameOverlay").removeClass("active");
        e.removeClass("previewPage");
    }
    e.hide();
    $(".previewActive").removeClass("previewActive");
}
function kt_Import(e, a) {
    kt_Generate_menuID = e;
    $.ajax({
        type: "GET",
        url: "admin/builder/submit?supermode=menumaker_json&id=" + e,
        contentType: "application/json",
        success: function (e) {
            if (typeof a === "undefined") a = 1;
            kt_Load(e, a);
        },
    });
}
function spinnerMore(e) {
    var t = $("#" + e),
        i = t.val();
    if (t.val() == "!") {
        if (spinnerMoreValue > 0) var a = spinnerMoreValue;
        else var a = 0;
        t.val(a).closest(".spinnersLess").show().next().hide();
    } else {
        spinnerMoreValue = i;
        if (i > 0) var a = t.val();
        else var a = 0;
        t.val("!").closest(".spinnersLess").hide().next().show().find("input").val(a);
    }
}
$(function () {
    if (typeof wizardMode !== "undefined") return !0;
    koHideLoading();
    cc_Load($("#colorStyleData").html());
    $("#koFontFinder").keyup(koFontFilter);
    $("#koFontFinder_cyrillic,#koFontFinder_latin").change(koFontFilter);
    $("body").append('<div id="koFrameOverlay">:)</div>');
    var e = $("#koBlockCopy div");
    e.append(subpagesList);
    e.find("ul").addClass("nav flex-column");
    e.find("li span").each(function () {
        $(this).wrap('<a href="javascript:void(null)" class="nav-link" onclick="koBlockClone(\'' + $(this).attr("data-id") + "')\"></a>");
    });
    $("#website").before('<div class="bodyTipHolder"></div>');
    $("#menuShowThisSubpage").change(koMenuSettings);
    $("#headerKeepTitle").change(function () {
        jQuery.ajax({
            type: "POST",
            url: "admin/builder/submit",
            data: "supermode="+configUpdateType+"&liveEdit=1&headerKeepTitle=" + encodeURIComponent($("#headerKeepTitle:checked").length) + "&pageMenuId=" + menuMenuId + "&pageId=" + menuPageId,
            success: function (e) {
                if (loginFirst(e)) return;
                if (e == "OK") {
                    koShowLoading();
                    refreshWindow();
                } else {
                    alert(e);
                }
            },
        });
    });
    fontPairsPrepare();
    colorPickerCreate();
    colorPairsPrepare();
    $("#koColorSelections select").change(function () {
        cc_Generate();
    });
    $(".jBoxTooltip").jBox("Tooltip", { theme: "TooltipBorder", zIndex: "704401", animation: "zoomIn" });
    $(".jBoxTooltipRight").jBox("Tooltip", { theme: "TooltipBorder", zIndex: "704401", animation: "move", position: { x: "right", y: "center" }, outside: "x" });
    $("#footerContent").attr("data-label", langPhrase.footerLabel);
    $(document).on("click", ".spinner-group button", function () {
        var a = $(this),
            t = Math.floor(a.closest(".spinner-group").find("input").val().trim()),
            e = 0;
        if (a.text() == "+") {
            e = parseInt(t) + 1;
        } else {
            if (t > 1) {
                e = parseInt(t) - 1;
            } else {
                e = 0;
            }
        }
        a.closest(".spinner-group").find("input").val(e);
    });
});
var _scrollTop = 0,
    _scrollTopPadding = 0;
$(function (e) {
    var t = 400,
        a = e("#scrollToTop");
    e(window).scroll(function () {
        if (_scrollTop > 0) {
            e(this).scrollTop() > t ? a.addClass("active") : a.removeClass("active");
        } else a.removeClass("active");
    }),
        a.on("click", function (t) {
            a.removeClass("active");
            e("body,html").animate({ scrollTop: 0 });
        });
});
$(document).keydown(function (e) {
    if (typeof wizardMode !== "undefined") return !0;
    if (e.keyCode === 27) {
        if (typeof basicModal !== "undefined") {
            basicModal.close();
        }
        if ($(".koPopup").length > 0) koPopup(0);
        else if ($("#kt_Frame").is(":visible")) kt_FrameHide();
        else {
            koMenuClose();
        }
    } else {
        if ((e.ctrlKey || e.metaKey) && e.keyCode == 83) {
            e.preventDefault();
            k_EditSave("norefresh");
            return !1;
        } else if ((e.ctrlKey || e.metaKey) && e.keyCode == 66) {
            e.preventDefault();
            if ($("#kToolbar").is(":visible")) keditor("bold");
            return !1;
        }
    }
});
function cf_Save() {
    var e = {};
    $("#koFontSelections select").each(function () {
        var a = $(this).attr("id"),
            t = $(this).val();
        e[a.substring(4)] = { v: t };
    });
    return e;
}
function cf_Generate(e) {
    var a = "ko_Theme inAdminMode";
    if ($("html").hasClass("ko_ThemeOn")) a += " ko_ThemeOn";
    else if ($("html").hasClass("ko_ThemeFixed")) a += " ko_ThemeFixed";
    else if ($("html").hasClass("ko_ThemeOnSide")) a += " ko_ThemeOnSide";
    $("html").attr("class", a);
    if ($("#koBodyBoxed").is(":checked")) {
        $("html").addClass("ko_ThemeBoxed");
    }
    if ($("#koDarkTheme").is(":checked")) {
        $("html").addClass("koThemeDark");
    }
    var m = {},
        i = $("#cf__title").val(),
        n = $("#cf__titleWeight").val(),
        l = $("#cf__menu").val(),
        o = $("#cf__menuWeight").val(),
        r = $("#cf__headers1").val(),
        s = $("#cf__headers1Weight").val(),
        c = $("#cf__headers2").val(),
        f = $("#cf__headers2Weight").val(),
        d = $("#cf__text").val(),
        u = $("#cf__button").val(),
        p = $("#cf__footerTitle").val(),
        h = $("#cf__footerText").val();
    var t =
        ".ko_Theme #website, .ko_Theme #website p{font-family:var(--font" +
        d +
        "),sans-serif;}.ko_Theme #website a.btn, .ko_Theme #website button.btn{font-family:var(--font" +
        u +
        "),sans-serif;}.ko_Theme #website h1,.ko_Theme #website h2,.ko_Theme #website h3{font-family:var(--font" +
        r +
        "),sans-serif;font-weight:" +
        s +
        "}.ko_Theme #website h4,.ko_Theme #website h5,.ko_Theme #website h6{font-family:var(--font" +
        c +
        "),sans-serif;font-weight:" +
        f +
        "}.ko_Theme #website .topmenu{font-family:var(--font" +
        l +
        "),sans-serif;font-weight:" +
        o +
        "}.ko_Theme #website .logoHolder h2{font-family:var(--font" +
        i +
        "),sans-serif;font-weight:" +
        n +
        "}.ko_Theme #website #footerContent {font-family:var(--font" +
        h +
        "),sans-serif;}.ko_Theme #website #footerContent h1,.ko_Theme #website #footerContent h2,.ko_Theme #website #footerContent h3,.ko_Theme #website #footerContent h4,.ko_Theme #website #footerContent h5,.ko_Theme #website #footerContent h6 {font-family:var(--font" +
        p +
        "),sans-serif;}";
    $("#cf_Style").html(t + ":root{--font1:" + $("#ko_font1").val() + ";--font2:" + $("#ko_font2").val() + ";--font3:Helvetica Neue;}");
    if (e == 1) {
        cfData = t + "|||" + JSON.stringify(cf_Save());
        koPageFonts("save");
    }
}
function cf_Load(e) {
    cf_toLoad = 0;
    var a = JSON.parse(e);
    for (i in a) {
        var t = "cf__" + i;
        $("#" + t).val(a[i].v);
    }
    cf_Generate();
}
function cc_Load(e) {
    if (e != "") {
        cc_toLoad = 0;
        var a = JSON.parse(e);
        for (i in a) {
            var t = "cc__" + i;
            $("#" + t).val(a[i].v);
        }
    }
    cc_Generate();
}
function cc_Save() {
    var e = {};
    $("#koColorSelections input").each(function () {
        var a = $(this).attr("id"),
            t = $(this).val();
        e[a.substring(4)] = { v: t };
    });
    e.Color1 = { v: $("#cc__Color1").val() };
    e.Color2 = { v: $("#cc__Color2").val() };
    return e;
}
function cc_Generate(e, a) {
    var n = "",
        w = {},
        t = $("#cc__Color1").val(),
        i = $("#cc__Color2").val(),
        c = $("#cc__body").val(),
        f = $("#cc__text").val(),
        l = $("#cc__button").val(),
        d = $("#cc__headers1").val(),
        u = $("#cc__headers2").val(),
        p = $("#cc__footerTitle").val(),
        h = $("#cc__footerText").val();
    if (l.indexOf("--color") > -1) l = "var(" + l + ")";
    if (c.indexOf("--color") > -1) c = "var(" + c + ")";
    if (f.indexOf("--color") > -1) f = "var(" + f + ")";
    if (d.indexOf("--color") > -1) d = "var(" + d + ")";
    if (u.indexOf("--color") > -1) u = "var(" + u + ")";
    if (p.indexOf("--color") > -1) p = "var(" + p + ")";
    if (h.indexOf("--color") > -1) h = "var(" + h + ")";
    n += "#contentArea .koColor {color:" + t + ";}";
    n += "ul.koCheckList li:before {background:" + t + ";}";
    n +=
        ".ko_Theme #website .btn-primary {background-color:" +
        l +
        ";border-color:" +
        l +
        ";}.ko_Theme #website .btn-outline-primary {color:" +
        l +
        ";border-color:" +
        l +
        ";}.ko_Theme #website .btn-outline-primary:hover {background-color:" +
        l +
        ";color:var(--color1_bw);border-color:" +
        l +
        ";}";
    n += "#website .page-item.active .page-link {background-color:" + t + ";color:var(--color1_bw);border-color:" + l + ";}";
    n += "#contentArea a:not(.btn),#contentArea a.btn-link {color:" + l + "}";
    n += "#website.koMenu a:not(.btn):not(.koMenuButton),#website.koMenu a.btn-link {color:" + l + "}";
    n += "#website .keditDark .keditWhite a:not(.btn):not(.page-link),#website .keditDark .keditWhite a.btn.btn-link{color:" + l + "}";
    if (c != "") {
        n += ".ko_Theme body,.ko_Theme #website{background:" + c + "}";
    }
    n += ".ko_Theme #contentArea, .ko_Theme .koThemeDark #contentArea .whiteShadowContainer {color:" + f + "}";
    n +=
        "";
    n +=
        "";
    n += ".ko_Theme #website #footerContent {color: " + h + ";}";
    n +=
        "";
    r = parseInt(t.substr(1, 2), 16);
    g = parseInt(t.substr(3, 2), 16);
    b = parseInt(t.substr(5, 2), 16);
    r2 = parseInt(i.substr(1, 2), 16);
    g2 = parseInt(i.substr(3, 2), 16);
    b2 = parseInt(i.substr(5, 2), 16);
    function m(e, a) {
        if (e.indexOf("(") > 0) {
            e = e.split("(");
            e = e[1].split(")");
            e = e[0].split(",");
            var n = parseInt(e[0].replace(/\D/g, "")),
                t = parseInt(e[1].replace(/\D/g, "")),
                i = parseInt(e[2].replace(/\D/g, ""));
        } else {
            var d = /^#?([a-f\d]{1,2})([a-f\d]{1,2})([a-f\d]{1,2})$/i.exec(e);
            if (typeof d === "undefined") {
                var n = 25,
                    t = 148,
                    i = 209;
            } else {
                var n = parseInt(d[1], 16),
                    t = parseInt(d[2], 16),
                    i = parseInt(d[3], 16);
            }
        }
        if (a == "rgb") return [n, t, i];
        else {
            (n /= 255), (t /= 255), (i /= 255);
            var r = Math.max(n, t, i),
                f = Math.min(n, t, i),
                l,
                o,
                s = (r + f) / 2;
            if (r == f) {
                l = o = 0;
            } else {
                var c = r - f;
                o = s > 0.5 ? c / (2 - r - f) : c / (r + f);
                switch (r) {
                    case n:
                        l = (t - i) / c + (t < i ? 6 : 0);
                        break;
                    case t:
                        l = (i - n) / c + 2;
                        break;
                    case i:
                        l = (n - t) / c + 4;
                        break;
                }
                l /= 6;
            }
            o = o * 100;
            o = Math.round(o);
            s = s * 100;
            s = Math.round(s);
            l = Math.round(360 * l);
            return [l, o, s];
        }
    }
    var k = m(t, "rgb"),
        o = m(t),
        v = m(i, "rgb"),
        s = m(i),
        y =
            "--color1_rgb: " +
            k[0] +
            "," +
            k[1] +
            "," +
            k[2] +
            ";--color1_hsl: " +
            o[0] +
            "," +
            o[1] +
            "%," +
            o[2] +
            "%;--color1_hs: " +
            o[0] +
            "," +
            o[1] +
            "%;--color1_h: " +
            o[0] +
            ";--color1_s: " +
            o[1] +
            "%;--color1_l: " +
            o[2] +
            "%;--color1_25:" +
            shade(t, 0.75) +
            ";--color1_50:" +
            shade(t, 0.5) +
            ";--color1_75:" +
            shade(t, 0.25) +
            ";--color1_125:" +
            shade(t, -0.25) +
            ";--color1_150:" +
            shade(t, -0.5) +
            ";--color1_175:" +
            shade(t, -0.75) +
            ";--color2_rgb: " +
            v[0] +
            "," +
            v[1] +
            "," +
            v[2] +
            ";--color2_hsl: " +
            s[0] +
            "," +
            s[1] +
            "%," +
            s[2] +
            "%;--color2_hs: " +
            s[0] +
            "," +
            s[1] +
            "%;--color2_h: " +
            s[0] +
            ";--color2_s: " +
            s[1] +
            "%;--color2_l: " +
            s[2] +
            "%;--color2_25:" +
            shade(i, 0.75) +
            ";--color2_50:" +
            shade(i, 0.5) +
            ";--color2_75:" +
            shade(i, 0.25) +
            ";--color2_125:" +
            shade(i, -0.25) +
            ";--color2_150:" +
            shade(i, -0.5) +
            ";--color2_175:" +
            shade(i, -0.75) +
            ";",
        x =
            "--color1_bw:" +
            blockContrastCheck(t, 2) +
            ";--color1_25_bw:" +
            blockContrastCheck(shade(t, 0.75), 2) +
            ";--color1_50_bw:" +
            blockContrastCheck(shade(t, 0.5), 2) +
            ";--color1_75_bw:" +
            blockContrastCheck(shade(t, 0.25), 2) +
            ";--color1_125_bw:" +
            blockContrastCheck(shade(t, -0.25), 2) +
            ";--color1_150_bw:" +
            blockContrastCheck(shade(t, -0.5), 2) +
            ";--color1_175_bw:" +
            blockContrastCheck(shade(t, -0.75), 2) +
            ";--color2_bw:" +
            blockContrastCheck(i, 2) +
            ";--color2_25_bw:" +
            blockContrastCheck(shade(i, 0.75), 2) +
            ";--color2_50_bw:" +
            blockContrastCheck(shade(i, 0.5), 2) +
            ";--color2_75_bw:" +
            blockContrastCheck(shade(i, 0.25), 2) +
            ";--color2_125_bw:" +
            blockContrastCheck(shade(i, -0.25), 2) +
            ";--color2_150_bw:" +
            blockContrastCheck(shade(i, -0.5), 2) +
            ";--color2_175_bw:" +
            blockContrastCheck(shade(i, -0.75), 2) +
            ";";
    $("#cc_Style").html(n + " :root{--color1:" + t + ";--color2:" + i + ";" + y + x + "}");
    if (e == 1) {
        ccData = t + "|||" + i + "|||" + n + "|||" + JSON.stringify(cc_Save()) + "|||" + y + x;
        koColorSettings();
    }
}
$(function () {
    var e = "",
        a = {};
    $(".koparsed").each(function () {
        var t = $(this).attr("rel").split("_");
        t = t[0];
        t = t.split(",");
        t = t[0];
        if (t != "footer" && t != "sitemap" && t != "submenu" && typeof a[t] == "undefined") {
            e += '<a href="javascript:void(null)" onclick="koSideFrame(null,\'admin/builder/submit?p=quickEdit&module=' + t + "&inSidebar=1')\">";
            if (typeof langPhrase[t] !== "undefined") e += langPhrase[t];
            else {
                e += '<span style="text-transform: capitalize">' + t + "</span>";
            }
            e += "</a>";
        }
        a[t] = 1;
    });
    if (e != "")
        $("#koModulesOnPage").html(
            '<div class="koMenuSeparator my-3"></div><div class="koMenuTabsGroup"><div class="koMenuTabsTitle"><i class="fas fa-star"></i> ' +
                langPhrase.appsOnThisPage +
                "</div>" +
                e +
                '</div><a href="javascript:void(null)" class="button" onclick="$(\'#koMenuItem_content\').click();"><i class="fas fa-plus-square fa-fw"></i> ' +
                langPhrase.addModuleToThisPage +
                "</a>"
        );
    else
        $("#koModulesOnPage").html(
            '<div class="koMenuSeparator my-3"></div><a href="javascript:void(null)" class="button" onclick="$(\'#koMenuItem_content\').click();"><i class="fas fa-plus-square fa-fw"></i> ' + langPhrase.addModuleToThisPage + "</a>"
        );
});
function pageTypeChange(e, a) {
    var n = $("#menuItemType_" + e),
        t = n.val(),
        i = "";
    if (typeof pageTypeChange_disabled !== "undefined") {
        $("#menuitem_" + e).select();
        return !1;
    }
    if (t == 1) {
        t = 11;
        i = "fas fa-file";
    } else if (t == 11) {
        t = 12;
        i = "far fa-file";
    } else if (t == 12) {
        t = 2;
        i = "far fa-eye-slash";
    } else if (t == 2) {
        t = 1;
        if (a == 1) {
            i = "fas fa-home";
        } else {
            i = "far fa-file-alt";
        }
    }
    $("#menuItemTypeIcon_" + e).attr("class", "fa-fw " + i);
    n.val(t);
    $("#menuitem_" + e).focus();
}
function kpg_card(e, a) {
    var t = $(a).parent().parent();
    if (e == 2) t.remove();
    else if (e == 1) {
        var i = t.clone();
        t.after(i);
    }
}
$.fn.changeTag = function (e) {
    var a = $("<" + e + ">"),
        t = ID(),
        i = {};
    $.each(this.get(0).attributes, function (e, a) {
        i[a.name] = a.value;
    });
    a.attr(i);
    a.attr("data-tag-tmp", t);
    a.data(this.data());
    var n = this.html();
    a.append(n);
    this.replaceWith(a);
    focusElement = $('[data-tag-tmp="' + t + '"]')[0];
    keditableFocusOverlay($(focusElement), 1);
    $(focusElement).removeAttr("data-tag-tmp");
    return a;
};
var keditorSavedRange;
function keditor(e, a, t) {
    if (typeof a === "undefined") a = null;
    if (e == "Remove") {
        if (confirm("Do you want to remove this element?")) {
            var r = $(focusElement);
            if (r.parent().hasClass("breadcrumb-item")) r.parent().remove();
            else r.remove();
            keditableToolbar("hide");
            k_EditSave("norefresh");
        }
        return !0;
    } else if (e == "Class") {
        var s = document.getSelection();
        document.execCommand("insertHTML", !1, '<span class="koColor">' + s + "</span>");
    } else if (e == "createImage") {
        var o = "link-" + guidGenerator();
        if (window.getSelection().toString()) {
            sel = window.getSelection();
            selText = window.getSelection().toString();
            if (sel.rangeCount) {
                range = sel.getRangeAt(0);
                range.deleteContents();
                document.execCommand("insertHTML", !1, '<img class="" id="' + o + '" src="/uploads/images/default.png" />');
            }
        } else {
            document.execCommand("insertHTML", !1, '<img  class="" id="' + o + '" src="/uploads/images/default.png" />');
        }
        $(focusElement).focus();
        $(focusElement).find(".keditInlineEdit.keditLinkEdit").remove();
        $(focusElement).find("img").editableLinks();
        $(focusElement).blur();
        k_EditSave('reload');
        keditableToolbar("hide");
        $("#" + o)
            .find("img")
            .click();
        $("#" + o).removeAttr("id");
        
    } else if (e == "createLink") {
        var o = "link-" + guidGenerator();
        if (window.getSelection().toString()) {
            sel = window.getSelection();
            selText = window.getSelection().toString();
            if (sel.rangeCount) {
                range = sel.getRangeAt(0);
                range.deleteContents();
                document.execCommand("insertHTML", !1, '<a id="' + o + '" href="#">' + selText + "</a>");
            }
        } else {
            document.execCommand("insertHTML", !1, '<a id="' + o + '" href="' + a + '">' + a + "</a>");
        }
        $(focusElement).focus();
        $(focusElement).find(".keditInlineEdit.keditLinkEdit").remove();
        $(focusElement).find("a").editableLinks();
        $(focusElement).blur();
        k_EditSave("norefresh");
        keditableToolbar("hide");
        $("#" + o)
            .find("a")
            .click();
        $("#" + o).removeAttr("id");

        setTimeout(function(){
            window.reload()
        }, 1000)
    } else if (e == "saveFocus") {
        if (window.getSelection) {
            keditorSavedRange = window.getSelection().getRangeAt(0);
        } else if (document.selection) {
            keditorSavedRange = document.selection.createRange();
        }
    } else {
        if (e == "Align") {
            var i = $(focusElement).css("text-align");
            if (i != "center" && i != "left" && i != "right" && i != "justify") i = "left";
            var c = $(focusElement).css("font-weight");
            if (i == "center") i = "right";
            else if (i == "right") i = "justify";
            else if (i == "justify") i = "left";
            else if (i == "left") i = "center";
            $(focusElement).css("text-align", i);
            $(".fa-toolbar-align")
                .removeClass("fa-align-left fa-align-justify fa-align-right fa-align-center")
                .addClass("fa-align-" + i);
            $(focusElement).focus();
            return !0;
        } else if (e == "Format") {
            var n = $(focusElement),
                l = n.prop("tagName");
                alert(l)
            if (l == "H1") {
                n.changeTag("h1");
                $("#kToolbarFormat").text("h1");
            } else if (l == "H3") {
                n.changeTag("h3");
                $("#kToolbarFormat").text("h3");
            } else if (l == "H3") {
                n.changeTag("h4");
                $("#kToolbarFormat").text("h4");
            } else if (l == "H4") {
                n.changeTag("h5");
                $("#kToolbarFormat").text("h5");
            } else if (l == "H5") {
                n.changeTag("h6");
                $("#kToolbarFormat").text("h6");
            } else if (l == "H6") {
                n.changeTag("h1");
                $("#kToolbarFormat").text("h1");
            } else if (l == "DIV") {
                console.log(n)
                
                // n.changeTag("h2");
                // $("#kToolbarFormat").text("h2");
            }
            $(".keditable").off();
            initKeditable();
            return !0;
        }
        if (keditorElement == "header") {
        }
        if (e != "italic" && e != "bold") {
            document.execCommand("styleWithCSS", !1, !0);
        }
        document.execCommand(e, !1, a);
    }
}
function kfontSize(e) {
    var l = $(focusElement).prop("tagName"),
        t = $(focusElement).prop("class").split(" ");
    if (
        l.substring(0, 1).toLowerCase() == "h" ||
        t.indexOf("display-1") > -1 ||
        t.indexOf("display-2") > -1 ||
        t.indexOf("display-3") > -1 ||
        t.indexOf("display-4") > -1 ||
        t.indexOf("h1") > -1 ||
        t.indexOf("h2") > -1 ||
        t.indexOf("h3") > -1 ||
        t.indexOf("h4") > -1 ||
        t.indexOf("h5") > -1 ||
        t.indexOf("h6") > -1
    ) {
        var n = 1;
    }
    if (typeof n !== "undefined") {
        var i = $(focusElement).attr("style");
        if (typeof i !== "undefined" && i.indexOf("font-size") > -1) {
            $(focusElement).attr(
                "style",
                $(focusElement)
                    .attr("style")
                    .replace(/font-size:[^;]+/g, "")
                    .replace(/font-family:[^;]+/g, "")
            );
        }
        var a = parseFloat($(focusElement).css("--kedit-fsx"));
        if (e == "plus") a = parseFloat(a * 1 + 0.05).toFixed(2);
        else a = parseFloat(a * 1 - 0.05).toFixed(2);
        $(focusElement).css("--kedit-fsx", a);
        return !0;
    } else {
        var a = $(focusElement).css("font-size").replace("px", "");
        if (e == "plus") a = Math.round(a * 1 + 2);
        else a = Math.round(a * 1 - 2);
        $(focusElement).css("font-size", a);
    }
}
function keditablePaste(e) {
    var t, a, n;
    e.stopPropagation();
    e.preventDefault();
    t = e.clipboardData || window.clipboardData;
    a = t.getData("text/html");
    if (a == "") a = t.getData("text/plain");
    var i = { b: !0, i: !0, strong: !0, em: !0, br: !0 };
    a = a.replace(/<\/?([a-z]+) ?[^>]*>/gi, function (e, a) {
        if (i[a]) {
            return e;
        }
        return "";
    });
    document.execCommand("insertHTML", !1, a);
    return !1;
}
function getDocHeight() {
    var e = document;
    return Math.max(e.body.scrollHeight, e.documentElement.scrollHeight, e.body.offsetHeight, e.documentElement.offsetHeight, e.body.clientHeight, e.documentElement.clientHeight);
}
var keditableFocusSize = new Array(0, 0);
function keditableFocusOverlay(e, a) {
    if (typeof wizardMode !== "undefined") return !0;
    var i = $(e);
    if (typeof a === "undefined") {
        keditableFocusSize = new Array(i.outerWidth(), i.outerHeight());
    } else {
        if (i.outerWidth() == keditableFocusSize[0] && i.outerHeight() == keditableFocusSize[1]) {
            return;
        } else {
            keditableFocusSize = new Array(i.outerWidth(), i.outerHeight());
        }
    }
    $(".kToolbarOverlay").remove();
    var t = i.offset();
    t.left = Math.round(t.left);
    t.top = Math.round(t.top);
    t.width = Math.round(i.outerWidth());
    t.height = Math.round(i.outerHeight());
    t.bodyHeight = getDocHeight();
    $("body").attr("style", null);
    var n = $("#kToolbar");
    n.before(
        '<div onclick="keditableToolbar(\'hide\')" class="kToolbarOverlay" style="position:absolute;z-index:65405;background:linear-gradient(to bottom,rgba(0,0,0,0.8),rgba(0,0,0,0.5));top:0;left:0;right:0;height:' +
            (t.top - 15) +
            'px"></div>'
    );
    n.before(
        '<div onclick="keditableToolbar(\'hide\')" class="kToolbarOverlay" style="position:absolute;z-index:65405;background:rgba(0,0,0,0.5);top:' +
            Math.round(t.top - 15) +
            "px;left:0;height:" +
            (15 + 15 + t.height) +
            "px;width:" +
            (t.left - 15) +
            'px"></div>'
    );
    n.before(
        '<div onclick="keditableToolbar(\'hide\')" class="kToolbarOverlay" style="position:absolute;z-index:65405;background:linear-gradient(to top,rgba(0,0,0,0.8),rgba(0,0,0,0.5));top:' +
            (15 + t.top + t.height) +
            "px;left:0;height:" +
            (t.bodyHeight - t.top - 15 - t.height) +
            'px;right:0"></div>'
    );
    n.before('<div onclick="keditableToolbar(\'hide\')" class="kToolbarOverlay" class="kToolbarOverlay_r" style=";top:' + (t.top - 15) + "px;left:" + (t.width + t.left + 15) + "px;right:0;height:" + (15 + 15 + t.height) + 'px;"></div>');
    rspace = $(window).width() - t.width - t.left - 15;
    n.addClass("active");
    $("body").addClass("koEditingMode");
}
const keditingObserveElement = document.querySelector("body");
const keditingObserver = new ResizeObserver((entries) => {
    entries.forEach((entry) => {
        if (typeof focusElement !== "undefined") keditableFocusOverlay(focusElement, 1);
    });
});
function keditableToolbar(e, a) {
    if (e == "hide") {
        $("#kToolbar").removeClass("active");
        $("body").removeClass("koEditingMode");
        $(focusElement).blur().removeClass("keditableActive").attr({ spellcheck: "false", contenteditable: "false" }).attr({ contenteditable: "true" });
        $("lt-toolbar").remove();
        $(".kToolbarMore").hide();
        $(".kToolbarLess").show();
        $(".kToolbarOverlay").remove();
        $(".keditableFocused").removeClass("keditableFocused");
        if (document.selection) {
            document.selection.empty();
        } else if (window.getSelection) {
            window.getSelection().removeAllRanges();
        }
        if (typeof focusElement !== "undefined" && typeof focusElement === "object") {
            keditingObserver.unobserve(focusElement);
        }
        return !0;
    }
    document.execCommand("enableInlineTableEditing", null, !1);
    $(e)
        .attr({ contenteditable: !0, spellcheck: !1, onDrag: "return false", onDrop: "return false", onpaste: "keditablePaste(event);" })
        .on("focus", function () {
            focusElement = e;
            $(e).attr("spellcheck", "true");
            keditableFocusOverlay(e);
            var a = $(e).addClass("keditableActive").offset(),
                n = $("#kToolbar"),
                i = $(e).prop("tagName").toLowerCase();
            $("#kToolbarFormat").html(i);
            keditorElement = "content";
            if (i.substring(0, 1) == "h") {
                $("#kToolbarFormat").show();
                $("#ktoolbar_bold").hide();
            } else {
                $("#kToolbarFormat").hide();
                $("#ktoolbar_bold").show();
            }
            if (i.substring(0, 1) == "h" || i.substring(0, 1) == "p") {
                keditorElement = "header";
                var t = $(focusElement).css("text-align");
                if (t != "center" && t != "left" && t != "right") t = "left";
                $(".fa-toolbar-align")
                    .removeClass("fa-align-left fa-align-right fa-align-center")
                    .addClass("fa-align-" + t);
                $(".kToolbarHeader").show();
                $(".kToolbarContent").hide();
            } else {
                $(".kToolbarHeader").hide();
                $(".kToolbarContent").show();
            }
            if (Math.round(a.left + n.width()) > $(window).width()) n.css({ left: "auto", right: rspace, top: a.top - 60.5 });
            else n.css({ right: "auto", left: a.left - 14.5, top: a.top - 60.5 });
            if (typeof focusElement.length !== "undefined" && focusElement.length == 1) focusElement = focusElement[0];
            keditingObserver.observe(focusElement);
            if (Math.round(a.top - 60) - $(window).scrollTop() < 0) {
                $("html, body").animate({ scrollTop: a.top - 100 });
            }
        });
}
function kToolbarPosition() {
    var e = $(focusElement).offset(),
        a = $("#kToolbar");
    if (Math.round(e.left + a.width()) > $(window).width()) a.css({ left: "auto", right: rspace, top: e.top - 60.5 });
    else a.css({ right: "auto", left: e.left - 14.5, top: e.top - 60.5 });
}
function keditBlockMaker_init(e) {
    $("#keditingToolbar,#keditingToolbarBg").removeClass("active");
    $("input[name=kediting_align]").on("change click input", kediting_alignApply);
    $("input[name=kediting_columnAlign]").on("change click input", kediting_columnAlignApply);
    if (typeof e === "undefined" || $("#keditingBlock").html() == "") {
        $("#keditingBlock").html(
            '<div class="container"><div class="row"><div class="col-lg js-controlable"><div class="col-container"><h2 class="js-keditable js-controlable mt-2 mb-2">' +
                langPhrase.header +
                '</h2><div class="js-keditable js-controlable mt-2 mb-2">' +
                langPhrase.loremIpsum +
                '</div><div class="koButtons d-flex js-controlable mt-4 mb-2"><div class="js-draggable"><a href="javascript:void(null)" class="btn btn-color1">' +
                langPhrase.buttonPrimary +
                '</a><a href="javascript:void(null)" class="btn btn-color2">' +
                langPhrase.learnMore +
                '</a></div></div></div></div><div class="col-lg js-controlable"><div class="col-container"><div class="kimgRatio js-controlable mt-2 mb-2"><img class="img-fluid" src="' +
                FilexLocation +
                'editor_images/img.svg"></div></div></div></div></div>'
        );
    }
    var t = $("#koMenu_contentDesigner .koMenuButtonHolder");
    t.attr("style", "width:calc(100vw - " + t.position().left + "px - 100px);");
    if (typeof e === "string") {
        keditBlockMaker_el = e;
        $('#keditingBlock .row > [class^="col"]').addClass("js-controlable");
        $("#keditingBlock img").each(function () {
            var e = $(this).parent(),
                a = "." + e.attr("class");
            if (a.indexOf("kimgRatio") < 0) {
                e = e.parent();
                a = "." + e.attr("class");
            }
            if (a.indexOf("kimgRatio") > -1) {
                e.replaceWith('<div class="js-img-holder js-controlable">' + e.prop("outerHTML") + "</div>");
            }
        });
        $("#keditingBlock .koSeparator").each(function () {
            $(this).replaceWith('<div class="js-controlable">' + $(this).prop("outerHTML") + "</div>");
        });
        $("#keditingBlock .koButtons").each(function () {
            $(this)
                .addClass("js-controlable")
                .html('<div class="js-draggable">' + $(this).html() + "</div>");
        });
        $("#keditingBlock .js-video-holder").each(function () {
            $(this).addClass("js-controlable");
        });
        $("#keditingBlock ol.breadcrumb").each(function () {
            $(this)
                .addClass("js-controlable")
                .html('<div class="js-draggable d-flex">' + $(this).html() + "</div>");
        });
        $("#keditingBlock .keditable").each(function () {
            var e = [];
            e = $(this).closest(".breadcrumb-item");
            if (e.length > 0) {
            } else {
                $(this).addClass("js-keditable js-controlable").removeClass("keditable");
            }
        });
    }
    kediting_sortableControllers();
    kediting_buttonsSortable();
    kediting_columnsSortable();
    var a = $("#keditingBlock .row")[0];
    if (typeof a !== "undefined") {
        Sortable.create(a, { handle: ".controllerMoveColumn", animation: 250 });
    }
    new Sortable($("#availableElements_1")[0], { group: { name: "shared", pull: "clone", put: !1 }, animation: 150, sort: !1 });
    kediting_sortableControllers();
}
function keditBlockMaker_apply() {
    $("#tmpSave").html($("#keditingBlock").html());
    $("#tmpSave .js-controller").remove();
    $("#tmpSave .js-range").remove();
    $("#tmpSave .js-keditable").addClass("keditable");
    $("#tmpSave .js-controlable").removeClass("js-controlable");
    $("#tmpSave .js-keditable").removeClass("js-keditable");
    $("#tmpSave [draggable]").removeAttr("draggable");
    $("#tmpSave .koButtons .js-draggable, #tmpSave .breadcrumb .js-draggable").each(function () {
        $(this).replaceWith($(this).html());
    });
    $("#tmpSave .js-img-holder").each(function () {
        $(this).replaceWith($(this).html());
    });
    $("#tmpSave .koSeparator").each(function () {
        $(this).parent().replaceWith($(this).prop("outerHTML"));
    });
    var a = $("#tmpSave").find(".keditable");
    if (a.length > 0) {
    } else {
        $("#tmpSave").append('<span class="keditable d-none"></span>');
    }
    if (typeof keditBlockMaker_el === "string") {
        var e = $("#" + keditBlockMaker_el).find(".keditable-block");
        if (e.length == 1) {
            e.html($("#tmpSave").html());
        } else {
            $("#" + keditBlockMaker_el).html($("#tmpSave").html());
        }
        $("#" + keditBlockMaker_el)
            .closest("section")
            .attr("data-keditor", 1);
        k_EditSave();
    } else {
        keditBlockMaker_el = 1;
        keditSeparatorAdd($("#tmpSave").html());
    }
    $("#tmpSave,#keditingBlock").html("");
}
function kediting_buttonsSortable() {
    var a = $("#keditingBlock .koButtons .js-draggable");
    for (var e = 0; e < a.length; e++) {
        Sortable.create(a[e], { group: { name: "_kobuttons" }, animation: 250 });
    }
    var a = $("#keditingBlock .breadcrumb .js-draggable");
    for (var e = 0; e < a.length; e++) {
        Sortable.create(a[e], { group: { name: "_kobreadcrumbs" }, animation: 250, direction: "vertical" });
    }
    $("#keditingBlock a").click(function (e) {
        e.preventDefault;
        return !1;
    });
}
function kediting_sortableControllers() {
    $("#keditingBlock .js-controlable").each(function () {
        if ($(this).find(".js-controller").length == 0) {
            var i = $(this).prop("outerHTML"),
                a = "",
                t = "Element";
            if (i.indexOf("col-") > 0) {
                a = "column";
                t = langPhrase.column;
            } else if (i.indexOf("koPreTitle") > 0) t = langPhrase.subtitle;
            else if (i.indexOf("/h2>") > 0) t = langPhrase.header;
            else if (i.indexOf("koSeparator") > 0) {
                t = langPhrase.separator;
                a = "separator";
            } else if (i.indexOf("koButtons") > 0) {
                t = langPhrase.buttons;
                a = "buttons";
            } else if (i.indexOf("img-fluid") > 0) {
                t = langPhrase.image;
                a = "image";
            } else if (i.indexOf("koCheckList") > 0) t = langPhrase.list;
            else if (i.indexOf("js-video-holder") > 0) t = langPhrase.video;
            else if (i.indexOf("breadcrumb") > 0) {
                t = langPhrase.list;
                a = "breadcrumb";
            } else t = langPhrase.text;
            var e = '<div class="js-controller';
            if (a == "column") e += " controllerForColumn";
            e += '"><div class="js-controller-inner"><div class="controller_move';
            if (a == "column") e += " controllerMoveColumn ";
            else e += " controllerMoveColumnElement";
            e += ' d-inline-block"><small><i class="fas fa-grip-vertical fa-fw mx-1"></i>' + t;
            e += "</small></div>";
            if (a != "separator" && a != "image") {
                e += '<button class="controller_config" onclick="kediting_controllerConfig(this,\'|p|m|\')" data-balloon-pos="downleft" data-balloon="' + langPhrase.settings + '"><i class="fas fa-cog fa-fw"></i></button>';
            }
            e += '<button class="controller_clone" onclick="kediting_controllerClone(this)" data-balloon-pos="downleft" data-balloon="' + langPhrase.cloneThis + '"><i class="fas fa-copy fa-fw"></i></button>';
            if (a == "buttons") {
                e += '<button class="controller_add" onclick="kediting_controllerClone(this,\'.btn\',-1)" data-balloon-pos="downleft" data-balloon="' + langPhrase.removeLast + '"><i class="fas fa-minus-square fa-fw"></i></button>';
                e += '<button class="controller_add" onclick="kediting_controllerClone(this,\'.btn\')" data-balloon-pos="downleft" data-balloon="' + langPhrase.addAnother + '"><i class="fas fa-plus-square fa-fw"></i></button>';
            } else if (a == "breadcrumb") {
                e +=
                    '<button class="controller_add" onclick="kediting_controllerClone(this,\'.breadcrumb-item\',-1)" data-balloon-pos="downleft" data-balloon="' +
                    langPhrase.removeLast +
                    '"><i class="fas fa-minus-square fa-fw"></i></button>';
                e += '<button class="controller_add" onclick="kediting_controllerClone(this,\'.breadcrumb-item\')" data-balloon-pos="downleft" data-balloon="' + langPhrase.addAnother + '"><i class="fas fa-plus-square fa-fw"></i></button>';
            }
            e += '<button class="controller_remove" onclick="kediting_controllerRemove(this)" data-balloon-pos="downleft" data-balloon="' + langPhrase.removeThis + '"><i class="fas fa-trash-alt fa-fw"></i></button></div></div>';
            $(this).prepend(e);
        }
    });
}
function kediting_colSortable(e) {
    new Sortable(e, {
        filter: ".controllerForColumn",
        preventOnFilter: !1,
        handle: ".controllerMoveColumnElement",
        group: { name: "shared" },
        ghostClass: "kediting_dragGhost",
        direction: "horizontal",
        animation: 250,
        dragoverBubble: !0,
        onAdd: function (e) {
            if (e.pullMode == "clone") {
                if (e.clone.className.indexOf("-pretitle") > 0) {
                    $(e.item).replaceWith('<div class="js-keditable koPreTitle js-controlable mt-2 mb-2">' + langPhrase.subtitle + "</div>");
                } else if (e.clone.className.indexOf("-header") > 0) {
                    $(e.item).replaceWith('<h2 class="js-keditable js-controlable mt-2 mb-2">' + langPhrase.header + "</h2>");
                } else if (e.clone.className.indexOf("-text") > 0) {
                    $(e.item).replaceWith('<div class="js-keditable js-controlable mt-2 mb-2">' + langPhrase.loremIpsum + "</div>");
                } else if (e.clone.className.indexOf("-list") > 0) {
                    $(e.item).replaceWith('<ul class="koCheckList js-keditable js-controlable mt-4 mb-4"><li>' + langPhrase.item + " 1</li><li>" + langPhrase.item + " 2</li><li>" + langPhrase.item + " 3</li></ul>");
                } else if (e.clone.className.indexOf("-image") > 0) {
                    $(e.item).replaceWith('<div class="js-img-holder js-controlable"><div class="kimgRatio mt-2 mb-2"><img class="img-fluid" src="' + FilexLocation + 'editor_images/img.svg"></div></div>');
                } else if (e.clone.className.indexOf("-video") > 0) {
                    $(e.item).replaceWith(
                        '<div class="js-video-holder js-controlable"><div class="kvideo-centered"><iframe src="' +
                            langPhrase.youtubeWelcomeVideo +
                            '" allowfullscreen="allowfullscreen" width="560" height="315" frameborder="0"></iframe></div></div>'
                    );
                } else if (e.clone.className.indexOf("-separator") > 0) {
                    $(e.item).replaceWith('<div class="js-controlable mt-2 mb-2"><div class="koSeparator koSeparatorBlock koSeparatorLeft" data-bg="--color1" style="background: var(--color1);height:10px; width: 150px;"></div></div>');
                } else if (e.clone.className.indexOf("-buttons") > 0) {
                    $(e.item).replaceWith(
                        '<div class="koButtons d-flex js-controlable mt-3 mb-2"><div class="js-draggable"><a href="javascript:void(null)" class="btn btn-color1">' +
                            langPhrase.buttonPrimary +
                            '</a><a href="javascript:void(null)" class="btn btn-color2">' +
                            langPhrase.learnMore +
                            "</a></div></div>"
                    );
                    kediting_buttonsSortable();
                }
                kediting_sortableControllers();
            }
        },
    });
}
function kediting_columnsSortable() {
    var e = $('#keditingBlock [class^="col"]');
    if (e.length == 0) {
        var e = $("#keditingBlock > div");
    }
    for (var a = 0; a < e.length; a++) {
        colContainer = $(e[a]).find(".col-container");
        if (colContainer.length > 0) {
            kediting_colSortable(colContainer[0]);
        } else {
            kediting_colSortable(e[a]);
        }
    }
}
function kediting_controllerClone(e, a, t) {
    var i = $(e).closest(".js-controlable");
    if (typeof a !== "undefined" && a == ".btn") {
        if (typeof t === "undefined") {
            var n = $(i).find(".btn:last"),
                l = '<a href="#" class="btn btn-secondary">' + langPhrase.button + "</a>";
            if (n.length > 0) n.after(l);
            else $(i).append(l);
        } else {
            $(i).find(".btn:last").remove();
        }
    } else if (typeof a !== "undefined" && a == ".breadcrumb-item") {
        if (typeof t === "undefined") {
            var n = $(i).find(".breadcrumb-item:last"),
                l = '<li class="breadcrumb-item"><div class="d-inline-block keditable">' + langPhrase.item + "</div></li>";
            if (n.length > 0) n.after(l);
            else $(i).append(l);
        } else {
            $(i).find(".breadcrumb-item:last").remove();
        }
    } else {
        $(i).after($(i).prop("outerHTML"));
    }
    kediting_columnsSortable();
    kediting_buttonsSortable();
}
function kediting_controllerRemove(e) {
    var a = $(e).closest(".js-controlable");
    $(a).remove();
}
var currentElement;
function kediting_controllerConfigSetup(e, a) {
    if (e.hasClass(a + "-0"))
        $(".kediting_" + a)
            .find("small")
            .text("0");
    else if (e.hasClass(a + "-1"))
        $(".kediting_" + a)
            .find("small")
            .text("1");
    else if (e.hasClass(a + "-2"))
        $(".kediting_" + a)
            .find("small")
            .text("2");
    else if (e.hasClass(a + "-3"))
        $(".kediting_" + a)
            .find("small")
            .text("3");
    else if (e.hasClass(a + "-4"))
        $(".kediting_" + a)
            .find("small")
            .text("4");
    else if (e.hasClass(a + "-5"))
        $(".kediting_" + a)
            .find("small")
            .text("5");
    else
        $(".kediting_" + a)
            .find("small")
            .text(" ");
}
function kediting_controllerConfig(e, a) {
    currentElement = $(e).closest(".js-controlable");
    $("#kediting_columnWidth,#kediting_alignHolder,#kediting_columnAlignHolder,#kediting_bgHolder,#kediting_spacingHolder").hide();
    var i = currentElement.attr("class"),
        l = currentElement[0].tagName.toLowerCase();
    if (l.substr(0, 1) == "h") {
        $("#kediting_alignHolder,#kediting_bgHolder,#kediting_spacingHolder").show();
    } else if (i.indexOf("koPreTitle") > -1) {
        $("#kediting_alignHolder,#kediting_bgHolder,#kediting_spacingHolder").show();
    } else if (i.indexOf("koCheckList") > -1 || i.indexOf("js-video-holder") > -1) {
        $("#kediting_bgHolder,#kediting_spacingHolder").show();
    } else if (i.indexOf("js-keditable") > -1) {
        $("#kediting_alignHolder,#kediting_bgHolder,#kediting_spacingHolder").show();
    } else if (i.indexOf("koButtons") > -1) {
        $("#kediting_alignHolder,#kediting_bgHolder,#kediting_spacingHolder").show();
    } else if (i.indexOf("breadcrumb") > -1 && l.substr(0, 2) == "ol") {
        $("#kediting_bgHolder,#kediting_spacingHolder").show();
    } else if (i.indexOf("kimgRatio") > -1 || i.indexOf("js-img-holder") > -1) {
        if (i.indexOf("js-img-holder") > -1) currentElement = currentElement.find(".kimgRatio");
        $("#kediting_bgHolder").show();
    } else if (i.indexOf("col-lg") > -1) {
        $("#kediting_columnWidth,#kediting_columnAlignHolder").show();
        if ($("#kediting_columnWidthSlider_slider .ui-slider-handle").length > 0) $("#kediting_columnWidthSlider_slider").slider("destroy");
        var t = {};
        if (i.indexOf("col-lg-") > -1) {
            if (currentElement.hasClass("col-lg-1")) t = { val: 1, label: "1 of 12" };
            else if (currentElement.hasClass("col-lg-2")) t = { val: 2, label: "2 of 12" };
            else if (currentElement.hasClass("col-lg-3")) t = { val: 3, label: "3 of 12" };
            else if (currentElement.hasClass("col-lg-4")) t = { val: 4, label: "4 of 12" };
            else if (currentElement.hasClass("col-lg-5")) t = { val: 5, label: "5 of 12" };
            else if (currentElement.hasClass("col-lg-6")) t = { val: 6, label: "6 of 12" };
            else if (currentElement.hasClass("col-lg-7")) t = { val: 7, label: "7 of 12" };
            else if (currentElement.hasClass("col-lg-8")) t = { val: 8, label: "8 of 12" };
            else if (currentElement.hasClass("col-lg-9")) t = { val: 9, label: "9 of 12" };
            else if (currentElement.hasClass("col-lg-10")) t = { val: 10, label: "10 of 12" };
            else if (currentElement.hasClass("col-lg-11")) t = { val: 11, label: "11 of 12" };
            else if (currentElement.hasClass("col-lg-12")) t = { val: 12, label: "12 of 12" };
        } else {
            t = { val: 6, label: "auto" };
        }
        $("#kediting_columnWidthSlider").text(t.label);
        // $("#kediting_columnWidthSlider_slider").slider({
        //     min: 1,
        //     max: 12,
        //     value: t.val,
        //     step: 1,
        //     slide: function (e, a) {
        //         if (typeof currentElement != "object") return !1;
        //         $("#kediting_columnWidthSlider").text(a.value + " of 12");
        //         $(currentElement)
        //             .removeClass("col-lg-1 col-lg-2 col-lg-3 col-lg-4 col-lg-5 col-lg-6 col-lg-7 col-lg-8 col-lg-9 col-lg-10 col-lg-11 col-lg-12")
        //             .addClass("col-lg-" + a.value);
        //     },
        // });
    } else {
        if (currentElement.find(".koSeparator")) {
            currentElement = currentElement.find(".koSeparator");
        } else {
            alert("Incorrect element. ");
            console.log(currentElement[0].tagName + "/" + currentElement.attr("class"));
        }
    }
    kediting_controllerConfigSetup(currentElement, "mt");
    kediting_controllerConfigSetup(currentElement, "mb");
    kediting_controllerConfigSetup(currentElement, "mr");
    kediting_controllerConfigSetup(currentElement, "ml");
    kediting_controllerConfigSetup(currentElement, "pt");
    kediting_controllerConfigSetup(currentElement, "pb");
    kediting_controllerConfigSetup(currentElement, "pr");
    kediting_controllerConfigSetup(currentElement, "pl");
    if ($("#kediting_alignHolder").is(":visible")) {
        $("#kediting_alignLeft,#kediting_alignCenter,#kediting_alignRight").prop("checked", !1);
        $("#kediting_alignDefault").hide();
        if (currentElement.hasClass("text-left")) {
            $("#kediting_alignLeft").prop("checked", !0);
            $("#kediting_alignDefault").show();
        } else if (currentElement.hasClass("text-center")) {
            $("#kediting_alignCenter").prop("checked", !0);
            $("#kediting_alignDefault").show();
        } else if (currentElement.hasClass("text-right")) {
            $("#kediting_alignRight").prop("checked", !0);
            $("#kediting_alignDefault").show();
        }
    }
    if ($("#kediting_columnAlignHolder").is(":visible")) {
        $("#kediting_columnAlignDefault").hide();
        $("#kediting_columnAlignTop,#kediting_columnAlignMiddle,#kediting_columnAlignBottom").prop("checked", !1);
        if (currentElement.hasClass("col-items-top")) {
            $("#kediting_columnAlignTop").prop("checked", !0);
            $("#kediting_columnAlignDefault").show();
        } else if (currentElement.hasClass("col-items-middle")) {
            $("#kediting_columnAlignMiddle").prop("checked", !0);
            $("#kediting_columnAlignDefault").show();
        } else if (currentElement.hasClass("col-items-bottom")) {
            $("#kediting_columnAlignBottom").prop("checked", !0);
            $("#kediting_columnAlignDefault").show();
        }
    }
    if ($("#kediting_bgHolder").is(":visible")) {
        var n = currentElement.css("background-color");
        if (n == "rgba(0, 0, 0, 0)" || n == "rgba(0,0,0,0)") n = "";
        if (n != "") {
            $("#kediting_bgPreview").css("background-color", n);
            $("#kediting_bgLabel").text(n);
        } else {
            $("#kediting_bgPreview").css("background-color", "#fff");
            $("#kediting_bgLabel").text(langPhrase.none);
        }
    }
    $("#keditingToolbar").addClass("active");
    $("#keditingToolbarBg").addClass("active");
}
function duplicateCurrentPage(e) {
    var i = $(e).find("input.dd-nodrag"),
        n = i.val(),
        a = i.attr("id"),
        t = 1;
    if (a.indexOf("menuitem_") > -1) a = a.replace("menuitem_", "");
    if (a.indexOf("_") > -1) {
        t = a.split("_");
        t = t[0];
    }
    if ($("#pageToDuplicate_formHolder").length > 0) $("#pageToDuplicate_formHolder").remove();
    $("body").append(
        '<div id="pageToDuplicate_formHolder" style="position:fixed;top:-100000px;left:-100000px;opacity:0;pointer-events:none"><iframe name="pageToDuplicate_frame" id="pageToDuplicate_frame"></iframe><form id="pageToDuplicate_form" name="pageToDuplicate_form" method="post" action="admin/builder/submit?p=add&action=add&m=1&inSidebar=1" target="pageToDuplicate_frame"><input type="hidden" name="site_name" value="' +
            n +
            " (" +
            langPhrase.copy +
            ')"><input type="hidden" name="pageType" value="0"><input type="hidden" name="copyID" value="' +
            a +
            '"><input type="hidden" name="menu" value="menu' +
            t +
            '"><input name="root" type="hidden" id="root" value="0"><input name="tp" type="hidden" id="tp" value=""></form></div>'
    );
    $("#pageToDuplicate_form").submit();
}
function kediting_alignApply(e) {
    currentElement.removeClass("text-left text-center text-right");
    var a = $("input[name=kediting_align]:checked");
    if (e == "default") {
        a.prop("checked", !1);
        $("#kediting_alignSelection .active").removeClass("active");
        $("#kediting_alignDefault").hide();
    } else {
        currentElement.addClass("text-" + a.val());
        $("#kediting_alignDefault").show();
    }
}
function kediting_columnAlignApply(e) {
    currentElement.removeClass("col-items-top col-items-middle col-items-bottom");
    var a = $("input[name=kediting_columnAlign]:checked");
    if (e == "default") {
        a.prop("checked", !1);
        $("#kediting_columnAlignSelection .active").removeClass("active");
        $("#kediting_columnAlignDefault").hide();
    } else {
        currentElement.addClass("col-items-" + a.val());
        $("#kediting_columnAlignDefault").show();
    }
}
function kediting_bgApply() {
    var e = $("#kediting_bgPreview").val();
    if (e.substring(0, 2) == "--") e = "var(" + e + ")";
    if (typeof currentElement == "object") {
        currentElement.css({ "background-color": e });
    }
    if (e == "") e = langPhrase.none;
    $("#kediting_bgLabel").text(e);
}
function kediting_spacingApply(e, a) {
    if (typeof currentElement != "object") return !1;
    var t = $(e).find("small").text();
    if (t == 5) t = " ";
    else if (t == " ") t = 0;
    else t++;
    $(e).find("small").text(t);
    currentElement.removeClass(a + "-0 " + a + "-1 " + a + "-2 " + a + "-3 " + a + "-4 " + a + "-5");
    if (t != " ") currentElement.addClass(a + "-" + t);
}
document.addEventListener(
    "dragover",
    function (e) {
        e.preventDefault();
    },
    !1
);
document.addEventListener("drop", function (e) {
    e.preventDefault();
    e.stopPropagation();
});
function koMenuUploadingDrop_complete(e, a) {
    $("[data-tmp-drop=" + e + "]").attr({ src: a, "data-src": null, "data-tmp-drop": null });
    keditImgDropInProgress = 0;
    k_EditSave("norefresh");
}
$.fn.scrollDivToElement = function (e) {
    if (!this.length) return this;
    return this.each(function () {
        let parentEl = $(this);
        let childEl = parentEl.find(e);
        if (childEl.length > 0) {
            parentEl.scrollTop(parentEl.scrollTop() - parentEl.offset().top + childEl.offset().top - parentEl.outerHeight() / 2 + childEl.outerHeight() / 2);
        }
    });
};
$.extend($.expr[":"], {
    containsi: function (e, a, t, i) {
        return (e.textContent || e.innerText || "").toLowerCase().indexOf((t[3] || "").toLowerCase()) >= 0;
    },
});
var _documentEditor = {},
    insertImageFN = function () {},
    insertImageEl;
function documentEditor_save(e) {
    _documentEditor[e].save().then((savedData) => {
        $("#" + e)
            .closest(".kapp")
            .attr("data-value", window.btoa(encodeURIComponent(JSON.stringify(savedData))));
        unsavedChanges = 0;
        k_EditSave("norefresh");
    });
}
function documentEditor(e) {
    if (typeof EditorJS !== "function") {
        var i = 0;
        [documentEditorJS].forEach(function (e, t, n) {
            i++;
            var l = document.createElement("script");
            l.src = e;
            document.head.appendChild(l);
            if (i === n.length) {
                a();
            }
        });
    } else {
        a();
    }
    var t =
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><rect width="14" height="14" x="5" y="5" stroke="currentColor" stroke-width="2" rx="4"></rect><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.13968 15.32L8.69058 11.5661C9.02934 11.2036 9.48873 11 9.96774 11C10.4467 11 10.9061 11.2036 11.2449 11.5661L15.3871 16M13.5806 14.0664L15.0132 12.533C15.3519 12.1705 15.8113 11.9668 16.2903 11.9668C16.7693 11.9668 17.2287 12.1705 17.5675 12.533L18.841 13.9634"></path><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.7778 9.33331H13.7867"></path></svg>';
    class documentEditorJS_image {
        constructor({ data, api }) {
            this.api = api;
            this.data = { url: data.url || "", caption: data.caption || "", stretched: data.stretched !== undefined ? data.stretched : !1 };
            this.wrapper = document.createElement("div");
            this.wrapper.classList.add("cdx-block");
            this.img = document.createElement("img");
            this.caption = document.createElement("input");
            this.caption.setAttribute("class", "cdx-input mt-2");
            this.caption.setAttribute("placeholder", langPhrase.imgAlt + " (" + langPhrase.optional + ")");
            this.wrapper.appendChild(this.img);
            this.wrapper.appendChild(this.caption);
            this.button = document.createElement("div");
            var n = "Select Image";
            if (typeof langPhrase === "object" && typeof langPhrase.chooseImage !== "undefined") n = langPhrase.chooseImage;
            this.button.innerHTML =
                '<div style="cursor:pointer;" class="border shadow rounded text-center p-3"><small style="opacity:0.5" class="font-style-normal mr-3">' +
                t +
                '</small><span style="line-height:16px;font-size:12px;text-transform:uppercase;letter-spacing:2px;font-weight:bold;;">' +
                n +
                "</span></div>";
            var e = this;
            this.button.addEventListener("click", function () {
                e.select();
            });
            this.settings = this.renderStretchSetting();
        }
        static;
        get toolbox() {
            return { title: "Image", icon: t };
        }
        insertImage(url) {
            if (url) {
                this.img.src = url;
                this.data.url = url;
                this.button.parentNode.replaceChild(this.wrapper, this.button);
            }
        }
        select() {
            var e = this,
                s = this;
            window.insertImageFN = function (e) {
                s.insertImage(e);
            };
            showModalManager("editorjsImage");
        }
        appendCallback() {
            this.select();
        }
        render() {
            if (this.data && this.data.url) {
                this.img.src = this.data.url;
                if (typeof this.data.caption !== "undefined") this.caption.value = this.data.caption;
                return this.wrapper;
            } else {
                return this.button;
            }
        }
        save() {
            return Object.assign(this.data, { url: this.data.url, caption: this.caption.value });
        }
        renderSettings() {
            return this.settings;
        }
        renderStretchSetting() {
            var e = this,
                i = document.createElement("div"),
                a = document.createElement("div"),
                l =
                    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrows-fullscreen" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707zm0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707zm-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707z"/></svg>',
                o = "Full Width",
                r = function () {
                    e.data.stretched = !e.data.stretched;
                    e.api.blocks.stretchBlock(e.api.blocks.getCurrentBlockIndex(), e.data.stretched);
                };
            i.classList.add("cdx-settings-1-1");
            a.classList.add(e.api.styles.settingsButton);
            a.classList.toggle(e.api.styles.settingsButtonActive, e.data.stretched);
            a.innerHTML = l;
            i.appendChild(a);
            a.addEventListener("click", function () {
                r();
                a.classList.toggle(e.api.styles.settingsButtonActive);
            });
            Promise.resolve().then(() => {
                e.api.blocks.stretchBlock(e.api.blocks.getCurrentBlockIndex(), e.data.stretched);
            });
            e.api.tooltip.onHover(a, o, { placement: "top" });
            return i;
        }
    }
    class documentEditorJS_video {
        constructor({ data, api }) {
            this.api = api;
            this.data = { url: data.url || "", caption: data.caption || "", stretched: data.stretched !== undefined ? data.stretched : !1 };
            this.wrapper = document.createElement("div");
            this.wrapper.classList.add("cdx-block");
            this.img = document.createElement("iframe");
            this.img.setAttribute("class", "embed-tool__content");
            this.img.setAttribute("style", "width:100%;");
            this.img.setAttribute("allowfullscreen", !0);
            this.img.setAttribute("frameborder", 0);
            this.img.setAttribute("height", 320);
            this.caption = document.createElement("input");
            this.caption.setAttribute("class", "cdx-input mt-2");
            this.caption.setAttribute("placeholder", langPhrase.description + " (" + langPhrase.optional + ")");
            this.wrapper.appendChild(this.img);
            this.wrapper.appendChild(this.caption);
            this.button = document.createElement("div");
            var c = "Choose a YouTube Video";
            this.button.innerHTML =
                '<div style="cursor:pointer;" class="border shadow rounded text-center p-3"><span style="line-height:16px;font-size:12px;text-transform:uppercase;letter-spacing:2px;font-weight:bold;;">' + c + "</span></div>";
            var e = this;
            this.button.addEventListener("click", function () {
                e.select();
            });
            this.settings = this.renderStretchSetting();
        }
        static;
        get toolbox() {
            return {
                title: "YouTube Video",
                icon:
                    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z"/></svg>',
            };
        }
        insertImage(a) {
            if (a) {
                var s = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/,
                    n = a.match(s);
                if (n && n[2].length == 11) {
                    a = "https://www.youtube-nocookie.com/embed/" + n[2] + "?iv_load_policy=3&enablejsapi=1&disablekb=1&showinfo=0&rel=0&widgetid=1&autohide=1&modestbranding=1";
                    this.img.src = a;
                    this.data.url = a;
                    this.button.parentNode.replaceChild(this.wrapper, this.button);
                }
            }
        }
        select() {
            var a = prompt("The URL?");
            if (a != null) {
                this.insertImage(a);
            }
        }
        appendCallback() {
            this.select();
        }
        render() {
            if (this.data && this.data.url) {
                this.img.src = this.data.url;
                if (typeof this.data.caption !== "undefined") this.caption.value = this.data.caption;
                return this.wrapper;
            } else {
                return this.button;
            }
        }
        save() {
            return Object.assign(this.data, { url: this.data.url, caption: this.caption.value });
        }
        renderSettings() {
            return this.settings;
        }
        renderStretchSetting() {
            var e = this,
                i = document.createElement("div"),
                t = document.createElement("div"),
                l =
                    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrows-fullscreen" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707zm0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707zm-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707z"/></svg>',
                o = "Full Width",
                r = function () {
                    e.data.stretched = !e.data.stretched;
                    e.api.blocks.stretchBlock(e.api.blocks.getCurrentBlockIndex(), e.data.stretched);
                };
            i.classList.add("cdx-settings-1-1");
            t.classList.add(e.api.styles.settingsButton);
            t.classList.toggle(e.api.styles.settingsButtonActive, e.data.stretched);
            t.innerHTML = l;
            i.appendChild(t);
            t.addEventListener("click", function () {
                r();
                t.classList.toggle(e.api.styles.settingsButtonActive);
            });
            Promise.resolve().then(() => {
                e.api.blocks.stretchBlock(e.api.blocks.getCurrentBlockIndex(), e.data.stretched);
            });
            e.api.tooltip.onHover(t, o, { placement: "top" });
            return i;
        }
    }
    function n() {
        var a = "editor" + guidGenerator();
        $("#website").append();
        e.html(
            '<div style="z-index:1000;top:90px;left:auto;right:20px;bottom:auto;" class="kelement d-flex keditPointerEvents_off justify-content-center breadcrumb-admin-action" id="BlogArea_bottomMenu"><div style="display:flex;border-radius:4px;background:var(--ui-color-accent);background:#fff;" class="shadow-lg p-2"><button type="button" class="my-0 btn btn-ui-primary btn-success keditPointerEvents_on" onclick="documentEditor_save(\'' +
                a +
                '\')"><i class="fas fa-globe fa-fw mr-2"></i>Save</button></div></div><div class="kelement koparsed" rel="documentEditor" id="' +
                a +
                '"></div><div class="kelement" style="display:none;visibility:hidden;opacity:0"><input type="text" autocomplete="off" id="editorjsImage"><button type="button" id="trigger_editorjsImage" onclick="insertImageFN($(\'#editorjsImage\').val())">image</button></div>'
        );
        var t = "{}";
        if (typeof e.attr("data-value") !== "undefined" && e.attr("data-value") != "") {
            t = decodeURIComponent(atob(e.attr("data-value")));
            t = JSON.parse(t);
        }
        _documentEditor[a] = new EditorJS({
            holder: a,
            data: t,
            tools: {
                header: { class: Header, inlineToolbar: !0, tunes: ["anyTuneName"], config: { placeholder: langPhrase.header } },
                underline: Underline,
                linkTool: LinkTool,
                list: { class: List, inlineToolbar: !0 },
                checklist: Checklist,
                video: { class: documentEditorJS_video },
                image: { class: documentEditorJS_image },
                table: { class: Table, inlineToolbar: !0, tunes: ["anyTuneName"], config: { rows: 2, cols: 3 } },
                inlineCode: { class: InlineCode, shortcut: "CMD+E" },
                alert: { class: Alert, inlineToolbar: !0, tunes: ["anyTuneName"], config: { defaultType: "secondary", messagePlaceholder: langPhrase.welcomeButton } },
                delimiter: Delimiter,
                code: CodeTool,
                paragraph: { inlineToolbar: !0, tunes: ["anyTuneName"], config: { placeholder: langPhrase.pressTab } },
                anyTuneName: { class: AlignmentBlockTune },
                marker: { class: Marker, shortcut: "CMD+SHIFT+M" },
                embed: { class: Embed, inlineToolbar: !0 },
                raw: RawTool,
                toggle: { class: Toggle, inlineToolbar: !0 },
                collapse: Collapse,
            },
            minHeight: 100,
            logLevel: "ERROR",
            onChange: (api, event) => {
                unsavedChanges++;
            },
            onReady: () => {
                new DragDrop(_documentEditor[a]);
                _documentEditor[a].caret.setToFirstBlock("start", 0);
                _documentEditor[a].caret.setToNextBlock("start", 0);
                unsavedChanges = -1;
            },
        });
    }
    function a() {
        if (typeof EditorJS !== "function") {
            setTimeout(a, 100);
            return;
        }
        n();
    }
}
var unsavedChanges = 0;
window.onload = function () {
    window.addEventListener("beforeunload", function (e) {
        if (unsavedChanges < 1) {
            koShowLoading("unload");
            return undefined;
        }
        (e || window.event).returnValue = langPhrase.jsSure;
        return langPhrase.jsSure;
    });
};


jQuery(document).on('click', '.lib-img', function(){
    console.log(this)
    insertImgPath(jQuery(this).attr('src'))

})

function insertImgPath(src)
{
    console.log(src)
    jQuery('#k_imagePath').val(src)
    koMenuClose()
    jQuery('#bgPreview_k_imagePath').css('background-image', 'url(' + src + ')');

}