// ==UserScript==
// @name         Get Data from Steam / SteamDB
// @namespace    sak32009-gaxvyvrguokgtog
// @version      5.5.1
// @author       Sak32009
// @description  Get Data from Steam / SteamDB (ex Get DLC Info from SteamDB)
// @license      MIT
// @copyright    Sak32009
// @icon         https://steamdb.info/static/logos/192px.png
// @homepage     https://github.com/Sak32009/GetDataFromSteam-SteamDB
// @homepageURL  https://github.com/Sak32009/GetDataFromSteam-SteamDB
// @source       github:Sak32009/GetDataFromSteam-SteamDB
// @supportURL   https://github.com/Sak32009/GetDataFromSteam-SteamDB/issues
// @downloadURL  https://raw.githack.com/Sak32009/GetDataFromSteam-SteamDB/main/dist/sak32009-get-data-from-steam-steamdb.user.js
// @updateURL    https://raw.githack.com/Sak32009/GetDataFromSteam-SteamDB/main/dist/sak32009-get-data-from-steam-steamdb.meta.js
// @match        *://steamdb.info/app/*
// @match        *://steamdb.info/depot/*
// @match        *://store.steampowered.com/app/*
// @require      https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js
// @require      https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js
// @require      https://cdn.jsdelivr.net/npm/fflate@0.8.2/umd/index.min.js
// @require      https://cdn.jsdelivr.net/npm/file-saver@2.0.5/dist/FileSaver.min.js
// @require      https://cdn.jsdelivr.net/npm/jimp@0.22.12/browser/lib/jimp.min.js
// @require      https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js
// @require      https://cdn.jsdelivr.net/npm/json5@2.2.3/dist/index.min.js
// @require      https://cdn.jsdelivr.net/npm/protobufjs@7.4.0/dist/light/protobuf.min.js
// @require      https://cdn.jsdelivr.net/npm/bytebuffer@5.0.1/dist/bytebuffer.min.js
// @connect      cdn.cloudflare.steamstatic.com
// @connect      github.com
// @connect      raw.githubusercontent.com
// @grant        GM_addStyle
// @grant        GM_addValueChangeListener
// @grant        GM_getValue
// @grant        GM_openInTab
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// @grant        window.close
// @noframes
// @updatedAt    Sun, 03 Nov 2024 14:27:21 GMT
// ==/UserScript==

