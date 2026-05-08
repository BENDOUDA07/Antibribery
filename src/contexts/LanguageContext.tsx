import React, { createContext, useContext, useEffect, useState } from "react";

type Language = "en" | "fr" | "ar";

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
};

const translations: Record<Language, Record<string, string>> = {
  en: {
    "app.title": "Anti-Bribery Platform",
    "app.subtitle": "Report corruption safely and transparently",

    "login.title": "Login",
    "login.cin": "CIN",
    "login.phone": "Phone Number",
    "login.continue": "Continue",
    "login.placeholder.cin": "Enter your CIN",
    "login.placeholder.phone": "Enter your phone number",
    "login.platformName": "Anti-Corruption Reporting Platform",
    "login.platformSubtitle": "Kingdom of Morocco",
    "login.cinLabel": "National ID Number",
    "login.cinPlaceholder": "Enter your national ID number",
    "login.phoneLabel": "Phone Number",
    "login.phonePlaceholder": "Enter your phone number",
    "login.sendOtpBtn": "Send OTP Code",
    "login.otpLabel": "Verification Code (OTP)",
    "login.otpSentMessage": "Verification code has been sent to your phone number",
    "login.authenticateBtn": "Secure Authentication",
    "login.trustMessage": "Your identity is legally protected and will never be disclosed to the accused party.",

    "dashboard.title": "Dashboard",
    "dashboard.reports": "Reports",
    "dashboard.pending": "Pending",
    "dashboard.resolved": "Resolved",
    "dashboard.investigating": "Investigating",

    "common.submit": "Submit",
    "common.cancel": "Cancel",
    "common.save": "Save",
    "common.delete": "Delete",
    "common.search": "Search",
    "common.authenticated": "Authenticated",
    "common.logout": "Logout",

    "authority.subtitle": "Authority Portal",
    "authority.officer": "Authority Officer",
    "authority.role": "Anti-Corruption Officer",
    "authority.nav.dashboard": "Dashboard",
    "authority.nav.cases": "Cases",
    "authority.nav.map": "Map",
    "authority.nav.reports": "Reports",
    "authority.nav.regionalReports": "Regional Reports",
    "authority.nav.generateReport": "Generate Report",
    "authority.nav.auditLogs": "Audit Logs",
    "authority.nav.settings": "Settings",
    "authority.dashboard.title": "Investigation Dashboard",
    "authority.dashboard.subtitle": "Welcome back to the authority portal",

    "citizen.submitReclamation": "Submit Report",
    "citizen.myReclamations": "My Reports",
    "citizen.newReport": "New Report",

    "streetview.title": "Street View",
    "streetview.regionalOverview": "Regional Overview",
    "streetview.privacyNotice": "Privacy Notice: Street View shows public street-level imagery. No specific incident locations are displayed. This is for regional awareness only.",
    "streetview.unavailable": "Street View Unavailable",
    "streetview.unavailableMessage": "Street View is not available for this location or API key is not configured.",
    "streetview.loading": "Loading Street View...",
    "streetview.note": "This feature is for educational and awareness purposes only.",
    "streetview.viewButton": "View Street View",
    "streetview.close": "Close",
    "common.privacyNotice": "Privacy Notice",

    "common.note": "Note",  },

  fr: {
    "app.title": "Plateforme Anti-Corruption",
    "app.subtitle": "Signalez la corruption en toute sécurité et transparence",

    "login.title": "Connexion",
    "login.cin": "CIN",
    "login.phone": "Numéro de téléphone",
    "login.continue": "Continuer",
    "login.placeholder.cin": "Entrez votre CIN",
    "login.placeholder.phone": "Entrez votre numéro de téléphone",
    "login.platformName": "Plateforme Anti-Corruption",
    "login.platformSubtitle": "Royaume du Maroc",
    "login.cinLabel": "Numéro CIN",
    "login.cinPlaceholder": "Entrez votre numéro CIN",
    "login.phoneLabel": "Numéro de téléphone",
    "login.phonePlaceholder": "Entrez votre numéro de téléphone",
    "login.sendOtpBtn": "Envoyer le code OTP",
    "login.otpLabel": "Code de vérification (OTP)",
    "login.otpSentMessage": "Le code de vérification a été envoyé à votre numéro",
    "login.authenticateBtn": "Authentification Sécurisée",
    "login.trustMessage": "Votre identité est légalement protégée et ne sera jamais divulguée à la partie accusée.",

    "dashboard.title": "Tableau de bord",
    "dashboard.reports": "Signalements",
    "dashboard.pending": "En attente",
    "dashboard.resolved": "Résolu",
    "dashboard.investigating": "En cours d’enquête",

    "common.submit": "Envoyer",
    "common.cancel": "Annuler",
    "common.save": "Enregistrer",
    "common.delete": "Supprimer",
    "common.search": "Rechercher",
    "common.authenticated": "Authentifié",
    "common.logout": "Déconnexion",

    "authority.subtitle": "Portail d'Autorité",
    "authority.officer": "Officier d'Autorité",
    "authority.role": "Officier Anti-Corruption",
    "authority.nav.dashboard": "Tableau de bord",
    "authority.nav.cases": "Cas",
    "authority.nav.map": "Carte",
    "authority.nav.reports": "Rapports",
    "authority.nav.regionalReports": "Rapports Régionaux",
    "authority.nav.generateReport": "Générer Rapport",
    "authority.nav.auditLogs": "Journaux d'audit",
    "authority.nav.settings": "Paramètres",
    "authority.dashboard.title": "Tableau de bord d'Investigation",
    "authority.dashboard.subtitle": "Bienvenue sur le portail d'autorité",

    "citizen.submitReclamation": "Soumettre un Rapport",
    "citizen.myReclamations": "Mes Rapports",
    "citizen.newReport": "Nouveau Rapport",

    "streetview.title": "Street View",
    "streetview.regionalOverview": "Aperçu Régional",
    "streetview.privacyNotice": "Avis de confidentialité : Street View montre des images publiques au niveau de la rue. Aucun emplacement d'incident spécifique n'est affiché. Ceci est uniquement pour la sensibilisation régionale.",
    "streetview.unavailable": "Street View Indisponible",
    "streetview.unavailableMessage": "Street View n'est pas disponible pour cet emplacement ou la clé API n'est pas configurée.",
    "streetview.loading": "Chargement de Street View...",
    "streetview.note": "Cette fonctionnalité est uniquement à des fins éducatives et de sensibilisation.",
    "streetview.viewButton": "Voir Street View",
    "streetview.close": "Fermer",

    "common.privacyNotice": "Avis de confidentialité",

    "common.note": "Note",
  },

  ar: {
    "app.title": "منصة مكافحة الرشوة",
    "app.subtitle": "أبلغ عن الفساد بأمان وشفافية",

    "login.title": "تسجيل الدخول",
    "login.cin": "رقم البطاقة الوطنية",
    "login.phone": "رقم الهاتف",
    "login.continue": "متابعة",
    "login.placeholder.cin": "أدخل رقم البطاقة الوطنية",
    "login.placeholder.phone": "أدخل رقم الهاتف",
    "login.platformName": "منصة الإبلاغ عن الرشوة",
    "login.platformSubtitle": "المملكة المغربية",
    "login.cinLabel": "رقم البطاقة الوطنية",
    "login.cinPlaceholder": "أدخل رقم البطاقة الوطنية",
    "login.phoneLabel": "رقم الهاتف",
    "login.phonePlaceholder": "أدخل رقم الهاتف",
    "login.sendOtpBtn": "إرسال رمز التحقق",
    "login.otpLabel": "رمز التحقق (OTP)",
    "login.otpSentMessage": "تم إرسال رمز التحقق إلى رقم هاتفك",
    "login.authenticateBtn": "تسجيل الدخول الآمن",
    "login.trustMessage": "هويتك محمية قانونيًا ولن يتم الكشف عنها للطرف المتهم.",

    "dashboard.title": "لوحة التحكم",
    "dashboard.reports": "الشكايات",
    "dashboard.pending": "قيد الانتظار",
    "dashboard.resolved": "تم الحل",
    "dashboard.investigating": "قيد التحقيق",

    "common.submit": "إرسال",
    "common.cancel": "إلغاء",
    "common.save": "حفظ",
    "common.delete": "حذف",
    "common.search": "بحث",
    "common.authenticated": "مصرح",
    "common.logout": "تسجيل الخروج",

    "authority.subtitle": "بوابة السلطة",
    "authority.officer": "ضابط السلطة",
    "authority.role": "ضابط مكافحة الفساد",
    "authority.nav.dashboard": "لوحة التحكم",
    "authority.nav.cases": "الحالات",
    "authority.nav.map": "الخريطة",
    "authority.nav.reports": "التقارير",
    "authority.nav.regionalReports": "التقارير الإقليمية",
    "authority.nav.generateReport": "إنشاء تقرير",
    "authority.nav.auditLogs": "سجلات المراجعة",
    "authority.nav.settings": "الإعدادات",
    "authority.dashboard.title": "لوحة تحكم التحقيق",
    "authority.dashboard.subtitle": "أهلا بك في بوابة السلطة",

    "citizen.submitReclamation": "إرسال تقرير",
    "citizen.myReclamations": "تقاريري",
    "citizen.newReport": "تقرير جديد",

    "streetview.title": "عرض الشارع",
    "streetview.regionalOverview": "نظرة عامة إقليمية",
    "streetview.privacyNotice": "إشعار الخصوصية: يعرض عرض الشارع صورًا عامة على مستوى الشارع. لا يتم عرض مواقع حوادث محددة. هذا للتوعية الإقليمية فقط.",
    "streetview.unavailable": "عرض الشارع غير متوفر",
    "streetview.unavailableMessage": "عرض الشارع غير متوفر لهذا الموقع أو لم يتم تكوين مفتاح API.",
    "streetview.loading": "جارٍ تحميل عرض الشارع...",
    "streetview.note": "هذه الميزة لأغراض تعليمية وتوعوية فقط.",
    "streetview.viewButton": "عرض الشارع",
    "streetview.close": "إغلاق",

    "common.privacyNotice": "إشعار الخصوصية",

    "common.note": "ملاحظة",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem("app-language") as Language | null;
    return savedLanguage || "fr";
  });

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    localStorage.setItem("app-language", newLanguage);
  };

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return context;
}