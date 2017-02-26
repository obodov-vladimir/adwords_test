import pandas as pd

data = pd.read_csv('treatments_ru.csv')
for index, row in data.iterrows():
    if row['keyword'].find('(') > -1:
        key = row['keyword']
        keyword1 = key[:key.find('(')] + key[key.find(')') + 1:]
        keyword2 = key[key.find('(') + 1: key.find(')')]
        data = data.append({'href': row['href'],
                            'Campaign': row['Campaign'],
                            'Adgroup': row['Adgroup'],
                            'keyword': keyword1}, ignore_index=True
                           )
        data = data.append({'href': row['href'],
                            'Campaign': row['Campaign'],
                            'Adgroup': row['Adgroup'],
                            'keyword': keyword2}, ignore_index=True
                           )
        data = data[data.keyword != key]
data.to_csv('out.csv')
