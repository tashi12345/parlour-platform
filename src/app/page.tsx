"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import AppointmentModal from "@/components/AppointmentModal";
import { SERVICES_DATA, Service } from "@/data/services";
import { BRAND_CONFIG } from "@/data/config";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export default function Home() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBookClick = (service: Service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  return (
    <>
      <Navbar />
      <Hero />

      <section id="services" style={{ padding: '100px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 42px)', marginBottom: '16px', textAlign: 'center', fontWeight: 800 }}>
            Our <span className="gradient-text">Premium Services</span>
          </h2>

          <p style={{ color: 'var(--text-muted)', textAlign: 'center', maxWidth: '600px', margin: '0 auto 60px', fontSize: '18px' }}>
            Professional bridal makeup, hair styling, and beauty treatments for every occasion
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '32px'
        }}>
          {SERVICES_DATA.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ServiceCard service={service} onClick={() => handleBookClick(service)} />
            </motion.div>
          ))}
        </div>
      </section>

      <AppointmentModal
        service={selectedService}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Bridal Packages Section */}
      <section style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)', padding: '100px 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at 30% 50%, rgba(212, 175, 55, 0.1) 0%, transparent 50%)', pointerEvents: 'none' }}></div>
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 42px)', marginBottom: '16px', textAlign: 'center', fontWeight: 800 }}>
              Exclusive <span className="gradient-text">Bridal Packages</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', textAlign: 'center', maxWidth: '600px', margin: '0 auto 60px', fontSize: '18px' }}>
              Complete bridal transformation packages designed for your special day
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
            {[
              {
                name: "Classic Bridal",
                price: "50,000",
                popular: false,
                features: ["Bridal Makeup", "Hair Styling", "Dupatta Setting", "Jewelry Placement", "1 Makeup Trial"]
              },
              {
                name: "Premium Bridal",
                price: "85,000",
                popular: true,
                features: ["HD Bridal Makeup", "Professional Hair Styling", "Dupatta & Jewelry Setting", "False Lashes", "2 Makeup Trials", "Touch-up Kit"]
              },
              {
                name: "Luxury Bridal",
                price: "1,50,000",
                popular: false,
                features: ["Luxury HD Makeup", "Designer Hair Styling", "Complete Styling", "Premium Lashes & Accessories", "3 Trials", "Touch-up Service", "Photography Makeup"]
              }
            ].map((pkg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                viewport={{ once: true }}
                style={{
                  background: pkg.popular ? 'linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(184, 134, 11, 0.05) 100%)' : 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(10px)',
                  border: pkg.popular ? '2px solid var(--primary)' : '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '24px',
                  padding: '40px 32px',
                  position: 'relative',
                  transition: 'all 0.3s ease'
                }}
                className="premium-card"
              >
                {pkg.popular && (
                  <div style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'linear-gradient(135deg, #d4af37 0%, #b8860b 100%)',
                    padding: '6px 20px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 700,
                    letterSpacing: '1px'
                  }}>
                    MOST POPULAR
                  </div>
                )}
                <h3 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '16px', textAlign: 'center' }}>{pkg.name}</h3>
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                  <span style={{ fontSize: '48px', fontWeight: 800, color: 'var(--primary)' }}>₨{pkg.price}</span>
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
                  {pkg.features.map((feature, j) => (
                    <li key={j} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-muted)' }}>
                      <span style={{ color: 'var(--primary)', fontSize: '20px' }}>✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center', background: pkg.popular ? 'var(--primary)' : 'transparent', border: pkg.popular ? 'none' : '2px solid var(--primary)', color: pkg.popular ? '#000' : 'var(--primary)' }}
                  onClick={() => window.open(`https://wa.me/${BRAND_CONFIG.whatsapp}?text=Hi! I'm interested in the ${pkg.name} package`, '_blank')}
                >
                  Book Now
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section style={{ background: 'var(--surface)', padding: '100px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 42px)', marginBottom: '60px', textAlign: 'center', fontWeight: 800 }}>
            Why Choose <span className="gradient-text">{BRAND_CONFIG.clinicName}</span>?
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '40px'
          }}>
            {[
              { title: "Professional Artists", desc: "Expert makeup artists and hair stylists with years of experience" },
              { title: "Premium Products", desc: "High-quality branded makeup and hair products for lasting results" },
              { title: "Bridal Specialists", desc: "Specialized in bridal makeup and complete bridal packages" },
              { title: "Flexible Hours", desc: `${BRAND_CONFIG.hours.weekdays} | ${BRAND_CONFIG.hours.saturday}` }
            ].map((service, i) => (
              <div key={i} className="premium-card" style={{ padding: '32px', textAlign: 'center' }}>
                <h3 style={{ color: 'var(--primary)', marginBottom: '12px', fontSize: '20px' }}>{service.title}</h3>
                <p style={{ color: 'var(--text-muted)' }}>{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section style={{ padding: '100px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 42px)', marginBottom: '16px', textAlign: 'center', fontWeight: 800 }}>
              What Our <span className="gradient-text">Clients Say</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', textAlign: 'center', maxWidth: '600px', margin: '0 auto 60px', fontSize: '18px' }}>
              Real experiences from our valued clients
            </p>
          </motion.div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '32px'
          }}>
            {[
              {
                name: "Ayesha Malik",
                treatment: "Bridal Makeup",
                text: "Maryam Salon made my wedding day absolutely perfect! The bridal makeup was flawless and lasted all day. Highly recommend!",
                rating: 5,
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop"
              },
              {
                name: "Sana Khan",
                treatment: "Party Makeup",
                text: "Best party makeup experience! The team is so professional and talented. I looked stunning and felt confident!",
                rating: 5,
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop"
              },
              {
                name: "Fatima Ahmed",
                treatment: "Hair Styling",
                text: "Amazing hair color and styling! They really know what they're doing. Will definitely be coming back regularly!",
                rating: 5,
                image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=150&auto=format&fit=crop"
              }
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="premium-card"
                style={{ padding: '32px' }}
              >
                <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', alignItems: 'center' }}>
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div>
                    <h4 style={{ marginBottom: '4px', fontSize: '18px' }}>{testimonial.name}</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>{testimonial.treatment}</p>
                  </div>
                </div>
                <div style={{ color: 'var(--primary)', marginBottom: '16px' }}>
                  {"★".repeat(testimonial.rating)}
                </div>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontStyle: 'italic' }}>
                  "{testimonial.text}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section style={{ background: 'var(--surface)', padding: '100px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 42px)', marginBottom: '16px', textAlign: 'center', fontWeight: 800 }}>
            Our <span className="gradient-text">Salon Gallery</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', textAlign: 'center', maxWidth: '600px', margin: '0 auto 60px', fontSize: '18px' }}>
            See our beautiful transformations and luxurious salon environment
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px'
          }}>
            {[
              "https://images.unsplash.com/photo-1522337094846-8a818192de1f?q=80&w=800&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=800&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?q=80&w=800&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1519415387722-a1c3bbef716c?q=80&w=800&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=800&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=800&auto=format&fit=crop"
            ].map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                style={{
                  borderRadius: '20px',
                  overflow: 'hidden',
                  height: '280px',
                  position: 'relative',
                  cursor: 'pointer'
                }}
                className="premium-card"
              >
                <img
                  src={img}
                  alt={`Salon ${i + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '80px 24px 40px', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>
          <div>
            <h3 style={{ marginBottom: '20px', letterSpacing: '1px', fontSize: '18px' }}>{BRAND_CONFIG.clinicName.toUpperCase()}</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
              Luxury bridal and beauty services in {BRAND_CONFIG.city}. {BRAND_CONFIG.tagline}
            </p>
          </div>
          <div>
            <h4 style={{ marginBottom: '20px', color: 'var(--primary)' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li><a href="/" style={{ color: 'var(--text-muted)' }}>Home</a></li>
              <li><a href="/#services" style={{ color: 'var(--text-muted)' }}>Services</a></li>
              <li><a href="/about" style={{ color: 'var(--text-muted)' }}>About Us</a></li>
              <li><a href="/contact" style={{ color: 'var(--text-muted)' }}>Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 style={{ marginBottom: '20px', color: 'var(--primary)' }}>Contact</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--text-muted)' }}>
              <li>{BRAND_CONFIG.address}</li>
              <li><a href={`tel:${BRAND_CONFIG.phone}`} style={{ color: 'var(--text-muted)' }}>{BRAND_CONFIG.phone}</a></li>
              <li><a href={`mailto:${BRAND_CONFIG.email}`} style={{ color: 'var(--text-muted)' }}>{BRAND_CONFIG.email}</a></li>
            </ul>
          </div>
          <div>
            <h4 style={{ marginBottom: '20px', color: 'var(--primary)' }}>Hours</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--text-muted)' }}>
              <li>Mon-Fri: {BRAND_CONFIG.hours.weekdays}</li>
              <li>Saturday: {BRAND_CONFIG.hours.saturday}</li>
              <li>Sunday: {BRAND_CONFIG.hours.sunday}</li>
            </ul>
          </div>
        </div>
        <div style={{ maxWidth: '1200px', margin: '60px auto 0', paddingTop: '30px', borderTop: '1px solid var(--border)', textAlign: 'center', color: 'var(--text-muted)', fontSize: '14px' }}>
          © {new Date().getFullYear()} {BRAND_CONFIG.clinicName}. All rights reserved.
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a
        href={`https://wa.me/${BRAND_CONFIG.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          width: '60px',
          height: '60px',
          background: '#25D366',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(37, 211, 102, 0.4)',
          zIndex: 1000,
          transition: 'transform 0.3s ease'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <MessageCircle size={28} color="#fff" />
      </a>
    </>
  );
}