(r => {
  if (typeof GM_addStyle == "function") {
    GM_addStyle(r);
    return;
  }
  const t = document.createElement("style");
  t.textContent = r, document.head.append(t);
})(` @charset "UTF-8";.unfsij{all:initial}.unfsij *{all:revert}.unfsij,.unfsij[data-bs-theme=light]{--bs-blue: #0d6efd;--bs-indigo: #6610f2;--bs-purple: #6f42c1;--bs-pink: #d63384;--bs-red: #dc3545;--bs-orange: #fd7e14;--bs-yellow: #ffc107;--bs-green: #198754;--bs-teal: #20c997;--bs-cyan: #0dcaf0;--bs-black: #000;--bs-white: #fff;--bs-gray: #6c757d;--bs-gray-dark: #343a40;--bs-gray-100: #f8f9fa;--bs-gray-200: #e9ecef;--bs-gray-300: #dee2e6;--bs-gray-400: #ced4da;--bs-gray-500: #adb5bd;--bs-gray-600: #6c757d;--bs-gray-700: #495057;--bs-gray-800: #343a40;--bs-gray-900: #212529;--bs-primary: #0d6efd;--bs-secondary: #6c757d;--bs-success: #198754;--bs-info: #0dcaf0;--bs-warning: #ffc107;--bs-danger: #dc3545;--bs-light: #f8f9fa;--bs-dark: #212529;--bs-sk-primary: #432949;--bs-sk-secondary: #613b6a;--bs-primary-rgb: 13, 110, 253;--bs-secondary-rgb: 108, 117, 125;--bs-success-rgb: 25, 135, 84;--bs-info-rgb: 13, 202, 240;--bs-warning-rgb: 255, 193, 7;--bs-danger-rgb: 220, 53, 69;--bs-light-rgb: 248, 249, 250;--bs-dark-rgb: 33, 37, 41;--bs-sk-primary-rgb: 67, 41, 73;--bs-sk-secondary-rgb: 97, 59, 106;--bs-primary-text-emphasis: rgb(5.2, 44, 101.2);--bs-secondary-text-emphasis: rgb(43.2, 46.8, 50);--bs-success-text-emphasis: rgb(10, 54, 33.6);--bs-info-text-emphasis: rgb(5.2, 80.8, 96);--bs-warning-text-emphasis: rgb(102, 77.2, 2.8);--bs-danger-text-emphasis: rgb(88, 21.2, 27.6);--bs-light-text-emphasis: #495057;--bs-dark-text-emphasis: #495057;--bs-primary-bg-subtle: rgb(206.6, 226, 254.6);--bs-secondary-bg-subtle: rgb(225.6, 227.4, 229);--bs-success-bg-subtle: rgb(209, 231, 220.8);--bs-info-bg-subtle: rgb(206.6, 244.4, 252);--bs-warning-bg-subtle: rgb(255, 242.6, 205.4);--bs-danger-bg-subtle: rgb(248, 214.6, 217.8);--bs-light-bg-subtle: rgb(251.5, 252, 252.5);--bs-dark-bg-subtle: #ced4da;--bs-primary-border-subtle: rgb(158.2, 197, 254.2);--bs-secondary-border-subtle: rgb(196.2, 199.8, 203);--bs-success-border-subtle: rgb(163, 207, 186.6);--bs-info-border-subtle: rgb(158.2, 233.8, 249);--bs-warning-border-subtle: rgb(255, 230.2, 155.8);--bs-danger-border-subtle: rgb(241, 174.2, 180.6);--bs-light-border-subtle: #e9ecef;--bs-dark-border-subtle: #adb5bd;--bs-white-rgb: 255, 255, 255;--bs-black-rgb: 0, 0, 0;--bs-font-sans-serif: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";--bs-font-monospace: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;--bs-gradient: linear-gradient(180deg, rgba(255, 255, 255, .15), rgba(255, 255, 255, 0));--bs-body-font-family: var(--bs-font-sans-serif);--bs-body-font-size: 1rem;--bs-body-font-weight: 400;--bs-body-line-height: 1.5;--bs-body-color: #212529;--bs-body-color-rgb: 33, 37, 41;--bs-body-bg: #fff;--bs-body-bg-rgb: 255, 255, 255;--bs-emphasis-color: #000;--bs-emphasis-color-rgb: 0, 0, 0;--bs-secondary-color: rgba(33, 37, 41, .75);--bs-secondary-color-rgb: 33, 37, 41;--bs-secondary-bg: #e9ecef;--bs-secondary-bg-rgb: 233, 236, 239;--bs-tertiary-color: rgba(33, 37, 41, .5);--bs-tertiary-color-rgb: 33, 37, 41;--bs-tertiary-bg: #f8f9fa;--bs-tertiary-bg-rgb: 248, 249, 250;--bs-heading-color: inherit;--bs-link-color: #0d6efd;--bs-link-color-rgb: 13, 110, 253;--bs-link-decoration: underline;--bs-link-hover-color: rgb(10.4, 88, 202.4);--bs-link-hover-color-rgb: 10, 88, 202;--bs-code-color: #d63384;--bs-highlight-color: #212529;--bs-highlight-bg: rgb(255, 242.6, 205.4);--bs-border-width: 1px;--bs-border-style: solid;--bs-border-color: #dee2e6;--bs-border-color-translucent: rgba(0, 0, 0, .175);--bs-border-radius: .375rem;--bs-border-radius-sm: .25rem;--bs-border-radius-lg: .5rem;--bs-border-radius-xl: 1rem;--bs-border-radius-xxl: 2rem;--bs-border-radius-2xl: var(--bs-border-radius-xxl);--bs-border-radius-pill: 50rem;--bs-box-shadow: 0 .5rem 1rem rgba(0, 0, 0, .15);--bs-box-shadow-sm: 0 .125rem .25rem rgba(0, 0, 0, .075);--bs-box-shadow-lg: 0 1rem 3rem rgba(0, 0, 0, .175);--bs-box-shadow-inset: inset 0 1px 2px rgba(0, 0, 0, .075);--bs-focus-ring-width: .25rem;--bs-focus-ring-opacity: .25;--bs-focus-ring-color: rgba(13, 110, 253, .25);--bs-form-valid-color: #198754;--bs-form-valid-border-color: #198754;--bs-form-invalid-color: #dc3545;--bs-form-invalid-border-color: #dc3545}.unfsij[data-bs-theme=dark]{color-scheme:dark;--bs-body-color: #dee2e6;--bs-body-color-rgb: 222, 226, 230;--bs-body-bg: #212529;--bs-body-bg-rgb: 33, 37, 41;--bs-emphasis-color: #fff;--bs-emphasis-color-rgb: 255, 255, 255;--bs-secondary-color: rgba(222, 226, 230, .75);--bs-secondary-color-rgb: 222, 226, 230;--bs-secondary-bg: #343a40;--bs-secondary-bg-rgb: 52, 58, 64;--bs-tertiary-color: rgba(222, 226, 230, .5);--bs-tertiary-color-rgb: 222, 226, 230;--bs-tertiary-bg: rgb(42.5, 47.5, 52.5);--bs-tertiary-bg-rgb: 43, 48, 53;--bs-primary-text-emphasis: rgb(109.8, 168, 253.8);--bs-secondary-text-emphasis: rgb(166.8, 172.2, 177);--bs-success-text-emphasis: rgb(117, 183, 152.4);--bs-info-text-emphasis: rgb(109.8, 223.2, 246);--bs-warning-text-emphasis: rgb(255, 217.8, 106.2);--bs-danger-text-emphasis: rgb(234, 133.8, 143.4);--bs-light-text-emphasis: #f8f9fa;--bs-dark-text-emphasis: #dee2e6;--bs-primary-bg-subtle: rgb(2.6, 22, 50.6);--bs-secondary-bg-subtle: rgb(21.6, 23.4, 25);--bs-success-bg-subtle: rgb(5, 27, 16.8);--bs-info-bg-subtle: rgb(2.6, 40.4, 48);--bs-warning-bg-subtle: rgb(51, 38.6, 1.4);--bs-danger-bg-subtle: rgb(44, 10.6, 13.8);--bs-light-bg-subtle: #343a40;--bs-dark-bg-subtle: #1a1d20;--bs-primary-border-subtle: rgb(7.8, 66, 151.8);--bs-secondary-border-subtle: rgb(64.8, 70.2, 75);--bs-success-border-subtle: rgb(15, 81, 50.4);--bs-info-border-subtle: rgb(7.8, 121.2, 144);--bs-warning-border-subtle: rgb(153, 115.8, 4.2);--bs-danger-border-subtle: rgb(132, 31.8, 41.4);--bs-light-border-subtle: #495057;--bs-dark-border-subtle: #343a40;--bs-heading-color: inherit;--bs-link-color: rgb(109.8, 168, 253.8);--bs-link-hover-color: rgb(138.84, 185.4, 254.04);--bs-link-color-rgb: 110, 168, 254;--bs-link-hover-color-rgb: 139, 185, 254;--bs-code-color: rgb(230.4, 132.6, 181.2);--bs-highlight-color: #dee2e6;--bs-highlight-bg: rgb(102, 77.2, 2.8);--bs-border-color: #495057;--bs-border-color-translucent: rgba(255, 255, 255, .15);--bs-form-valid-color: rgb(117, 183, 152.4);--bs-form-valid-border-color: rgb(117, 183, 152.4);--bs-form-invalid-color: rgb(234, 133.8, 143.4);--bs-form-invalid-border-color: rgb(234, 133.8, 143.4)}.unfsij *,.unfsij *:before,.unfsij *:after{box-sizing:border-box}@media (prefers-reduced-motion: no-preference){.unfsij{scroll-behavior:smooth}}.unfsij{margin:0;font-family:var(--bs-body-font-family);font-size:var(--bs-body-font-size);font-weight:var(--bs-body-font-weight);line-height:var(--bs-body-line-height);color:var(--bs-body-color);text-align:var(--bs-body-text-align);background-color:var(--bs-body-bg);-webkit-text-size-adjust:100%;-webkit-tap-highlight-color:rgba(0,0,0,0)}.unfsij hr{margin:1rem 0;color:inherit;border:0;border-top:var(--bs-border-width) solid;opacity:.25}.unfsij h6,.unfsij .h6,.unfsij h5,.unfsij .h5,.unfsij h4,.unfsij .h4,.unfsij h3,.unfsij .h3,.unfsij h2,.unfsij .h2,.unfsij h1,.unfsij .h1{margin-top:0;margin-bottom:.5rem;font-weight:500;line-height:1.2;color:var(--bs-heading-color)}.unfsij h1,.unfsij .h1{font-size:calc(1.375rem + 1.5vw)}@media (min-width: 1200px){.unfsij h1,.unfsij .h1{font-size:2.5rem}}.unfsij h2,.unfsij .h2{font-size:calc(1.325rem + .9vw)}@media (min-width: 1200px){.unfsij h2,.unfsij .h2{font-size:2rem}}.unfsij h3,.unfsij .h3{font-size:calc(1.3rem + .6vw)}@media (min-width: 1200px){.unfsij h3,.unfsij .h3{font-size:1.75rem}}.unfsij h4,.unfsij .h4{font-size:calc(1.275rem + .3vw)}@media (min-width: 1200px){.unfsij h4,.unfsij .h4{font-size:1.5rem}}.unfsij h5,.unfsij .h5{font-size:1.25rem}.unfsij h6,.unfsij .h6{font-size:1rem}.unfsij p{margin-top:0;margin-bottom:1rem}.unfsij abbr[title]{-webkit-text-decoration:underline dotted;text-decoration:underline dotted;cursor:help;-webkit-text-decoration-skip-ink:none;text-decoration-skip-ink:none}.unfsij address{margin-bottom:1rem;font-style:normal;line-height:inherit}.unfsij ol,.unfsij ul{padding-left:2rem}.unfsij ol,.unfsij ul,.unfsij dl{margin-top:0;margin-bottom:1rem}.unfsij ol ol,.unfsij ul ul,.unfsij ol ul,.unfsij ul ol{margin-bottom:0}.unfsij dt{font-weight:700}.unfsij dd{margin-bottom:.5rem;margin-left:0}.unfsij blockquote{margin:0 0 1rem}.unfsij b,.unfsij strong{font-weight:bolder}.unfsij small,.unfsij .small{font-size:.875em}.unfsij mark,.unfsij .mark{padding:.1875em;color:var(--bs-highlight-color);background-color:var(--bs-highlight-bg)}.unfsij sub,.unfsij sup{position:relative;font-size:.75em;line-height:0;vertical-align:baseline}.unfsij sub{bottom:-.25em}.unfsij sup{top:-.5em}.unfsij a{color:rgba(var(--bs-link-color-rgb),var(--bs-link-opacity, 1));text-decoration:underline}.unfsij a:hover{--bs-link-color-rgb: var(--bs-link-hover-color-rgb)}.unfsij a:not([href]):not([class]),.unfsij a:not([href]):not([class]):hover{color:inherit;text-decoration:none}.unfsij pre,.unfsij code,.unfsij kbd,.unfsij samp{font-family:var(--bs-font-monospace);font-size:1em}.unfsij pre{display:block;margin-top:0;margin-bottom:1rem;overflow:auto;font-size:.875em}.unfsij pre code{font-size:inherit;color:inherit;word-break:normal}.unfsij code{font-size:.875em;color:var(--bs-code-color);word-wrap:break-word}.unfsij a>code{color:inherit}.unfsij kbd{padding:.1875rem .375rem;font-size:.875em;color:var(--bs-body-bg);background-color:var(--bs-body-color);border-radius:.25rem}.unfsij kbd kbd{padding:0;font-size:1em}.unfsij figure{margin:0 0 1rem}.unfsij img,.unfsij svg{vertical-align:middle}.unfsij table{caption-side:bottom;border-collapse:collapse}.unfsij caption{padding-top:.5rem;padding-bottom:.5rem;color:var(--bs-secondary-color);text-align:left}.unfsij th{text-align:inherit;text-align:-webkit-match-parent}.unfsij thead,.unfsij tbody,.unfsij tfoot,.unfsij tr,.unfsij td,.unfsij th{border-color:inherit;border-style:solid;border-width:0}.unfsij label{display:inline-block}.unfsij button{border-radius:0}.unfsij button:focus:not(:focus-visible){outline:0}.unfsij input,.unfsij button,.unfsij select,.unfsij optgroup,.unfsij textarea{margin:0;font-family:inherit;font-size:inherit;line-height:inherit}.unfsij button,.unfsij select{text-transform:none}.unfsij[role=button]{cursor:pointer}.unfsij select{word-wrap:normal}.unfsij select:disabled{opacity:1}.unfsij[list]:not([type=date]):not([type=datetime-local]):not([type=month]):not([type=week]):not([type=time])::-webkit-calendar-picker-indicator{display:none!important}.unfsij button,.unfsij[type=button],.unfsij[type=reset],.unfsij[type=submit]{-webkit-appearance:button}.unfsij button:not(:disabled),.unfsij[type=button]:not(:disabled),.unfsij[type=reset]:not(:disabled),.unfsij[type=submit]:not(:disabled){cursor:pointer}.unfsij ::-moz-focus-inner{padding:0;border-style:none}.unfsij textarea{resize:vertical}.unfsij fieldset{min-width:0;padding:0;margin:0;border:0}.unfsij legend{float:left;width:100%;padding:0;margin-bottom:.5rem;font-size:calc(1.275rem + .3vw);line-height:inherit}@media (min-width: 1200px){.unfsij legend{font-size:1.5rem}}.unfsij legend+*{clear:left}.unfsij ::-webkit-datetime-edit-fields-wrapper,.unfsij ::-webkit-datetime-edit-text,.unfsij ::-webkit-datetime-edit-minute,.unfsij ::-webkit-datetime-edit-hour-field,.unfsij ::-webkit-datetime-edit-day-field,.unfsij ::-webkit-datetime-edit-month-field,.unfsij ::-webkit-datetime-edit-year-field{padding:0}.unfsij ::-webkit-inner-spin-button{height:auto}.unfsij[type=search]{-webkit-appearance:textfield;outline-offset:-2px}.unfsij ::-webkit-search-decoration{-webkit-appearance:none}.unfsij ::-webkit-color-swatch-wrapper{padding:0}.unfsij ::file-selector-button{font:inherit;-webkit-appearance:button}.unfsij output{display:inline-block}.unfsij iframe{border:0}.unfsij summary{display:list-item;cursor:pointer}.unfsij progress{vertical-align:baseline}.unfsij[hidden]{display:none!important}.unfsij .lead{font-size:1.25rem;font-weight:300}.unfsij .display-1{font-size:calc(1.625rem + 4.5vw);font-weight:300;line-height:1.2}@media (min-width: 1200px){.unfsij .display-1{font-size:5rem}}.unfsij .display-2{font-size:calc(1.575rem + 3.9vw);font-weight:300;line-height:1.2}@media (min-width: 1200px){.unfsij .display-2{font-size:4.5rem}}.unfsij .display-3{font-size:calc(1.525rem + 3.3vw);font-weight:300;line-height:1.2}@media (min-width: 1200px){.unfsij .display-3{font-size:4rem}}.unfsij .display-4{font-size:calc(1.475rem + 2.7vw);font-weight:300;line-height:1.2}@media (min-width: 1200px){.unfsij .display-4{font-size:3.5rem}}.unfsij .display-5{font-size:calc(1.425rem + 2.1vw);font-weight:300;line-height:1.2}@media (min-width: 1200px){.unfsij .display-5{font-size:3rem}}.unfsij .display-6{font-size:calc(1.375rem + 1.5vw);font-weight:300;line-height:1.2}@media (min-width: 1200px){.unfsij .display-6{font-size:2.5rem}}.unfsij .list-unstyled,.unfsij .list-inline{padding-left:0;list-style:none}.unfsij .list-inline-item{display:inline-block}.unfsij .list-inline-item:not(:last-child){margin-right:.5rem}.unfsij .initialism{font-size:.875em;text-transform:uppercase}.unfsij .blockquote{margin-bottom:1rem;font-size:1.25rem}.unfsij .blockquote>:last-child{margin-bottom:0}.unfsij .blockquote-footer{margin-top:-1rem;margin-bottom:1rem;font-size:.875em;color:#6c757d}.unfsij .blockquote-footer:before{content:"\u2014\xA0"}.unfsij .form-label{margin-bottom:.5rem}.unfsij .col-form-label{padding-top:calc(.375rem + var(--bs-border-width));padding-bottom:calc(.375rem + var(--bs-border-width));margin-bottom:0;font-size:inherit;line-height:1.5}.unfsij .col-form-label-lg{padding-top:calc(.5rem + var(--bs-border-width));padding-bottom:calc(.5rem + var(--bs-border-width));font-size:1.25rem}.unfsij .col-form-label-sm{padding-top:calc(.25rem + var(--bs-border-width));padding-bottom:calc(.25rem + var(--bs-border-width));font-size:.875rem}.unfsij .form-text{margin-top:.25rem;font-size:.875em;color:var(--bs-secondary-color)}.unfsij .form-control{display:block;width:100%;padding:.375rem .75rem;font-size:1rem;font-weight:400;line-height:1.5;color:var(--bs-body-color);-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:var(--bs-body-bg);background-clip:padding-box;border:var(--bs-border-width) solid var(--bs-border-color);border-radius:var(--bs-border-radius);transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out}@media (prefers-reduced-motion: reduce){.unfsij .form-control{transition:none}}.unfsij .form-control[type=file]{overflow:hidden}.unfsij .form-control[type=file]:not(:disabled):not([readonly]){cursor:pointer}.unfsij .form-control:focus{color:var(--bs-body-color);background-color:var(--bs-body-bg);border-color:#86b7fe;outline:0;box-shadow:0 0 0 .25rem #0d6efd40}.unfsij .form-control::-webkit-date-and-time-value{min-width:85px;height:1.5em;margin:0}.unfsij .form-control::-webkit-datetime-edit{display:block;padding:0}.unfsij .form-control::-moz-placeholder{color:var(--bs-secondary-color);opacity:1}.unfsij .form-control::placeholder{color:var(--bs-secondary-color);opacity:1}.unfsij .form-control:disabled{background-color:var(--bs-secondary-bg);opacity:1}.unfsij .form-control::file-selector-button{padding:.375rem .75rem;margin:-.375rem -.75rem;margin-inline-end:.75rem;color:var(--bs-body-color);background-color:var(--bs-tertiary-bg);pointer-events:none;border-color:inherit;border-style:solid;border-width:0;border-inline-end-width:var(--bs-border-width);border-radius:0;transition:color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out}@media (prefers-reduced-motion: reduce){.unfsij .form-control::file-selector-button{transition:none}}.unfsij .form-control:hover:not(:disabled):not([readonly])::file-selector-button{background-color:var(--bs-secondary-bg)}.unfsij .form-control-plaintext{display:block;width:100%;padding:.375rem 0;margin-bottom:0;line-height:1.5;color:var(--bs-body-color);background-color:transparent;border:solid transparent;border-width:var(--bs-border-width) 0}.unfsij .form-control-plaintext:focus{outline:0}.unfsij .form-control-plaintext.form-control-sm,.unfsij .form-control-plaintext.form-control-lg{padding-right:0;padding-left:0}.unfsij .form-control-sm{min-height:calc(1.5em + .5rem + calc(var(--bs-border-width) * 2));padding:.25rem .5rem;font-size:.875rem;border-radius:var(--bs-border-radius-sm)}.unfsij .form-control-sm::file-selector-button{padding:.25rem .5rem;margin:-.25rem -.5rem;margin-inline-end:.5rem}.unfsij .form-control-lg{min-height:calc(1.5em + 1rem + calc(var(--bs-border-width) * 2));padding:.5rem 1rem;font-size:1.25rem;border-radius:var(--bs-border-radius-lg)}.unfsij .form-control-lg::file-selector-button{padding:.5rem 1rem;margin:-.5rem -1rem;margin-inline-end:1rem}.unfsij textarea.form-control{min-height:calc(1.5em + .75rem + calc(var(--bs-border-width) * 2))}.unfsij textarea.form-control-sm{min-height:calc(1.5em + .5rem + calc(var(--bs-border-width) * 2))}.unfsij textarea.form-control-lg{min-height:calc(1.5em + 1rem + calc(var(--bs-border-width) * 2))}.unfsij .form-control-color{width:3rem;height:calc(1.5em + .75rem + calc(var(--bs-border-width) * 2));padding:.375rem}.unfsij .form-control-color:not(:disabled):not([readonly]){cursor:pointer}.unfsij .form-control-color::-moz-color-swatch{border:0!important;border-radius:var(--bs-border-radius)}.unfsij .form-control-color::-webkit-color-swatch{border:0!important;border-radius:var(--bs-border-radius)}.unfsij .form-control-color.form-control-sm{height:calc(1.5em + .5rem + calc(var(--bs-border-width) * 2))}.unfsij .form-control-color.form-control-lg{height:calc(1.5em + 1rem + calc(var(--bs-border-width) * 2))}.unfsij .form-select{--bs-form-select-bg-img: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e");display:block;width:100%;padding:.375rem 2.25rem .375rem .75rem;font-size:1rem;font-weight:400;line-height:1.5;color:var(--bs-body-color);-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:var(--bs-body-bg);background-image:var(--bs-form-select-bg-img),var(--bs-form-select-bg-icon, none);background-repeat:no-repeat;background-position:right .75rem center;background-size:16px 12px;border:var(--bs-border-width) solid var(--bs-border-color);border-radius:var(--bs-border-radius);transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out}@media (prefers-reduced-motion: reduce){.unfsij .form-select{transition:none}}.unfsij .form-select:focus{border-color:#86b7fe;outline:0;box-shadow:0 0 0 .25rem #0d6efd40}.unfsij .form-select[multiple],.unfsij .form-select[size]:not([size="1"]){padding-right:.75rem;background-image:none}.unfsij .form-select:disabled{background-color:var(--bs-secondary-bg)}.unfsij .form-select:-moz-focusring{color:transparent;text-shadow:0 0 0 var(--bs-body-color)}.unfsij .form-select-sm{padding-top:.25rem;padding-bottom:.25rem;padding-left:.5rem;font-size:.875rem;border-radius:var(--bs-border-radius-sm)}.unfsij .form-select-lg{padding-top:.5rem;padding-bottom:.5rem;padding-left:1rem;font-size:1.25rem;border-radius:var(--bs-border-radius-lg)}.unfsij[data-bs-theme=dark] .form-select{--bs-form-select-bg-img: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23dee2e6' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e")}.unfsij .form-check{display:block;min-height:1.5rem;padding-left:1.5em;margin-bottom:.125rem}.unfsij .form-check .form-check-input{float:left;margin-left:-1.5em}.unfsij .form-check-reverse{padding-right:1.5em;padding-left:0;text-align:right}.unfsij .form-check-reverse .form-check-input{float:right;margin-right:-1.5em;margin-left:0}.unfsij .form-check-input{--bs-form-check-bg: var(--bs-body-bg);flex-shrink:0;width:1em;height:1em;margin-top:.25em;vertical-align:top;-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:var(--bs-form-check-bg);background-image:var(--bs-form-check-bg-image);background-repeat:no-repeat;background-position:center;background-size:contain;border:var(--bs-border-width) solid var(--bs-border-color);-webkit-print-color-adjust:exact;print-color-adjust:exact}.unfsij .form-check-input[type=checkbox]{border-radius:.25em}.unfsij .form-check-input[type=radio]{border-radius:50%}.unfsij .form-check-input:active{filter:brightness(90%)}.unfsij .form-check-input:focus{border-color:#86b7fe;outline:0;box-shadow:0 0 0 .25rem #0d6efd40}.unfsij .form-check-input:checked{background-color:#0d6efd;border-color:#0d6efd}.unfsij .form-check-input:checked[type=checkbox]{--bs-form-check-bg-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='m6 10 3 3 6-6'/%3e%3c/svg%3e")}.unfsij .form-check-input:checked[type=radio]{--bs-form-check-bg-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='2' fill='%23fff'/%3e%3c/svg%3e")}.unfsij .form-check-input[type=checkbox]:indeterminate{background-color:#0d6efd;border-color:#0d6efd;--bs-form-check-bg-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10h8'/%3e%3c/svg%3e")}.unfsij .form-check-input:disabled{pointer-events:none;filter:none;opacity:.5}.unfsij .form-check-input[disabled]~.form-check-label,.unfsij .form-check-input:disabled~.form-check-label{cursor:default;opacity:.5}.unfsij .form-switch{padding-left:2.5em}.unfsij .form-switch .form-check-input{--bs-form-switch-bg: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='rgba%280, 0, 0, 0.25%29'/%3e%3c/svg%3e");width:2em;margin-left:-2.5em;background-image:var(--bs-form-switch-bg);background-position:left center;border-radius:2em;transition:background-position .15s ease-in-out}@media (prefers-reduced-motion: reduce){.unfsij .form-switch .form-check-input{transition:none}}.unfsij .form-switch .form-check-input:focus{--bs-form-switch-bg: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='rgb%28134, 182.5, 254%29'/%3e%3c/svg%3e")}.unfsij .form-switch .form-check-input:checked{background-position:right center;--bs-form-switch-bg: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%23fff'/%3e%3c/svg%3e")}.unfsij .form-switch.form-check-reverse{padding-right:2.5em;padding-left:0}.unfsij .form-switch.form-check-reverse .form-check-input{margin-right:-2.5em;margin-left:0}.unfsij .form-check-inline{display:inline-block;margin-right:1rem}.unfsij .btn-check{position:absolute;clip:rect(0,0,0,0);pointer-events:none}.unfsij .btn-check[disabled]+.btn,.unfsij .btn-check:disabled+.btn{pointer-events:none;filter:none;opacity:.65}.unfsij[data-bs-theme=dark] .form-switch .form-check-input:not(:checked):not(:focus){--bs-form-switch-bg: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='rgba%28255, 255, 255, 0.25%29'/%3e%3c/svg%3e")}.unfsij .form-range{width:100%;height:1.5rem;padding:0;-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:transparent}.unfsij .form-range:focus{outline:0}.unfsij .form-range:focus::-webkit-slider-thumb{box-shadow:0 0 0 1px #fff,0 0 0 .25rem #0d6efd40}.unfsij .form-range:focus::-moz-range-thumb{box-shadow:0 0 0 1px #fff,0 0 0 .25rem #0d6efd40}.unfsij .form-range::-moz-focus-outer{border:0}.unfsij .form-range::-webkit-slider-thumb{width:1rem;height:1rem;margin-top:-.25rem;-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:#0d6efd;border:0;border-radius:1rem;-webkit-transition:background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;transition:background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out}@media (prefers-reduced-motion: reduce){.unfsij .form-range::-webkit-slider-thumb{-webkit-transition:none;transition:none}}.unfsij .form-range::-webkit-slider-thumb:active{background-color:#b6d4fe}.unfsij .form-range::-webkit-slider-runnable-track{width:100%;height:.5rem;color:transparent;cursor:pointer;background-color:var(--bs-secondary-bg);border-color:transparent;border-radius:1rem}.unfsij .form-range::-moz-range-thumb{width:1rem;height:1rem;-moz-appearance:none;-webkit-appearance:none;appearance:none;background-color:#0d6efd;border:0;border-radius:1rem;-moz-transition:background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;transition:background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out}@media (prefers-reduced-motion: reduce){.unfsij .form-range::-moz-range-thumb{-moz-transition:none;transition:none}}.unfsij .form-range::-moz-range-thumb:active{background-color:#b6d4fe}.unfsij .form-range::-moz-range-track{width:100%;height:.5rem;color:transparent;cursor:pointer;background-color:var(--bs-secondary-bg);border-color:transparent;border-radius:1rem}.unfsij .form-range:disabled{pointer-events:none}.unfsij .form-range:disabled::-webkit-slider-thumb{background-color:var(--bs-secondary-color)}.unfsij .form-range:disabled::-moz-range-thumb{background-color:var(--bs-secondary-color)}.unfsij .form-floating{position:relative}.unfsij .form-floating>.form-control,.unfsij .form-floating>.form-control-plaintext,.unfsij .form-floating>.form-select{height:calc(3.5rem + calc(var(--bs-border-width) * 2));min-height:calc(3.5rem + calc(var(--bs-border-width) * 2));line-height:1.25}.unfsij .form-floating>label{position:absolute;top:0;left:0;z-index:2;height:100%;padding:1rem .75rem;overflow:hidden;text-align:start;text-overflow:ellipsis;white-space:nowrap;pointer-events:none;border:var(--bs-border-width) solid transparent;transform-origin:0 0;transition:opacity .1s ease-in-out,transform .1s ease-in-out}@media (prefers-reduced-motion: reduce){.unfsij .form-floating>label{transition:none}}.unfsij .form-floating>.form-control,.unfsij .form-floating>.form-control-plaintext{padding:1rem .75rem}.unfsij .form-floating>.form-control::-moz-placeholder,.unfsij .form-floating>.form-control-plaintext::-moz-placeholder{color:transparent}.unfsij .form-floating>.form-control::placeholder,.unfsij .form-floating>.form-control-plaintext::placeholder{color:transparent}.unfsij .form-floating>.form-control:not(:-moz-placeholder-shown),.unfsij .form-floating>.form-control-plaintext:not(:-moz-placeholder-shown){padding-top:1.625rem;padding-bottom:.625rem}.unfsij .form-floating>.form-control:focus,.unfsij .form-floating>.form-control:not(:placeholder-shown),.unfsij .form-floating>.form-control-plaintext:focus,.unfsij .form-floating>.form-control-plaintext:not(:placeholder-shown){padding-top:1.625rem;padding-bottom:.625rem}.unfsij .form-floating>.form-control:-webkit-autofill,.unfsij .form-floating>.form-control-plaintext:-webkit-autofill{padding-top:1.625rem;padding-bottom:.625rem}.unfsij .form-floating>.form-select{padding-top:1.625rem;padding-bottom:.625rem}.unfsij .form-floating>.form-control:not(:-moz-placeholder-shown)~label{color:rgba(var(--bs-body-color-rgb),.65);transform:scale(.85) translateY(-.5rem) translate(.15rem)}.unfsij .form-floating>.form-control:focus~label,.unfsij .form-floating>.form-control:not(:placeholder-shown)~label,.unfsij .form-floating>.form-control-plaintext~label,.unfsij .form-floating>.form-select~label{color:rgba(var(--bs-body-color-rgb),.65);transform:scale(.85) translateY(-.5rem) translate(.15rem)}.unfsij .form-floating>.form-control:not(:-moz-placeholder-shown)~label:after{position:absolute;top:1rem;right:.375rem;bottom:1rem;left:.375rem;z-index:-1;height:1.5em;content:"";background-color:var(--bs-body-bg);border-radius:var(--bs-border-radius)}.unfsij .form-floating>.form-control:focus~label:after,.unfsij .form-floating>.form-control:not(:placeholder-shown)~label:after,.unfsij .form-floating>.form-control-plaintext~label:after,.unfsij .form-floating>.form-select~label:after{position:absolute;top:1rem;right:.375rem;bottom:1rem;left:.375rem;z-index:-1;height:1.5em;content:"";background-color:var(--bs-body-bg);border-radius:var(--bs-border-radius)}.unfsij .form-floating>.form-control:-webkit-autofill~label{color:rgba(var(--bs-body-color-rgb),.65);transform:scale(.85) translateY(-.5rem) translate(.15rem)}.unfsij .form-floating>.form-control-plaintext~label{border-width:var(--bs-border-width) 0}.unfsij .form-floating>:disabled~label,.unfsij .form-floating>.form-control:disabled~label{color:#6c757d}.unfsij .form-floating>:disabled~label:after,.unfsij .form-floating>.form-control:disabled~label:after{background-color:var(--bs-secondary-bg)}.unfsij .input-group{position:relative;display:flex;flex-wrap:wrap;align-items:stretch;width:100%}.unfsij .input-group>.form-control,.unfsij .input-group>.form-select,.unfsij .input-group>.form-floating{position:relative;flex:1 1 auto;width:1%;min-width:0}.unfsij .input-group>.form-control:focus,.unfsij .input-group>.form-select:focus,.unfsij .input-group>.form-floating:focus-within{z-index:5}.unfsij .input-group .btn{position:relative;z-index:2}.unfsij .input-group .btn:focus{z-index:5}.unfsij .input-group-text{display:flex;align-items:center;padding:.375rem .75rem;font-size:1rem;font-weight:400;line-height:1.5;color:var(--bs-body-color);text-align:center;white-space:nowrap;background-color:var(--bs-tertiary-bg);border:var(--bs-border-width) solid var(--bs-border-color);border-radius:var(--bs-border-radius)}.unfsij .input-group-lg>.form-control,.unfsij .input-group-lg>.form-select,.unfsij .input-group-lg>.input-group-text,.unfsij .input-group-lg>.btn{padding:.5rem 1rem;font-size:1.25rem;border-radius:var(--bs-border-radius-lg)}.unfsij .input-group-sm>.form-control,.unfsij .input-group-sm>.form-select,.unfsij .input-group-sm>.input-group-text,.unfsij .input-group-sm>.btn{padding:.25rem .5rem;font-size:.875rem;border-radius:var(--bs-border-radius-sm)}.unfsij .input-group-lg>.form-select,.unfsij .input-group-sm>.form-select{padding-right:3rem}.unfsij .input-group:not(.has-validation)>:not(:last-child):not(.dropdown-toggle):not(.dropdown-menu):not(.form-floating),.unfsij .input-group:not(.has-validation)>.dropdown-toggle:nth-last-child(n+3),.unfsij .input-group:not(.has-validation)>.form-floating:not(:last-child)>.form-control,.unfsij .input-group:not(.has-validation)>.form-floating:not(:last-child)>.form-select{border-top-right-radius:0;border-bottom-right-radius:0}.unfsij .input-group.has-validation>:nth-last-child(n+3):not(.dropdown-toggle):not(.dropdown-menu):not(.form-floating),.unfsij .input-group.has-validation>.dropdown-toggle:nth-last-child(n+4),.unfsij .input-group.has-validation>.form-floating:nth-last-child(n+3)>.form-control,.unfsij .input-group.has-validation>.form-floating:nth-last-child(n+3)>.form-select{border-top-right-radius:0;border-bottom-right-radius:0}.unfsij .input-group>:not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(.valid-feedback):not(.invalid-tooltip):not(.invalid-feedback){margin-left:calc(var(--bs-border-width) * -1);border-top-left-radius:0;border-bottom-left-radius:0}.unfsij .input-group>.form-floating:not(:first-child)>.form-control,.unfsij .input-group>.form-floating:not(:first-child)>.form-select{border-top-left-radius:0;border-bottom-left-radius:0}.unfsij .valid-feedback{display:none;width:100%;margin-top:.25rem;font-size:.875em;color:var(--bs-form-valid-color)}.unfsij .valid-tooltip{position:absolute;top:100%;z-index:5;display:none;max-width:100%;padding:.25rem .5rem;margin-top:.1rem;font-size:.875rem;color:#fff;background-color:var(--bs-success);border-radius:var(--bs-border-radius)}.unfsij .was-validated :valid~.valid-feedback,.unfsij .was-validated :valid~.valid-tooltip,.unfsij .is-valid~.valid-feedback,.unfsij .is-valid~.valid-tooltip{display:block}.unfsij .was-validated .form-control:valid,.unfsij .form-control.is-valid{border-color:var(--bs-form-valid-border-color);padding-right:calc(1.5em + .75rem);background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23198754' d='M2.3 6.73.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e");background-repeat:no-repeat;background-position:right calc(.375em + .1875rem) center;background-size:calc(.75em + .375rem) calc(.75em + .375rem)}.unfsij .was-validated .form-control:valid:focus,.unfsij .form-control.is-valid:focus{border-color:var(--bs-form-valid-border-color);box-shadow:0 0 0 .25rem rgba(var(--bs-success-rgb),.25)}.unfsij .was-validated textarea.form-control:valid,.unfsij textarea.form-control.is-valid{padding-right:calc(1.5em + .75rem);background-position:top calc(.375em + .1875rem) right calc(.375em + .1875rem)}.unfsij .was-validated .form-select:valid,.unfsij .form-select.is-valid{border-color:var(--bs-form-valid-border-color)}.unfsij .was-validated .form-select:valid:not([multiple]):not([size]),.unfsij .was-validated .form-select:valid:not([multiple])[size="1"],.unfsij .form-select.is-valid:not([multiple]):not([size]),.unfsij .form-select.is-valid:not([multiple])[size="1"]{--bs-form-select-bg-icon: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23198754' d='M2.3 6.73.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e");padding-right:4.125rem;background-position:right .75rem center,center right 2.25rem;background-size:16px 12px,calc(.75em + .375rem) calc(.75em + .375rem)}.unfsij .was-validated .form-select:valid:focus,.unfsij .form-select.is-valid:focus{border-color:var(--bs-form-valid-border-color);box-shadow:0 0 0 .25rem rgba(var(--bs-success-rgb),.25)}.unfsij .was-validated .form-control-color:valid,.unfsij .form-control-color.is-valid{width:calc(3.75rem + 1.5em)}.unfsij .was-validated .form-check-input:valid,.unfsij .form-check-input.is-valid{border-color:var(--bs-form-valid-border-color)}.unfsij .was-validated .form-check-input:valid:checked,.unfsij .form-check-input.is-valid:checked{background-color:var(--bs-form-valid-color)}.unfsij .was-validated .form-check-input:valid:focus,.unfsij .form-check-input.is-valid:focus{box-shadow:0 0 0 .25rem rgba(var(--bs-success-rgb),.25)}.unfsij .was-validated .form-check-input:valid~.form-check-label,.unfsij .form-check-input.is-valid~.form-check-label{color:var(--bs-form-valid-color)}.unfsij .form-check-inline .form-check-input~.valid-feedback{margin-left:.5em}.unfsij .was-validated .input-group>.form-control:not(:focus):valid,.unfsij .input-group>.form-control:not(:focus).is-valid,.unfsij .was-validated .input-group>.form-select:not(:focus):valid,.unfsij .input-group>.form-select:not(:focus).is-valid,.unfsij .was-validated .input-group>.form-floating:not(:focus-within):valid,.unfsij .input-group>.form-floating:not(:focus-within).is-valid{z-index:3}.unfsij .invalid-feedback{display:none;width:100%;margin-top:.25rem;font-size:.875em;color:var(--bs-form-invalid-color)}.unfsij .invalid-tooltip{position:absolute;top:100%;z-index:5;display:none;max-width:100%;padding:.25rem .5rem;margin-top:.1rem;font-size:.875rem;color:#fff;background-color:var(--bs-danger);border-radius:var(--bs-border-radius)}.unfsij .was-validated :invalid~.invalid-feedback,.unfsij .was-validated :invalid~.invalid-tooltip,.unfsij .is-invalid~.invalid-feedback,.unfsij .is-invalid~.invalid-tooltip{display:block}.unfsij .was-validated .form-control:invalid,.unfsij .form-control.is-invalid{border-color:var(--bs-form-invalid-border-color);padding-right:calc(1.5em + .75rem);background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e");background-repeat:no-repeat;background-position:right calc(.375em + .1875rem) center;background-size:calc(.75em + .375rem) calc(.75em + .375rem)}.unfsij .was-validated .form-control:invalid:focus,.unfsij .form-control.is-invalid:focus{border-color:var(--bs-form-invalid-border-color);box-shadow:0 0 0 .25rem rgba(var(--bs-danger-rgb),.25)}.unfsij .was-validated textarea.form-control:invalid,.unfsij textarea.form-control.is-invalid{padding-right:calc(1.5em + .75rem);background-position:top calc(.375em + .1875rem) right calc(.375em + .1875rem)}.unfsij .was-validated .form-select:invalid,.unfsij .form-select.is-invalid{border-color:var(--bs-form-invalid-border-color)}.unfsij .was-validated .form-select:invalid:not([multiple]):not([size]),.unfsij .was-validated .form-select:invalid:not([multiple])[size="1"],.unfsij .form-select.is-invalid:not([multiple]):not([size]),.unfsij .form-select.is-invalid:not([multiple])[size="1"]{--bs-form-select-bg-icon: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e");padding-right:4.125rem;background-position:right .75rem center,center right 2.25rem;background-size:16px 12px,calc(.75em + .375rem) calc(.75em + .375rem)}.unfsij .was-validated .form-select:invalid:focus,.unfsij .form-select.is-invalid:focus{border-color:var(--bs-form-invalid-border-color);box-shadow:0 0 0 .25rem rgba(var(--bs-danger-rgb),.25)}.unfsij .was-validated .form-control-color:invalid,.unfsij .form-control-color.is-invalid{width:calc(3.75rem + 1.5em)}.unfsij .was-validated .form-check-input:invalid,.unfsij .form-check-input.is-invalid{border-color:var(--bs-form-invalid-border-color)}.unfsij .was-validated .form-check-input:invalid:checked,.unfsij .form-check-input.is-invalid:checked{background-color:var(--bs-form-invalid-color)}.unfsij .was-validated .form-check-input:invalid:focus,.unfsij .form-check-input.is-invalid:focus{box-shadow:0 0 0 .25rem rgba(var(--bs-danger-rgb),.25)}.unfsij .was-validated .form-check-input:invalid~.form-check-label,.unfsij .form-check-input.is-invalid~.form-check-label{color:var(--bs-form-invalid-color)}.unfsij .form-check-inline .form-check-input~.invalid-feedback{margin-left:.5em}.unfsij .was-validated .input-group>.form-control:not(:focus):invalid,.unfsij .input-group>.form-control:not(:focus).is-invalid,.unfsij .was-validated .input-group>.form-select:not(:focus):invalid,.unfsij .input-group>.form-select:not(:focus).is-invalid,.unfsij .was-validated .input-group>.form-floating:not(:focus-within):invalid,.unfsij .input-group>.form-floating:not(:focus-within).is-invalid{z-index:4}.unfsij .btn{--bs-btn-padding-x: .75rem;--bs-btn-padding-y: .375rem;--bs-btn-font-family: ;--bs-btn-font-size: 1rem;--bs-btn-font-weight: 400;--bs-btn-line-height: 1.5;--bs-btn-color: var(--bs-body-color);--bs-btn-bg: transparent;--bs-btn-border-width: var(--bs-border-width);--bs-btn-border-color: transparent;--bs-btn-border-radius: var(--bs-border-radius);--bs-btn-hover-border-color: transparent;--bs-btn-box-shadow: inset 0 1px 0 rgba(255, 255, 255, .15), 0 1px 1px rgba(0, 0, 0, .075);--bs-btn-disabled-opacity: .65;--bs-btn-focus-box-shadow: 0 0 0 .25rem rgba(var(--bs-btn-focus-shadow-rgb), .5);display:inline-block;padding:var(--bs-btn-padding-y) var(--bs-btn-padding-x);font-family:var(--bs-btn-font-family);font-size:var(--bs-btn-font-size);font-weight:var(--bs-btn-font-weight);line-height:var(--bs-btn-line-height);color:var(--bs-btn-color);text-align:center;text-decoration:none;vertical-align:middle;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;user-select:none;border:var(--bs-btn-border-width) solid var(--bs-btn-border-color);border-radius:var(--bs-btn-border-radius);background-color:var(--bs-btn-bg);transition:color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out}@media (prefers-reduced-motion: reduce){.unfsij .btn{transition:none}}.unfsij .btn:hover{color:var(--bs-btn-hover-color);background-color:var(--bs-btn-hover-bg);border-color:var(--bs-btn-hover-border-color)}.unfsij .btn-check+.btn:hover{color:var(--bs-btn-color);background-color:var(--bs-btn-bg);border-color:var(--bs-btn-border-color)}.unfsij .btn:focus-visible{color:var(--bs-btn-hover-color);background-color:var(--bs-btn-hover-bg);border-color:var(--bs-btn-hover-border-color);outline:0;box-shadow:var(--bs-btn-focus-box-shadow)}.unfsij .btn-check:focus-visible+.btn{border-color:var(--bs-btn-hover-border-color);outline:0;box-shadow:var(--bs-btn-focus-box-shadow)}.unfsij .btn-check:checked+.btn,.unfsij :not(.btn-check)+.btn:active,.unfsij .btn:first-child:active,.unfsij .btn.active,.unfsij .btn.show{color:var(--bs-btn-active-color);background-color:var(--bs-btn-active-bg);border-color:var(--bs-btn-active-border-color)}.unfsij .btn-check:checked+.btn:focus-visible,.unfsij :not(.btn-check)+.btn:active:focus-visible,.unfsij .btn:first-child:active:focus-visible,.unfsij .btn.active:focus-visible,.unfsij .btn.show:focus-visible{box-shadow:var(--bs-btn-focus-box-shadow)}.unfsij .btn-check:checked:focus-visible+.btn{box-shadow:var(--bs-btn-focus-box-shadow)}.unfsij .btn:disabled,.unfsij .btn.disabled,.unfsij fieldset:disabled .btn{color:var(--bs-btn-disabled-color);pointer-events:none;background-color:var(--bs-btn-disabled-bg);border-color:var(--bs-btn-disabled-border-color);opacity:var(--bs-btn-disabled-opacity)}.unfsij .btn-primary{--bs-btn-color: #fff;--bs-btn-bg: #0d6efd;--bs-btn-border-color: #0d6efd;--bs-btn-hover-color: #fff;--bs-btn-hover-bg: rgb(11.05, 93.5, 215.05);--bs-btn-hover-border-color: rgb(10.4, 88, 202.4);--bs-btn-focus-shadow-rgb: 49, 132, 253;--bs-btn-active-color: #fff;--bs-btn-active-bg: rgb(10.4, 88, 202.4);--bs-btn-active-border-color: rgb(9.75, 82.5, 189.75);--bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);--bs-btn-disabled-color: #fff;--bs-btn-disabled-bg: #0d6efd;--bs-btn-disabled-border-color: #0d6efd}.unfsij .btn-secondary{--bs-btn-color: #fff;--bs-btn-bg: #6c757d;--bs-btn-border-color: #6c757d;--bs-btn-hover-color: #fff;--bs-btn-hover-bg: rgb(91.8, 99.45, 106.25);--bs-btn-hover-border-color: rgb(86.4, 93.6, 100);--bs-btn-focus-shadow-rgb: 130, 138, 145;--bs-btn-active-color: #fff;--bs-btn-active-bg: rgb(86.4, 93.6, 100);--bs-btn-active-border-color: rgb(81, 87.75, 93.75);--bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);--bs-btn-disabled-color: #fff;--bs-btn-disabled-bg: #6c757d;--bs-btn-disabled-border-color: #6c757d}.unfsij .btn-success{--bs-btn-color: #fff;--bs-btn-bg: #198754;--bs-btn-border-color: #198754;--bs-btn-hover-color: #fff;--bs-btn-hover-bg: rgb(21.25, 114.75, 71.4);--bs-btn-hover-border-color: rgb(20, 108, 67.2);--bs-btn-focus-shadow-rgb: 60, 153, 110;--bs-btn-active-color: #fff;--bs-btn-active-bg: rgb(20, 108, 67.2);--bs-btn-active-border-color: rgb(18.75, 101.25, 63);--bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);--bs-btn-disabled-color: #fff;--bs-btn-disabled-bg: #198754;--bs-btn-disabled-border-color: #198754}.unfsij .btn-info{--bs-btn-color: #000;--bs-btn-bg: #0dcaf0;--bs-btn-border-color: #0dcaf0;--bs-btn-hover-color: #000;--bs-btn-hover-bg: rgb(49.3, 209.95, 242.25);--bs-btn-hover-border-color: rgb(37.2, 207.3, 241.5);--bs-btn-focus-shadow-rgb: 11, 172, 204;--bs-btn-active-color: #000;--bs-btn-active-bg: rgb(61.4, 212.6, 243);--bs-btn-active-border-color: rgb(37.2, 207.3, 241.5);--bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);--bs-btn-disabled-color: #000;--bs-btn-disabled-bg: #0dcaf0;--bs-btn-disabled-border-color: #0dcaf0}.unfsij .btn-warning{--bs-btn-color: #000;--bs-btn-bg: #ffc107;--bs-btn-border-color: #ffc107;--bs-btn-hover-color: #000;--bs-btn-hover-bg: rgb(255, 202.3, 44.2);--bs-btn-hover-border-color: rgb(255, 199.2, 31.8);--bs-btn-focus-shadow-rgb: 217, 164, 6;--bs-btn-active-color: #000;--bs-btn-active-bg: rgb(255, 205.4, 56.6);--bs-btn-active-border-color: rgb(255, 199.2, 31.8);--bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);--bs-btn-disabled-color: #000;--bs-btn-disabled-bg: #ffc107;--bs-btn-disabled-border-color: #ffc107}.unfsij .btn-danger{--bs-btn-color: #fff;--bs-btn-bg: #dc3545;--bs-btn-border-color: #dc3545;--bs-btn-hover-color: #fff;--bs-btn-hover-bg: rgb(187, 45.05, 58.65);--bs-btn-hover-border-color: rgb(176, 42.4, 55.2);--bs-btn-focus-shadow-rgb: 225, 83, 97;--bs-btn-active-color: #fff;--bs-btn-active-bg: rgb(176, 42.4, 55.2);--bs-btn-active-border-color: rgb(165, 39.75, 51.75);--bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);--bs-btn-disabled-color: #fff;--bs-btn-disabled-bg: #dc3545;--bs-btn-disabled-border-color: #dc3545}.unfsij .btn-light{--bs-btn-color: #000;--bs-btn-bg: #f8f9fa;--bs-btn-border-color: #f8f9fa;--bs-btn-hover-color: #000;--bs-btn-hover-bg: rgb(210.8, 211.65, 212.5);--bs-btn-hover-border-color: rgb(198.4, 199.2, 200);--bs-btn-focus-shadow-rgb: 211, 212, 213;--bs-btn-active-color: #000;--bs-btn-active-bg: rgb(198.4, 199.2, 200);--bs-btn-active-border-color: rgb(186, 186.75, 187.5);--bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);--bs-btn-disabled-color: #000;--bs-btn-disabled-bg: #f8f9fa;--bs-btn-disabled-border-color: #f8f9fa}.unfsij .btn-dark{--bs-btn-color: #fff;--bs-btn-bg: #212529;--bs-btn-border-color: #212529;--bs-btn-hover-color: #fff;--bs-btn-hover-bg: rgb(66.3, 69.7, 73.1);--bs-btn-hover-border-color: rgb(55.2, 58.8, 62.4);--bs-btn-focus-shadow-rgb: 66, 70, 73;--bs-btn-active-color: #fff;--bs-btn-active-bg: rgb(77.4, 80.6, 83.8);--bs-btn-active-border-color: rgb(55.2, 58.8, 62.4);--bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);--bs-btn-disabled-color: #fff;--bs-btn-disabled-bg: #212529;--bs-btn-disabled-border-color: #212529}.unfsij .btn-sk-primary{--bs-btn-color: #fff;--bs-btn-bg: #432949;--bs-btn-border-color: #432949;--bs-btn-hover-color: #fff;--bs-btn-hover-bg: rgb(56.95, 34.85, 62.05);--bs-btn-hover-border-color: rgb(53.6, 32.8, 58.4);--bs-btn-focus-shadow-rgb: 95, 73, 100;--bs-btn-active-color: #fff;--bs-btn-active-bg: rgb(53.6, 32.8, 58.4);--bs-btn-active-border-color: rgb(50.25, 30.75, 54.75);--bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);--bs-btn-disabled-color: #fff;--bs-btn-disabled-bg: #432949;--bs-btn-disabled-border-color: #432949}.unfsij .btn-sk-secondary{--bs-btn-color: #fff;--bs-btn-bg: #613b6a;--bs-btn-border-color: #613b6a;--bs-btn-hover-color: #fff;--bs-btn-hover-bg: rgb(82.45, 50.15, 90.1);--bs-btn-hover-border-color: rgb(77.6, 47.2, 84.8);--bs-btn-focus-shadow-rgb: 121, 88, 128;--bs-btn-active-color: #fff;--bs-btn-active-bg: rgb(77.6, 47.2, 84.8);--bs-btn-active-border-color: rgb(72.75, 44.25, 79.5);--bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);--bs-btn-disabled-color: #fff;--bs-btn-disabled-bg: #613b6a;--bs-btn-disabled-border-color: #613b6a}.unfsij .btn-outline-primary{--bs-btn-color: #0d6efd;--bs-btn-border-color: #0d6efd;--bs-btn-hover-color: #fff;--bs-btn-hover-bg: #0d6efd;--bs-btn-hover-border-color: #0d6efd;--bs-btn-focus-shadow-rgb: 13, 110, 253;--bs-btn-active-color: #fff;--bs-btn-active-bg: #0d6efd;--bs-btn-active-border-color: #0d6efd;--bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);--bs-btn-disabled-color: #0d6efd;--bs-btn-disabled-bg: transparent;--bs-btn-disabled-border-color: #0d6efd;--bs-gradient: none}.unfsij .btn-outline-secondary{--bs-btn-color: #6c757d;--bs-btn-border-color: #6c757d;--bs-btn-hover-color: #fff;--bs-btn-hover-bg: #6c757d;--bs-btn-hover-border-color: #6c757d;--bs-btn-focus-shadow-rgb: 108, 117, 125;--bs-btn-active-color: #fff;--bs-btn-active-bg: #6c757d;--bs-btn-active-border-color: #6c757d;--bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);--bs-btn-disabled-color: #6c757d;--bs-btn-disabled-bg: transparent;--bs-btn-disabled-border-color: #6c757d;--bs-gradient: none}.unfsij .btn-outline-success{--bs-btn-color: #198754;--bs-btn-border-color: #198754;--bs-btn-hover-color: #fff;--bs-btn-hover-bg: #198754;--bs-btn-hover-border-color: #198754;--bs-btn-focus-shadow-rgb: 25, 135, 84;--bs-btn-active-color: #fff;--bs-btn-active-bg: #198754;--bs-btn-active-border-color: #198754;--bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);--bs-btn-disabled-color: #198754;--bs-btn-disabled-bg: transparent;--bs-btn-disabled-border-color: #198754;--bs-gradient: none}.unfsij .btn-outline-info{--bs-btn-color: #0dcaf0;--bs-btn-border-color: #0dcaf0;--bs-btn-hover-color: #000;--bs-btn-hover-bg: #0dcaf0;--bs-btn-hover-border-color: #0dcaf0;--bs-btn-focus-shadow-rgb: 13, 202, 240;--bs-btn-active-color: #000;--bs-btn-active-bg: #0dcaf0;--bs-btn-active-border-color: #0dcaf0;--bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);--bs-btn-disabled-color: #0dcaf0;--bs-btn-disabled-bg: transparent;--bs-btn-disabled-border-color: #0dcaf0;--bs-gradient: none}.unfsij .btn-outline-warning{--bs-btn-color: #ffc107;--bs-btn-border-color: #ffc107;--bs-btn-hover-color: #000;--bs-btn-hover-bg: #ffc107;--bs-btn-hover-border-color: #ffc107;--bs-btn-focus-shadow-rgb: 255, 193, 7;--bs-btn-active-color: #000;--bs-btn-active-bg: #ffc107;--bs-btn-active-border-color: #ffc107;--bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);--bs-btn-disabled-color: #ffc107;--bs-btn-disabled-bg: transparent;--bs-btn-disabled-border-color: #ffc107;--bs-gradient: none}.unfsij .btn-outline-danger{--bs-btn-color: #dc3545;--bs-btn-border-color: #dc3545;--bs-btn-hover-color: #fff;--bs-btn-hover-bg: #dc3545;--bs-btn-hover-border-color: #dc3545;--bs-btn-focus-shadow-rgb: 220, 53, 69;--bs-btn-active-color: #fff;--bs-btn-active-bg: #dc3545;--bs-btn-active-border-color: #dc3545;--bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);--bs-btn-disabled-color: #dc3545;--bs-btn-disabled-bg: transparent;--bs-btn-disabled-border-color: #dc3545;--bs-gradient: none}.unfsij .btn-outline-light{--bs-btn-color: #f8f9fa;--bs-btn-border-color: #f8f9fa;--bs-btn-hover-color: #000;--bs-btn-hover-bg: #f8f9fa;--bs-btn-hover-border-color: #f8f9fa;--bs-btn-focus-shadow-rgb: 248, 249, 250;--bs-btn-active-color: #000;--bs-btn-active-bg: #f8f9fa;--bs-btn-active-border-color: #f8f9fa;--bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);--bs-btn-disabled-color: #f8f9fa;--bs-btn-disabled-bg: transparent;--bs-btn-disabled-border-color: #f8f9fa;--bs-gradient: none}.unfsij .btn-outline-dark{--bs-btn-color: #212529;--bs-btn-border-color: #212529;--bs-btn-hover-color: #fff;--bs-btn-hover-bg: #212529;--bs-btn-hover-border-color: #212529;--bs-btn-focus-shadow-rgb: 33, 37, 41;--bs-btn-active-color: #fff;--bs-btn-active-bg: #212529;--bs-btn-active-border-color: #212529;--bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);--bs-btn-disabled-color: #212529;--bs-btn-disabled-bg: transparent;--bs-btn-disabled-border-color: #212529;--bs-gradient: none}.unfsij .btn-outline-sk-primary{--bs-btn-color: #432949;--bs-btn-border-color: #432949;--bs-btn-hover-color: #fff;--bs-btn-hover-bg: #432949;--bs-btn-hover-border-color: #432949;--bs-btn-focus-shadow-rgb: 67, 41, 73;--bs-btn-active-color: #fff;--bs-btn-active-bg: #432949;--bs-btn-active-border-color: #432949;--bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);--bs-btn-disabled-color: #432949;--bs-btn-disabled-bg: transparent;--bs-btn-disabled-border-color: #432949;--bs-gradient: none}.unfsij .btn-outline-sk-secondary{--bs-btn-color: #613b6a;--bs-btn-border-color: #613b6a;--bs-btn-hover-color: #fff;--bs-btn-hover-bg: #613b6a;--bs-btn-hover-border-color: #613b6a;--bs-btn-focus-shadow-rgb: 97, 59, 106;--bs-btn-active-color: #fff;--bs-btn-active-bg: #613b6a;--bs-btn-active-border-color: #613b6a;--bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);--bs-btn-disabled-color: #613b6a;--bs-btn-disabled-bg: transparent;--bs-btn-disabled-border-color: #613b6a;--bs-gradient: none}.unfsij .btn-link{--bs-btn-font-weight: 400;--bs-btn-color: var(--bs-link-color);--bs-btn-bg: transparent;--bs-btn-border-color: transparent;--bs-btn-hover-color: var(--bs-link-hover-color);--bs-btn-hover-border-color: transparent;--bs-btn-active-color: var(--bs-link-hover-color);--bs-btn-active-border-color: transparent;--bs-btn-disabled-color: #6c757d;--bs-btn-disabled-border-color: transparent;--bs-btn-box-shadow: 0 0 0 #000;--bs-btn-focus-shadow-rgb: 49, 132, 253;text-decoration:underline}.unfsij .btn-link:focus-visible{color:var(--bs-btn-color)}.unfsij .btn-link:hover{color:var(--bs-btn-hover-color)}.unfsij .btn-lg{--bs-btn-padding-y: .5rem;--bs-btn-padding-x: 1rem;--bs-btn-font-size: 1.25rem;--bs-btn-border-radius: var(--bs-border-radius-lg)}.unfsij .btn-sm{--bs-btn-padding-y: .25rem;--bs-btn-padding-x: .5rem;--bs-btn-font-size: .875rem;--bs-btn-border-radius: var(--bs-border-radius-sm)}.fade{transition:opacity .15s linear}@media (prefers-reduced-motion: reduce){.fade{transition:none}}.fade:not(.show){opacity:0}.unfsij .collapse:not(.show){display:none}.unfsij .collapsing{height:0;overflow:hidden;transition:height .35s ease}@media (prefers-reduced-motion: reduce){.unfsij .collapsing{transition:none}}.unfsij .collapsing.collapse-horizontal{width:0;height:auto;transition:width .35s ease}@media (prefers-reduced-motion: reduce){.unfsij .collapsing.collapse-horizontal{transition:none}}.unfsij .dropup,.unfsij .dropend,.unfsij .dropdown,.unfsij .dropstart,.unfsij .dropup-center,.unfsij .dropdown-center{position:relative}.unfsij .dropdown-toggle{white-space:nowrap}.unfsij .dropdown-toggle:after{display:inline-block;margin-left:.255em;vertical-align:.255em;content:"";border-top:.3em solid;border-right:.3em solid transparent;border-bottom:0;border-left:.3em solid transparent}.unfsij .dropdown-toggle:empty:after{margin-left:0}.unfsij .dropdown-menu{--bs-dropdown-zindex: 1000;--bs-dropdown-min-width: 10rem;--bs-dropdown-padding-x: 0;--bs-dropdown-padding-y: .5rem;--bs-dropdown-spacer: .125rem;--bs-dropdown-font-size: 1rem;--bs-dropdown-color: var(--bs-body-color);--bs-dropdown-bg: var(--bs-body-bg);--bs-dropdown-border-color: var(--bs-border-color-translucent);--bs-dropdown-border-radius: var(--bs-border-radius);--bs-dropdown-border-width: var(--bs-border-width);--bs-dropdown-inner-border-radius: calc(var(--bs-border-radius) - var(--bs-border-width));--bs-dropdown-divider-bg: var(--bs-border-color-translucent);--bs-dropdown-divider-margin-y: .5rem;--bs-dropdown-box-shadow: var(--bs-box-shadow);--bs-dropdown-link-color: var(--bs-body-color);--bs-dropdown-link-hover-color: var(--bs-body-color);--bs-dropdown-link-hover-bg: var(--bs-tertiary-bg);--bs-dropdown-link-active-color: #fff;--bs-dropdown-link-active-bg: #0d6efd;--bs-dropdown-link-disabled-color: var(--bs-tertiary-color);--bs-dropdown-item-padding-x: 1rem;--bs-dropdown-item-padding-y: .25rem;--bs-dropdown-header-color: #6c757d;--bs-dropdown-header-padding-x: 1rem;--bs-dropdown-header-padding-y: .5rem;position:absolute;z-index:var(--bs-dropdown-zindex);display:none;min-width:var(--bs-dropdown-min-width);padding:var(--bs-dropdown-padding-y) var(--bs-dropdown-padding-x);margin:0;font-size:var(--bs-dropdown-font-size);color:var(--bs-dropdown-color);text-align:left;list-style:none;background-color:var(--bs-dropdown-bg);background-clip:padding-box;border:var(--bs-dropdown-border-width) solid var(--bs-dropdown-border-color);border-radius:var(--bs-dropdown-border-radius)}.unfsij .dropdown-menu[data-bs-popper]{top:100%;left:0;margin-top:var(--bs-dropdown-spacer)}.unfsij .dropdown-menu-start{--bs-position: start}.unfsij .dropdown-menu-start[data-bs-popper]{right:auto;left:0}.unfsij .dropdown-menu-end{--bs-position: end}.unfsij .dropdown-menu-end[data-bs-popper]{right:0;left:auto}@media (min-width: 576px){.unfsij .dropdown-menu-sm-start{--bs-position: start}.unfsij .dropdown-menu-sm-start[data-bs-popper]{right:auto;left:0}.unfsij .dropdown-menu-sm-end{--bs-position: end}.unfsij .dropdown-menu-sm-end[data-bs-popper]{right:0;left:auto}}@media (min-width: 768px){.unfsij .dropdown-menu-md-start{--bs-position: start}.unfsij .dropdown-menu-md-start[data-bs-popper]{right:auto;left:0}.unfsij .dropdown-menu-md-end{--bs-position: end}.unfsij .dropdown-menu-md-end[data-bs-popper]{right:0;left:auto}}@media (min-width: 992px){.unfsij .dropdown-menu-lg-start{--bs-position: start}.unfsij .dropdown-menu-lg-start[data-bs-popper]{right:auto;left:0}.unfsij .dropdown-menu-lg-end{--bs-position: end}.unfsij .dropdown-menu-lg-end[data-bs-popper]{right:0;left:auto}}@media (min-width: 1200px){.unfsij .dropdown-menu-xl-start{--bs-position: start}.unfsij .dropdown-menu-xl-start[data-bs-popper]{right:auto;left:0}.unfsij .dropdown-menu-xl-end{--bs-position: end}.unfsij .dropdown-menu-xl-end[data-bs-popper]{right:0;left:auto}}@media (min-width: 1400px){.unfsij .dropdown-menu-xxl-start{--bs-position: start}.unfsij .dropdown-menu-xxl-start[data-bs-popper]{right:auto;left:0}.unfsij .dropdown-menu-xxl-end{--bs-position: end}.unfsij .dropdown-menu-xxl-end[data-bs-popper]{right:0;left:auto}}.unfsij .dropup .dropdown-menu[data-bs-popper]{top:auto;bottom:100%;margin-top:0;margin-bottom:var(--bs-dropdown-spacer)}.unfsij .dropup .dropdown-toggle:after{display:inline-block;margin-left:.255em;vertical-align:.255em;content:"";border-top:0;border-right:.3em solid transparent;border-bottom:.3em solid;border-left:.3em solid transparent}.unfsij .dropup .dropdown-toggle:empty:after{margin-left:0}.unfsij .dropend .dropdown-menu[data-bs-popper]{top:0;right:auto;left:100%;margin-top:0;margin-left:var(--bs-dropdown-spacer)}.unfsij .dropend .dropdown-toggle:after{display:inline-block;margin-left:.255em;vertical-align:.255em;content:"";border-top:.3em solid transparent;border-right:0;border-bottom:.3em solid transparent;border-left:.3em solid}.unfsij .dropend .dropdown-toggle:empty:after{margin-left:0}.unfsij .dropend .dropdown-toggle:after{vertical-align:0}.unfsij .dropstart .dropdown-menu[data-bs-popper]{top:0;right:100%;left:auto;margin-top:0;margin-right:var(--bs-dropdown-spacer)}.unfsij .dropstart .dropdown-toggle:after{display:inline-block;margin-left:.255em;vertical-align:.255em;content:""}.unfsij .dropstart .dropdown-toggle:after{display:none}.unfsij .dropstart .dropdown-toggle:before{display:inline-block;margin-right:.255em;vertical-align:.255em;content:"";border-top:.3em solid transparent;border-right:.3em solid;border-bottom:.3em solid transparent}.unfsij .dropstart .dropdown-toggle:empty:after{margin-left:0}.unfsij .dropstart .dropdown-toggle:before{vertical-align:0}.unfsij .dropdown-divider{height:0;margin:var(--bs-dropdown-divider-margin-y) 0;overflow:hidden;border-top:1px solid var(--bs-dropdown-divider-bg);opacity:1}.unfsij .dropdown-item{display:block;width:100%;padding:var(--bs-dropdown-item-padding-y) var(--bs-dropdown-item-padding-x);clear:both;font-weight:400;color:var(--bs-dropdown-link-color);text-align:inherit;text-decoration:none;white-space:nowrap;background-color:transparent;border:0;border-radius:var(--bs-dropdown-item-border-radius, 0)}.unfsij .dropdown-item:hover,.unfsij .dropdown-item:focus{color:var(--bs-dropdown-link-hover-color);background-color:var(--bs-dropdown-link-hover-bg)}.unfsij .dropdown-item.active,.unfsij .dropdown-item:active{color:var(--bs-dropdown-link-active-color);text-decoration:none;background-color:var(--bs-dropdown-link-active-bg)}.unfsij .dropdown-item.disabled,.unfsij .dropdown-item:disabled{color:var(--bs-dropdown-link-disabled-color);pointer-events:none;background-color:transparent}.unfsij .dropdown-menu.show{display:block}.unfsij .dropdown-header{display:block;padding:var(--bs-dropdown-header-padding-y) var(--bs-dropdown-header-padding-x);margin-bottom:0;font-size:.875rem;color:var(--bs-dropdown-header-color);white-space:nowrap}.unfsij .dropdown-item-text{display:block;padding:var(--bs-dropdown-item-padding-y) var(--bs-dropdown-item-padding-x);color:var(--bs-dropdown-link-color)}.unfsij .dropdown-menu-dark{--bs-dropdown-color: #dee2e6;--bs-dropdown-bg: #343a40;--bs-dropdown-border-color: var(--bs-border-color-translucent);--bs-dropdown-box-shadow: ;--bs-dropdown-link-color: #dee2e6;--bs-dropdown-link-hover-color: #fff;--bs-dropdown-divider-bg: var(--bs-border-color-translucent);--bs-dropdown-link-hover-bg: rgba(255, 255, 255, .15);--bs-dropdown-link-active-color: #fff;--bs-dropdown-link-active-bg: #0d6efd;--bs-dropdown-link-disabled-color: #adb5bd;--bs-dropdown-header-color: #adb5bd}.unfsij .nav{--bs-nav-link-padding-x: 1rem;--bs-nav-link-padding-y: .5rem;--bs-nav-link-font-weight: ;--bs-nav-link-color: var(--bs-link-color);--bs-nav-link-hover-color: var(--bs-link-hover-color);--bs-nav-link-disabled-color: var(--bs-secondary-color);display:flex;flex-wrap:wrap;padding-left:0;margin-bottom:0;list-style:none}.unfsij .nav-link{display:block;padding:var(--bs-nav-link-padding-y) var(--bs-nav-link-padding-x);font-size:var(--bs-nav-link-font-size);font-weight:var(--bs-nav-link-font-weight);color:var(--bs-nav-link-color);text-decoration:none;background:none;border:0;transition:color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out}@media (prefers-reduced-motion: reduce){.unfsij .nav-link{transition:none}}.unfsij .nav-link:hover,.unfsij .nav-link:focus{color:var(--bs-nav-link-hover-color)}.unfsij .nav-link:focus-visible{outline:0;box-shadow:0 0 0 .25rem #0d6efd40}.unfsij .nav-link.disabled,.unfsij .nav-link:disabled{color:var(--bs-nav-link-disabled-color);pointer-events:none;cursor:default}.unfsij .nav-tabs{--bs-nav-tabs-border-width: var(--bs-border-width);--bs-nav-tabs-border-color: var(--bs-border-color);--bs-nav-tabs-border-radius: var(--bs-border-radius);--bs-nav-tabs-link-hover-border-color: var(--bs-secondary-bg) var(--bs-secondary-bg) var(--bs-border-color);--bs-nav-tabs-link-active-color: var(--bs-emphasis-color);--bs-nav-tabs-link-active-bg: var(--bs-body-bg);--bs-nav-tabs-link-active-border-color: var(--bs-border-color) var(--bs-border-color) var(--bs-body-bg);border-bottom:var(--bs-nav-tabs-border-width) solid var(--bs-nav-tabs-border-color)}.unfsij .nav-tabs .nav-link{margin-bottom:calc(-1 * var(--bs-nav-tabs-border-width));border:var(--bs-nav-tabs-border-width) solid transparent;border-top-left-radius:var(--bs-nav-tabs-border-radius);border-top-right-radius:var(--bs-nav-tabs-border-radius)}.unfsij .nav-tabs .nav-link:hover,.unfsij .nav-tabs .nav-link:focus{isolation:isolate;border-color:var(--bs-nav-tabs-link-hover-border-color)}.unfsij .nav-tabs .nav-link.active,.unfsij .nav-tabs .nav-item.show .nav-link{color:var(--bs-nav-tabs-link-active-color);background-color:var(--bs-nav-tabs-link-active-bg);border-color:var(--bs-nav-tabs-link-active-border-color)}.unfsij .nav-tabs .dropdown-menu{margin-top:calc(-1 * var(--bs-nav-tabs-border-width));border-top-left-radius:0;border-top-right-radius:0}.unfsij .nav-pills{--bs-nav-pills-border-radius: var(--bs-border-radius);--bs-nav-pills-link-active-color: #fff;--bs-nav-pills-link-active-bg: #0d6efd}.unfsij .nav-pills .nav-link{border-radius:var(--bs-nav-pills-border-radius)}.unfsij .nav-pills .nav-link.active,.unfsij .nav-pills .show>.nav-link{color:var(--bs-nav-pills-link-active-color);background-color:var(--bs-nav-pills-link-active-bg)}.unfsij .nav-underline{--bs-nav-underline-gap: 1rem;--bs-nav-underline-border-width: .125rem;--bs-nav-underline-link-active-color: var(--bs-emphasis-color);gap:var(--bs-nav-underline-gap)}.unfsij .nav-underline .nav-link{padding-right:0;padding-left:0;border-bottom:var(--bs-nav-underline-border-width) solid transparent}.unfsij .nav-underline .nav-link:hover,.unfsij .nav-underline .nav-link:focus{border-bottom-color:currentcolor}.unfsij .nav-underline .nav-link.active,.unfsij .nav-underline .show>.nav-link{font-weight:700;color:var(--bs-nav-underline-link-active-color);border-bottom-color:currentcolor}.unfsij .nav-fill>.nav-link,.unfsij .nav-fill .nav-item{flex:1 1 auto;text-align:center}.unfsij .nav-justified>.nav-link,.unfsij .nav-justified .nav-item{flex-basis:0;flex-grow:1;text-align:center}.unfsij .nav-fill .nav-item .nav-link,.unfsij .nav-justified .nav-item .nav-link{width:100%}.unfsij .tab-content>.tab-pane{display:none}.unfsij .tab-content>.active{display:block}.unfsij .accordion{--bs-accordion-color: var(--bs-body-color);--bs-accordion-bg: var(--bs-body-bg);--bs-accordion-transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out, border-radius .15s ease;--bs-accordion-border-color: var(--bs-border-color);--bs-accordion-border-width: var(--bs-border-width);--bs-accordion-border-radius: var(--bs-border-radius);--bs-accordion-inner-border-radius: calc(var(--bs-border-radius) - (var(--bs-border-width)));--bs-accordion-btn-padding-x: 1.25rem;--bs-accordion-btn-padding-y: 1rem;--bs-accordion-btn-color: var(--bs-body-color);--bs-accordion-btn-bg: var(--bs-accordion-bg);--bs-accordion-btn-icon: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='%23212529' stroke-linecap='round' stroke-linejoin='round'%3e%3cpath d='M2 5L8 11L14 5'/%3e%3c/svg%3e");--bs-accordion-btn-icon-width: 1.25rem;--bs-accordion-btn-icon-transform: rotate(-180deg);--bs-accordion-btn-icon-transition: transform .2s ease-in-out;--bs-accordion-btn-active-icon: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='rgb%285.2, 44, 101.2%29' stroke-linecap='round' stroke-linejoin='round'%3e%3cpath d='M2 5L8 11L14 5'/%3e%3c/svg%3e");--bs-accordion-btn-focus-box-shadow: 0 0 0 .25rem rgba(13, 110, 253, .25);--bs-accordion-body-padding-x: 1.25rem;--bs-accordion-body-padding-y: 1rem;--bs-accordion-active-color: var(--bs-primary-text-emphasis);--bs-accordion-active-bg: var(--bs-primary-bg-subtle)}.unfsij .accordion-button{position:relative;display:flex;align-items:center;width:100%;padding:var(--bs-accordion-btn-padding-y) var(--bs-accordion-btn-padding-x);font-size:1rem;color:var(--bs-accordion-btn-color);text-align:left;background-color:var(--bs-accordion-btn-bg);border:0;border-radius:0;overflow-anchor:none;transition:var(--bs-accordion-transition)}@media (prefers-reduced-motion: reduce){.unfsij .accordion-button{transition:none}}.unfsij .accordion-button:not(.collapsed){color:var(--bs-accordion-active-color);background-color:var(--bs-accordion-active-bg);box-shadow:inset 0 calc(-1 * var(--bs-accordion-border-width)) 0 var(--bs-accordion-border-color)}.unfsij .accordion-button:not(.collapsed):after{background-image:var(--bs-accordion-btn-active-icon);transform:var(--bs-accordion-btn-icon-transform)}.unfsij .accordion-button:after{flex-shrink:0;width:var(--bs-accordion-btn-icon-width);height:var(--bs-accordion-btn-icon-width);margin-left:auto;content:"";background-image:var(--bs-accordion-btn-icon);background-repeat:no-repeat;background-size:var(--bs-accordion-btn-icon-width);transition:var(--bs-accordion-btn-icon-transition)}@media (prefers-reduced-motion: reduce){.unfsij .accordion-button:after{transition:none}}.unfsij .accordion-button:hover{z-index:2}.unfsij .accordion-button:focus{z-index:3;outline:0;box-shadow:var(--bs-accordion-btn-focus-box-shadow)}.unfsij .accordion-header{margin-bottom:0}.unfsij .accordion-item{color:var(--bs-accordion-color);background-color:var(--bs-accordion-bg);border:var(--bs-accordion-border-width) solid var(--bs-accordion-border-color)}.unfsij .accordion-item:first-of-type{border-top-left-radius:var(--bs-accordion-border-radius);border-top-right-radius:var(--bs-accordion-border-radius)}.unfsij .accordion-item:first-of-type>.accordion-header .accordion-button{border-top-left-radius:var(--bs-accordion-inner-border-radius);border-top-right-radius:var(--bs-accordion-inner-border-radius)}.unfsij .accordion-item:not(:first-of-type){border-top:0}.unfsij .accordion-item:last-of-type{border-bottom-right-radius:var(--bs-accordion-border-radius);border-bottom-left-radius:var(--bs-accordion-border-radius)}.unfsij .accordion-item:last-of-type>.accordion-header .accordion-button.collapsed{border-bottom-right-radius:var(--bs-accordion-inner-border-radius);border-bottom-left-radius:var(--bs-accordion-inner-border-radius)}.unfsij .accordion-item:last-of-type>.accordion-collapse{border-bottom-right-radius:var(--bs-accordion-border-radius);border-bottom-left-radius:var(--bs-accordion-border-radius)}.unfsij .accordion-body{padding:var(--bs-accordion-body-padding-y) var(--bs-accordion-body-padding-x)}.unfsij .accordion-flush>.accordion-item{border-right:0;border-left:0;border-radius:0}.unfsij .accordion-flush>.accordion-item:first-child{border-top:0}.unfsij .accordion-flush>.accordion-item:last-child{border-bottom:0}.unfsij .accordion-flush>.accordion-item>.accordion-header .accordion-button,.unfsij .accordion-flush>.accordion-item>.accordion-header .accordion-button.collapsed{border-radius:0}.unfsij .accordion-flush>.accordion-item>.accordion-collapse{border-radius:0}.unfsij[data-bs-theme=dark] .accordion-button:after{--bs-accordion-btn-icon: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='rgb%28109.8, 168, 253.8%29'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");--bs-accordion-btn-active-icon: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='rgb%28109.8, 168, 253.8%29'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e")}.unfsij .btn-close{--bs-btn-close-color: #000;--bs-btn-close-bg: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23000'%3e%3cpath d='M.293.293a1 1 0 0 1 1.414 0L8 6.586 14.293.293a1 1 0 1 1 1.414 1.414L9.414 8l6.293 6.293a1 1 0 0 1-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 0 1-1.414-1.414L6.586 8 .293 1.707a1 1 0 0 1 0-1.414z'/%3e%3c/svg%3e");--bs-btn-close-opacity: .5;--bs-btn-close-hover-opacity: .75;--bs-btn-close-focus-shadow: 0 0 0 .25rem rgba(13, 110, 253, .25);--bs-btn-close-focus-opacity: 1;--bs-btn-close-disabled-opacity: .25;--bs-btn-close-white-filter: invert(1) grayscale(100%) brightness(200%);box-sizing:content-box;width:1em;height:1em;padding:.25em;color:var(--bs-btn-close-color);background:transparent var(--bs-btn-close-bg) center/1em auto no-repeat;border:0;border-radius:.375rem;opacity:var(--bs-btn-close-opacity)}.unfsij .btn-close:hover{color:var(--bs-btn-close-color);text-decoration:none;opacity:var(--bs-btn-close-hover-opacity)}.unfsij .btn-close:focus{outline:0;box-shadow:var(--bs-btn-close-focus-shadow);opacity:var(--bs-btn-close-focus-opacity)}.unfsij .btn-close:disabled,.unfsij .btn-close.disabled{pointer-events:none;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--bs-btn-close-disabled-opacity)}.unfsij .btn-close-white,.unfsij[data-bs-theme=dark] .btn-close{filter:var(--bs-btn-close-white-filter)}.unfsij .modal{--bs-modal-zindex: 1055;--bs-modal-width: 500px;--bs-modal-padding: 1rem;--bs-modal-margin: .5rem;--bs-modal-color: ;--bs-modal-bg: var(--bs-body-bg);--bs-modal-border-color: var(--bs-border-color-translucent);--bs-modal-border-width: var(--bs-border-width);--bs-modal-border-radius: var(--bs-border-radius-lg);--bs-modal-box-shadow: var(--bs-box-shadow-sm);--bs-modal-inner-border-radius: calc(var(--bs-border-radius-lg) - (var(--bs-border-width)));--bs-modal-header-padding-x: 1rem;--bs-modal-header-padding-y: 1rem;--bs-modal-header-padding: 1rem 1rem;--bs-modal-header-border-color: var(--bs-border-color);--bs-modal-header-border-width: var(--bs-border-width);--bs-modal-title-line-height: 1.5;--bs-modal-footer-gap: .5rem;--bs-modal-footer-bg: ;--bs-modal-footer-border-color: var(--bs-border-color);--bs-modal-footer-border-width: var(--bs-border-width);position:fixed;top:0;left:0;z-index:var(--bs-modal-zindex);display:none;width:100%;height:100%;overflow-x:hidden;overflow-y:auto;outline:0}.unfsij .modal-dialog{position:relative;width:auto;margin:var(--bs-modal-margin);pointer-events:none}.unfsij .modal.fade .modal-dialog{transition:transform .3s ease-out;transform:translateY(-50px)}@media (prefers-reduced-motion: reduce){.unfsij .modal.fade .modal-dialog{transition:none}}.unfsij .modal.show .modal-dialog{transform:none}.unfsij .modal.modal-static .modal-dialog{transform:scale(1.02)}.unfsij .modal-dialog-scrollable{height:calc(100% - var(--bs-modal-margin) * 2)}.unfsij .modal-dialog-scrollable .modal-content{max-height:100%;overflow:hidden}.unfsij .modal-dialog-scrollable .modal-body{overflow-y:auto}.unfsij .modal-dialog-centered{display:flex;align-items:center;min-height:calc(100% - var(--bs-modal-margin) * 2)}.unfsij .modal-content{position:relative;display:flex;flex-direction:column;width:100%;color:var(--bs-modal-color);pointer-events:auto;background-color:var(--bs-modal-bg);background-clip:padding-box;border:var(--bs-modal-border-width) solid var(--bs-modal-border-color);border-radius:var(--bs-modal-border-radius);outline:0}.modal-backdrop{--bs-backdrop-zindex: 1050;--bs-backdrop-bg: #000;--bs-backdrop-opacity: .5;position:fixed;top:0;left:0;z-index:var(--bs-backdrop-zindex);width:100vw;height:100vh;background-color:var(--bs-backdrop-bg)}.modal-backdrop.fade{opacity:0}.modal-backdrop.show{opacity:var(--bs-backdrop-opacity)}.unfsij .modal-header{display:flex;flex-shrink:0;align-items:center;padding:var(--bs-modal-header-padding);border-bottom:var(--bs-modal-header-border-width) solid var(--bs-modal-header-border-color);border-top-left-radius:var(--bs-modal-inner-border-radius);border-top-right-radius:var(--bs-modal-inner-border-radius)}.unfsij .modal-header .btn-close{padding:calc(var(--bs-modal-header-padding-y) * .5) calc(var(--bs-modal-header-padding-x) * .5);margin:calc(-.5 * var(--bs-modal-header-padding-y)) calc(-.5 * var(--bs-modal-header-padding-x)) calc(-.5 * var(--bs-modal-header-padding-y)) auto}.unfsij .modal-title{margin-bottom:0;line-height:var(--bs-modal-title-line-height)}.unfsij .modal-body{position:relative;flex:1 1 auto;padding:var(--bs-modal-padding)}.unfsij .modal-footer{display:flex;flex-shrink:0;flex-wrap:wrap;align-items:center;justify-content:flex-end;padding:calc(var(--bs-modal-padding) - var(--bs-modal-footer-gap) * .5);background-color:var(--bs-modal-footer-bg);border-top:var(--bs-modal-footer-border-width) solid var(--bs-modal-footer-border-color);border-bottom-right-radius:var(--bs-modal-inner-border-radius);border-bottom-left-radius:var(--bs-modal-inner-border-radius)}.unfsij .modal-footer>*{margin:calc(var(--bs-modal-footer-gap) * .5)}@media (min-width: 576px){.unfsij .modal{--bs-modal-margin: 1.75rem;--bs-modal-box-shadow: var(--bs-box-shadow)}.unfsij .modal-dialog{max-width:var(--bs-modal-width);margin-right:auto;margin-left:auto}.unfsij .modal-sm{--bs-modal-width: 300px}}@media (min-width: 992px){.unfsij .modal-lg,.unfsij .modal-xl{--bs-modal-width: 800px}}@media (min-width: 1200px){.unfsij .modal-xl{--bs-modal-width: 1140px}}.unfsij .modal-fullscreen{width:100vw;max-width:none;height:100%;margin:0}.unfsij .modal-fullscreen .modal-content{height:100%;border:0;border-radius:0}.unfsij .modal-fullscreen .modal-header,.unfsij .modal-fullscreen .modal-footer{border-radius:0}.unfsij .modal-fullscreen .modal-body{overflow-y:auto}@media (max-width: 575.98px){.unfsij .modal-fullscreen-sm-down{width:100vw;max-width:none;height:100%;margin:0}.unfsij .modal-fullscreen-sm-down .modal-content{height:100%;border:0;border-radius:0}.unfsij .modal-fullscreen-sm-down .modal-header,.unfsij .modal-fullscreen-sm-down .modal-footer{border-radius:0}.unfsij .modal-fullscreen-sm-down .modal-body{overflow-y:auto}}@media (max-width: 767.98px){.unfsij .modal-fullscreen-md-down{width:100vw;max-width:none;height:100%;margin:0}.unfsij .modal-fullscreen-md-down .modal-content{height:100%;border:0;border-radius:0}.unfsij .modal-fullscreen-md-down .modal-header,.unfsij .modal-fullscreen-md-down .modal-footer{border-radius:0}.unfsij .modal-fullscreen-md-down .modal-body{overflow-y:auto}}@media (max-width: 991.98px){.unfsij .modal-fullscreen-lg-down{width:100vw;max-width:none;height:100%;margin:0}.unfsij .modal-fullscreen-lg-down .modal-content{height:100%;border:0;border-radius:0}.unfsij .modal-fullscreen-lg-down .modal-header,.unfsij .modal-fullscreen-lg-down .modal-footer{border-radius:0}.unfsij .modal-fullscreen-lg-down .modal-body{overflow-y:auto}}@media (max-width: 1199.98px){.unfsij .modal-fullscreen-xl-down{width:100vw;max-width:none;height:100%;margin:0}.unfsij .modal-fullscreen-xl-down .modal-content{height:100%;border:0;border-radius:0}.unfsij .modal-fullscreen-xl-down .modal-header,.unfsij .modal-fullscreen-xl-down .modal-footer{border-radius:0}.unfsij .modal-fullscreen-xl-down .modal-body{overflow-y:auto}}@media (max-width: 1399.98px){.unfsij .modal-fullscreen-xxl-down{width:100vw;max-width:none;height:100%;margin:0}.unfsij .modal-fullscreen-xxl-down .modal-content{height:100%;border:0;border-radius:0}.unfsij .modal-fullscreen-xxl-down .modal-header,.unfsij .modal-fullscreen-xxl-down .modal-footer{border-radius:0}.unfsij .modal-fullscreen-xxl-down .modal-body{overflow-y:auto}}.unfsij .clearfix:after{display:block;clear:both;content:""}.unfsij .text-bg-primary{color:#fff!important;background-color:RGBA(var(--bs-primary-rgb),var(--bs-bg-opacity, 1))!important}.unfsij .text-bg-secondary{color:#fff!important;background-color:RGBA(var(--bs-secondary-rgb),var(--bs-bg-opacity, 1))!important}.unfsij .text-bg-success{color:#fff!important;background-color:RGBA(var(--bs-success-rgb),var(--bs-bg-opacity, 1))!important}.unfsij .text-bg-info{color:#000!important;background-color:RGBA(var(--bs-info-rgb),var(--bs-bg-opacity, 1))!important}.unfsij .text-bg-warning{color:#000!important;background-color:RGBA(var(--bs-warning-rgb),var(--bs-bg-opacity, 1))!important}.unfsij .text-bg-danger{color:#fff!important;background-color:RGBA(var(--bs-danger-rgb),var(--bs-bg-opacity, 1))!important}.unfsij .text-bg-light{color:#000!important;background-color:RGBA(var(--bs-light-rgb),var(--bs-bg-opacity, 1))!important}.unfsij .text-bg-dark{color:#fff!important;background-color:RGBA(var(--bs-dark-rgb),var(--bs-bg-opacity, 1))!important}.unfsij .text-bg-sk-primary{color:#fff!important;background-color:RGBA(var(--bs-sk-primary-rgb),var(--bs-bg-opacity, 1))!important}.unfsij .text-bg-sk-secondary{color:#fff!important;background-color:RGBA(var(--bs-sk-secondary-rgb),var(--bs-bg-opacity, 1))!important}.unfsij .link-primary{color:RGBA(var(--bs-primary-rgb),var(--bs-link-opacity, 1))!important;text-decoration-color:RGBA(var(--bs-primary-rgb),var(--bs-link-underline-opacity, 1))!important}.unfsij .link-primary:hover,.unfsij .link-primary:focus{color:RGBA(10,88,202,var(--bs-link-opacity, 1))!important;text-decoration-color:RGBA(10,88,202,var(--bs-link-underline-opacity, 1))!important}.unfsij .link-secondary{color:RGBA(var(--bs-secondary-rgb),var(--bs-link-opacity, 1))!important;text-decoration-color:RGBA(var(--bs-secondary-rgb),var(--bs-link-underline-opacity, 1))!important}.unfsij .link-secondary:hover,.unfsij .link-secondary:focus{color:RGBA(86,94,100,var(--bs-link-opacity, 1))!important;text-decoration-color:RGBA(86,94,100,var(--bs-link-underline-opacity, 1))!important}.unfsij .link-success{color:RGBA(var(--bs-success-rgb),var(--bs-link-opacity, 1))!important;text-decoration-color:RGBA(var(--bs-success-rgb),var(--bs-link-underline-opacity, 1))!important}.unfsij .link-success:hover,.unfsij .link-success:focus{color:RGBA(20,108,67,var(--bs-link-opacity, 1))!important;text-decoration-color:RGBA(20,108,67,var(--bs-link-underline-opacity, 1))!important}.unfsij .link-info{color:RGBA(var(--bs-info-rgb),var(--bs-link-opacity, 1))!important;text-decoration-color:RGBA(var(--bs-info-rgb),var(--bs-link-underline-opacity, 1))!important}.unfsij .link-info:hover,.unfsij .link-info:focus{color:RGBA(61,213,243,var(--bs-link-opacity, 1))!important;text-decoration-color:RGBA(61,213,243,var(--bs-link-underline-opacity, 1))!important}.unfsij .link-warning{color:RGBA(var(--bs-warning-rgb),var(--bs-link-opacity, 1))!important;text-decoration-color:RGBA(var(--bs-warning-rgb),var(--bs-link-underline-opacity, 1))!important}.unfsij .link-warning:hover,.unfsij .link-warning:focus{color:RGBA(255,205,57,var(--bs-link-opacity, 1))!important;text-decoration-color:RGBA(255,205,57,var(--bs-link-underline-opacity, 1))!important}.unfsij .link-danger{color:RGBA(var(--bs-danger-rgb),var(--bs-link-opacity, 1))!important;text-decoration-color:RGBA(var(--bs-danger-rgb),var(--bs-link-underline-opacity, 1))!important}.unfsij .link-danger:hover,.unfsij .link-danger:focus{color:RGBA(176,42,55,var(--bs-link-opacity, 1))!important;text-decoration-color:RGBA(176,42,55,var(--bs-link-underline-opacity, 1))!important}.unfsij .link-light{color:RGBA(var(--bs-light-rgb),var(--bs-link-opacity, 1))!important;text-decoration-color:RGBA(var(--bs-light-rgb),var(--bs-link-underline-opacity, 1))!important}.unfsij .link-light:hover,.unfsij .link-light:focus{color:RGBA(249,250,251,var(--bs-link-opacity, 1))!important;text-decoration-color:RGBA(249,250,251,var(--bs-link-underline-opacity, 1))!important}.unfsij .link-dark{color:RGBA(var(--bs-dark-rgb),var(--bs-link-opacity, 1))!important;text-decoration-color:RGBA(var(--bs-dark-rgb),var(--bs-link-underline-opacity, 1))!important}.unfsij .link-dark:hover,.unfsij .link-dark:focus{color:RGBA(26,30,33,var(--bs-link-opacity, 1))!important;text-decoration-color:RGBA(26,30,33,var(--bs-link-underline-opacity, 1))!important}.unfsij .link-sk-primary{color:RGBA(var(--bs-sk-primary-rgb),var(--bs-link-opacity, 1))!important;text-decoration-color:RGBA(var(--bs-sk-primary-rgb),var(--bs-link-underline-opacity, 1))!important}.unfsij .link-sk-primary:hover,.unfsij .link-sk-primary:focus{color:RGBA(54,33,58,var(--bs-link-opacity, 1))!important;text-decoration-color:RGBA(54,33,58,var(--bs-link-underline-opacity, 1))!important}.unfsij .link-sk-secondary{color:RGBA(var(--bs-sk-secondary-rgb),var(--bs-link-opacity, 1))!important;text-decoration-color:RGBA(var(--bs-sk-secondary-rgb),var(--bs-link-underline-opacity, 1))!important}.unfsij .link-sk-secondary:hover,.unfsij .link-sk-secondary:focus{color:RGBA(78,47,85,var(--bs-link-opacity, 1))!important;text-decoration-color:RGBA(78,47,85,var(--bs-link-underline-opacity, 1))!important}.unfsij .link-body-emphasis{color:RGBA(var(--bs-emphasis-color-rgb),var(--bs-link-opacity, 1))!important;text-decoration-color:RGBA(var(--bs-emphasis-color-rgb),var(--bs-link-underline-opacity, 1))!important}.unfsij .link-body-emphasis:hover,.unfsij .link-body-emphasis:focus{color:RGBA(var(--bs-emphasis-color-rgb),var(--bs-link-opacity, .75))!important;text-decoration-color:RGBA(var(--bs-emphasis-color-rgb),var(--bs-link-underline-opacity, .75))!important}.unfsij .focus-ring:focus{outline:0;box-shadow:var(--bs-focus-ring-x, 0) var(--bs-focus-ring-y, 0) var(--bs-focus-ring-blur, 0) var(--bs-focus-ring-width) var(--bs-focus-ring-color)}.unfsij .icon-link{display:inline-flex;gap:.375rem;align-items:center;text-decoration-color:rgba(var(--bs-link-color-rgb),var(--bs-link-opacity, .5));text-underline-offset:.25em;backface-visibility:hidden}.unfsij .icon-link>.bi{flex-shrink:0;width:1em;height:1em;fill:currentcolor;transition:.2s ease-in-out transform}@media (prefers-reduced-motion: reduce){.unfsij .icon-link>.bi{transition:none}}.unfsij .icon-link-hover:hover>.bi,.unfsij .icon-link-hover:focus-visible>.bi{transform:var(--bs-icon-link-transform, translate3d(.25em, 0, 0))}.unfsij .ratio{position:relative;width:100%}.unfsij .ratio:before{display:block;padding-top:var(--bs-aspect-ratio);content:""}.unfsij .ratio>*{position:absolute;top:0;left:0;width:100%;height:100%}.unfsij .ratio-1x1{--bs-aspect-ratio: 100%}.unfsij .ratio-4x3{--bs-aspect-ratio: 75%}.unfsij .ratio-16x9{--bs-aspect-ratio: 56.25%}.unfsij .ratio-21x9{--bs-aspect-ratio: 42.8571428571%}.unfsij .fixed-top{position:fixed;top:0;right:0;left:0;z-index:1030}.unfsij .fixed-bottom{position:fixed;right:0;bottom:0;left:0;z-index:1030}.unfsij .sticky-top{position:sticky;top:0;z-index:1020}.unfsij .sticky-bottom{position:sticky;bottom:0;z-index:1020}@media (min-width: 576px){.unfsij .sticky-sm-top{position:sticky;top:0;z-index:1020}.unfsij .sticky-sm-bottom{position:sticky;bottom:0;z-index:1020}}@media (min-width: 768px){.unfsij .sticky-md-top{position:sticky;top:0;z-index:1020}.unfsij .sticky-md-bottom{position:sticky;bottom:0;z-index:1020}}@media (min-width: 992px){.unfsij .sticky-lg-top{position:sticky;top:0;z-index:1020}.unfsij .sticky-lg-bottom{position:sticky;bottom:0;z-index:1020}}@media (min-width: 1200px){.unfsij .sticky-xl-top{position:sticky;top:0;z-index:1020}.unfsij .sticky-xl-bottom{position:sticky;bottom:0;z-index:1020}}@media (min-width: 1400px){.unfsij .sticky-xxl-top{position:sticky;top:0;z-index:1020}.unfsij .sticky-xxl-bottom{position:sticky;bottom:0;z-index:1020}}.unfsij .hstack{display:flex;flex-direction:row;align-items:center;align-self:stretch}.unfsij .vstack{display:flex;flex:1 1 auto;flex-direction:column;align-self:stretch}.unfsij .visually-hidden,.unfsij .visually-hidden-focusable:not(:focus):not(:focus-within){width:1px!important;height:1px!important;padding:0!important;margin:-1px!important;overflow:hidden!important;clip:rect(0,0,0,0)!important;white-space:nowrap!important;border:0!important}.unfsij .visually-hidden:not(caption),.unfsij .visually-hidden-focusable:not(:focus):not(:focus-within):not(caption){position:absolute!important}.unfsij .stretched-link:after{position:absolute;top:0;right:0;bottom:0;left:0;z-index:1;content:""}.unfsij .text-truncate{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.unfsij .vr{display:inline-block;align-self:stretch;width:var(--bs-border-width);min-height:1em;background-color:currentcolor;opacity:.25}.unfsij .align-baseline{vertical-align:baseline!important}.unfsij .align-top{vertical-align:top!important}.unfsij .align-middle{vertical-align:middle!important}.unfsij .align-bottom{vertical-align:bottom!important}.unfsij .align-text-bottom{vertical-align:text-bottom!important}.unfsij .align-text-top{vertical-align:text-top!important}.unfsij .float-start{float:left!important}.unfsij .float-end{float:right!important}.unfsij .float-none{float:none!important}.unfsij .object-fit-contain{object-fit:contain!important}.unfsij .object-fit-cover{object-fit:cover!important}.unfsij .object-fit-fill{object-fit:fill!important}.unfsij .object-fit-scale{object-fit:scale-down!important}.unfsij .object-fit-none{object-fit:none!important}.unfsij .opacity-0{opacity:0!important}.unfsij .opacity-25{opacity:.25!important}.unfsij .opacity-50{opacity:.5!important}.unfsij .opacity-75{opacity:.75!important}.unfsij .opacity-100{opacity:1!important}.unfsij .overflow-auto{overflow:auto!important}.unfsij .overflow-hidden{overflow:hidden!important}.unfsij .overflow-visible{overflow:visible!important}.unfsij .overflow-scroll{overflow:scroll!important}.unfsij .overflow-x-auto{overflow-x:auto!important}.unfsij .overflow-x-hidden{overflow-x:hidden!important}.unfsij .overflow-x-visible{overflow-x:visible!important}.unfsij .overflow-x-scroll{overflow-x:scroll!important}.unfsij .overflow-y-auto{overflow-y:auto!important}.unfsij .overflow-y-hidden{overflow-y:hidden!important}.unfsij .overflow-y-visible{overflow-y:visible!important}.unfsij .overflow-y-scroll{overflow-y:scroll!important}.unfsij .d-inline{display:inline!important}.unfsij .d-inline-block{display:inline-block!important}.unfsij .d-block{display:block!important}.unfsij .d-grid{display:grid!important}.unfsij .d-inline-grid{display:inline-grid!important}.unfsij .d-table{display:table!important}.unfsij .d-table-row{display:table-row!important}.unfsij .d-table-cell{display:table-cell!important}.unfsij .d-flex{display:flex!important}.unfsij .d-inline-flex{display:inline-flex!important}.unfsij .d-none{display:none!important}.unfsij .shadow{box-shadow:var(--bs-box-shadow)!important}.unfsij .shadow-sm{box-shadow:var(--bs-box-shadow-sm)!important}.unfsij .shadow-lg{box-shadow:var(--bs-box-shadow-lg)!important}.unfsij .shadow-none{box-shadow:none!important}.unfsij .focus-ring-primary{--bs-focus-ring-color: rgba(var(--bs-primary-rgb), var(--bs-focus-ring-opacity))}.unfsij .focus-ring-secondary{--bs-focus-ring-color: rgba(var(--bs-secondary-rgb), var(--bs-focus-ring-opacity))}.unfsij .focus-ring-success{--bs-focus-ring-color: rgba(var(--bs-success-rgb), var(--bs-focus-ring-opacity))}.unfsij .focus-ring-info{--bs-focus-ring-color: rgba(var(--bs-info-rgb), var(--bs-focus-ring-opacity))}.unfsij .focus-ring-warning{--bs-focus-ring-color: rgba(var(--bs-warning-rgb), var(--bs-focus-ring-opacity))}.unfsij .focus-ring-danger{--bs-focus-ring-color: rgba(var(--bs-danger-rgb), var(--bs-focus-ring-opacity))}.unfsij .focus-ring-light{--bs-focus-ring-color: rgba(var(--bs-light-rgb), var(--bs-focus-ring-opacity))}.unfsij .focus-ring-dark{--bs-focus-ring-color: rgba(var(--bs-dark-rgb), var(--bs-focus-ring-opacity))}.unfsij .focus-ring-sk-primary{--bs-focus-ring-color: rgba(var(--bs-sk-primary-rgb), var(--bs-focus-ring-opacity))}.unfsij .focus-ring-sk-secondary{--bs-focus-ring-color: rgba(var(--bs-sk-secondary-rgb), var(--bs-focus-ring-opacity))}.unfsij .position-static{position:static!important}.unfsij .position-relative{position:relative!important}.unfsij .position-absolute{position:absolute!important}.unfsij .position-fixed{position:fixed!important}.unfsij .position-sticky{position:sticky!important}.unfsij .top-0{top:0!important}.unfsij .top-50{top:50%!important}.unfsij .top-100{top:100%!important}.unfsij .bottom-0{bottom:0!important}.unfsij .bottom-50{bottom:50%!important}.unfsij .bottom-100{bottom:100%!important}.unfsij .start-0{left:0!important}.unfsij .start-50{left:50%!important}.unfsij .start-100{left:100%!important}.unfsij .end-0{right:0!important}.unfsij .end-50{right:50%!important}.unfsij .end-100{right:100%!important}.unfsij .translate-middle{transform:translate(-50%,-50%)!important}.unfsij .translate-middle-x{transform:translate(-50%)!important}.unfsij .translate-middle-y{transform:translateY(-50%)!important}.unfsij .border{border:var(--bs-border-width) var(--bs-border-style) var(--bs-border-color)!important}.unfsij .border-0{border:0!important}.unfsij .border-top{border-top:var(--bs-border-width) var(--bs-border-style) var(--bs-border-color)!important}.unfsij .border-top-0{border-top:0!important}.unfsij .border-end{border-right:var(--bs-border-width) var(--bs-border-style) var(--bs-border-color)!important}.unfsij .border-end-0{border-right:0!important}.unfsij .border-bottom{border-bottom:var(--bs-border-width) var(--bs-border-style) var(--bs-border-color)!important}.unfsij .border-bottom-0{border-bottom:0!important}.unfsij .border-start{border-left:var(--bs-border-width) var(--bs-border-style) var(--bs-border-color)!important}.unfsij .border-start-0{border-left:0!important}.unfsij .border-primary{--bs-border-opacity: 1;border-color:rgba(var(--bs-primary-rgb),var(--bs-border-opacity))!important}.unfsij .border-secondary{--bs-border-opacity: 1;border-color:rgba(var(--bs-secondary-rgb),var(--bs-border-opacity))!important}.unfsij .border-success{--bs-border-opacity: 1;border-color:rgba(var(--bs-success-rgb),var(--bs-border-opacity))!important}.unfsij .border-info{--bs-border-opacity: 1;border-color:rgba(var(--bs-info-rgb),var(--bs-border-opacity))!important}.unfsij .border-warning{--bs-border-opacity: 1;border-color:rgba(var(--bs-warning-rgb),var(--bs-border-opacity))!important}.unfsij .border-danger{--bs-border-opacity: 1;border-color:rgba(var(--bs-danger-rgb),var(--bs-border-opacity))!important}.unfsij .border-light{--bs-border-opacity: 1;border-color:rgba(var(--bs-light-rgb),var(--bs-border-opacity))!important}.unfsij .border-dark{--bs-border-opacity: 1;border-color:rgba(var(--bs-dark-rgb),var(--bs-border-opacity))!important}.unfsij .border-sk-primary{--bs-border-opacity: 1;border-color:rgba(var(--bs-sk-primary-rgb),var(--bs-border-opacity))!important}.unfsij .border-sk-secondary{--bs-border-opacity: 1;border-color:rgba(var(--bs-sk-secondary-rgb),var(--bs-border-opacity))!important}.unfsij .border-black{--bs-border-opacity: 1;border-color:rgba(var(--bs-black-rgb),var(--bs-border-opacity))!important}.unfsij .border-white{--bs-border-opacity: 1;border-color:rgba(var(--bs-white-rgb),var(--bs-border-opacity))!important}.unfsij .border-primary-subtle{border-color:var(--bs-primary-border-subtle)!important}.unfsij .border-secondary-subtle{border-color:var(--bs-secondary-border-subtle)!important}.unfsij .border-success-subtle{border-color:var(--bs-success-border-subtle)!important}.unfsij .border-info-subtle{border-color:var(--bs-info-border-subtle)!important}.unfsij .border-warning-subtle{border-color:var(--bs-warning-border-subtle)!important}.unfsij .border-danger-subtle{border-color:var(--bs-danger-border-subtle)!important}.unfsij .border-light-subtle{border-color:var(--bs-light-border-subtle)!important}.unfsij .border-dark-subtle{border-color:var(--bs-dark-border-subtle)!important}.unfsij .border-1{border-width:1px!important}.unfsij .border-2{border-width:2px!important}.unfsij .border-3{border-width:3px!important}.unfsij .border-4{border-width:4px!important}.unfsij .border-5{border-width:5px!important}.unfsij .border-opacity-10{--bs-border-opacity: .1}.unfsij .border-opacity-25{--bs-border-opacity: .25}.unfsij .border-opacity-50{--bs-border-opacity: .5}.unfsij .border-opacity-75{--bs-border-opacity: .75}.unfsij .border-opacity-100{--bs-border-opacity: 1}.unfsij .w-25{width:25%!important}.unfsij .w-50{width:50%!important}.unfsij .w-75{width:75%!important}.unfsij .w-100{width:100%!important}.unfsij .w-auto{width:auto!important}.unfsij .mw-100{max-width:100%!important}.unfsij .vw-100{width:100vw!important}.unfsij .min-vw-100{min-width:100vw!important}.unfsij .h-25{height:25%!important}.unfsij .h-50{height:50%!important}.unfsij .h-75{height:75%!important}.unfsij .h-100{height:100%!important}.unfsij .h-auto{height:auto!important}.unfsij .mh-100{max-height:100%!important}.unfsij .vh-100{height:100vh!important}.unfsij .min-vh-100{min-height:100vh!important}.unfsij .flex-fill{flex:1 1 auto!important}.unfsij .flex-row{flex-direction:row!important}.unfsij .flex-column{flex-direction:column!important}.unfsij .flex-row-reverse{flex-direction:row-reverse!important}.unfsij .flex-column-reverse{flex-direction:column-reverse!important}.unfsij .flex-grow-0{flex-grow:0!important}.unfsij .flex-grow-1{flex-grow:1!important}.unfsij .flex-shrink-0{flex-shrink:0!important}.unfsij .flex-shrink-1{flex-shrink:1!important}.unfsij .flex-wrap{flex-wrap:wrap!important}.unfsij .flex-nowrap{flex-wrap:nowrap!important}.unfsij .flex-wrap-reverse{flex-wrap:wrap-reverse!important}.unfsij .justify-content-start{justify-content:flex-start!important}.unfsij .justify-content-end{justify-content:flex-end!important}.unfsij .justify-content-center{justify-content:center!important}.unfsij .justify-content-between{justify-content:space-between!important}.unfsij .justify-content-around{justify-content:space-around!important}.unfsij .justify-content-evenly{justify-content:space-evenly!important}.unfsij .align-items-start{align-items:flex-start!important}.unfsij .align-items-end{align-items:flex-end!important}.unfsij .align-items-center{align-items:center!important}.unfsij .align-items-baseline{align-items:baseline!important}.unfsij .align-items-stretch{align-items:stretch!important}.unfsij .align-content-start{align-content:flex-start!important}.unfsij .align-content-end{align-content:flex-end!important}.unfsij .align-content-center{align-content:center!important}.unfsij .align-content-between{align-content:space-between!important}.unfsij .align-content-around{align-content:space-around!important}.unfsij .align-content-stretch{align-content:stretch!important}.unfsij .align-self-auto{align-self:auto!important}.unfsij .align-self-start{align-self:flex-start!important}.unfsij .align-self-end{align-self:flex-end!important}.unfsij .align-self-center{align-self:center!important}.unfsij .align-self-baseline{align-self:baseline!important}.unfsij .align-self-stretch{align-self:stretch!important}.unfsij .order-first{order:-1!important}.unfsij .order-0{order:0!important}.unfsij .order-1{order:1!important}.unfsij .order-2{order:2!important}.unfsij .order-3{order:3!important}.unfsij .order-4{order:4!important}.unfsij .order-5{order:5!important}.unfsij .order-last{order:6!important}.unfsij .m-0{margin:0!important}.unfsij .m-1{margin:.25rem!important}.unfsij .m-2{margin:.5rem!important}.unfsij .m-3{margin:1rem!important}.unfsij .m-4{margin:1.5rem!important}.unfsij .m-5{margin:3rem!important}.unfsij .m-auto{margin:auto!important}.unfsij .mx-0{margin-right:0!important;margin-left:0!important}.unfsij .mx-1{margin-right:.25rem!important;margin-left:.25rem!important}.unfsij .mx-2{margin-right:.5rem!important;margin-left:.5rem!important}.unfsij .mx-3{margin-right:1rem!important;margin-left:1rem!important}.unfsij .mx-4{margin-right:1.5rem!important;margin-left:1.5rem!important}.unfsij .mx-5{margin-right:3rem!important;margin-left:3rem!important}.unfsij .mx-auto{margin-right:auto!important;margin-left:auto!important}.unfsij .my-0{margin-top:0!important;margin-bottom:0!important}.unfsij .my-1{margin-top:.25rem!important;margin-bottom:.25rem!important}.unfsij .my-2{margin-top:.5rem!important;margin-bottom:.5rem!important}.unfsij .my-3{margin-top:1rem!important;margin-bottom:1rem!important}.unfsij .my-4{margin-top:1.5rem!important;margin-bottom:1.5rem!important}.unfsij .my-5{margin-top:3rem!important;margin-bottom:3rem!important}.unfsij .my-auto{margin-top:auto!important;margin-bottom:auto!important}.unfsij .mt-0{margin-top:0!important}.unfsij .mt-1{margin-top:.25rem!important}.unfsij .mt-2{margin-top:.5rem!important}.unfsij .mt-3{margin-top:1rem!important}.unfsij .mt-4{margin-top:1.5rem!important}.unfsij .mt-5{margin-top:3rem!important}.unfsij .mt-auto{margin-top:auto!important}.unfsij .me-0{margin-right:0!important}.unfsij .me-1{margin-right:.25rem!important}.unfsij .me-2{margin-right:.5rem!important}.unfsij .me-3{margin-right:1rem!important}.unfsij .me-4{margin-right:1.5rem!important}.unfsij .me-5{margin-right:3rem!important}.unfsij .me-auto{margin-right:auto!important}.unfsij .mb-0{margin-bottom:0!important}.unfsij .mb-1{margin-bottom:.25rem!important}.unfsij .mb-2{margin-bottom:.5rem!important}.unfsij .mb-3{margin-bottom:1rem!important}.unfsij .mb-4{margin-bottom:1.5rem!important}.unfsij .mb-5{margin-bottom:3rem!important}.unfsij .mb-auto{margin-bottom:auto!important}.unfsij .ms-0{margin-left:0!important}.unfsij .ms-1{margin-left:.25rem!important}.unfsij .ms-2{margin-left:.5rem!important}.unfsij .ms-3{margin-left:1rem!important}.unfsij .ms-4{margin-left:1.5rem!important}.unfsij .ms-5{margin-left:3rem!important}.unfsij .ms-auto{margin-left:auto!important}.unfsij .p-0{padding:0!important}.unfsij .p-1{padding:.25rem!important}.unfsij .p-2{padding:.5rem!important}.unfsij .p-3{padding:1rem!important}.unfsij .p-4{padding:1.5rem!important}.unfsij .p-5{padding:3rem!important}.unfsij .px-0{padding-right:0!important;padding-left:0!important}.unfsij .px-1{padding-right:.25rem!important;padding-left:.25rem!important}.unfsij .px-2{padding-right:.5rem!important;padding-left:.5rem!important}.unfsij .px-3{padding-right:1rem!important;padding-left:1rem!important}.unfsij .px-4{padding-right:1.5rem!important;padding-left:1.5rem!important}.unfsij .px-5{padding-right:3rem!important;padding-left:3rem!important}.unfsij .py-0{padding-top:0!important;padding-bottom:0!important}.unfsij .py-1{padding-top:.25rem!important;padding-bottom:.25rem!important}.unfsij .py-2{padding-top:.5rem!important;padding-bottom:.5rem!important}.unfsij .py-3{padding-top:1rem!important;padding-bottom:1rem!important}.unfsij .py-4{padding-top:1.5rem!important;padding-bottom:1.5rem!important}.unfsij .py-5{padding-top:3rem!important;padding-bottom:3rem!important}.unfsij .pt-0{padding-top:0!important}.unfsij .pt-1{padding-top:.25rem!important}.unfsij .pt-2{padding-top:.5rem!important}.unfsij .pt-3{padding-top:1rem!important}.unfsij .pt-4{padding-top:1.5rem!important}.unfsij .pt-5{padding-top:3rem!important}.unfsij .pe-0{padding-right:0!important}.unfsij .pe-1{padding-right:.25rem!important}.unfsij .pe-2{padding-right:.5rem!important}.unfsij .pe-3{padding-right:1rem!important}.unfsij .pe-4{padding-right:1.5rem!important}.unfsij .pe-5{padding-right:3rem!important}.unfsij .pb-0{padding-bottom:0!important}.unfsij .pb-1{padding-bottom:.25rem!important}.unfsij .pb-2{padding-bottom:.5rem!important}.unfsij .pb-3{padding-bottom:1rem!important}.unfsij .pb-4{padding-bottom:1.5rem!important}.unfsij .pb-5{padding-bottom:3rem!important}.unfsij .ps-0{padding-left:0!important}.unfsij .ps-1{padding-left:.25rem!important}.unfsij .ps-2{padding-left:.5rem!important}.unfsij .ps-3{padding-left:1rem!important}.unfsij .ps-4{padding-left:1.5rem!important}.unfsij .ps-5{padding-left:3rem!important}.unfsij .gap-0{gap:0!important}.unfsij .gap-1{gap:.25rem!important}.unfsij .gap-2{gap:.5rem!important}.unfsij .gap-3{gap:1rem!important}.unfsij .gap-4{gap:1.5rem!important}.unfsij .gap-5{gap:3rem!important}.unfsij .row-gap-0{row-gap:0!important}.unfsij .row-gap-1{row-gap:.25rem!important}.unfsij .row-gap-2{row-gap:.5rem!important}.unfsij .row-gap-3{row-gap:1rem!important}.unfsij .row-gap-4{row-gap:1.5rem!important}.unfsij .row-gap-5{row-gap:3rem!important}.unfsij .column-gap-0{-moz-column-gap:0!important;column-gap:0!important}.unfsij .column-gap-1{-moz-column-gap:.25rem!important;column-gap:.25rem!important}.unfsij .column-gap-2{-moz-column-gap:.5rem!important;column-gap:.5rem!important}.unfsij .column-gap-3{-moz-column-gap:1rem!important;column-gap:1rem!important}.unfsij .column-gap-4{-moz-column-gap:1.5rem!important;column-gap:1.5rem!important}.unfsij .column-gap-5{-moz-column-gap:3rem!important;column-gap:3rem!important}.unfsij .font-monospace{font-family:var(--bs-font-monospace)!important}.unfsij .fs-1{font-size:calc(1.375rem + 1.5vw)!important}.unfsij .fs-2{font-size:calc(1.325rem + .9vw)!important}.unfsij .fs-3{font-size:calc(1.3rem + .6vw)!important}.unfsij .fs-4{font-size:calc(1.275rem + .3vw)!important}.unfsij .fs-5{font-size:1.25rem!important}.unfsij .fs-6{font-size:1rem!important}.unfsij .fst-italic{font-style:italic!important}.unfsij .fst-normal{font-style:normal!important}.unfsij .fw-lighter{font-weight:lighter!important}.unfsij .fw-light{font-weight:300!important}.unfsij .fw-normal{font-weight:400!important}.unfsij .fw-medium{font-weight:500!important}.unfsij .fw-semibold{font-weight:600!important}.unfsij .fw-bold{font-weight:700!important}.unfsij .fw-bolder{font-weight:bolder!important}.unfsij .lh-1{line-height:1!important}.unfsij .lh-sm{line-height:1.25!important}.unfsij .lh-base{line-height:1.5!important}.unfsij .lh-lg{line-height:2!important}.unfsij .text-start{text-align:left!important}.unfsij .text-end{text-align:right!important}.unfsij .text-center{text-align:center!important}.unfsij .text-decoration-none{text-decoration:none!important}.unfsij .text-decoration-underline{text-decoration:underline!important}.unfsij .text-decoration-line-through{text-decoration:line-through!important}.unfsij .text-lowercase{text-transform:lowercase!important}.unfsij .text-uppercase{text-transform:uppercase!important}.unfsij .text-capitalize{text-transform:capitalize!important}.unfsij .text-wrap{white-space:normal!important}.unfsij .text-nowrap{white-space:nowrap!important}.unfsij .text-break{word-wrap:break-word!important;word-break:break-word!important}.unfsij .text-primary{--bs-text-opacity: 1;color:rgba(var(--bs-primary-rgb),var(--bs-text-opacity))!important}.unfsij .text-secondary{--bs-text-opacity: 1;color:rgba(var(--bs-secondary-rgb),var(--bs-text-opacity))!important}.unfsij .text-success{--bs-text-opacity: 1;color:rgba(var(--bs-success-rgb),var(--bs-text-opacity))!important}.unfsij .text-info{--bs-text-opacity: 1;color:rgba(var(--bs-info-rgb),var(--bs-text-opacity))!important}.unfsij .text-warning{--bs-text-opacity: 1;color:rgba(var(--bs-warning-rgb),var(--bs-text-opacity))!important}.unfsij .text-danger{--bs-text-opacity: 1;color:rgba(var(--bs-danger-rgb),var(--bs-text-opacity))!important}.unfsij .text-light{--bs-text-opacity: 1;color:rgba(var(--bs-light-rgb),var(--bs-text-opacity))!important}.unfsij .text-dark{--bs-text-opacity: 1;color:rgba(var(--bs-dark-rgb),var(--bs-text-opacity))!important}.unfsij .text-sk-primary{--bs-text-opacity: 1;color:rgba(var(--bs-sk-primary-rgb),var(--bs-text-opacity))!important}.unfsij .text-sk-secondary{--bs-text-opacity: 1;color:rgba(var(--bs-sk-secondary-rgb),var(--bs-text-opacity))!important}.unfsij .text-black{--bs-text-opacity: 1;color:rgba(var(--bs-black-rgb),var(--bs-text-opacity))!important}.unfsij .text-white{--bs-text-opacity: 1;color:rgba(var(--bs-white-rgb),var(--bs-text-opacity))!important}.unfsij .text-body{--bs-text-opacity: 1;color:rgba(var(--bs-body-color-rgb),var(--bs-text-opacity))!important}.unfsij .text-muted{--bs-text-opacity: 1;color:var(--bs-secondary-color)!important}.unfsij .text-black-50{--bs-text-opacity: 1;color:#00000080!important}.unfsij .text-white-50{--bs-text-opacity: 1;color:#ffffff80!important}.unfsij .text-body-secondary{--bs-text-opacity: 1;color:var(--bs-secondary-color)!important}.unfsij .text-body-tertiary{--bs-text-opacity: 1;color:var(--bs-tertiary-color)!important}.unfsij .text-body-emphasis{--bs-text-opacity: 1;color:var(--bs-emphasis-color)!important}.unfsij .text-reset{--bs-text-opacity: 1;color:inherit!important}.unfsij .text-opacity-25{--bs-text-opacity: .25}.unfsij .text-opacity-50{--bs-text-opacity: .5}.unfsij .text-opacity-75{--bs-text-opacity: .75}.unfsij .text-opacity-100{--bs-text-opacity: 1}.unfsij .text-primary-emphasis{color:var(--bs-primary-text-emphasis)!important}.unfsij .text-secondary-emphasis{color:var(--bs-secondary-text-emphasis)!important}.unfsij .text-success-emphasis{color:var(--bs-success-text-emphasis)!important}.unfsij .text-info-emphasis{color:var(--bs-info-text-emphasis)!important}.unfsij .text-warning-emphasis{color:var(--bs-warning-text-emphasis)!important}.unfsij .text-danger-emphasis{color:var(--bs-danger-text-emphasis)!important}.unfsij .text-light-emphasis{color:var(--bs-light-text-emphasis)!important}.unfsij .text-dark-emphasis{color:var(--bs-dark-text-emphasis)!important}.unfsij .link-opacity-10,.unfsij .link-opacity-10-hover:hover{--bs-link-opacity: .1}.unfsij .link-opacity-25,.unfsij .link-opacity-25-hover:hover{--bs-link-opacity: .25}.unfsij .link-opacity-50,.unfsij .link-opacity-50-hover:hover{--bs-link-opacity: .5}.unfsij .link-opacity-75,.unfsij .link-opacity-75-hover:hover{--bs-link-opacity: .75}.unfsij .link-opacity-100,.unfsij .link-opacity-100-hover:hover{--bs-link-opacity: 1}.unfsij .link-offset-1,.unfsij .link-offset-1-hover:hover{text-underline-offset:.125em!important}.unfsij .link-offset-2,.unfsij .link-offset-2-hover:hover{text-underline-offset:.25em!important}.unfsij .link-offset-3,.unfsij .link-offset-3-hover:hover{text-underline-offset:.375em!important}.unfsij .link-underline-primary{--bs-link-underline-opacity: 1;text-decoration-color:rgba(var(--bs-primary-rgb),var(--bs-link-underline-opacity))!important}.unfsij .link-underline-secondary{--bs-link-underline-opacity: 1;text-decoration-color:rgba(var(--bs-secondary-rgb),var(--bs-link-underline-opacity))!important}.unfsij .link-underline-success{--bs-link-underline-opacity: 1;text-decoration-color:rgba(var(--bs-success-rgb),var(--bs-link-underline-opacity))!important}.unfsij .link-underline-info{--bs-link-underline-opacity: 1;text-decoration-color:rgba(var(--bs-info-rgb),var(--bs-link-underline-opacity))!important}.unfsij .link-underline-warning{--bs-link-underline-opacity: 1;text-decoration-color:rgba(var(--bs-warning-rgb),var(--bs-link-underline-opacity))!important}.unfsij .link-underline-danger{--bs-link-underline-opacity: 1;text-decoration-color:rgba(var(--bs-danger-rgb),var(--bs-link-underline-opacity))!important}.unfsij .link-underline-light{--bs-link-underline-opacity: 1;text-decoration-color:rgba(var(--bs-light-rgb),var(--bs-link-underline-opacity))!important}.unfsij .link-underline-dark{--bs-link-underline-opacity: 1;text-decoration-color:rgba(var(--bs-dark-rgb),var(--bs-link-underline-opacity))!important}.unfsij .link-underline-sk-primary{--bs-link-underline-opacity: 1;text-decoration-color:rgba(var(--bs-sk-primary-rgb),var(--bs-link-underline-opacity))!important}.unfsij .link-underline-sk-secondary{--bs-link-underline-opacity: 1;text-decoration-color:rgba(var(--bs-sk-secondary-rgb),var(--bs-link-underline-opacity))!important}.unfsij .link-underline{--bs-link-underline-opacity: 1;text-decoration-color:rgba(var(--bs-link-color-rgb),var(--bs-link-underline-opacity, 1))!important}.unfsij .link-underline-opacity-0,.unfsij .link-underline-opacity-0-hover:hover{--bs-link-underline-opacity: 0}.unfsij .link-underline-opacity-10,.unfsij .link-underline-opacity-10-hover:hover{--bs-link-underline-opacity: .1}.unfsij .link-underline-opacity-25,.unfsij .link-underline-opacity-25-hover:hover{--bs-link-underline-opacity: .25}.unfsij .link-underline-opacity-50,.unfsij .link-underline-opacity-50-hover:hover{--bs-link-underline-opacity: .5}.unfsij .link-underline-opacity-75,.unfsij .link-underline-opacity-75-hover:hover{--bs-link-underline-opacity: .75}.unfsij .link-underline-opacity-100,.unfsij .link-underline-opacity-100-hover:hover{--bs-link-underline-opacity: 1}.unfsij .bg-primary{--bs-bg-opacity: 1;background-color:rgba(var(--bs-primary-rgb),var(--bs-bg-opacity))!important}.unfsij .bg-secondary{--bs-bg-opacity: 1;background-color:rgba(var(--bs-secondary-rgb),var(--bs-bg-opacity))!important}.unfsij .bg-success{--bs-bg-opacity: 1;background-color:rgba(var(--bs-success-rgb),var(--bs-bg-opacity))!important}.unfsij .bg-info{--bs-bg-opacity: 1;background-color:rgba(var(--bs-info-rgb),var(--bs-bg-opacity))!important}.unfsij .bg-warning{--bs-bg-opacity: 1;background-color:rgba(var(--bs-warning-rgb),var(--bs-bg-opacity))!important}.unfsij .bg-danger{--bs-bg-opacity: 1;background-color:rgba(var(--bs-danger-rgb),var(--bs-bg-opacity))!important}.unfsij .bg-light{--bs-bg-opacity: 1;background-color:rgba(var(--bs-light-rgb),var(--bs-bg-opacity))!important}.unfsij .bg-dark{--bs-bg-opacity: 1;background-color:rgba(var(--bs-dark-rgb),var(--bs-bg-opacity))!important}.unfsij .bg-sk-primary{--bs-bg-opacity: 1;background-color:rgba(var(--bs-sk-primary-rgb),var(--bs-bg-opacity))!important}.unfsij .bg-sk-secondary{--bs-bg-opacity: 1;background-color:rgba(var(--bs-sk-secondary-rgb),var(--bs-bg-opacity))!important}.unfsij .bg-black{--bs-bg-opacity: 1;background-color:rgba(var(--bs-black-rgb),var(--bs-bg-opacity))!important}.unfsij .bg-white{--bs-bg-opacity: 1;background-color:rgba(var(--bs-white-rgb),var(--bs-bg-opacity))!important}.unfsij .bg-body{--bs-bg-opacity: 1;background-color:rgba(var(--bs-body-bg-rgb),var(--bs-bg-opacity))!important}.unfsij .bg-transparent{--bs-bg-opacity: 1;background-color:transparent!important}.unfsij .bg-body-secondary{--bs-bg-opacity: 1;background-color:rgba(var(--bs-secondary-bg-rgb),var(--bs-bg-opacity))!important}.unfsij .bg-body-tertiary{--bs-bg-opacity: 1;background-color:rgba(var(--bs-tertiary-bg-rgb),var(--bs-bg-opacity))!important}.unfsij .bg-opacity-10{--bs-bg-opacity: .1}.unfsij .bg-opacity-25{--bs-bg-opacity: .25}.unfsij .bg-opacity-50{--bs-bg-opacity: .5}.unfsij .bg-opacity-75{--bs-bg-opacity: .75}.unfsij .bg-opacity-100{--bs-bg-opacity: 1}.unfsij .bg-primary-subtle{background-color:var(--bs-primary-bg-subtle)!important}.unfsij .bg-secondary-subtle{background-color:var(--bs-secondary-bg-subtle)!important}.unfsij .bg-success-subtle{background-color:var(--bs-success-bg-subtle)!important}.unfsij .bg-info-subtle{background-color:var(--bs-info-bg-subtle)!important}.unfsij .bg-warning-subtle{background-color:var(--bs-warning-bg-subtle)!important}.unfsij .bg-danger-subtle{background-color:var(--bs-danger-bg-subtle)!important}.unfsij .bg-light-subtle{background-color:var(--bs-light-bg-subtle)!important}.unfsij .bg-dark-subtle{background-color:var(--bs-dark-bg-subtle)!important}.unfsij .bg-gradient{background-image:var(--bs-gradient)!important}.unfsij .user-select-all{-webkit-user-select:all!important;-moz-user-select:all!important;user-select:all!important}.unfsij .user-select-auto{-webkit-user-select:auto!important;-moz-user-select:auto!important;user-select:auto!important}.unfsij .user-select-none{-webkit-user-select:none!important;-moz-user-select:none!important;user-select:none!important}.unfsij .pe-none{pointer-events:none!important}.unfsij .pe-auto{pointer-events:auto!important}.unfsij .rounded{border-radius:var(--bs-border-radius)!important}.unfsij .rounded-0{border-radius:0!important}.unfsij .rounded-1{border-radius:var(--bs-border-radius-sm)!important}.unfsij .rounded-2{border-radius:var(--bs-border-radius)!important}.unfsij .rounded-3{border-radius:var(--bs-border-radius-lg)!important}.unfsij .rounded-4{border-radius:var(--bs-border-radius-xl)!important}.unfsij .rounded-5{border-radius:var(--bs-border-radius-xxl)!important}.unfsij .rounded-circle{border-radius:50%!important}.unfsij .rounded-pill{border-radius:var(--bs-border-radius-pill)!important}.unfsij .rounded-top{border-top-left-radius:var(--bs-border-radius)!important;border-top-right-radius:var(--bs-border-radius)!important}.unfsij .rounded-top-0{border-top-left-radius:0!important;border-top-right-radius:0!important}.unfsij .rounded-top-1{border-top-left-radius:var(--bs-border-radius-sm)!important;border-top-right-radius:var(--bs-border-radius-sm)!important}.unfsij .rounded-top-2{border-top-left-radius:var(--bs-border-radius)!important;border-top-right-radius:var(--bs-border-radius)!important}.unfsij .rounded-top-3{border-top-left-radius:var(--bs-border-radius-lg)!important;border-top-right-radius:var(--bs-border-radius-lg)!important}.unfsij .rounded-top-4{border-top-left-radius:var(--bs-border-radius-xl)!important;border-top-right-radius:var(--bs-border-radius-xl)!important}.unfsij .rounded-top-5{border-top-left-radius:var(--bs-border-radius-xxl)!important;border-top-right-radius:var(--bs-border-radius-xxl)!important}.unfsij .rounded-top-circle{border-top-left-radius:50%!important;border-top-right-radius:50%!important}.unfsij .rounded-top-pill{border-top-left-radius:var(--bs-border-radius-pill)!important;border-top-right-radius:var(--bs-border-radius-pill)!important}.unfsij .rounded-end{border-top-right-radius:var(--bs-border-radius)!important;border-bottom-right-radius:var(--bs-border-radius)!important}.unfsij .rounded-end-0{border-top-right-radius:0!important;border-bottom-right-radius:0!important}.unfsij .rounded-end-1{border-top-right-radius:var(--bs-border-radius-sm)!important;border-bottom-right-radius:var(--bs-border-radius-sm)!important}.unfsij .rounded-end-2{border-top-right-radius:var(--bs-border-radius)!important;border-bottom-right-radius:var(--bs-border-radius)!important}.unfsij .rounded-end-3{border-top-right-radius:var(--bs-border-radius-lg)!important;border-bottom-right-radius:var(--bs-border-radius-lg)!important}.unfsij .rounded-end-4{border-top-right-radius:var(--bs-border-radius-xl)!important;border-bottom-right-radius:var(--bs-border-radius-xl)!important}.unfsij .rounded-end-5{border-top-right-radius:var(--bs-border-radius-xxl)!important;border-bottom-right-radius:var(--bs-border-radius-xxl)!important}.unfsij .rounded-end-circle{border-top-right-radius:50%!important;border-bottom-right-radius:50%!important}.unfsij .rounded-end-pill{border-top-right-radius:var(--bs-border-radius-pill)!important;border-bottom-right-radius:var(--bs-border-radius-pill)!important}.unfsij .rounded-bottom{border-bottom-right-radius:var(--bs-border-radius)!important;border-bottom-left-radius:var(--bs-border-radius)!important}.unfsij .rounded-bottom-0{border-bottom-right-radius:0!important;border-bottom-left-radius:0!important}.unfsij .rounded-bottom-1{border-bottom-right-radius:var(--bs-border-radius-sm)!important;border-bottom-left-radius:var(--bs-border-radius-sm)!important}.unfsij .rounded-bottom-2{border-bottom-right-radius:var(--bs-border-radius)!important;border-bottom-left-radius:var(--bs-border-radius)!important}.unfsij .rounded-bottom-3{border-bottom-right-radius:var(--bs-border-radius-lg)!important;border-bottom-left-radius:var(--bs-border-radius-lg)!important}.unfsij .rounded-bottom-4{border-bottom-right-radius:var(--bs-border-radius-xl)!important;border-bottom-left-radius:var(--bs-border-radius-xl)!important}.unfsij .rounded-bottom-5{border-bottom-right-radius:var(--bs-border-radius-xxl)!important;border-bottom-left-radius:var(--bs-border-radius-xxl)!important}.unfsij .rounded-bottom-circle{border-bottom-right-radius:50%!important;border-bottom-left-radius:50%!important}.unfsij .rounded-bottom-pill{border-bottom-right-radius:var(--bs-border-radius-pill)!important;border-bottom-left-radius:var(--bs-border-radius-pill)!important}.unfsij .rounded-start{border-bottom-left-radius:var(--bs-border-radius)!important;border-top-left-radius:var(--bs-border-radius)!important}.unfsij .rounded-start-0{border-bottom-left-radius:0!important;border-top-left-radius:0!important}.unfsij .rounded-start-1{border-bottom-left-radius:var(--bs-border-radius-sm)!important;border-top-left-radius:var(--bs-border-radius-sm)!important}.unfsij .rounded-start-2{border-bottom-left-radius:var(--bs-border-radius)!important;border-top-left-radius:var(--bs-border-radius)!important}.unfsij .rounded-start-3{border-bottom-left-radius:var(--bs-border-radius-lg)!important;border-top-left-radius:var(--bs-border-radius-lg)!important}.unfsij .rounded-start-4{border-bottom-left-radius:var(--bs-border-radius-xl)!important;border-top-left-radius:var(--bs-border-radius-xl)!important}.unfsij .rounded-start-5{border-bottom-left-radius:var(--bs-border-radius-xxl)!important;border-top-left-radius:var(--bs-border-radius-xxl)!important}.unfsij .rounded-start-circle{border-bottom-left-radius:50%!important;border-top-left-radius:50%!important}.unfsij .rounded-start-pill{border-bottom-left-radius:var(--bs-border-radius-pill)!important;border-top-left-radius:var(--bs-border-radius-pill)!important}.unfsij .visible{visibility:visible!important}.unfsij .invisible{visibility:hidden!important}.unfsij .z-n1{z-index:-1!important}.unfsij .z-0{z-index:0!important}.unfsij .z-1{z-index:1!important}.unfsij .z-2{z-index:2!important}.unfsij .z-3{z-index:3!important}@media (min-width: 576px){.unfsij .float-sm-start{float:left!important}.unfsij .float-sm-end{float:right!important}.unfsij .float-sm-none{float:none!important}.unfsij .object-fit-sm-contain{object-fit:contain!important}.unfsij .object-fit-sm-cover{object-fit:cover!important}.unfsij .object-fit-sm-fill{object-fit:fill!important}.unfsij .object-fit-sm-scale{object-fit:scale-down!important}.unfsij .object-fit-sm-none{object-fit:none!important}.unfsij .d-sm-inline{display:inline!important}.unfsij .d-sm-inline-block{display:inline-block!important}.unfsij .d-sm-block{display:block!important}.unfsij .d-sm-grid{display:grid!important}.unfsij .d-sm-inline-grid{display:inline-grid!important}.unfsij .d-sm-table{display:table!important}.unfsij .d-sm-table-row{display:table-row!important}.unfsij .d-sm-table-cell{display:table-cell!important}.unfsij .d-sm-flex{display:flex!important}.unfsij .d-sm-inline-flex{display:inline-flex!important}.unfsij .d-sm-none{display:none!important}.unfsij .flex-sm-fill{flex:1 1 auto!important}.unfsij .flex-sm-row{flex-direction:row!important}.unfsij .flex-sm-column{flex-direction:column!important}.unfsij .flex-sm-row-reverse{flex-direction:row-reverse!important}.unfsij .flex-sm-column-reverse{flex-direction:column-reverse!important}.unfsij .flex-sm-grow-0{flex-grow:0!important}.unfsij .flex-sm-grow-1{flex-grow:1!important}.unfsij .flex-sm-shrink-0{flex-shrink:0!important}.unfsij .flex-sm-shrink-1{flex-shrink:1!important}.unfsij .flex-sm-wrap{flex-wrap:wrap!important}.unfsij .flex-sm-nowrap{flex-wrap:nowrap!important}.unfsij .flex-sm-wrap-reverse{flex-wrap:wrap-reverse!important}.unfsij .justify-content-sm-start{justify-content:flex-start!important}.unfsij .justify-content-sm-end{justify-content:flex-end!important}.unfsij .justify-content-sm-center{justify-content:center!important}.unfsij .justify-content-sm-between{justify-content:space-between!important}.unfsij .justify-content-sm-around{justify-content:space-around!important}.unfsij .justify-content-sm-evenly{justify-content:space-evenly!important}.unfsij .align-items-sm-start{align-items:flex-start!important}.unfsij .align-items-sm-end{align-items:flex-end!important}.unfsij .align-items-sm-center{align-items:center!important}.unfsij .align-items-sm-baseline{align-items:baseline!important}.unfsij .align-items-sm-stretch{align-items:stretch!important}.unfsij .align-content-sm-start{align-content:flex-start!important}.unfsij .align-content-sm-end{align-content:flex-end!important}.unfsij .align-content-sm-center{align-content:center!important}.unfsij .align-content-sm-between{align-content:space-between!important}.unfsij .align-content-sm-around{align-content:space-around!important}.unfsij .align-content-sm-stretch{align-content:stretch!important}.unfsij .align-self-sm-auto{align-self:auto!important}.unfsij .align-self-sm-start{align-self:flex-start!important}.unfsij .align-self-sm-end{align-self:flex-end!important}.unfsij .align-self-sm-center{align-self:center!important}.unfsij .align-self-sm-baseline{align-self:baseline!important}.unfsij .align-self-sm-stretch{align-self:stretch!important}.unfsij .order-sm-first{order:-1!important}.unfsij .order-sm-0{order:0!important}.unfsij .order-sm-1{order:1!important}.unfsij .order-sm-2{order:2!important}.unfsij .order-sm-3{order:3!important}.unfsij .order-sm-4{order:4!important}.unfsij .order-sm-5{order:5!important}.unfsij .order-sm-last{order:6!important}.unfsij .m-sm-0{margin:0!important}.unfsij .m-sm-1{margin:.25rem!important}.unfsij .m-sm-2{margin:.5rem!important}.unfsij .m-sm-3{margin:1rem!important}.unfsij .m-sm-4{margin:1.5rem!important}.unfsij .m-sm-5{margin:3rem!important}.unfsij .m-sm-auto{margin:auto!important}.unfsij .mx-sm-0{margin-right:0!important;margin-left:0!important}.unfsij .mx-sm-1{margin-right:.25rem!important;margin-left:.25rem!important}.unfsij .mx-sm-2{margin-right:.5rem!important;margin-left:.5rem!important}.unfsij .mx-sm-3{margin-right:1rem!important;margin-left:1rem!important}.unfsij .mx-sm-4{margin-right:1.5rem!important;margin-left:1.5rem!important}.unfsij .mx-sm-5{margin-right:3rem!important;margin-left:3rem!important}.unfsij .mx-sm-auto{margin-right:auto!important;margin-left:auto!important}.unfsij .my-sm-0{margin-top:0!important;margin-bottom:0!important}.unfsij .my-sm-1{margin-top:.25rem!important;margin-bottom:.25rem!important}.unfsij .my-sm-2{margin-top:.5rem!important;margin-bottom:.5rem!important}.unfsij .my-sm-3{margin-top:1rem!important;margin-bottom:1rem!important}.unfsij .my-sm-4{margin-top:1.5rem!important;margin-bottom:1.5rem!important}.unfsij .my-sm-5{margin-top:3rem!important;margin-bottom:3rem!important}.unfsij .my-sm-auto{margin-top:auto!important;margin-bottom:auto!important}.unfsij .mt-sm-0{margin-top:0!important}.unfsij .mt-sm-1{margin-top:.25rem!important}.unfsij .mt-sm-2{margin-top:.5rem!important}.unfsij .mt-sm-3{margin-top:1rem!important}.unfsij .mt-sm-4{margin-top:1.5rem!important}.unfsij .mt-sm-5{margin-top:3rem!important}.unfsij .mt-sm-auto{margin-top:auto!important}.unfsij .me-sm-0{margin-right:0!important}.unfsij .me-sm-1{margin-right:.25rem!important}.unfsij .me-sm-2{margin-right:.5rem!important}.unfsij .me-sm-3{margin-right:1rem!important}.unfsij .me-sm-4{margin-right:1.5rem!important}.unfsij .me-sm-5{margin-right:3rem!important}.unfsij .me-sm-auto{margin-right:auto!important}.unfsij .mb-sm-0{margin-bottom:0!important}.unfsij .mb-sm-1{margin-bottom:.25rem!important}.unfsij .mb-sm-2{margin-bottom:.5rem!important}.unfsij .mb-sm-3{margin-bottom:1rem!important}.unfsij .mb-sm-4{margin-bottom:1.5rem!important}.unfsij .mb-sm-5{margin-bottom:3rem!important}.unfsij .mb-sm-auto{margin-bottom:auto!important}.unfsij .ms-sm-0{margin-left:0!important}.unfsij .ms-sm-1{margin-left:.25rem!important}.unfsij .ms-sm-2{margin-left:.5rem!important}.unfsij .ms-sm-3{margin-left:1rem!important}.unfsij .ms-sm-4{margin-left:1.5rem!important}.unfsij .ms-sm-5{margin-left:3rem!important}.unfsij .ms-sm-auto{margin-left:auto!important}.unfsij .p-sm-0{padding:0!important}.unfsij .p-sm-1{padding:.25rem!important}.unfsij .p-sm-2{padding:.5rem!important}.unfsij .p-sm-3{padding:1rem!important}.unfsij .p-sm-4{padding:1.5rem!important}.unfsij .p-sm-5{padding:3rem!important}.unfsij .px-sm-0{padding-right:0!important;padding-left:0!important}.unfsij .px-sm-1{padding-right:.25rem!important;padding-left:.25rem!important}.unfsij .px-sm-2{padding-right:.5rem!important;padding-left:.5rem!important}.unfsij .px-sm-3{padding-right:1rem!important;padding-left:1rem!important}.unfsij .px-sm-4{padding-right:1.5rem!important;padding-left:1.5rem!important}.unfsij .px-sm-5{padding-right:3rem!important;padding-left:3rem!important}.unfsij .py-sm-0{padding-top:0!important;padding-bottom:0!important}.unfsij .py-sm-1{padding-top:.25rem!important;padding-bottom:.25rem!important}.unfsij .py-sm-2{padding-top:.5rem!important;padding-bottom:.5rem!important}.unfsij .py-sm-3{padding-top:1rem!important;padding-bottom:1rem!important}.unfsij .py-sm-4{padding-top:1.5rem!important;padding-bottom:1.5rem!important}.unfsij .py-sm-5{padding-top:3rem!important;padding-bottom:3rem!important}.unfsij .pt-sm-0{padding-top:0!important}.unfsij .pt-sm-1{padding-top:.25rem!important}.unfsij .pt-sm-2{padding-top:.5rem!important}.unfsij .pt-sm-3{padding-top:1rem!important}.unfsij .pt-sm-4{padding-top:1.5rem!important}.unfsij .pt-sm-5{padding-top:3rem!important}.unfsij .pe-sm-0{padding-right:0!important}.unfsij .pe-sm-1{padding-right:.25rem!important}.unfsij .pe-sm-2{padding-right:.5rem!important}.unfsij .pe-sm-3{padding-right:1rem!important}.unfsij .pe-sm-4{padding-right:1.5rem!important}.unfsij .pe-sm-5{padding-right:3rem!important}.unfsij .pb-sm-0{padding-bottom:0!important}.unfsij .pb-sm-1{padding-bottom:.25rem!important}.unfsij .pb-sm-2{padding-bottom:.5rem!important}.unfsij .pb-sm-3{padding-bottom:1rem!important}.unfsij .pb-sm-4{padding-bottom:1.5rem!important}.unfsij .pb-sm-5{padding-bottom:3rem!important}.unfsij .ps-sm-0{padding-left:0!important}.unfsij .ps-sm-1{padding-left:.25rem!important}.unfsij .ps-sm-2{padding-left:.5rem!important}.unfsij .ps-sm-3{padding-left:1rem!important}.unfsij .ps-sm-4{padding-left:1.5rem!important}.unfsij .ps-sm-5{padding-left:3rem!important}.unfsij .gap-sm-0{gap:0!important}.unfsij .gap-sm-1{gap:.25rem!important}.unfsij .gap-sm-2{gap:.5rem!important}.unfsij .gap-sm-3{gap:1rem!important}.unfsij .gap-sm-4{gap:1.5rem!important}.unfsij .gap-sm-5{gap:3rem!important}.unfsij .row-gap-sm-0{row-gap:0!important}.unfsij .row-gap-sm-1{row-gap:.25rem!important}.unfsij .row-gap-sm-2{row-gap:.5rem!important}.unfsij .row-gap-sm-3{row-gap:1rem!important}.unfsij .row-gap-sm-4{row-gap:1.5rem!important}.unfsij .row-gap-sm-5{row-gap:3rem!important}.unfsij .column-gap-sm-0{-moz-column-gap:0!important;column-gap:0!important}.unfsij .column-gap-sm-1{-moz-column-gap:.25rem!important;column-gap:.25rem!important}.unfsij .column-gap-sm-2{-moz-column-gap:.5rem!important;column-gap:.5rem!important}.unfsij .column-gap-sm-3{-moz-column-gap:1rem!important;column-gap:1rem!important}.unfsij .column-gap-sm-4{-moz-column-gap:1.5rem!important;column-gap:1.5rem!important}.unfsij .column-gap-sm-5{-moz-column-gap:3rem!important;column-gap:3rem!important}.unfsij .text-sm-start{text-align:left!important}.unfsij .text-sm-end{text-align:right!important}.unfsij .text-sm-center{text-align:center!important}}@media (min-width: 768px){.unfsij .float-md-start{float:left!important}.unfsij .float-md-end{float:right!important}.unfsij .float-md-none{float:none!important}.unfsij .object-fit-md-contain{object-fit:contain!important}.unfsij .object-fit-md-cover{object-fit:cover!important}.unfsij .object-fit-md-fill{object-fit:fill!important}.unfsij .object-fit-md-scale{object-fit:scale-down!important}.unfsij .object-fit-md-none{object-fit:none!important}.unfsij .d-md-inline{display:inline!important}.unfsij .d-md-inline-block{display:inline-block!important}.unfsij .d-md-block{display:block!important}.unfsij .d-md-grid{display:grid!important}.unfsij .d-md-inline-grid{display:inline-grid!important}.unfsij .d-md-table{display:table!important}.unfsij .d-md-table-row{display:table-row!important}.unfsij .d-md-table-cell{display:table-cell!important}.unfsij .d-md-flex{display:flex!important}.unfsij .d-md-inline-flex{display:inline-flex!important}.unfsij .d-md-none{display:none!important}.unfsij .flex-md-fill{flex:1 1 auto!important}.unfsij .flex-md-row{flex-direction:row!important}.unfsij .flex-md-column{flex-direction:column!important}.unfsij .flex-md-row-reverse{flex-direction:row-reverse!important}.unfsij .flex-md-column-reverse{flex-direction:column-reverse!important}.unfsij .flex-md-grow-0{flex-grow:0!important}.unfsij .flex-md-grow-1{flex-grow:1!important}.unfsij .flex-md-shrink-0{flex-shrink:0!important}.unfsij .flex-md-shrink-1{flex-shrink:1!important}.unfsij .flex-md-wrap{flex-wrap:wrap!important}.unfsij .flex-md-nowrap{flex-wrap:nowrap!important}.unfsij .flex-md-wrap-reverse{flex-wrap:wrap-reverse!important}.unfsij .justify-content-md-start{justify-content:flex-start!important}.unfsij .justify-content-md-end{justify-content:flex-end!important}.unfsij .justify-content-md-center{justify-content:center!important}.unfsij .justify-content-md-between{justify-content:space-between!important}.unfsij .justify-content-md-around{justify-content:space-around!important}.unfsij .justify-content-md-evenly{justify-content:space-evenly!important}.unfsij .align-items-md-start{align-items:flex-start!important}.unfsij .align-items-md-end{align-items:flex-end!important}.unfsij .align-items-md-center{align-items:center!important}.unfsij .align-items-md-baseline{align-items:baseline!important}.unfsij .align-items-md-stretch{align-items:stretch!important}.unfsij .align-content-md-start{align-content:flex-start!important}.unfsij .align-content-md-end{align-content:flex-end!important}.unfsij .align-content-md-center{align-content:center!important}.unfsij .align-content-md-between{align-content:space-between!important}.unfsij .align-content-md-around{align-content:space-around!important}.unfsij .align-content-md-stretch{align-content:stretch!important}.unfsij .align-self-md-auto{align-self:auto!important}.unfsij .align-self-md-start{align-self:flex-start!important}.unfsij .align-self-md-end{align-self:flex-end!important}.unfsij .align-self-md-center{align-self:center!important}.unfsij .align-self-md-baseline{align-self:baseline!important}.unfsij .align-self-md-stretch{align-self:stretch!important}.unfsij .order-md-first{order:-1!important}.unfsij .order-md-0{order:0!important}.unfsij .order-md-1{order:1!important}.unfsij .order-md-2{order:2!important}.unfsij .order-md-3{order:3!important}.unfsij .order-md-4{order:4!important}.unfsij .order-md-5{order:5!important}.unfsij .order-md-last{order:6!important}.unfsij .m-md-0{margin:0!important}.unfsij .m-md-1{margin:.25rem!important}.unfsij .m-md-2{margin:.5rem!important}.unfsij .m-md-3{margin:1rem!important}.unfsij .m-md-4{margin:1.5rem!important}.unfsij .m-md-5{margin:3rem!important}.unfsij .m-md-auto{margin:auto!important}.unfsij .mx-md-0{margin-right:0!important;margin-left:0!important}.unfsij .mx-md-1{margin-right:.25rem!important;margin-left:.25rem!important}.unfsij .mx-md-2{margin-right:.5rem!important;margin-left:.5rem!important}.unfsij .mx-md-3{margin-right:1rem!important;margin-left:1rem!important}.unfsij .mx-md-4{margin-right:1.5rem!important;margin-left:1.5rem!important}.unfsij .mx-md-5{margin-right:3rem!important;margin-left:3rem!important}.unfsij .mx-md-auto{margin-right:auto!important;margin-left:auto!important}.unfsij .my-md-0{margin-top:0!important;margin-bottom:0!important}.unfsij .my-md-1{margin-top:.25rem!important;margin-bottom:.25rem!important}.unfsij .my-md-2{margin-top:.5rem!important;margin-bottom:.5rem!important}.unfsij .my-md-3{margin-top:1rem!important;margin-bottom:1rem!important}.unfsij .my-md-4{margin-top:1.5rem!important;margin-bottom:1.5rem!important}.unfsij .my-md-5{margin-top:3rem!important;margin-bottom:3rem!important}.unfsij .my-md-auto{margin-top:auto!important;margin-bottom:auto!important}.unfsij .mt-md-0{margin-top:0!important}.unfsij .mt-md-1{margin-top:.25rem!important}.unfsij .mt-md-2{margin-top:.5rem!important}.unfsij .mt-md-3{margin-top:1rem!important}.unfsij .mt-md-4{margin-top:1.5rem!important}.unfsij .mt-md-5{margin-top:3rem!important}.unfsij .mt-md-auto{margin-top:auto!important}.unfsij .me-md-0{margin-right:0!important}.unfsij .me-md-1{margin-right:.25rem!important}.unfsij .me-md-2{margin-right:.5rem!important}.unfsij .me-md-3{margin-right:1rem!important}.unfsij .me-md-4{margin-right:1.5rem!important}.unfsij .me-md-5{margin-right:3rem!important}.unfsij .me-md-auto{margin-right:auto!important}.unfsij .mb-md-0{margin-bottom:0!important}.unfsij .mb-md-1{margin-bottom:.25rem!important}.unfsij .mb-md-2{margin-bottom:.5rem!important}.unfsij .mb-md-3{margin-bottom:1rem!important}.unfsij .mb-md-4{margin-bottom:1.5rem!important}.unfsij .mb-md-5{margin-bottom:3rem!important}.unfsij .mb-md-auto{margin-bottom:auto!important}.unfsij .ms-md-0{margin-left:0!important}.unfsij .ms-md-1{margin-left:.25rem!important}.unfsij .ms-md-2{margin-left:.5rem!important}.unfsij .ms-md-3{margin-left:1rem!important}.unfsij .ms-md-4{margin-left:1.5rem!important}.unfsij .ms-md-5{margin-left:3rem!important}.unfsij .ms-md-auto{margin-left:auto!important}.unfsij .p-md-0{padding:0!important}.unfsij .p-md-1{padding:.25rem!important}.unfsij .p-md-2{padding:.5rem!important}.unfsij .p-md-3{padding:1rem!important}.unfsij .p-md-4{padding:1.5rem!important}.unfsij .p-md-5{padding:3rem!important}.unfsij .px-md-0{padding-right:0!important;padding-left:0!important}.unfsij .px-md-1{padding-right:.25rem!important;padding-left:.25rem!important}.unfsij .px-md-2{padding-right:.5rem!important;padding-left:.5rem!important}.unfsij .px-md-3{padding-right:1rem!important;padding-left:1rem!important}.unfsij .px-md-4{padding-right:1.5rem!important;padding-left:1.5rem!important}.unfsij .px-md-5{padding-right:3rem!important;padding-left:3rem!important}.unfsij .py-md-0{padding-top:0!important;padding-bottom:0!important}.unfsij .py-md-1{padding-top:.25rem!important;padding-bottom:.25rem!important}.unfsij .py-md-2{padding-top:.5rem!important;padding-bottom:.5rem!important}.unfsij .py-md-3{padding-top:1rem!important;padding-bottom:1rem!important}.unfsij .py-md-4{padding-top:1.5rem!important;padding-bottom:1.5rem!important}.unfsij .py-md-5{padding-top:3rem!important;padding-bottom:3rem!important}.unfsij .pt-md-0{padding-top:0!important}.unfsij .pt-md-1{padding-top:.25rem!important}.unfsij .pt-md-2{padding-top:.5rem!important}.unfsij .pt-md-3{padding-top:1rem!important}.unfsij .pt-md-4{padding-top:1.5rem!important}.unfsij .pt-md-5{padding-top:3rem!important}.unfsij .pe-md-0{padding-right:0!important}.unfsij .pe-md-1{padding-right:.25rem!important}.unfsij .pe-md-2{padding-right:.5rem!important}.unfsij .pe-md-3{padding-right:1rem!important}.unfsij .pe-md-4{padding-right:1.5rem!important}.unfsij .pe-md-5{padding-right:3rem!important}.unfsij .pb-md-0{padding-bottom:0!important}.unfsij .pb-md-1{padding-bottom:.25rem!important}.unfsij .pb-md-2{padding-bottom:.5rem!important}.unfsij .pb-md-3{padding-bottom:1rem!important}.unfsij .pb-md-4{padding-bottom:1.5rem!important}.unfsij .pb-md-5{padding-bottom:3rem!important}.unfsij .ps-md-0{padding-left:0!important}.unfsij .ps-md-1{padding-left:.25rem!important}.unfsij .ps-md-2{padding-left:.5rem!important}.unfsij .ps-md-3{padding-left:1rem!important}.unfsij .ps-md-4{padding-left:1.5rem!important}.unfsij .ps-md-5{padding-left:3rem!important}.unfsij .gap-md-0{gap:0!important}.unfsij .gap-md-1{gap:.25rem!important}.unfsij .gap-md-2{gap:.5rem!important}.unfsij .gap-md-3{gap:1rem!important}.unfsij .gap-md-4{gap:1.5rem!important}.unfsij .gap-md-5{gap:3rem!important}.unfsij .row-gap-md-0{row-gap:0!important}.unfsij .row-gap-md-1{row-gap:.25rem!important}.unfsij .row-gap-md-2{row-gap:.5rem!important}.unfsij .row-gap-md-3{row-gap:1rem!important}.unfsij .row-gap-md-4{row-gap:1.5rem!important}.unfsij .row-gap-md-5{row-gap:3rem!important}.unfsij .column-gap-md-0{-moz-column-gap:0!important;column-gap:0!important}.unfsij .column-gap-md-1{-moz-column-gap:.25rem!important;column-gap:.25rem!important}.unfsij .column-gap-md-2{-moz-column-gap:.5rem!important;column-gap:.5rem!important}.unfsij .column-gap-md-3{-moz-column-gap:1rem!important;column-gap:1rem!important}.unfsij .column-gap-md-4{-moz-column-gap:1.5rem!important;column-gap:1.5rem!important}.unfsij .column-gap-md-5{-moz-column-gap:3rem!important;column-gap:3rem!important}.unfsij .text-md-start{text-align:left!important}.unfsij .text-md-end{text-align:right!important}.unfsij .text-md-center{text-align:center!important}}@media (min-width: 992px){.unfsij .float-lg-start{float:left!important}.unfsij .float-lg-end{float:right!important}.unfsij .float-lg-none{float:none!important}.unfsij .object-fit-lg-contain{object-fit:contain!important}.unfsij .object-fit-lg-cover{object-fit:cover!important}.unfsij .object-fit-lg-fill{object-fit:fill!important}.unfsij .object-fit-lg-scale{object-fit:scale-down!important}.unfsij .object-fit-lg-none{object-fit:none!important}.unfsij .d-lg-inline{display:inline!important}.unfsij .d-lg-inline-block{display:inline-block!important}.unfsij .d-lg-block{display:block!important}.unfsij .d-lg-grid{display:grid!important}.unfsij .d-lg-inline-grid{display:inline-grid!important}.unfsij .d-lg-table{display:table!important}.unfsij .d-lg-table-row{display:table-row!important}.unfsij .d-lg-table-cell{display:table-cell!important}.unfsij .d-lg-flex{display:flex!important}.unfsij .d-lg-inline-flex{display:inline-flex!important}.unfsij .d-lg-none{display:none!important}.unfsij .flex-lg-fill{flex:1 1 auto!important}.unfsij .flex-lg-row{flex-direction:row!important}.unfsij .flex-lg-column{flex-direction:column!important}.unfsij .flex-lg-row-reverse{flex-direction:row-reverse!important}.unfsij .flex-lg-column-reverse{flex-direction:column-reverse!important}.unfsij .flex-lg-grow-0{flex-grow:0!important}.unfsij .flex-lg-grow-1{flex-grow:1!important}.unfsij .flex-lg-shrink-0{flex-shrink:0!important}.unfsij .flex-lg-shrink-1{flex-shrink:1!important}.unfsij .flex-lg-wrap{flex-wrap:wrap!important}.unfsij .flex-lg-nowrap{flex-wrap:nowrap!important}.unfsij .flex-lg-wrap-reverse{flex-wrap:wrap-reverse!important}.unfsij .justify-content-lg-start{justify-content:flex-start!important}.unfsij .justify-content-lg-end{justify-content:flex-end!important}.unfsij .justify-content-lg-center{justify-content:center!important}.unfsij .justify-content-lg-between{justify-content:space-between!important}.unfsij .justify-content-lg-around{justify-content:space-around!important}.unfsij .justify-content-lg-evenly{justify-content:space-evenly!important}.unfsij .align-items-lg-start{align-items:flex-start!important}.unfsij .align-items-lg-end{align-items:flex-end!important}.unfsij .align-items-lg-center{align-items:center!important}.unfsij .align-items-lg-baseline{align-items:baseline!important}.unfsij .align-items-lg-stretch{align-items:stretch!important}.unfsij .align-content-lg-start{align-content:flex-start!important}.unfsij .align-content-lg-end{align-content:flex-end!important}.unfsij .align-content-lg-center{align-content:center!important}.unfsij .align-content-lg-between{align-content:space-between!important}.unfsij .align-content-lg-around{align-content:space-around!important}.unfsij .align-content-lg-stretch{align-content:stretch!important}.unfsij .align-self-lg-auto{align-self:auto!important}.unfsij .align-self-lg-start{align-self:flex-start!important}.unfsij .align-self-lg-end{align-self:flex-end!important}.unfsij .align-self-lg-center{align-self:center!important}.unfsij .align-self-lg-baseline{align-self:baseline!important}.unfsij .align-self-lg-stretch{align-self:stretch!important}.unfsij .order-lg-first{order:-1!important}.unfsij .order-lg-0{order:0!important}.unfsij .order-lg-1{order:1!important}.unfsij .order-lg-2{order:2!important}.unfsij .order-lg-3{order:3!important}.unfsij .order-lg-4{order:4!important}.unfsij .order-lg-5{order:5!important}.unfsij .order-lg-last{order:6!important}.unfsij .m-lg-0{margin:0!important}.unfsij .m-lg-1{margin:.25rem!important}.unfsij .m-lg-2{margin:.5rem!important}.unfsij .m-lg-3{margin:1rem!important}.unfsij .m-lg-4{margin:1.5rem!important}.unfsij .m-lg-5{margin:3rem!important}.unfsij .m-lg-auto{margin:auto!important}.unfsij .mx-lg-0{margin-right:0!important;margin-left:0!important}.unfsij .mx-lg-1{margin-right:.25rem!important;margin-left:.25rem!important}.unfsij .mx-lg-2{margin-right:.5rem!important;margin-left:.5rem!important}.unfsij .mx-lg-3{margin-right:1rem!important;margin-left:1rem!important}.unfsij .mx-lg-4{margin-right:1.5rem!important;margin-left:1.5rem!important}.unfsij .mx-lg-5{margin-right:3rem!important;margin-left:3rem!important}.unfsij .mx-lg-auto{margin-right:auto!important;margin-left:auto!important}.unfsij .my-lg-0{margin-top:0!important;margin-bottom:0!important}.unfsij .my-lg-1{margin-top:.25rem!important;margin-bottom:.25rem!important}.unfsij .my-lg-2{margin-top:.5rem!important;margin-bottom:.5rem!important}.unfsij .my-lg-3{margin-top:1rem!important;margin-bottom:1rem!important}.unfsij .my-lg-4{margin-top:1.5rem!important;margin-bottom:1.5rem!important}.unfsij .my-lg-5{margin-top:3rem!important;margin-bottom:3rem!important}.unfsij .my-lg-auto{margin-top:auto!important;margin-bottom:auto!important}.unfsij .mt-lg-0{margin-top:0!important}.unfsij .mt-lg-1{margin-top:.25rem!important}.unfsij .mt-lg-2{margin-top:.5rem!important}.unfsij .mt-lg-3{margin-top:1rem!important}.unfsij .mt-lg-4{margin-top:1.5rem!important}.unfsij .mt-lg-5{margin-top:3rem!important}.unfsij .mt-lg-auto{margin-top:auto!important}.unfsij .me-lg-0{margin-right:0!important}.unfsij .me-lg-1{margin-right:.25rem!important}.unfsij .me-lg-2{margin-right:.5rem!important}.unfsij .me-lg-3{margin-right:1rem!important}.unfsij .me-lg-4{margin-right:1.5rem!important}.unfsij .me-lg-5{margin-right:3rem!important}.unfsij .me-lg-auto{margin-right:auto!important}.unfsij .mb-lg-0{margin-bottom:0!important}.unfsij .mb-lg-1{margin-bottom:.25rem!important}.unfsij .mb-lg-2{margin-bottom:.5rem!important}.unfsij .mb-lg-3{margin-bottom:1rem!important}.unfsij .mb-lg-4{margin-bottom:1.5rem!important}.unfsij .mb-lg-5{margin-bottom:3rem!important}.unfsij .mb-lg-auto{margin-bottom:auto!important}.unfsij .ms-lg-0{margin-left:0!important}.unfsij .ms-lg-1{margin-left:.25rem!important}.unfsij .ms-lg-2{margin-left:.5rem!important}.unfsij .ms-lg-3{margin-left:1rem!important}.unfsij .ms-lg-4{margin-left:1.5rem!important}.unfsij .ms-lg-5{margin-left:3rem!important}.unfsij .ms-lg-auto{margin-left:auto!important}.unfsij .p-lg-0{padding:0!important}.unfsij .p-lg-1{padding:.25rem!important}.unfsij .p-lg-2{padding:.5rem!important}.unfsij .p-lg-3{padding:1rem!important}.unfsij .p-lg-4{padding:1.5rem!important}.unfsij .p-lg-5{padding:3rem!important}.unfsij .px-lg-0{padding-right:0!important;padding-left:0!important}.unfsij .px-lg-1{padding-right:.25rem!important;padding-left:.25rem!important}.unfsij .px-lg-2{padding-right:.5rem!important;padding-left:.5rem!important}.unfsij .px-lg-3{padding-right:1rem!important;padding-left:1rem!important}.unfsij .px-lg-4{padding-right:1.5rem!important;padding-left:1.5rem!important}.unfsij .px-lg-5{padding-right:3rem!important;padding-left:3rem!important}.unfsij .py-lg-0{padding-top:0!important;padding-bottom:0!important}.unfsij .py-lg-1{padding-top:.25rem!important;padding-bottom:.25rem!important}.unfsij .py-lg-2{padding-top:.5rem!important;padding-bottom:.5rem!important}.unfsij .py-lg-3{padding-top:1rem!important;padding-bottom:1rem!important}.unfsij .py-lg-4{padding-top:1.5rem!important;padding-bottom:1.5rem!important}.unfsij .py-lg-5{padding-top:3rem!important;padding-bottom:3rem!important}.unfsij .pt-lg-0{padding-top:0!important}.unfsij .pt-lg-1{padding-top:.25rem!important}.unfsij .pt-lg-2{padding-top:.5rem!important}.unfsij .pt-lg-3{padding-top:1rem!important}.unfsij .pt-lg-4{padding-top:1.5rem!important}.unfsij .pt-lg-5{padding-top:3rem!important}.unfsij .pe-lg-0{padding-right:0!important}.unfsij .pe-lg-1{padding-right:.25rem!important}.unfsij .pe-lg-2{padding-right:.5rem!important}.unfsij .pe-lg-3{padding-right:1rem!important}.unfsij .pe-lg-4{padding-right:1.5rem!important}.unfsij .pe-lg-5{padding-right:3rem!important}.unfsij .pb-lg-0{padding-bottom:0!important}.unfsij .pb-lg-1{padding-bottom:.25rem!important}.unfsij .pb-lg-2{padding-bottom:.5rem!important}.unfsij .pb-lg-3{padding-bottom:1rem!important}.unfsij .pb-lg-4{padding-bottom:1.5rem!important}.unfsij .pb-lg-5{padding-bottom:3rem!important}.unfsij .ps-lg-0{padding-left:0!important}.unfsij .ps-lg-1{padding-left:.25rem!important}.unfsij .ps-lg-2{padding-left:.5rem!important}.unfsij .ps-lg-3{padding-left:1rem!important}.unfsij .ps-lg-4{padding-left:1.5rem!important}.unfsij .ps-lg-5{padding-left:3rem!important}.unfsij .gap-lg-0{gap:0!important}.unfsij .gap-lg-1{gap:.25rem!important}.unfsij .gap-lg-2{gap:.5rem!important}.unfsij .gap-lg-3{gap:1rem!important}.unfsij .gap-lg-4{gap:1.5rem!important}.unfsij .gap-lg-5{gap:3rem!important}.unfsij .row-gap-lg-0{row-gap:0!important}.unfsij .row-gap-lg-1{row-gap:.25rem!important}.unfsij .row-gap-lg-2{row-gap:.5rem!important}.unfsij .row-gap-lg-3{row-gap:1rem!important}.unfsij .row-gap-lg-4{row-gap:1.5rem!important}.unfsij .row-gap-lg-5{row-gap:3rem!important}.unfsij .column-gap-lg-0{-moz-column-gap:0!important;column-gap:0!important}.unfsij .column-gap-lg-1{-moz-column-gap:.25rem!important;column-gap:.25rem!important}.unfsij .column-gap-lg-2{-moz-column-gap:.5rem!important;column-gap:.5rem!important}.unfsij .column-gap-lg-3{-moz-column-gap:1rem!important;column-gap:1rem!important}.unfsij .column-gap-lg-4{-moz-column-gap:1.5rem!important;column-gap:1.5rem!important}.unfsij .column-gap-lg-5{-moz-column-gap:3rem!important;column-gap:3rem!important}.unfsij .text-lg-start{text-align:left!important}.unfsij .text-lg-end{text-align:right!important}.unfsij .text-lg-center{text-align:center!important}}@media (min-width: 1200px){.unfsij .float-xl-start{float:left!important}.unfsij .float-xl-end{float:right!important}.unfsij .float-xl-none{float:none!important}.unfsij .object-fit-xl-contain{object-fit:contain!important}.unfsij .object-fit-xl-cover{object-fit:cover!important}.unfsij .object-fit-xl-fill{object-fit:fill!important}.unfsij .object-fit-xl-scale{object-fit:scale-down!important}.unfsij .object-fit-xl-none{object-fit:none!important}.unfsij .d-xl-inline{display:inline!important}.unfsij .d-xl-inline-block{display:inline-block!important}.unfsij .d-xl-block{display:block!important}.unfsij .d-xl-grid{display:grid!important}.unfsij .d-xl-inline-grid{display:inline-grid!important}.unfsij .d-xl-table{display:table!important}.unfsij .d-xl-table-row{display:table-row!important}.unfsij .d-xl-table-cell{display:table-cell!important}.unfsij .d-xl-flex{display:flex!important}.unfsij .d-xl-inline-flex{display:inline-flex!important}.unfsij .d-xl-none{display:none!important}.unfsij .flex-xl-fill{flex:1 1 auto!important}.unfsij .flex-xl-row{flex-direction:row!important}.unfsij .flex-xl-column{flex-direction:column!important}.unfsij .flex-xl-row-reverse{flex-direction:row-reverse!important}.unfsij .flex-xl-column-reverse{flex-direction:column-reverse!important}.unfsij .flex-xl-grow-0{flex-grow:0!important}.unfsij .flex-xl-grow-1{flex-grow:1!important}.unfsij .flex-xl-shrink-0{flex-shrink:0!important}.unfsij .flex-xl-shrink-1{flex-shrink:1!important}.unfsij .flex-xl-wrap{flex-wrap:wrap!important}.unfsij .flex-xl-nowrap{flex-wrap:nowrap!important}.unfsij .flex-xl-wrap-reverse{flex-wrap:wrap-reverse!important}.unfsij .justify-content-xl-start{justify-content:flex-start!important}.unfsij .justify-content-xl-end{justify-content:flex-end!important}.unfsij .justify-content-xl-center{justify-content:center!important}.unfsij .justify-content-xl-between{justify-content:space-between!important}.unfsij .justify-content-xl-around{justify-content:space-around!important}.unfsij .justify-content-xl-evenly{justify-content:space-evenly!important}.unfsij .align-items-xl-start{align-items:flex-start!important}.unfsij .align-items-xl-end{align-items:flex-end!important}.unfsij .align-items-xl-center{align-items:center!important}.unfsij .align-items-xl-baseline{align-items:baseline!important}.unfsij .align-items-xl-stretch{align-items:stretch!important}.unfsij .align-content-xl-start{align-content:flex-start!important}.unfsij .align-content-xl-end{align-content:flex-end!important}.unfsij .align-content-xl-center{align-content:center!important}.unfsij .align-content-xl-between{align-content:space-between!important}.unfsij .align-content-xl-around{align-content:space-around!important}.unfsij .align-content-xl-stretch{align-content:stretch!important}.unfsij .align-self-xl-auto{align-self:auto!important}.unfsij .align-self-xl-start{align-self:flex-start!important}.unfsij .align-self-xl-end{align-self:flex-end!important}.unfsij .align-self-xl-center{align-self:center!important}.unfsij .align-self-xl-baseline{align-self:baseline!important}.unfsij .align-self-xl-stretch{align-self:stretch!important}.unfsij .order-xl-first{order:-1!important}.unfsij .order-xl-0{order:0!important}.unfsij .order-xl-1{order:1!important}.unfsij .order-xl-2{order:2!important}.unfsij .order-xl-3{order:3!important}.unfsij .order-xl-4{order:4!important}.unfsij .order-xl-5{order:5!important}.unfsij .order-xl-last{order:6!important}.unfsij .m-xl-0{margin:0!important}.unfsij .m-xl-1{margin:.25rem!important}.unfsij .m-xl-2{margin:.5rem!important}.unfsij .m-xl-3{margin:1rem!important}.unfsij .m-xl-4{margin:1.5rem!important}.unfsij .m-xl-5{margin:3rem!important}.unfsij .m-xl-auto{margin:auto!important}.unfsij .mx-xl-0{margin-right:0!important;margin-left:0!important}.unfsij .mx-xl-1{margin-right:.25rem!important;margin-left:.25rem!important}.unfsij .mx-xl-2{margin-right:.5rem!important;margin-left:.5rem!important}.unfsij .mx-xl-3{margin-right:1rem!important;margin-left:1rem!important}.unfsij .mx-xl-4{margin-right:1.5rem!important;margin-left:1.5rem!important}.unfsij .mx-xl-5{margin-right:3rem!important;margin-left:3rem!important}.unfsij .mx-xl-auto{margin-right:auto!important;margin-left:auto!important}.unfsij .my-xl-0{margin-top:0!important;margin-bottom:0!important}.unfsij .my-xl-1{margin-top:.25rem!important;margin-bottom:.25rem!important}.unfsij .my-xl-2{margin-top:.5rem!important;margin-bottom:.5rem!important}.unfsij .my-xl-3{margin-top:1rem!important;margin-bottom:1rem!important}.unfsij .my-xl-4{margin-top:1.5rem!important;margin-bottom:1.5rem!important}.unfsij .my-xl-5{margin-top:3rem!important;margin-bottom:3rem!important}.unfsij .my-xl-auto{margin-top:auto!important;margin-bottom:auto!important}.unfsij .mt-xl-0{margin-top:0!important}.unfsij .mt-xl-1{margin-top:.25rem!important}.unfsij .mt-xl-2{margin-top:.5rem!important}.unfsij .mt-xl-3{margin-top:1rem!important}.unfsij .mt-xl-4{margin-top:1.5rem!important}.unfsij .mt-xl-5{margin-top:3rem!important}.unfsij .mt-xl-auto{margin-top:auto!important}.unfsij .me-xl-0{margin-right:0!important}.unfsij .me-xl-1{margin-right:.25rem!important}.unfsij .me-xl-2{margin-right:.5rem!important}.unfsij .me-xl-3{margin-right:1rem!important}.unfsij .me-xl-4{margin-right:1.5rem!important}.unfsij .me-xl-5{margin-right:3rem!important}.unfsij .me-xl-auto{margin-right:auto!important}.unfsij .mb-xl-0{margin-bottom:0!important}.unfsij .mb-xl-1{margin-bottom:.25rem!important}.unfsij .mb-xl-2{margin-bottom:.5rem!important}.unfsij .mb-xl-3{margin-bottom:1rem!important}.unfsij .mb-xl-4{margin-bottom:1.5rem!important}.unfsij .mb-xl-5{margin-bottom:3rem!important}.unfsij .mb-xl-auto{margin-bottom:auto!important}.unfsij .ms-xl-0{margin-left:0!important}.unfsij .ms-xl-1{margin-left:.25rem!important}.unfsij .ms-xl-2{margin-left:.5rem!important}.unfsij .ms-xl-3{margin-left:1rem!important}.unfsij .ms-xl-4{margin-left:1.5rem!important}.unfsij .ms-xl-5{margin-left:3rem!important}.unfsij .ms-xl-auto{margin-left:auto!important}.unfsij .p-xl-0{padding:0!important}.unfsij .p-xl-1{padding:.25rem!important}.unfsij .p-xl-2{padding:.5rem!important}.unfsij .p-xl-3{padding:1rem!important}.unfsij .p-xl-4{padding:1.5rem!important}.unfsij .p-xl-5{padding:3rem!important}.unfsij .px-xl-0{padding-right:0!important;padding-left:0!important}.unfsij .px-xl-1{padding-right:.25rem!important;padding-left:.25rem!important}.unfsij .px-xl-2{padding-right:.5rem!important;padding-left:.5rem!important}.unfsij .px-xl-3{padding-right:1rem!important;padding-left:1rem!important}.unfsij .px-xl-4{padding-right:1.5rem!important;padding-left:1.5rem!important}.unfsij .px-xl-5{padding-right:3rem!important;padding-left:3rem!important}.unfsij .py-xl-0{padding-top:0!important;padding-bottom:0!important}.unfsij .py-xl-1{padding-top:.25rem!important;padding-bottom:.25rem!important}.unfsij .py-xl-2{padding-top:.5rem!important;padding-bottom:.5rem!important}.unfsij .py-xl-3{padding-top:1rem!important;padding-bottom:1rem!important}.unfsij .py-xl-4{padding-top:1.5rem!important;padding-bottom:1.5rem!important}.unfsij .py-xl-5{padding-top:3rem!important;padding-bottom:3rem!important}.unfsij .pt-xl-0{padding-top:0!important}.unfsij .pt-xl-1{padding-top:.25rem!important}.unfsij .pt-xl-2{padding-top:.5rem!important}.unfsij .pt-xl-3{padding-top:1rem!important}.unfsij .pt-xl-4{padding-top:1.5rem!important}.unfsij .pt-xl-5{padding-top:3rem!important}.unfsij .pe-xl-0{padding-right:0!important}.unfsij .pe-xl-1{padding-right:.25rem!important}.unfsij .pe-xl-2{padding-right:.5rem!important}.unfsij .pe-xl-3{padding-right:1rem!important}.unfsij .pe-xl-4{padding-right:1.5rem!important}.unfsij .pe-xl-5{padding-right:3rem!important}.unfsij .pb-xl-0{padding-bottom:0!important}.unfsij .pb-xl-1{padding-bottom:.25rem!important}.unfsij .pb-xl-2{padding-bottom:.5rem!important}.unfsij .pb-xl-3{padding-bottom:1rem!important}.unfsij .pb-xl-4{padding-bottom:1.5rem!important}.unfsij .pb-xl-5{padding-bottom:3rem!important}.unfsij .ps-xl-0{padding-left:0!important}.unfsij .ps-xl-1{padding-left:.25rem!important}.unfsij .ps-xl-2{padding-left:.5rem!important}.unfsij .ps-xl-3{padding-left:1rem!important}.unfsij .ps-xl-4{padding-left:1.5rem!important}.unfsij .ps-xl-5{padding-left:3rem!important}.unfsij .gap-xl-0{gap:0!important}.unfsij .gap-xl-1{gap:.25rem!important}.unfsij .gap-xl-2{gap:.5rem!important}.unfsij .gap-xl-3{gap:1rem!important}.unfsij .gap-xl-4{gap:1.5rem!important}.unfsij .gap-xl-5{gap:3rem!important}.unfsij .row-gap-xl-0{row-gap:0!important}.unfsij .row-gap-xl-1{row-gap:.25rem!important}.unfsij .row-gap-xl-2{row-gap:.5rem!important}.unfsij .row-gap-xl-3{row-gap:1rem!important}.unfsij .row-gap-xl-4{row-gap:1.5rem!important}.unfsij .row-gap-xl-5{row-gap:3rem!important}.unfsij .column-gap-xl-0{-moz-column-gap:0!important;column-gap:0!important}.unfsij .column-gap-xl-1{-moz-column-gap:.25rem!important;column-gap:.25rem!important}.unfsij .column-gap-xl-2{-moz-column-gap:.5rem!important;column-gap:.5rem!important}.unfsij .column-gap-xl-3{-moz-column-gap:1rem!important;column-gap:1rem!important}.unfsij .column-gap-xl-4{-moz-column-gap:1.5rem!important;column-gap:1.5rem!important}.unfsij .column-gap-xl-5{-moz-column-gap:3rem!important;column-gap:3rem!important}.unfsij .text-xl-start{text-align:left!important}.unfsij .text-xl-end{text-align:right!important}.unfsij .text-xl-center{text-align:center!important}}@media (min-width: 1400px){.unfsij .float-xxl-start{float:left!important}.unfsij .float-xxl-end{float:right!important}.unfsij .float-xxl-none{float:none!important}.unfsij .object-fit-xxl-contain{object-fit:contain!important}.unfsij .object-fit-xxl-cover{object-fit:cover!important}.unfsij .object-fit-xxl-fill{object-fit:fill!important}.unfsij .object-fit-xxl-scale{object-fit:scale-down!important}.unfsij .object-fit-xxl-none{object-fit:none!important}.unfsij .d-xxl-inline{display:inline!important}.unfsij .d-xxl-inline-block{display:inline-block!important}.unfsij .d-xxl-block{display:block!important}.unfsij .d-xxl-grid{display:grid!important}.unfsij .d-xxl-inline-grid{display:inline-grid!important}.unfsij .d-xxl-table{display:table!important}.unfsij .d-xxl-table-row{display:table-row!important}.unfsij .d-xxl-table-cell{display:table-cell!important}.unfsij .d-xxl-flex{display:flex!important}.unfsij .d-xxl-inline-flex{display:inline-flex!important}.unfsij .d-xxl-none{display:none!important}.unfsij .flex-xxl-fill{flex:1 1 auto!important}.unfsij .flex-xxl-row{flex-direction:row!important}.unfsij .flex-xxl-column{flex-direction:column!important}.unfsij .flex-xxl-row-reverse{flex-direction:row-reverse!important}.unfsij .flex-xxl-column-reverse{flex-direction:column-reverse!important}.unfsij .flex-xxl-grow-0{flex-grow:0!important}.unfsij .flex-xxl-grow-1{flex-grow:1!important}.unfsij .flex-xxl-shrink-0{flex-shrink:0!important}.unfsij .flex-xxl-shrink-1{flex-shrink:1!important}.unfsij .flex-xxl-wrap{flex-wrap:wrap!important}.unfsij .flex-xxl-nowrap{flex-wrap:nowrap!important}.unfsij .flex-xxl-wrap-reverse{flex-wrap:wrap-reverse!important}.unfsij .justify-content-xxl-start{justify-content:flex-start!important}.unfsij .justify-content-xxl-end{justify-content:flex-end!important}.unfsij .justify-content-xxl-center{justify-content:center!important}.unfsij .justify-content-xxl-between{justify-content:space-between!important}.unfsij .justify-content-xxl-around{justify-content:space-around!important}.unfsij .justify-content-xxl-evenly{justify-content:space-evenly!important}.unfsij .align-items-xxl-start{align-items:flex-start!important}.unfsij .align-items-xxl-end{align-items:flex-end!important}.unfsij .align-items-xxl-center{align-items:center!important}.unfsij .align-items-xxl-baseline{align-items:baseline!important}.unfsij .align-items-xxl-stretch{align-items:stretch!important}.unfsij .align-content-xxl-start{align-content:flex-start!important}.unfsij .align-content-xxl-end{align-content:flex-end!important}.unfsij .align-content-xxl-center{align-content:center!important}.unfsij .align-content-xxl-between{align-content:space-between!important}.unfsij .align-content-xxl-around{align-content:space-around!important}.unfsij .align-content-xxl-stretch{align-content:stretch!important}.unfsij .align-self-xxl-auto{align-self:auto!important}.unfsij .align-self-xxl-start{align-self:flex-start!important}.unfsij .align-self-xxl-end{align-self:flex-end!important}.unfsij .align-self-xxl-center{align-self:center!important}.unfsij .align-self-xxl-baseline{align-self:baseline!important}.unfsij .align-self-xxl-stretch{align-self:stretch!important}.unfsij .order-xxl-first{order:-1!important}.unfsij .order-xxl-0{order:0!important}.unfsij .order-xxl-1{order:1!important}.unfsij .order-xxl-2{order:2!important}.unfsij .order-xxl-3{order:3!important}.unfsij .order-xxl-4{order:4!important}.unfsij .order-xxl-5{order:5!important}.unfsij .order-xxl-last{order:6!important}.unfsij .m-xxl-0{margin:0!important}.unfsij .m-xxl-1{margin:.25rem!important}.unfsij .m-xxl-2{margin:.5rem!important}.unfsij .m-xxl-3{margin:1rem!important}.unfsij .m-xxl-4{margin:1.5rem!important}.unfsij .m-xxl-5{margin:3rem!important}.unfsij .m-xxl-auto{margin:auto!important}.unfsij .mx-xxl-0{margin-right:0!important;margin-left:0!important}.unfsij .mx-xxl-1{margin-right:.25rem!important;margin-left:.25rem!important}.unfsij .mx-xxl-2{margin-right:.5rem!important;margin-left:.5rem!important}.unfsij .mx-xxl-3{margin-right:1rem!important;margin-left:1rem!important}.unfsij .mx-xxl-4{margin-right:1.5rem!important;margin-left:1.5rem!important}.unfsij .mx-xxl-5{margin-right:3rem!important;margin-left:3rem!important}.unfsij .mx-xxl-auto{margin-right:auto!important;margin-left:auto!important}.unfsij .my-xxl-0{margin-top:0!important;margin-bottom:0!important}.unfsij .my-xxl-1{margin-top:.25rem!important;margin-bottom:.25rem!important}.unfsij .my-xxl-2{margin-top:.5rem!important;margin-bottom:.5rem!important}.unfsij .my-xxl-3{margin-top:1rem!important;margin-bottom:1rem!important}.unfsij .my-xxl-4{margin-top:1.5rem!important;margin-bottom:1.5rem!important}.unfsij .my-xxl-5{margin-top:3rem!important;margin-bottom:3rem!important}.unfsij .my-xxl-auto{margin-top:auto!important;margin-bottom:auto!important}.unfsij .mt-xxl-0{margin-top:0!important}.unfsij .mt-xxl-1{margin-top:.25rem!important}.unfsij .mt-xxl-2{margin-top:.5rem!important}.unfsij .mt-xxl-3{margin-top:1rem!important}.unfsij .mt-xxl-4{margin-top:1.5rem!important}.unfsij .mt-xxl-5{margin-top:3rem!important}.unfsij .mt-xxl-auto{margin-top:auto!important}.unfsij .me-xxl-0{margin-right:0!important}.unfsij .me-xxl-1{margin-right:.25rem!important}.unfsij .me-xxl-2{margin-right:.5rem!important}.unfsij .me-xxl-3{margin-right:1rem!important}.unfsij .me-xxl-4{margin-right:1.5rem!important}.unfsij .me-xxl-5{margin-right:3rem!important}.unfsij .me-xxl-auto{margin-right:auto!important}.unfsij .mb-xxl-0{margin-bottom:0!important}.unfsij .mb-xxl-1{margin-bottom:.25rem!important}.unfsij .mb-xxl-2{margin-bottom:.5rem!important}.unfsij .mb-xxl-3{margin-bottom:1rem!important}.unfsij .mb-xxl-4{margin-bottom:1.5rem!important}.unfsij .mb-xxl-5{margin-bottom:3rem!important}.unfsij .mb-xxl-auto{margin-bottom:auto!important}.unfsij .ms-xxl-0{margin-left:0!important}.unfsij .ms-xxl-1{margin-left:.25rem!important}.unfsij .ms-xxl-2{margin-left:.5rem!important}.unfsij .ms-xxl-3{margin-left:1rem!important}.unfsij .ms-xxl-4{margin-left:1.5rem!important}.unfsij .ms-xxl-5{margin-left:3rem!important}.unfsij .ms-xxl-auto{margin-left:auto!important}.unfsij .p-xxl-0{padding:0!important}.unfsij .p-xxl-1{padding:.25rem!important}.unfsij .p-xxl-2{padding:.5rem!important}.unfsij .p-xxl-3{padding:1rem!important}.unfsij .p-xxl-4{padding:1.5rem!important}.unfsij .p-xxl-5{padding:3rem!important}.unfsij .px-xxl-0{padding-right:0!important;padding-left:0!important}.unfsij .px-xxl-1{padding-right:.25rem!important;padding-left:.25rem!important}.unfsij .px-xxl-2{padding-right:.5rem!important;padding-left:.5rem!important}.unfsij .px-xxl-3{padding-right:1rem!important;padding-left:1rem!important}.unfsij .px-xxl-4{padding-right:1.5rem!important;padding-left:1.5rem!important}.unfsij .px-xxl-5{padding-right:3rem!important;padding-left:3rem!important}.unfsij .py-xxl-0{padding-top:0!important;padding-bottom:0!important}.unfsij .py-xxl-1{padding-top:.25rem!important;padding-bottom:.25rem!important}.unfsij .py-xxl-2{padding-top:.5rem!important;padding-bottom:.5rem!important}.unfsij .py-xxl-3{padding-top:1rem!important;padding-bottom:1rem!important}.unfsij .py-xxl-4{padding-top:1.5rem!important;padding-bottom:1.5rem!important}.unfsij .py-xxl-5{padding-top:3rem!important;padding-bottom:3rem!important}.unfsij .pt-xxl-0{padding-top:0!important}.unfsij .pt-xxl-1{padding-top:.25rem!important}.unfsij .pt-xxl-2{padding-top:.5rem!important}.unfsij .pt-xxl-3{padding-top:1rem!important}.unfsij .pt-xxl-4{padding-top:1.5rem!important}.unfsij .pt-xxl-5{padding-top:3rem!important}.unfsij .pe-xxl-0{padding-right:0!important}.unfsij .pe-xxl-1{padding-right:.25rem!important}.unfsij .pe-xxl-2{padding-right:.5rem!important}.unfsij .pe-xxl-3{padding-right:1rem!important}.unfsij .pe-xxl-4{padding-right:1.5rem!important}.unfsij .pe-xxl-5{padding-right:3rem!important}.unfsij .pb-xxl-0{padding-bottom:0!important}.unfsij .pb-xxl-1{padding-bottom:.25rem!important}.unfsij .pb-xxl-2{padding-bottom:.5rem!important}.unfsij .pb-xxl-3{padding-bottom:1rem!important}.unfsij .pb-xxl-4{padding-bottom:1.5rem!important}.unfsij .pb-xxl-5{padding-bottom:3rem!important}.unfsij .ps-xxl-0{padding-left:0!important}.unfsij .ps-xxl-1{padding-left:.25rem!important}.unfsij .ps-xxl-2{padding-left:.5rem!important}.unfsij .ps-xxl-3{padding-left:1rem!important}.unfsij .ps-xxl-4{padding-left:1.5rem!important}.unfsij .ps-xxl-5{padding-left:3rem!important}.unfsij .gap-xxl-0{gap:0!important}.unfsij .gap-xxl-1{gap:.25rem!important}.unfsij .gap-xxl-2{gap:.5rem!important}.unfsij .gap-xxl-3{gap:1rem!important}.unfsij .gap-xxl-4{gap:1.5rem!important}.unfsij .gap-xxl-5{gap:3rem!important}.unfsij .row-gap-xxl-0{row-gap:0!important}.unfsij .row-gap-xxl-1{row-gap:.25rem!important}.unfsij .row-gap-xxl-2{row-gap:.5rem!important}.unfsij .row-gap-xxl-3{row-gap:1rem!important}.unfsij .row-gap-xxl-4{row-gap:1.5rem!important}.unfsij .row-gap-xxl-5{row-gap:3rem!important}.unfsij .column-gap-xxl-0{-moz-column-gap:0!important;column-gap:0!important}.unfsij .column-gap-xxl-1{-moz-column-gap:.25rem!important;column-gap:.25rem!important}.unfsij .column-gap-xxl-2{-moz-column-gap:.5rem!important;column-gap:.5rem!important}.unfsij .column-gap-xxl-3{-moz-column-gap:1rem!important;column-gap:1rem!important}.unfsij .column-gap-xxl-4{-moz-column-gap:1.5rem!important;column-gap:1.5rem!important}.unfsij .column-gap-xxl-5{-moz-column-gap:3rem!important;column-gap:3rem!important}.unfsij .text-xxl-start{text-align:left!important}.unfsij .text-xxl-end{text-align:right!important}.unfsij .text-xxl-center{text-align:center!important}}@media (min-width: 1200px){.unfsij .fs-1{font-size:2.5rem!important}.unfsij .fs-2{font-size:2rem!important}.unfsij .fs-3{font-size:1.75rem!important}.unfsij .fs-4{font-size:1.5rem!important}}@media print{.unfsij .d-print-inline{display:inline!important}.unfsij .d-print-inline-block{display:inline-block!important}.unfsij .d-print-block{display:block!important}.unfsij .d-print-grid{display:grid!important}.unfsij .d-print-inline-grid{display:inline-grid!important}.unfsij .d-print-table{display:table!important}.unfsij .d-print-table-row{display:table-row!important}.unfsij .d-print-table-cell{display:table-cell!important}.unfsij .d-print-flex{display:flex!important}.unfsij .d-print-inline-flex{display:inline-flex!important}.unfsij .d-print-none{display:none!important}}.unfsij .btn[data-bs-toggle=modal]{z-index:99990}.modal-backdrop{z-index:99991}.unfsij .modal{z-index:99992}.unfsij .modal .modal-nav>.nav-item:last-child{display:none}.unfsij .modal .modal-nav>.nav-item>.nav-link.active,.unfsij .modal .modal-nav>.nav-item>.nav-link:focus,.unfsij .modal .modal-nav>.nav-item>.nav-link:hover{color:var(--bs-white)}.unfsij .modal .modal-body .resize-none{resize:none}.unfsij #sk-tab-achievements-images-download-btn>.n{display:inline-block}.unfsij #sk-tab-achievements-images-download-btn>.w{display:none}.unfsij #sk-tab-achievements-images-download-btn>.e{display:none}.unfsij #sk-tab-achievements-images-download-btn.disabled>.n{display:none}.unfsij #sk-tab-achievements-images-download-btn.disabled>.w{display:inline-block}.unfsij #sk-tab-achievements-images-download-btn.disabled>.e{display:none}.unfsij #sk-tab-achievements-images-download-btn.error>.n{display:none}.unfsij #sk-tab-achievements-images-download-btn.error>.w{display:none}.unfsij #sk-tab-achievements-images-download-btn.error>.e{display:inline-block}.unfsij div[data-sk-depot-added="0"]>.r{display:none}.unfsij div[data-sk-depot-added="1"]>.a{display:none}.unfsij .tab-loader-container{background-color:var(--bs-black);z-index:1060;margin:-.5rem;border-bottom-left-radius:var(--bs-modal-border-radius);border-bottom-right-radius:var(--bs-modal-border-radius)}.unfsij .tab-loader{width:90px;height:14px;box-shadow:0 3px #fff;position:relative;clip-path:inset(-40px 0 -5px)}.unfsij .tab-loader:before{content:"";position:absolute;inset:auto calc(50% - 17px) 0;height:50px;--g: no-repeat linear-gradient(#ccc 0 0);background:var(--g),var(--g),var(--g),var(--g);background-size:16px 14px;animation:l7-1 2s infinite linear,l7-2 2s infinite linear}@keyframes l7-1{0%,to{background-position:0 -50px,100% -50px}17.5%{background-position:0 100%,100% -50px,0 -50px,100% -50px}35%{background-position:0 100%,100% 100%,0 -50px,100% -50px}52.5%{background-position:0 100%,100% 100%,0 calc(100% - 16px),100% -50px}70%,98%{background-position:0 100%,100% 100%,0 calc(100% - 16px),100% calc(100% - 16px)}}@keyframes l7-2{0%,70%{transform:translate(0)}to{transform:translate(200%)}}.unfsij .textarea-loader-backdrop{background-color:#000000b3}.unfsij .textarea-loader:before{content:"Loading..."} `);
(function (b, bootstrap, fileSaver, jimp, lodash, ie, fflate, F, protobufjs) {
  "use strict";
  var Z = Object.defineProperty;
  var J = (l, t, e) => t in l ? Z(l, t, {enumerable: true, configurable: true, writable: true, value: e}) : l[t] = e;
  var D = (l, t, e) => J(l, typeof t != "symbol" ? t + "" : t, e);
  b.fn.textWithoutChildren = function () {
    return this.contents().not(this.children());
  };
  var re = typeof GM_addValueChangeListener < "u" ? GM_addValueChangeListener : undefined, G = typeof GM_getValue < "u" ? GM_getValue : undefined, ce = typeof GM_openInTab < "u" ? GM_openInTab : undefined, W = typeof GM_setValue < "u" ? GM_setValue : undefined, pe = typeof GM_xmlhttpRequest < "u" ? GM_xmlhttpRequest : undefined, P = typeof unsafeWindow < "u" ? unsafeWindow : undefined;
  const U = "sak32009-gaxvyvrguokgtog", me = "Get Data from Steam / SteamDB", he = "5.5.1", fe = "unfsij", ue = `[Achievements]
[[achievements]{achievementName}=1\\n[/achievements]]
[AchievementIcons]
[[achievements]{achievementName} Achieved={achievementIconBmp}
{achievementName} Unachieved={achievementIconGrayBmp}\\n[/achievements]]
# Unachieved=
`, be = `{"appid":[[data]appId[/data]],"name":"[[data]name[/data]]","binary":"[[data]launchBinaryBaseName[/data]]","icon":"[[data]iconUrlFileName[/data]]"}
`, ge = `{
  "appid": [[data]appId[/data]],
  "name": "[[data]name[/data]]",
  "binary": "[[data]launchBinaryBaseName[/data]]",
  "achievement": {
    "total": [[data]achievementsCount[/data]],
    "list": [[[achievements]{"name":"{achievementName}","displayName":"{achievementDisplayName}","hidden":{achievementHidden},"description":"{achievementDescription}","icon":"{achievementIcon}","icongray":"{achievementIconGray}"},[/achievements]]]
  },
  "img": {
    "header": "https://cdn.cloudflare.steamstatic.com/steam/apps/[[data]appId[/data]]/header.jpg",
    "background": "https://cdn.cloudflare.steamstatic.com/steam/apps/[[data]appId[/data]]/page_bg_generated_v6b.jpg",
    "portrait": "https://cdn.cloudflare.steamstatic.com/steam/apps/[[data]appId[/data]]/library_600x900.jpg",
    "hero": "https://cdn.cloudflare.steamstatic.com/steam/apps/[[data]appId[/data]]/library_hero.jpg",
    "icon": "[[data]iconUrl[/data]]"
  },
  "apiVersion": 1
}
`, V = {achCodex: {name: "CODEX", file: {name: "[[data]appId[/data]]_achCodex.ini", text: ue, type: "general"}}, achWatcherGameIndex: {name: "Achievement Watcher @xan105 - gameIndex.json", file: {name: "[[data]appId[/data]]_gameIndex.json", text: be, type: "json"}}, achWatcherStats: {name: "Achievement Watcher @xan105 - appId.db", file: {name: "[[data]appId[/data]].db", text: ge, type: "json"}}}, ve = `[[dlcs prefix="5"]DLC{dlcIndex} = {dlcId}
DLCName{dlcIndex} = {dlcName}\\n[/dlcs]]
`, Te = `[steam]
; Application ID (http://store.steampowered.com/app/%appid%/)
appid = [[data]appId[/data]]
; Current game language.
; Uncomment this option to turn it on.
; Default is "english".
;language = german
; Enable/disable automatic DLC unlock. Default option is set to "false".
; Keep in mind that this option is highly experimental and won't
; work if the game wants to call each DLC by index.
unlockall = false
; Original Valve's steam_api.dll.
; Default is "steam_api_o.dll".
orgapi = steam_api_o.dll
; Original Valve's steam_api64.dll.
; Default is "steam_api64_o.dll".
orgapi64 = steam_api64_o.dll
; Enable/disable extra protection bypasser.
; Default is "false".
extraprotection = false
; The game will think that you're offline (supported by some games).
; Default is "false".
forceoffline = false
; Some games are checking for the low violence presence.
; Default is "false".
;lowviolence = true
; Installation path for the game.
; Note, that you can use ..\\ to set the parent directory (from where executable file is located).
; Maximum number of parent directories: 5 (..\\..\\..\\..\\..\\)
; Default is the path to current working directory.
;installdir = ..\\
; Use DLC id as the appended installation directory.
; e.g. <install_directory>\\480
; Default is "true".
;dlcasinstalldir = false
; Purchase timestamp for the DLC (http://www.onlineconversion.com/unix_time.htm).
; Default is "0" (1970/01/01).
;purchasetimestamp = 0
; Turn on the wrapper mode.
; Default is "false".
wrappermode = false

[steam_misc]
; Disables the internal SteamUser interface handler.
; Does have an effect on the games that are using the license check for the DLC/application.
; Default is "false".
disableuserinterface = false
; Disables the internal SteamUtils interface handler.
; Does have an effect on the games that are checking for the actual AppId (only matters when "wrappermode" is set to "true").
; Default is "false".
disableutilsinterface = false
; Disable the internal reserve hook of the "Steam_RegisterInterfaceFuncs" function.
; Default is "false".
disableregisterinterfacefuncs = false
; Unlock/Lock Steam parental restrictions.
; Default is "true".
;unlockparentalrestrictions = false
; SteamId64 to override. Note that this action could be risky !
; This option can only work if "disableuserinterface = false".
;steamid = 0
; Bypass VAC signature check. Note that this action could be risky !
; Default is "false".
;signaturebypass = true

[steam_wrapper]
; Application ID to override (used when the wrapper mode is on)
newappid = 0
; Use the internal storage system.
; Default is "false".
wrapperremotestorage = false
; Use the internal stats/achievements system.
; Default is "false".
wrapperuserstats = false
; Use the internal workshop (UGC) system.
; Default is "false".
wrapperugc = false
; Store the data in the current directory (incl. stats)
; By default the data is stored at: %appdata%/CreamAPI/%appid%/
; Default is "false".
saveindirectory = false
; Force the usage of a full save path instead of the relative one.
; Default is "false".
forcefullsavepath = false
; Disable internal callbacks system.
; Default is "false".
;disablecallbacks = true
; Disable/Enable a StoreStats callback. Takes effect only if "wrapperuserstats" is set to "true".
; Default is "true".
;storestatscallback = false
; Fixed achievements count.
; Some games can only work if this option is configured properly (e.g. Wolfenstein II).
; Default is "0".
achievementscount = 0

[dlc]
; DLC handling.
; Format: <dlc_id> = <dlc_description>
; e.g. : 247295 = Saints Row IV - GAT V Pack
; If the DLC is not specified in this section
; then it won't be unlocked
[[dlcs]{dlcId} = {dlcName}\\n[/dlcs]]

[dlc_installdirs]
; Installation path for the specific DLC (dependent from "installdir" option).
; This section works only if "dlcasinstalldir" option is set to "false".
; Format: <dlc_id> = <install_dir>
; e.g. : 556760 = DLCRoot0

[steam_ugc]
; Subscribed workshop items.
; This section works only if "wrappermode" and "wrapperugc" options are set to "true".
; Format: <dlc_id> = <true/false>
; e.g. : 812713531 = true
; Please refer to __README_WORKSHOP_EN__.txt for more details.
`, De = `[steam]
; Application ID (http://store.steampowered.com/app/%appid%/)
appid = [[data]appId[/data]]
; Current game language.
; Uncomment this option to turn it on.
; Default is "english".
;language = german
; Enable/disable automatic DLC unlock. Default option is set to "false".
; Keep in mind that this option  WON'T work properly if the "[dlc]" section is NOT empty
unlockall = false
; Original Valve's libsteam_api.so (x86).
; Default is "libsteam_api_o.so".
orgapi = libsteam_api_o.so
; Original Valve's libsteam_api.so (x64).
; Default is "libsteam_api_o.so".
orgapi64 = libsteam_api_o.so
; The game will think that you're offline (supported by some games).
; Default is "false".
forceoffline = false
; Some games are checking for the low violence presence.
; Default is "false".
;lowviolence = true
; Purchase timestamp for the DLC (http://www.onlineconversion.com/unix_time.htm).
; Default is "0" (1970/01/01).
;purchasetimestamp = 0

[steam_misc]
; Disables the internal SteamUser interface handler.
; Does have an effect on the games that are using the license check for the DLC/application.
; Default is "false".
disableuserinterface = false

[dlc]
; DLC handling.
; Format: <dlc_id> = <dlc_description>
; e.g. : 247295 = Saints Row IV - GAT V Pack
; If the DLC is not specified in this section
; then it won't be unlocked
[[dlcs]{dlcId} = {dlcName}\\n[/dlcs]]
`, Ie = `[steam]
; Application ID (http://store.steampowered.com/app/%appid%/)
appid = [[data]appId[/data]]
; Current game language.
; Uncomment this option to turn it on.
; Default is "english".
;language = german
; Enable/disable automatic DLC unlock. Default option is set to "false".
; Keep in mind that this option  WON'T work properly if the "[dlc]" section is NOT empty
unlockall = false
; Original Valve's libsteam_api.dylib (ARM64/x86_64).
; Default is "libsteam_api_o.dylib".
orgapi = libsteam_api_o.dylib
; The game will think that you're offline (supported by some games).
; Default is "false".
forceoffline = false
; Some games are checking for the low violence presence.
; Default is "false".
;lowviolence = true
; Purchase timestamp for the DLC (http://www.onlineconversion.com/unix_time.htm).
; Default is "0" (1970/01/01).
;purchasetimestamp = 0

[steam_misc]
; Disables the internal SteamUser interface handler.
; Does have an effect on the games that are using the license check for the DLC/application.
; Default is "false".
disableuserinterface = false

[dlc]
; DLC handling.
; Format: <dlc_id> = <dlc_description>
; e.g. : 247295 = Saints Row IV - GAT V Pack
; If the DLC is not specified in this section
; then it won't be unlocked
[[dlcs]{dlcId} = {dlcName}\\n[/dlcs]]
`, ke = `[steam]
; Application ID (http://store.steampowered.com/app/%appid%/)
appid = [[data]appId[/data]]
; Current game language.
; Uncomment this option to turn it on.
; Default is "english".
;language = german
; Enable/disable automatic DLC unlock. Default option is set to "false".
; Keep in mind that this option  WON'T work properly if the "[dlc]" section is NOT empty
unlockall = false
; Original Valve's steam_api.dll.
; Default is "steam_api_o.dll".
orgapi = steam_api_o.dll
; Original Valve's steam_api64.dll.
; Default is "steam_api64_o.dll".
orgapi64 = steam_api64_o.dll
; Enable/disable extra protection bypasser.
; Default is "false".
extraprotection = false
; Add the specific files to hide from detection.
; Use comma (,) to separate the files. "cream_api.ini" is hidden by default.
;filestohide = steam_appid.txt,steam_emu.ini
; The game will think that you're offline (supported by some games).
; Default is "false".
forceoffline = false
; Some games are checking for the low violence presence.
; Default is "false".
;lowviolence = true
; Purchase timestamp for the DLC (http://www.onlineconversion.com/unix_time.htm).
; Default is "0" (1970/01/01).
;purchasetimestamp = 0

[steam_misc]
; Disables the internal SteamUser interface handler.
; Does have an effect on the games that are using the license check for the DLC/application.
; Default is "false".
disableuserinterface = false

[dlc]
; DLC handling.
; Format: <dlc_id> = <dlc_description>
; e.g. : 247295 = Saints Row IV - GAT V Pack
; If the DLC is not specified in this section
; then it won't be unlocked
[[dlcs]{dlcId} = {dlcName}\\n[/dlcs]]
`, ye = `[[dlcs]{dlcId}\\n[/dlcs]]
`, Ce = `[[dlcs]{dlcId}={dlcName}\\n[/dlcs]]
`, we = `[[dlcs]{dlcId}="{dlcName}"\\n[/dlcs]]
`, xe = `[[dlcs]{dlcName}\\n[/dlcs]]
`, $e = `@ECHO OFF
:: WINDOWS WORKING DIR BUG WORKAROUND
CD /D "%~dp0"
:: CHECK APPLIST DIR
IF EXIST .\\AppList RMDIR /S /Q .\\AppList
:: CREATE APPLIST DIR
MKDIR .\\AppList
:: CREATE DLCS FILES FOR __[[data]name[/data]]__
ECHO [[data]appId[/data]]> .\\AppList\\0.txt
[[dlcs]:: {dlcName}
ECHO {dlcId}> .\\AppList\\{dlcIndex}.txt\\n[/dlcs]]
:: START GREENLUMA 2020
IF EXIST .\\DLLInjector.exe GOTO :Q
GOTO :EXIT
:Q
SET /P c=Do you want to start GreenLuma 2020 [Y/N]?
IF /I "%c%" EQU "Y" GOTO :START
IF /I "%c%" EQU "N" GOTO :EXIT
GOTO :Q
:START
CLS
ECHO Launching Greenluma 2020 - APPID [[data]appId[/data]] - APPNAME [[data]name[/data]]
TASKKILL /F /IM steam.exe
TIMEOUT /T 2
DLLInjector.exe -DisablePreferSystem32Images
:EXIT
EXIT
`, Ae = `[[[dlcs]{"id":"{dlcId}","name":"{dlcName}","type":"DLC"},[/dlcs]]]
`, Le = `[[dlcs]; {dlcName}
DLC_{dlcId} = 1\\n[/dlcs]]
`, _e = `{[[dlcs]"{dlcId}":{"Enabled":true,"Name":"{dlcName}"},[/dlcs]]}
`, Se = `[[dlcs]; {dlcName}
{dlcId}\\n[/dlcs]]
`, Ne = `{[[dlcs]"{dlcId}":"{dlcName}",[/dlcs]]}
`, Ee = `{"[[data]appId[/data]]":{"dlcs":{[[dlcs]"{dlcId}":"{dlcName}",[/dlcs]]}}}
`, Oe = `[[dlcs fromZero prefix="3"]; {dlcName}
DLC{dlcIndex} = {dlcId}\\n[/dlcs]]
`, Fe = `dlcs=[[dlcs]{dlcId},[/dlcs]]
`, R = {dlcCreamApi5300WinFull: {name: "CreamAPI v5.3.0.0 Windows (FULL)", file: {name: "[[data]appId[/data]]_dlcCreamApi5300WinFull.ini", text: ke, type: "general"}}, dlcCreamApi5300LinuxFull: {name: "CreamAPI v5.3.0.0 Linux (FULL)", file: {name: "[[data]appId[/data]]_dlcCreamApi5300LinuxFull.ini", text: De, type: "general"}}, dlcCreamApi5300MacFull: {name: "CreamAPI v5.3.0.0 Mac (FULL)", file: {name: "[[data]appId[/data]]_dlcCreamApi5300MacFull.ini", text: Ie, type: "general"}}, dlcCreamApi3410Full: {name: "CreamAPI v3.4.1.0 (FULL)", file: {name: "[[data]appId[/data]]_dlcCreamApi3410Full.ini", text: Te, type: "general"}}, dlcSKSLauncherMiniPartial: {name: "SKSLauncherMini (ONLY DLC LIST)", file: {name: "[[data]appId[/data]]_dlcSKSLauncherMiniPartial.json", text: Ne, type: "json"}}, dlcNemirtingasSteamEmuPartial: {name: "NemirtingasSteamEmu [Sep 2023] (ONLY DLC LIST)", file: {name: "[[data]appId[/data]]_dlcNemirtingasSteamEmuPartial.json", text: _e, type: "json"}}, dlcSmokeApiPartial: {name: "SmokeAPI (ONLY DLC LIST)", file: {name: "[[data]appId[/data]]_dlcSmokeApiPartial.json", text: Ee, type: "json"}}, dlcGreenLumaTwoZeroTwoZeroBatchMode: {name: "GreenLuma 2020 (BATCH MODE)", file: {name: "[[data]appId[/data]]_dlcGreenLumaTwoZeroTwoZeroBatchMode.bat", text: $e, type: "general"}}, dlcGreenLuma2023ManagerBlueAmulet: {name: "GreenLuma 2023 Manager BlueAmulet (ONLY DLC LIST)", file: {name: "[[data]appId[/data]]_dlcGreenLuma2023ManagerBlueAmulet.json", text: Ae, type: "json"}}, dlcUnsteamPartial: {name: "Unsteam (ONLY DLC LIST)", file: {name: "[[data]appId[/data]]_dlcUnsteamPartial.ini", text: Fe, type: "general"}, callback: l => `${lodash.trimEnd(lodash.trimEnd(l), ",")}
`}, dlcLumaEmuPartial: {name: "LumaEmu (ONLY DLC LIST)", file: {name: "[[data]appId[/data]]_dlcLumaEmuPartial.ini", text: Le, type: "general"}}, dlcCodexDlcFiveZeroDlcNamePartial: {name: "CODEX (DLC00000 = DLCName) (ONLY DLC LIST)", file: {name: "[[data]appId[/data]]_dlcCodexDlc00000DlcNamePartial.ini", text: ve, type: "general"}}, dlcThreeDmGamePartial: {name: "3DMGAME (ONLY DLC LIST)", file: {name: "[[data]appId[/data]]_dlcThreeDmGamePartial.ini", text: Oe, type: "general"}}, dlcSkidrowPartial: {name: "SKIDROW (ONLY DLC LIST)", file: {name: "[[data]appId[/data]]_dlcSkidrowPartial.ini", text: Se, type: "general"}}, dlcDlcIdDlcName: {name: "APPID=APPIDNAME", file: {name: "[[data]appId[/data]]_dlcDlcIdDlcName.ini", text: Ce, type: "general"}}, dlcDlcIdDlcNameDQuoted: {name: 'APPID="APPIDNAME" (WITH DOUBLE QUOTES)', file: {name: "[[data]appId[/data]]_dlcDlcIdDlcNameDQuoted.ini", text: we, type: "dquote"}}, dlcDlcName: {name: "APPIDNAME", file: {name: "[[data]appId[/data]]_dlcDlcName.ini", text: xe, type: "general"}}, dlcDlcId: {name: "APPID", file: {name: "[[data]appId[/data]]_dlcDlcId.ini", text: ye, type: "general"}}}, Pe = `{[[items]"{itemDefId}":1,[/items]]}
`, Re = `{[[items]"{itemDefId}":{itemData},[/items]]}
`, q = {itemsGoldbergItems: {name: "GOLDBERG items.json", file: {name: "[[data]appId[/data]]_itemsGoldbergItems.json.txt", text: Re, type: "json"}}, itemsGoldbergDefaultItems: {name: "GOLDBERG default_items.json", file: {name: "[[data]appId[/data]]_itemsGoldbergDefaultItems.json.txt", text: Pe, type: "json"}}}, Ue = `<div class="modal fade">
  <div class="modal-dialog modal-lg modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <div class="modal-title fw-bold"></div>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
      </div>
      <ul
        class="modal-nav nav align-items-center flex-nowrap text-nowrap overflow-x-auto overflow-y-hidden px-2 border-bottom"
      ></ul>
      <div class="modal-body tab-content p-2"></div>
    </div>
  </div>
</div>
`, Be = `<!-- NAV -->
<div class="input-group input-group-sm flex-nowrap mb-1">
  <select id="sk-tab-achievements-selector" class="form-select rounded-start-0"></select>
  <a
    id="sk-tab-achievements-download"
    class="btn btn-info rounded-end-0 text-truncate sk-gl-download"
    href="#sk-tab-achievements-textarea"
  >
    Download
  </a>
  <div class="dropdown">
    <button
      id="sk-tab-achievements-images-download-btn"
      class="btn btn-danger btn-sm text-truncate rounded-0 dropdown-toggle"
      type="button"
      data-bs-toggle="dropdown"
    >
      <span class="n">Download images as...</span>
      <span class="w">Wait...</span>
      <span class="e">Error!</span>
    </button>
    <ul id="sk-tab-achievements-images-download-ul" class="dropdown-menu">
      <li><a href="#" class="dropdown-item">.bmp</a></li>
      <li><a href="#" class="dropdown-item">.png</a></li>
      <li><a href="#" class="dropdown-item">.jpg</a></li>
    </ul>
  </div>
</div>
<!-- TEXTAREA -->
<div class="textarea-loader-container position-relative">
  <div
    id="sk-tab-achievements-textarea-loader"
    class="textarea-loader-backdrop position-absolute top-0 bottom-0 start-0 end-0 d-none"
  >
    <div class="position-absolute top-50 start-50 translate-middle">
      <div class="textarea-loader h2 fw-bold text-uppercase"></div>
    </div>
  </div>
  <textarea id="sk-tab-achievements-textarea" class="form-control rounded-0 resize-none" rows="15" readonly></textarea>
</div>
<!-- INFO -->
<div class="mt-1">
  <ul class="nav justify-content-end">
    <li class="nav-item">Achievements: <b id="sk-tab-achievements-count">0</b></li>
    <li class="nav-item d-flex">
      <div class="vr align-self-center mx-2"></div>
    </li>
    <li class="nav-item">Achievements Images: <b id="sk-tab-achievements-images-count">0</b></li>
  </ul>
</div>
`, He = `<!-- DESCRIPTION -->
<div class="text-center">
  <div class="text-bg-danger fw-bold text-uppercase p-2 mb-2">It is not 100% accurate.</div>
  <div class="mb-2">
    Generate a file with SHA1 hashes for your game files, add the necessary depots in the "Depots" tab and verify the
    integrity by uploading the previously generated file here.
  </div>
</div>
<!-- NAV -->
<div class="input-group input-group-sm flex-nowrap mb-1">
  <input id="sk-tab-depots-hash-checker-upload" type="file" accept=".sha1" class="form-control rounded-start-0" />
  <a
    id="sk-tab-depots-hash-checker-download"
    class="btn btn-sm btn-info rounded-end-0 text-truncate sk-gl-download"
    href="#sk-tab-depots-hash-checker-textarea"
  >
    Download Result
  </a>
</div>
<!-- RESULT -->
<div class="accordion accordion-flush">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button
        class="accordion-button collapsed"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#sk-tab-depots-hash-checker-accordion-ok"
      >
        <span id="sk-tab-depots-hash-checker-result-ok-color" class="fw-bold d-flex gap-1">
          <span id="sk-tab-depots-hash-checker-result-ok-count">0</span>
          /
          <span id="sk-tab-depots-hash-checker-count-depots-files">0</span>
          (<span id="sk-tab-depots-hash-checker-count-upfile-files">0</span>) | OK
        </span>
      </button>
    </h2>
    <div id="sk-tab-depots-hash-checker-accordion-ok" class="accordion-collapse collapse">
      <div class="accordion-body py-1 px-0">
        <textarea
          id="sk-tab-depots-hash-checker-result-ok-textarea"
          class="form-control rounded-0 resize-none"
          rows="10"
          readonly
        ></textarea>
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button
        class="accordion-button collapsed"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#sk-tab-depots-hash-checker-accordion-not-ok"
      >
        <span id="sk-tab-depots-hash-checker-result-not-ok-color" class="fw-bold">
          <span id="sk-tab-depots-hash-checker-result-not-ok-count">0</span> | NOT OK
        </span>
      </button>
    </h2>
    <div id="sk-tab-depots-hash-checker-accordion-not-ok" class="accordion-collapse collapse">
      <div class="accordion-body py-1 px-0">
        <textarea
          id="sk-tab-depots-hash-checker-result-not-ok-textarea"
          class="form-control rounded-0 resize-none"
          rows="10"
          readonly
        ></textarea>
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button
        class="accordion-button collapsed"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#sk-tab-depots-hash-checker-accordion-not-found"
      >
        <span id="sk-tab-depots-hash-checker-result-not-found-color" class="fw-bold">
          <span id="sk-tab-depots-hash-checker-result-not-found-count">0</span> | NOT FOUND
        </span>
      </button>
    </h2>
    <div id="sk-tab-depots-hash-checker-accordion-not-found" class="accordion-collapse collapse">
      <div class="accordion-body py-1 px-0">
        <textarea
          id="sk-tab-depots-hash-checker-result-not-found-textarea"
          class="form-control rounded-0 resize-none"
          rows="10"
          readonly
        ></textarea>
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button
        class="accordion-button collapsed"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#sk-tab-depots-hash-checker-accordion-not-in-depot"
      >
        <span id="sk-tab-depots-hash-checker-result-not-in-depot-color" class="fw-bold">
          <span id="sk-tab-depots-hash-checker-result-not-in-depot-count">0</span> | NOT IN DEPOT
        </span>
      </button>
    </h2>
    <div id="sk-tab-depots-hash-checker-accordion-not-in-depot" class="accordion-collapse collapse">
      <div class="accordion-body py-1 px-0">
        <textarea
          id="sk-tab-depots-hash-checker-result-not-in-depot-textarea"
          class="form-control rounded-0 resize-none"
          rows="10"
          readonly
        ></textarea>
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button
        class="accordion-button collapsed"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#sk-tab-depots-hash-checker-accordion-errors"
      >
        <span id="sk-tab-depots-hash-checker-result-errors-color" class="fw-bold">
          <span id="sk-tab-depots-hash-checker-result-errors-count">0</span> | ERRORS (userscript related)
        </span>
      </button>
    </h2>
    <div id="sk-tab-depots-hash-checker-accordion-errors" class="accordion-collapse collapse">
      <div class="accordion-body py-1 px-0">
        <textarea
          id="sk-tab-depots-hash-checker-result-errors-textarea"
          class="form-control rounded-0 resize-none"
          rows="10"
          readonly
        ></textarea>
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button
        class="accordion-button collapsed"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#sk-tab-depots-hash-checker-accordion-all"
      >
        <span class="fw-bold">RESULT</span>
      </button>
    </h2>
    <div id="sk-tab-depots-hash-checker-accordion-all" class="accordion-collapse collapse">
      <div class="accordion-body py-1 px-0">
        <textarea
          id="sk-tab-depots-hash-checker-textarea"
          class="form-control rounded-0 resize-none"
          rows="10"
          readonly
        ></textarea>
      </div>
    </div>
  </div>
</div>
`, Me = `<!-- NAV -->
<div class="input-group input-group-sm flex-nowrap mb-1">
  <select id="sk-tab-dlc-selector" class="form-select rounded-start-0"></select>
  <label for="sk-tab-dlc-unknowns-check" class="btn btn-secondary text-truncate">
    <input type="checkbox" id="sk-tab-dlc-unknowns-check" class="form-check-input me-1" />
    <span>With DLC Unknowns</span>
  </label>
  <a
    id="sk-tab-dlc-download"
    class="btn btn-info rounded-end-0 text-truncate sk-gl-download"
    href="#sk-tab-dlc-textarea"
  >
    Download
  </a>
</div>
<!-- TEXTAREA -->
<div class="textarea-loader-container position-relative">
  <div
    id="sk-tab-dlc-textarea-loader"
    class="textarea-loader-backdrop position-absolute top-0 bottom-0 start-0 end-0 d-none"
  >
    <div class="position-absolute top-50 start-50 translate-middle">
      <div class="textarea-loader h2 fw-bold text-uppercase"></div>
    </div>
  </div>
  <textarea id="sk-tab-dlc-textarea" class="form-control rounded-0 resize-none" rows="15" readonly></textarea>
</div>
<!-- INFO -->
<div class="mt-1">
  <ul class="nav justify-content-end">
    <li class="nav-item">DLC: <b id="sk-tab-dlc-count">0</b></li>
    <li class="nav-item d-flex">
      <div class="vr align-self-center mx-2"></div>
    </li>
    <li class="nav-item">DLC Unknowns: <b id="sk-tab-dlc-unknowns-count">0</b></li>
    <li class="nav-item d-flex">
      <div class="vr align-self-center mx-2"></div>
    </li>
    <li class="nav-item">All: <b id="sk-tab-dlc-count-all">0</b></li>
  </ul>
</div>
`, Ge = `<!-- NAV -->
<div class="input-group input-group-sm flex-nowrap mb-1">
  <select id="sk-tab-items-selector" class="form-select rounded-start-0"></select>
  <a
    id="sk-tab-items-download"
    class="btn btn-info rounded-end-0 text-truncate sk-gl-download"
    href="#sk-tab-items-textarea"
  >
    Download
  </a>
</div>
<!-- TEXTAREA -->
<div class="textarea-loader-container position-relative">
  <div
    id="sk-tab-items-textarea-loader"
    class="textarea-loader-backdrop position-absolute top-0 bottom-0 start-0 end-0 d-none"
  >
    <div class="position-absolute top-50 start-50 translate-middle">
      <div class="textarea-loader h2 fw-bold text-uppercase"></div>
    </div>
  </div>
  <textarea id="sk-tab-items-textarea" class="form-control rounded-0 resize-none" rows="15" readonly></textarea>
</div>
<!-- INFO -->
<div class="mt-1">
  <ul class="nav justify-content-end">
    <li class="nav-item">Items: <b id="sk-tab-items-count">0</b></li>
    <li class="nav-item d-flex">
      <div class="vr align-self-center mx-2"></div>
    </li>
    <li class="nav-item">From cache: <b id="sk-tab-items-cached">No</b></li>
  </ul>
</div>
`, We = `<!-- NAV -->
<div class="input-group input-group-sm flex-nowrap mb-1">
  <select id="sk-tab-related-dlc-selector" class="form-select rounded-start-0"></select>
  <a
    id="sk-tab-related-dlc-download"
    class="btn btn-info rounded-end-0 text-truncate sk-gl-download"
    href="#sk-tab-related-dlc-textarea"
  >
    Download
  </a>
</div>
<!-- TEXTAREA -->
<div class="textarea-loader-container position-relative">
  <div
    id="sk-tab-related-dlc-textarea-loader"
    class="textarea-loader-backdrop position-absolute top-0 bottom-0 start-0 end-0 d-none"
  >
    <div class="position-absolute top-50 start-50 translate-middle">
      <div class="textarea-loader h2 fw-bold text-uppercase"></div>
    </div>
  </div>
  <textarea id="sk-tab-related-dlc-textarea" class="form-control rounded-0 resize-none" rows="15" readonly></textarea>
</div>
<!-- INFO -->
<div class="mt-1">
  <ul class="nav justify-content-end">
    <li class="nav-item">Related DLC: <b id="sk-tab-related-dlc-count">0</b></li>
    <li class="nav-item d-flex">
      <div class="vr align-self-center mx-2"></div>
    </li>
    <li class="nav-item">From cache: <b id="sk-tab-related-dlc-cached">No</b></li>
  </ul>
</div>
`;
  function je(l) {
    return l && l.__esModule && Object.prototype.hasOwnProperty.call(l, "default") ? l.default : l;
  }
  function L(l) {
    if (typeof l != "string") throw new TypeError("Path must be a string. Received " + JSON.stringify(l));
  }
  function K(l, t) {
    for (var e = "", s = 0, a = -1, o = 0, n, i = 0; i <= l.length; ++i) {
      if (i < l.length) n = l.charCodeAt(i); else {
        if (n === 47) break;
        n = 47;
      }
      if (n === 47) {
        if (!(a === i - 1 || o === 1)) if (a !== i - 1 && o === 2) {
          if (e.length < 2 || s !== 2 || e.charCodeAt(e.length - 1) !== 46 || e.charCodeAt(e.length - 2) !== 46) {
            if (e.length > 2) {
              var d = e.lastIndexOf("/");
              if (d !== e.length - 1) {
                d === -1 ? (e = "", s = 0) : (e = e.slice(0, d), s = e.length - 1 - e.lastIndexOf("/")), a = i, o = 0;
                continue;
              }
            } else if (e.length === 2 || e.length === 1) {
              e = "", s = 0, a = i, o = 0;
              continue;
            }
          }
          t && (e.length > 0 ? e += "/.." : e = "..", s = 2);
        } else e.length > 0 ? e += "/" + l.slice(a + 1, i) : e = l.slice(a + 1, i), s = i - a - 1;
        a = i, o = 0;
      } else n === 46 && o !== -1 ? ++o : o = -1;
    }
    return e;
  }
  function Ve(l, t) {
    var e = t.dir || t.root, s = t.base || (t.name || "") + (t.ext || "");
    return e ? e === t.root ? e + s : e + l + s : s;
  }
  var S = {resolve: function () {
    for (var t = "", e = false, s, a = arguments.length - 1; a >= -1 && !e; a--) {
      var o;
      a >= 0 ? o = arguments[a] : (s === undefined && (s = process.cwd()), o = s), L(o), o.length !== 0 && (t = o + "/" + t, e = o.charCodeAt(0) === 47);
    }
    return t = K(t, !e), e ? t.length > 0 ? "/" + t : "/" : t.length > 0 ? t : ".";
  }, normalize: function (t) {
    if (L(t), t.length === 0) return ".";
    var e = t.charCodeAt(0) === 47, s = t.charCodeAt(t.length - 1) === 47;
    return t = K(t, !e), t.length === 0 && !e && (t = "."), t.length > 0 && s && (t += "/"), e ? "/" + t : t;
  }, isAbsolute: function (t) {
    return L(t), t.length > 0 && t.charCodeAt(0) === 47;
  }, join: function () {
    if (arguments.length === 0) return ".";
    for (var t, e = 0; e < arguments.length; ++e) {
      var s = arguments[e];
      L(s), s.length > 0 && (t === undefined ? t = s : t += "/" + s);
    }
    return t === undefined ? "." : S.normalize(t);
  }, relative: function (t, e) {
    if (L(t), L(e), t === e || (t = S.resolve(t), e = S.resolve(e), t === e)) return "";
    for (var s = 1; s < t.length && t.charCodeAt(s) === 47; ++s) ;
    for (var a = t.length, o = a - s, n = 1; n < e.length && e.charCodeAt(n) === 47; ++n) ;
    for (var i = e.length, d = i - n, m = o < d ? o : d, c = -1, r = 0; r <= m; ++r) {
      if (r === m) {
        if (d > m) {
          if (e.charCodeAt(n + r) === 47) return e.slice(n + r + 1);
          if (r === 0) return e.slice(n + r);
        } else o > m && (t.charCodeAt(s + r) === 47 ? c = r : r === 0 && (c = 0));
        break;
      }
      var u = t.charCodeAt(s + r), f = e.charCodeAt(n + r);
      if (u !== f) break;
      u === 47 && (c = r);
    }
    var h = "";
    for (r = s + c + 1; r <= a; ++r) (r === a || t.charCodeAt(r) === 47) && (h.length === 0 ? h += ".." : h += "/..");
    return h.length > 0 ? h + e.slice(n + c) : (n += c, e.charCodeAt(n) === 47 && ++n, e.slice(n));
  }, _makeLong: function (t) {
    return t;
  }, dirname: function (t) {
    if (L(t), t.length === 0) return ".";
    for (var e = t.charCodeAt(0), s = e === 47, a = -1, o = true, n = t.length - 1; n >= 1; --n) if (e = t.charCodeAt(n), e === 47) {
      if (!o) {
        a = n;
        break;
      }
    } else o = false;
    return a === -1 ? s ? "/" : "." : s && a === 1 ? "//" : t.slice(0, a);
  }, basename: function (t, e) {
    if (e !== undefined && typeof e != "string") throw new TypeError('"ext" argument must be a string');
    L(t);
    var s = 0, a = -1, o = true, n;
    if (e !== undefined && e.length > 0 && e.length <= t.length) {
      if (e.length === t.length && e === t) return "";
      var i = e.length - 1, d = -1;
      for (n = t.length - 1; n >= 0; --n) {
        var m = t.charCodeAt(n);
        if (m === 47) {
          if (!o) {
            s = n + 1;
            break;
          }
        } else d === -1 && (o = false, d = n + 1), i >= 0 && (m === e.charCodeAt(i) ? --i === -1 && (a = n) : (i = -1, a = d));
      }
      return s === a ? a = d : a === -1 && (a = t.length), t.slice(s, a);
    } else {
      for (n = t.length - 1; n >= 0; --n) if (t.charCodeAt(n) === 47) {
        if (!o) {
          s = n + 1;
          break;
        }
      } else a === -1 && (o = false, a = n + 1);
      return a === -1 ? "" : t.slice(s, a);
    }
  }, extname: function (t) {
    L(t);
    for (var e = -1, s = 0, a = -1, o = true, n = 0, i = t.length - 1; i >= 0; --i) {
      var d = t.charCodeAt(i);
      if (d === 47) {
        if (!o) {
          s = i + 1;
          break;
        }
        continue;
      }
      a === -1 && (o = false, a = i + 1), d === 46 ? e === -1 ? e = i : n !== 1 && (n = 1) : e !== -1 && (n = -1);
    }
    return e === -1 || a === -1 || n === 0 || n === 1 && e === a - 1 && e === s + 1 ? "" : t.slice(e, a);
  }, format: function (t) {
    if (t === null || typeof t != "object") throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof t);
    return Ve("/", t);
  }, parse: function (t) {
    L(t);
    var e = {root: "", dir: "", base: "", ext: "", name: ""};
    if (t.length === 0) return e;
    var s = t.charCodeAt(0), a = s === 47, o;
    a ? (e.root = "/", o = 1) : o = 0;
    for (var n = -1, i = 0, d = -1, m = true, c = t.length - 1, r = 0; c >= o; --c) {
      if (s = t.charCodeAt(c), s === 47) {
        if (!m) {
          i = c + 1;
          break;
        }
        continue;
      }
      d === -1 && (m = false, d = c + 1), s === 46 ? n === -1 ? n = c : r !== 1 && (r = 1) : n !== -1 && (r = -1);
    }
    return n === -1 || d === -1 || r === 0 || r === 1 && n === d - 1 && n === i + 1 ? d !== -1 && (i === 0 && a ? e.base = e.name = t.slice(1, d) : e.base = e.name = t.slice(i, d)) : (i === 0 && a ? (e.name = t.slice(1, n), e.base = t.slice(1, d)) : (e.name = t.slice(i, n), e.base = t.slice(i, d)), e.ext = t.slice(n, d)), i > 0 ? e.dir = t.slice(0, i - 1) : a && (e.dir = "/"), e;
  }, sep: "/", delimiter: ":", win32: null, posix: null};
  S.posix = S;
  var qe = S;
  const _ = je(qe);
  function Ke() {
    if ("jQuery" in P) return P.jQuery;
    if ("wrappedJSObject" in P) {
      const l = P.wrappedJSObject;
      if ("jQuery" in l) return l.jQuery;
    }
  }
  class Xe {
    constructor() {
      D(this, "appTitle", `${me} v${he}`);
      D(this, "appOptions", {withDLCUnknowns: false});
      D(this, "appScrollOptions", {block: "center", inline: "center", behavior: "smooth"});
      D(this, "appWaitTime", 300);
    }
  }
  class ze extends Xe {
    constructor() {
      super();
      D(this, "storageXHRequestKey", `${U}-xhrequest-cache`);
      D(this, "storageXHRequestExpire", 9e5);
    }
    getXHRequestExpireTime() {
      return Date.now() + this.storageXHRequestExpire;
    }
    getXHRequestData(e) {
      const s = G(this.storageXHRequestKey, null);
      if (s !== null && e in s) {
        const {data: a, expire: o} = s[e], n = Date.now();
        if (o >= n) return a;
      }
    }
    addXHRequestData(e, s) {
      const a = G(this.storageXHRequestKey, {});
      a[e] = {data: s, expire: this.getXHRequestExpireTime()}, W(this.storageXHRequestKey, a);
    }
    async createXHRequest(e, s, a = true) {
      return new Promise((o, n) => {
        const i = this.getXHRequestData(e);
        typeof i < "u" ? o({cached: true, data: i}) : pe({url: e, ...s, onload: d => {
          d.readyState === 4 && d.status === 200 ? (a === true && this.addXHRequestData(e, d.response), o({cached: false, data: d.response})) : n(new Error("createXHRequest -> status !== 200"));
        }, onerror: d => {
          n(new Error(`createXHRequest -> ${d.toString()}`));
        }});
      });
    }
  }
  class Qe extends ze {
    constructor() {
      super();
      D(this, "storageDepotsHashesKey", `${U}-depots-hashes`);
    }
    getAllAppidsDepotsHashesFromStorage() {
      return G(this.storageDepotsHashesKey, {});
    }
    getDepotsHashesFromStorage(e) {
      const s = this.getAllAppidsDepotsHashesFromStorage();
      return e in s ? s[e] : {};
    }
    addDepotHashesToStorage(e, s) {
      const a = this.getAllAppidsDepotsHashesFromStorage(), o = {...this.getDepotsHashesFromStorage(e), ...s};
      W(this.storageDepotsHashesKey, {...a, [e]: o});
    }
    removeDepotHashesFromStorage(e, s) {
      const a = this.getAllAppidsDepotsHashesFromStorage(), o = this.getDepotsHashesFromStorage(e);
      s in o && (delete o[s], W(this.storageDepotsHashesKey, {...a, [e]: o}));
    }
  }
  function Y(l) {
    const t = l.replaceAll(/[\r\n]+/gu, "");
    return lodash.unescape(t);
  }
  function y(l) {
    const t = Y(l);
    return lodash.escape(t);
  }
  class Ye extends Qe {
    constructor() {
      super();
      D(this, "appSteamDBApiUrl", "https://steamdb.info/api");
      D(this, "appSteamDBCdnUrl", "https://cdn.cloudflare.steamstatic.com");
      D(this, "appInfo", {appId: "", name: "", dlc: {}, dlcCount: 0, dlcUnknowns: {}, dlcUnknownsCount: 0, dlcCountAll: 0, relatedDLC: {}, relatedDLCCount: 0, achievements: {}, achievementsCount: 0, achievementsImages: [], achievementsImagesCount: 0, items: {}, itemsCount: 0, depotId: "", depotManifestId: "", depotFileHashes: {}, depotFileHashesCount: 0, launchBinaryPath: "", launchBinaryBaseName: "", iconUrl: "", iconUrlBaseName: "", iconUrlFileName: ""});
    }
    getSteamAchievementImageUrl(e) {
      return `${this.appSteamDBCdnUrl}/steamcommunity/public/images/apps/${this.appInfo.appId}/${e}`;
    }
    getSteamAppId() {
      this.appInfo.appId = b("div[data-appid]").attr("data-appid");
    }
    getSteamAppName() {
      this.appInfo.name = y(b("div#appHubAppName").text().trim());
    }
    getSteamAppDLC() {
      b("a.game_area_dlc_row[data-ds-appid]").each((e, s) => {
        const a = b(s), o = a.attr("data-ds-appid"), n = y(a.find("div.game_area_dlc_name").text().trim());
        this.appInfo.dlc[o] = n, this.appInfo.dlcCount += 1, this.appInfo.dlcCountAll += 1;
      });
    }
    getSteamDBAppId() {
      this.appInfo.appId = b(".scope-app[data-appid]").attr("data-appid");
    }
    getSteamDBAppName() {
      this.appInfo.name = y(b('.pagehead h1[itemprop="name"]').text().trim());
    }
    getSteamDBAppIconUrl() {
      this.appInfo.iconUrl = b(".pagehead img.app-icon.avatar").attr("src"), this.appInfo.iconUrlBaseName = _.basename(this.appInfo.iconUrl), this.appInfo.iconUrlFileName = _.parse(this.appInfo.iconUrl).name;
    }
    getSteamDBAppLaunchBinaryPath() {
      this.appInfo.launchBinaryPath = y(b("#config.tab-pane .launch-option:first table tbody tr:first-child td:nth-child(2) code").text().trim()), this.appInfo.launchBinaryBaseName = _.basename(this.appInfo.launchBinaryPath.replaceAll("\\", "/"));
    }
    getSteamDBAppDLC() {
      b("#dlc.tab-pane table tbody tr.app[data-appid]").each((e, s) => {
        const a = b(s), o = a.attr("data-appid"), n = a.find("td:nth-of-type(2)"), i = y(n.text().trim());
        n.hasClass("muted") ? (this.appInfo.dlcUnknowns[o] = i, this.appInfo.dlcUnknownsCount += 1) : (this.appInfo.dlc[o] = i, this.appInfo.dlcCount += 1), this.appInfo.dlcCountAll += 1;
      });
    }
    getSteamDBAppAchievements() {
      b("#stats.tab-pane #js-achievements table tbody tr").each((e, s) => {
        const a = b(s), o = y(a.find("td:nth-child(1)").text().trim()), n = a.find("td:nth-child(2)"), i = y(n.textWithoutChildren().text().trim()), d = y(n.find("p").text().trim()), m = n.find('p:contains("Hidden.")').length > 0 ? 1 : 0, c = a.find("td:nth-child(3)"), r = c.find("img:first-child").attr("data-name"), u = this.getSteamAchievementImageUrl(r), f = c.find("img:last-child").attr("data-name"), h = this.getSteamAchievementImageUrl(f);
        this.appInfo.achievements[o] = {name: o, displayName: i, hidden: m, description: d, icon: u, icongray: h}, this.appInfo.achievementsCount += 1, this.appInfo.achievementsImages.push(u, h), this.appInfo.achievementsImagesCount += 2;
      });
    }
    async getSteamDBAppRelatedDLC() {
      return this.createXHRequest(`${this.appSteamDBApiUrl}/RenderLinkedApps/?appid=${this.appInfo.appId}`, {method: "GET", headers: {Accept: "text/html", "X-Requested-With": "XMLHttpRequest"}, responseType: "text"}).then(e => (b("<div>").html(e.data).find('table tbody tr.app[data-appid] > td:contains("DLC")').each((a, o) => {
        const n = b(o).closest("tr"), i = n.attr("data-appid"), d = y(n.find("td:nth-of-type(3)").text().trim());
        this.appInfo.relatedDLC[i] = d, this.appInfo.relatedDLCCount += 1;
      }), e));
    }
    async getSteamDBAppItems() {
      return this.createXHRequest(`${this.appSteamDBApiUrl}/RenderAppSection/?section=items&appid=${this.appInfo.appId}`, {method: "GET", headers: {Accept: "text/html", "X-Requested-With": "XMLHttpRequest"}, responseType: "text"}).then(e => (b("<div>").html(e.data).find(".list .economy-item").each((a, o) => {
        const n = {appid: this.appInfo.appId}, i = b(o), d = i.find("h4.economy-item-name"), m = d.find("i"), c = y((m.length > 0 ? m : d.textWithoutChildren()).text().trim());
        n.name = c;
        const r = d.find("a").text().trim().slice(1);
        n.itemdefid = r;
        const u = i.find("div.economy-item-description");
        u.length > 0 && (n.description = y(u.text().trim()));
        let f = null;
        i.find(".table tr").each((h, p) => {
          const v = b(p);
          if (v.hasClass("web-assets-hr") && (f = v.find("td:first-child").text().slice(0, -1).trim()), f !== null) {
            const I = [];
            v.find("td").each((w, A) => {
              const T = b(A), g = y(T.text().trim());
              I.push(g);
            }), n[f] = I.join(";");
          } else {
            const I = v.find("td:first-child").text().trim(), w = y(v.find("td:last-child").text().trim());
            n[I] = w;
          }
          v.hasClass("web-assets-bottom") && (f = null);
        }), this.appInfo.items[r] = n, this.appInfo.itemsCount += 1;
      }), e));
    }
    getSteamDBAppDepotHashes() {
      const e = Ke();
      if (typeof e < "u") {
        const s = e("#files.tab-pane .table.file-tree").DataTable().data().toArray();
        for (const a of s) {
          const o = b("<span>").html(a[0]), n = Y(o.textWithoutChildren().text().trim()).replaceAll("/", "\\");
          let i = b("<span>").html(a[1]).text().trim();
          const d = typeof a[2] == "object" ? a[2].display : a[2];
          d.length > 0 && (i.length === 0 && d === "0" && (i = ["da39a3ee5e", "***", "90afd80709"].join("")), this.appInfo.depotFileHashes[n] = i.toLowerCase(), this.appInfo.depotFileHashesCount += 1);
        }
      }
    }
    getSteamDBAppDepotId() {
      this.appInfo.depotId = b(".scope-depot[data-depotid]").attr("data-depotid");
    }
    getSteamDBAppDepotManifestId() {
      this.appInfo.depotManifestId = b("#files.tab-pane > p:first > b:first").text().trim();
    }
  }
  async function j(l, t = "text/plain", e = "utf8") {
    return new Promise((s, a) => {
      const o = new Blob([l], {type: `${t};charset=${e}`}), n = new FileReader;
      n.addEventListener("load", () => {
        n.result !== null ? s(n.result) : a(new Error("contentToDataUri target is null!"));
      }), n.addEventListener("error", a), n.readAsDataURL(o);
    });
  }
  class Ze extends Ye {
    constructor() {
      super();
    }
    async getImageAs(t, e, s) {
      return new Promise((a, o) => {
        this.createXHRequest(t, {method: "GET", responseType: "arraybuffer"}, false).then(n => {
          jimp.read(n.data).then(async i => {
            const m = `${_.parse(t).name}${s}`, c = await i.getBufferAsync(e);
            a({name: m, content: c});
          }).catch(i => {
            o(new Error(`getImageAs -> jimp -> ${i}`));
          });
        }).catch(n => {
          o(new Error(`getImageAs -> createXHRequest -> ${n}`));
        });
      });
    }
    async getImagesAs(t, e, s, a, o, n) {
      try {
        const i = {}, d = t.length;
        let m = 0;
        for (const u of t) {
          const f = await this.getImageAs(u, e, s);
          i[f.name] = f.content, m += 1, a(m, d);
        }
        const c = fflate.zipSync(i), r = await j(c, "application/zip");
        n(r);
      } catch (i) {
        o(i);
      }
    }
  }
  class Je extends Ze {
    constructor() {
      super();
    }
    bbcodeExtract(t) {
      const e = /\[\[([^[\]]+)\]([\s\S]*?)\[\/([^[\]]+)\]\]/gu, s = {}, a = t.matchAll(e);
      for (const o of a) {
        const n = o[0], i = o[1], d = o[2], m = o[3];
        if (typeof i < "u" && typeof d < "u" && typeof m < "u") {
          const c = i.split(" "), r = c[0], u = c.slice(1).join(" ");
          if (r === m) if (r === "dlcs") {
            const f = /prefix="([^"]+)"/u.exec(u), h = f !== null ? Number(f[1]) : 0, p = u.includes("fromZero") ? 0 : 1;
            s[n] = {openNameTag: r, prefixOption: h, fromZeroOption: p, contentTag: d, closedNameTag: m};
          } else ["achievements", "items", "data"].includes(r) && (s[n] = {openNameTag: r, contentTag: d, closedNameTag: m});
        }
      }
      return s;
    }
    bbcodeParseData(t, e = false) {
      t = t.replaceAll("\\n", `
`);
      const s = this.bbcodeExtract(t);
      for (const [a, o] of Object.entries(s)) {
        const n = o.openNameTag, i = o.contentTag;
        t = t.replaceAll(a, () => {
          let d = i;
          if (n === "dlcs") {
            let m = o.fromZeroOption;
            const c = o.prefixOption, r = e ? this.appInfo.relatedDLC : this.appOptions.withDLCUnknowns ? {...this.appInfo.dlc, ...this.appInfo.dlcUnknowns} : this.appInfo.dlc, u = [];
            for (const [f, h] of Object.entries(r)) u.push(i.replaceAll(/\{(\w+)\}/gu, (p, v) => ({dlcId: f, dlcIndex: m.toString().padStart(c, "0"), dlcName: h}[v]))), m += 1;
            d = u.join("");
          } else if (n === "achievements") {
            const m = [];
            for (const c of Object.values(this.appInfo.achievements)) m.push(i.replaceAll(/\{(\w+)\}/gu, (r, u) => {
              const f = c.icon, h = _.basename(f), p = _.parse(f).name, v = c.icongray, I = _.basename(v), w = _.parse(v).name;
              return {achievementName: c.name, achievementDisplayName: c.displayName, achievementHidden: c.hidden, achievementDescription: c.description, achievementIcon: f, achievementIconBase: h, achievementIconBmp: `${p}.bmp`, achievementIconGray: v, achievementIconGrayBase: I, achievementIconGrayBmp: `${w}.bmp`}[u];
            }));
            d = m.join("");
          } else if (n === "items") {
            const m = [];
            for (const c of Object.values(this.appInfo.items)) m.push(i.replaceAll(/\{(\w+)\}/gu, (r, u) => ({itemDefId: c.itemdefid, itemData: JSON.stringify(c, null, 4)}[u])));
            d = m.join("");
          } else n === "data" && (d = this.appInfo[i]);
          return lodash.trimEnd(d);
        });
      }
      return t;
    }
    bbcodeParse(t, e) {
      const s = t.callback, a = t.file, o = a.text, n = this.bbcodeParseData(a.name), i = a.type;
      let d = this.bbcodeParseData(o, e);
      return ["json", "dquote"].includes(i) && (i === "json" && (d = ie.parse(d), d = JSON.stringify(d, null, 4)), d = d.replaceAll("&quot;", '\\"')), d = lodash.unescape(d), typeof s < "u" && (d = s(d)), {fileName: n, fileParsed: d};
    }
  }
  function X(l, t) {
    const e = new Uint8Array(t.toBuffer()), s = l.decode(e);
    return l.toObject(s, {defaults: true, longs: String});
  }
  const et = {optimize_for: "SPEED", cc_generic_services: false}, tt = {EContentDeltaChunkDataLocation: {values: {k_EContentDeltaChunkDataLocationInProtobuf: 0, k_EContentDeltaChunkDataLocationAfterProtobuf: 1}}, ContentManifestPayload: {fields: {mappings: {rule: "repeated", type: ".ContentManifestPayload.FileMapping", id: 1}}, nested: {FileMapping: {fields: {filename: {type: "string", id: 1}, size: {type: "uint64", id: 2}, flags: {type: "uint32", id: 3}, sha_filename: {type: "bytes", id: 4}, sha_content: {type: "bytes", id: 5}, chunks: {rule: "repeated", type: ".ContentManifestPayload.FileMapping.ChunkData", id: 6}, linktarget: {type: "string", id: 7}}, nested: {ChunkData: {fields: {sha: {type: "bytes", id: 1}, crc: {type: "fixed32", id: 2}, offset: {type: "uint64", id: 3}, cb_original: {type: "uint32", id: 4}, cb_compressed: {type: "uint32", id: 5}}}}}}}, ContentManifestMetadata: {fields: {depot_id: {type: "uint32", id: 1}, gid_manifest: {type: "uint64", id: 2}, creation_time: {type: "uint32", id: 3}, filenames_encrypted: {type: "bool", id: 4}, cb_disk_original: {type: "uint64", id: 5}, cb_disk_compressed: {type: "uint64", id: 6}, unique_chunks: {type: "uint32", id: 7}, crc_encrypted: {type: "uint32", id: 8}, crc_clear: {type: "uint32", id: 9}}}, ContentManifestSignature: {fields: {signature: {type: "bytes", id: 1}}}, ContentDeltaChunks: {fields: {depot_id: {type: "uint32", id: 1}, manifest_id_source: {type: "uint64", id: 2}, manifest_id_target: {type: "uint64", id: 3}, deltaChunks: {rule: "repeated", type: ".ContentDeltaChunks.DeltaChunk", id: 4}, chunk_data_location: {type: ".EContentDeltaChunkDataLocation", id: 5, options: {default: "k_EContentDeltaChunkDataLocationInProtobuf"}}}, nested: {DeltaChunk: {fields: {sha_source: {type: "bytes", id: 1}, sha_target: {type: "bytes", id: 2}, size_original: {type: "uint32", id: 3}, patch_method: {type: "uint32", id: 4}, chunk: {type: "bytes", id: 5}, size_delta: {type: "uint32", id: 6}}}}}}, at = {options: et, nested: tt}, z = {...protobufjs.Root.fromJSON(at)}, nt = 1911953360, st = 524817086, ot = 461486103, it = 851711403, dt = 372545409;
  function lt(l) {
    const t = F.wrap(l, F.LITTLE_ENDIAN), e = {files: [], meta: {}};
    for (;;) {
      const s = t.readUint32();
      if (s === it) break;
      switch (s) {
        case dt:
          throw new Error("Received unexpected Steam3 manifest; not yet implemented");
        case nt:
          {
            const a = t.readUint32(), o = t.slice(t.offset, t.offset + a), n = X(z.ContentManifestPayload, o);
            e.files = n.mappings, t.skip(a);
            break;
          }
        case st:
          {
            const a = t.readUint32(), o = t.slice(t.offset, t.offset + a), n = X(z.ContentManifestMetadata, o);
            e.meta = n, t.skip(a);
            break;
          }
        case ot:
          {
            const a = t.readUint32();
            t.skip(a);
            break;
          }
        default:
          throw new Error(`Unrecognized magic value ${s} in depot manifest.`);
      }
    }
    return e.files.forEach(function s(a) {
      for (const [o, n] of Object.entries(a)) n instanceof Uint8Array ? a[o] = F.wrap(n, F.LITTLE_ENDIAN).toHex() : typeof n == "object" && s(n);
    }), e;
  }
  class rt extends Je {
    constructor() {
      super();
      D(this, "$wrapper");
      D(this, "$modalWrapper");
      D(this, "$modalButtonWrapper");
      D(this, "$modal");
      D(this, "$modalNavs");
      D(this, "$modalTabs");
      this.$wrapper = $("<div>").addClass(fe).attr({"data-bs-theme": "dark"}), this.$modalWrapper = this.$wrapper.clone().html(Ue);
      const e = this.$modalWrapper.find("> .modal > .modal-dialog > .modal-content");
      e.find("> .modal-header > .modal-title").text(this.appTitle), this.$modal = this.$modalWrapper.find("> .modal"), this.$modal.attr({id: U}), this.$modalNavs = e.find("> .modal-nav"), this.$modalTabs = e.find("> .modal-body"), this.$modalButtonWrapper = this.$wrapper.clone(), $("<button>").attr({type: "button", "data-bs-toggle": "modal", "data-bs-target": `#${U}`}).addClass("btn btn-sk-primary me-2 rounded-bottom-0 position-fixed bottom-0 end-0").text(this.appTitle).appendTo(this.$modalButtonWrapper);
    }
    setGlobalEvents() {
      this.$modal.on("shown.bs.modal", () => {
        const e = this.getActiveTabLink().get(0);
        typeof e < "u" && e.scrollIntoView(this.appScrollOptions);
      }), this.$modalNavs.on("click", "> .nav-item > .nav-link", e => {
        const s = e.currentTarget;
        typeof s < "u" && s.scrollIntoView(this.appScrollOptions);
      }), this.$modalTabs.on("click", "a.sk-gl-download", async e => {
        e.preventDefault();
        const s = $(e.currentTarget), a = s.attr("href"), o = s.attr("data-sk-filename"), n = $(a).val(), i = await j(n);
        fileSaver.saveAs(i, o);
      });
    }
    getTabLink(e) {
      return this.$modalNavs.find(`> .nav-item > .nav-link[data-bs-target="#${e}"]`);
    }
    getTabContent(e) {
      return this.$modalTabs.find(`> #${e}`);
    }
    getActiveTabLink() {
      return this.$modalNavs.find("> .nav-item > .nav-link.active");
    }
    addTabLinkSeparator() {
      const e = $("<li>").addClass("nav-item");
      $("<div>").addClass("vr").appendTo(e), e.appendTo(this.$modalNavs);
    }
    addTab(e, s, a) {
      const o = $("<li>").addClass("nav-item");
      $("<a>").addClass("nav-link").attr({href: "#", "data-bs-toggle": "pill", "data-bs-target": `#${e}`}).text(s).appendTo(o), o.appendTo(this.$modalNavs), this.addTabLinkSeparator(), $("<div>").addClass("tab-pane").attr({id: e}).html(a).appendTo(this.$modalTabs);
    }
    setSelectorValues(e, s) {
      for (const [a, o] of Object.entries(s)) $("<option>").attr({value: a}).text(o.name).appendTo(e);
    }
    setSelectorEvents(e, s, a) {
      e.on("change", o => {
        o.preventDefault();
        const i = $(o.currentTarget).find(":selected").val();
        this.showTextareaLoader(s), window.setTimeout(() => {
          if (typeof i == "string") {
            const d = a[i], {fileName: m, fileParsed: c} = this.bbcodeParse(d, s === "sk-tab-related-dlc");
            this.setDownloadAndTextareaValue(s, m, c);
          }
          this.hideTextareaLoader(s);
        }, this.appWaitTime);
      }).trigger("change");
    }
    setInfoValues(e) {
      for (const [s, a] of Object.entries(e)) this.$modalWrapper.find(`#${s}`).text(a);
    }
    setTextareaValue(e, s) {
      this.$modalWrapper.find(`textarea#${e}-textarea`).val(s).scrollTop(0);
    }
    setDownloadValue(e, s) {
      this.$modalWrapper.find(`a#${e}-download`).attr("data-sk-filename", s);
    }
    setDownloadAndTextareaValue(e, s, a) {
      this.setDownloadValue(e, s), this.setTextareaValue(e, a);
    }
    showTextareaLoader(e) {
      this.$modalWrapper.find(`div#${e}-textarea-loader`).removeClass("d-none");
    }
    hideTextareaLoader(e) {
      this.$modalWrapper.find(`div#${e}-textarea-loader`).addClass("d-none");
    }
    appendTemplate() {
      const e = this.$modalNavs.find("> .nav-item");
      e.length > 0 && (this.$modalButtonWrapper.appendTo(document.body), this.$modalWrapper.appendTo(document.body), e.first().find("> .nav-link").tab("show"), this.setGlobalEvents());
    }
    addTabLoader(e) {
      const s = $("<div>").addClass("tab-loader-container w-100 h-100 position-absolute"), a = $("<div>").addClass("position-absolute top-50 start-50 translate-middle");
      $("<div>").addClass("tab-loader mx-auto").appendTo(a);
      const n = $("<figure>").addClass("text-center mt-4"), i = $("<blockquote>").addClass("blockquote");
      $("<p>").addClass("small").text("Patience is the virtue of the digital warrior, and the reward will be glorious.").appendTo(i), i.appendTo(n), $("<figcaption>").addClass("blockquote-footer").text("I think it's someone famous.").appendTo(n), n.appendTo(a), a.appendTo(s), s.prependTo(this.getTabContent(e));
    }
    removeTabLoader(e) {
      this.getTabContent(e).find("> .tab-loader-container").remove();
    }
    changeTabLoaderToError(e, s) {
      const a = this.getTabContent(e).find("> .tab-loader-container");
      a.addClass("bg-danger"), a.find("figure").remove(), $("<h4>").addClass("mt-4 text-uppercase").text(s).appendTo(a.find("> div"));
    }
    appendDLCTab() {
      const e = "sk-tab-dlc", s = "DLC";
      let a = false;
      this.addTab(e, s, Me), this.addTabLoader(e);
      const o = this.$modalWrapper.find(`select#${e}-selector`), n = this.$modalWrapper.find(`input#${e}-unknowns-check`);
      this.setSelectorValues(o, R), this.appInfo.dlcUnknownsCount === 0 && n.closest("label").addClass("d-none"), n.on("change", i => {
        const d = $(i.currentTarget);
        this.appOptions.withDLCUnknowns = d.is(":checked"), o.trigger("change");
      }), this.setInfoValues({[`${e}-count`]: this.appInfo.dlcCount, [`${e}-unknowns-count`]: this.appInfo.dlcUnknownsCount, [`${e}-count-all`]: this.appInfo.dlcCountAll}), this.getTabLink(e).on("shown.bs.tab", () => {
        a || window.setTimeout(() => {
          this.setSelectorEvents(o, e, R), this.removeTabLoader(e);
        }, this.appWaitTime), a = true;
      });
    }
    appendRelatedDLC() {
      const e = "sk-tab-related-dlc", s = "Related DLC";
      let a = false;
      this.addTab(e, s, We), this.addTabLoader(e);
      const o = this.$modalWrapper.find(`select#${e}-selector`);
      this.setSelectorValues(o, R), this.getTabLink(e).on("shown.bs.tab", () => {
        a || window.setTimeout(() => {
          this.getSteamDBAppRelatedDLC().then(n => {
            this.appInfo.relatedDLCCount > 0 && this.setSelectorEvents(o, e, R), this.setInfoValues({[`${e}-count`]: this.appInfo.relatedDLCCount, [`${e}-cached`]: n.cached ? "Yes" : "No"}), this.removeTabLoader(e);
          }).catch(n => {
            console.error("getSteamDBAppRelatedDLC", n), this.changeTabLoaderToError(e, n);
          });
        }, this.appWaitTime), a = true;
      });
    }
    appendAchievements() {
      const e = "sk-tab-achievements", s = "Achievements";
      let a = false;
      this.addTab(e, s, Be);
      const o = this.$modalWrapper.find(`select#${e}-selector`);
      this.setSelectorValues(o, V);
      const n = this.$modalWrapper.find(`ul#${e}-images-download-ul a`), i = this.$modalWrapper.find(`button#${e}-images-download-btn`), d = i.find(".w");
      n.on("click", async m => {
        m.preventDefault();
        const r = $(m.currentTarget).text().trim(), u = {".bmp": jimp.MIME_BMP, ".png": jimp.MIME_PNG, ".jpg": jimp.MIME_JPEG};
        if (Object.keys(u).includes(r)) {
          const f = u[r];
          await this.getImagesAs(this.appInfo.achievementsImages, f, r, (h, p) => {
            i.addClass("disabled"), d.text(`Wait... ${h} / ${p}`);
          }, h => {
            console.error("getImagesAs", h), i.addClass("error"), window.setTimeout(() => {
              i.removeClass("disabled error");
            }, 1500);
          }, h => {
            i.removeClass("disabled"), fileSaver.saveAs(h, `${this.appInfo.appId}_achievement_images.zip`);
          });
        }
      }), this.setInfoValues({[`${e}-count`]: this.appInfo.achievementsCount, [`${e}-images-count`]: this.appInfo.achievementsImagesCount}), this.getTabLink(e).on("shown.bs.tab", () => {
        a || window.setTimeout(() => {
          this.setSelectorEvents(o, e, V), this.removeTabLoader(e);
        }, this.appWaitTime), a = true;
      });
    }
    appendItems() {
      const e = "sk-tab-items", s = "Items";
      let a = false;
      this.addTab(e, s, Ge), this.addTabLoader(e);
      const o = this.$modalWrapper.find(`select#${e}-selector`);
      this.setSelectorValues(o, q), this.getTabLink(e).on("shown.bs.tab", () => {
        a || window.setTimeout(() => {
          this.getSteamDBAppItems().then(n => {
            this.appInfo.itemsCount > 0 && this.setSelectorEvents(o, e, q), this.setInfoValues({[`${e}-count`]: this.appInfo.itemsCount, [`${e}-cached`]: n.cached ? "Yes" : "No"}), this.removeTabLoader(e);
          }).catch(n => {
            console.error("getSteamDBAppItems", n), this.changeTabLoaderToError(e, n);
          });
        }, this.appWaitTime), a = true;
      });
    }
    appendDepotsHashCheckerTable() {
      const e = $("#depots.tab-pane > div:first > table:first"), a = e.find("> tbody").find("> tr"), n = e.find("> thead").find("> tr"), i = $("<th>").css({width: "120px"}), d = this.$wrapper.clone();
      $("<div>").addClass("text-center text-warning mb-1").text("Depots Hash Checker").appendTo(d);
      const c = $("<button>").attr({type: "button"}).addClass("btn btn-success btn-sm w-100").text("Auto Add");
      let r = null;
      function u() {
        var h;
        const f = a.find('div[data-sk-depot-added="0"]');
        if (f.length > 0) {
          (h = f.first().find("> .a").get(0)) == null || h.click();
          const p = lodash.random(2e3, 5e3);
          r = window.setTimeout(u, p);
        } else c.addClass("btn-success").removeClass("btn-info stop").text("Auto Add");
      }
      c.on("click", f => {
        f.preventDefault();
        const h = $(f.currentTarget);
        h.hasClass("stop") ? (h.addClass("btn-success").removeClass("btn-info stop").text("Auto Add"), r !== null && clearTimeout(r)) : (h.addClass("btn-info stop").removeClass("btn-success").text("Stop Auto Add"), u());
      }), c.appendTo(d), d.appendTo(i), i.appendTo(n), a.each((f, h) => {
        const p = $(h), v = p.find("> td.depot-config > span:contains('Unused')").length > 0, I = $("<td>");
        if (!v) {
          const w = p.attr("data-depotid"), A = p.find("> td:nth-of-type(3) > a").text().trim();
          p.attr("data-depotmanifestid", A);
          const T = this.$wrapper.clone(), g = $("<div>").attr({"data-sk-depot-added": "0"});
          $("<a>").addClass("btn btn-success btn-sm w-100 a").attr({href: `/depot/${w}/?show_hashes&a=${this.appInfo.appId}`, target: "_blank"}).text("Add").appendTo(g), $("<button>").addClass("btn btn-danger btn-sm w-100 r").text("Remove").appendTo(g), A.length > 0 && $("<button>").addClass("btn btn-info btn-sm w-100 mt-1 g").text("Get .sha1").appendTo(g), g.appendTo(T), T.appendTo(I);
        }
        I.appendTo(p);
      }), a.find("div[data-sk-depot-added] > .a").on("click", f => {
        f.preventDefault();
        const p = $(f.currentTarget).attr("href"), v = new URL(p, window.location.origin);
        ce(v.href, {active: false});
      }), a.find("div[data-sk-depot-added] > .r").on("click", f => {
        f.preventDefault();
        const p = $(f.currentTarget).closest(".depot[data-depotid]").attr("data-depotid");
        this.removeDepotHashesFromStorage(this.appInfo.appId, p);
      }), a.find("div[data-sk-depot-added] > .g").on("click", async f => {
        f.preventDefault();
        const h = $(f.currentTarget), p = h.text().trim(), v = h.closest(".depot[data-depotid]"), I = v.attr("data-depotid"), w = v.attr("data-depotmanifestid");
        h.addClass("disabled");
        try {
          h.text("Wait...");
          const A = await this.createXHRequest(`https://github.com/BlankTMing/ManifestAutoUpdate/blob/${this.appInfo.appId}/${I}_${w}.manifest?raw=true`, {method: "GET", responseType: "arraybuffer"}, false), T = lt(A.data), g = [];
          if ("files" in T) for (const [C, k] of Object.entries(T.files)) {
            const N = k.filename.replaceAll("/", "\\"), E = k.size;
            let O = k.sha_content;
            k.flags !== 64 && (E === "0" && (O = "da39a3ee5e6b4b0d3255bfef95601890afd80709"), g.push(`${O} *${N}`));
          }
          const x = await j(g.join(`
`));
          fileSaver.saveAs(x, `${I}_${w}.sha1`), h.text(p).removeClass("disabled");
        } catch (A) {
          console.error(A), h.text("Error!");
        }
      }), this.appendDepotsHashCheckerTableUpdate(), re(this.storageDepotsHashesKey, () => {
        a.find("div[data-sk-depot-added]").attr({"data-sk-depot-added": "0"}), this.appendDepotsHashCheckerTableUpdate();
      });
    }
    appendDepotsHashCheckerTableUpdate() {
      this.appInfo.depotFileHashes = {};
      const e = this.getDepotsHashesFromStorage(this.appInfo.appId);
      for (const [s, a] of Object.entries(e)) {
        const o = a.manifestId, n = a.hashes, i = $(`#depots.tab-pane .depot[data-depotid='${s}'][data-depotmanifestid]`);
        if (i.length > 0) {
          const d = i.attr("data-depotmanifestid");
          (d === o || d.length === 0) && (i.find("div[data-sk-depot-added]").attr({"data-sk-depot-added": "1"}), this.appInfo.depotFileHashes = {...this.appInfo.depotFileHashes, ...n});
        }
      }
      this.appInfo.depotFileHashesCount = Object.keys(this.appInfo.depotFileHashes).length, this.$modalWrapper.find("#sk-tab-depots-hash-checker-upload").val("");
    }
    appendDepotsHashCheckerTab() {
      const e = "sk-tab-depots-hash-checker", s = "Depots Hash Checker";
      let a = false;
      this.addTab(e, s, He), this.addTabLoader(e), this.$modalWrapper.find(`#${e}-upload`).on("change", async n => {
        const i = n.currentTarget.files;
        if (i.length > 0) {
          const d = i.item(0);
          if (d !== null) {
            const c = (await d.text()).trim().split(`
`), r = {};
            for (const T of c) {
              const g = T.trim().split(" *"), x = g[0];
              let C = g[1];
              typeof x < "u" && typeof C < "u" && (C = C.trim().replaceAll("/", "\\"), r[C] = x.trim().toLowerCase());
            }
            const u = Object.keys(r), f = u.length, h = r, p = {ok: [], not_ok: [], not_found: [], not_in_depot: [], errors: []};
            for (const [T, g] of Object.entries(this.appInfo.depotFileHashes)) {
              const x = `${g} *${T}`, C = u.find(k => k.toLowerCase() === T.toLowerCase());
              if (typeof C < "u") {
                const k = r[C], N = `${k} *${T}`, E = g.match(/(\w+)/gu);
                if (E !== null) {
                  const O = E[0], B = E[1];
                  typeof O < "u" && typeof B < "u" && (k.startsWith(O) && k.endsWith(B) ? p.ok.push(N) : p.not_ok.push(N));
                } else p.errors.push(N);
                delete h[C];
              } else p.not_found.push(x);
            }
            for (const [T, g] of Object.entries(h)) {
              const x = `${g} *${T}`;
              p.not_in_depot.push(x);
            }
            this.$modalWrapper.find(`#${e}-count-depots-files`).text(this.appInfo.depotFileHashesCount), this.$modalWrapper.find(`#${e}-count-upfile-files`).text(f);
            const w = {ok: {values: p.ok, condition: p.ok.length === this.appInfo.depotFileHashesCount, success: "text-success", fail: "text-danger"}, "not-ok": {values: p.not_ok, condition: p.not_ok.length === 0, success: "text-success", fail: "text-danger"}, "not-found": {values: p.not_found, condition: p.not_found.length === 0, success: "text-success", fail: "text-danger"}, "not-in-depot": {values: p.not_in_depot, condition: p.not_in_depot.length === 0, success: "text-success", fail: "text-warning"}, errors: {values: p.errors, condition: p.errors.length === 0, success: "text-success", fail: "text-danger"}};
            for (const [T, g] of Object.entries(w)) {
              const x = this.$modalWrapper.find(`#${e}-result-${T}-count`), C = this.$modalWrapper.find(`#${e}-result-${T}-color`), k = g.values;
              x.text(k.length), C.addClass(g.condition ? g.success : g.fail), this.setTextareaValue(`${e}-result-${T}`, k.join(`
`));
            }
            const A = ["************* NOT OK", ...p.not_ok, "", "************* NOT FOUND", ...p.not_found, "", "************* ERRORS (userscript related)", ...p.errors, "", "************* OK", ...p.ok, "", "************* NOT IN DEPOT", ...p.not_in_depot, ""];
            this.setTextareaValue(e, A.join(`
`));
          }
        }
      }), this.setDownloadAndTextareaValue(e, `${this.appInfo.appId}.sha1.check.result.txt`, ""), this.getTabLink(e).on("shown.bs.tab", () => {
        a || window.setTimeout(() => {
          this.removeTabLoader(e);
        }, this.appWaitTime), a = true;
      });
    }
  }
  class ct extends rt {
    constructor() {
      super();
    }
    run() {
      const t = new URL(window.location.href);
      if (t.hostname === "steamdb.info") {
        if (t.pathname.startsWith("/app/")) this.getSteamDBAppId(), this.getSteamDBAppName(), this.getSteamDBAppDLC(), this.appInfo.dlcCountAll > 0 && this.appendDLCTab(), b('a.tabnav-tab[aria-controls="linked"]').length > 0 && this.appendRelatedDLC(), this.getSteamDBAppAchievements(), this.appInfo.achievementsCount > 0 && (this.getSteamDBAppIconUrl(), this.getSteamDBAppLaunchBinaryPath(), this.appendAchievements()), b('a.tabnav-tab[aria-controls="items"]').length > 0 && this.appendItems(), b('a.tabnav-tab[aria-controls="depots"]').length > 0 && t.searchParams.has("branch") && (this.appendDepotsHashCheckerTable(), this.appendDepotsHashCheckerTab()); else if (t.pathname.startsWith("/depot/") && t.searchParams.has("show_hashes") && t.searchParams.has("a")) {
          const e = t.searchParams.get("a");
          this.getSteamDBAppDepotId(), this.getSteamDBAppDepotManifestId(), this.getSteamDBAppDepotHashes(), typeof this.appInfo.depotId < "u" && this.addDepotHashesToStorage(e, {[this.appInfo.depotId]: {manifestId: this.appInfo.depotManifestId, hashes: this.appInfo.depotFileHashes}}), window.close();
        }
      } else t.hostname === "store.steampowered.com" && (this.getSteamAppId(), this.getSteamAppName(), this.getSteamAppDLC(), this.appInfo.dlcCountAll > 0 && this.appendDLCTab());
      this.appendTemplate();
    }
  }
  const pt = new ct;
  pt.run();
}($, bootstrap, saveAs, Jimp, _, JSON5, fflate, dcodeIO.ByteBuffer, protobuf));
