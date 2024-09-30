import React from 'react';

const testimonialsData = [
  {
    id: 1,
    name: 'Alice Johnson',
    feedback: 'This quiz platform has greatly improved my understanding of the topics!',
    role: 'Student',
  },
  {
    id: 2,
    name: 'Bob Smith',
    feedback: 'I love the variety of quizzes available. Highly recommend it!',
    role: 'Engineer',
  },
  {
    id: 3,
    name: 'Charlie Brown',
    feedback: 'A fantastic way to prepare for my exams. The explanations are super helpful!',
    role: 'Graduate',
  },
];

const Testimonials = () => {
  return (
    <div className="bg-gray-100 p-8">
      <h2 className="text-3xl font-bold text-center mb-6">What Our Users Say</h2>
      <div className="flex flex-col md:flex-row md:justify-around">
        {testimonialsData.map(testimonial => (
          <div key={testimonial.id} className="bg-white shadow-md rounded-lg p-6 mb-4 md:mb-0 md:w-1/3">
            <p className="text-gray-600 italic">"{testimonial.feedback}"</p>
            <p className="mt-4 font-semibold">{testimonial.name}</p>
            <p className="text-gray-500">{testimonial.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
