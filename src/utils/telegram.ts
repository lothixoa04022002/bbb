import axios from 'axios';

interface TelegramResponse {
    result: {
        message_id: number;
    };
}

const sendTelegramMessage = async (
    message: string,
    messageId?: number
): Promise<TelegramResponse> => {
    try {
        const botToken = import.meta.env.PUBLIC_TELEGRAM_BOT_TOKEN;
        const chatId = import.meta.env.PUBLIC_TELEGRAM_CHAT_ID;
        const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
        const payload = {
            chat_id: chatId,
            text: message,
            parse_mode: 'HTML',
            ...(messageId && { reply_to_message_id: messageId })
        };

        const response = await axios.post(url, payload);

        return response.data;
    } catch (err) {
        console.error('lỗi gửi telegram:', err);
        throw err;
    }
};

export default sendTelegramMessage;
