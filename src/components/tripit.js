import React from 'react';

export default class TripIt extends React.Component {
  state = {
    html: null,
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      fetch('/.netlify/functions/tripit')
        .then((resp) => resp.text())
        .then((html) => this.setState({ html }));
    }
  }

  render() {
    const { html } = this.state;
    return <div dangerouslySetInnerHTML={{ __html: html }} />
  }
}
