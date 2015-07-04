var appRequireConfig = {
    "locale" : "en",
    "shim" : {
        "backbone" : {
            "deps" : [ "underscore", "jquery", "json2" ],
            "exports" : "Backbone"
        },
        "underscore" : {
            "exports" : "_"
        },
        "backbone.associations" : {
            "deps" : ["backbone", "underscore"],
            "exports" : "Backbone.AssociatedModel"
        },
        "jquery.rotate" : {
            "deps" : [ "jquery" ]
        },
        "jquery.color.utils" : {
            "deps" : [ "jquery" ]
        },
        "jquery.typer" : {
            "deps" : [ "jquery" ]
        },
        "jquery.svg" : {
            "deps" : [ "jquery" ]
        },
        "jquery.svganim" : {
            "deps" : [ "jquery.svg" ]
        },
        "select2" : {
            "deps" : [ "jquery" ]
        },
        "jstorage" : {
            "deps" : [ "json2", "jquery" ],
            "exports" : "$"
        },
        "modernizr" : {
            "deps" : [ "jquery" ]
        },
        "foundation" : {
            "deps" : [ "jquery", "modernizr" ]
        },
        "foundation.topbar" : {
            "deps" : [ "jquery", "foundation"]
        },
        "foundation.tooltip" : {
            "deps" : [ "jquery", "foundation"]
        }
    },
    "paths" : {
        "jquery" : "libs/jquery-1.9.1",
        "jquery.color" : "libs/jquery.color-2.1.0",
        "jquery.color.utils" : "libs/jquery.color.utils-0.1.0",
        "hbs" : "libs/hbs",
        "backbone" : "libs/backbone-1.0.0",
        "mustache" : "libs/mustache-0.7.2",
        "backbone.associations" : "libs/backbone-associations-0.5.1",
        "backbone.babysitter" : "libs/backbone.babysitter-0.0.5",
        "backbone.wreqr" : "libs/backbone.wreqr-0.2.0",
        "backbone.marionette" : "libs/backbone.marionette-1.0.2",
        "backbone.marionette.handlebars" : "libs/backbone.marionette.handlebars",
        "backbone.marionette.override" : "config/marionette",
        "backbone.syphon" : "libs/backbone.syphon-0.4.1",
        "backbone.epoxy" : "libs/backbone.epoxy-1.0.1",
        "json2" : "libs/json2",
        "underscore" : "libs/underscore-1.4.4",
        "handlebars" : "libs/Handlebars",
        "i18nprecompile" : "libs/i18nprecompile",
        "jquery.rotate" : "libs/jquery.rotate-2.2",
        "jquery.typer" : "libs/jquery.typer",
        "jquery.svg" : "libs/jquery.svg",
        "jquery.svganim" : "libs/jquery.svganim",
        "jquery.spin" : "libs/jquery.spin-1.3.0",
        "select2" : "libs/select2-3.4.1",
        "rx" : "libs/rx.modern-2.1.10",
        "rx.time" : "libs/rx.time-2.1.10",
        "rx.backbone" : "libs/rx.backbone",
        "rx.jquery" : "libs/rx.jquery-0.0.2",
        "foundation" : "bower_components/foundation/js/foundation",
        "foundation.topbar" : "bower_components/foundation/js/foundation/foundation.topbar",
        "foundation.tooltip" : "bower_components/foundation/js/foundation/foundation.tooltip",
        "moment" : "libs/moment-2.0.0",
        "jstorage" : "libs/jstorage",
        "modernizr" : "bower_components/modernizr/modernizr",
        "spin" : "libs/spin-1.3.0",
        "messageformat" : "libs/messageformat-0.1.6",
        "croppic": "bower_components/croppic/croppic"
    }
};

//var tests = Object.keys(window.__karma__.files).filter(function (file) {
//    return /\.spec\.js$/.test(file);
//});
////console.log(window.__karma__.files);
//var testRequireConfig = {
//    // Testacular serves files from '/base'
//    baseUrl: '/base/src/main/webapp/js',
//    paths: {
//        require: '../lib/require',
//        text: '../lib/text',
//        jquery: 'libs/jquery-1.9.1',
//        chai: '../../../../node_modules/chai/chai',
//        sinon: '../../../../node_modules/sinon/pkg/sinon',
//        "sinon-chai": '../../../../node_modules/sinon-chai/lib/sinon-chai',
//        "chai-changes": '../../../../node_modules/chai-backbone/node_modules/chai-changes/chai-changes',
//        "chai-backbone": '../../../../node_modules/chai-backbone/chai-backbone'
//    },
//    // ask requirejs to load these files (all our tests)
//    deps: tests,
//    // start test run, once requirejs is done
//    callback: window.__karma__.start,
//
//}

appRequireConfig.baseUrl = testRequireConfig.baseUrl;
//appRequireConfig.paths = mergeObjects(testRequireConfig.paths, appRequireConfig.paths);
//appRequireConfig.deps = appRequireConfig.deps.concat(testRequireConfig.deps);
//appRequireConfig.callback = testRequireConfig.callback;

require(appRequireConfig);