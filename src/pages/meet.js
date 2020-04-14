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
      each other, please add an agenda in the message field.{' '}
      <strong>Make sure you select the correct timezone.</strong>
    </p>
    <p>(If you're requesting an in-person meeting, please check my location on the Tripit badge on the homepage.)</p>
    <GridLayout style={{ paddingTop: '1em' }}>
      <GridColumn width={12} mobileRow={2}>
        <BookFrame src="https://www.vyte.in/tylermenezes?embed" frameborder="0">https://www.vyte.in/tylermenezes</BookFrame>
      </GridColumn>
    </GridLayout>
  </Layout>
)
