import sys
import json
import numpy as np
import random
import csv

설명 = ['월급','알바비','생활비','용돈','꽁돈','적금']
결제수단 = ['네이버','현대카드','국민카드','카카오']
카테고리 = ['식사','카페/간식','술/유흥','생활/마트','온라인쇼핑','백화점/패션','금융/보험','의료/건강','뷰티/미용','주거/통신','학습/교육','문화/예술','교통/차량','스포츠/레저','여행/숙박','경조사/회비','출금','기타지출']

NUM_OF_TRANSACTIONS = 10
RANGE_OF_DAYS = 180 # 약 6개월
DIST = np.random.normal(0.5, 0.1, 400)
NUM_OF_CATEGORY = len(카테고리)

def genDate():
    import datetime
    days = random.randint(0, RANGE_OF_DAYS)
    hours = random.randint(0, 24)
    mins = random.randint(0, 60)
    d = datetime.datetime.now() - datetime.timedelta(days=days, hours = hours, minutes = mins)
    return d.strftime('%Y-%m-%d %H:%M:%S')

def genMoney(id, maxMoney = 800.00):
    return round(DIST[id] * maxMoney) * 100

def choiceRandomData(list):
    return random.choice(list)

def createTransactions():
    file = open('Expenditure_Transaction.csv', 'w', encoding='utf-8')
    wr = csv.writer(file, lineterminator='\n')
    wr.writerow(['날짜','수입/지출','가격','추가 설명','분류', '결제수단','태그'])

    jsonFile = open('DescriptionExample.json','r',encoding='utf-8')
    jsondata = json.load(jsonFile)

    lines = []
    
    for category in range(NUM_OF_CATEGORY):
        categoryName = 카테고리[category]
        descriptionArray = jsondata[categoryName]

        for _ in range(NUM_OF_TRANSACTIONS):
            date = genDate()
            type = '지출'
            cost = genMoney(random.randint(0,399))
            description = choiceRandomData(descriptionArray)
            category = categoryName
            paymentMethod = choiceRandomData(결제수단)
            tag = 'tag'
            
            lines.append([date,type,cost,description,category,paymentMethod,tag])
    
    wr.writerows(lines)
    file.close()
    jsonFile.close()


createTransactions()