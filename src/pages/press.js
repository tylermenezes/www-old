import React from 'react';
import Img from 'gatsby-image';
import { graphql } from 'gatsby';
import { GridColumn, GridLayout } from '../components/styled';
import Layout from '../templates/layout';

export default ({ data }) => (
  <Layout title="Press">
    <h2 style={{ marginTop: 0 }}>Presskit</h2>
    <GridLayout>
      <GridColumn width={3}>
        <Img fluid={data.headshot.childImageSharp.fluid} />
      </GridColumn>
      <GridColumn width={9}>
        <div style={{ marginTop: '-1em' }} dangerouslySetInnerHTML={{__html: data.content.html}} />
      </GridColumn>
    </GridLayout>

    <h3>Photos</h3>
    {data.photos.edges.map((n) => n.node).map((photo) => (
      <a href={photo.publicURL} target="_blank" style={{ marginRight: '1em' }} rel="noopener noreferrer">
        <Img fixed={photo.childImageSharp.fixed} alt="Headshot of Tyler Menezes" />
      </a>
    ))}

    <h3>Past Coverage</h3>
    {data.coverage.edges.map((n) => n.node).map((article) => (
      <li style={{marginBottom: '0.5em'}}>
        <a href={article.url} target="_blank">{article.title}</a><br />
        {article.publication}, {article.date}
      </li>
    ))}

  </Layout>
)

export const pageQuery = graphql`
  query {
    headshot: file(relativePath: { eq: "press/index.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 600, quality: 80) {
          ...GatsbyImageSharpFluid
        }
      }
    }

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
