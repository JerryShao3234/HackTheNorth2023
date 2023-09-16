import HTMLFlipBook from "react-pageflip";
import * as React from 'react';

const PageCover = React.forwardRef((props, ref) => {
    return (
      <div className="page page-cover" ref={ref} data-density="hard">
        <div className="page-content">
          <h2>{props.children}</h2>
        </div>
      </div>
    );
  });
  
  const Page = React.forwardRef((props, ref) => {
    return (
      <div className="page" ref={ref}>
        <div className="page-content">
          <h2 className="page-header">Page header - {props.number}</h2>
          <div className="page-image"></div>
          <div className="page-text">{props.children}</div>
          <div className="page-footer">{props.number + 1}</div>
        </div>
      </div>
    );
  });
  
  class FlipBook extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        page: 0,
        totalPage: 0,
      };
    }
  
    nextButtonClick = () => {
      this.flipBook.getPageFlip().flipNext();
    };
  
    prevButtonClick = () => {
      this.flipBook.getPageFlip().flipPrev();
    };
  
    onPage = (e) => {
      this.setState({
        page: e.data,
      });
    };
  
    componentDidMount() {
      this.setState({
        totalPage: this.flipBook.getPageFlip().getPageCount(),
      });
    }
  
    render() {
      return (
        <div>
          <HTMLFlipBook
            width={550}
            height={733}
            size="stretch"
            minWidth={315}
            maxWidth={1000}
            minHeight={400}
            maxHeight={1533}
            maxShadowOpacity={0.5}
            showCover={true}
            mobileScrollSupport={true}
            onFlip={this.onPage}
            onChangeOrientation={this.onChangeOrientation}
            onChangeState={this.onChangeState}
            className="demo-book"
            ref={(el) => (this.flipBook = el)}
          >

            <PageCover>BOOK TITLE</PageCover>
            <Page number={1}>Lorem ipsum...</Page>
            <Page number={2}>Lorem ipsum...</Page>
            /*...*/
            <PageCover>THE END</PageCover>

          </HTMLFlipBook>
  
          <div className="container">
            <div>

              <button type="button" onClick={this.prevButtonClick}>
                Previous page
              </button>

              [<span>{this.state.page}</span> of
               <span>{this.state.totalPage}</span>]

              <button type="button" onClick={this.nextButtonClick}>
                Next page
              </button>

            </div>
            <div>

              State: <i>{this.state.state}</i>, orientation: <i>{this.state.orientation}</i>

            </div>
          </div>
        </div>
      );
    }
  }

  export default FlipBook;