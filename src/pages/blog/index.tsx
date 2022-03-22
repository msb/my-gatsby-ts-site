import * as React from 'react'
import { graphql, Link, PageProps } from 'gatsby'
import Layout from '../../components/layout'

type DataProps = {
  allMdx: {
    nodes: [{
      id: string
      frontmatter: {
        title: string
        date: Date
      }
      slug: string
    }]
  }
}

const BlogPage = ({ data: { allMdx: { nodes: posts } } }: PageProps<DataProps>) => {
  return (
    <Layout pageTitle="My Blog Posts">
      {
        posts.map(({ id, frontmatter: { title, date }, slug }) => (
          <article key={id}>
            <h2><Link to={`/blog/${slug}`} >{title}</Link></h2>
            <p>Posted: {date}</p>
          </article>
        ))
      }
    </Layout>
  )
}

export const query = graphql`
  query {
    allMdx(sort: {fields: frontmatter___date, order: DESC}) {
      nodes {
        frontmatter {
          date(formatString: "D MMMM YYYY")
          title
        }
        id
        slug
      }
    }
  }
`

export default BlogPage