const request = require('request');
const cheerio = require('cheerio');
const connection = require('mysql');
const url = 'https://www.infomoney.com.br/ultimas-noticias/'

request(url, function (error, response, body) {
    if (error) console.log('Error:' + error);
    var $ = cheerio.load(body);
    $('div[class="row py-3 item"]').each(function (i, e) {
        let link = $(e).find('span[class="hl-title hl-title-2"] > a').attr('href');
        let img = $(e).find('div[class="col-12 col-lg-4 img-container"] img').attr('src')
        let hat = $(e).find('span[class="hl-hat"]').text();
        let title = $(e).find('span[class="hl-title hl-title-2"] > a').text();
        let time = $(e).find('span[class="posted-diff"]').text();
    });
});