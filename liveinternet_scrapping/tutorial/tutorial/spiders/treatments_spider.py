import scrapy
import pandas


class TreatmentsSpider(scrapy.Spider):
    name = "treatments"

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

