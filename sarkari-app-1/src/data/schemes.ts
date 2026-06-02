// src/data/schemes.ts
import { Alert, Linking } from 'react-native';
import { Scheme } from '../types';
import { navigate } from '../utils/helper';

export const schemes: Scheme[] = [
  {
    id: 'pm-kisan',
    title: 'PM Kisan Samman Nidhi',
    shortTitle: 'PM-KISAN',
    category: 'Farmer',
    tagline: '₹6,000 सालाना सहायता किसानों के लिए',
    description:
      'PM Kisan Samman Nidhi (PM-KISAN) is a Central Sector scheme that provides income support of ₹6,000 per year to all landholding farmer families across India. The amount is transferred in three equal installments of ₹2,000 directly into the bank accounts of eligible farmers every four months. Launched in February 2019, the scheme ensures farmers have supplemental income for their agricultural needs.',
    launchedBy: 'Shri Narendra Modi',
    launchYear: '2019',
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    eligibility: [
      'All landholding farmer families in India are eligible',
      'Farmer family means husband, wife, and minor children',
      'Land must be in the name of the farmer (as per land records)',
      'Small and Marginal Farmers owning up to 2 hectares of land',
      'Both rural and urban farmers with cultivable land',
    ],
    benefits: [
      {
        icon: 'cash',
        title: '₹6,000 Per Year',
        description: 'Annual financial benefit of ₹6,000 provided in 3 installments of ₹2,000 each.',
      },
      {
        icon: 'bank-transfer',
        title: 'Direct Bank Transfer',
        description: 'Money directly credited to registered bank account via DBT — no middlemen.',
      },
      {
        icon: 'calendar-clock',
        title: 'Every 4 Months',
        description: 'Installments released in April, August, and December every year.',
      },
      {
        icon: 'shield-check',
        title: '100% Government Funded',
        description: 'Fully funded by the Central Government — no state contribution required.',
      },
    ],
    documents: [
      'Aadhaar Card (mandatory for verification)',
      'Land ownership documents / Khasra-Khatauni',
      'Bank account passbook (linked with Aadhaar)',
      'Mobile number linked to Aadhaar',
      'Caste certificate (if applicable)',
      'Residence proof (Ration card / Voter ID)',
    ],
    applySteps: [
      {
        step: 1,
        title: 'Visit Official Portal',
        description: 'Go to pmkisan.gov.in on your phone or computer.',
      },
      {
        step: 2,
        title: 'Click "New Farmer Registration"',
        description: 'Find the "Farmers Corner" section and click "New Farmer Registration".',
      },
      {
        step: 3,
        title: 'Enter Aadhaar Details',
        description: 'Enter your Aadhaar number, mobile number, and select your State.',
      },
      {
        step: 4,
        title: 'Fill Personal & Land Details',
        description: 'Enter your full name, bank account details, and land record information.',
      },
      {
        step: 5,
        title: 'Submit & Get Reference Number',
        description: 'Submit the form and save your registration reference number for tracking.',
      },
      {
        step: 6,
        title: 'Verification by Patwari',
        description: 'Local Patwari/Lekhpal will verify your land records and details.',
      },
      {
        step: 7,
        title: 'Approval & First Installment',
        description: 'After approval, first ₹2,000 installment will be transferred to your bank.',
      },
    ],
    importantNotes: [
      'Do NOT pay any money to any agent for registration — it is completely FREE.',
      'Aadhaar must be linked to your bank account for receiving funds.',
      'Existing beneficiaries need to do e-KYC every year to continue receiving benefits.',
      'Income Tax payers are NOT eligible for this scheme.',
      'Government employees and pensioners are NOT eligible.',
      'Professionals like doctors, engineers, lawyers are NOT eligible.',
      'Status can be checked online anytime at pmkisan.gov.in.',
    ],
    officialLink: 'https://pmkisan.gov.in',
    helplineNumber: '155261 / 1800115526',
    image: 'farmer',
    coverColor: '#1a6b3a',
    tags: ['₹6000/year', 'DBT', 'Kisan', 'Agriculture', 'Central Scheme'],
    faq: [
      {
        question: 'How many installments are given per year?',
        answer: '3 installments of ₹2,000 each — in April, August, and December — totaling ₹6,000 per year.',
      },
      {
        question: 'What is e-KYC and is it mandatory?',
        answer: 'e-KYC is Aadhaar-based identity verification. It is mandatory every year to continue receiving PM-KISAN benefits.',
      },
      {
        question: 'Can I check my payment status?',
        answer: 'Yes! Visit pmkisan.gov.in → Farmers Corner → Beneficiary Status → Enter Aadhaar or Account number.',
      },
      {
        question: 'My name is in land records but money is not coming. Why?',
        answer: 'Possible reasons: Aadhaar not linked to bank account, e-KYC pending, or land records mismatch. Visit your local agriculture office.',
      },
      {
        question: 'Is this scheme available for tenant farmers?',
        answer: 'No, only farmers who own the land and whose name appears in land records are eligible.',
      },
      {
        question: 'Can urban farmers apply?',
        answer: 'Yes! Urban farmers with cultivable land are also eligible to apply for PM-KISAN.',
      },
      {
        question: 'What is the last date to apply?',
        answer: 'There is no last date. Applications are accepted throughout the year on a rolling basis.',
      },
    ],
  }
];

