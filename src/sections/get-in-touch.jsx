import { useState } from "react";
import { CheckCircle2, AlertCircle, ChevronDown } from "lucide-react";
import { supabase } from "../lib/supabase";
import SectionTitle from "../components/section-title";

const emptyForm = { name: "", email: "", phone: "", business: "", message: "" };

const fieldClass =
    "mt-2 w-full rounded-lg border border-line bg-white px-3.5 py-3 text-ink placeholder:text-ink-soft/60 outline-none transition-[border-color,box-shadow] focus:border-wing focus:ring-3 focus:ring-wing/15";

export default function GetInTouch() {
    const [formData, setFormData] = useState(emptyForm);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.values(formData).some((v) => !v.trim())) {
            setSubmitStatus("missing");
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            if (!supabase) throw new Error("Supabase is not configured");

            const { error } = await supabase.from("contact_submissions").insert([
                {
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    business_type: formData.business,
                    message: formData.message,
                    submitted_at: new Date().toISOString(),
                },
            ]);
            if (error) throw error;

            // The submission is saved even if the confirmation email fails.
            const { error: funcError } = await supabase.functions.invoke("send-contact-email", {
                body: JSON.stringify({ name: formData.name, email: formData.email }),
            });
            if (funcError) console.error("Function error:", funcError);

            setSubmitStatus("success");
            setFormData(emptyForm);
        } catch (error) {
            console.error("Submit error:", error);
            setSubmitStatus("error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
            <div className="grid gap-14 lg:grid-cols-[minmax(0,24rem)_1fr] lg:gap-20">
                <div>
                    <SectionTitle
                        title="Tell us what's slowing you down"
                        description="Describe the problem in your own words. We'll reply within one working day to set up a free consultation."
                    />
                    <dl className="mt-10 space-y-5 text-[0.95rem]">
                        <div>
                            <dt className="text-ink-soft">Email</dt>
                            <dd className="mt-0.5">
                                <a href="mailto:wingoraventures@gmail.com" className="text-ink link-underline">
                                    wingoraventures@gmail.com
                                </a>
                            </dd>
                        </div>
                        <div>
                            <dt className="text-ink-soft">Phone and WhatsApp</dt>
                            <dd className="mt-0.5">
                                <a href="tel:+916238912027" className="text-ink link-underline">
                                    +91 62389 12027
                                </a>
                            </dd>
                        </div>
                        <div>
                            <dt className="text-ink-soft">Based in</dt>
                            <dd className="mt-0.5 text-ink">Kerala, India. Working with clients worldwide.</dd>
                        </div>
                    </dl>
                </div>

                <form onSubmit={handleSubmit} noValidate className="grid gap-5 rounded-2xl border border-line bg-white p-6 sm:grid-cols-2 md:p-8">
                    <label className="text-[0.95rem] font-medium text-ink">
                        Name
                        <input name="name" type="text" autoComplete="name" value={formData.name} onChange={handleChange} className={fieldClass} />
                    </label>
                    <label className="text-[0.95rem] font-medium text-ink">
                        Email
                        <input name="email" type="email" autoComplete="email" value={formData.email} onChange={handleChange} className={fieldClass} />
                    </label>
                    <label className="text-[0.95rem] font-medium text-ink">
                        Phone
                        <input name="phone" type="tel" autoComplete="tel" value={formData.phone} onChange={handleChange} className={fieldClass} />
                    </label>
                    <label className="text-[0.95rem] font-medium text-ink">
                        Type of business
                        <span className="relative block">
                            <select name="business" value={formData.business} onChange={handleChange} className={`${fieldClass} appearance-none pr-10`}>
                                <option value="">Choose one</option>
                                <option value="startup">Startup</option>
                                <option value="small-business">Small business</option>
                                <option value="growing-company">Growing company</option>
                                <option value="enterprise">Enterprise</option>
                                <option value="solo-founder">Solo founder</option>
                            </select>
                            <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 mt-1 size-4 -translate-y-1/2 text-ink-soft" />
                        </span>
                    </label>
                    <label className="text-[0.95rem] font-medium text-ink sm:col-span-2">
                        What do you need help with?
                        <textarea
                            name="message"
                            rows={5}
                            placeholder="For example: we miss WhatsApp enquiries after 7 pm and lose bookings."
                            value={formData.message}
                            onChange={handleChange}
                            className={`${fieldClass} resize-none`}
                        />
                    </label>

                    <div className="flex flex-wrap items-center gap-4 sm:col-span-2" aria-live="polite">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="inline-flex h-12 items-center rounded-lg bg-wing px-6 font-medium text-white transition-colors hover:bg-wing-deep disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isSubmitting ? "Sending message…" : "Send message"}
                        </button>
                        {submitStatus === "success" && (
                            <p className="flex items-center gap-2 text-[0.95rem] text-emerald-700">
                                <CheckCircle2 className="size-5" /> Message sent. We'll reply within one working day.
                            </p>
                        )}
                        {submitStatus === "missing" && (
                            <p className="flex items-center gap-2 text-[0.95rem] text-ascent">
                                <AlertCircle className="size-5" /> Fill in every field so we can get back to you.
                            </p>
                        )}
                        {submitStatus === "error" && (
                            <p className="flex items-center gap-2 text-[0.95rem] text-ascent">
                                <AlertCircle className="size-5" /> Message not sent. Email us at wingoraventures@gmail.com instead.
                            </p>
                        )}
                    </div>
                </form>
            </div>
        </section>
    );
}
