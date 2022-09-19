import React from 'react';
import { Link } from 'react-router-dom';

// Destructure props directly --> don't need to use props.property
const BlogList = ({blogs, title, deleteBlog}) => {

  return (
    <div className="blog-list">
      <h2>{title}</h2>
        {blogs.map( (element) => (
                <div className="blog-preview" key={element.id} style={styles.container}>
                    <Link to={`/blogs/${element.id}`}>
                      <h2>{element.title}</h2>
                      <p>Written by {element.author}</p>
                      <p style={styles.category}>Category: 
                        <span style={styles.span}>{element.category}</span>
                      </p>
                    </Link>
                    <button style={styles.delete} onClick={() => deleteBlog(element.id)}>Delete blog</button>
                </div>
            ))}
    </div>
  )
}

export default BlogList


const styles = {
  container: {
    position: 'relative'
  },
  category: {
    marginTop: '1rem',
  },
  span: {
    border: '1px solid black',
    borderRadius: '6px',
    marginLeft: '10px', 
    padding: '2px 10px'
  },
  delete: {
    position: 'absolute',
    right: '10px',
    bottom: '10px',
  }
}
