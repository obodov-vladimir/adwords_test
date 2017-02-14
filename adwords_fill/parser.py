import random
import logging


def get_plused(str):
    return str.replace(' ', ' +')


def get_keys(row):
    keys = []
    name = row['disease_name']
    name = get_plused(name)
    keys.append('+' + name + ' +treatment')
    keys.append('+treatment +for +' + name)
    keys.append('+treatment +of +' + name)
    keys.append('+' + name + ' +surgery')
    keys.append('+' + name + ' +cure')
    keys.append('+medical +treatment of +' + name)
    keys.append('+' + name + ' +treatment +germany')
    text = ''
    for key in keys:
        text = text + key + '\n'
    return text


def get_desc(count, row):
    if count == 0:
        if len(row['disease_name']) <= 10:
            return "Apply for High-Quality " + row['disease_name'] + " Treatment in Germany. Fixed Price & Insurance!"
        elif len(row['disease_name']) <= 20:
            return "Book Quality " + row['disease_name'] + " Treatment in Germany.Fixed Price & Insurance!"
        elif len(row['disease_name']) <= 33:
            return row['disease_name'] + " Treatment in Germany.Fixed Price & Insurance!"
        else:
            logging.error("error description in " + row["disease_type"] + '_' + row["disease_name"] + '\n')
            return 'ERROR'
    elif count == 1:
        return 'Select by Price and Book Treatment Today. Save up to 70% with Booking Health™'
    else:
        return 'Book Hospitals in Germany with the Highest Accreditation. No Additional Costs!'


def get_title(row):
    return 'test_' + row['disease_type'] + '_' + row['disease_name']


def get_href(count, row):
    return row['href']


def get_header1(count, row):
    if count == 0:
        if len(row['disease_name']) < 30:
            return row['disease_name'] + '?'
        else:
            logging.error("error header1 in " + row["disease_type"] + '_' + row["disease_name"] + '\n')
            return 'ERROR'
    else:
        if len(row['disease_name']) <= 20:
            return row['disease_name'] + ' Treatment'
        elif len(row['disease_name']) <= 30:
            return row['disease_name']
        else:
            logging.error("error header1 in " + row["disease_type"] + '_' + row["disease_name"] + '\n')
            return 'ERROR'


def get_header2(count, row):
    if count == 0:
        return "Book Best Treatment in Germany"
    if count == 1:
        return "Book Hospitals in Germany"
    if count == 2:
        return "All-Inclusive Medical Programs"


def get_path(count, row):
    if len(row['disease_name']) <= 15:
        path1 = row['disease_name']
        path2 = 'Treatment'
    else:
        path1, path2 = split_on_two(15, row['disease_name'])
        if path1 == '':
            path1 = row['disease_type'].title()
            path2 = "Treatment"
            logging.warning("check path in " + row["disease_type"] + '_' + row["disease_name"] + '\n')
    return path1, path2


def split_on_two(n, str):
    word1 = ''
    word2 = ''
    a = ''
    while str.count(' ') > 1:
        b, c, str = str.partition(' ')
        if (len(a + b) <= n) and (len(str) <= n):
            word1 = a + b
            word2 = str
            break
        a = a + b + c
    return word1, word2


def get_cost_desc():
    return random.choice(
        ['Look&Book', 'Choose Your Clinic', 'In Germany', 'German Healthcare', 'Top Specialists', 'Top Doctors',
         'High Level Clinics'])
