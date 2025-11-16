import { Metadata } from 'next';
import { Counter } from './components/Counter';

export const metadata: Metadata = {
  title: 'About Us - Laxmi Education',
  description: 'Learn about Laxmi Education\'s mission, team, and commitment to helping students achieve their international education dreams.',
};

export default function AboutUs() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-navbar-blue to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Laxmi Education</h1>
            <p className="text-xl md:text-2xl text-blue-100">
              Your trusted partner in international education
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            {/* Our Mission */}
            <div className="group">
              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 group-hover:text-navbar-blue transition-colors duration-300">Our Mission</h2>
                <div className="w-20 h-1 bg-navbar-blue mb-8 group-hover:w-32 transition-all duration-500"></div>
              </div>
              <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                  At Laxmi Education, we believe that every student deserves the opportunity to pursue their dreams of international education. Our mission is to provide comprehensive, personalized guidance that empowers students to make informed decisions about their academic and career paths.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                  We are committed to breaking down barriers and making quality education accessible to students from all backgrounds, helping them achieve their goals through expert counseling, test preparation, and application support.
                </p>
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="group">
              <div className="mb-12">
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 group-hover:text-navbar-blue transition-colors duration-300">Why Choose Us?</h3>
                <div className="w-20 h-1 bg-navbar-blue mb-8 group-hover:w-32 transition-all duration-500"></div>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed mb-10 group-hover:text-gray-800 transition-colors duration-300">
                With over 20 years of collective experience in the best college/university admission process, we have everything a student needs to find their dream destination. From independent and top private schools to public universities, we understand admission requirements thoroughly.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-6 group/item hover:bg-gray-50 p-4 rounded-lg transition-all duration-300">
                  <div className="flex-shrink-0 w-6 h-6 bg-navbar-blue rounded-full flex items-center justify-center mt-2 group-hover/item:scale-110 transition-transform duration-300">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-3 group-hover/item:text-navbar-blue transition-colors duration-300">QEAC-Certified Career Counseling</h4>
                    <p className="text-gray-600 leading-relaxed group-hover/item:text-gray-700 transition-colors duration-300">We have 30+ QEAC-certified counselors ensuring the highest quality of career guidance and counseling services.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-6 group/item hover:bg-gray-50 p-4 rounded-lg transition-all duration-300">
                  <div className="flex-shrink-0 w-6 h-6 bg-navbar-blue rounded-full flex items-center justify-center mt-2 group-hover/item:scale-110 transition-transform duration-300">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-3 group-hover/item:text-navbar-blue transition-colors duration-300">Simplified Assistance</h4>
                    <p className="text-gray-600 leading-relaxed group-hover/item:text-gray-700 transition-colors duration-300">We help our students with simplified and effective processes that make the complex admission journey smooth and manageable.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-6 group/item hover:bg-gray-50 p-4 rounded-lg transition-all duration-300">
                  <div className="flex-shrink-0 w-6 h-6 bg-navbar-blue rounded-full flex items-center justify-center mt-2 group-hover/item:scale-110 transition-transform duration-300">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-3 group-hover/item:text-navbar-blue transition-colors duration-300">Our Reliability</h4>
                    <p className="text-gray-600 leading-relaxed group-hover/item:text-gray-700 transition-colors duration-300">Our services' dependability is based on professionalism, adherence to best practices, and a commitment to student success.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-6 group/item hover:bg-gray-50 p-4 rounded-lg transition-all duration-300">
                  <div className="flex-shrink-0 w-6 h-6 bg-navbar-blue rounded-full flex items-center justify-center mt-2 group-hover/item:scale-110 transition-transform duration-300">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-3 group-hover/item:text-navbar-blue transition-colors duration-300">Top Universities & Colleges</h4>
                    <p className="text-gray-600 leading-relaxed group-hover/item:text-gray-700 transition-colors duration-300">We offer access to top-notch colleges across the globe, ensuring students have the best educational opportunities available.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Our Goal Section */}
          <div className="mt-24">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Goal</h2>
              <div className="w-20 h-1 bg-navbar-blue mx-auto mb-8"></div>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-12 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="space-y-6">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Our primary goal at Laxmi Educational Consultancy is to provide access to the best education to students worldwide, be it in colleges, universities, or beyond. We believe that every student deserves a fair chance to succeed in their academic pursuits, and we are committed to making that happen.
                  </p>
                  
                  <p className="text-lg text-gray-700 leading-relaxed">
                    We understand that the admission process can be a daunting task, especially in a highly competitive educational environment. Therefore, we have taken it upon ourselves to simplify the process for students. Our core values are centered on providing the best services to our clients, ensuring that they secure admission to the college of their dreams.
                  </p>
                  
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Our mission is to help as many students as possible achieve their academic goals through the right education. We work closely with our students to understand their specific requirements and create a personalized plan for their success.
                  </p>
                  
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Our team is passionate about helping students succeed and is dedicated to working in tandem with them to ensure that they reach their full potential. We believe that education is the key to unlocking one's true potential and are committed to making it accessible to everyone.
                  </p>
                  
                  <div className="bg-white rounded-lg p-6 mt-8 border-l-4 border-navbar-blue">
                    <p className="text-lg text-gray-800 font-medium leading-relaxed">
                      In summary, we are a team of dedicated professionals committed to empowering students with the right education and creating opportunities for them to achieve their dreams. We believe that education is the key to a brighter future and are committed to making it accessible to all.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics Section */}
          <div className="mt-24 bg-gray-50 border-t border-gray-200 hover:bg-gray-100 transition-colors duration-500">
            <div className="max-w-5xl mx-auto py-16">
              <div className="text-center mb-12">
                <h4 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 hover:text-navbar-blue transition-colors duration-300">Our Track Record</h4>
                <div className="w-16 h-1 bg-navbar-blue mx-auto hover:w-24 transition-all duration-500"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="text-center group/stat hover:scale-105 transition-transform duration-300">
                  <div className="text-4xl font-bold text-navbar-blue mb-3 group-hover/stat:scale-110 transition-transform duration-300">
                    <Counter end={20} duration={2000} suffix="+" />
                  </div>
                  <div className="text-lg text-gray-700 font-medium mb-2 group-hover/stat:text-gray-900 transition-colors duration-300">Years of Experience</div>
                  <div className="text-gray-500 group-hover/stat:text-gray-600 transition-colors duration-300">Trusted expertise in international education</div>
                </div>
                <div className="text-center group/stat hover:scale-105 transition-transform duration-300">
                  <div className="text-4xl font-bold text-navbar-blue mb-3 group-hover/stat:scale-110 transition-transform duration-300">
                    <Counter end={30} duration={2500} suffix="+" />
                  </div>
                  <div className="text-lg text-gray-700 font-medium mb-2 group-hover/stat:text-gray-900 transition-colors duration-300">QEAC-Certified Counselors</div>
                  <div className="text-gray-500 group-hover/stat:text-gray-600 transition-colors duration-300">Professional guidance you can trust</div>
                </div>
                <div className="text-center group/stat hover:scale-105 transition-transform duration-300">
                  <div className="text-4xl font-bold text-navbar-blue mb-3 group-hover/stat:scale-110 transition-transform duration-300">Global</div>
                  <div className="text-lg text-gray-700 font-medium mb-2 group-hover/stat:text-gray-900 transition-colors duration-300">Offices Worldwide</div>
                  <div className="text-gray-500 group-hover/stat:text-gray-600 transition-colors duration-300">Supporting students globally</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-20 bg-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-navbar-blue mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Let our expert team guide you towards your international education goals
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact-us"
              className="bg-cta-red hover:bg-red-600 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-200"
            >
              Get Free Consultation
            </a>
            <a
              href="/study-abroad"
              className="bg-transparent border-2 border-navbar-blue text-navbar-blue hover:bg-navbar-blue hover:text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-200"
            >
              Explore Programs
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