export const getSchemeById = (id: string): Scheme | undefined =>
  schemes.find(s => s.id === id);

export const featuredScheme = schemes[0];

export const SECTIONS = [
  {
    icon: '✅',
    label: 'Eligibility',
    subtitle: 'Who can apply?',
    screen: 'Eligibility',
    color: '#E8F5E9',
    accent: '#2E7D32',
  },
  {
    icon: '🎁',
    label: 'Benefits',
    subtitle: '₹6,000 per year',
    screen: 'Benefits',
    color: '#E3F2FD',
    accent: '#1565C0',
  },
  {
    icon: '📄',
    label: 'Documents',
    subtitle: 'Required papers',
    screen: 'Documents',
    color: '#FFF3E0',
    accent: '#E65100',
  },
  {
    icon: '📋',
    label: 'Apply Steps',
    subtitle: '7 simple steps',
    screen: 'ApplyProcess',
    color: '#F3E5F5',
    accent: '#6A1B9A',
  },
  {
    icon: '💬',
    label: 'FAQ',
    subtitle: 'Common questions',
    screen: 'FAQ',
    color: '#E0F7FA',
    accent: '#00695C',
  },
];

export const SETTINGS_SECTIONS = [
  {
    title: 'App Info',
    items: [
      { icon: '📱', label: 'App Name', value: 'Kishan Guide', action: null },
      { icon: '🔢', label: 'Version', value: '1.0.0', action: null },
      {
        icon: '👨‍💻',
        label: 'Developer',
        value: 'Independent Developer',
        action: null,
      },
    ],
  },
  {
    title: 'About',
    items: [
      {
        icon: '🌐',
        label: 'Official PM-KISAN Website',
        value: '',
        action: () => Linking.openURL('https://pmkisan.gov.in'),
      },
      {
        icon: '📋',
        label: 'Privacy Policy',
        value: '',
        action: () => navigate("PrivacyPolicy", 'https://pmkisan.gov.in')
      },
      {
        icon: '📋',
        label: `Term's and Conditions `,
        value: '',
        action: () => navigate("TermsAndConditions", 'https://pmkisan.gov.in')
      },
      {
        icon: '⚠️',
        label: 'Disclaimer',
        value: '',
        action: () =>
          Alert.alert(
            'Disclaimer',
            'This app is NOT affiliated with or endorsed by any government entity. All information is sourced from publicly available government websites for informational purposes only.',
          ),
      },
    ],
  },
  {
    title: 'Support',
    items: [
      {
        icon: '📞',
        label: 'PM-KISAN Helpline',
        value: '155261',
        action: () => Linking.openURL('tel:155261'),
      },
      {
        icon: '📧',
        label: 'PM-KISAN Email',
        value: '',
        action: () => Linking.openURL('mailto:pmkisan-ict@gov.in'),
      },
    ],
  },
];