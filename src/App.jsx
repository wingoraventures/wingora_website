import { Routes, Route } from 'react-router-dom'
import GetInTouch from "./sections/get-in-touch";
import OurTestimonials from "./sections/our-testimonials";
import SubscribeNewsletter from "./sections/subscribe-newsletter";
import TrustedCompanies from "./sections/trusted-companies";
import Footer from "./components/footer";
import LenisScroll from "./components/lenis-scroll";
import Navbar from "./components/navbar";
import AboutOurApps from "./sections/about-our-apps";
import HeroSection from "./sections/hero-section";
import OurLatestCreation from "./sections/our-latest-creation";
import OurProcess from "./sections/we-work";

import Login from './admin/Login'
import Dashboard from './admin/Dashboard'
import RequireAuth from './admin/RequireAuth'
import ProjectsPage from './pages/ProjectsPage'
import ProjectDetailPage from './pages/ProjectDetailPage'


function HomePage() {
    return (
        <>
            <Navbar />
            <main className="px-6 md:px-16 lg:px-24 xl:px-32">
                <HeroSection />
                <OurLatestCreation />
                <AboutOurApps />
                <OurTestimonials /> 
                
                <OurProcess />
                <TrustedCompanies />
                <GetInTouch />
                <SubscribeNewsletter />
            </main>
            <Footer />
        </>
    );
}

export default function App() {
    return (
        <>
            <LenisScroll />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/admin" element={<Login />} />
                <Route path="/admin/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/projects/:id" element={<ProjectDetailPage />} />
            </Routes>
        </>
    )
}