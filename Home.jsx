const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React from "react";
import NavBar from "@/components/home/NavBar";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import ProjectsSection from "@/components/home/ProjectsSection";
import FooterSection from "@/components/home/FooterSection";

const HERO_IMAGE = "https://media.db.com/images/public/6a31ee5f2bcabe4938f2331c/66497ec40_generated_43d0d91e.png";
const FEATURE_IMAGE = "https://media.db.com/images/public/6a31ee5f2bcabe4938f2331c/f5426423e_generated_ccf00c09.png";
const PROJECTS_IMAGE = "https://media.db.com/images/public/6a31ee5f2bcabe4938f2331c/fcd5098c4_generated_533db789.png";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <HeroSection heroImage={HERO_IMAGE} />
      <FeaturesSection featureImage={FEATURE_IMAGE} />
      <ProjectsSection projectsImage={PROJECTS_IMAGE} />
      <FooterSection />
    </div>
  );
}