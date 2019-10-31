import React from "react"
import { graphql } from "gatsby"
import Layout from './layout';
import { PostTitle, PostMeta, PostBody, PostContents } from "../components/styled";
import { GridLayout, GridColumn } from "../components/styled/layout";

const postTitle = (frontmatter, timeToRead) => (
  <>
    <PostTitle>{frontmatter.title}</PostTitle>
    <PostMeta>{frontmatter.date} in &ldquo;{frontmatter.category}&rdquo; &mdash; {timeToRead} min read</PostMeta>
  </>
)

export default ({ data }) => {
  const { frontmatter, html, timeToRead, tableOfContents } = data.markdownRemark;

  return (
    <Layout title={frontmatter.title}>
      {tableOfContents && postTitle(frontmatter, timeToRead)}
      <GridLayout>
        <GridColumn width={8} start={!tableOfContents && 3}>
          {!tableOfContents && postTitle(frontmatter, timeToRead)}
          <PostBody dangerouslySetInnerHTML={{ __html: html }} />
        </GridColumn>
        {tableOfContents && (
          <GridColumn width={4} style={{ overflow: 'visible' }}>
            <PostContents dangerouslySetInnerHTML={{ __html: tableOfContents }} />
          </GridColumn>
        )}
      </GridLayout>
    </Layout>
  )
}
export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(
      frontmatter: { slug: { eq: $slug } }
      fileAbsolutePath: { regex: "/.*\/blog\/.*/" }
    ) {
      html
      timeToRead
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
        category
      }
      tableOfContents(
        pathToSlugField:"frontmatter.slug"
      )
    }
  }
`
