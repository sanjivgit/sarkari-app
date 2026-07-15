// src/data/schemes.ts
import { Alert, Linking } from 'react-native';
import { Scheme } from '../types';
import { navigate } from '../utils/helper';

export const schemes: Scheme[] = [
  {
    id: 'cm-ladli-bahna',
    title: 'मुख्यमंत्री लाड़ली बहना योजना',
    shortTitle: 'Ladli Behna',
    category: 'Women Empowerment',
    tagline: '₹1,500 मासिक सहायता महिलाओं के लिए',
    description:
      'Mukhyamantri Ladli Behna Yojana is a flagship scheme of the Madhya Pradesh Government that provides monthly financial assistance of ₹1,500 to eligible women. Launched on 5 March 2023, the scheme aims to strengthen the economic independence and social security of married, widowed, divorced, and abandoned women across the state. The amount is transferred directly into the Aadhaar-linked DBT-enabled bank account of the beneficiary.',
    launchedBy: 'Shri Shivraj Singh Chouhan',
    launchYear: '2023',
    ministry: 'Department of Women & Child Development, Madhya Pradesh',
    eligibility: [
      'Women aged 21 to 60 years as on 1 January of the application year',
      'Permanent residents of Madhya Pradesh',
      'Married, widowed, divorced, or abandoned women are eligible',
      'Family annual income must be below ₹2.5 lakh (self-declared)',
      'Must have active Samagra Family ID and Member ID',
      'Must have own Aadhaar-linked DBT-enabled bank account in applicant\'s name',
    ],
    benefits: [
      {
        icon: 'cash',
        title: '₹1,500 Per Month',
        description:
          'Monthly financial assistance of ₹1,500 credited directly to the beneficiary\'s bank account.',
      },
      {
        icon: 'bank-transfer',
        title: 'Direct Bank Transfer',
        description:
          'Amount transferred via DBT to Aadhaar-linked bank account — no middlemen involved.',
      },
      {
        icon: 'calendar-clock',
        title: 'Monthly Payments',
        description:
          'Regular monthly installments throughout the eligibility period (up to age 60).',
      },
      {
        icon: 'shield-check',
        title: 'State Government Funded',
        description:
          'Fully funded by the Madhya Pradesh Government for women\'s economic empowerment.',
      },
    ],
    documents: [
      'Aadhaar Card (linked to mobile number and bank account)',
      'Samagra Family ID and Member ID (mandatory)',
      'Bank account passbook (Aadhaar-linked, DBT-enabled, in applicant\'s name only)',
      'Passport size photograph',
      'Mobile number registered on Samagra Portal',
      'Madhya Pradesh residence proof (if required)',
    ],
    applySteps: [
      {
        step: 1,
        title: 'Get Samagra ID',
        description:
          'Ensure you have Samagra Family ID and Member ID. Apply at samagra.gov.in or your Gram Panchayat if not available.',
      },
      {
        step: 2,
        title: 'Visit Camp / Panchayat / Ward Office',
        description:
          'Go to the nearest Ladli Behna camp, Gram Panchayat office, or Ward office with all documents.',
      },
      {
        step: 3,
        title: 'Carry Required Documents',
        description:
          'Bring Aadhaar card, Samagra ID printout, bank passbook, and passport-size photograph.',
      },
      {
        step: 4,
        title: 'Fill Application on Portal',
        description:
          'The operator will fill your application on the Ladli Behna Portal/App at the camp or office.',
      },
      {
        step: 5,
        title: 'Complete e-KYC & Photo',
        description:
          'Aadhaar-based e-KYC verification and live photograph will be captured during application.',
      },
      {
        step: 6,
        title: 'Ward / Panchayat Verification',
        description:
          'Your application is verified at the ward or Gram Panchayat level by officials.',
      },
      {
        step: 7,
        title: 'Approval & First Payment',
        description:
          'After block-level approval, ₹1,500 will be credited monthly to your registered bank account.',
      },
    ],
    importantNotes: [
      'Do NOT pay any money to any agent — application is completely FREE.',
      'Samagra Family ID and Member ID are MANDATORY — without these, you cannot apply.',
      'Bank account must be in the applicant\'s own name only (joint accounts are not accepted).',
      'Aadhaar must be linked to your bank account with DBT enabled for receiving funds.',
      'Income tax payers and their families are NOT eligible.',
      'Government employees, pensioners, and elected representatives (except Panch/Upsarpanch) are NOT eligible.',
      'Women already receiving ₹1,250 or more per month from other govt schemes are NOT eligible.',
      'Families owning a four-wheeler (except tractor) are NOT eligible.',
      'Check application status anytime at cmladlibahna.mp.gov.in using Samagra ID.',
    ],
    officialLink: 'https://cmladlibahna.mp.gov.in',
    helplineNumber: '0755-2700800',
    image: 'woman',
    coverColor: '#c2185b',
    tags: ['₹1500/month', 'DBT', 'Women', 'MP Scheme', 'Ladli Behna'],
    faq: [
      {
        question: 'How much money is given per month?',
        answer:
          'Eligible women receive ₹1,500 per month, transferred directly to their Aadhaar-linked DBT bank account.',
      },
      {
        question: 'Who can apply for Ladli Behna Yojana?',
        answer:
          'Married, widowed, divorced, or abandoned women aged 21–60 who are permanent residents of Madhya Pradesh with family income below ₹2.5 lakh.',
      },
      {
        question: 'Is Samagra ID mandatory?',
        answer:
          'Yes! Both Samagra Family ID and Member ID are mandatory. Without Samagra ID, your application cannot be processed. Get it at samagra.gov.in or your local Gram Panchayat.',
      },
      {
        question: 'Can I apply online?',
        answer:
          'Applications are submitted through the Ladli Behna Portal/App at camp sites, Gram Panchayat offices, or Ward offices. Visit your nearest camp or office for assistance.',
      },
      {
        question: 'How can I check my application status?',
        answer:
          'Visit cmladlibahna.mp.gov.in → Application Status → Enter your Samagra ID or application number to check status.',
      },
      {
        question: 'My application is approved but money is not coming. Why?',
        answer:
          'Possible reasons: Aadhaar not linked to bank account, DBT not enabled, bank account is joint (not in your name only), or verification pending. Call helpline 0755-2700800.',
      },
      {
        question: 'Are unmarried women eligible?',
        answer:
          'No. Only married, widowed, divorced, or abandoned women are eligible for this scheme.',
      },
      {
        question: 'What is the last date to apply?',
        answer:
          'There is no fixed last date. Applications are accepted on a rolling basis through camps and Gram Panchayat/Ward offices.',
      },
    ],
  },
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
    color: '#FCE4EC',
    accent: '#C2185B',
  },
  {
    icon: '🎁',
    label: 'Benefits',
    subtitle: '₹1,500 per month',
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
      { icon: '📱', label: 'App Name', value: 'Ladli Bahna Guide', action: null },
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
        label: 'Official Ladli Behna Website',
        value: '',
        action: () => Linking.openURL('https://cmladlibahna.mp.gov.in'),
      },
      {
        icon: '📋',
        label: 'Privacy Policy',
        value: '',
        action: () =>
          navigate('PrivacyPolicy', {
            url: 'https://testbook-web-app.web.app/ladli-bahna-guide/privacy-policy',
          }),
      },
      {
        icon: '📋',
        label: `Terms & Conditions `,
        value: '',
        action: () =>
          navigate('TermsAndConditions', {
            url: 'https://testbook-web-app.web.app/ladli-bahna-guide/terms-and-conditions',
          }),
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
        label: 'Ladli Behna Helpline',
        value: '0755-2700800',
        action: () => Linking.openURL('tel:07552700800'),
      },
      {
        icon: '📧',
        label: 'Ladli Behna Email',
        value: '',
        action: () => Linking.openURL('mailto:ladlibahna.wcd@mp.gov.in'),
      },
    ],
  },
];
