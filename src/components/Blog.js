import React, {Component} from 'react';

export default class Blog extends Component {

  render() {
    if (this.props.isLoading) {
      return (
        <h1>Loading</h1>
      );
    }

    let posts = this.props.posts.map((post) =>
      <div className="post-list-item" key={post.title}>
        <div className="post-header">
          <div className="post-title">
            <h3><a href={post.link}>{post.title}</a></h3>
          </div>
          <div className="post-date">
            <h3>{post.published}
            </h3>
          </div>
        </div>
        <div className="post-summary">
          <p>{post.summary}</p>
        </div>
        <div className="post-list-footer">
          <a href={post.link}>Read More</a>
        </div>

      </div>
    )

    return (
      <div className="content-wrapper">
        <h1>Blog</h1>

        <div className="content">
          {posts}
        </div>

      </div>
    );
  }
};
