import pandas as pd
import adwords_fill.adwords as adw

data = pd.read_csv('test.csv')

adw.sign_in('daria.shul@bookinghealth.com', 'moilolita1997')
for index, row in data.iterrows():
    adw.create_group(row)
