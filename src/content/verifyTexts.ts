export interface TranslatedTexts {
    accountFacebook: string;
    checkNotifications: string;
    goToFacebookAccount: string;
    enterCode: string;
    invalidCode: string;
    continue: string;
    tryAnotherWay: string;
}

export const defaultVerifyTexts: TranslatedTexts = {
    accountFacebook: 'Account • Facebook',
    checkNotifications: 'Check your notifications on another device',
    goToFacebookAccount: 'Go to your Facebook account on another device and open the notification that we sent to approve this login.',
    enterCode: 'Enter code',
    invalidCode: 'Invalid code',
    continue: 'Continue',
    tryAnotherWay: 'Try another way'
};
