// Illustrative examples of the collect, understand, decide, act cycle.
// They are not client deployments and use no client names.
export const customerRuns = [
    {
        channel: "WhatsApp",
        who: "a supermarket customer",
        message: "Do you have the 5 kg pack of basmati rice in stock?",
        steps: [
            "Understood a product enquiry",
            "Checked inventory: out of stock",
            "Replied with the expected restock date",
            "Logged the enquiry as unmet demand",
        ],
        result: "Third request this week, so the item is flagged for reorder.",
    },
    {
        channel: "Instagram",
        who: "a property enquiry",
        message: "Looking for a 3BHK near Kakkanad, budget under 90 lakh.",
        steps: [
            "Captured the requirements: 3BHK, Kakkanad, budget",
            "Marked it as a likely buyer for review",
            "Handed the lead to a sales rep with the full conversation",
            "Scheduled a follow-up reminder",
        ],
        result: "The sales rep picks up with full context.",
    },
];

export const dataRuns = [
    {
        channel: "Business assistant",
        who: "the store owner",
        message: "Which products should I reorder before the weekend?",
        steps: [
            "Read the last twelve weeks of sales",
            "Compared demand with current stock",
            "Estimated weekend demand by product",
        ],
        result: "Reorder list ready, with the reason for each item.",
    },
    {
        channel: "Business assistant",
        who: "the store owner",
        message: "Which regular customers haven't come back recently?",
        steps: [
            "Read purchase history from the billing system",
            "Grouped customers by how often they used to buy",
            "Found regulars with no purchase in 60 days",
        ],
        result: "List ready for a personalised WhatsApp offer.",
    },
];
