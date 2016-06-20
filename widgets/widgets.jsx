const React = require('react');
const ReactDOM = require('react-dom');
const Tabs = require('./tabs.jsx');
const Clock = require('./clock.jsx');

const Widgets = React.createClass({
  render() {
    const clock = () => {
      return(
        <Clock></Clock>
      );
    };

    const initialTabs = [
      {title: 'title0', content: 'content0content0content0content0'},
      {title: 'title1', content: 'content1content1content1content1'},
      {title: 'title2', content: 'content2content2content2content2'}
    ];

    return(
      <div>
        <Tabs tabData={initialTabs}></Tabs>
        <br />
        <Clock></Clock>
      </div>
    );
  }
});

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<Widgets />, document.getElementById('main'));
});
