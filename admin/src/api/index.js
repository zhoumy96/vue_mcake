/**
 * api接口的统一出口
 */
import goods from './goods';
import user from './user';
import news from './news';
import admin from './admin';

// 导出接口
export default {
  goods,
  user,
  news,
  admin
}
