import React, { useEffect, useState, useRef } from 'react';

const fallbackContacts = [
  { id: 1, title: 'Ambulance', number: '1122' },
  { id: 2, title: 'Blood Bank', number: '051-1234567' },
  { id: 3, title: 'Nearby Hospitals', number: '051-9876543' },
  { id: 4, title: 'Police', number: '15' },
];

const createRipple = (event) => {
  const button = event.currentTarget;
  const circle = document.createElement('span');
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;

  circle.style.width = diameter + 'px';
  circle.style.height = diameter + 'px';
  circle.style.left = event.clientX - button.getBoundingClientRect().left - radius + 'px';
  circle.style.top = event.clientY - button.getBoundingClientRect().top - radius + 'px';
  circle.style.position = 'absolute';
  circle.style.borderRadius = '50%';
  circle.style.background = 'rgba(255, 255, 255, 0.6)';
  circle.style.pointerEvents = 'none';
  circle.classList.add('animate-ripple');

  const existingRipple = button.getElementsByClassName('animate-ripple')[0];
  if (existingRipple) existingRipple.remove();

  button.appendChild(circle);
  setTimeout(() => circle.remove(), 600);
};

const RevealCard = ({ children }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={visible ? 'animate-fade-in' : 'opacity-0'}>
      {children}
    </div>
  );
};

const EmergencyContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/api/emergency')
      .then((res) => {
        if (!res.ok) throw new Error('Request failed');
        return res.json();
      })
      .then((data) => {
        const formatted = data.map((c) => ({
          id: c._id,
          title: c.title,
          number: c.number,
        }));
        setContacts(formatted);
        setLoading(false);
      })
      .catch(() => {
        setContacts(fallbackContacts);
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-sky-600 mb-2">Emergency Contacts</h2>
      <p className="text-gray-600 mb-8">Quick access to emergency services when you need them most.</p>

      {error && (
        <p className="text-amber-600 text-sm mb-4">Couldn't reach the live server — showing sample data instead.</p>
      )}

      {loading ? (
        <p className="text-gray-500">Loading contacts...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {contacts.map((contact) => (
            <RevealCard key={contact.id}>
              <div className="bg-white rounded-xl shadow-md p-6 flex items-center justify-between hover-card-zoom">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{contact.title}</h3>
                  <p className="text-gray-500">{contact.number}</p>
                </div>
                <a href={'tel:' + contact.number} onClick={createRipple} className="ripple-btn bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">
                  Call
                </a>
              </div>
            </RevealCard>
          ))}
        </div>
      )}
    </section>
  );
};

export default EmergencyContacts;