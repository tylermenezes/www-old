import React from 'react';
import Link from 'gatsby-link';
import { graphql } from 'gatsby';
import styled from 'styled-components';

const PostList = styled.ul`
  padding: 0;
  margin-top: 0;
  li {
    list-style-type: none;
    a {
      text-decoration: none;
    }
  }
`;

const PostItem = styled.div`
  margin-bottom: ${({ theme }) => theme.modularScale(0)};

  div {
    font-family: ${({ theme }) => theme.font.body};
    font-size: ${({ theme }) => theme.modularScale(1)};
    color: ${({ theme }) => theme.color.black};
    font-weight: 500;
  }

  span {
    font-family: ${({ theme }) => theme.font.mono};
    font-size: ${({ theme }) => theme.modularScale(0)};
    color: ${({ theme }) => theme.color.grey[1]};
  }
`

export default ({ posts }) => (
  <PostList>
    {posts.edges.map((n) => n.node).map((post) => (
      <li>
        <Link to={post.frontmatter.slug}>
          <PostItem post={post}>
            <div>{post.frontmatter.title}</div>
            <span>{post.frontmatter.date} &mdash; {post.frontmatter.category}</span>
          </PostItem>
        </Link>
      </li>
    ))}
  </PostList>
)

export const query = graphql`
  fragment PostListingItems on MarkdownRemarkConnection {
    edges {
      node {
        timeToRead
        frontmatter {
          slug
          title
          date(formatString: "MMMM DD, YYYY")
          category
        }
      }
    }
  }
`;
