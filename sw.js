const CACHE_NAME = 'sohag-edu-v-clean';

self.addEventListener('install', (e) => {
    // إجبار المتصفح على استخدام النسخة الجديدة فوراً
    self.skipWaiting();
});

self.addEventListener('activate', (e) => {
    // مسح وتدمير كل الذواكر القديمة اللي مسببة المشاكل
    e.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    return caches.delete(cache);
                })
            );
        })
    );
    e.waitUntil(clients.claim());
});

self.addEventListener('fetch', (e) => {
    // إجبار المتصفح على جلب الأكواد من السيرفر (الإنترنت) دائماً
    e.respondWith(fetch(e.request));
});