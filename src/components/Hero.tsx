"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import styles from "./Hero.module.css";
import { BRAND_CONFIG } from "@/data/config";

const Hero = () => {
    return (
        <section className={styles.hero}>
            <div className={styles.overlay}></div>

            <div className={styles.container}>
                <div className={styles.content}>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className={styles.title}
                    >
                        Luxury <span className="gradient-text">Bridal & Beauty</span> <br />
                        Services in <span className={styles.highlight}>{BRAND_CONFIG.city}</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className={styles.subtitle}
                    >
                        Premium makeup, hair styling, and beauty treatments for your special moments.
                        From bridal transformations to everyday glamour, we make you shine.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className={styles.ctaButtons}
                    >
                        <a href="#services" className="btn-primary">
                            View Services
                        </a>
                        <a
                            href={`https://wa.me/${BRAND_CONFIG.whatsapp}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-outline"
                        >
                            <MessageCircle size={18} />
                            WhatsApp Us
                        </a>
                    </motion.div>
                </div>
            </div>

            <div className={styles.scrollIndicator}>
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className={styles.mouse}
                >
                    <div className={styles.wheel}></div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
