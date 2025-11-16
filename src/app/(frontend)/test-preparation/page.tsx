import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Test Preparation - IELTS, TOEFL, GRE, GMAT | Laxmi Education',
  description: 'Comprehensive test preparation for IELTS, TOEFL, GRE, GMAT and other standardized tests. Expert instructors and proven strategies.',
};

export default function TestPreparation() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-navbar-blue to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Test Preparation</h1>
            <p className="text-xl md:text-2xl text-blue-100">
              Master standardized tests with expert guidance
            </p>
          </div>
        </div>
      </section>

      {/* Test Programs */}
      <section className="py-20 bg-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-navbar-blue mb-4">Our Test Preparation Programs</h2>
            <p className="text-xl text-gray-600">Choose the right program for your goals</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: 'IELTS',
                fullName: 'International English Language Testing System',
                duration: '8 weeks',
                targetScore: 'Band 7+',
                price: '$299',
                features: ['Live Classes', 'Mock Tests', 'Personal Feedback', 'Study Materials']
              },
              {
                name: 'TOEFL',
                fullName: 'Test of English as a Foreign Language',
                duration: '6 weeks',
                targetScore: '100+',
                price: '$249',
                features: ['Online Practice', 'Speaking Sessions', 'Writing Feedback', 'Test Strategies']
              },
              {
                name: 'GRE',
                fullName: 'Graduate Record Examinations',
                duration: '10 weeks',
                targetScore: '320+',
                price: '$399',
                features: ['Quantitative Prep', 'Verbal Reasoning', 'Analytical Writing', 'Practice Tests']
              },
              {
                name: 'GMAT',
                fullName: 'Graduate Management Admission Test',
                duration: '8 weeks',
                targetScore: '700+',
                price: '$349',
                features: ['Integrated Reasoning', 'Quantitative', 'Verbal', 'AWA Preparation']
              }
            ].map((test, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-navbar-blue mb-2">{test.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{test.fullName}</p>
                  <div className="text-3xl font-bold text-cta-red mb-2">{test.price}</div>
                  <div className="text-sm text-gray-500">{test.duration} program</div>
                </div>
                
                <div className="mb-6">
                  <div className="text-center mb-4">
                    <span className="text-lg font-semibold text-navbar-blue">Target Score: {test.targetScore}</span>
                  </div>
                  <ul className="space-y-2">
                    {test.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                        <span className="text-highlight-yellow text-lg mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <button className="w-full bg-cta-red hover:bg-red-600 text-white font-bold py-3 px-4 rounded transition-colors duration-200">
                  Enroll Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-navbar-blue mb-4">Why Choose Our Test Prep?</h2>
            <p className="text-xl text-gray-600">Proven methods and expert instructors</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '👨‍🏫',
                title: 'Expert Instructors',
                description: 'Learn from certified instructors with years of experience'
              },
              {
                icon: '📊',
                title: 'Proven Strategies',
                description: 'Time-tested methods that have helped thousands of students'
              },
              {
                icon: '🎯',
                title: 'Personalized Learning',
                description: 'Customized study plans based on your strengths and weaknesses'
              },
              {
                icon: '📝',
                title: 'Mock Tests',
                description: 'Regular practice tests to track your progress'
              },
              {
                icon: '💬',
                title: '24/7 Support',
                description: 'Round-the-clock assistance for all your queries'
              },
              {
                icon: '🏆',
                title: 'High Success Rate',
                description: '95% of our students achieve their target scores'
              }
            ].map((feature, index) => (
              <div key={index} className="text-center p-6">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-navbar-blue mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Test Details */}
      <section id="ielts" className="py-20 bg-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-navbar-blue mb-4">Test Details</h2>
            <p className="text-xl text-gray-600">Everything you need to know about each test</p>
          </div>
          
          <div className="space-y-12">
            {[
              {
                name: 'IELTS',
                description: 'IELTS is the most popular English language test for study, work and migration.',
                sections: [
                  { name: 'Listening', duration: '30 minutes', questions: '40 questions' },
                  { name: 'Reading', duration: '60 minutes', questions: '40 questions' },
                  { name: 'Writing', duration: '60 minutes', tasks: '2 tasks' },
                  { name: 'Speaking', duration: '11-14 minutes', format: 'Face-to-face interview' }
                ],
                scores: 'Band 1-9 (Band 7+ recommended for universities)'
              },
              {
                name: 'TOEFL',
                description: 'TOEFL is accepted by more than 11,000 universities in over 150 countries.',
                sections: [
                  { name: 'Reading', duration: '54-72 minutes', questions: '30-40 questions' },
                  { name: 'Listening', duration: '41-57 minutes', questions: '28-39 questions' },
                  { name: 'Speaking', duration: '17 minutes', tasks: '4 tasks' },
                  { name: 'Writing', duration: '50 minutes', tasks: '2 tasks' }
                ],
                scores: '0-120 (100+ recommended for universities)'
              },
              {
                name: 'GRE',
                description: 'GRE is required for admission to most graduate schools in the US and many other countries.',
                sections: [
                  { name: 'Verbal Reasoning', duration: '60 minutes', questions: '40 questions' },
                  { name: 'Quantitative Reasoning', duration: '70 minutes', questions: '40 questions' },
                  { name: 'Analytical Writing', duration: '60 minutes', tasks: '2 tasks' }
                ],
                scores: '130-170 per section (320+ total recommended)'
              },
              {
                name: 'GMAT',
                description: 'GMAT is the most widely used exam for MBA admissions worldwide.',
                sections: [
                  { name: 'Quantitative', duration: '62 minutes', questions: '31 questions' },
                  { name: 'Verbal', duration: '65 minutes', questions: '36 questions' },
                  { name: 'Integrated Reasoning', duration: '30 minutes', questions: '12 questions' },
                  { name: 'Analytical Writing', duration: '30 minutes', tasks: '1 task' }
                ],
                scores: '200-800 (700+ recommended for top schools)'
              }
            ].map((test, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-navbar-blue mb-4">{test.name}</h3>
                <p className="text-gray-600 mb-6">{test.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold text-navbar-blue mb-4">Test Sections</h4>
                    <div className="space-y-3">
                      {test.sections.map((section, sectionIndex) => (
                        <div key={sectionIndex} className="border-l-4 border-highlight-yellow pl-4">
                          <div className="font-semibold text-gray-800">{section.name}</div>
                          <div className="text-sm text-gray-600">
                            {section.duration} • {section.questions || section.tasks || section.format}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-navbar-blue mb-4">Scoring</h4>
                    <div className="bg-light-gray p-4 rounded-lg">
                      <p className="text-gray-700">{test.scores}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-navbar-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Achieve Your Target Score?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of successful students who achieved their goals with us
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact-us"
              className="bg-cta-red hover:bg-red-600 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-200"
            >
              Get Free Assessment
            </a>
            <a
              href="/study-abroad"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-navbar-blue font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-200"
            >
              Study Abroad Programs
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

