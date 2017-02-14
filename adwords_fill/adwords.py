import json
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import adwords_fill.parser as pars

__all__ = ['login', 'create_group']
driver = webdriver.Chrome('chromedriver')


def sign_in(login, password):
    driver.get(
        "https://adwords.google.com/cm/CampaignMgmt?authuser=5&__u=9864095156&__c=9116612578#c.739288241.ag&app=cm")
    login_to_google_adwords(login, password)


def login_to_google_adwords(login, password):
    driver.find_element_by_id('Email').send_keys(login)
    driver.find_element_by_id('next').click()
    WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.ID, 'Passwd'))).send_keys(password)
    driver.find_element_by_id('signIn').click()


def wait_for_element_and_click_by_xpath(xpath, time=100):
    WebDriverWait(driver, time).until(
        EC.visibility_of_element_located((By.XPATH, xpath)))
    WebDriverWait(driver, time).until(
        EC.presence_of_element_located((By.XPATH, xpath))).click()


def wait_for_element_and_click_by_css(css, time=100):
    WebDriverWait(driver, time).until(
        EC.visibility_of_element_located((By.CSS_SELECTOR, css)))
    element = WebDriverWait(driver, time).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, css)))
    element.click()
    return element


def clear_input(element, text):
    element.clear()
    element.send_keys(text)
    element.click()


def create_first_advert(row):
    WebDriverWait(driver, 100).until(EC.invisibility_of_element_located((By.CSS_SELECTOR, 'div#loadingStatus')))
    name = WebDriverWait(driver, 100).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, 'div.aw-add-name input')))
    clear_input(name, pars.get_title(row))
    fill_advert_main_data(0, row)
    clear_input(driver.find_element_by_xpath('//*[@class="csd-a"]/../div[2]/textarea'), pars.get_keys(row))
    prices = driver.find_elements_by_css_selector('input.aw-bid-input-box.aw-text')
    clear_input(prices[0], '1')
    driver.find_elements_by_css_selector('div.g-section.aw-save-bar span')[0].click()


def fill_advert_main_data(count, row):
    info = driver.find_elements_by_css_selector('input.aw-text.cNb-h.ce-d')
    path = driver.find_elements_by_css_selector('input.aw-text.cNb-l.ce-d')
    description = driver.find_elements_by_css_selector('textarea.aw-text.cNb-h.cNb-g.ce-d')
    clear_input(info[0], pars.get_href(count, row))
    clear_input(info[1], pars.get_header1(count, row))
    clear_input(info[2], pars.get_header2(count, row))
    path1, path2 = pars.get_path(count, row)
    clear_input(path[0], path1)
    clear_input(path[1], path2)
    clear_input(description[0], pars.get_desc(count, row))


def create_other_advert(count, row):
    try:
        wait_for_element_and_click_by_css('div#adgroup-creatives-tab span:nth-child(1)')
    except:
        print('Already here')
    wait_for_element_and_click_by_css('div.aw-toolbar div.aw-add-button')
    wait_for_element_and_click_by_css('div.gux-combo.gux-dropdown-c > div:nth-child(1)')
    wait_for_element_and_click_by_css('input.aw-text.cNb-h.ce-d')
    fill_advert_main_data(count, row)
    driver.find_elements_by_css_selector('div.aw-save-button')[2].click()


def fill_prices(row):
    WebDriverWait(driver, 100).until(EC.invisibility_of_element_located((By.CSS_SELECTOR, 'div#loadingStatus')))
    WebDriverWait(driver, 100).until(EC.element_to_be_clickable((
        By.CSS_SELECTOR, 'div#adgroup-adextensions-tab div.aw-content-tab-item-c.aw-content-tab-item-part')))
    driver.execute_script(
        'document.querySelector("div#adgroup-adextensions-tab '
        'div.aw-content-tab-item-c.aw-content-tab-item-part").click()')
    wait_for_element_and_click_by_xpath(
        '//*[@id="adgroup-adgroup-flexextensions-tableview"]/div[7]/div/div/div[1]/div[1]/div/div/div/div[2]/span'
    )

    wait_for_element_and_click_by_xpath(
        '//*[@id="adgroup-adgroup-flexextensions-tableview"]/div[3]/div[4]/div/div/div/div/div[2]/div[1]/div/div/div['
        '1]/div/div/div[3]/div/div/div/div/div[2]/span'
    )

    wait_for_element_and_click_by_css('div.aw-modal-popup-content div.cik-f div.cSd-d')
    wait_for_element_and_click_by_css('div.cSd-h div.cSd-e:nth-child(1)')

    settings = driver.find_elements_by_css_selector('div.aw-modal-popup-content div.cN-v')

    settings[0].find_element_by_css_selector('div.cSd-d').click()
    wait_for_element_and_click_by_css('div.cSd-h div.cSd-e:nth-child(8)')

    settings[1].find_element_by_css_selector('div.cSd-d').click()
    wait_for_element_and_click_by_css('div.cSd-h div.cSd-e:nth-child(9)')

    settings[2].find_element_by_css_selector('div.cSd-d').click()
    wait_for_element_and_click_by_css('div.cSd-h div.cSd-e:nth-child(2)')

    rows = driver.find_elements_by_css_selector('div.popupMiddleCenterInner.popupContent div.cuk-c')
    jdata = json.loads(row['offers'])
    count = 0
    for d in jdata:
        name = d['offer_name'].strip().title()
        desc = pars.get_cost_desc()
        if (name == 'Diagnostic') and (len(row['disease_name']) <= 25):
            desc = 'Diagnostic'
            name = row['disease_name']
        if name.find('Surgical Treatment') >= 0:
            name = 'Surgical Treatment'
        if name.find('Diagnosis And ') >= 0:
            name.replace('Diagnosis And ', '')
            desc = 'Diagnosis Included'
        if name.find('Conservative Treatment') >= 0:
            name = 'Conservative Treatment'
            desc = 'Diagnosis Included'
        fill_price_row(rows[count + 1], name, desc, row['href'], d['offer_price'])
        count += 1
        if count > 5:
            break
    if count < 3:
        for i in range(count, 3):
            fill_price_row(rows[count + 1], 'General Rehabilitation', 'Choose Your Clinic', row['href'], '501')

    buttons = driver.find_elements_by_css_selector('div.aw-modal-popup-footer div.goog-button-base-content')
    buttons[0].click()


def fill_price_row(row, name, desc, href, value):
    columns = row.find_elements_by_css_selector('div.cuk-b')
    columns[0].find_element_by_css_selector('input').send_keys(name)
    columns[1].find_element_by_css_selector('input').send_keys(desc)
    row.find_elements_by_css_selector('.cuk-d')[0].find_element_by_css_selector('input').send_keys(href)
    row.find_element_by_css_selector('.cuk-i input').send_keys(value)


def create_group(row):
    wait_for_element_and_click_by_xpath('//*[@id="campaign-adgroups-tab"]/div[3]/span[1]')
    wait_for_element_and_click_by_css('div.aw-inline-block')
    create_first_advert(row)
    create_other_advert(1, row)
    create_other_advert(2, row)
    fill_prices(row)
    driver.execute_script('document.querySelectorAll("div.aw-breadcrumbs a")[1].click()')
    WebDriverWait(driver, 100).until(EC.invisibility_of_element_located((By.CSS_SELECTOR, 'div#loadingStatus')))
