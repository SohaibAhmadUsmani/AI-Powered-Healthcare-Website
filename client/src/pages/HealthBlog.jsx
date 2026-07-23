import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const fallbackPosts = [
  { id: 1, title: '5 Tips for a Healthy Heart', category: 'Health Tips', summary: 'Simple daily habits that support long-term heart health.' },
  { id: 2, title: 'Understanding Diabetes', category: 'Disease Information', summary: 'What causes diabetes, its symptoms, and how it is managed.' },
  { id: 3, title: 'Staying Hydrated in Summer', category: 'Health Tips', summary: 'Why water intake matters more during hot weather.' },
  { id: 4, title: 'Common Cold vs Flu', category: 'Disease Information', summary: 'Key differences to help you recognize what you have.' },
];

const categories = ['All', 'Health Tips', 'Disease Information'];

const HealthBlog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    fetch('http://localhost:5000/api/blog')
      .then((res) => {
        if (!res.ok) throw new Error('Request failed');
        return res.json();
      })
      .then((data) => {
        const formatted = data.map((p) => ({
          id: p._id,
          title: p.title,
          category: p.category,
          summary: p.summary,
        }));
        setPosts(formatted);
        setLoading(false);
      })
      .catch(() => {
        setPosts(fallbackPosts);
        setError(true);
        setLoading(false);
      });
  }, []);

  const filteredPosts =
    activeCategory === 'All' ? posts : posts.filter((p) => p.category === activeCategory);

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-sky-600 dark:text-sky-400 mb-2">Health Blog</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">Read health tips and disease information from our team.</p>

      {error && (
        <p className="text-amber-600 dark:text-amber-400 text-sm mb-4">Couldn't reach the live server — showing sample data instead.</p>
      )}

      <div className="flex gap-3 mb-8 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={
              'px-4 py-2 rounded-lg text-sm font-medium border transition-colors ' +
              (activeCategory === cat
                ? 'bg-sky-600 text-white border-sky-600'
                : 'bg-white dark:bg-white/5 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/10')
            }
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-gray-500 dark:text-gray-400">Loading articles...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <Link key={post.id} to={'/blog/' + post.id} className="block">
              <div className="bg-white dark:bg-white/5 border border-transparent dark:border-white/10 rounded-xl shadow-md p-6 hover-card-zoom h-full cursor-pointer">
                <span className="inline-block text-xs font-semibold text-sky-600 dark:text-sky-300 bg-sky-50 dark:bg-sky-900/40 px-2 py-1 rounded mb-3">
                  {post.category}
                </span>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{post.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{post.summary}</p>
                <span className="text-sky-600 dark:text-sky-400 text-sm font-medium mt-3 inline-block">Read more &rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default HealthBlog;