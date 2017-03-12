import React from 'react';
import Slider from './Slider.js';

export default class SliderContentList extends React.Component {
  render() {
	const {datalist, isCollapsed, currentSlide} = this.props;
	
    return (
		<ul className="sliders">
			{
				datalist.map((item, index) => {
					let active = currentSlide.key === item.key;
					return (
						<li key={item.key} className={(active ? 'current' : '')}>
						<Slider data={item}  />
						</li>
					);
				}
			)}
		</ul>
    )
  }
}
