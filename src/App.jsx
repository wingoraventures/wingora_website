import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Footer from "./components/footer";
import LenisScroll from "./components/lenis-scroll";
import Navbar from "./components/navbar";
import HeroSection from "./sections/hero-section";
import Services from "./sections/services";
import SelectedWork from "./sections/selected-work";
import Industries from "./sections/industries";
import Process from "./sections/process";
import GetInTouch from "./sections/get-in-touch";

import RequireAuth from './admin/RequireAuth'
import ProjectsPage from './pages/ProjectsPage'
import ProjectDetailPage from './pages/ProjectDetailPage'

// Admin screens load on demand so the public site never pulls in their Supabase client.
const Login = lazy(() => import('./admin/Login'))
const Dashboard = lazy(() => import('./admin/Dashboard'))

function HomePage() {
    return (
        <>
            <Navbar />
            <main>
                <HeroSection />
                <Services />
                <SelectedWork />
                <Industries />
                <Process />
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
            </Routes>
        </>
    )
}