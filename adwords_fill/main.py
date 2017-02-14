import pandas as pd
import adwords_fill.adwords as adw
import logging

logging.basicConfig(filename='test.log', level=logging.DEBUG, filemode='w')
data_file_name = 'test.csv'
data = pd.read_csv(data_file_name)
logging.info('read file' + data_file_name)
adw.sign_in('daria.shul@bookinghealth.com', 'moilolita1997')

for index, row in data.iterrows():
    if (index < 2):
        try:
            adw.create_group(row)
        except:
            logging.error(row['disease_name'] + ' need to fix')
            adw.reload()

logging.info('final log')
