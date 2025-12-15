'use client';

import { useState, useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import { Reporte } from '@/app/types';
import { ScrollAnimationWrapper } from '@/components/ScrollAnimationWrapper';
import { useLanguage } from '@/context/LanguageContext';

// Lazy load heavy components to improve LCP & TBT
const ReportSection = dynamic(() => import("@/components/ReportSection"));
const PartnersEcosystem = dynamic(() => import("@/components/PartnersEcosystem"));
const ComoFunciona = dynamic(() => import("@/components/ComoFunciona"));
const Servicios = dynamic(() => import("@/components/Servicios"));
const CasosExito = dynamic(() => import("@/components/CasosExito"));
const RoiCalculator = dynamic(() => import("@/components/RoiCalculator"));
const FeaturedPosts = dynamic(() => import("@/components/FeaturedPosts"));
const FeaturedTestimonial = dynamic(() => import("@/components/FeaturedTestimonial"));
const Faq = dynamic(() => import("@/components/Faq"));
const NewsletterSection = dynamic(() => import("@/components/NewsletterSection"));
const ContactForm = dynamic(() => import("@/components/ContactForm"));

export default function Home() {
  console.log("Verificación de Kapi");
  const { language } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState<Reporte | null>(null);
  const [featuredPosts, setFeaturedPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`/api/posts?lang=${language}`);
        const data = await response.json();
        setFeaturedPosts(data);
      } catch (err) {
        console.error("Failed to fetch posts", err);
      }
    };
    fetchPosts();
  }, [language]);

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Kapi',
    url: 'https://kapi.com.ar',
    logo: 'https://kapi.com.ar/logo-kapi-verde.svg',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: 'contacto@kapi.com.ar'
    },
    sameAs: [
      'https://instagram.com/kapi.agencia',
      'https://facebook.com/kapi.agencia',
      'https://linkedin.com/company/kapi-agencia',
      'https://twitter.com/kapi_agencia',
      'https://youtube.com/@kapi.agencia'
    ]
  };

  return (
    <main className="flex min-h-screen flex-col items-center">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      {report && isLoading === false ? (
        <ReportSection report={report} isLoading={isLoading} />
      ) : (
        <>
          <HeroSection />
          <ScrollAnimationWrapper>
            <PartnersEcosystem />
          </ScrollAnimationWrapper>
          <ScrollAnimationWrapper>
            <ComoFunciona />
          </ScrollAnimationWrapper>
          <ScrollAnimationWrapper>
            <Servicios />
          </ScrollAnimationWrapper>
          <ScrollAnimationWrapper>
            <CasosExito />
          </ScrollAnimationWrapper>
          <ScrollAnimationWrapper>
            <RoiCalculator />
          </ScrollAnimationWrapper>
          {featuredPosts.length > 0 && (
            <ScrollAnimationWrapper>
              <FeaturedPosts posts={featuredPosts} />
            </ScrollAnimationWrapper>
          )}
          <ScrollAnimationWrapper>
            <FeaturedTestimonial />
          </ScrollAnimationWrapper>
          <ScrollAnimationWrapper>
            <Faq />
          </ScrollAnimationWrapper>
          <ScrollAnimationWrapper>
            <NewsletterSection />
          </ScrollAnimationWrapper>
          <section id="contacto">
            <ScrollAnimationWrapper>
              <Suspense fallback={<div>Cargando formulario...</div>}>
                <ContactForm />
              </Suspense>
            </ScrollAnimationWrapper>
          </section>
        </>
      )}
    </main>
  );
}