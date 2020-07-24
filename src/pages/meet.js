import React from 'react';
import Layout from '../templates/layout';
import { GridColumn, GridLayout } from '../components/styled';
import Calendly from '../components/calendly';

export default () => (
  <Layout title="Schedule Meeting">
    <h2 style={{ marginTop: 0 }}>Request a Meeting</h2>
    <p>
      Find a time that works for you below. If we don't already know
      each other, please add an agenda in the message field.{' '}
      <strong>Make sure you select the correct timezone.</strong>
    </p>
    <p>(If you're requesting an in-person meeting, please check my location on the Tripit badge on the homepage.)</p>
    <GridLayout style={{ paddingTop: '1em' }}>
      <GridColumn width={12} mobileRow={2}>
        <Calendly slug="tyler-menezes/30min?hide_landing_page_details=1&hide_event_type_details=1" />
      </GridColumn>
    </GridLayout>
  </Layout>
)
