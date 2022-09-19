import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Create = () => {

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('Mike');
  const [category, setCategory] = useState('Travel');
  const [isPending, setIsPending] = useState(false);
  const [blogAdded, setBlogAdded] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = { title, body, author, category };

    setIsPending(true);
    setBlogAdded('');

    fetch('http://localhost:8000/blogs', {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(blog)
    })
    .then(() => {
      setIsPending(false);
      setBlogAdded('A new blog has been added!');
      navigate('/home');
    })
  }

  return (
    <div className="create">
      <h2>Add a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="blog-title">Blog title:</label>
        <input 
          id="blog-title"
          type="text" 
          required 
          placeholder="Blog title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="blog-body">Blog body:</label>
        <textarea
          id="blog-body"
          required
          placeholder="Blog body...."
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <label htmlFor="blog-author">Blog author:</label>
        <input
          id="blog-author"
          type="text"
          required
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <label htmlFor="blog-category">Category:</label>
        <select
          id="blog-category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Travel">Travel</option>
          <option value="Adventure">Adventure</option>
          <option value="Sport">Sport</option>
          <option value="Tech">Tech</option>
          <option value="News">News</option>
          <option value="School">School</option>
        </select>
        {!isPending ? <button>Add Blog</button> : <button disabled>Adding Blog...</button>}
      </form>
      <p style={{marginTop: '1rem'}}>{blogAdded}</p>
    </div>
  );
}
 
export default Create;