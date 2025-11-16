import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Study Abroad Programs - Laxmi Education',
  description: 'Explore study abroad opportunities with expert guidance. University applications, visa assistance, and country selection support.',
};

export default function StudyAbroad() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-navbar-blue to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Study Abroad Programs</h1>
            <p className="text-xl md:text-2xl text-blue-100">
              Discover your perfect international education destination
            </p>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-20 bg-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-navbar-blue mb-4">Popular Destinations</h2>
            <p className="text-xl text-gray-600">Choose from top study destinations worldwide</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                country: 'United States',
                universities: '4000+ Universities',
                popular: 'Engineering, Business, Medicine',
                cost: '$20,000 - $60,000/year'
              },
              {
                country: 'United Kingdom',
                universities: '150+ Universities',
                popular: 'Business, Law, Arts',
                cost: '£15,000 - £35,000/year'
              },
              {
                country: 'Canada',
                universities: '200+ Universities',
                popular: 'Engineering, IT, Healthcare',
                cost: 'CAD $15,000 - $40,000/year'
              },
              {
                country: 'Australia',
                universities: '40+ Universities',
                popular: 'Engineering, Business, Science',
                cost: 'AUD $20,000 - $45,000/year'
              },
              {
                country: 'Germany',
                universities: '400+ Universities',
                popular: 'Engineering, Medicine, Science',
                cost: '€0 - €20,000/year'
              },
              {
                country: 'Netherlands',
                universities: '50+ Universities',
                popular: 'Business, Engineering, Arts',
                cost: '€8,000 - €20,000/year'
              }
            ].map((destination, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200">
                <h3 className="text-2xl font-bold text-navbar-blue mb-4">{destination.country}</h3>
                <div className="space-y-2 text-gray-600">
                  <p><span className="font-semibold">Universities:</span> {destination.universities}</p>
                  <p><span className="font-semibold">Popular Fields:</span> {destination.popular}</p>
                  <p><span className="font-semibold">Tuition:</span> {destination.cost}</p>
                </div>
                <button className="mt-4 w-full bg-cta-red hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200">
                  Learn More
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-navbar-blue mb-4">Application Process</h2>
            <p className="text-xl text-gray-600">Step-by-step guidance for your application</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Initial Consultation',
                description: 'Free assessment of your profile and goals'
              },
              {
                step: '02',
                title: 'Country & University Selection',
                description: 'Personalized recommendations based on your preferences'
              },
              {
                step: '03',
                title: 'Test Preparation',
                description: 'IELTS, TOEFL, GRE, GMAT preparation if needed'
              },
              {
                step: '04',
                title: 'Application Submission',
                description: 'Complete application support and document preparation'
              },
              {
                step: '05',
                title: 'Visa Assistance',
                description: 'Comprehensive visa application guidance'
              },
              {
                step: '06',
                title: 'Pre-departure Support',
                description: 'Final preparations and orientation'
              }
            ].map((process, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-highlight-yellow rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-navbar-blue font-bold text-xl">{process.step}</span>
                </div>
                <h3 className="text-xl font-bold text-navbar-blue mb-2">{process.title}</h3>
                <p className="text-gray-600">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="applications" className="py-20 bg-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-navbar-blue mb-4">Our Services</h2>
            <p className="text-xl text-gray-600">Comprehensive support for your study abroad journey</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-navbar-blue mb-4">University Applications</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-highlight-yellow text-xl mr-3">✓</span>
                  <span>Profile evaluation and university shortlisting</span>
                </li>
                <li className="flex items-start">
                  <span className="text-highlight-yellow text-xl mr-3">✓</span>
                  <span>Application essay writing assistance</span>
                </li>
                <li className="flex items-start">
                  <span className="text-highlight-yellow text-xl mr-3">✓</span>
                  <span>Letter of recommendation guidance</span>
                </li>
                <li className="flex items-start">
                  <span className="text-highlight-yellow text-xl mr-3">✓</span>
                  <span>Application deadline management</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-navbar-blue mb-4">Visa Assistance</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-highlight-yellow text-xl mr-3">✓</span>
                  <span>Visa application form completion</span>
                </li>
                <li className="flex items-start">
                  <span className="text-highlight-yellow text-xl mr-3">✓</span>
                  <span>Document preparation and verification</span>
                </li>
                <li className="flex items-start">
                  <span className="text-highlight-yellow text-xl mr-3">✓</span>
                  <span>Interview preparation and mock sessions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-highlight-yellow text-xl mr-3">✓</span>
                  <span>Follow-up and status tracking</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-navbar-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Start Your Study Abroad Journey Today
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Get personalized guidance from our expert counselors
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact-us"
              className="bg-cta-red hover:bg-red-600 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-200"
            >
              Get Free Consultation
            </a>
            <a
              href="/test-preparation"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-navbar-blue font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-200"
            >
              Test Preparation
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

