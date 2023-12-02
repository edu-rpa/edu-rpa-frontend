import ContactUsHome from '@/components/LandingPage/ContactUs/ContactUs';
import FeatureHome from '@/components/LandingPage/Feature/Feature';
import HeroHome from '@/components/LandingPage/Hero/Hero';
import OurTeamSection from '@/components/LandingPage/OurTeam/OurTeam';
import PricingHome from '@/components/LandingPage/Pricing/Pricing';
import TestimonialHome from '@/components/LandingPage/Testimonial/Testimonial';
import SidebarContent from '@/components/Sidebar/SidebarContent/SidebarContent';
import React from 'react';

export default function Home() {
  return (
    <div className="mb-[200px]">
      <SidebarContent>
        <HeroHome />
      </SidebarContent>
      <SidebarContent>
        <FeatureHome />
      </SidebarContent>
      <SidebarContent>
        <OurTeamSection />
      </SidebarContent>
      <SidebarContent>
        <TestimonialHome />
      </SidebarContent>
      <SidebarContent>
        <PricingHome />
      </SidebarContent>
      <SidebarContent>
        <ContactUsHome />
      </SidebarContent>
    </div>
  );
}
