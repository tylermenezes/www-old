import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import Layout from '../templates/layout';
import styled from 'styled-components';
import TripIt from '../components/tripit';
import PostListing from '../components/postListing';
import { GridColumn, GridLayout } from '../components/styled';

const HeroBox = styled.div`
  margin-bottom: ${({ theme }) => theme.modularScale(4)};
`;

export default ({ data }) => (
  <Layout>
    <HeroBox>
      <Img fluid={data.hero.childImageSharp.fluid} />
    </HeroBox>
    <GridLayout>
      <GridColumn width={4} mobileRow={2}>
        <h3 style={{ marginTop: 0 }}>Writing</h3>
        <PostListing posts={data.posts} />
      </GridColumn>
    </GridLayout>
  </Layout>
);

export const pageQuery = graphql`
  query {
    content: markdownRemark(fileAbsolutePath:{regex:"/.*\/content\/index.md/"}) {
      html
    }

    hero: file(relativePath: { eq: "index.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1024, quality: 80) {
          ...GatsbyImageSharpFluid
        }
      }
    }

    posts: allMarkdownRemark (
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { fileAbsolutePath: { regex: "/.*\/blog\/.*/" } }
    ) {
      ...PostListingItems
    }
  }
`
