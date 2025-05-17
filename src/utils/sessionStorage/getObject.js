export const getSessionStorageResponse = (...keys) => {
        const result = {};
        try {
            keys.forEach(key => {
            const data = sessionStorage.getItem(key);
            result[key] = data ? JSON.parse(data) : {}; 
            });
        } catch (error) {
            console.error('❌ Error saat ambil data dari localStorage:', error);
        }
        return result;
};