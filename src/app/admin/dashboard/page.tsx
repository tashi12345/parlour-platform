"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, doc, updateDoc, query, orderBy } from "firebase/firestore";
import { LogOut, Calendar, Clock, Check, X, MessageSquare } from "lucide-react";
import { BRAND_CONFIG } from "@/data/config";

interface Appointment {
    id: string;
    name: string;
    email: string;
    phone: string;
    serviceName: string;
    date: string;
    timeSlot: string;
    status: string;
    notes?: string;
    createdAt: any;
}

interface ContactMessage {
    id: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    read: boolean;
    createdAt: any;
}

export default function AdminDashboard() {
    const { logout } = useAuth();
    const router = useRouter();
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [tab, setTab] = useState<"dashboard" | "appointments" | "messages">("dashboard");
    const [loading, setLoading] = useState(true);

    // DEMO MODE: Authentication disabled for template demo
    // Re-enable authentication when deploying for actual clients

    useEffect(() => {
        // Timeout fallback - if loading takes more than 3 seconds, show dashboard anyway
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 3000);

        if (!db) {
            // Firebase not initialized, still show dashboard with empty state
            setLoading(false);
            clearTimeout(timeout);
            return;
        }

        // Fetch appointments
        const appointmentsQuery = query(collection(db, "appointments"), orderBy("createdAt", "desc"));
        const unsubscribeAppointments = onSnapshot(
            appointmentsQuery,
            (snapshot) => {
                const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Appointment));
                setAppointments(data);
                setLoading(false);
                clearTimeout(timeout);
            },
            (error) => {
                console.error("Error fetching appointments:", error);
                setLoading(false);
                clearTimeout(timeout);
            }
        );

        // Fetch contact messages
        const messagesQuery = query(collection(db, "contactMessages"), orderBy("createdAt", "desc"));
        const unsubscribeMessages = onSnapshot(
            messagesQuery,
            (snapshot) => {
                const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ContactMessage));
                setMessages(data);
            },
            (error) => {
                console.error("Error fetching messages:", error);
            }
        );

        return () => {
            unsubscribeAppointments();
            unsubscribeMessages();
            clearTimeout(timeout);
        };
    }, []);

    const updateStatus = async (id: string, status: string) => {
        await updateDoc(doc(db, "appointments", id), { status });
    };

    const markAsRead = async (id: string) => {
        await updateDoc(doc(db, "contactMessages", id), { read: true });
    };

    const deleteMessage = async (id: string) => {
        const docRef = doc(db, "contactMessages", id);
        await updateDoc(docRef, { read: true }); // Just mark as read for now
    };

    const stats = {
        total: appointments.length,
        pending: appointments.filter(a => a.status === "pending").length,
        confirmed: appointments.filter(a => a.status === "confirmed").length,
        today: appointments.filter(a => a.date === new Date().toISOString().split("T")[0]).length
    };

    if (loading) return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px' }}>
            <div style={{ width: '40px', height: '40px', border: '4px solid var(--border)', borderTop: '4px solid var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
            <p style={{ color: 'var(--text-muted)' }}>Loading dashboard...</p>
            <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
        </div>
    );

    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0a0a0a 0%, #050505 100%)', display: 'flex' }}>
            {/* Enhanced Sidebar */}
            <div style={{
                width: '280px',
                background: 'linear-gradient(180deg, rgba(17, 17, 17, 0.95) 0%, rgba(10, 10, 10, 0.98) 100%)',
                backdropFilter: 'blur(20px)',
                borderRight: '1px solid rgba(212, 175, 55, 0.15)',
                padding: '32px 24px',
                position: 'relative',
                boxShadow: '4px 0 24px rgba(0, 0, 0, 0.3)'
            }}>
                {/* Logo/Brand Section */}
                <div style={{ marginBottom: '48px' }}>
                    <div style={{
                        width: '50px',
                        height: '50px',
                        background: 'linear-gradient(135deg, #d4af37 0%, #b8860b 100%)',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '16px',
                        boxShadow: '0 8px 24px rgba(212, 175, 55, 0.3)'
                    }}>
                        <Calendar size={26} color="#000" />
                    </div>
                    <h2 style={{
                        fontSize: '18px',
                        fontWeight: 700,
                        background: 'linear-gradient(135deg, #d4af37 0%, #f4e4c1 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        letterSpacing: '0.5px'
                    }}>
                        {BRAND_CONFIG.clinicName}
                    </h2>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>Admin Dashboard</p>
                </div>

                {/* Navigation */}
                <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '32px' }}>
                    {[
                        { key: "dashboard", label: "Dashboard", icon: Calendar },
                        { key: "appointments", label: "Appointments", icon: Clock },
                        { key: "messages", label: "Messages", icon: MessageSquare }
                    ].map(item => (
                        <button
                            key={item.key}
                            onClick={() => setTab(item.key as any)}
                            style={{
                                padding: '14px 18px',
                                background: tab === item.key
                                    ? 'linear-gradient(135deg, #d4af37 0%, #b8860b 100%)'
                                    : 'rgba(255, 255, 255, 0.03)',
                                color: tab === item.key ? '#000' : 'var(--text-muted)',
                                border: tab === item.key ? 'none' : '1px solid rgba(255, 255, 255, 0.06)',
                                borderRadius: '14px',
                                textAlign: 'left',
                                fontWeight: 700,
                                fontSize: '15px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                transition: 'all 0.3s ease',
                                boxShadow: tab === item.key ? '0 8px 24px rgba(212, 175, 55, 0.3)' : 'none'
                            }}
                        >
                            <item.icon size={20} />
                            {item.label}
                        </button>
                    ))}
                </nav>

                {/* Logout Button */}
                <button
                    onClick={() => { logout(); router.push("/"); }}
                    style={{
                        position: 'absolute',
                        bottom: '32px',
                        left: '24px',
                        right: '24px',
                        padding: '14px 18px',
                        background: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        color: '#ef4444',
                        borderRadius: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        fontWeight: 600,
                        transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)';
                        e.currentTarget.style.borderColor = '#ef4444';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
                        e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.3)';
                    }}
                >
                    <LogOut size={18} /> Logout
                </button>
            </div>

            <div style={{ flex: 1, padding: '48px', overflowY: 'auto', maxHeight: '100vh' }}>
                {tab === "dashboard" && (
                    <>
                        <div style={{ marginBottom: '40px' }}>
                            <h1 style={{
                                fontSize: '36px',
                                fontWeight: 800,
                                marginBottom: '8px',
                                background: 'linear-gradient(135deg, #fff 0%, rgba(255, 255, 255, 0.7) 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}>
                                Dashboard Overview
                            </h1>
                            <p style={{ color: 'var(--text-muted)', fontSize: '16px' }}>
                                Monitor your appointments and business metrics
                            </p>
                        </div>

                        {/* Enhanced Stats Grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '48px' }}>
                            {[
                                { label: "Total Appointments", value: stats.total, icon: Calendar, gradient: 'linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(184, 134, 11, 0.1) 100%)', color: '#d4af37' },
                                { label: "Pending", value: stats.pending, icon: Clock, gradient: 'linear-gradient(135deg, rgba(251, 191, 36, 0.2) 0%, rgba(245, 158, 11, 0.1) 100%)', color: '#fbbf24' },
                                { label: "Confirmed", value: stats.confirmed, icon: Check, gradient: 'linear-gradient(135deg, rgba(74, 222, 128, 0.2) 0%, rgba(34, 197, 94, 0.1) 100%)', color: '#4ade80' },
                                { label: "Today's Appointments", value: stats.today, icon: Calendar, gradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(37, 99, 235, 0.1) 100%)', color: '#3b82f6' }
                            ].map((stat, i) => (
                                <div
                                    key={i}
                                    style={{
                                        background: stat.gradient,
                                        backdropFilter: 'blur(10px)',
                                        border: `1px solid ${stat.color}33`,
                                        borderRadius: '20px',
                                        padding: '28px',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-4px)';
                                        e.currentTarget.style.boxShadow = `0 12px 32px ${stat.color}40`;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = 'none';
                                    }}
                                >
                                    <div style={{
                                        position: 'absolute',
                                        top: '-20px',
                                        right: '-20px',
                                        width: '100px',
                                        height: '100px',
                                        background: `radial-gradient(circle, ${stat.color}20 0%, transparent 70%)`,
                                        borderRadius: '50%'
                                    }}></div>
                                    <stat.icon size={32} style={{ color: stat.color, marginBottom: '16px', position: 'relative', zIndex: 1 }} />
                                    <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '8px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                        {stat.label}
                                    </p>
                                    <p style={{
                                        fontSize: '40px',
                                        fontWeight: 800,
                                        color: stat.color,
                                        letterSpacing: '-1px'
                                    }}>
                                        {stat.value}
                                    </p>
                                </div>
                            ))}
                        </div>
                        {/* Recent Appointments Section */}
                        <div style={{ marginBottom: '24px' }}>
                            <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '20px' }}>Recent Appointments</h2>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {appointments.length === 0 ? (
                                <div style={{
                                    background: 'rgba(255, 255, 255, 0.03)',
                                    border: '1px solid rgba(255, 255, 255, 0.08)',
                                    borderRadius: '20px',
                                    padding: '48px',
                                    textAlign: 'center'
                                }}>
                                    <Calendar size={48} style={{ color: 'var(--primary)', margin: '0 auto 16px', opacity: 0.5 }} />
                                    <p style={{ color: 'var(--text-muted)', fontSize: '16px' }}>No appointments yet</p>
                                </div>
                            ) : (
                                appointments.slice(0, 5).map(apt => (
                                    <div
                                        key={apt.id}
                                        style={{
                                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
                                            backdropFilter: 'blur(10px)',
                                            border: '1px solid rgba(255, 255, 255, 0.08)',
                                            borderRadius: '16px',
                                            padding: '20px 24px',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            transition: 'all 0.3s ease'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.borderColor = 'var(--primary)';
                                            e.currentTarget.style.transform = 'translateX(4px)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                                            e.currentTarget.style.transform = 'translateX(0)';
                                        }}
                                    >
                                        <div style={{ flex: 1 }}>
                                            <p style={{ fontWeight: 700, fontSize: '16px', marginBottom: '6px' }}>
                                                {apt.name} <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>• {apt.serviceName}</span>
                                            </p>
                                            <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
                                                <Clock size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
                                                {new Date(apt.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} at {apt.timeSlot}
                                            </p>
                                        </div>
                                        <span style={{
                                            padding: '8px 18px',
                                            borderRadius: '24px',
                                            fontSize: '12px',
                                            fontWeight: 700,
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.5px',
                                            background: apt.status === 'confirmed' ? 'rgba(74, 222, 128, 0.15)' : apt.status === 'pending' ? 'rgba(251, 191, 36, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                                            color: apt.status === 'confirmed' ? '#4ade80' : apt.status === 'pending' ? '#fbbf24' : '#ef4444',
                                            border: `1px solid ${apt.status === 'confirmed' ? '#4ade8033' : apt.status === 'pending' ? '#fbbf2433' : '#ef444433'}`
                                        }}>
                                            {apt.status}
                                        </span>
                                    </div>
                                ))
                            )}
                        </div>
                    </>
                )}

                {tab === "appointments" && (
                    <>
                        <div style={{ marginBottom: '40px' }}>
                            <h1 style={{
                                fontSize: '36px',
                                fontWeight: 800,
                                marginBottom: '8px',
                                background: 'linear-gradient(135deg, #fff 0%, rgba(255, 255, 255, 0.7) 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}>
                                All Appointments
                            </h1>
                            <p style={{ color: 'var(--text-muted)', fontSize: '16px' }}>
                                Manage and track all customer appointments
                            </p>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {appointments.length === 0 ? (
                                <div style={{
                                    background: 'rgba(255, 255, 255, 0.03)',
                                    border: '1px solid rgba(255, 255, 255, 0.08)',
                                    borderRadius: '20px',
                                    padding: '60px',
                                    textAlign: 'center'
                                }}>
                                    <Calendar size={56} style={{ color: 'var(--primary)', margin: '0 auto 20px', opacity: 0.4 }} />
                                    <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>No Appointments Yet</h3>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '16px' }}>Appointments will appear here once customers start booking</p>
                                </div>
                            ) : (
                                appointments.map(apt => (
                                    <div
                                        key={apt.id}
                                        style={{
                                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
                                            backdropFilter: 'blur(10px)',
                                            border: '1px solid rgba(255, 255, 255, 0.08)',
                                            borderRadius: '20px',
                                            padding: '28px',
                                            transition: 'all 0.3s ease'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.borderColor = 'var(--primary)';
                                            e.currentTarget.style.boxShadow = '0 8px 32px rgba(212, 175, 55, 0.2)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                                            e.currentTarget.style.boxShadow = 'none';
                                        }}
                                    >
                                        {/* Header */}
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', alignItems: 'flex-start' }}>
                                            <div>
                                                <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>{apt.name}</h3>
                                                <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
                                                    {apt.email} • {apt.phone}
                                                </p>
                                            </div>
                                            <span style={{
                                                padding: '10px 20px',
                                                borderRadius: '24px',
                                                fontSize: '12px',
                                                fontWeight: 700,
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.5px',
                                                background: apt.status === 'confirmed' ? 'rgba(74, 222, 128, 0.15)' : apt.status === 'pending' ? 'rgba(251, 191, 36, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                                                color: apt.status === 'confirmed' ? '#4ade80' : apt.status === 'pending' ? '#fbbf24' : '#ef4444',
                                                border: `1px solid ${apt.status === 'confirmed' ? '#4ade8033' : apt.status === 'pending' ? '#fbbf2433' : '#ef444433'}`
                                            }}>
                                                {apt.status}
                                            </span>
                                        </div>

                                        {/* Details Grid */}
                                        <div style={{
                                            display: 'grid',
                                            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                                            gap: '20px',
                                            marginBottom: '20px',
                                            paddingTop: '20px',
                                            borderTop: '1px solid rgba(255, 255, 255, 0.08)'
                                        }}>
                                            <div>
                                                <p style={{ color: 'var(--text-muted)', fontSize: '12px', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 }}>Service</p>
                                                <p style={{ fontWeight: 700, fontSize: '15px', color: 'var(--primary)' }}>{apt.serviceName}</p>
                                            </div>
                                            <div>
                                                <p style={{ color: 'var(--text-muted)', fontSize: '12px', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 }}>Date</p>
                                                <p style={{ fontWeight: 700, fontSize: '15px' }}>
                                                    {new Date(apt.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                                </p>
                                            </div>
                                            <div>
                                                <p style={{ color: 'var(--text-muted)', fontSize: '12px', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 }}>Time</p>
                                                <p style={{ fontWeight: 700, fontSize: '15px' }}>{apt.timeSlot}</p>
                                            </div>
                                        </div>

                                        {/* Notes */}
                                        {apt.notes && (
                                            <div style={{
                                                background: 'rgba(212, 175, 55, 0.05)',
                                                border: '1px solid rgba(212, 175, 55, 0.15)',
                                                borderRadius: '12px',
                                                padding: '16px',
                                                marginBottom: '20px'
                                            }}>
                                                <p style={{ color: 'var(--text-muted)', fontSize: '12px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                    <MessageSquare size={14} />
                                                    CUSTOMER NOTE
                                                </p>
                                                <p style={{ color: '#fff', fontSize: '14px', lineHeight: '1.6' }}>{apt.notes}</p>
                                            </div>
                                        )}

                                        {/* Action Buttons */}
                                        {apt.status === "pending" && (
                                            <div style={{ display: 'flex', gap: '12px' }}>
                                                <button
                                                    onClick={() => updateStatus(apt.id, "confirmed")}
                                                    style={{
                                                        padding: '12px 24px',
                                                        background: 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)',
                                                        border: 'none',
                                                        color: '#000',
                                                        borderRadius: '12px',
                                                        fontWeight: 700,
                                                        fontSize: '14px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '8px',
                                                        cursor: 'pointer',
                                                        transition: 'all 0.3s ease'
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                                        e.currentTarget.style.boxShadow = '0 8px 20px rgba(74, 222, 128, 0.4)';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.transform = 'translateY(0)';
                                                        e.currentTarget.style.boxShadow = 'none';
                                                    }}
                                                >
                                                    <Check size={18} /> Confirm Appointment
                                                </button>
                                                <button
                                                    onClick={() => updateStatus(apt.id, "cancelled")}
                                                    style={{
                                                        padding: '12px 24px',
                                                        background: 'rgba(239, 68, 68, 0.1)',
                                                        border: '1px solid rgba(239, 68, 68, 0.3)',
                                                        color: '#ef4444',
                                                        borderRadius: '12px',
                                                        fontWeight: 700,
                                                        fontSize: '14px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '8px',
                                                        cursor: 'pointer',
                                                        transition: 'all 0.3s ease'
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)';
                                                        e.currentTarget.style.borderColor = '#ef4444';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
                                                        e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.3)';
                                                    }}
                                                >
                                                    <X size={18} /> Cancel
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    </>
                )}

                {tab === "messages" && (
                    <>
                        <div style={{ marginBottom: '40px' }}>
                            <h1 style={{
                                fontSize: '36px',
                                fontWeight: 800,
                                marginBottom: '8px',
                                background: 'linear-gradient(135deg, #fff 0%, rgba(255, 255, 255, 0.7) 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}>
                                Contact Messages
                            </h1>
                            <p style={{ color: 'var(--text-muted)', fontSize: '16px' }}>
                                Review and respond to customer inquiries
                            </p>
                        </div>

                        {messages.length === 0 ? (
                            <div style={{
                                background: 'rgba(255, 255, 255, 0.03)',
                                border: '1px solid rgba(255, 255, 255, 0.08)',
                                borderRadius: '20px',
                                padding: '60px',
                                textAlign: 'center'
                            }}>
                                <MessageSquare size={56} style={{ color: 'var(--primary)', margin: '0 auto 20px', opacity: 0.4 }} />
                                <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>No Messages Yet</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '16px' }}>Customer messages will appear here</p>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                {messages.map(msg => (
                                    <div
                                        key={msg.id}
                                        style={{
                                            background: msg.read
                                                ? 'rgba(255, 255, 255, 0.02)'
                                                : 'linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(37, 99, 235, 0.04) 100%)',
                                            backdropFilter: 'blur(10px)',
                                            border: msg.read ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid rgba(59, 130, 246, 0.3)',
                                            borderRadius: '20px',
                                            padding: '28px',
                                            opacity: msg.read ? 0.6 : 1,
                                            transition: 'all 0.3s ease',
                                            position: 'relative'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.opacity = '1';
                                            e.currentTarget.style.borderColor = msg.read ? 'rgba(255, 255, 255, 0.15)' : 'rgba(59, 130, 246, 0.5)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.opacity = msg.read ? '0.6' : '1';
                                            e.currentTarget.style.borderColor = msg.read ? 'rgba(255, 255, 255, 0.05)' : 'rgba(59, 130, 246, 0.3)';
                                        }}
                                    >
                                        {/* Header */}
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', alignItems: 'flex-start' }}>
                                            <div>
                                                <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>{msg.name}</h3>
                                                <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
                                                    {msg.email} • {msg.phone}
                                                </p>
                                            </div>
                                            {!msg.read && (
                                                <span style={{
                                                    padding: '10px 20px',
                                                    borderRadius: '24px',
                                                    fontSize: '12px',
                                                    fontWeight: 700,
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '0.5px',
                                                    background: 'rgba(59, 130, 246, 0.2)',
                                                    color: '#3b82f6',
                                                    border: '1px solid rgba(59, 130, 246, 0.4)'
                                                }}>
                                                    NEW
                                                </span>
                                            )}
                                        </div>

                                        {/* Message Content */}
                                        <div style={{
                                            background: 'rgba(0, 0, 0, 0.3)',
                                            border: '1px solid rgba(255, 255, 255, 0.08)',
                                            borderRadius: '14px',
                                            padding: '20px',
                                            marginBottom: '16px'
                                        }}>
                                            <p style={{
                                                color: 'var(--text-muted)',
                                                fontSize: '12px',
                                                marginBottom: '10px',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.5px',
                                                fontWeight: 600,
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '6px'
                                            }}>
                                                <MessageSquare size={14} />
                                                MESSAGE
                                            </p>
                                            <p style={{ color: '#fff', fontSize: '15px', lineHeight: '1.7' }}>
                                                {msg.message}
                                            </p>
                                        </div>

                                        {/* Footer */}
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                                                {msg.createdAt ? new Date(msg.createdAt.seconds * 1000).toLocaleString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                }) : 'Just now'}
                                            </span>
                                            {!msg.read && (
                                                <button
                                                    onClick={() => markAsRead(msg.id)}
                                                    style={{
                                                        padding: '10px 20px',
                                                        background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                                                        border: 'none',
                                                        color: '#fff',
                                                        borderRadius: '12px',
                                                        fontWeight: 700,
                                                        fontSize: '14px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '8px',
                                                        cursor: 'pointer',
                                                        transition: 'all 0.3s ease'
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                                        e.currentTarget.style.boxShadow = '0 8px 20px rgba(59, 130, 246, 0.4)';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.transform = 'translateY(0)';
                                                        e.currentTarget.style.boxShadow = 'none';
                                                    }}
                                                >
                                                    <Check size={16} /> Mark as Read
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
