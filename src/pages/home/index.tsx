import React from 'react';
import SidebarContent from '@/components/Sidebar/SidebarContent/SidebarContent';
import HeroHome from '@/components/LandingPage/Hero/Hero';
import FeatureHome from '@/components/LandingPage/Feature/Feature';
import OurTeamSection from '@/components/LandingPage/OurTeam/OurTeam';
import TestimonialHome from '@/components/LandingPage/Testimonial/Testimonial';
import PricingHome from '@/components/LandingPage/Pricing/Pricing';
import ContactUsHome from '@/components/LandingPage/ContactUs/ContactUs';

const componentsToRender = [
  <HeroHome />,
  <FeatureHome />,
  <OurTeamSection />,
  <TestimonialHome />,
  <PricingHome />,
  <ContactUsHome />,
];

export default function Home() {
  return (
    <div className="mb-[200px]">
      {componentsToRender.map((Component, index) => (
        <SidebarContent key={index}>{Component}</SidebarContent>
      ))}
    </div>
  );
}
