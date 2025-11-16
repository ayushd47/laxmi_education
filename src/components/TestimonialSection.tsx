import React from 'react';

interface Testimonial {
  id: number;
  name: string;
  university: string;
  country: string;
  program: string;
  rating: number;
  text: string;
  image?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Priya Sharma",
    university: "University of Toronto",
    country: "Canada",
    program: "Master's in Computer Science",
    rating: 5,
    text: "Laxmi Education made my dream of studying in Canada come true. Their guidance throughout the application process was exceptional. From university selection to visa assistance, they were with me every step of the way.",
  },
  {
    id: 2,
    name: "Rajesh Thapa",
    university: "University of Melbourne",
    country: "Australia",
    program: "Bachelor's in Engineering",
    rating: 5,
    text: "The team at Laxmi Education is incredibly professional and knowledgeable. They helped me secure admission to my top choice university and provided excellent support during the entire process.",
  },
  {
    id: 3,
    name: "Sita Gurung",
    university: "University of Manchester",
    country: "UK",
    program: "Master's in Business Administration",
    rating: 5,
    text: "I couldn't have asked for better guidance. Laxmi Education helped me with everything from IELTS preparation to scholarship applications. Highly recommended for anyone looking to study abroad.",
  },
  {
    id: 4,
    name: "Amit Singh",
    university: "Arizona State University",
    country: "USA",
    program: "PhD in Data Science",
    rating: 5,
    text: "The expertise and dedication of the Laxmi Education team is unmatched. They helped me navigate the complex PhD application process and secure funding. Truly grateful for their support.",
  },
  {
    id: 5,
    name: "Anita Maharjan",
    university: "University of Auckland",
    country: "New Zealand",
    program: "Master's in Public Health",
    rating: 5,
    text: "From the initial consultation to landing in New Zealand, Laxmi Education provided comprehensive support. Their attention to detail and personalized approach made all the difference.",
  },
  {
    id: 6,
    name: "Bikash Karki",
    university: "Technical University of Munich",
    country: "Germany",
    program: "Master's in Mechanical Engineering",
    rating: 5,
    text: "Laxmi Education helped me achieve my goal of studying in Germany. Their knowledge of European education systems and visa requirements was invaluable. Excellent service!",
  },
];

const TestimonialSection: React.FC = () => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${
          index < rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-navbar-blue mb-4">
            What Our Students Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from successful students who achieved their dreams of international education with our guidance
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 relative group"
            >
              {/* Quote Icon */}
              <div className="absolute top-4 right-4 text-royal-blue opacity-20">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                </svg>
              </div>

              {/* Rating Stars */}
              <div className="flex items-center mb-4">
                {renderStars(testimonial.rating)}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.text}"
              </blockquote>

              {/* Student Info */}
              <div className="border-t pt-4">
                <div className="flex items-center space-x-3">
                  {/* Avatar */}
                  <div className="w-12 h-12 bg-gradient-to-br from-royal-blue to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  
                  {/* Student Details */}
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 text-lg">
                      {testimonial.name}
                    </h4>
                    <p className="text-royal-blue font-medium">
                      {testimonial.program}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {testimonial.university}, {testimonial.country}
                    </p>
                  </div>
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-royal-blue/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-navbar-blue mb-4">
              Ready to Start Your Journey?
            </h3>
            <p className="text-gray-600 mb-6 text-lg">
              Join thousands of successful students who achieved their international education dreams with our expert guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact-us"
                className="bg-cta-red hover:bg-red-600 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-200 inline-block"
              >
                Get Free Consultation
              </a>
              <a
                href="/study-abroad"
                className="border-2 border-royal-blue text-royal-blue hover:bg-royal-blue hover:text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-200 inline-block"
              >
                Explore Programs
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
