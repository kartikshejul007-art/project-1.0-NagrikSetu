/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { IssueCategory, Language, WorkflowStatus } from '../types';

export interface TranslationStrings {
  brandName: string;
  tagline: string;
  roleCitizen: string;
  rolePolicymaker: string;
  reportNeed: string;
  trackRequest: string;
  exploreHotspots: string;
  heroTitle: string;
  heroSubtitle: string;
  privacyPledge: string;
  anonymousPledge: string;
  publicIntegrityNotice: string;
  howItWorksTitle: string;
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;
  step4Title: string;
  step4Desc: string;
  formTitle: string;
  formSubtitle: string;
  selectLanguage: string;
  selectCategory: string;
  selectArea: string;
  descriptionLabel: string;
  descriptionPlaceholder: string;
  voiceInputButton: string;
  voiceInputListening: string;
  samplePromptButton: string;
  anonymousToggle: string;
  anonymousHelp: string;
  contactOptional: string;
  contactPlaceholder: string;
  submitButton: string;
  submittingButton: string;
  successTitle: string;
  successMessage: string;
  yourReferenceId: string;
  trackNowButton: string;
  submitAnother: string;
  trackingTitle: string;
  trackingSubtitle: string;
  enterReferencePrompt: string;
  searchButton: string;
  statusTimelineTitle: string;
  statusDisclaimer: string;
  statusReceived: string;
  statusUnderReview: string;
  statusNeedsVerification: string;
  statusPlanned: string;
  statusInProgress: string;
  statusCompleted: string;
  catWater: string;
  catRoads: string;
  catInternet: string;
}

