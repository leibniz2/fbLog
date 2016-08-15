import {createApp} from 'mantra-core';
import initContext from './configs/context';
import {DocHead} from 'meteor/kadira:dochead';

// modules
import coreModule from './modules/core';
import headerModule from './modules/header';
import homeModule from './modules/home';
import postModule from './modules/post';
import profileModule from './modules/profile';
import messageModule from './modules/message';

// init context
const context = initContext();

// create app
const app = createApp(context);
app.loadModule(coreModule);
app.loadModule(headerModule);
app.loadModule(homeModule);
app.loadModule(postModule);
app.loadModule(profileModule);
app.loadModule(messageModule);
app.init();

var title = 'FBL';
DocHead.setTitle(title);

// Loading Javascript
var gaScript = '/bootstrap-3.3.7/js/bootstrap.min.js';
DocHead.loadScript(gaScript);

// Loadintg CSS
var cssLink = {rel: "stylesheet", href: '/bootstrap-3.3.7/css/bootstrap.min.css'};
var customFont = {rel: "stylesheet", href: "https://fonts.googleapis.com/css?family=Slabo+27px"};
var customStuff = { rel: "stylesheet", href: "http://dreamtemplate.com/dreamcodes/divider/css/tsc_divider.css"};
DocHead.addLink(cssLink);
DocHead.addLink(customFont);
DocHead.addLink(customStuff);

// Loading Meta tag
var metaInfo = {name: "description", content: "FBL App"};
DocHead.addMeta(metaInfo);

var metaViewPort = {name: "viewport", content: "width=device-width, initial-scale=1"};
DocHead.addMeta(metaViewPort);
