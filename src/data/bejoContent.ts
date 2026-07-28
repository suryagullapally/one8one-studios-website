export type LegalSection = {
    title: string;
    items: string[];
};

export const bejoApp = {
    name: "BEJO",
    tagline: "Aaram Se",
    description:
        "Bejo is a file-sharing and print-workflow application that allows users to send, receive, access, preview, download, print, and manage files based on available product features and sender permissions.",
    supportedFeatures:
        "Bejo may support documents, images, videos, audio, text files, Office files, QR-based receiver identification, Bejo IDs, file conversion, transfer permissions, expiry controls, profile settings, and print-related settings.",
    storageNote:
        "Bejo is not a permanent archive, backup service, legal-records system, or guaranteed long-term storage service unless we expressly agree otherwise in writing.",
    platforms: ["iOS", "Android", "Web"],
    downloadUrl: "https://bejo.one8onestudios.com",
    screenshots: [
        "Dashboard",
        "Share With Control",
        "Scan QR",
        "Smarter Printing",
        "Everything Arrives Clearly",
        "Access Control",
        "Know The Price",
        "Business Sharing",
        "Secure Storage",
    ],
};

export const companyInfo = [
    "Onaytone Software Studios Private Limited\nCIN: U62011TS2026PTC217215\n1-31-821, Krishna Nagar, Old Bowenpally, Trimulgherry, Rangareddy, Hyderabad - 500015, Telangana, India",
    "Support: support.bejo@one8onestudios.com\nPrivacy and grievance contact: privacy.bejo@one8onestudios.com\nWebsite: https://bejo.one8onestudios.com\nPrivacy Policy: https://bejo.one8onestudios.com/privacy-policy\nTerms: https://bejo.one8onestudios.com/terms-and-conditions",
];

export const privacySections: LegalSection[] = [
    {
        title: "Data Controller",
        items: companyInfo,
    },
    {
        title: "Information We Collect",
        items: [
            "Account data: name, email address, username, Bejo ID, Firebase Authentication UID, accepted policy versions, onboarding status, and profile photo URL if added.",
            "Service data: uploaded files, file names, file sizes, transfer metadata, sender and receiver identifiers, permissions, expiry settings, receiver notes, view counts, print settings, and conversion outputs.",
            "Operational data: signup OTP records, hashed OTP values, attempt counts, push notification tokens, support messages, abuse reports, device permissions, and infrastructure logs.",
            "Business settings: account type, usage type, public receiver profile fields, print-pricing settings, currency, and related configuration where enabled.",
            "Categories of Information We Collect: Within the past 12 months, we have collected the following categories of personal information to provide our services: Identifiers (name, email address, guest phone number where used for guest sends, Bejo ID, Firebase UID), Commercial/Service data (file names, sizes, transfer metadata, print settings), and Internet/Network activity logs (infrastructure logs, OTP records).",
        ],
    },
    {
        title: "How We Use Information",
        items: [
            "We use information to create and secure accounts, authenticate users, deliver files, enable preview, conversion, printing, downloading, expiry, notifications, support, and abuse prevention.",
            "Contract performance: We process account data, Firebase Authentication identifiers, file metadata, transfer permissions, receiver information, and file transmissions to create accounts and deliver the file-sharing service.",
            "Legitimate interests: We process infrastructure logs, OTP request and attempt records, support messages, abuse reports, security events, and diagnostic data for security, fraud prevention, abuse prevention, troubleshooting, and system optimization.",
            "Consent: We rely on consent for device permissions such as camera access for QR scanning, notification permission, and local file or media access. You can withdraw these permissions at any time through your device, browser, or operating-system settings.",
            "Legal obligations: We may process and retain limited information where required to comply with law, court orders, regulator requests, dispute handling, or enforceable legal duties.",
            "We do not sell personal information, do not share it for cross-context behavioral advertising, and do not use targeted advertising.",
            "We do not use uploaded files, personal information, or user content to train artificial intelligence or machine learning models.",
            "We do not make legal or similarly significant decisions solely through automated processing.",
        ],
    },
    {
        title: "Reports and Blocking",
        items: [
            "When a receiver uses in-app Report or Block Sender controls, Bejo may process the transfer ID, selected file metadata, reporter UID, sender account identifier, report reason, report details, timestamps, and a compact transfer snapshot.",
            "Abuse reports are used for safety review, support, enforcement, legal compliance, and abuse prevention. Report records are restricted from direct client access and reviewed by the Bejo team.",
            "For abuse, safety, copyright, privacy, or harmful-content concerns, email support.bejo@one8onestudios.com.",
        ],
    },
    {
        title: "Service Providers",
        items: [
            "Bejo may use Firebase Authentication for email/password authentication, Cloud Firestore, Firebase Cloud Functions, Firebase Cloud Messaging, Google Cloud Run, Google Cloud infrastructure, Cloudflare R2 object storage for active transfer files, Firebase Storage for profile photos and legacy transfer objects, and Brevo or SMTP email infrastructure.",
            "Device, browser, and operating-system services may be used for file selection, camera access, media saving, media playback, printing, sharing, and notifications when you use those features.",
        ],
    },
    {
        title: "International Transfers",
        items: [
            "Bejo is operated from India and may process information using providers that operate in India, the United States, the European Economic Area, and other regions.",
            "Where required, Bejo relies on lawful safeguards such as data processing agreements, standard contractual clauses, provider security commitments, or other approved transfer mechanisms.",
        ],
    },
    {
        title: "Retention",
        items: [
            "Active transfer files are stored in Cloudflare R2 until the configured transfer expiry and are normally removed within about 5 minutes after expiry, although technical delays may occur. Profile photos and legacy transfer objects may be stored in Firebase Storage and are removed when no longer needed or when the relevant account is deleted.",
            "Transfer metadata is retained for 12 months from transfer creation where required for legal, security, audit, abuse prevention, support, and compliance purposes, then deleted.",
            "Signup OTP codes expire after 10 minutes. OTP verification records may be retained for up to 30 days.",
            "Push notification tokens may be retained until replaced, disabled, account deletion is completed, or up to 90 days after they are determined inactive.",
            "Conversion inputs are processed in temporary server workspaces and removed after the request completes.",
            "Support, privacy, and grievance communications may be retained for up to 2 years. Infrastructure logs and backups may remain for up to 90 days.",
        ],
    },
    {
        title: "Your Rights",
        items: [
            "Depending on your location, you may request access, correction, deletion, export, restriction, objection, consent withdrawal, complaint handling, and nomination where Indian law applies.",
            "California residents may request to know, access, delete, correct, and receive information about disclosures. Bejo will not discriminate against users for exercising CCPA rights.",
            "We may need to verify your identity before completing a privacy request.",
            "India DPDP Compliance: Onaytone Software Studios Private Limited acts as the Data Fiduciary. You can exercise your rights, including the right to access, correction, erasure, and the right to nominate a representative, by contacting our designated Grievance Officer at privacy.bejo@one8onestudios.com.",
            "Account Deletion: You can permanently delete your account directly through the app via Settings > Account > Delete Account, or by emailing our privacy team. Upon deletion, your account profile, profile picture, push tokens, public receiver records, active uploaded files, and app-visible transfer records are removed from live services. Transfer metadata required by Indian law is retained for 12 months from transfer creation in backend-only compliance records, then deleted.",
        ],
    },
    {
        title: "Children and Security",
        items: [
            "Bejo is not intended for users under 18 years of age unless a legally compliant parental or guardian-consent process is provided.",
            "Bejo uses reasonable technical and organizational safeguards, including Firebase, Google Cloud, and Cloudflare security controls, HTTPS/TLS, authentication, storage access controls, and operational monitoring.",
            "No digital service can be guaranteed completely secure, so users should avoid sending highly sensitive files unless they understand and accept the risks.",
        ],
    },
];

