import { configure, setAddon, addDecorator } from '@kadira/storybook';
import { disable } from 'react-komposer';

disable();

function loadStories() {
  require('../client/modules/message/components/.stories/index.js');
  require('../client/modules/profile/components/.stories/index.js');
  require('../client/modules/post/components/.stories/index.js');
  require('../client/modules/home/components/.stories/index.js');
  require('../client/modules/header/components/.stories/index.js');
  require('expose?$!expose?jQuery!jquery');
  require("bootstrap-webpack");

  // custom css
  require('../client/assets/stylesheets/custom_style.css');

  // require as many as stories you need.
  require('../client/modules/core/components/.stories/index.js');
}

configure(loadStories, module);
