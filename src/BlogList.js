

// import App from './App'

const BlogList = ({ blogs, handleClick }) => {



  return (
    <div className="blog-list">


      {blogs.map(blog => (
        <div className="blog-preview" key={blog.id} >
          <h2>{blog.item}</h2>
          <p>Quantity - {blog.quantity}</p>
          <div class="space">
          </div>
          <button onClick={() => handleClick(blog.id)}>delete</button>
        </div>
      ))}
    </div>
  );
}

export default BlogList;