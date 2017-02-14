import scrapy
import pandas


class TreatmentsSpider(scrapy.Spider):
    name = "treatments"

    # start_urls = [
    #     "file://127.0.0.1//home/obodovvladimir/PycharmProjects/beautyS/scrapping/treatment.html"
    # ]

    def start_requests(self):
        urls = pandas.read_csv('treatments_new_data.csv').href.tolist()
        print(urls)
        for url in urls:
            yield scrapy.Request(url='https://bookinghealth.com' + url, callback=self.parse, dont_filter=True)

    def parse(self, response):
        offers = []
        for offer in response.css('div.card.list-card div.row'):
            offer_d = {
                'offer_name': offer.xpath('div[1]/text()').extract_first(),
                'offer_price': offer.css('span.money_format::text').extract()
            }
            offers.append(offer_d)
        yield {'offers': offers}
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
