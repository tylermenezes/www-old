import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import SEO from '../components/seo';
import { Theme, SiteHead, SiteTitle, SiteNav, SiteMain, SiteFooter } from '../components/styled';

export default ({ site, children, title }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={ ({ site }) =>
      <Theme>
        <SEO title={title} />
          <SiteHead>
            <SiteTitle><Link to="/">{site.siteMetadata.title}</Link></SiteTitle>
            <SiteNav>
              <li><Link to="/meet">Meet</Link></li>
            </SiteNav>
          </SiteHead>
        <SiteMain>{children}</SiteMain>
        <SiteFooter>
          <p>&copy; 2006-{new Date().getFullYear()}</p>
        </SiteFooter>
      </Theme>
    }
  />
)
