import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  FileText, 
  AlertTriangle, 
  CheckCircle2, 
  Lock, 
  Euro, 
  ArrowRight,
  ShieldAlert,
  Hash,
  Clock,
  RotateCcw
} from 'lucide-react';
import { piiMasker } from '../services/piiMasker';

export default function ERPPortal({ 
  currentInvoice, 
  invoices, 
  selectedInvoiceId, 
  onSelectInvoice,
  isTutorMode = false,
  onAttemptSave,
  interceptionActive = false,
  piiShieldEnabled = true,
  onFieldChange
}) {
  const [formData, setFormData] = useState({
    costCenter: currentInvoice?.initialCostCenter || "4711",
    assetNumber: currentInvoice?.assetNumber || "",
    isHold: currentInvoice?.status?.includes("Hold") || false,
    approvalLevel: currentInvoice?.approvalLevel || "Tier-1",
    notes: ""
  });

  // Keep form data synced when invoice changes
  useEffect(() => {
    if (currentInvoice) {
      setFormData({
        costCenter: isTutorMode ? "4711" : (currentInvoice.finalCostCenter || currentInvoice.initialCostCenter),
        assetNumber: isTutorMode ? "" : (currentInvoice.assetNumber || ""),
        isHold: currentInvoice.hasAnomaly || false,
        approvalLevel: currentInvoice.approvalLevel || "Tier-1",
        notes: isTutorMode ? "" : "Verified against SAP purchase order ledger."
      });
    }
  }, [currentInvoice, isTutorMode]);

  const handleChange = (field, value) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    if (onFieldChange) onFieldChange(field, value, updated);
  };

  const handleSaveClick = (e) => {
    e.preventDefault();
    if (onAttemptSave) {
      onAttemptSave(formData, currentInvoice);
    }
  };

  const maskedIban = piiMasker.mask(currentInvoice?.vendorIban, piiShieldEnabled).text;
  const maskedTaxId = piiMasker.mask(currentInvoice?.vendorTaxId, piiShieldEnabled).text;

  return (
    <div className="flex flex-col h-full bg-[#111520] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
      {/* ERP Header Bar */}
      <div className="bg-[#181D2B] px-5 py-3 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-950/60 border border-blue-800/40 text-blue-400">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-sm text-slate-200">Stuttgart Machine Works ERP (S/4 Sandbox)</h2>
              <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-mono">
                ENV: PROD-MIRROR
              </span>
            </div>
            <p className="text-xs text-slate-400">Module: Accounts Payable & Month-End Audit Dispatcher</p>
          </div>
        </div>

        {/* Invoice Selector Pills */}
        <div className="flex items-center gap-1.5 bg-[#0F121C] p-1 rounded-xl border border-slate-800/90">
          {invoices.map((inv) => (
            <button
              key={inv.id}
              onClick={() => onSelectInvoice(inv.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                inv.id === selectedInvoiceId
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              {inv.id}
            </button>
          ))}
        </div>
      </div>

      {/* Main ERP Workspace */}
      <div className="p-6 overflow-y-auto flex-1 space-y-6">
        
        {/* Invoice Summary Banner */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-[#151A27] p-4 rounded-xl border border-slate-800">
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Vendor</span>
            <span className="font-semibold text-sm text-slate-100 block truncate">{currentInvoice?.vendor}</span>
            <span className="text-[11px] font-mono text-slate-400 block truncate">Tax ID: {maskedTaxId}</span>
          </div>

          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Remittance IBAN</span>
            <span className="text-xs font-mono text-slate-300 block truncate">{maskedIban}</span>
            <span className="text-[10px] text-emerald-400 flex items-center gap-1 mt-0.5">
              <CheckCircle2 className="w-3 h-3" /> VIES Validated
            </span>
          </div>

          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Invoice Amount</span>
            <div className="flex items-center gap-1 text-lg font-bold text-white font-mono">
              <Euro className="w-4 h-4 text-emerald-400" />
              <span>{currentInvoice?.amount?.toLocaleString('de-DE', { minimumFractionDigits: 2 })}</span>
              <span className="text-xs text-slate-400 font-normal">EUR Net</span>
            </div>
            {currentInvoice?.amount >= 5000 && (
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 inline-block mt-0.5">
                Exceeds €5k Threshold
              </span>
            )}
          </div>

          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Classification Badge</span>
            <div className="mt-1">
              <span className="text-xs px-2.5 py-1 rounded-md font-medium bg-slate-800 text-slate-300 border border-slate-700 inline-block">
                {currentInvoice?.badge || "Standard Entry"}
              </span>
            </div>
          </div>
        </div>

        {/* Invoice Item Details */}
        <div className="bg-[#151A27] p-4 rounded-xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800/80 pb-2">
            <span className="font-semibold uppercase tracking-wider">Line Item Description</span>
            <span className="font-mono">PO: PO-88419-STG</span>
          </div>
          <div className="flex items-center justify-between text-sm py-1">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-slate-400" />
              <span className="text-slate-200 font-medium">{currentInvoice?.description}</span>
            </div>
            <span className="font-mono font-semibold text-white">
              €{currentInvoice?.amount?.toLocaleString('de-DE', { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        {/* Interactive Accounting Input Form */}
        <form onSubmit={handleSaveClick} className="bg-[#151A27] p-5 rounded-xl border border-slate-800 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Hash className="w-4 h-4 text-blue-400" />
              General Ledger Coding & Compliance
            </h3>
            {isTutorMode && (
              <span className="text-xs bg-emerald-950/60 border border-emerald-700/60 text-emerald-300 px-2 py-0.5 rounded-full font-medium">
                Lena's Live Desk (Interactive Test)
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Cost Center Dropdown */}
            <div className={`space-y-1.5 ${interceptionActive ? 'ring-2 ring-red-500 rounded-lg p-2 bg-red-950/20 transition-all duration-300' : ''}`}>
              <label className="text-xs font-medium text-slate-300 flex items-center justify-between">
                <span>Target Cost Center / Account:</span>
                {interceptionActive && (
                  <span className="text-xs font-bold text-red-400 flex items-center gap-1">
                    <ShieldAlert className="w-3.5 h-3.5" /> STOPPED BY APPRENTICE
                  </span>
                )}
              </label>
              <select
                value={formData.costCenter}
                onChange={(e) => handleChange('costCenter', e.target.value)}
                className={`w-full px-3 py-2 rounded-lg bg-[#0F131D] border text-xs font-mono transition-colors ${
                  interceptionActive 
                    ? 'border-red-500 text-red-200 focus:ring-red-500' 
                    : 'border-slate-700 text-slate-200 focus:border-blue-500'
                }`}
              >
                <option value="4711">4711 — Plant Maintenance & General Opex</option>
                <option value="0400">0400 — Fixed Asset Capital Expenditure (Capex)</option>
                <option value="5200">5200 — Tooling & Consumable Inventory</option>
                <option value="8010">8010 — R&D Prototyping Subcontract</option>
              </select>
              <p className="text-[11px] text-slate-400">
                {formData.costCenter === "0400" 
                  ? "✓ Capex: Capitalized asset; subject to annual HGB depreciation schedule."
                  : "⚠ Opex: Directly expensed against monthly departmental operating budget."}
              </p>
            </div>

            {/* Asset Number Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300 flex items-center justify-between">
                <span>Asset Registry Tag Number:</span>
                <span className="text-[10px] text-slate-500">(Required if Cost Center == 0400)</span>
              </label>
              <input
                type="text"
                placeholder="e.g. AST-77401 or AST-88219"
                value={formData.assetNumber}
                onChange={(e) => handleChange('assetNumber', e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#0F131D] border border-slate-700 text-slate-200 text-xs font-mono focus:border-blue-500"
              />
              <p className="text-[11px] text-slate-400">Sabine Guardrail: "No asset number, no capex booking."</p>
            </div>
          </div>

          {/* Anomaly Checkboxes & Routing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2 border-t border-slate-800">
            {/* Payment Hold Checkbox */}
            <div className="flex items-start gap-3 bg-[#0F131D] p-3 rounded-lg border border-slate-800">
              <input
                type="checkbox"
                id="isHold"
                checked={formData.isHold}
                onChange={(e) => handleChange('isHold', e.target.checked)}
                className="mt-1 h-4 w-4 rounded bg-slate-900 border-slate-700 text-orange-500 focus:ring-orange-500"
              />
              <label htmlFor="isHold" className="cursor-pointer">
                <span className="text-xs font-semibold text-slate-200 block">Freeze Payment / Supplier Audit Hold</span>
                <span className="text-[11px] text-slate-400 block mt-0.5">
                  Mandatory for flagged December carriers (e.g. Bauer Logistik) until delivery slip arrives.
                </span>
              </label>
            </div>

            {/* Approval Routing Tier */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300 block">Approval Hierarchy Level:</label>
              <select
                value={formData.approvalLevel}
                onChange={(e) => handleChange('approvalLevel', e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#0F131D] border border-slate-700 text-slate-200 text-xs focus:border-blue-500"
              >
                <option value="Tier-1">Tier-1: Standard AP Specialist Release</option>
                <option value="Tier-2">Tier-2: Plant Director & Tax Co-Sign (Cross-Border Subs)</option>
                <option value="Tier-3">Tier-3: CFO Special Approval (&gt; €50,000)</option>
              </select>
            </div>
          </div>

          {/* Action Button & Interception Status */}
          <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-slate-400 flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-500" />
              <span>Audit Log Record: S4H-2026-OCT-03-AP</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="submit"
                className={`w-full sm:w-auto px-5 py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  interceptionActive
                    ? 'bg-red-600 hover:bg-red-700 text-white ring-2 ring-red-400 shadow-lg shadow-red-600/40 animate-pulse'
                    : isTutorMode
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-600/30'
                      : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30'
                }`}
              >
                <span>Approve & Post to General Ledger</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
}
