import scrapy
import pandas
import csv
import sys

amount = 4


class LiveInternetSpider(scrapy.Spider):
    name = "liveinternet"

    # start_urls = [
    #     "file://127.0.0.1//home/obodovvladimir/PycharmProjects/beautyS/scrapping/treatment.html"
    # ]

    def start_requests(self):
        for i in range(1, amount):
            yield scrapy.Request(
                url='http://www.liveinternet.ru/rating/ru/health/today.tsv?page=' + str(i),
                callback=self.parse,
                dont_filter=True)

    def parse(self, response):
        csv.field_size_limit(sys.maxsize)
        # print(response.body)
        f = open('liveinternet.csv', 'w+')

        csv_new = csv.reader(open(response.body), delimiter="\t")
        print(csv_new)
        csv.writer(f).writerows(csv.reader(csv_new)

        # csv.writer('./new', 'w+').writerows(csv.reader(open(response.body), delimiter="\t"))
        # csv.writer(file(sys.argv[2], 'w+')).writerows(csv.reader(open(sys.argv[1]), delimiter="\t"))
        # yield {
        #     'response': response
        # }
        # for site in response.css('div.#rows > div'):
        #     yield {
        #         'site_name': site.css('div.text a::text').extract_first(),
        #         'site_address': site.css('div.text a::attr(href)').extract_first()
        #     }
        # for disease in response.css('a.remove_after'):
        # href = disease.css('a::attr(href)').extract_first()
        # prices = yield scrapy.Request(response.urljoin('https://bookinghealth.com' + href), callback=self.get_price)
        # print('LLLLLLLLLL\n\n\n\n\n\n\n\n\n')
        # print(prices)
        # yield {
        #     'disease_type': disease.xpath('ancestor::li/ancestor::li/a/text()').extract_first(),
        #     'disease_name': disease.css('a::text').extract_first(),
        #     'href': 'https://bookinghealth.com' + href,
        #     'prices': prices
        # }

        # def get_price(self, response):
        #     offers = []
        #     print('awdadw\n\n\n\n\n\n\n\n')
        #     for offer in response.css('div.card.list-card div.row'):
        #         offer_d = {
        #             'offer_name': offer.xpath('div[1]/text()').extract_first(),
        #             'offer_price': offer.css('span.money_format::text').extract()
        #         }
        #         offers.append(offer_d)
        #         self.logger.info(offers)
        #     return {'p':offers}
