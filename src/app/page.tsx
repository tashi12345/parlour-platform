"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import AppointmentModal from "@/components/AppointmentModal";
import { SERVICES_DATA, Service } from "@/data/services";
import { BRAND_CONFIG } from "@/data/config";
import { motion } from "framer-motion";
import { MessageCircle, CheckCircle, Calendar, Bell, Palette, Users, Smartphone, Crown, Camera, Gift, Sparkles } from "lucide-react";

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

      {/* Demo Banner */}
      <section style={{
        background: 'linear-gradient(135deg, #FFA500 0%, #FF8C00 100%)',
        padding: '24px',
        borderBottom: '3px solid #FF6B00'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p style={{
              fontSize: 'clamp(16px, 3vw, 22px)',
              fontWeight: 700,
              color: '#000',
              marginBottom: '8px',
              textShadow: '0 1px 2px rgba(255,255,255,0.3)'
            }}>
              یہ ایک DEMO platform ہے! آپ اپنی beauty parlour کے لیے customize کروا سکتے ہیں
            </p>
            <p style={{
              fontSize: 'clamp(14px, 2.5vw, 18px)',
              fontWeight: 600,
              color: '#1a1a1a',
              marginBottom: '16px'
            }}>
              This is a DEMO platform - customize it for YOUR beauty parlour!
            </p>
            <a
              href="https://wa.me/923290841889?text=Hi! I want to customize this beauty parlour platform for my business"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                background: '#25D366',
                color: '#fff',
                padding: '12px 32px',
                borderRadius: '30px',
                fontWeight: 700,
                fontSize: '16px',
                textDecoration: 'none',
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
              }}
            >
              <MessageCircle size={20} />
              <span>Contact on WhatsApp: +92 329 0841889</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" style={{ padding: '100px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 42px)', marginBottom: '8px', textAlign: 'center', fontWeight: 800 }}>
            Hamare <span className="gradient-text">Beauty Services</span>
          </h2>
          <p style={{ fontSize: 'clamp(18px, 3vw, 22px)', marginBottom: '16px', textAlign: 'center', fontWeight: 600, color: 'var(--primary)' }}>
            Our Beauty Services
          </p>

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

      {/* How It Works Section */}
      <section style={{ background: 'var(--surface)', padding: '100px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 42px)', marginBottom: '8px', textAlign: 'center', fontWeight: 800 }}>
              <span className="gradient-text">Kaise Kaam Karta Hai?</span>
            </h2>
            <p style={{ fontSize: 'clamp(18px, 3vw, 22px)', marginBottom: '16px', textAlign: 'center', fontWeight: 600, color: 'var(--primary)' }}>
              How It Works
            </p>
            <p style={{ color: 'var(--text-muted)', textAlign: 'center', maxWidth: '600px', margin: '0 auto 60px', fontSize: '18px' }}>
              Simple steps to book your beauty appointment online
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px', marginBottom: '60px' }}>
            {[
              {
                icon: <Calendar size={40} />,
                title: "1. Select Service",
                titleUrdu: "Service Chune",
                desc: "Choose from our range of beauty services and packages"
              },
              {
                icon: <CheckCircle size={40} />,
                title: "2. Book Appointment",
                titleUrdu: "Appointment Le",
                desc: "Pick your preferred date and time slot online"
              },
              {
                icon: <Bell size={40} />,
                title: "3. Get Confirmation",
                titleUrdu: "Confirmation Paaye",
                desc: "Receive instant SMS/WhatsApp confirmation"
              },
              {
                icon: <Sparkles size={40} />,
                title: "4. Visit & Enjoy",
                titleUrdu: "Visit Kare",
                desc: "Come to our salon and get pampered!"
              }
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="premium-card"
                style={{ padding: '40px 32px', textAlign: 'center' }}
              >
                <div style={{ color: 'var(--primary)', marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
                  {step.icon}
                </div>
                <h3 style={{ marginBottom: '8px', fontSize: '20px', fontWeight: 700 }}>{step.title}</h3>
                <p style={{ fontSize: '16px', color: 'var(--primary)', marginBottom: '12px', fontWeight: 600 }}>
                  {step.titleUrdu}
                </p>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{
              background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(184, 134, 11, 0.05) 100%)',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              borderRadius: '20px',
              padding: '40px',
              textAlign: 'center'
            }}
          >
            <h3 style={{ fontSize: '24px', marginBottom: '24px', fontWeight: 700 }}>
              Payment Methods / <span style={{ color: 'var(--primary)' }}>Payment Ke Tareeqe</span>
            </h3>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '40px',
              flexWrap: 'wrap',
              alignItems: 'center'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  background: '#1c8b4a',
                  color: '#fff',
                  padding: '16px 32px',
                  borderRadius: '12px',
                  fontWeight: 700,
                  fontSize: '18px',
                  marginBottom: '8px'
                }}>
                  EasyPaisa
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Mobile Payment</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  background: '#e63946',
                  color: '#fff',
                  padding: '16px 32px',
                  borderRadius: '12px',
                  fontWeight: 700,
                  fontSize: '18px',
                  marginBottom: '8px'
                }}>
                  JazzCash
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Mobile Payment</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  background: 'linear-gradient(135deg, #d4af37 0%, #b8860b 100%)',
                  color: '#000',
                  padding: '16px 32px',
                  borderRadius: '12px',
                  fontWeight: 700,
                  fontSize: '18px',
                  marginBottom: '8px'
                }}>
                  Bank Transfer
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Direct Banking</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Custom Features Section */}
      <section style={{ padding: '100px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 42px)', marginBottom: '8px', textAlign: 'center', fontWeight: 800 }}>
              <span className="gradient-text">Apni Marzi Ke Features</span>
            </h2>
            <p style={{ fontSize: 'clamp(18px, 3vw, 22px)', marginBottom: '16px', textAlign: 'center', fontWeight: 600, color: 'var(--primary)' }}>
              Customize Your Platform Features
            </p>
            <p style={{ color: 'var(--text-muted)', textAlign: 'center', maxWidth: '600px', margin: '0 auto 60px', fontSize: '18px' }}>
              Get a custom beauty parlour platform with features tailored to your business
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
            {[
              { icon: <Calendar size={32} />, title: "Online Appointment Booking", desc: "24/7 booking system for your clients" },
              { icon: <Users size={32} />, title: "Client Beauty Records", desc: "Track client preferences and history" },
              { icon: <Crown size={32} />, title: "Bridal Package Booking", desc: "Special bridal packages management" },
              { icon: <Palette size={32} />, title: "Party Makeup Scheduling", desc: "Schedule makeup for special events" },
              { icon: <CheckCircle size={32} />, title: "Treatment History", desc: "Complete treatment records" },
              { icon: <Bell size={32} />, title: "SMS/WhatsApp Notifications", desc: "Automatic reminders to clients" },
              { icon: <Calendar size={32} />, title: "Multiple Stylist Schedules", desc: "Manage multiple beauticians" },
              { icon: <Sparkles size={32} />, title: "Custom Branding", desc: "Your logo, colors, and style" },
              { icon: <Gift size={32} />, title: "Membership Packages", desc: "Loyalty programs for clients" },
              { icon: <Camera size={32} />, title: "Photo Gallery Showcase", desc: "Display your best work" },
              { icon: <Smartphone size={32} />, title: "Mobile Responsive", desc: "Works perfectly on all devices" },
              { icon: <Sparkles size={32} />, title: "And Much More...", desc: "Custom features for your needs" }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                viewport={{ once: true }}
                className="premium-card"
                style={{ padding: '32px', textAlign: 'center' }}
              >
                <div style={{ color: 'var(--primary)', marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
                  {feature.icon}
                </div>
                <h3 style={{ marginBottom: '12px', fontSize: '18px', fontWeight: 700 }}>{feature.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.6' }}>{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
                  <span style={{ fontSize: '48px', fontWeight: 800, color: 'var(--primary)' }}>Rs {pkg.price}</span>
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

      {/* Pricing Section */}
      <section style={{ background: 'var(--surface)', padding: '100px 24px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 42px)', marginBottom: '8px', textAlign: 'center', fontWeight: 800 }}>
              <span className="gradient-text">Platform Ki Qeemat</span>
            </h2>
            <p style={{ fontSize: 'clamp(18px, 3vw, 22px)', marginBottom: '16px', textAlign: 'center', fontWeight: 600, color: 'var(--primary)' }}>
              Platform Pricing
            </p>
            <p style={{ color: 'var(--text-muted)', textAlign: 'center', maxWidth: '600px', margin: '0 auto 60px', fontSize: '18px' }}>
              Get your own custom beauty parlour platform
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{
              background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(184, 134, 11, 0.05) 100%)',
              border: '2px solid var(--primary)',
              borderRadius: '24px',
              padding: '60px 40px',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div style={{
              position: 'absolute',
              top: '-12px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'linear-gradient(135deg, #d4af37 0%, #b8860b 100%)',
              padding: '8px 24px',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: 700,
              letterSpacing: '1px'
            }}>
              COMPLETE SOLUTION
            </div>

            <h3 style={{ fontSize: '36px', fontWeight: 800, marginBottom: '24px', marginTop: '20px' }}>
              Beauty Parlour Platform
            </h3>

            <div style={{ marginBottom: '40px' }}>
              <div style={{ fontSize: '56px', fontWeight: 900, color: 'var(--primary)', marginBottom: '8px' }}>
                Rs 50,000 - 80,000
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '18px' }}>
                One-time payment / <span style={{ color: 'var(--primary)' }}>Ek dafa payment</span>
              </p>
            </div>

            <div style={{ marginBottom: '40px' }}>
              <h4 style={{ fontSize: '20px', marginBottom: '24px', fontWeight: 700 }}>
                Payment Methods / <span style={{ color: 'var(--primary)' }}>Payment Ke Tareeqe</span>
              </h4>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap', marginBottom: '32px' }}>
                <div style={{
                  background: '#1c8b4a',
                  color: '#fff',
                  padding: '12px 24px',
                  borderRadius: '12px',
                  fontWeight: 700,
                  fontSize: '16px'
                }}>
                  EasyPaisa
                </div>
                <div style={{
                  background: '#e63946',
                  color: '#fff',
                  padding: '12px 24px',
                  borderRadius: '12px',
                  fontWeight: 700,
                  fontSize: '16px'
                }}>
                  JazzCash
                </div>
                <div style={{
                  background: 'linear-gradient(135deg, #d4af37 0%, #b8860b 100%)',
                  color: '#000',
                  padding: '12px 24px',
                  borderRadius: '12px',
                  fontWeight: 700,
                  fontSize: '16px'
                }}>
                  Bank Transfer
                </div>
              </div>

              <div style={{
                background: 'rgba(0,0,0,0.3)',
                padding: '20px',
                borderRadius: '12px',
                border: '1px solid rgba(212, 175, 55, 0.3)'
              }}>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                  Bank Account Number:
                </p>
                <p style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: 'var(--primary)',
                  fontFamily: 'monospace',
                  letterSpacing: '2px'
                }}>
                  PK87UNIL0109000352281883
                </p>
              </div>
            </div>

            <a
              href="https://wa.me/923290841889?text=Hi! I want to order a custom beauty parlour platform"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                background: 'var(--primary)',
                color: '#000',
                padding: '16px 48px',
                fontSize: '18px',
                fontWeight: 700,
                textDecoration: 'none',
                border: 'none'
              }}
            >
              <MessageCircle size={24} />
              Order Now on WhatsApp
            </a>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section style={{ padding: '100px 24px' }}>
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
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="premium-card"
                style={{ padding: '32px', textAlign: 'center' }}
              >
                <h3 style={{ color: 'var(--primary)', marginBottom: '12px', fontSize: '20px' }}>{service.title}</h3>
                <p style={{ color: 'var(--text-muted)' }}>{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section style={{ background: 'var(--surface)', padding: '100px 24px' }}>
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
      <section style={{ padding: '100px 24px' }}>
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
      <footer style={{ background: 'var(--surface)', padding: '80px 24px 40px', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Demo Platforms Section */}
          <div style={{ marginBottom: '60px' }}>
            <h3 style={{ textAlign: 'center', fontSize: '24px', marginBottom: '32px', fontWeight: 700 }}>
              Our <span className="gradient-text">Demo Platforms</span>
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '20px',
              marginBottom: '32px'
            }}>
              {[
                { name: "Veterinary Clinic", url: "https://vet-clinic-six.vercel.app", current: false },
                { name: "Wedding Banquet", url: "https://banquet-tan.vercel.app", current: false },
                { name: "Beauty Parlour", url: "#", current: true },
                { name: "Dental Clinic", url: "https://dentist-platform-six.vercel.app", current: false },
                { name: "Skincare Clinic", url: "https://skincare-platform-two.vercel.app", current: false }
              ].map((platform, i) => (
                <motion.a
                  key={i}
                  href={platform.url}
                  target={platform.current ? "_self" : "_blank"}
                  rel={platform.current ? "" : "noopener noreferrer"}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  style={{
                    background: platform.current
                      ? 'linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(184, 134, 11, 0.1) 100%)'
                      : 'rgba(255, 255, 255, 0.03)',
                    border: platform.current ? '2px solid var(--primary)' : '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    padding: '20px',
                    textAlign: 'center',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.borderColor = 'var(--primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    if (!platform.current) e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  }}
                >
                  {platform.current && (
                    <div style={{
                      position: 'absolute',
                      top: '-10px',
                      right: '-10px',
                      background: 'var(--primary)',
                      color: '#000',
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontSize: '11px',
                      fontWeight: 700
                    }}>
                      CURRENT
                    </div>
                  )}
                  <div style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: platform.current ? 'var(--primary)' : '#fff'
                  }}>
                    {platform.name}
                  </div>
                </motion.a>
              ))}
            </div>
            <div style={{ textAlign: 'center' }}>
              <a
                href="https://wa.me/923290841889?text=Hi! I want to see more demo platforms"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  color: 'var(--primary)',
                  textDecoration: 'none',
                  fontSize: '16px',
                  fontWeight: 600,
                  padding: '12px 24px',
                  border: '2px solid var(--primary)',
                  borderRadius: '25px',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--primary)';
                  e.currentTarget.style.color = '#000';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'var(--primary)';
                }}
              >
                <MessageCircle size={20} />
                Contact: +92 329 0841889
              </a>
            </div>
          </div>

          <div style={{ height: '1px', background: 'var(--border)', marginBottom: '60px' }}></div>

          {/* Regular Footer Content */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '60px' }}>
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

          <div style={{ paddingTop: '30px', borderTop: '1px solid var(--border)', textAlign: 'center', color: 'var(--text-muted)', fontSize: '14px' }}>
            {new Date().getFullYear()} {BRAND_CONFIG.clinicName}. All rights reserved.
          </div>
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
