import React, { useEffect, useState } from 'react';
import SidebarContent from '@/components/Sidebar/SidebarContent/SidebarContent';
import HeroHome from '@/components/LandingPage/Hero/Hero';
import FeatureHome from '@/components/LandingPage/Feature/Feature';
import OurTeamSection from '@/components/LandingPage/OurTeam/OurTeam';
import TestimonialHome from '@/components/LandingPage/Testimonial/Testimonial';
import PricingHome from '@/components/LandingPage/Pricing/Pricing';
import ContactUsHome from '@/components/LandingPage/ContactUs/ContactUs';

const componentsToRender = [
  { id: 'hero', component: <HeroHome /> },
  { id: 'feature', component: <FeatureHome /> },
  { id: 'ourTeam', component: <OurTeamSection /> },
  { id: 'testimonial', component: <TestimonialHome /> },
  { id: 'pricing', component: <PricingHome /> },
  { id: 'contactUs', component: <ContactUsHome /> },
];

export default function Home() {
  return (
    <div className="mb-[200px]">
      {componentsToRender.map((item) => (
        <SidebarContent key={item.id}>{item.component}</SidebarContent>
      ))}
    </div>
  );
}
