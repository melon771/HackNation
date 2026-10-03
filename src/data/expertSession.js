export const expertSessionData = {
  expert: {
    name: "Sabine Weimann",
    age: 57,
    role: "Senior Accounts Payable Specialist",
    company: "Stuttgart Machine Works GmbH",
    experienceYears: 24,
    retirementHorizon: "18 months",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    language: "de-DE",
  },
  newHire: {
    name: "Lena Becker",
    age: 26,
    role: "Junior AP Clerk",
    startDate: "Monday (Day 4)",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80"
  },
  workflowMetadata: {
    title: "Accounts Payable Invoice Processing & Month-End Audit",
    domain: "Manufacturing / ERP Financials",
    software: "Stuttgart SAP S/4 Sandbox ERP",
    sessionDuration: "08:42",
    totalSteps: 7,
    judgmentCalls: 3,
    guardrailsCaptured: 4,
    piiEntitiesRedacted: 14,
    status: "Verified by Sabine"
  },
  invoices: [
    {
      id: "INV-4471",
      vendor: "DMG MORI Precision Spindles GmbH",
      vendorIban: "DE89 3704 0044 0532 0130 00",
      vendorTaxId: "DE-812398401",
      description: "High-Speed Spindle Head Unit Model HSK-A63",
      amount: 6200.00,
      currency: "EUR",
      initialCostCenter: "4711",
      initialCostCenterLabel: "General Opex / Plant Maintenance",
      finalCostCenter: "0400",
      finalCostCenterLabel: "Fixed Asset Capex / Machinery",
      assetNumber: "AST-77401",
      status: "Approved & Re-Coded",
      isCapex: true,
      hasAnomaly: false,
      timestamp: "03:12",
      badge: "Capex Threshold"
    },
    {
      id: "INV-4472",
      vendor: "Bauer Logistik GmbH",
      vendorIban: "DE44 6005 0101 0009 8831 22",
      vendorTaxId: "DE-991204855",
      description: "Inter-facility Freight Transfer (Q4 Batch)",
      amount: 1850.00,
      currency: "EUR",
      initialCostCenter: "4711",
      initialCostCenterLabel: "Logistics Opex",
      finalCostCenter: "4711",
      finalCostCenterLabel: "Logistics Opex",
      status: "Payment Freeze / Hold",
      isCapex: false,
      hasAnomaly: true,
      anomalyReason: "December supplier double-billing risk",
      timestamp: "05:44",
      badge: "Fraud & Error Guardrail"
    },
    {
      id: "INV-4473",
      vendor: "Brno Precision Tooling s.r.o.",
      vendorIban: "CZ65 0800 0000 0019 2000 1452",
      vendorTaxId: "CZ-44029104",
      description: "Custom Carbide Cutters (Subsidiary Transfer)",
      amount: 4100.00,
      currency: "EUR",
      initialCostCenter: "5200",
      initialCostCenterLabel: "Tooling Inventory",
      finalCostCenter: "5200",
      finalCostCenterLabel: "Tooling Inventory",
      status: "Routed for 2nd Approval",
      isCapex: false,
      hasAnomaly: false,
      approvalLevel: "Tier-2 Co-Signature",
      timestamp: "07:15",
      badge: "Cross-Border Route"
    }
  ],
  liveQuestions: [
    {
      id: "Q1",
      timestamp: "03:15",
      triggerEvent: "Cost center re-coded 4711 -> 0400 on Invoice #4471",
      pauseDurationSeconds: 3.2,
      agentQuestionEn: "You moved invoice 4471 from 4711 to 0400 without hesitation. What made you do that?",
      agentQuestionDe: "Sie haben die Rechnung 4471 direkt von 4711 auf 0400 umgebucht. Was war der Grund dafür?",
      expertAnswerEn: "Equipment over €5,000 is always Capex, never general operating expense. If you book it to 4711, our opex budget explodes and the tax depreciation is ruined.",
      expertAnswerDe: "Geräte über 5.000 € sind immer Investitionsausgaben (Capex), niemals laufender Betriebsaufwand. Auf 4711 würde unser Opex-Budget verfälscht und die steuerliche Abschreibung geht verloren.",
      category: "Decision Judgment"
    },
    {
      id: "Q2",
      timestamp: "03:42",
      triggerEvent: "Sabine paused at Asset Number input field",
      pauseDurationSeconds: 2.8,
      agentQuestionEn: "I notice you paused before confirming the capex code. Is there a strict limit or condition before you are allowed to book it?",
      agentQuestionDe: "Ich habe bemerkt, dass Sie vor der Bestätigung gezögert haben. Gibt es eine feste Grenze oder Voraussetzung, bevor das gebucht werden darf?",
      expertAnswerEn: "Absolute guardrail: No asset number, no capex booking. Period. If it doesn't have an approved tag from plant engineering, you never book it. And if the supplier is brand new, you stop and ask the plant controller.",
      expertAnswerDe: "Absolute Leitplanke: Ohne Anlagennummer keine Capex-Buchung! Wenn keine Freigabe der Anlagentechnik vorliegt, stoppt der Prozess. Und bei unbekannten Lieferanten muss zwingend der Werkscontroller gefragt werden.",
      category: "Mandatory Guardrail"
    },
    {
      id: "Q3",
      timestamp: "05:50",
      triggerEvent: "Checkbox 'Freeze Payment / Hold' toggled on Bauer Logistik",
      pauseDurationSeconds: 4.1,
      agentQuestionEn: "You placed Bauer Logistik on hold. Is that standard for all December invoices, or is this supplier an exception?",
      agentQuestionDe: "Sie haben die Zahlung für Bauer Logistik eingefroren. Gilt das für alle Dezember-Rechnungen oder ist das eine Ausnahme?",
      expertAnswerEn: "Bauer double-bills every December without fail. Their billing software resends unverified freight invoices before year-end. We freeze them until our warehouse manager physically confirms the paper delivery note.",
      expertAnswerDe: "Bauer schickt jeden Dezember doppelte Rechnungen raus, ohne Ausnahme. Wir sperren die Zahlung sofort, bis das Lager den physischen Lieferschein gegenzeichnet.",
      category: "Exception Guardrail"
    }
  ],
  steps: [
    {
      stepNumber: 1,
      title: "Header Verification & Order Cross-Match",
      timestamp: "01:10",
      screenZone: "Top Ribbon / PO Matcher",
      decision: "Match Supplier VAT ID and PO #PO-88419",
      expertQuoteEn: "Always check the tax ID against the master vendor file first, not just the name.",
      expertQuoteDe: "Prüfen Sie immer zuerst die USt-IdNr. im Stammdatenabgleich, nicht nur den Firmennamen.",
      guardrail: "If VAT ID has no active VIES match, do not process. Escalate to Procurement.",
      category: "Compliance",
      isGuardrail: false
    },
    {
      stepNumber: 2,
      title: "Line-Item Classification & Threshold Check",
      timestamp: "02:45",
      screenZone: "Invoice Items Table",
      decision: "Inspect Net Total (€6,200.00)",
      expertQuoteEn: "Scan the single item price immediately. Do not look at the subtotal alone.",
      expertQuoteDe: "Sofort den Einzelpositionspreis prüfen, nicht nur die Gesamtsumme.",
      guardrail: "€5,000 threshold strictly demarcates Opex vs Capex under German commercial code (HGB).",
      category: "Judgment",
      isGuardrail: true
    },
    {
      stepNumber: 3,
      title: "Cost Center Re-coding (4711 -> 0400)",
      timestamp: "03:12",
      screenZone: "Cost Center Selector Dropdown",
      decision: "Re-code from Plant Maintenance (4711) to Fixed Asset Capex (0400)",
      expertQuoteEn: "Equipment over €5,000 is always capex. Lena, this is where junior clerks make EUR 7,000 mistakes.",
      expertQuoteDe: "Geräte über 5.000 € sind immer Capex. Hier passieren sonst die teuren Buchungsfehler.",
      guardrail: "Never book capital machinery to departmental opex without written plant manager signoff.",
      category: "Core Guardrail",
      isGuardrail: true
    },
    {
      stepNumber: 4,
      title: "Asset Number Validation & Assignment",
      timestamp: "03:35",
      screenZone: "Asset Tracking Field [AST-77401]",
      decision: "Assign Tag AST-77401 from Asset Registry",
      expertQuoteEn: "No asset number, no capex booking. If field is blank, put invoice on Hold State B.",
      expertQuoteDe: "Keine Anlagennummer, keine Capex-Buchung. Bleibt das Feld leer, geht die Rechnung in Wartestatus B.",
      guardrail: "Strict blocking rule: System must disallow save if Capex 0400 has null asset_id.",
      category: "Hard Stop",
      isGuardrail: true
    },
    {
      stepNumber: 5,
      title: "Supplier Behavioral Anomaly Screening",
      timestamp: "05:44",
      screenZone: "Supplier Profile & Payment Terms",
      decision: "Flag Bauer Logistik GmbH for December Pre-Audit Freeze",
      expertQuoteEn: "Bauer double-bills every December without fail. Hold until warehouse delivery slip arrives.",
      expertQuoteDe: "Bauer stellt jeden Dezember Rechnungen doppelt aus. Sperren bis der Lieferschein vorliegt.",
      guardrail: "December invoices from flagged carrier vendors require mandatory paper delivery voucher match.",
      category: "Fraud Prevention",
      isGuardrail: true
    },
    {
      stepNumber: 6,
      title: "Intra-EU Cross-Border Subsidiary Routing",
      timestamp: "07:15",
      screenZone: "Approval Workflow Dispatcher",
      decision: "Route Brno Tooling s.r.o. to Tier-2 Plant Director",
      expertQuoteEn: "Czech subsidiary invoices must have dual signoff for transfer pricing audit trail.",
      expertQuoteDe: "Rechnungen tschechischer Tochtergesellschaften benötigen Zweitunterschrift wegen Verrechnungspreisen.",
      guardrail: "Cross-border subsidiary transactions above €3,000 require Plant Director countersignature.",
      category: "Regulatory",
      isGuardrail: true
    },
    {
      stepNumber: 7,
      title: "Batch Reconciliation & Cryptographic Audit Commit",
      timestamp: "08:30",
      screenZone: "Batch Settlement Summary",
      decision: "Post approved invoices to General Ledger, archive held vouchers with reason tags",
      expertQuoteEn: "Everything has a clean audit note. When auditors come in February, there are zero questions.",
      expertQuoteDe: "Jeder Schritt hat eine saubere Notiz. Die Wirtschaftsprüfer finden im Februar keine Lücken.",
      guardrail: "Audit log must preserve original entry, re-coded rationale, and author timestamps.",
      category: "Audit Trail",
      isGuardrail: false
    }
  ],
  debriefSession: {
    gapsIdentified: [
      {
        gapNumber: 1,
        title: "Mixed Item Invoices (Hardware + Consumables)",
        question: "Sabine, what happens if an invoice has a €6,000 tool together with €400 of oil and spare drill bits?",
        resolution: "Split the invoice lines: item 1 goes to Capex 0400 with asset number; item 2 goes to Opex 4711. Never lump them together."
      },
      {
        gapNumber: 2,
        title: "Unfreezing Held December Vendors",
        question: "When Bauer Logistik is held, who specifically is authorized to release the payment lock?",
        resolution: "Only our Logistics Team Lead (Herr Richter) can sign off after matching the physical delivery bill (Lieferschein)."
      },
      {
        gapNumber: 3,
        title: "Sub-Threshold Capex Cumulative Orders",
        question: "What if three related invoices of €2,000 arrive in the same week for the same production line?",
        resolution: "Economic unit rule: If they form one functional machine tool, bundle them under a single asset project number."
      }
    ],
    teachBackSummaryEn: "Sabine, here is what I have learned from your session today: You oversee accounts payable using three vital guardrails that process manuals miss. First, any machine tool exceeding €5,000 is strictly Capex (0400) and cannot be saved without an active Asset Number. Second, high-risk suppliers like Bauer Logistik are frozen every December until a signed warehouse voucher is verified. Third, cross-border subsidiary invoices from Brno require Tier-2 co-signatures for transfer pricing compliance. Is this the complete operational standard?",
    expertConfirmationResponse: "Yes, exactly! That is 24 years of practice in three sentences. If Lena follows this, she will never break month-end close."
  },
  klausDiffSession: {
    expertName: "Klaus Hoffmann (Junior Peer, 3 yrs)",
    errorCount: 2,
    divergencePoints: [
      {
        invoiceId: "INV-4471",
        sabineAction: "Re-coded to Capex 0400 + Assigned Asset AST-77401",
        klausAction: "Left on Opex 4711 (Direct Operating Expense)",
        impact: "EUR 6,200 misallocated from Capex to Opex; violates HGB §248; ruins quarterly EBITDA.",
        diffCategory: "Missed Guardrail"
      },
      {
        invoiceId: "INV-4472",
        sabineAction: "Frozen with payment hold (December duplicate check)",
        klausAction: "Approved for standard 14-day direct debit",
        impact: "High probability of duplicate payment of EUR 1,850 to carrier vendor.",
        diffCategory: "Missed Exception"
      }
    ]
  }
};
