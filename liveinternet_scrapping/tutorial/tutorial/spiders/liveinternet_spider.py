import scrapy

amount = 10
f = open('li.csv', mode='wb')


class LiveInternetSpider(scrapy.Spider):
    name = "liveinternet"

    def start_requests(self):
        for i in range(1, amount + 1):
            yield scrapy.Request(
                url='http://www.liveinternet.ru/rating/ru/#geo=ru;group=health;page=' + str(i),
                callback=self.parse)

    def parse(self, response):
        f.write(response.body)
        yield {
            'resp': response.body
        }
