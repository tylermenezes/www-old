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
    <div style={{ maxWidth: '800px', margin: '0 auto '}}>
      <div dangerouslySetInnerHTML={{__html: data.content.html}} style={{ marginTop: '-1em' }} />
    </div>
    <GridLayout>
      <GridColumn width={4} mobileCols={12} mobileRow={2}>
        <h3>Press Coverage</h3>
        {data.coverage.edges.map((n) => n.node).map((article) => (
          <li style={{marginBottom: '0.5em'}}>
            <a href={article.url} target="_blank">{article.title}</a><br />
            {article.publication}, {article.date}
          </li>
        ))}
      </GridColumn>
      <GridColumn width={4} mobileCols={12} mobileRow={3}>
        <h3>Publications</h3>
        {data.pubs.edges.map((n) => n.node).map((pub) => (
          <li style={{marginBottom: '0.5em'}}>
            <a href={pub.url} target="_blank">{pub.title}</a><br />
            {pub.publication}, {pub.date}
          </li>
        ))}
        <h3>Essays &amp; Blogs</h3>
        <PostListing posts={data.posts} />
      </GridColumn>
      <GridColumn width={4} mobileCols={12} mobileRow={1}>
        <h3>Press Photos</h3>
        {data.photos.edges.map((n) => n.node).map((photo) => (
          <a href={photo.publicURL} target="_blank" style={{ marginRight: '1em' }} rel="noopener noreferrer">
            <Img fixed={photo.childImageSharp.fixed} alt="Headshot of Tyler Menezes" />
          </a>
        ))}
        <h3>Notes</h3>
        <a href="https://publish.obsidian.md/tylermenezes">Go to Obsidian Publish &raquo;</a>
        <p>
          (Obsidian has all my research notes. They may not be useful or even correct.)
        </p>
      </GridColumn>
    </GridLayout>
  </Layout>
);

export const pageQuery = graphql`
  query {
    content: markdownRemark(fileAbsolutePath:{regex:"/.*\/content\/press\/index.md/"}) {
      html
    }

    pubs: allPubsYaml(sort: {fields: date, order: DESC}) {
      edges {
        node {
          date(formatString: "MMMM YYYY")
          title
          url
          publication
        }
      }
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
