const React = require('react');

// Widgets will pass to props:
//   tabData: [
//     {title: 'title1', content: 'content1'},
//     {title: 'title2', content: 'content2'},
//     ...
//   ]
const Tabs = React.createClass({
  getInitialState () {
    return ({
      idx: 0
    });
  },

  swapTab (newIdx) {
    this.setState({idx: newIdx});
  },

  render () {
    const currentContent = this.props.tabData[this.state.idx].content;

    const tabs = () => {
      return this.props.tabData.map((tab, idx) => {
        return (
          <li key={idx} className="tab">
            <h1 onClick={this.swapTab.bind(this, idx)}>{tab.title}</h1>
          </li>
        );
      });
    };

    return (
      <div className="tabs">
        <ul className="tab-list">{tabs()}</ul>
        <article className="tab-content">{currentContent}</article>
      </div>
    );
  }
});

module.exports = Tabs;
