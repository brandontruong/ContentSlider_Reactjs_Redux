import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as contentsliderActions from '../actions/contentslider-actions';
import CollapsiblePanel from './CollapsiblePanel.js';
import SliderContentList from './SliderContentList.js';
import ContentSliderNavigation from './ContentSliderNavigation.js';

class ContentSliderContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isCollapsed: false,
			currentSlide: {},
			nextSlide: {},
			datalist: [],
			title: ''
		};
	}
	componentWillMount() {
		this.props.actions.fetchData();
	}
	nextButtonClicked(event) {
		this.props.actions.nextButtonClicked(event.target.getAttribute('value'));
	}
	backButtonClicked(event) {
		this.props.actions.backButtonClicked(event.target.getAttribute('value'));
	}
	onCollapsibleClicked() {
		this.props.actions.onCollapsibleClicked();
	}
  
	render() {
		const {datalist, isCollapsed, currentSlide, nextSlide, title} = this.props;
		return (
			<div className="content-slider-application">
				<div className="container">
					<CollapsiblePanel title={title}
						isCollapsed={isCollapsed}
						onClick={this.onCollapsibleClicked.bind(this)} 
					/>
					<div className={"accordion-content " + (isCollapsed ? 'slide-up' : '')}>  
						<SliderContentList
							datalist={datalist}
							currentSlide={currentSlide}
							isCollapsed={isCollapsed}
						/>
						<ContentSliderNavigation 
							nextButtonClicked={this.nextButtonClicked.bind(this)} 
							backButtonClicked={this.backButtonClicked.bind(this)} 
							currentSlide={currentSlide}
							nextSlide={nextSlide}
							datalist={this.props.datalist}
						/>
					</div>	
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
	nextSlide: PropTypes.object,
	actions: PropTypes.object.isRequired
};

function mapStateToProps(state, props) {
	
	return {
		datalist: state.contentslider.data.content,
		title: state.contentslider.data.title,
		isCollapsed: state.contentslider.isCollapsed,
		currentSlide: state.contentslider.currentSlide,
		nextSlide: state.contentslider.nextSlide
	};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(contentsliderActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentSliderContainer);
