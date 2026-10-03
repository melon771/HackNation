export const testCaseLena = {
  invoice: {
    id: "INV-5012",
    vendor: "Kuka Roboter & Lasertechnik GmbH",
    vendorIban: "DE89 5001 0517 9922 4100 89",
    vendorTaxId: "DE-778841029",
    description: "High-Power Fiber Laser Optical Head (Model FLH-700)",
    category: "Capital Machinery Component",
    amount: 7200.00,
    currency: "EUR",
    date: "2026-10-02",
    suggestedCostCenter: "4711",
    suggestedCostCenterLabel: "General Opex / Plant Maintenance",
    correctCostCenter: "0400",
    correctCostCenterLabel: "Fixed Asset Capex / Machinery",
    requiredAssetNumber: "AST-88219",
    isCapex: true
  },
  interceptionConfig: {
    mistakeTrigger: {
      field: "costCenter",
      wrongValue: "4711",
      action: "attempted_save"
    },
    tutorPromptEn: "Wait, Lena! Sabine would stop here before saving. Why do you think?",
    tutorExplanationEn: "Notice the net invoice amount: €7,200.00. Sabine established a strict guardrail: equipment over €5,000 must ALWAYS be booked to Capex (0400), and requires an asset tracking tag. Booking this as Opex (4711) causes an immediate EUR 7,200 financial reporting error!",
    replayedMoment: {
      stepIndex: 3,
      stepTitle: "Step 4 of 7: Re-coding Capex to 0400",
      timestamp: "03:12",
      expertQuote: "Equipment over €5,000 is always capex. Lena, this is where junior clerks make EUR 7,000 mistakes. No asset number, no capex booking.",
      originalInvoice: "INV-4471 (€6,200.00)"
    }
  },
  masteryCriteria: [
    {
      id: "M1",
      label: "Identified €5,000 Capex Demarcation Threshold",
      required: true
    },
    {
      id: "M2",
      label: "Assigned Mandatory Plant Asset Tag (AST-88219)",
      required: true
    },
    {
      id: "M3",
      label: "Prevented EUR 7,200 Opex Budget Distortion",
      required: true
    }
  ]
};
