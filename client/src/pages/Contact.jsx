import React, { useState } from 'react';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      setErrorMsg('Please fill in all fields.');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    fetch('http://localhost:5000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed');
        return res.json();
      })
      .then(() => {
        setSubmitted(true);
        setSubmitting(false);
      })
      .catch(() => {
        setErrorMsg('Could not send your message right now. Please try again.');
        setSubmitting(false);
      });
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-sky-600 mb-2">Contact Us</h2>
      <p className="text-gray-600 mb-8">We would love to hear from you.</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-white rounded-xl shadow-md p-6">
          {submitted ? (
            <div className="text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-sm">
              Thank you! Your message has been sent successfully.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800"
              />
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800"
              />
              <textarea
                placeholder="Your Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800"
              />
              {errorMsg && <p className="text-red-500 text-xs">{errorMsg}</p>}
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-sky-600 text-white py-2 rounded-lg hover:bg-sky-700 transition-colors"
              >
                {submitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-sm font-semibold text-gray-500 mb-1">Email</h3>
            <p className="text-gray-800">support@medimind.ai</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-sm font-semibold text-gray-500 mb-1">Phone Number</h3>
            <p className="text-gray-800">+92 51 1234567</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-sm font-semibold text-gray-500 mb-2">Our Location</h3>
            <iframe
              title="Google Map"
              className="w-full h-56 rounded-lg border-0"
              loading="lazy"
              src="https://www.google.com/maps?q=Rawalpindi,Pakistan&output=embed"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;