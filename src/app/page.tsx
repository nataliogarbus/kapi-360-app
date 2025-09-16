'use client';

import { useState, useEffect, Suspense } from 'react';
import Header from "@/components/Header";
import ReportSection from "@/components/ReportSection";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import ComoFunciona from "@/components/ComoFunciona";
import Servicios from "@/components/Servicios";
import CasosExito from "@/components/CasosExito";
import FeaturedPosts from "@/components/FeaturedPosts";
import NewsletterSection from "@/components/NewsletterSection";
import ContactForm from "@/components/ContactForm";
import HeroSection from "@/components/HeroSection";
import { Reporte } from '@/app/types';
import { ScrollAnimationWrapper } from '@/components/ScrollAnimationWrapper';

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
            <Suspense fallback={<div>Cargando formulario...</div>}>
              <ContactForm />
            </Suspense>
          </ScrollAnimationWrapper>
        </>
      )}
      <Footer />
    </main>
  );
}
