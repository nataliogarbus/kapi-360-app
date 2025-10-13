import { Metadata } from 'next';
import { CaseStudyData } from '@/app/types';
import { emamaData } from '@/lib/data/emama-data';
import CaseStudyPage from '@/components/CaseStudyPage';

// SEO: Generación dinámica de metadatos
export async function generateMetadata(): Promise<Metadata> {
  const caseData: CaseStudyData = emamaData;
  return {
    title: caseData.meta.title,
    description: caseData.meta.description,
  };
}

const EmamaCaseStudyPage = () => {
  return <CaseStudyPage caseData={emamaData} />;
};

export default EmamaCaseStudyPage;
