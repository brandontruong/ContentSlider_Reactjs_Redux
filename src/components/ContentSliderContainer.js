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
			datalist: [],
			title: ''
		};
	}
	componentWillMount() {
		this.props.actions.fetchData();
	}
	nextButtonClick(event) {
		this.props.actions.nextButtonClick(event.target.value);
	}
	backButtonClick(event) {
		this.props.actions.backButtonClick(event.target.value);
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
					<div className={"accordion-content " + (isCollapsed ? 'slide-up' : '')}>  
						<SliderContentList
							datalist={datalist}
							currentSlide={currentSlide}
							isCollapsed={isCollapsed}
						/>
						<ContentSliderNavigation 
							nextButtonClick={this.nextButtonClick.bind(this)} 
							backButtonClick={this.backButtonClick.bind(this)} 
							currentSlide={currentSlide}
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
