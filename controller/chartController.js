const axios = require('axios');
const { STATUS_CODE, STATUS_MESSAGE } = require('../util/constant/httpStatusCode');

// 실시간 틱 체결 데이터
exports.getLiveTicks = async (req, res) => {
    const { market, count } = req.query;
    if (!market || !count) {
        return res.status(400).json({ error: 'market, count는 필수입니다.' });
    }

    try {
        const response = await axios.get('https://api.upbit.com/v1/trades/ticks', {
            params: { market, count },
        });
        res.status(STATUS_CODE.OK).json(response.data);
    } catch (err) {
        console.error('getLiveTicks 오류:', err.message);
        res.status(500).json({ error: '틱 데이터 조회 실패' });
    }
};

// 분봉 캔들 데이터
exports.getMinuteCandles = async (req, res) => {
    const { market, count } = req.query;
    const { unit } = req.params;
    if (!market || !count || !unit) {
        return res.status(400).json({ error: 'market, count, unit은 필수입니다.' });
    }

    try {
        const url = `https://api.upbit.com/v1/candles/minutes/${unit}`;
        const response = await axios.get(url, { params: { market, count } });
        res.status(200).json(response.data);
    } catch (err) {
        console.error('getMinuteCandles 오류:', err.message);
        res.status(500).json({ error: '분봉 데이터 조회 실패' });
    }
};

// 일봉 데이터
exports.getDailyCandles = async (req, res) => {
    const { market, count } = req.query;
    if (!market || !count) {
        return res.status(400).json({ error: 'market, count는 필수입니다.' });
    }

    try {
        const url = 'https://api.upbit.com/v1/candles/days';
        const response = await axios.get(url, { params: { market, count } });
        res.status(200).json(response.data);
    } catch (err) {
        console.error('getDailyCandles 오류:', err.message);
        res.status(500).json({ error: '일봉 데이터 조회 실패' });
    }
};

// 주봉 데이터
exports.getWeeklyCandles = async (req, res) => {
    const { market, count } = req.query;
    if (!market || !count) {
        return res.status(400).json({ error: 'market, count는 필수입니다.' });
    }

    try {
        const url = 'https://api.upbit.com/v1/candles/weeks';
        const response = await axios.get(url, { params: { market, count } });
        res.status(200).json(response.data);
    } catch (err) {
        console.error('getWeeklyCandles 오류:', err.message);
        res.status(500).json({ error: '주봉 데이터 조회 실패' });
    }
};
