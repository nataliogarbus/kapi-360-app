'use client';

import { useState, useEffect } from 'react';
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

// The main page is a client component to handle the conditional rendering of the report.
// The diagnostic form itself has been moved to the /diagnostico page.

export default function Home() {
  // State related to report generation is kept in case we want to show 
  // a report summary here in the future, but the form itself is gone.
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState<Reporte | null>(null);
  const [featuredPosts, setFeaturedPosts] = useState([]);

  useEffect(() => {
    // Fetch featured posts on component mount
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

  return (
    <main className="flex min-h-screen flex-col items-center">
      <Header />
      {/* This logic is kept for now, in case a report summary is shown in a modal later */}
      {report && isLoading === false ? (
        <ReportSection report={report} isLoading={isLoading} />
      ) : (
        <>
          <HeroSection />
          <ComoFunciona />
          <Servicios />
          <CasosExito />
          {featuredPosts.length > 0 && <FeaturedPosts posts={featuredPosts} />}
          <Faq />
          <NewsletterSection />
          <ContactForm />
        </>
      )}
      <Footer />
    </main>
  );
}
