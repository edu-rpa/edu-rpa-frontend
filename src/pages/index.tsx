import HeaderLayout from '@/components/Layouts/HeaderLayout';
import HeroHome from '@/components/LandingPage/Hero/Hero';
import FeatureHome from '@/components/LandingPage/Feature/Feature';
import OurTeamSection from '@/components/LandingPage/OurTeam/OurTeam';
import TestimonialHome from '@/components/LandingPage/Testimonial/Testimonial';
import PricingHome from '@/components/LandingPage/Pricing/Pricing';
import ContactUsHome from '@/components/LandingPage/ContactUs/ContactUs';

export default function RootPage() {
  const componentsToRender = [
    { id: 'hero', component: <HeroHome /> },
    { id: 'feature', component: <FeatureHome /> },
    { id: 'ourTeam', component: <OurTeamSection /> },
    { id: 'testimonial', component: <TestimonialHome /> },
    { id: 'pricing', component: <PricingHome /> },
    { id: 'contactUs', component: <ContactUsHome /> },
  ];

  return (
    <HeaderLayout>
      <div className="bg-white-300 my-[150px] w-11/12 m-auto">
        {componentsToRender.map((item) => {
          return (
            <div key={item.id} className="my-[30px]">
              {item.component}
            </div>
          );
        })}
      </div>
    </HeaderLayout>
  );
}
