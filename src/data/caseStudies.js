// Wingora case studies. `status` is shown on the site; only set it when the
// development or deployment status is known. `note` holds required caveats.

export const caseStudies = [
    {
        id: "swakriti-recommendations",
        kind: "case-study",
        name: "Swakriti intelligent product recommendation",
        category: "Business intelligence",
        tags: ["Recommendation systems", "ERP integration"],
        status: "Demo and architecture",
        summary:
            "A recommendation system that turns ERP and product catalog data into relevant product suggestions using semantic search and business-specific scoring.",
        problem:
            "Businesses often keep large product catalogs and ERP datasets but struggle to find relevant products and generate recommendations that follow their own business requirements.",
        solution:
            "A recommendation architecture that combines vector search with deterministic business scoring. The system retrieves relevant candidates, then applies custom business rules to decide the final recommendations.",
        approach: [
            "ERP and spreadsheet data ingestion",
            "Data preparation",
            "Embedding generation",
            "Qdrant vector database",
            "Semantic candidate retrieval",
            "Python-based scoring and ranking",
            "Business-specific recommendation logic",
        ],
        relevance:
            "Shows how existing ERP and product information can become a working recommendation system and a source of business intelligence.",
        tech: ["Python", "Qdrant", "Embeddings", "ERP data"],
    },
    {
        id: "special-education-platform",
        kind: "case-study",
        name: "AI-assisted special education therapist platform",
        category: "Education technology",
        tags: ["AI decision support", "Workflow intelligence"],
        status: "In development",
        summary:
            "A platform that helps therapists manage structured assessments, therapy goals, activity planning, and progress tracking, with AI suggestions the therapist reviews.",
        problem:
            "Therapists spend significant time on assessments, goal setting, activity planning, and session records, often across disconnected notes and tools.",
        solution:
            "A structured workflow where AI assists with goal recommendations and activity plans while the therapist reviews and decides every step.",
        workflow: [
            "Child onboarding and developmental history",
            "Structured developmental assessment",
            "Therapist-reviewed functional profile",
            "AI-assisted SMART goal recommendations",
            "Personalised four-week activity planning",
            "Integration of the therapist's activity and materials inventory",
            "Daily session documentation",
            "Progress tracking",
            "Therapist-reviewed adaptive recommendations",
        ],
        principles: [
            "The therapist remains responsible for decisions.",
            "AI assists; it does not make clinical decisions on its own.",
            "The system does not diagnose autism.",
            "The system does not assign DSM-5 severity levels.",
        ],
        relevance: "Shows how AI can support specialised professional workflows with structured decision support.",
        note: "This platform is in development and is not a completed clinical solution.",
        tech: ["AI decision support", "Structured assessments", "Workflow design"],
    },
    {
        id: "virtual-try-on-platform",
        kind: "case-study",
        name: "AI virtual try-on platform",
        category: "Computer vision",
        tags: ["E-commerce", "Personalisation"],
        summary:
            "A virtual try-on service that generates garment visualisations from a user's photo and garment information, so shoppers can see a product before buying.",
        problem:
            "Online shoppers can't see how clothing will look on them, which makes buying decisions harder.",
        solution:
            "A backend that takes a user image and garment details, generates a visualisation, and manages each request as an asynchronous job.",
        approach: [
            "Image processing",
            "Virtual garment visualisation",
            "AI image generation and transformation",
            "Backend API development",
            "Asynchronous processing and job status management",
            "Cloud deployment",
            "Performance monitoring",
        ],
        relevance: "Shows how AI can improve digital product experiences and help customers visualise products before purchasing.",
        tech: ["Python", "FastAPI", "Google Cloud Run", "Google Vertex AI"],
    },
    {
        id: "dontry",
        kind: "case-study",
        name: "Dontry mobile virtual try-on app",
        category: "Mobile app",
        tags: ["AI applications", "E-commerce"],
        summary:
            "A consumer Android app built around an AI-assisted virtual try-on experience, with in-app purchases through Google Play Billing.",
        problem: "Shoppers want to try clothes on virtually from their phone, in a simple consumer app.",
        solution:
            "An Android app connected to an AI try-on backend, with user-facing try-on workflows and Google Play Billing for paid features.",
        approach: [
            "Android application integration",
            "Backend AI integration",
            "User-facing try-on workflows",
            "Google Play Billing integration",
            "Communication between the app and backend services",
        ],
        relevance: "Shows end-to-end delivery of an AI feature as a consumer mobile product.",
        tech: ["Android", "Kotlin", "Google Play Billing", "AI backend"],
    },
    {
        id: "thomso-event-vibe-check",
        kind: "case-study",
        name: "Thomso event vibe check",
        category: "Multimodal AI",
        tags: ["Computer vision", "Audio intelligence"],
        summary:
            "An application that analyses participants' photos and short voice recordings to estimate the overall experience at a large event.",
        problem: "Understanding the atmosphere of a large event through participants' experiences is difficult.",
        solution:
            "A multimodal system that combines image and audio analysis and places each submission in an experience category: Absolutely Lit, Peak Vibes, Feeling Good, Running on Chai, or Battery Low.",
        approach: [
            "SigLIP image understanding",
            "Audio classification and speech processing",
            "Silero voice activity detection",
            "YAMNet",
            "Wav2Vec2 and emotion-related models",
            "Face detection",
            "GPU-backed FastAPI inference",
            "Queue management",
        ],
        relevance:
            "Shows multimodal AI engineering, GPU-backed inference, and turning different kinds of data into structured signals.",
        note: "Outputs are estimated event experiences, not scientifically verified emotional measurements.",
        tech: ["Python", "FastAPI", "SigLIP", "YAMNet", "Wav2Vec2"],
    },
    {
        id: "myuni-wellbeing-intelligence",
        kind: "case-study",
        name: "MyUni social media wellbeing intelligence",
        category: "Multimodal AI",
        tags: ["Behavioural analysis", "Data intelligence"],
        summary:
            "A backend that analyses social media text, images, video, and audio and turns them into structured wellbeing-related signals.",
        problem:
            "Understanding digital wellbeing takes more than labelling content as positive or negative. Different content types and interactions add context.",
        solution:
            "A multimodal analysis system that combines emotion classification, content analysis, and structured wellbeing dimensions, with the evidence behind each result.",
        approach: [
            "Text emotion analysis with GoEmotions",
            "Valence and arousal analysis",
            "Ryff psychological wellbeing dimensions",
            "Image and video analysis",
            "Audio analysis",
            "User activity and interaction logging",
            "Evidence-based structured analysis",
        ],
        relevance: "Shows how complex, unstructured information can be turned into structured analytical signals.",
        note: "This is not a clinical diagnostic product.",
        tech: ["Python", "FastAPI", "Transformers", "GoEmotions", "SQLite"],
    },
];
