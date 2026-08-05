// Payment adapter for booking deposits.
// Active provider at launch: "manual" — the booking is recorded as awaiting deposit
// and confirmed over WhatsApp / EFT.
//
// PAYFAST INTEGRATION POINT ------------------------------------------------
// To switch on PayFast (or Yoco/Ozow), set PROVIDER = "payfast" and supply
// PAYFAST_MERCHANT_ID, PAYFAST_MERCHANT_KEY and PAYFAST_PASSPHRASE as project
// secrets. Then build the signed redirect form below and add an ITN webhook at
// src/routes/api/public/payfast-itn.ts that verifies the signature and flips
// bookings.payment_status to "paid".
// -------------------------------------------------------------------------

export type PaymentProvider = "manual" | "payfast";

export const PROVIDER: PaymentProvider = "manual";

export type DepositRequest = {
  reference: string;
  amountCents: number;
  description: string;
};

export type DepositResult =
  | { kind: "manual"; instructions: string }
  | { kind: "redirect"; url: string };

export function startDeposit(req: DepositRequest): DepositResult {
  if (PROVIDER === "manual") {
    return {
      kind: "manual",
      instructions: `Your booking ${req.reference} is reserved. Confirm it on WhatsApp and we'll send payment details for the ${(req.amountCents / 100).toLocaleString("en-ZA")} rand deposit.`,
    };
  }
  // PLACEHOLDER: return { kind: "redirect", url: buildPayFastRedirect(req) }
  throw new Error("PayFast is not configured yet.");
}