export const termsSections: LegalSection[] = [
    {
        title: "Company Information",
        items: companyInfo,
    },
    {
        title: "About Bejo",
        items: [bejoApp.description, bejoApp.supportedFeatures, bejoApp.storageNote],
    },
    {
        title: "Eligibility and Accounts",
        items: [
            "You may use Bejo only if you can form a legally binding agreement and are permitted to use the service under applicable law.",
            "Bejo is not intended for users under 18 years of age unless a legally compliant parental or guardian-consent process is provided.",
            "You must provide accurate account information, protect your credentials and verification-code access, keep your information current, and promptly notify Bejo if you suspect unauthorized access.",
        ],
    },
    {
        title: "User Responsibilities",
        items: [
            "You are responsible for your use of Bejo and for the files, notes, instructions, profile information, print settings, and other content you upload, send, receive, preview, download, print, or otherwise handle.",
            "You must upload and share only files you have the right to use and share, verify receiver details before sending files, set permissions carefully, keep backup copies, and respect the rights and privacy of others.",
            "You must obtain required consents before uploading or sharing another person's personal information or confidential content.",
        ],
    },
    {
        title: "Content and License",
        items: [
            "You retain ownership of files and content you upload to Bejo.",
            "You grant Bejo a limited, non-exclusive, worldwide, royalty-free license to host, store, transmit, process, display, preview, convert, print-enable, deliver, expire, delete, troubleshoot, secure, and support your content solely to operate Bejo, enforce these Terms, comply with law, prevent abuse, and maintain the service.",
            "You must not upload illegal, abusive, exploitative, infringing, deceptive, malicious, privacy-invasive, confidential without authorization, or harmful content.",
        ],
    },
    {
        title: "Permissions and Limits",
        items: [
            "Bejo may allow senders to configure permissions such as download access, print access, expiry timing, transfer pause status, burn-after-reading behavior, or one-time-view behavior.",
            "These controls help reduce misuse but cannot guarantee that content will not be copied, screenshotted, photographed, recorded, printed, redistributed, or otherwise captured after access is granted.",
            "Do not send highly sensitive files unless you understand and accept these limits.",
        ],
    },
    {
        title: "QR Codes and Receivers",
        items: [
            "Bejo may use Bejo IDs, QR codes, and receiver lookup features to identify intended recipients.",
            "You are responsible for confirming that you are sending files to the correct recipient. Bejo is not responsible for files sent to the wrong recipient because of user error, incorrect Bejo ID entry, incorrect QR scanning, mistaken identity, or unauthorized sharing of receiver identifiers.",
        ],
    },
    {
        title: "Printing and Downloading",
        items: [
            "Printing and downloading may depend on sender permissions, product behavior, device capabilities, browser behavior, operating-system support, local print setup, and external applications or services opened from Bejo.",
            "Bejo may display print instructions, page counts, copy counts, color or black-and-white settings, paper settings, pricing estimates, or related metadata where supported. Estimates are informational only unless a separate written agreement says otherwise.",
            "Bejo is not responsible for printer errors, print quality, paper usage, printer configuration, print-shop handling, third-party app behavior, or outcomes outside Bejo's direct control.",
        ],
    },
    {
        title: "Expiry, History, and Deletion",
        items: [
            "Files may expire or become unavailable based on sender settings, system rules, service operation, or enforcement action.",
            "Expired transfer files are normally removed from Cloudflare R2 by a scheduled backend cleanup process shortly after expiry. Profile photos and legacy transfer objects may be stored in Firebase Storage. Deletion may be delayed for technical, security, legal, or provider reasons.",
            "Transfer history may remain after files are deleted. Clearing inbox or sent history may hide records from your view, but it does not necessarily delete all backend records immediately.",
            "You should keep independent backups of important files.",
        ],
    },
    {
        title: "Prohibited Conduct",
        items: [
            "You must not use Bejo for illegal, harmful, abusive, fraudulent, infringing, or unauthorized purposes.",
            "You must not upload malware, phishing material, spam, stolen credentials, pirated software, harmful payloads, or content that encourages illegal activity or serious harm.",
            "You must not harass, threaten, exploit, impersonate, stalk, abuse others, violate rights, bypass security, scrape, reverse engineer, overload, tamper with, or disrupt Bejo or its infrastructure.",
            "Bejo may investigate suspected misuse and may remove content, restrict features, suspend accounts, terminate access, preserve records, or report conduct to authorities where appropriate.",
        ],
    },
    {
        title: "Reporting Abuse",
        items: [
            "Receivers can report offensive, illegal, harmful, infringing, privacy-invasive, spam, scam, or abusive transfers from the in-app Report controls on received transfers and file previews.",
            "Receivers can block abusive senders from received transfers. Blocking hides existing inbox items from that sender and prevents future transfers from that sender account to the receiver.",
            "For abuse, safety, copyright, privacy, or harmful-content concerns, email support.bejo@one8onestudios.com.",
        ],
    },
    {
        title: "Privacy and Providers",
        items: [
            "Bejo's collection and use of personal information are described in the Privacy Policy at https://bejo.one8onestudios.com/privacy-policy.",
            "Bejo may rely on Firebase Authentication for email/password authentication, Cloud Firestore, Firebase Cloud Functions, Firebase Cloud Messaging, Google Cloud Run, Google Cloud infrastructure, Cloudflare R2 object storage for active transfer files, Firebase Storage for profile photos and legacy transfer objects, Brevo or SMTP email infrastructure, file pickers, camera or QR scanning, media services, local printing, local sharing, and device or browser services.",
            "Third-party services may have their own terms, policies, outages, technical limits, and security practices.",
        ],
    },
    {
        title: "Availability and Security",
        items: [
            "Bejo is provided on an as-is and as-available basis. Availability may be affected by maintenance, internet connectivity, provider outages, device issues, browser issues, printing systems, abuse prevention, or technical problems.",
            "No digital service can be guaranteed completely secure, uninterrupted, error-free, or immune from unauthorized access, copying, disclosure, or data loss.",
        ],
    },
    {
        title: "Disclaimers and Liability",
        items: [
            "To the maximum extent permitted by law, Bejo disclaims warranties of merchantability, fitness for a particular purpose, non-infringement, uninterrupted operation, error-free operation, permanent storage, legal compliance for your specific use case, and prevention of all unauthorized copying or disclosure.",
            "To the maximum extent permitted by law, Bejo's total liability arising from or relating to the service will not exceed INR 25,000 or the amount you paid to Bejo for the service during the 12 months before the event giving rise to the claim, whichever is greater.",
        ],
    },
    {
        title: "Termination and Changes",
        items: [
            "You may terminate your account at any time via the account deletion feature within the app settings.",
            "Bejo may suspend, restrict, or terminate access if we reasonably believe that you violated these Terms, created security or abuse risks, infringed rights, caused harm, failed eligibility requirements, or used the service unlawfully.",
            "Bejo may update these Terms from time to time. Continued use after updated Terms take effect means you accept the updated Terms.",
        ],
    },
    {
        title: "Governing Law",
        items: [
            "These Terms are governed by the laws of India. Subject to applicable consumer-protection and data-protection laws, courts located in Hyderabad, Telangana, India will have exclusive jurisdiction.",
        ],
    },
];
