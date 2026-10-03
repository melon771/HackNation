/**
 * PII Masking Engine (Inspired by Microsoft Presidio)
 * Redacts personal identifiers, IBANs, and Tax IDs in real-time.
 */

export const piiMasker = {
  // Regex patterns for German / EU financial documents
  patterns: {
    iban: /[A-Z]{2}\d{2}[ ]\d{4}[ ]\d{4}[ ]\d{4}[ ]\d{4}[ ]\d{2}|[A-Z]{2}\d{2}[ ]\d{4}[ ]\d{4}[ ]\d{4}[ ]\d{4}[ ]\d{4}/g,
    taxId: /(DE|CZ)[- ]?\d{8,9}/g,
    email: /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/g,
    phone: /(\+49|\+420|0)[0-9\s-]{8,14}/g
  },

  mask(text, enabled = true) {
    if (!enabled || !text) return { text, redactedCount: 0 };
    
    let redactedCount = 0;
    let sanitized = text;

    // Mask IBAN
    sanitized = sanitized.replace(this.patterns.iban, (match) => {
      redactedCount++;
      return match.substring(0, 4) + " •••• •••• •••• " + match.slice(-2);
    });

    // Mask Tax ID
    sanitized = sanitized.replace(this.patterns.taxId, (match) => {
      redactedCount++;
      return match.substring(0, 3) + "••••••" + match.slice(-2);
    });

    // Mask Email
    sanitized = sanitized.replace(this.patterns.email, (match) => {
      redactedCount++;
      const [user, domain] = match.split('@');
      return user.substring(0, 2) + "•••@" + domain;
    });

    // Mask Phone
    sanitized = sanitized.replace(this.patterns.phone, () => {
      redactedCount++;
      return "+49 ••• •••••••";
    });

    return { text: sanitized, redactedCount };
  },

  maskObject(obj, enabled = true) {
    if (!enabled || !obj) return obj;
    const copy = JSON.parse(JSON.stringify(obj));
    
    for (const key in copy) {
      if (typeof copy[key] === 'string') {
        const result = this.mask(copy[key], enabled);
        copy[key] = result.text;
      } else if (typeof copy[key] === 'object' && copy[key] !== null) {
        copy[key] = this.maskObject(copy[key], enabled);
      }
    }
    return copy;
  }
};
