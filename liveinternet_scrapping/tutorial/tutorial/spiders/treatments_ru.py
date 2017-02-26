import scrapy
import pandas


class TreatmentsSpider(scrapy.Spider):
    name = "treatments_ru"

    start_urls = [
        "file://127.0.0.1//home/obodovvladimir/PycharmProjects/beautyS/liveinternet_scrapping/tutorial/tutorial/treatment_ru.html"
    ]

    def parse(self, response):
        for disease_type in response.css('ul.dropdown-menu.am-menu > li'):
            for disease in disease_type.css('a.remove_after'):
                href = disease_type.css('::attr(data-submenu-id)').extract_first()
                href = href.replace('ma-top-1-', '')
                yield {

                    'disease_type': disease_type.xpath('a/text()').extract_first(),
                    'href': 'https://bookinghealth.ru/clinics/treatment/' + href + '/germany',
                    'keyword': disease.css('a::text').extract_first()
                }
