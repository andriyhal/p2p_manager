const bankMap = {
    "Oschadbank": "Oschadbank",
    "PUMB": "PUMBBank",
    "Monobank": "Monobank",
    "Privat Bank (Universal Card)": "PrivatBank",
    "Privat Bank": "PrivatBank",
    "A-Bank": "ABank",
    "Sportbank": "Sportbank",
    "Raiffeisen Bank Aval": "RaiffeisenBankAval",
    "SEPA (EU) bank transfer": "SEPA",
    "SEPA": "SEPA",
    "Bank Transfer": "BANK",
    "Revolut": "Revolut",
    "SEPA Instant": "SEPAinstant",
    "Wise": "Wise",
    "Advcash": "Advcash",
    "Ukrsibbank": "Ukrsibbank",
    "KredoBank": "KredoBank",
    "OTP BANK": "OTPBankNew",
    "Credit Agricole": "CreditAgricole",
    "Izibank": "izibank",
    "Sense SuperApp": "SenseSuperApp",
    "Ukrgasbank": "Ukrgasbank",
    "Idea Bank": "IdeaBank",
    "Accordbank": "AccordBank",
    "Unex Bank": "UnexBank",
    "Bank Vlasnyi Rakhunok": "BankVlasnyiRakhunok",
    "Bank Pivdenny": "BankPivdenny",
    "NEO": "NEO",
    "Ukreximbank": "Ukreximbank",
    "Tascombank": "Tascombank",
    "Bank Credit Dnipro": "BankCreditDnipro",
    "ProCredit Bank": "ProcreditBank",
    "Crystalbank": "CystalBank",
    "Credo Bank": "CREDOBANK",
    "Forward Bank": "ForwardBank",
    "GEO Pay": "GEOPay",
    "Pravex Bank": "PravexBank",
    "Piraeus Bank": "PiraeusBank",
    "Bank Vostok": "BankVostok",
    "MTBank": "MTBank",
    "Transfers with specific bank": "SpecificBank",
    "Ecobank": "Ecobank",
    "Paysend.com": "Paysend",
    "Paysend": "Paysend",
    "Airtime Mobile Top-Up": "Mobiletopup",
    "Western Union": "WesternUnion"
}
  
export const getBankId = (scrapedBankName) => bankMap[scrapedBankName] || null;
  