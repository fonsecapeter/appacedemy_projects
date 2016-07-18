const React = require('react');
const ReactDOM = require('react-dom');
const Tabs = require('./tabs.jsx');
const Clock = require('./clock.jsx');
const Weather = require('./weather.jsx');
const Autocomplete = require('./autocomplete.jsx');
const Widgets = React.createClass({
  render() {

    // const clock = () => {
    //   return(
    //     <Clock></Clock>
    //   );
    // };

    const initialTabs = [
      {title: 'first tab', content: "Art party thundercats street art keffiyeh, yr small batch bitters cardigan health goth chillwave austin. XOXO green juice vice, chillwave intelligentsia brunch cred next level chicharrones williamsburg wolf. Portland banjo you probably haven't heard of them health goth, yuccie plaid pitchfork YOLO. Crucifix flexitarian asymmetrical, DIY pinterest street art hammock godard shoreditch selvage narwhal tattooed drinking vinegar post-ironic. Chia drinking vinegar four dollar toast selvage, mumblecore mlkshk brunch humblebrag sriracha listicle ennui pour-over sartorial. Cardigan waistcoat banjo authentic man braid. Artisan YOLO aesthetic, stumptown cronut quinoa lo-fi."},
      {title: 'second tab', content: "Seitan mlkshk gentrify neutra, vinyl tofu locavore. Raw denim street art viral slow-carb tousled. Cornhole brunch single-origin coffee scenester wayfarers, truffaut sustainable schlitz tofu master cleanse lomo plaid pour-over. 3 wolf moon tousled man bun poutine shabby chic, pabst seitan ramps echo park 90's single-origin coffee beard organic four loko bitters. Banjo four loko master cleanse godard chillwave, ethical austin stumptown. Bushwick fixie drinking vinegar sustainable. Everyday carry jean shorts plaid yr, flannel blog street art chambray forage church-key migas knausgaard celiac bushwick narwhal."},
      {title: 'third tab', content: "Cliche deep v plaid tousled, crucifix trust fund direct trade pop-up leggings artisan vice brunch kickstarter cornhole. Everyday carry freegan cray dreamcatcher, trust fund pinterest ennui marfa. Bicycle rights retro ugh slow-carb, 90's viral plaid williamsburg distillery wayfarers bitters mlkshk keytar. XOXO bespoke kombucha, keytar chartreuse distillery asymmetrical migas banjo echo park. Tumblr irony meditation, craft beer portland paleo man bun mixtape blue bottle. Butcher bicycle rights disrupt seitan. Forage hammock blue bottle, wolf narwhal cliche franzen gentrify iPhone plaid cold-pressed."},
    ];

    const listNames = ["Ken", "Peter","Jack","Bob"];

    return(
      <div>
        <Tabs tabData={initialTabs}></Tabs>
        <br />
        <Clock></Clock>
        <Weather></Weather>
        <Autocomplete listNames={listNames}></Autocomplete>
      </div>
    );
  }
});

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<Widgets />, document.getElementById('main'));
});
