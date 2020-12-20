import sys
import numpy as np
import random
import csv

설명 = ['월급','알바비','생활비','용돈','꽁돈','적금']
카테고리 = ['주수입','부수입','기타수입']
결제수단 = ['네이버','현대카드','국민카드','카카오']

NUM_OF_TRANSACTIONS = 100
RANGE_OF_DAYS = 180 # 약 6개월
DIST = np.random.normal(0.5, 0.1, 100)

def genDate():
    import datetime
    days = random.randint(0, RANGE_OF_DAYS)
    hours = random.randint(0, 24)
    mins = random.randint(0, 60)
    d = datetime.datetime.now() - datetime.timedelta(days=days, hours = hours, minutes = mins)
    return d.strftime("%Y-%m-%d %H:%M:%S")

def genMoney(id, maxMoney = 800.00):
    return round(DIST[id] * maxMoney) * 100

def choiceRandomData(list):
    return random.choice(list)

def createTransactions():
    file = open('Income_Transaction.csv', 'w', encoding='utf-8')
    wr = csv.writer(file, lineterminator='\n')
    wr.writerow(['date','type','cost','description','category', 'paymentMethod','tag'])

    lines = []
    
    for _ in range(NUM_OF_TRANSACTIONS):
        date = genDate()
        type = '수입'
        cost = genMoney(random.randint(0,99))
        description = choiceRandomData(설명)
        category = choiceRandomData(카테고리)
        paymentMethod = choiceRandomData(결제수단)
        tag = 'tag'
        lines.append([date,type,cost,description,category,paymentMethod,tag])
    
    wr.writerows(lines)
    file.close()

createTransactions()