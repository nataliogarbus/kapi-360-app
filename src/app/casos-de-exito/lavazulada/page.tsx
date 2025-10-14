import CaseStudyPage from '@/components/CaseStudyPage';
import { lavazuladaData } from '@/lib/data/lavazulada-data';
import { Metadata } from 'next';

export const metadata: Metadata = lavazuladaData.meta;

const LavazuladaCaseStudyPage = () => {
  return <CaseStudyPage caseData={lavazuladaData} />;
};

export default LavazuladaCaseStudyPage;