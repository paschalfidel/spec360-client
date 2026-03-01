// src/components/Contact.jsx
// Contact section with address, phone, email, social links, and a message form.
// Uses a background image with dark overlay, matching the style of other sections.
// The form submission is currently a simulation (logs to console) – replace with a real service in production.
// Fully commented and ready for deployment.

// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin, Phone, Mail, Instagram, Twitter, Facebook } from 'lucide-react';
import { useState } from 'react';
import axios from 'axios'; // make sure axios is installed

const Contact = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ type: '', message: '' }); // 'success' or 'error'
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      await axios.post('http://localhost:5001/api/contact', formData);
      setStatus({ type: 'success', message: 'Thank you! We’ll get back to you soon.' });
      setFormData({ name: '', email: '', message: '' }); // clear form
    } catch (error) {
      console.error('Submission error:', error);
      setStatus({
        type: 'error',
        message: error.response?.data?.message || 'Something went wrong. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="min-h-screen py-20 px-6 relative flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/contact-us.png')" }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/70 to-black/70 pointer-events-none" />

      <div className="container mx-auto relative z-10">
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-white text-center mb-12"
        >
          Get In <span className="text-accent">Touch</span>
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Info (unchanged) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Address */}
            <div className="flex items-start gap-4">
              <MapPin className="text-accent flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="text-white font-semibold text-lg">Address</h3>
                <p className="text-gray-400">
                  70 Njemanze Street, Owerri Municipal, Owerri 460221, Imo
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <Phone className="text-accent flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="text-white font-semibold text-lg">Phone</h3>
                <a href="tel:08182799154" className="text-gray-400 hover:text-accent transition">
                  0818 279 9154
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4">
              <Mail className="text-accent flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="text-white font-semibold text-lg">Email</h3>
                <a href="mailto:info@spec360.com.ng" className="text-gray-400 hover:text-accent transition">
                  info@spec360.com.ng
                </a>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="pt-4">
              <h3 className="text-white font-semibold text-lg mb-3">Follow Us</h3>
              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/gadgetsbyspec360/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/5 rounded-full text-gray-300 hover:text-accent hover:bg-accent/10 transition"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="https://x.com/paschalomens"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/5 rounded-full text-gray-300 hover:text-accent hover:bg-accent/10 transition"
                >
                  <Twitter size={20} />
                </a>
                <a
                  href="https://web.facebook.com/spec360com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/5 rounded-full text-gray-300 hover:text-accent hover:bg-accent/10 transition"
                >
                  <Facebook size={20} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-dark/60 border border-white/10 rounded-lg focus:border-accent focus:outline-none text-white"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-dark/60 border border-white/10 rounded-lg focus:border-accent focus:outline-none text-white"
                />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-dark/60 border border-white/10 rounded-lg focus:border-accent focus:outline-none text-white"
                ></textarea>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-accent hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
                {status.message && (
                  <p className={`text-center ${status.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                    {status.message}
                  </p>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
