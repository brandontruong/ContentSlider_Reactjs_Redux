import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as contentsliderActions from '../actions/contentslider-actions';
import CollapsiblePanel from './CollapsiblePanel.js';
import SliderContentList from './SliderContentList.js';

class ContentSliderContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isCollapsed: false,
			currentSlide: {},
			datalist: [],
			title: ''
		};
	}
	componentWillMount() {
		this.props.actions.fetchData();
	}
	handleBarChange(event) {
		this.props.actions.barChanged(event.target.value);
	}
	handleButtonClicked(event) {
		this.props.actions.buttonClicked(parseInt(event.target.value, 10));
	}
	onCollapsibleClicked() {
		this.props.actions.onCollapsibleClicked();
	}
  
	render() {
		const {datalist, isCollapsed, currentSlide, title} = this.props;
		return (
			<div className="content-slider-application">
				<div className="container">
					<CollapsiblePanel title={title}
						isCollapsed={isCollapsed}
						onClick={this.onCollapsibleClicked.bind(this)} 
					/>
					<SliderContentList
						datalist={datalist}
						currentSlide={currentSlide}
						isCollapsed={isCollapsed}
					/>
				  </div>
			</div>
		);
	}
}

ContentSliderContainer.propTypes = {
	datalist: PropTypes.array.isRequired,
	title: PropTypes.string.isRequired,
	isCollapsed: PropTypes.bool.isRequired,
	currentSlide: PropTypes.object.isRequired,
	actions: PropTypes.object.isRequired
};

function mapStateToProps(state, props) {
	
	return {
		datalist: state.contentslider.data.content,
		title: state.contentslider.data.title,
		isCollapsed: state.contentslider.isCollapsed,
		currentSlide: state.contentslider.currentSlide
	};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(contentsliderActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentSliderContainer);
