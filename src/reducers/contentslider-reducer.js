import * as types from '../actions/action-types';

export default (state = {
	data: {
		title: '',
		content: []
	},
	currentSlide: {},
	isCollapsed: false
}, action) => {
  switch (action.type) {
    case types.ON_COLLAPSIBLE_CLICKED:
		return {...state, isCollapsed: !state.isCollapsed};
	case types.BUTTON_CLICKED:
		var barValue = state.bars[state.selectedBar] + action.value;
		if (barValue < 0) {barValue = 0};
		var newBars = state.bars.slice();
		newBars[state.selectedBar] = barValue;
		return {...state, bars: newBars};
	case types.FETCH_DATA_FULFILLED:
		action.data.content.map(function(item, index) {
          item.key = index + 1;
          item.description = (item.description).replace(/\uFFFD/g, '-')
        });
		
		return {...state, currentSlide: action.data.content[0], data: action.data};
	case types.FETCH_DATA_REJECTED:
		return state;
    default:
		return state;
  }
};
