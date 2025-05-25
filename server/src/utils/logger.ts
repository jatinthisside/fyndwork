export const logger = {
    info: (...params: any[]) => console.log('[INFO]', ...params),
    error: (...params: any[]) => console.error('[ERROR]', ...params),
};