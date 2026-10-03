/**
 * Real-Time Guardrail Engine
 * Intercepts actions before database commit and validates against captured rules.
 */

export const guardrailEngine = {
  validateInvoiceSubmission(formData, invoice) {
    const violations = [];

    // Guardrail 1: €5,000 Capex Rule
    if (invoice.amount >= 5000.00 && invoice.isCapex) {
      if (formData.costCenter !== "0400") {
        violations.push({
          guardrailId: "GR-001-CAPEX-THRESHOLD",
          severity: "CRITICAL_BLOCKER",
          title: "EUR 7,200 Opex Allocation Error Prevented",
          rule: "Equipment exceeding €5,000 must be booked to Fixed Asset Capex (0400).",
          reason: "Booking capital machinery to operating expense (4711) distorts EBITDA and violates German tax code (HGB §248).",
          remediation: "Switch cost center to Capex 0400 and provide an authorized plant asset tag.",
          replayedStepIndex: 2
        });
      }
    }

    // Guardrail 2: Asset Tag Dependency
    if (formData.costCenter === "0400") {
      if (!formData.assetNumber || formData.assetNumber.trim() === "") {
        violations.push({
          guardrailId: "GR-002-ASSET-TAG-REQUIREMENT",
          severity: "BLOCKING",
          title: "Missing Plant Engineering Asset Tag",
          rule: "No asset number, no capex booking.",
          reason: "Capital assets cannot be capitalized in the General Ledger without an active tag.",
          remediation: "Enter registered tag (e.g. AST-88219) verified by Plant Maintenance.",
          replayedStepIndex: 3
        });
      }
    }

    // Guardrail 3: Bauer Logistik December Hold
    if (invoice.vendor.toLowerCase().includes("bauer") && !formData.isHold) {
      violations.push({
        guardrailId: "GR-003-DECEMBER-VENDOR-FREEZE",
        severity: "HIGH_RISK",
        title: "Vendor Behavioral Exception Unchecked",
        rule: "December carrier invoices from Bauer Logistik require payment freeze.",
        reason: "Bauer double-bills every December without fail due to automated year-end batching.",
        remediation: "Check 'Freeze Payment / Hold' until paper warehouse delivery slip is verified.",
        replayedStepIndex: 4
      });
    }

    return {
      isValid: violations.length === 0,
      violations
    };
  }
};
