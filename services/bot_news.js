const request = require('request');
const cheerio = require('cheerio');
const connection = require('./db');
const url = 'https://www.infomoney.com.br/ultimas-noticias/'

//Query insert data in database
const query = 'update post_news set link_post = ?, img_post = ?, hat_post = ?, title_post = ?, time_post = ? where id_post = ?';

const request_bot = request(url, function (error, response, body) {
    if (error) console.log('Error:' + error);
    var $ = cheerio.load(body);
    $('div[class="row py-3 item"]').each(function (i, e) {
        let link = $(e).find('span[class="hl-title hl-title-2"] > a').attr('href');
        let img = $(e).find('div[class="col-12 col-lg-4 img-container"] img').attr('src')
        let hat = $(e).find('span[class="hl-hat"]').text();
        let title = $(e).find('span[class="hl-title hl-title-2"] > a').text();
        let time = $(e).find('span[class="posted-diff"]').text();
        const values = [link, img, hat, title, time, i];
        connection.query(query, values, (error, result) => {
            if (error) console.log(`Error Database: ${error}`);
            console.log(result);
        })
    });
});
