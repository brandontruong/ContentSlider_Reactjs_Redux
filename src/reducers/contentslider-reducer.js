import * as types from '../actions/action-types';

export default (state = {
	data: {
		title: '',
		content: []
	},
	currentSlide: {},
	nextSlide: {},
	isCollapsed: false
}, action) => {
  switch (action.type) {
    case types.ON_COLLAPSIBLE_CLICKED:
		return {...state, isCollapsed: !state.isCollapsed};
	case types.NEXT_BUTTON_CLICKED:
		var currenSlide = Object.assign({}, state.data.content[action.value-1]);
		var nextSlide = Object.assign({}, state.data.content[action.value]);
		return {...state, currentSlide: currenSlide, nextSlide: nextSlide};
	case types.BACK_BUTTON_CLICKED:
		var currenSlide = Object.assign({}, state.data.content[action.value-1]);
		var nextSlide = Object.assign({}, state.data.content[action.value]);
		return {...state, currentSlide: currenSlide, nextSlide: nextSlide};
	case types.FETCH_DATA_FULFILLED:
		action.data.content.map(function(item, index) {
          item.key = index + 1;
          item.description = (item.description).replace(/\uFFFD/g, '-')
        });
		
		return {...state, currentSlide: action.data.content[0], nextSlide: action.data.content[1], data: action.data};
	case types.FETCH_DATA_REJECTED:
		return state;
    default:
		return state;
  }
};
