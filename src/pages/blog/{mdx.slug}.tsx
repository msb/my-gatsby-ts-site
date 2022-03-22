import * as React from 'react'
import { graphql, PageProps } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'
import Layout from '../../components/layout'

type DataProps = {
  mdx: {
    body: string
    frontmatter: {
      title: string
      date: Date
      hero_image_alt: string
      hero_image: {
        childImageSharp: {
          gatsbyImageData: IGatsbyImageData
        }
      }
      hero_image_credit_link: string
      hero_image_credit_text: string
    }
    slug: string
  }
}

const BlogPost = ({ data: { mdx: { body, frontmatter: fm } } }: PageProps<DataProps>) => {
  const image = fm.hero_image.childImageSharp.gatsbyImageData
    return (
    <Layout pageTitle={fm.title}>
      <p>Posted: {fm.date}</p>
      <GatsbyImage
        image={image}
        alt={fm.hero_image_alt}
      />
      <p>
        Photo Credit:{" "}
        <a href={fm.hero_image_credit_link}>
          {fm.hero_image_credit_text}
        </a>
      </p>
      <MDXRenderer>
        {body}
      </MDXRenderer>
    </Layout>
  )
}

export const query = graphql`
  query ($id: String) {
    mdx(id: {eq: $id}) {
      frontmatter {
        title
        date(formatString: "MMMM D, YYYY")
        hero_image_alt
        hero_image_credit_link
        hero_image_credit_text
        hero_image {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
      body
    }
  }
`

export default BlogPost