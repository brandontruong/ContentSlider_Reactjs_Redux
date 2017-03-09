import * as types from './action-types';
import axios from 'axios';

export const fetchData = () => {
	return function(dispatch) {
		axios.get('/data/content.json')
			.then((response) => {
				dispatch({type: types.FETCH_DATA_FULFILLED, data: response.data})
			})
			.catch((err) => {
				dispatch({type: types.FETCH_DATA_REJECTED, data: err})
			})
	}
}

export const onCollapsibleClicked = (value) => {
  return {
    type: types.ON_COLLAPSIBLE_CLICKED,
    value
  };
}

export const barChanged = (selectedBar) => {
	return {
		type: types.BAR_CHANGED,
		selectedBar
	};
}