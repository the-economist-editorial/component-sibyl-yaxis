import React from 'react';
import d3 from 'd3';


export default class D3yAxis extends React.Component {

// PROP TYPES
  static get propTypes() {
    return {
      test: React.PropTypes.string,
      config: React.PropTypes.object,
      axis: React.PropTypes.func,
    };
  }

  // DEFAULT PROPS
  static get defaultProps() {
    return {
      axis: d3.svg.axis(),
    };
  }

  // CONSTRUCTOR
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillMount() {
  }

  // COMPONENT DID MOUNT
  componentDidMount() {
    this.setYAxisConfig();
    this.updateYAxis();
  }

  // COMPONENT DID UPDATE
  componentDidUpdate() {
    this.setYAxisConfig();
    this.updateYAxis();
  }

  // GET X-AXIS CONFIG

  setYAxisConfig() {
    const config = this.props.config;
    const yScale = config.scale;
    const orient = config.orient;
    const tickSize = config.tickSize;
    this.props.axis
      .scale(yScale)
      .orient(orient)
      .tickPadding(5)
      // Ticks need to be at an appropriate 'density', rather than a fixed number...
      .ticks(5)
      .tickSize(tickSize);
  }

  getAxisGroupTransformString() {
    let width = 0;
    if (this.props.config.orient === 'right') {
      width = this.props.config.bounds.width;
    }
    return 'translate(' + width + ', 0)';
  }

  // UPDATE Y-AXIS
  // Called directly on the DOM to update the axis
 updateYAxis() {
   const axisG = d3.select('.d3-yaxis-group');
   const duration = this.props.config.duration;
   const transform = this.getAxisGroupTransformString();
    // I'm trying to chain the transitions if the axis moves
    // from bottom to top, as well as changing scale. This
    // is only partly successful, because I also need to address
    // the orientation (top/bottom), which flips the ticks and strings...
   axisG
     .transition().duration(duration)
     .attr('transform', transform)
       .transition().delay(duration).duration(duration)
       .call(this.props.axis)
       ;
    // Failed attempt at separating re-orientation from move...
    // this.props.axis.orient(this.props.config.orient);
    // axisG
    //  .transition().delay(duration*3).duration(duration)
    //     .call(this.props.axis)
        // ;
 }

  // RENDER
  render() {
    // Axis group
    return (
      <g className="d3-yaxis-group" ref="axisGroup"/>
    );
  }
}
