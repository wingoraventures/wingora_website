import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Footer from "./components/footer";
import LenisScroll from "./components/lenis-scroll";
import Navbar from "./components/navbar";
import PageMeta from "./components/page-meta";
import HeroSection from "./sections/hero-section";
import TechStrip from "./sections/tech-strip";
import CoreAreas from "./sections/core-areas";
import Process from "./sections/process";
import Services from "./sections/services";
import SelectedWork from "./sections/selected-work";
import Industries from "./sections/industries";
import AboutPreview from "./sections/about-preview";
import GetInTouch from "./sections/get-in-touch";

import RequireAuth from './admin/RequireAuth'
import ProjectsPage from './pages/ProjectsPage'
import ProjectDetailPage from './pages/ProjectDetailPage'
import AboutPage from './pages/AboutPage'
import FaqPage from './pages/FaqPage'

// Admin screens load on demand so the public site never pulls in their Supabase client.
const Login = lazy(() => import('./admin/Login'))
const Dashboard = lazy(() => import('./admin/Dashboard'))

function HomePage() {
    return (
        <>
            <PageMeta
                path="/"
                description="Wingora Ventures is a business intelligence and AI automation partner. We help businesses understand their data, make better decisions, and build stronger customer relationships."
            />
            <Navbar />
            <main>
                <HeroSection />
                <TechStrip />
                <CoreAreas />
                <Process />
                <Services />
                <SelectedWork />
                <Industries />
                <AboutPreview />
                <GetInTouch />
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
                <Route path="/admin" element={<Suspense fallback={null}><Login /></Suspense>} />
                <Route path="/admin/dashboard" element={<RequireAuth><Suspense fallback={null}><Dashboard /></Suspense></RequireAuth>} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/projects/:id" element={<ProjectDetailPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/faq" element={<FaqPage />} />
            </Routes>
        </>
    )
}