export const TRANSLATIONS: Record<Language, TranslationStrings> = {
  mr: {
    brandName: 'नागरिकसेतू (NagrikSetu)',
    tagline: 'नागरिकांचा आवाज आणि सार्वजनिक प्राधान्यांचा सेतू.',
    roleCitizen: 'नागरिक कक्ष',
    rolePolicymaker: 'प्रशासकीय निर्णय कक्ष',
    reportNeed: 'नागरी समस्या नोंदवा',
    trackRequest: 'माझ्या अर्जाची स्थिती तपासा',
    exploreHotspots: 'प्रभागनिहाय गरजा पहा',
    heroTitle: 'तुमच्या प्रभागातील विकास गरजा थेट प्रशासनापर्यंत पोहोचवा',
    heroSubtitle:
      'पाणी, रस्ते आणि इंटरनेट सुविधांबाबत नागरिकांचे अभिप्राय संकलित करून प्रभाग अधिकाऱ्यांना पारदर्शक, वस्तुनिष्ठ नियोजन करण्यास मदत करणारे लोकसहभागाचे व्यासपीठ.',
    privacyPledge:
      'गोपनीयतेची हमी: आधार किंवा वैयक्तिक कागदपत्रांची आवश्यकता नाही. केवळ अंदाजे प्रभाग नोंदवला जातो.',
    anonymousPledge: 'पूर्णतः निनावी तक्रार नोंदवण्याचा अधिकार उपलब्ध आहे.',
    publicIntegrityNotice:
      'सर्व नागरी मागण्यांची प्रत्यक्ष प्रभाग अभियंता व अधिकाऱ्यांमार्फत स्थळ पाहणी केली जाते. निधी व कामाची मंजुरी योग्य प्रशासकीय प्रक्रियेनंतरच होते.',
    howItWorksTitle: 'नागरिकसेतू कार्यपद्धती',
    step1Title: '१. नागरी नोंदणी',
    step1Desc: 'मराठी, हिंदी किंवा इंग्रजीत आपल्या परिसरातील मूलभूत समस्या नोंदवा किंवा बोला.',
    step2Title: '२. विभागनिहाय वर्गीकरण',
    step2Desc: 'समस्येचे पाणी, रस्ते किंवा डिजिटल सेवेत त्वरित वर्गीकरण आणि गोषवारा तयार केला जातो.',
    step3Title: '३. प्रभाग व प्रत्यक्ष माहिती ताळमेळ',
    step3Desc: 'विभागातील चालू कामे आणि पाणी/रस्त्यांच्या नोंदींसोबत नागरिकांच्या सूचना जोडल्या जातात.',
    step4Title: '४. पारदर्शक प्राधान्य व स्थळ पाहणी',
    step4Desc: 'वस्तुनिष्ठ निकषांवर आधारित प्राधान्यक्रम ठरवून संबंधित अभियंता प्रत्यक्ष स्थळ पाहणी करतात.',
    formTitle: 'नागरी पायाभूत सुविधा नोंदणी',
    formSubtitle:
      'पिण्याचे पाणी, रस्ते दुरुस्ती किंवा इंटरनेट सुविधेबाबत आपल्या प्रभागातील समस्या नोंदवा.',
    selectLanguage: 'नोंदणी भाषा',
    selectCategory: 'विषय / विभाग',
    selectArea: 'प्रभाग / परिसर',
    descriptionLabel: 'समस्येचे सविस्तर वर्णन (लिहा किंवा माईक वापरा)',
    descriptionPlaceholder: 'उदा. आमच्या भागात गेल्या दोन आठवड्यांपासून पाणी नीट येत नाही...',
    voiceInputButton: 'माईक द्वारे बोला',
    voiceInputListening: 'ऐकत आहे... कृपया स्पष्ट बोला...',
    samplePromptButton: 'नमूना मजकूर भरा (पिण्याचे पाणी)',
    anonymousToggle: 'ही नोंदणी निनावी ठेवा',
    anonymousHelp: 'नाव किंवा फोन नंबर देणे पूर्णतः ऐच्छिक आहे.',
    contactOptional: 'संपर्क तपशील (पर्यायी - स्थिती अद्यतनांसाठी)',
    contactPlaceholder: 'उदा. मोबाईल क्रमांक किंवा ई-मेल',
    submitButton: 'समस्या सादर करा',
    submittingButton: 'नोंदणी प्रक्रिया सुरू आहे...',
    successTitle: 'नोंदणी यशस्वीरित्या पूर्ण झाली!',
    successMessage:
      'आपली समस्या संबंधित प्रभाग कार्यप्रवाहात दाखल झाली आहे.',
    yourReferenceId: 'संदर्भ क्रमांक (Reference Number)',
    trackNowButton: 'स्थिती लगेच तपासा',
    submitAnother: 'दुसरी नोंदणी करा',
    trackingTitle: 'अर्जाची सद्यस्थिती व प्रगती',
    trackingSubtitle: 'आपल्या संदर्भ क्रमांकाने प्रशासकीय कार्यप्रवाह तपासा.',
    enterReferencePrompt: 'संदर्भ क्रमांक प्रविष्ट करा (उदा. NS-2026-W3-0101)',
    searchButton: 'तपासा',
    statusTimelineTitle: 'प्रशासकीय कार्यप्रवाह टप्पे',
    statusDisclaimer:
      'टीप: कार्यप्रवाह स्थिती केवळ प्रशासकीय आढावा दर्शवते. प्रत्यक्ष कामाची मंजुरी तांत्रिक पाहणी व अंदाजपत्रकानंतरच होते.',
    statusReceived: 'प्राप्त झाली (Received)',
    statusUnderReview: 'पुनरावलोकन सुरू (Under Review)',
    statusNeedsVerification: 'प्रत्यक्ष स्थळ पाहणी आवश्यक (Needs Verification)',
    statusPlanned: 'नियोजित (Planned)',
    statusInProgress: 'काम प्रगतीपथावर (In Progress)',
    statusCompleted: 'काम पूर्ण (Completed)',
    catWater: 'पिण्याचे पाणी',
    catRoads: 'रस्ते व वाहतूक',
    catInternet: 'इंटरनेट कनेक्टिव्हिटी',
  },
  hi: {
    brandName: 'नागरिकसेतु (NagrikSetu)',
    tagline: 'नागरिकों की आवाज़ और जन प्राथमिकताओं का सेतु।',
    roleCitizen: 'नागरिक सेवा',
    rolePolicymaker: 'प्रशासनिक डैशबोर्ड',
    reportNeed: 'नागरिक समस्या दर्ज करें',
    trackRequest: 'अनुरोध की स्थिति जांचें',
    exploreHotspots: 'वार्ड स्तर पर आवश्यकताएं देखें',
    heroTitle: 'अपने वार्ड की विकास प्राथमिकताओं को सीधे प्रशासन तक पहुंचाएं',
    heroSubtitle:
      'पेयजल, सड़क और डिजिटल सुविधाओं के नागरिक फीडबैक को पारदर्शी वार्ड प्राथमिकताओं में बदलकर नीति-निर्माताओं को त्वरित निर्णय में मदद करने वाला मंच।',
    privacyPledge:
      'गोपनीयता सुरक्षा: आधार या व्यक्तिगत पहचान पत्र की आवश्यकता नहीं है। केवल अनुमानित वार्ड दर्ज किया जाता है।',
    anonymousPledge: 'पूर्णतः अनाम (Anonymous) रिपोर्टिंग का विकल्प उपलब्ध है।',
    publicIntegrityNotice:
      'सभी नागरिक ज्ञापनों की संबंधित वार्ड इंजीनियर द्वारा स्थलीय जांच की जाती है। अंतिम बजट व कार्य आवंटन विधिवत प्रशासनिक प्रक्रिया से होता है।',
    howItWorksTitle: 'नागरिकसेतु कार्यप्रणाली',
    step1Title: '१. नागरिक सहभाग',
    step1Desc: 'हिंदी, मराठी या अंग्रेजी में अपनी स्थानीय समस्या लिखकर या बोलकर दर्ज करें।',
    step2Title: '२. विषयवार वर्गीकरण',
    step2Desc: 'समस्या का तुरंत पेयजल, सड़क या इंटरनेट श्रेणी में सुव्यवस्थित वर्गीकरण होता है।',
    step3Title: '३. वार्ड डाटा से मिलान',
    step3Desc: 'क्षेत्र की चालू परियोजनाओं और आधारभूत आंकड़ों के साथ नागरिक रिपोर्ट का मिलान होता है।',
    step4Title: '४. वस्तुनिष्ठ प्राथमिकता व स्थलीय निरीक्षण',
    step4Desc: '५ स्पष्ट कारकों के आधार पर प्राथमिकता तय कर इंजीनियर स्थलीय सत्यापन करते हैं।',
    formTitle: 'नागरिक बुनियादी ढांचा आवश्यकता पंजीकरण',
    formSubtitle: 'सड़क, पेयजल अथवा डिजिटल कनेक्टिविटी से संबंधित समस्या का विवरण दें।',
    selectLanguage: 'भाषा',
    selectCategory: 'समस्या का प्रकार',
    selectArea: 'अनुमानित वार्ड / क्षेत्र',
    descriptionLabel: 'समस्या का विवरण (लिखें या माइक से बोलें)',
    descriptionPlaceholder: 'उदा. हमारे इलाके में पिछले दो हफ्तों से पानी ठीक से नहीं आ रहा है...',
    voiceInputButton: 'आवाज़ से बोलें',
    voiceInputListening: 'सुन रहा है... कृपया बोलें...',
    samplePromptButton: 'नमूना भरें (पेयजल समस्या)',
    anonymousToggle: 'अनाम रूप से जमा करें (पहचान गुप्त रखें)',
    anonymousHelp: 'संपर्क विवरण पूरी तरह से ऐच्छिक है।',
    contactOptional: 'संपर्क विवरण (वैकल्पिक - एसएमएस सूचना के लिए)',
    contactPlaceholder: 'मोबाइल नंबर या ईमेल',
    submitButton: 'अनुरोध दर्ज करें',
    submittingButton: 'पंजीकरण हो रहा है...',
    successTitle: 'अनुरोध सफलतापूर्वक दर्ज हुआ!',
    successMessage:
      'आपका अनुरोध संबंधित वार्ड कार्यप्रवाह में शामिल कर लिया गया है।',
    yourReferenceId: 'आपका संदर्भ नंबर (Reference ID)',
    trackNowButton: 'स्थिति ट्रैक करें',
    submitAnother: 'अन्य समस्या दर्ज करें',
    trackingTitle: 'अनुरोध स्थिति और प्रगति',
    trackingSubtitle: 'अपने रेफरेंस नंबर से प्रशासनिक प्रक्रिया की स्थिति जानें।',
    enterReferencePrompt: 'रेफरेंस नंबर दर्ज करें (उदा. NS-2026-W3-0101)',
    searchButton: 'खोजें',
    statusTimelineTitle: 'प्रशासनिक कार्यप्रवाह',
    statusDisclaimer:
      'सूचना: कार्यप्रवाह स्थिति प्रशासनिक समीक्षा दर्शाती है, बजट और स्वीकृति स्थलीय तकनीकी जांच पर निर्भर है।',
    statusReceived: 'प्राप्त हुआ (Received)',
    statusUnderReview: 'समीक्षाधीन (Under Review)',
    statusNeedsVerification: 'स्थलीय सत्यापन आवश्यक (Needs Verification)',
    statusPlanned: 'नियोजित (Planned)',
    statusInProgress: 'प्रगति पर (In Progress)',
    statusCompleted: 'पूर्ण (Completed)',
    catWater: 'पेयजल',
    catRoads: 'सड़कें',
    catInternet: 'इंटरनेट कनेक्टिविटी',
  },
  en: {
    brandName: 'NagrikSetu',
    tagline: 'Bridging citizen voice and public priorities.',
    roleCitizen: 'Citizen Services',
    rolePolicymaker: 'Administrative Portal',
    reportNeed: 'Report a Civic Need',
    trackRequest: 'Track My Request',
    exploreHotspots: 'View Ward Priorities',
    heroTitle: 'Direct citizen feedback to transparent public infrastructure priorities',
    heroSubtitle:
      'A civic collaboration platform connecting neighborhood resident feedback on water, roads, and connectivity with municipal engineering records and verified ward planning.',
    privacyPledge:
      'Privacy First: No Aadhaar or identity cards required. Only approximate ward area recorded.',
    anonymousPledge: 'Anonymous submission is supported by default.',
    publicIntegrityNotice:
      'Citizen reports are verified through physical field inspections by ward engineers. Final budgeting and sanctions follow standard administrative governance.',
    howItWorksTitle: 'How NagrikSetu Works',
    step1Title: '1. Citizen Voice',
    step1Desc: 'Residents submit local infrastructure observations in Marathi, Hindi, or English via text or voice.',
    step2Title: '2. Departmental Triage',
    step2Desc: 'Requests are categorized into drinking water, roads, or connectivity with a clear English summary for administrative coordination.',
    step3Title: '3. Municipal Data Corroboration',
    step3Desc: 'Submissions are cross-referenced with baseline ward audits and active municipal capital contracts.',
    step4Title: '4. Objective Priority & Field Verification',
    step4Desc: 'A transparent 5-factor priority score guides ward engineers for targeted site verification and action.',
    formTitle: 'Report a Neighborhood Infrastructure Need',
    formSubtitle: 'Share infrastructure observations in your locality (Water, Roads, or Connectivity).',
    selectLanguage: 'Language of Submission',
    selectCategory: 'Department / Category',
    selectArea: 'Approximate Ward / Area',
    descriptionLabel: 'Description (Type or use Microphone)',
    descriptionPlaceholder: 'e.g. Several homes in this area have unreliable drinking water and low pressure...',
    voiceInputButton: 'Voice Input (Microphone)',
    voiceInputListening: 'Listening... speak clearly...',
    samplePromptButton: 'Fill Demo Prompt (Water Supply)',
    anonymousToggle: 'Submit anonymously (Do not attach personal identity)',
    anonymousHelp: 'No identity proof required. Contact info is strictly optional.',
    contactOptional: 'Optional Contact Info (For status updates only)',
    contactPlaceholder: 'e.g. mobile number or email address',
    submitButton: 'Submit to Ward Office',
    submittingButton: 'Submitting report...',
    successTitle: 'Report Successfully Registered!',
    successMessage:
      'Your observation has been registered into the ward intake queue.',
    yourReferenceId: 'Your Reference Number',
    trackNowButton: 'Track This Request Now',
    submitAnother: 'Submit Another Report',
    trackingTitle: 'Track Civic Request Status',
    trackingSubtitle: 'Check transparent administrative workflow progress in real-time.',
    enterReferencePrompt: 'Enter your Reference Number (e.g. NS-2026-W3-0101)',
    searchButton: 'Track Status',
    statusTimelineTitle: 'Administrative Workflow Progression',
    statusDisclaimer:
      'Note: Workflow stages represent administrative review progress and require physical engineer verification prior to project execution.',
    statusReceived: 'Received',
    statusUnderReview: 'Under Review',
    statusNeedsVerification: 'Field Verification Required',
    statusPlanned: 'Planned',
    statusInProgress: 'In Progress',
    statusCompleted: 'Completed',
    catWater: 'Drinking Water',
    catRoads: 'Roads & Traffic',
    catInternet: 'Internet & Connectivity',
  },
};
