import React from "react"
import Layout from "../components/layout"
import { Link, graphql } from "gatsby"

import StoryComment from "../components/story-comment"

class Story extends React.Component {
  render() {
    let width = 400
    if (typeof window !== `undefined`) {
      width = window.innerWidth
    }

    const story = this.props.data.hnStory
    // Flatten comments tree.
    const seenComments = {}
    const flattenComments = (comments, depth = 0) => {
      let childComments = []
      comments.forEach(comment => {
        if (!comment) {
          return
        }
        // Why of why is this necessary? Someone please explain recursion to me.
        if (seenComments[comment.id]) {
          return
        }
        comment.depth = depth
        seenComments[comment.id] = true
        childComments.push(comment)
        if (comment.children && comment.children.length > 0) {
          childComments = childComments.concat(
            flattenComments(comment.children, depth + 1)
          )
        }
      })

      return childComments
    }

    console.time(`recursion man`)
    const flatComemnts = flattenComments(story.children)
    console.timeEnd(`recursion man`)

    return (
      <Layout>
        <table style={{ paddingLeft: 20 }} border="0">
          <tbody>
            <tr className="athing" id={story.id}>
              <td className="title">
                <a href={story.url} className="storylink">
                  {story.title}
                </a>
                <span className="sitebit comhead">
                  {` `}(<span className="sitestr">{story.domain}</span>)
                </span>
              </td>
            </tr>
            <tr>
              <td className="subtext">
                <span className="score">{story.score} points</span>
                {` `}
                by
                {` `}
                <a href="" className="hnuser">
                  {story.by}
                </a>
                {` `}
                <span className="age">
                  <Link to={`/item/${story.id}/`}>{story.timeISO}</Link>
                </span>
                {` `}|{` `}
                <Link to={`/item/${story.id}/`}>
                  {story.descendants ? story.descendants : 0} comments
                </Link>
                {` `}
              </td>
            </tr>
            <tr style={{ height: `10px` }} />
          </tbody>
        </table>
        <table border="0" className="comment-tree">
          <tbody>
            <tr className="athing comtr " id="14174940">
              {flatComemnts.map(comment => (
                <StoryComment
                  key={comment.id}
                  comment={comment}
                  width={width}
                />
              ))}
            </tr>
          </tbody>
        </table>
      </Layout>
    )
  }
}

export default Story

export const pageQuery = graphql`
  query($id: String!) {
    hnStory(id: { eq: $id }) {
      id
      title
      url
      domain
      score
      timeISO(fromNow: true)
      descendants
      by
      children {
        ...StoryComment
        children {
          ...StoryComment
          children {
            ...StoryComment
            children {
              ...StoryComment
              children {
                ...StoryComment
                children {
                  ...StoryComment
                  children {
                    ...StoryComment
                    children {
                      ...StoryComment
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
