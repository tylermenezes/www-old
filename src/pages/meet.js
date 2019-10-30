import React from 'react';
import styled from 'styled-components';
import Layout from '../templates/layout';
import { GridColumn, GridLayout } from '../components/styled';
import TripIt from '../components/tripit';

const BookFrame = styled.iframe`
  width: 100%;
  height: 60em;
  border: none;
`;

export default () => (
  <Layout title="Schedule Meeting">
    <h2 style={{ marginTop: 0 }}>Want to Grab Coffee?</h2>
    <p>
      If you'd like to grab coffee or talk on the phone, find a time that works for you below. If we don't already know
      each other, please reply to the invite with an agenda or how else I can help.{' '}
      <strong>Make sure you select the correct timezone.</strong>
    </p>
    <GridLayout style={{ paddingTop: '1em' }}>
      <GridColumn width={9}>
        <BookFrame src="https://www.vyte.in/tylermenezes?embed" frameborder="0">https://www.vyte.in/tylermenezes</BookFrame>
        <p><small>* I don't actually like coffee.</small></p>
      </GridColumn>
      <GridColumn width={3}>
        <h3 style={{ marginTop: 0 }}>Where Am I?</h3>
        <TripIt />
      </GridColumn>
    </GridLayout>
  </Layout>
)
