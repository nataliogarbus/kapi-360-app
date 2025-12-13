import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';

const Faq = () => {
  const { language } = useLanguage();
  // @ts-ignore
  const t = translations[language].faq;

  return (
    <section id="faq" className="w-full max-w-3xl mx-auto mt-16 mb-16 px-4">
      <h2 className="text-3xl font-bold text-center mb-8 text-white">{t.title}</h2>
      <div className="space-y-4">
        {/* @ts-ignore */}
        {t.questions.map((item, index) => (
          <details key={index} className="bg-gray-800 border border-gray-700 rounded-lg p-4 group">
            <summary className="flex justify-between items-center font-medium cursor-pointer text-white list-none">
              <h3 className="text-lg font-medium">{item.question}</h3>
              <span className="transition-transform duration-300 group-open:rotate-180">
                <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
              </span>
            </summary>
            <p className="text-gray-300 mt-3">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
};

export default Faq;
