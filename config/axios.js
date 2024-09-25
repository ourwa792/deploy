const axios = require('axios');
const axiosRetry = require('axios-retry');

// إعداد axios مع مهلة زمنية 60 ثانية
const axiosInstance = axios.create({
    timeout: 60000, // 60 ثانية
});

// إعداد إعادة المحاولة تلقائيًا عند فشل الاتصال
axiosRetry(axiosInstance, {
    retries: 3, // إعادة المحاولة 3 مرات
    retryDelay: (retryCount) => {
        return retryCount * 1000; // التأخير بين كل محاولة (1 ثانية، 2 ثانية، 3 ثانية)
    },
    retryCondition: (error) => {
        return axiosRetry.isNetworkOrIdempotentRequestError(error);
    },
});

module.exports = axiosInstance;
