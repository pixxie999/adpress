import os
import json
from datetime import datetime

def generate_monthly_report():
    month = datetime.now().strftime("%Y-%m")
    
    # Read income data safely
    data_path = "data/income.json"
    if os.path.exists(data_path):
        with open(data_path, "r", encoding="utf-8") as f:
            data = json.load(f)
            month_data = data.get(month, None)
    else:
        month_data = None
        
    if not month_data:
        print(f"[Dummy] No data found for {month}. Skipping or using dummy data.")
        month_data = {
            "total": 385000,
            "pageviews": 25000
        }

    content = f"""---
title: "{month} 월간 수익 리포트"
description: "{month}의 광고 수익과 트래픽 분석 리포트입니다."
date: "{datetime.now().strftime('%Y-%m-%d')}"
category: "income-reports"
readingTime: 4
seo:
  keywords: ["수익 리포트", "애드센스 수익", "{month}"]
---

# {month} 월간 수익 리포트

이번 달 총 수익은 **{month_data.get('total', 0):,}원** 입니다.
페이지 뷰는 **{month_data.get('pageviews', 0):,}**회를 기록했습니다.

더미 파이프라인이 구동되어 작성된 임시 리포트입니다.
"""
    
    os.makedirs("content/income-reports", exist_ok=True)
    filepath = f"content/income-reports/{month}.mdx"
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)
    
    print(f"Generated {filepath} successfully.")

if __name__ == "__main__":
    generate_monthly_report()
