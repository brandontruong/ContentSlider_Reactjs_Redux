import React from 'react';

export default class CollapsiblePanel extends React.Component {
  render() {
		const {title, onClick, isCollapsed} = this.props;
		return (
		  <div className="collapsiblePanel">
			<h1><span><i className="fa fa-file fa-lg"></i></span>{title}</h1>
			<a className="collapsibleButton" href="javascript:;" onClick={onClick}><i  className={"fa fa-lg " + (isCollapsed ? 'fa-caret-down' : 'fa-caret-up')}></i></a>
		  </div>
		);
  }
}