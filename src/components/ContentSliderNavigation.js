import React from 'react';

export default class ContentSliderNavigation extends React.Component {
  render() {
    const {datalist, currentSlide, nextSlide, nextButtonClicked, backButtonClicked} = this.props;

    let currentSlideKey = currentSlide.key;
    let numberOfSlides = datalist.length;
    let nextLink =
      <span className="next">
        <a href="#" onClick={nextButtonClicked} value={currentSlideKey+1}>{nextSlide.title}</a>
        <i className="fa fa-caret-right"></i>
      </span>;
  
    let backLink =
      <span className="back">
        <i className="fa fa-caret-left"></i>
        <a href="#" onClick={backButtonClicked} value={currentSlideKey-1}>Prev</a>
      </span>;

    if (this.props.currentSlide.key === undefined || numberOfSlides <= 0)
      return (<div></div>);

    let showNextLink = ( currentSlideKey=== 1) || (currentSlideKey > 1 && currentSlideKey < numberOfSlides);
    let showBackLink = (currentSlideKey === numberOfSlides) || (currentSlideKey > 1 && currentSlideKey < numberOfSlides);

    return (
      <div className="sliderNavigation">
        { showBackLink ? backLink : null }
        { showNextLink ? nextLink : null }    
      </div>
    );
  }
}
