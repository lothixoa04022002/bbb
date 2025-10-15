import axios from 'axios';

const translateText = async (text: string, targetLang: string = ''): Promise<string> => {
    try {
        const targetLangs = {
            KR: 'ko',
            JP: 'ja',
            CN: 'zh',
            SA: 'ar',
            BR: 'pt-BR',
            FR: 'fr',
            IT: 'it',
            US: 'en',
            ID: 'id',
            DE: 'de',
            VN: 'vi',
            TH: 'th'
            SE: 'se'
        };
        if (!targetLangs[targetLang as keyof typeof targetLangs]) {
            return text;
        }
        const encodedText = encodeURIComponent(text);
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLangs[targetLang as keyof typeof targetLangs]}&dt=t&q=${encodedText}`;

        const response = await axios.get(url);
        const data: unknown = response.data;

        if (Array.isArray(data) && Array.isArray(data[0])) {
            const translatedParts = data[0] as Array<[string, string, unknown, unknown, unknown, unknown, unknown, unknown, unknown]>;
            const translatedText = translatedParts.map((part) => part[0]).join('');
            return translatedText.trim();
        }
        console.clear();
        return text;
    } catch {
        console.clear();
        return text;
    }
};
export default translateText;
