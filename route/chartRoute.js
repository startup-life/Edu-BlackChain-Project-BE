const express = require('express');
const chartController = require('../controller/chartController');

const router = express.Router();

// 실시간 틱 체결 데이터
router.get('/upbit/trades', chartController.getLiveTicks);

// 분봉 캔들 (unit은 path param)
router.get('/upbit/candles/minutes/:unit', chartController.getMinuteCandles);

// 일봉 캔들
router.get('/upbit/candles/days', chartController.getDailyCandles);

// 주봉 캔들
router.get('/upbit/candles/weeks', chartController.getWeeklyCandles);

module.exports = router;
