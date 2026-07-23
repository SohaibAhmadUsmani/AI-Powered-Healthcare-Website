import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const BlogDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/api/blog/' + id)
      .then((res) => {
        if (!res.ok) throw new Error('Request failed');
        return res.json();
      })
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p className="max-w-3xl mx-auto px-4 py-12 text-gray-500 dark:text-gray-400">Loading article...</p>;
  }

  if (error || !post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <p className="text-red-500 mb-4">Sorry, this article could not be found.</p>
        <Link to="/blog" className="text-sky-600 dark:text-sky-400 underline text-sm">Back to Health Blog</Link>
      </div>
    );
  }

  return (
    <section className="max-w-3xl mx-auto px-4 py-12">
      <Link to="/blog" className="text-sky-600 dark:text-sky-400 text-sm mb-6 inline-block">&larr; Back to Health Blog</Link>

      <div className="mt-4">
        <span className="inline-block text-xs font-semibold text-sky-600 dark:text-sky-300 bg-sky-50 dark:bg-sky-900/40 px-2 py-1 rounded mb-4">
          {post.category}
        </span>

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{post.title}</h1>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">{post.content || post.summary}</p>
      </div>
    </section>
  );
};

export default BlogDetails;