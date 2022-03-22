import * as React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import { container } from './layout.module.css'

type LayoutProps = {
  pageTitle: string
}

interface HeaderData {
  site: {
    siteMetadata: {
      title: string;
    },
  };
}

const Layout = ({ pageTitle, children }: React.PropsWithChildren<LayoutProps>) => {
  const data:HeaderData = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div className={container}>
      <title>{pageTitle} | {data.site.siteMetadata.title}</title>
      <header>{data.site.siteMetadata.title}</header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/blog">Blog</Link></li>
        </ul>
      </nav>
      <main>
        <h1>{pageTitle}</h1>
        {children}
      </main>
    </div>
  )
}

export default Layout