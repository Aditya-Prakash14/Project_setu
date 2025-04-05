import React from 'react';
import { Calendar, Clock, User } from 'lucide-react';

const BlogPage = () => {
  const blogContent = {
    title: "Project Setu: Bridging the Gap with Technology",
    author: "Aditya Prakash",
    date: "Feb 24, 2025",
    readTime: "5 min read",
    introduction: "In today's digital age, technology has transformed lives in urban areas, but many rural communities still lack access to basic digital tools. Project Setu aims to bridge this gap by bringing technological awareness and solutions to villages in India.",
    mission: {
      title: "Why This Project?",
      content: "Our mission with Project Setu is simple: empower rural communities using technology. During this visit, we had four primary goals:",
      goals: [
        "Identify key challenges faced by the village",
        "Assess the current availability of resources",
        "Explore technological solutions to bridge the gap",
        "Establish connections for future collaborations and development initiatives"
      ]
    },
    sections: [
      {
        title: "Meeting the Pradhan: The Voice of the Community",
        content: "The first stop in our journey was a meeting with the village Pradhan, who plays a crucial role in community leadership. He warmly welcomed us and shared his concerns about the village's primary challenges — limited employment opportunities, insufficient healthcare facilities, and a lack of digital education.",
        details: [
          "Despite these challenges, the Pradhan was optimistic about the possibilities of integrating technology into the village",
          "He expressed keen interest in initiatives that could introduce digital literacy programs, telemedicine, and online job opportunities for the youth"
        ]
      },
      {
        title: "Listening to the Villagers: Their Hopes and Struggles",
        content: "As we walked through the village, we interacted with a diverse group of people — farmers, shopkeepers, women, and young students. Each had a unique perspective, but one common theme stood out: the need for education and skills training.",
        details: [
          "Many villagers expressed interest in learning digital skills but lacked access to computers and the internet",
          "Farmers were eager to learn how technology could help them predict weather conditions and access better markets",
          "Women wanted to explore online opportunities for small businesses and financial independence",
          "Young students were excited about digital learning but had never had access to online study materials"
        ]
      },
      {
        title: "The Primary School: Building a Foundation for Digital Learning",
        content: "Next, we visited the village's primary school (KG to Class 5). The principal shared valuable insights about the students' enthusiasm for learning and the dedication of the teachers. However, the school lacked basic digital infrastructure.",
        details: [
          "Challenges: They have computers but no well-trained mentor and limited knowledge of digital tools",
          "Potential Solutions: Introducing interactive digital lessons and training teachers on educational technology",
          "Despite these limitations, the students' curiosity and excitement to learn about technology gave us hope"
        ]
      },
      {
        title: "The Secondary School: Preparing for the Future",
        content: "At the secondary school (Class 6 to 12), we found a relatively better infrastructure, but the challenges were still evident.",
        details: [
          "Career Awareness: Students lacked exposure to modern job opportunities",
          "Digital Divide: Limited or no access to online educational resources",
          "Teacher Support: Teachers wanted to integrate technology but needed proper training"
        ]
      },
      {
        title: "A Conversation with a Farmer: The Role of Technology in Agriculture",
        content: "One of the most eye-opening conversations we had was with a local farmer. He spoke about the uncertainties in agriculture due to unpredictable weather and market fluctuations.",
        details: [
          "Weather forecasting apps to plan farming schedules",
          "Online marketplaces to sell produce directly to buyers without middlemen",
          "Smart irrigation techniques to optimize water usage"
        ]
      }
    ],
    challenges: {
      title: "Challenges Identified",
      content: "Through our conversations, we identified key areas that need urgent attention:",
      items: [
        "Education: Schools require digital tools, teacher training, and access to online learning",
        "Employment & Skills: Vocational training programs can help the youth find better opportunities",
        "Healthcare: Telemedicine services could improve healthcare access",
        "Digital Awareness: Internet access and training programs are essential for digital empowerment"
      ]
    },
    nextSteps: {
      title: "What's Next? Our Action Plan",
      content: "This is just the beginning of Project Setu. Based on our findings, here's what we plan to do next:",
      items: [
        "Launch a Digital Learning Program — Set up basic digital infrastructure in schools",
        "Organize Technology Workshops — Train teachers and students in digital literacy",
        "Support Job & Skill Development — Collaborate with organizations to provide vocational training",
        "Improve Healthcare Access — Work with medical professionals to introduce telemedicine services"
      ]
    },
    conclusion: {
      title: "Conclusion",
      content: "Our first field visit with Project Setu has been an incredible learning experience. It has reaffirmed our belief that technology can be a powerful tool for change, even in the most remote villages. We are committed to continuing this journey and expanding our efforts to help more communities."
    }
  };

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <article className="bg-white rounded-lg shadow-sm p-8">
          {/* Header */}
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-black mb-4">{blogContent.title}</h1>
            <div className="flex items-center text-black space-x-4">
              <div className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                <span>{blogContent.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                <span>{blogContent.date}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                <span>{blogContent.readTime}</span>
              </div>
            </div>
          </header>

          {/* Introduction */}
          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-xl text-black">{blogContent.introduction}</p>
          </div>

          {/* Mission */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">{blogContent.mission.title}</h2>
            <p className="text-black mb-4">{blogContent.mission.content}</p>
            <ul className="list-disc list-inside text-black space-y-2">
              {blogContent.mission.goals.map((goal, index) => (
                <li key={index}>{goal}</li>
              ))}
            </ul>
          </section>

          {/* Main Content Sections */}
          {blogContent.sections.map((section, index) => (
            <section key={index} className="mb-12">
              <h2 className="text-3xl font-bold text-black mb-4">{section.title}</h2>
              <p className="text-black mb-4">{section.content}</p>
              {section.details && (
                <ul className="list-disc list-inside text-black space-y-2">
                  {section.details.map((detail, idx) => (
                    <li key={idx}>{detail}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          {/* Challenges */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">{blogContent.challenges.title}</h2>
            <p className="text-black mb-4">{blogContent.challenges.content}</p>
            <ul className="list-disc list-inside text-black space-y-2">
              {blogContent.challenges.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          {/* Next Steps */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">{blogContent.nextSteps.title}</h2>
            <p className="text-black mb-4">{blogContent.nextSteps.content}</p>
            <ul className="list-disc list-inside text-black space-y-2">
              {blogContent.nextSteps.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          {/* Conclusion */}
          <section>
            <h2 className="text-3xl font-bold text-black mb-4">{blogContent.conclusion.title}</h2>
            <p className="text-black">{blogContent.conclusion.content}</p>
          </section>
        </article>
      </div>
    </div>
  );
};

export default BlogPage;