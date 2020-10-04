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
        <h3 style={{ marginTop: 0 }}>Press Coverage</h3>
        {data.coverage.edges.map((n) => n.node).map((article) => (
          <li style={{marginBottom: '0.5em'}}>
            <a href={article.url} target="_blank">{article.title}</a><br />
            {article.publication}, {article.date}
          </li>
        ))}
        <h3>Writing</h3>
        <PostListing posts={data.posts} />
      </GridColumn>
      <GridColumn width={8} mobileRow={1}>
        <div dangerouslySetInnerHTML={{__html: data.content.html}} style={{ marginTop: '-1em' }} />
        <h3>Press Photos</h3>
        {data.photos.edges.map((n) => n.node).map((photo) => (
          <a href={photo.publicURL} target="_blank" style={{ marginRight: '1em' }} rel="noopener noreferrer">
            <Img fixed={photo.childImageSharp.fixed} alt="Headshot of Tyler Menezes" />
          </a>
        ))}
      </GridColumn>
    </GridLayout>
  </Layout>
);

export const pageQuery = graphql`
  query {
    content: markdownRemark(fileAbsolutePath:{regex:"/.*\/content\/press\/index.md/"}) {
      html
    }

    coverage: allCoverageYaml(sort: {fields: date, order: DESC}) {
      edges {
        node {
          date(formatString: "YYYY")
          title
          url
          publication
        }
      }
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

    photos: allFile(filter: {relativeDirectory: {eq: "press/photos"}}) {
      edges {
        node {
          publicURL
          childImageSharp {
            fixed(width: 100, height: 100, quality: 80) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
  }
`
