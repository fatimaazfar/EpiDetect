import React, { useState } from 'react';
import axios from 'axios';
import './BlogPostForm.css';

const BlogPostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/blogs', { title, content }, {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      console.log(res.data);
      setTitle('');
      setContent('');
      setError('');
    } catch (err) {
      console.error(err);
      setError('Error creating blog post');
    }
  };

  return (
    <div className="blog-post-form-container">
      <h2>Create Blog Post</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Content</label>
          <textarea
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Submit</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default BlogPostForm;
