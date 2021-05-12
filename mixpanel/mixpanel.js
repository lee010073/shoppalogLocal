var mixpanel = require("mixpanel-browser");

mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_KEY, {
  protocol: 'https'
});

//let env_check = process.env.NODE_ENV === 'production';

let actions = {
  identify: (id) => {
    mixpanel.identify(id);
  },
  alias: (id) => {
    mixpanel.alias(id);
  },
  track: (name, props) => {
    mixpanel.track(name, props);
  },
  people: {
    set: (props) => {
      mixpanel.people.set(props);
    },
  },
};

export let Mixpanel = actions;
