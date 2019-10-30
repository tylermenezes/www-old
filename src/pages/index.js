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
      <GridColumn width={4}>
        <h3 style={{ marginTop: 0 }}>Writing On Startups</h3>
        <PostListing posts={data.startups} />

        <h3>Writing On Tech</h3>
        <PostListing posts={data.tech} />

        <h3>Writing On Education</h3>
        <PostListing posts={data.education} />
      </GridColumn>

      <GridColumn width={8}>
        <div dangerouslySetInnerHTML={{__html: data.content.html}} style={{ marginTop: '-1em' }} />
        <h3>Current/Upcoming Travel</h3>
        <TripIt />
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


    startups: allMarkdownRemark (
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { fileAbsolutePath: { regex: "/.*\/blog\/.*/" }, frontmatter: {category: {eq: "Startups"} } }
    ) {
      ...PostListingItems
    }

    tech: allMarkdownRemark (
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { fileAbsolutePath: { regex: "/.*\/blog\/.*/" }, frontmatter: {category: {eq: "Technology"} } }
    ) {
      ...PostListingItems
    }

    education: allMarkdownRemark (
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { fileAbsolutePath: { regex: "/.*\/blog\/.*/" }, frontmatter: {category: {eq: "Education"} } }
    ) {
      ...PostListingItems
    }
  }
`
