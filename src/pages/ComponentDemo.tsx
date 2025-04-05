import React from 'react';
import { Activity, Clock, Users, ArrowRight, Heart, Settings, Send, Info, HelpCircle, Mail } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';
import ScrollProgress from '../components/ScrollProgress';
import TextAnimation from '../components/TextAnimation';
import StatsCard from '../components/StatsCard';
import ImageCarousel from '../components/ImageCarousel';
import Testimonial from '../components/Testimonial';
import FeatureCard from '../components/FeatureCard';
import FilterableGallery from '../components/FilterableGallery';
import FAQ from '../components/FAQ';
import ContactForm from '../components/ContactForm';
import AnimatedButton from '../components/AnimatedButton';

const ComponentDemo: React.FC = () => {
  // Mock data for components
  const testimonialData = {
    quote: "Project Setu has transformed how we approach sustainable development. Their platform made it easy for us to connect with the right resources and implement impactful solutions.",
    author: "Aanya Sharma",
    role: "Program Director",
    company: "Green Future Initiative",
    rating: 5
  };
  
  const carouselImages = [
    { src: "https://source.unsplash.com/random/800x600?nature", alt: "Nature", caption: "Beautiful natural landscapes" },
    { src: "https://source.unsplash.com/random/800x600?water", alt: "Water", caption: "Water conservation efforts" },
    { src: "https://source.unsplash.com/random/800x600?sustainable", alt: "Sustainability", caption: "Sustainable living" }
  ];
  
  const galleryItems = [
    { id: 1, image: "https://source.unsplash.com/random/600x600?farming", title: "Sustainable Farming", category: "agriculture", description: "Innovative farming techniques" },
    { id: 2, image: "https://source.unsplash.com/random/600x600?solar", title: "Solar Energy", category: "energy", description: "Renewable energy solutions" },
    { id: 3, image: "https://source.unsplash.com/random/600x600?water", title: "Water Management", category: "water", description: "Efficient water usage systems" },
    { id: 4, image: "https://source.unsplash.com/random/600x600?community", title: "Community Gardens", category: "agriculture", description: "Community-led initiatives" },
    { id: 5, image: "https://source.unsplash.com/random/600x600?windmill", title: "Wind Power", category: "energy", description: "Harnessing wind energy" },
    { id: 6, image: "https://source.unsplash.com/random/600x600?rainwater", title: "Rainwater Harvesting", category: "water", description: "Collection and storage solutions" }
  ];
  
  const faqItems = [
    { id: 1, question: "What is Project Setu?", answer: "Project Setu is a platform that connects sustainable development initiatives with resources and expertise to help implement effective solutions across rural India.", category: "general" },
    { id: 2, question: "How can I volunteer?", answer: "You can volunteer by creating an account on our platform and selecting the 'Volunteer' option. You'll be able to browse projects that need assistance and connect directly with project coordinators.", category: "involvement" },
    { id: 3, question: "What areas do you focus on?", answer: "We focus on sustainable agriculture, renewable energy, water conservation, waste management, and education. These key areas are essential for building resilient rural communities.", category: "general" },
    { id: 4, question: "How is funding allocated?", answer: "Funding is directly allocated to verified projects based on specific needs and milestones. Our platform ensures transparency by tracking and reporting on how funds are utilized and the impact created.", category: "funding" }
  ];

  // Handle form submission
  const handleFormSubmit = async (formData: Record<string, string>) => {
    console.log('Form submitted:', formData);
    // Simulate API call
    return new Promise<void>((resolve) => setTimeout(resolve, 2000));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ScrollProgress />
      
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm py-4 sticky top-0 z-10">
        <div className="container-custom flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary-600 dark:text-primary-400">UI Components</h1>
          <ThemeToggle />
        </div>
      </header>
      
      {/* Main content */}
      <main className="container-custom py-8">
        <div className="prose dark:prose-invert max-w-none mb-12">
          <h1>Project Setu UI Component Library</h1>
          <p>
            A collection of reusable UI components designed for the Project Setu website. These components
            are built with React, TypeScript, and Tailwind CSS, providing a modern, responsive, and
            accessible user interface.
          </p>
          <p>
            <TextAnimation 
              texts={["Beautiful.", "Interactive.", "Accessible.", "Responsive."]} 
              className="text-2xl font-bold text-primary-600 dark:text-primary-400"
            />
          </p>
        </div>
        
        <div className="space-y-16">
          {/* Buttons Section */}
          <section id="buttons" className="border-t pt-12">
            <h2 className="section-title">Animated Buttons</h2>
            <p className="section-subtitle">Interactive and engaging button components with various styles and animations.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="card p-6 flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Variants</h3>
                <AnimatedButton variant="primary">Primary Button</AnimatedButton>
                <AnimatedButton variant="secondary">Secondary Button</AnimatedButton>
                <AnimatedButton variant="outline">Outline Button</AnimatedButton>
                <AnimatedButton variant="text">Text Button</AnimatedButton>
                <AnimatedButton variant="glass" className="bg-primary-600">Glass Button</AnimatedButton>
              </div>
              
              <div className="card p-6 flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Sizes</h3>
                <AnimatedButton size="sm">Small Button</AnimatedButton>
                <AnimatedButton size="md">Medium Button</AnimatedButton>
                <AnimatedButton size="lg">Large Button</AnimatedButton>
                <AnimatedButton fullWidth>Full Width Button</AnimatedButton>
                <AnimatedButton variant="outline" size="lg" fullWidth>Full Width Large</AnimatedButton>
              </div>
              
              <div className="card p-6 flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Animations</h3>
                <AnimatedButton animation="pulse">Pulse Effect</AnimatedButton>
                <AnimatedButton animation="bounce">Bounce Effect</AnimatedButton>
                <AnimatedButton animation="scale">Scale Effect</AnimatedButton>
                <AnimatedButton animation="shine">Shine Effect</AnimatedButton>
                <AnimatedButton animation="ripple">Ripple Effect</AnimatedButton>
              </div>
              
              <div className="card p-6 flex flex-col gap-4">
                <h3 className="text-xl font-semibold">With Icons</h3>
                <AnimatedButton icon={<ArrowRight />}>Icon Right</AnimatedButton>
                <AnimatedButton icon={<Heart />} iconPosition="left">Icon Left</AnimatedButton>
                <AnimatedButton variant="outline" icon={<Settings />} rounded="full">Rounded Full</AnimatedButton>
                <AnimatedButton variant="secondary" icon={<Send />} iconPosition="right">Send Message</AnimatedButton>
                <AnimatedButton disabled>Disabled Button</AnimatedButton>
              </div>
              
              <div className="card p-6 flex flex-col gap-4">
                <h3 className="text-xl font-semibold">States</h3>
                <AnimatedButton loading>Loading</AnimatedButton>
                <AnimatedButton loading loadingText="Sending...">Send</AnimatedButton>
                <AnimatedButton disabled>Disabled</AnimatedButton>
                <AnimatedButton href="https://example.com" target="_blank">Link Button</AnimatedButton>
                <AnimatedButton type="submit" variant="primary">Submit Form</AnimatedButton>
              </div>
              
              <div className="card p-6 flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Rounded Corners</h3>
                <AnimatedButton rounded="none">No Rounding</AnimatedButton>
                <AnimatedButton rounded="sm">Small Rounding</AnimatedButton>
                <AnimatedButton rounded="md">Medium Rounding</AnimatedButton>
                <AnimatedButton rounded="lg">Large Rounding</AnimatedButton>
                <AnimatedButton rounded="full">Fully Rounded</AnimatedButton>
              </div>
            </div>
          </section>
          
          {/* Stats Cards */}
          <section id="stats-cards" className="border-t pt-12">
            <h2 className="section-title">Stats Cards</h2>
            <p className="section-subtitle">Animated statistics display with countup effect.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard 
                value={2500} 
                label="Farmers Impacted" 
                icon={<Users className="w-8 h-8 text-primary-500" />}
                suffix="+"
              />
              
              <StatsCard 
                value={150} 
                label="Projects Completed" 
                icon={<Activity className="w-8 h-8 text-secondary-500" />}
              />
              
              <StatsCard 
                value={35000} 
                label="Volunteer Hours" 
                icon={<Clock className="w-8 h-8 text-terracotta-500" />}
                formatValue={(value) => `${(value / 1000).toFixed(1)}k`}
              />
              
              <StatsCard 
                value={85} 
                label="Success Rate" 
                suffix="%"
                backgroundColor="bg-primary-50 dark:bg-primary-900/20"
              />
            </div>
          </section>
          
          {/* Image Carousel */}
          <section id="image-carousel" className="border-t pt-12">
            <h2 className="section-title">Image Carousel</h2>
            <p className="section-subtitle">Interactive image slideshow with controls and captions.</p>
            
            <div className="mx-auto max-w-4xl">
              <ImageCarousel 
                images={carouselImages}
                height="h-96"
                showCaptions={true}
              />
            </div>
          </section>
          
          {/* Testimonials */}
          <section id="testimonials" className="border-t pt-12">
            <h2 className="section-title">Testimonials</h2>
            <p className="section-subtitle">Showcase feedback and reviews with different style options.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Testimonial 
                quote={testimonialData.quote}
                author={testimonialData.author}
                role={testimonialData.role}
                company={testimonialData.company}
                rating={testimonialData.rating}
                variant="card"
                avatar="https://randomuser.me/api/portraits/women/44.jpg"
              />
              
              <Testimonial 
                quote="The resources provided by Project Setu were instrumental in setting up our village's first solar-powered irrigation system."
                author="Rajiv Patel"
                role="Village Head"
                variant="minimal"
                avatar="https://randomuser.me/api/portraits/men/32.jpg"
              />
              
              <Testimonial 
                quote="As a corporate partner, we've found Project Setu's approach to be transparent and impact-focused. Our CSR investment has shown real, measurable results."
                author="Priya Mehta"
                role="CSR Director"
                company="EcoTech Solutions"
                variant="featured"
                avatar="https://randomuser.me/api/portraits/women/68.jpg"
              />
            </div>
          </section>
          
          {/* Feature Cards */}
          <section id="feature-cards" className="border-t pt-12">
            <h2 className="section-title">Feature Cards</h2>
            <p className="section-subtitle">Highlight features, services or content in various layouts.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <FeatureCard
                title="Sustainable Agriculture"
                description="Promoting regenerative farming practices that improve soil health, increase biodiversity, and enhance crop yields sustainably."
                icon={<Activity size={24} />}
                linkText="Learn more"
                linkUrl="#"
                variant="default"
              />
              
              <FeatureCard
                title="Water Conservation"
                description="Implementing innovative water management solutions to address scarcity and improve access to clean water."
                image="https://source.unsplash.com/random/800x600?water"
                linkText="Explore projects"
                linkUrl="#"
                variant="boxed"
              />
              
              <FeatureCard
                title="Renewable Energy"
                description="Harnessing solar, wind, and biogas energy to power rural communities and reduce dependence on fossil fuels."
                icon={<Settings size={24} />}
                isNew={true}
                variant="boxed"
              />
            </div>
            
            <FeatureCard
              title="Community Engagement"
              description="Building local capacity through training, education, and participatory approaches to ensure long-term sustainability of initiatives."
              icon={<Users size={24} />}
              linkText="Join our community"
              linkUrl="#"
              variant="horizontal"
              className="mb-6"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <FeatureCard
                title="Knowledge Sharing"
                description="Creating an ecosystem where successful practices and lessons learned are documented and shared across communities."
                icon={<Info size={20} />}
                variant="minimal"
              />
              
              <FeatureCard
                title="Technology Integration"
                description="Leveraging appropriate technologies to enhance project impact and enable data-driven decision making."
                icon={<Settings size={20} />}
                variant="minimal"
              />
            </div>
          </section>
          
          {/* Filterable Gallery */}
          <section id="filterable-gallery" className="border-t pt-12">
            <h2 className="section-title">Filterable Gallery</h2>
            <p className="section-subtitle">Interactive gallery with category filtering and hover effects.</p>
            
            <FilterableGallery 
              items={galleryItems}
              showCaptions={true}
              hoverEffect="zoom"
              animationType="fade"
              columns={3}
            />
          </section>
          
          {/* FAQ Component */}
          <section id="faq" className="border-t pt-12">
            <h2 className="section-title">FAQ Component</h2>
            <p className="section-subtitle">Searchable and categorized frequently asked questions.</p>
            
            <FAQ 
              items={faqItems}
              title="Frequently Asked Questions"
              description="Find answers to common questions about Project Setu, our initiatives, and how you can get involved."
              showSearch={true}
            />
          </section>
          
          {/* Contact Form */}
          <section id="contact-form" className="border-t pt-12">
            <h2 className="section-title">Contact Form</h2>
            <p className="section-subtitle">Responsive form with validation and feedback.</p>
            
            <div className="max-w-2xl mx-auto">
              <ContactForm 
                onSubmit={handleFormSubmit}
                title="Get in Touch"
                subtitle="Have questions or want to get involved? Send us a message and we'll get back to you as soon as possible."
                fields={[
                  {
                    name: 'name',
                    label: 'Full Name',
                    type: 'text',
                    placeholder: 'Your name',
                    required: true,
                  },
                  {
                    name: 'email',
                    label: 'Email Address',
                    type: 'email',
                    placeholder: 'your.email@example.com',
                    required: true,
                    validation: {
                      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Please enter a valid email address',
                    },
                  },
                  {
                    name: 'subject',
                    label: 'Subject',
                    type: 'select',
                    required: true,
                    options: [
                      { value: 'general', label: 'General Inquiry' },
                      { value: 'volunteer', label: 'Volunteering' },
                      { value: 'partnership', label: 'Partnership Opportunities' },
                      { value: 'support', label: 'Technical Support' },
                    ],
                  },
                  {
                    name: 'message',
                    label: 'Message',
                    type: 'textarea',
                    placeholder: 'Your message here...',
                    required: true,
                    validation: {
                      minLength: 10,
                      message: 'Message must be at least 10 characters',
                    },
                  },
                ]}
                layout="vertical"
              />
            </div>
          </section>
          
          {/* Text Animation */}
          <section id="text-animation" className="border-t pt-12">
            <h2 className="section-title">Text Animation</h2>
            <p className="section-subtitle">Animated text with typing effect.</p>
            
            <div className="text-center p-12 bg-white dark:bg-gray-800 rounded-xl shadow-soft mb-6">
              <h3 className="text-2xl mb-6">Project Setu is 
                <TextAnimation 
                  texts={[" innovative.", " sustainable.", " community-driven.", " impactful."]} 
                  className="text-primary-600 dark:text-primary-400 font-bold"
                  typingSpeed={80}
                  deletingSpeed={50}
                  delayBetween={2000}
                />
              </h3>
              
              <p className="text-lg mt-8">
                We believe in 
                <TextAnimation 
                  texts={[" sustainable development.", " community empowerment.", " knowledge sharing.", " appropriate technology."]} 
                  className="italic"
                  typingSpeed={70}
                  deletingSpeed={40}
                  delayBetween={1500}
                  showCursor={true}
                  cursorColor="#4ade80"
                />
              </p>
            </div>
          </section>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-8">
        <div className="container-custom">
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-300">
              Project Setu Component Library - Designed with ❤️ for a sustainable future
            </p>
            <div className="mt-4 flex items-center justify-center space-x-4">
              <AnimatedButton variant="outline" size="sm" icon={<Mail size={16} />} rounded="full">
                Contact Us
              </AnimatedButton>
              <AnimatedButton variant="text" size="sm" icon={<HelpCircle size={16} />} rounded="full">
                Help Center
              </AnimatedButton>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ComponentDemo; 