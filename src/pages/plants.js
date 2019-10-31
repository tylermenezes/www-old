import React from 'react';
import Img from 'gatsby-image';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import { GridColumn, GridLayout } from '../components/styled';
import Layout from '../templates/layout';

const PlantName = styled.div`
  margin-top: ${({ theme }) => theme.modularScale(-1)};
  margin-bottom: ${({ theme }) => theme.modularScale(2)};
  font-family: ${({ theme }) => theme.font.mono};
`;

export default ({ data }) => (
  <Layout title="Press">
    <GridLayout>
      <GridColumn width={7}>
        <a href="https://plantcam.weirdvector.xyz/large.mjpg" target="_blank" rel="noopener noreferrer">
          <img
            src="https://plantcam.weirdvector.xyz/small.mjpg"
            style={{ width: '100%', height: 'auto' }}
            alt="Plant livestream"
          />
        </a>
      </GridColumn>
      <GridColumn width={5}>
        <h2 style={{ marginTop: 0 }}>PlantCam</h2>
        <p>This is a live video feed of the succulents I grow in my closet.</p>
        <p>If you see me on the stream, send me a screenshot and I'll send you a signed photo of a plant.</p>
      </GridColumn>
    </GridLayout>

    <h2>Meet the Plants</h2>
    <GridLayout mobileCols={8}>
      {data.photos.edges.map((n) => n.node).map((photo) => (
        <GridColumn width={4} style={{ textAlign: 'center' }}>
          <Img fluid={photo.childImageSharp.fluid} alt="" />
          <PlantName>{photo.base[0].toUpperCase()}{photo.base.split('.')[0].replace('-', ' ').slice(1)}</PlantName>
        </GridColumn>
      ))}
    </GridLayout>
  </Layout>
)

export const pageQuery = graphql`
  query {
    photos: allFile(filter: {relativeDirectory: {eq: "plants"}}) {
      edges {
        node {
          base
          childImageSharp {
            fluid(maxWidth: 250, quality: 80) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
