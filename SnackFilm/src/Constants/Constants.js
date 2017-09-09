/**
 * Created by Jic on 19-Jul-17.
 */
export const URL_YQL = 'https://query.yahooapis.com/v1/public/yql?q=';
// not encode special char
export const YQL_RULES = encodeURI('&diagnostics=true&env=store://datatables.org/alltableswithkeys');

// encode special char
export const YQL_QUERY_SELECT = encodeURIComponent('select * from htmlstring where url="http://animetvn.com/tim-kiem/');
export const YQL_QUERY_AND = encodeURIComponent('" and xpath="//div[@class=\'film_item_inner\']"');