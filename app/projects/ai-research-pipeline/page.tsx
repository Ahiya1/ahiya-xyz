"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface SampleNarrative {
  id: string;
  title: string;
  profile: {
    age: string;
    sport: string;
    region: string;
    citySize: string;
    background: string;
    trainingHours: string;
    travelTime: string;
    cost: string;
  };
  narrative: string;
}

const AIResearchPipelinePage: React.FC = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const [activeNarrative, setActiveNarrative] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const sampleNarratives: SampleNarrative[] = [
    {
      id: "orthodox-basketball",
      title: "Orthodox Jewish Basketball Player",
      profile: {
        age: "17-18 years old",
        sport: "Basketball",
        region: "South",
        citySize: "Large City",
        background: "Ultra-Orthodox Jewish",
        trainingHours: "16-18 hours/week",
        travelTime: "1+ hour each way",
        cost: "Few hundred shekels/month",
      },
      narrative: `I started playing basketball at 12, when my mother was looking for suitable physical activity for Orthodox girls. The club was one of the few that offered a framework adapted to our background\u2014all training respected modesty rules.

Training 16-18 hours a week became my entire life. Between my younger sisters, homework, and house chores, I only had time left for sleep. I'd wake at 5:30 AM for strength training, return for classes, then back to practice in the afternoon. Every day.

The hour-and-a-half drive each way completely destroyed me. Dad drove me every time, and I could see how it exhausted him too. He left work, waited in the car for two hours, then another hour and a half home. It was hard on the whole family.

Our Orthodox background created unique challenges\u2014finding appropriate facilities, proper clothing, and dealing with stares from people who didn't understand how a Haredi girl could play basketball at a high level. Sometimes I felt like an alien between two worlds.

A few hundred shekels a month doesn't sound like much, but for a family with limited income, it was extremely hard. Counting every shekel, while knowing I needed better equipment, personal training, overseas competitions.

I decided to leave when I realized I wasn't enjoying it anymore. The physical, emotional, and financial pressure became unbearable. At 17, I felt like an old woman who had already given everything. I wanted to live a normal life like other girls my age.`,
    },
    {
      id: "muslim-sailor",
      title: "Muslim Arab Sailor",
      profile: {
        age: "15-16 years old",
        sport: "Sailing",
        region: "North",
        citySize: "Small City",
        background: "Muslim Arab",
        trainingHours: "18-20 hours/week",
        travelTime: "Under 1 hour",
        cost: "Free",
      },
      narrative: `My Experience as a Muslim Sailor Who Left Competitive Sport

I started sailing almost by accident. One summer, the local yacht club opened a free youth program, and my parents encouraged me to try. From the first moment I went out on the water, I felt a freedom I'd never known. The sea doesn't recognize religion or gender\u2014only talent and determination.

18-20 hours of training per week meant my life revolved around the club. I woke at five in the morning, returned at seven or eight in the evening. Teachers at school complained about absences, and close friends drifted away. The 45-minute drive to the club was my only time to rest, listen to music, or just review lessons.

My cultural background added complex challenges. I wore a special suit that covered my entire body, even in the heavy Galilee summer heat. Some Jewish parents at the club weren't comfortable with my presence, and I always felt I needed to prove myself twice as hard. On the other hand, I received surprising support from my community\u2014everyone was proud of my achievements.

The fact that training was free opened doors that could never have opened otherwise. The club provided everything\u2014equipment, transportation to competitions, even food.

I left because of emotional pressure. At 16, I felt I was missing my childhood. I decided to focus on studies and preparing for matriculation exams, instead of dedicating all my time to athletic professionalism that might lead nowhere.`,
    },
    {
      id: "druze-basketball",
      title: "Druze Basketball Player",
      profile: {
        age: "13-14 years old",
        sport: "Basketball",
        region: "South",
        citySize: "Small City",
        background: "Druze",
        trainingHours: "16-18 hours/week",
        travelTime: "1+ hour each way",
        cost: "Free",
      },
      narrative: `I started playing basketball at 11 when a coach from a club in a nearby city saw me at "Sports Day" at school. My height and speed attracted him, and he invited me to join. As a Druze girl from a small village in the Upper Galilee, it was a dream\u2014to play basketball at a high level!

Training 16-18 hours a week was exhausting. I'd come home from school at 3, immediately eat and prepare for the drive. Every Monday, Wednesday, and Friday we drove to Safed\u2014over an hour each way. In total, we spent 4-5 hours away from home every training day. My grandfather drove me most of the time because mom worked, and he was so proud.

My Druze background was both an advantage and disadvantage. On one hand, our community strongly supports education and achievement, and my family celebrated every accomplishment. But on the other hand, not many Druze girls play at a competitive level, and sometimes I felt alone. Saturdays were also complicated because of living near a Jewish town.

The cost was zero, but the gas and family time cost a lot. Grandfather spent hours on the road for me, and mom gave up extra shifts to come to games.

In the end, I decided to leave because the tension between school and training was too hard. Grades dropped, and I felt I was missing adolescence\u2014friends, parties, time with extended family. At 14, I chose to return to a more "normal" life.`,
    },
    {
      id: "christian-taekwondo",
      title: "Christian Arab Taekwondo Athlete",
      profile: {
        age: "19-20 years old",
        sport: "Taekwondo",
        region: "Center",
        citySize: "Small City",
        background: "Christian Arab",
        trainingHours: "16-18 hours/week",
        travelTime: "1+ hour each way",
        cost: "Free (municipal scholarship)",
      },
      narrative: `I started taekwondo at 12 when I was looking for a way to strengthen my self-confidence. As a Christian Arab from a small city in the center, I felt a need to prove myself and find a place where I could excel. This sport gave me an inner strength and sense of personal achievement I'd never experienced anywhere else.

Training 16-18 hours a week took over my entire life. I woke at five in the morning, drove over an hour to the training facility, returned home exhausted in the evening. The long drives stole another three hours daily\u2014time I could have invested in studies or friendships. I felt disconnected from my peers, and my social life centered only around the dojo.

As a Christian Arab, I sometimes faced strange looks and questions about my background. Some parents were surprised to hear me speaking Arabic with my mom, but most of the sports community welcomed me warmly. My coach always emphasized that in taekwondo we're equal, regardless of background.

The zero financial cost was thanks to a municipal scholarship program, which allowed my family to support my dream. Without it, I couldn't have afforded to continue.

I left at 19 when I realized academic career was more important. I wanted to study psychology, and combining long drives, exhausting training, and studies became impossible. It was very hard, but I knew it was the right choice for my future.`,
    },
    {
      id: "christian-handball",
      title: "Christian Arab Handball Player",
      profile: {
        age: "17-18 years old",
        sport: "Handball",
        region: "Center",
        citySize: "Large City",
        background: "Christian Arab",
        trainingHours: "20-22 hours/week",
        travelTime: "1+ hour each way",
        cost: "Free",
      },
      narrative: `I started handball at 11, after my mother looked for an activity to help me express myself and release school pressures. In our Arab-Christian community, sport was always seen as good for girls\u2014something that builds confidence and develops discipline.

Training 20-22 hours weekly was insane. I woke at 5:30 AM to drive to the training facility in the north, a journey of an hour and fifteen minutes each way. I only got home at 9 PM, tired and hungry. Those long drives took another three hours from my day, meaning my day was 15-16 hours just because of sport.

As a Christian Arab in a sport where most athletes are Jewish, I sometimes felt disconnected. The language at home was Arabic, but in training everything was perfect Hebrew. On Christian holidays, I was the only one absent from practice, and sometimes I felt I needed to explain and justify my culture.

The fact that financial investment was zero was a huge blessing for our family. Without that support, we couldn't have afforded this sport at all. Dad worked three jobs to fund gas and equipment.

In the end, I left at 17 because the physical and mental pressure became unbearable. I missed too much family and social time, and realized I wanted to focus on studies and a more normal life. Sport gave me so much, but at some point it took more than it gave.`,
    },
  ];

  const challenges = [
    "Expensive and time-consuming data collection",
    "Difficulty reaching diverse demographic groups",
    "Inconsistent response quality across populations",
    "Limited ability to generate controlled factorial designs",
  ];

  const solutions = [
    "Precise demographic control (age, location, religion, socioeconomic factors)",
    "Emotionally authentic first-person narratives",
    "Multiple distribution methods (random, equal, weighted)",
    "Bilingual support (English + Hebrew)",
    "Scalable from 100 to 10,000+ responses",
  ];

  const capabilities = [
    "Factorial design variables (any combination)",
    "Output formats (structured data, narratives)",
    "Integration options (n8n workflows, API)",
    "Quality controls and validation",
  ];

  const useCases = [
    "Academic research studies",
    "Market research and consumer insights",
    "UX research persona generation",
    "Content generation for diverse audiences",
    "Training data for ML models",
  ];

  const techStack = ["Next.js 15", "TypeScript", "React 19", "Tailwind CSS"];

  const formatKey = (key: string): string => {
    const keyMap: Record<string, string> = {
      age: "Age",
      sport: "Sport",
      region: "Region",
      citySize: "City Size",
      background: "Background",
      trainingHours: "Training",
      travelTime: "Travel",
      cost: "Cost",
    };
    return keyMap[key] || key;
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center">
        <div className="w-4 h-4 bg-purple-400 rounded-full animate-pulse" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white relative overflow-hidden">
      {/* Navigation - NO external link */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0f1a]/80 backdrop-blur-sm">
        <div className="container-wide">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-3 group">
              <Image
                src="/logo-symbol.png"
                alt="Ahiya"
                width={28}
                height={28}
                className="transition-transform duration-300 group-hover:scale-105"
              />
              <span className="text-lg font-medium">Ahiya</span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/#portfolio"
                className="text-slate-300 hover:text-white transition-colors"
              >
                Back to Portfolio
              </Link>
              <a
                href="mailto:ahiya.butman@gmail.com"
                className="gentle-button text-sm px-4 py-2"
              >
                Contact for Access
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Different badge */}
      <section className="section-breathing pt-32">
        <div className="container-content text-center">
          <div className="animate-fade-in">
            {/* Custom Solution Badge */}
            <div className="breathing-glass inline-block px-6 py-3 mb-8">
              <span className="text-amber-300 font-medium">Custom Solution</span>
            </div>

            <div className="text-6xl md:text-8xl mb-8 animate-float">
              {"\u{1F9E0}"}
            </div>

            <h1 className="display-lg spacing-comfortable text-gentle">
              AI Research Pipeline
            </h1>

            <p className="body-xl text-slate-400 spacing-comfortable">
              Factorial Design Research Tool
            </p>

            <p className="body-lg text-purple-300 max-w-2xl mx-auto spacing-generous leading-relaxed italic">
              &ldquo;Culturally nuanced, emotionally authentic research responses at
              scale&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* The Challenge Section */}
      <section className="section-breathing">
        <div className="container-content">
          <h2 className="heading-xl text-center spacing-generous">
            The Challenge
          </h2>
          <div className="contemplative-card p-6 md:p-8">
            <p className="body-lg text-slate-300 mb-6">
              Traditional survey research faces significant challenges:
            </p>
            <ul className="space-y-4">
              {challenges.map((challenge, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-red-400/60 mt-2 flex-shrink-0" />
                  <span className="text-slate-300">{challenge}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* The Solution Section */}
      <section className="section-breathing">
        <div className="container-content">
          <h2 className="heading-xl text-center spacing-generous">
            The Solution
          </h2>
          <div className="contemplative-card p-6 md:p-8">
            <p className="body-lg text-slate-300 mb-6">
              AI-powered response generation that understands cultural context:
            </p>
            <ul className="space-y-4">
              {solutions.map((solution, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-400/60 mt-2 flex-shrink-0" />
                  <span className="text-slate-300">{solution}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Sample Outputs Section - CRITICAL */}
      <section className="section-breathing">
        <div className="container-wide">
          <h2 className="heading-xl text-center spacing-comfortable">
            Sample Outputs
          </h2>
          <p className="text-center text-slate-400 mb-8">
            See the cultural nuance and emotional authenticity
          </p>

          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {sampleNarratives.map((sample, index) => (
              <button
                key={sample.id}
                onClick={() => setActiveNarrative(index)}
                className={`px-4 py-2 rounded-lg text-sm transition-all ${
                  activeNarrative === index
                    ? "bg-purple-500/20 border border-purple-400/40 text-purple-300"
                    : "bg-white/[0.04] border border-white/[0.08] text-slate-400 hover:text-slate-300"
                }`}
              >
                Sample {index + 1}
              </button>
            ))}
          </div>

          {/* Active Narrative Display */}
          <div className="contemplative-card p-6 md:p-8">
            <h3 className="heading-lg text-purple-300 mb-6">
              {sampleNarratives[activeNarrative]?.title}
            </h3>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Demographic Profile */}
              <div className="breathing-glass p-4">
                <h4 className="font-semibold text-slate-200 mb-4">
                  Demographic Profile
                </h4>
                <div className="space-y-2 text-sm">
                  {sampleNarratives[activeNarrative] &&
                    Object.entries(sampleNarratives[activeNarrative].profile).map(
                      ([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-slate-400">{formatKey(key)}:</span>
                          <span className="text-slate-300">{value}</span>
                        </div>
                      )
                    )}
                </div>
              </div>

              {/* Narrative Text */}
              <div className="md:col-span-2">
                <h4 className="font-semibold text-slate-200 mb-4">
                  Full Narrative
                </h4>
                <div className="prose prose-invert prose-sm max-w-none">
                  {sampleNarratives[activeNarrative]?.narrative
                    .split("\n\n")
                    .map((paragraph, idx) => (
                      <p key={idx} className="text-slate-300 leading-relaxed mb-4">
                        {paragraph}
                      </p>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Capabilities Section */}
      <section className="section-breathing">
        <div className="container-content">
          <h2 className="heading-xl text-center spacing-generous">
            Technical Capabilities
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {capabilities.map((capability, index) => (
              <div key={index} className="contemplative-card p-6">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-purple-400/60 mt-2 flex-shrink-0" />
                  <span className="text-slate-300">{capability}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="section-breathing">
        <div className="container-content">
          <h2 className="heading-xl text-center spacing-generous">Use Cases</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="breathing-glass p-4 text-center text-slate-300"
              >
                {useCase}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="section-breathing">
        <div className="container-content text-center">
          <h2 className="heading-xl spacing-comfortable">Tech Stack</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-white/[0.04] border border-white/[0.08] rounded-lg text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="section-breathing">
        <div className="container-narrow text-center">
          <div className="contemplative-card p-8 md:p-12">
            <h2 className="heading-xl spacing-comfortable">
              Interested in Custom Research Generation?
            </h2>
            <p className="body-lg text-slate-300 spacing-comfortable">
              This tool is available for custom research projects. Contact me to
              discuss your requirements.
            </p>
            <a
              href="mailto:ahiya.butman@gmail.com"
              className="gentle-button inline-flex items-center space-x-3"
            >
              <span>Get in Touch</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-white/5">
        <div className="container-content text-center">
          <div className="flex justify-center mb-6">
            <Image
              src="/logo-symbol.png"
              alt="Ahiya"
              width={24}
              height={24}
              className="opacity-40"
            />
          </div>
          <p className="text-slate-400 text-sm mb-4">
            Made with reverence by <span className="text-gentle">Ahiya</span>
          </p>
          <p className="text-slate-500 text-xs">
            {new Date().getFullYear()} - Building systems that work
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AIResearchPipelinePage;
