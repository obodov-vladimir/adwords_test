import scrapy
import pandas


class TreatmentsSpider(scrapy.Spider):
    name = "treatments_ru"

    start_urls = [
        "file://127.0.0.1//home/obodovvladimir/PycharmProjects/beautyS/tutorial/treatment_ru.html"
    ]

    def parse(self, response):
        for disease in response.css('a.remove_after'):
            href = disease.css('a::attr(href)').extract_first()

            yield {
                'disease_type': disease.xpath('ancestor::li/ancestor::li/a/text()').extract_first(),
                'disease_name': disease.css('a::text').extract_first(),
                'href': 'https://bookinghealth.com' + href
            }
