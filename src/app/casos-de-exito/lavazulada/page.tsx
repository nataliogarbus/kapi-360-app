
import { Metadata } from 'next';
import { CaseStudyData } from '@/app/types';
import { lavazuladaData } from '@/lib/data/lavazulada-data';
import CaseStudyPage from '@/components/CaseStudyPage';

// SEO: Generación dinámica de metadatos
export async function generateMetadata(): Promise<Metadata> {
  const caseData: CaseStudyData = lavazuladaData;
  return {
    title: caseData.meta.title,
    description: caseData.meta.description,
  };
}

const LavazuladaCaseStudyPage = () => {
  return <CaseStudyPage caseData={lavazuladaData} />;
};

export default LavazuladaCaseStudyPage;
