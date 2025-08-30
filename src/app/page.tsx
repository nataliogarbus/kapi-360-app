'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Header from "@/components/Header";
import ReportSection from "@/components/ReportSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import { Reporte } from '@/app/types';
import { ScrollAnimationWrapper } from '@/components/ScrollAnimationWrapper';

// Carga dinámica de componentes que no son críticos para el primer render
const ComoFunciona = dynamic(() => import('@/components/ComoFunciona'));
const Servicios = dynamic(() => import('@/components/Servicios'));
const CasosExito = dynamic(() => import('@/components/CasosExito'));
const FeaturedPosts = dynamic(() => import('@/components/FeaturedPosts'));
const Faq = dynamic(() => import('@/components/Faq'));
const NewsletterSection = dynamic(() => import('@/components/NewsletterSection'));
const ContactForm = dynamic(() => import('@/components/ContactForm'));

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState<Reporte | null>(null);
  const [featuredPosts, setFeaturedPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts');
        const data = await response.json();
        setFeaturedPosts(data);
      } catch (err) {
        console.error("Failed to fetch posts", err);
      }
    };
    fetchPosts();
  }, []);

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Kapi',
    url: 'https://kapi-360-app.vercel.app',
    logo: 'https://kapi-360-app.vercel.app/logo-kapi-verde.svg',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: 'contacto@kapi.com.ar'
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Header />
      {report && isLoading === false ? (
        <ReportSection report={report} isLoading={isLoading} />
      ) : (
        <>
          <HeroSection />
          <ScrollAnimationWrapper>
            <ComoFunciona />
          </ScrollAnimationWrapper>
          <ScrollAnimationWrapper>
            <Servicios />
          </ScrollAnimationWrapper>
          <ScrollAnimationWrapper>
            <CasosExito />
          </ScrollAnimationWrapper>
          {featuredPosts.length > 0 && (
            <ScrollAnimationWrapper>
              <FeaturedPosts posts={featuredPosts} />
            </ScrollAnimationWrapper>
          )}
          <ScrollAnimationWrapper>
            <Faq />
          </ScrollAnimationWrapper>
          <ScrollAnimationWrapper>
            <NewsletterSection />
          </ScrollAnimationWrapper>
          <ScrollAnimationWrapper>
            <ContactForm />
          </ScrollAnimationWrapper>
        </>
      )}
      <Footer />
    </main>
  );
}
