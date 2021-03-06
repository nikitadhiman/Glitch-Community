import React from 'react';
import PropTypes from 'prop-types';

import _ from 'lodash';
import * as d3Array from 'd3-array';

const binData = d3Array.histogram().value(function(data) {
  return data['@timestamp'];
});

const createHistogram = (buckets) => {
  let data = binData(buckets);
  let histogram = [];
  data.forEach (bin => {
    let uniqueAppViews = 0;
    let totalRemixes = 0;
    // let codeViews = []
    bin.forEach (data => {
      totalRemixes += data.analytics.remixes;
      uniqueAppViews += data.analytics.uniqueIps;
      // referrers.push(data.analytics.referrers)
    });
    histogram.push({
      time: bin.x0,
      appViews: uniqueAppViews,
      remixes: totalRemixes,
    });
  });
  return histogram;
};

const chartColumns = (analytics) => {
  const buckets = analytics.buckets;
  let histogram = createHistogram(buckets);
  let timestamps = ['x'];
  let remixes = ['Remixes'];
  let appViews = ['Unique App Views'];
  // let codeViews = ['Code Views']
  histogram.shift();
  histogram.forEach(bucket => {
    timestamps.push(bucket.time);
    appViews.push(bucket.appViews);
    remixes.push(bucket.remixes);
  });
  return [timestamps, appViews, remixes];
};

const dateFormat = (currentTimeFrame) => {
  if (currentTimeFrame === "Last 24 Hours") {
    return "%H:%M %p";
  } 
  return "%b-%d";
};

const renderChart = (c3, analytics, currentTimeFrame) => {
  let columns = [];
  if (!_.isEmpty(analytics)) {
    columns = chartColumns(analytics);
  }
  
  // eslint-disable-next-line no-unused-vars
  var chart = c3.generate({
    size: {
      height: 200,
    },
    data: {
      x: 'x',
      xFormat: dateFormat(currentTimeFrame),
      columns: columns
    },
    axis: {
      x: {
        type: 'timeseries',
        tick: {
          format: dateFormat(currentTimeFrame),
          fit: true,
          culling: {
            max: 12
          },
        }
      },
    },
  });
};

class TeamAnalyticsActivity extends React.Component {
  constructor(props) {
    super(props);
  }
  
  componentDidUpdate(prevProps) {
    if (
      prevProps.isGettingData === true && 
      this.props.isGettingData === false
    ) {
      renderChart(this.props.c3, this.props.analytics, this.props.currentTimeFrame);
    }
  }
  
  render() {
    return null;
  }
}

TeamAnalyticsActivity.propTypes = {
  c3: PropTypes.object.isRequired, 
  analytics: PropTypes.object.isRequired, 
  currentTimeFrame: PropTypes.string.isRequired,
  isGettingData: PropTypes.bool.isRequired,
};

export default TeamAnalyticsActivity;
