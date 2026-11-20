import SectionTitle from "../components/section-title";
import { motion } from "framer-motion";
import {
  Store,
  HeartPulse,
  Building2,
  ShoppingCart,
  Rocket,
} from "lucide-react";

const industries = [
  {
    title: "Micro-Business AI",
    tag: "Small Business AI",
    icon: Store,
    description:
      "Smart automation for inventory, orders, and customer conversations that helps 1–3 person teams compete with bigger brands.",
    image:
      "https://images.unsplash.com/photo-1521334884684-d80222895322?q=80&w=900&auto=format&fit=crop",
  },
  {
    title: "Aesthetic Clinics & Healthcare",
    tag: "Healthcare AI",
    icon: HeartPulse,
    description:
      "AI-powered appointment systems, patient engagement tools, and data-driven insights to improve care and efficiency.",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=900&auto=format&fit=crop",
  },
  {
    title: "Real Estate",
    tag: "PropTech AI",
    icon: Building2,
    description:
      "Smart AI solutions for lead qualification, virtual assistants, and automated follow-ups.",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=900&auto=format&fit=crop",
  },
  {
    title: "E-commerce & Retail",
    tag: "Commerce AI",
    icon: ShoppingCart,
    description:
      "Personalized recommendations and AI-driven support to boost conversions.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=900&auto=format&fit=crop",
  },
  {
    title: "Coaches, Consultants & Startups",
    tag: "Growth AI",
    icon: Rocket,
    description:
      "AI tools that automate engagement and scale growing businesses.",
    image:
      "https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=900&auto=format&fit=crop",
  },
];

export default function OurProcess() {
  return (
    <section id="process" className="scroll-mt-28 px-4">
      <SectionTitle
        title="Who We Work With"
        description="Industries we empower with intelligent, scalable AI solutions."
      />

      <div className="max-w-5xl mx-auto mt-14 space-y-6">
        {industries.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -80 : 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              whileHover={{ scale: 1.02 }}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-indigo-500/20"
            >
              {/* Animated glow sweep */}
              <motion.div
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 1.2 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500/10 to-transparent"
              />

              <div className="relative grid grid-cols-1 md:grid-cols-3">
                {/* Left rail */}
                <div className="flex md:flex-col items-center md:items-start justify-between gap-4 p-5 border-b md:border-b-0 md:border-r border-indigo-500/20">
                  <span className="text-xs font-medium text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full">
                    {item.tag}
                  </span>

                  {/* Floating Icon */}
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Icon className="w-9 h-9 text-indigo-500" />
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col justify-center">
                  <h3 className="text-xl font-semibold text-indigo-400">
                    {item.title}
                  </h3>
                  <p className="text-slate-300 text-sm mt-3 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Image */}
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.6 }}
                  className="relative h-44 md:h-auto overflow-hidden"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition"
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent via-slate-950/60 to-slate-950" />
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
