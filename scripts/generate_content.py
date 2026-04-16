"""
generate_content.py — Claude API 기반 콘텐츠 자동 생성기

사용법:
  # 단일 키워드
  python generate_content.py --keyword "애드센스 승인 팁" --category tips

  # keywords.txt 일괄 생성 (전체)
  python generate_content.py --batch keywords.txt

  # 우선순위 필터링 (high만)
  python generate_content.py --batch keywords.txt --priority high

  # 이미 생성된 파일 덮어쓰기
  python generate_content.py --batch keywords.txt --overwrite
"""

import os
import re
import argparse
from datetime import datetime
import anthropic

CONTENT_GENERATION_PROMPT = """\
당신은 광고 수익화 전문가입니다. AdPress(애드프레스) 블로그를 위한 SEO 최적화 콘텐츠를 작성해주세요.

## 콘텐츠 정보
- 주제: {keyword}
- 카테고리: {category}
- 예상 월간 검색량: {volume}
- 타겟 독자: 블로거, 유튜버, 온라인 부업 희망자

## 카테고리별 요구사항
- guides: 2,000~3,000자, 단계별 구조, 체크리스트 포함
- tips: 800~1,200자, 핵심 1가지 해결책, 즉시 실행 가능한 팁
- reviews: 1,500~2,000자, 장단점 비교, 평점 포함
- income-reports: 1,500~2,000자, 수익 데이터 분석, 다음달 목표

## 요구사항
1. H2, H3 헤딩으로 명확한 구조 작성
2. 타겟 키워드를 자연스럽게 3~5회 포함
3. 메타 디스크립션 150자 이내
4. 전문적이지만 친근한 톤, 데이터/수치 근거 포함
5. 실행 가능한 체크리스트 또는 단계 포함
6. 표(마크다운 테이블) 최소 1개 포함

## 출력 형식
반드시 아래 MDX frontmatter로 시작하세요. 마크다운 코드 블록(```)으로 감싸지 마세요.

---
title: "..."
description: "..."
date: "{date}"
category: "{category}"
tags: [...]
thumbnail: "/images/og-default.png"
readingTime: {reading_time}
featured: false
seo:
  keywords: [...]
---

[본문 내용]

## 다음 단계
[관련 가이드 추천 및 행동 유도]
"""


def make_slug(keyword: str) -> str:
    """키워드를 URL-safe 슬러그로 변환합니다."""
    slug = keyword.strip().lower()
    slug = re.sub(r'[^\w\s가-힣]', '', slug)
    slug = re.sub(r'\s+', '-', slug)
    return slug


def estimate_reading_time(category: str) -> int:
    return {'guides': 8, 'tips': 4, 'reviews': 6, 'income-reports': 5}.get(category, 5)


def generate_article(keyword: str, category: str, volume: str = '1000', overwrite: bool = False) -> str | None:
    """단일 키워드로 MDX 아티클을 생성합니다. 생성된 파일 경로를 반환합니다."""
    slug = make_slug(keyword)
    filepath = f"content/{category}/{slug}.mdx"

    if not overwrite and os.path.exists(filepath):
        print(f"[Skip] Already exists: {filepath}")
        return None

    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        print(f"[Dummy] ANTHROPIC_API_KEY 없음 → 더미 파일 생성: {keyword}")
        return _create_dummy_article(keyword, category, slug, filepath)

    client = anthropic.Anthropic(api_key=api_key)
    date = datetime.now().strftime("%Y-%m-%d")
    reading_time = estimate_reading_time(category)

    prompt = CONTENT_GENERATION_PROMPT.format(
        keyword=keyword,
        category=category,
        volume=volume,
        date=date,
        reading_time=reading_time,
    )

    print(f"[Generate] '{keyword}' ({category}) ...")
    try:
        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=4096,
            messages=[{"role": "user", "content": prompt}],
        )
        content = response.content[0].text

        # 혹시 코드 블록으로 감싸진 경우 제거
        content = re.sub(r'^```(?:mdx|md)?\n', '', content.strip())
        content = re.sub(r'\n```$', '', content)

        os.makedirs(f"content/{category}", exist_ok=True)
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)

        print(f"[Done] {filepath}")
        return filepath

    except Exception as e:
        print(f"[Error] API 호출 실패 ({keyword}): {e}")
        return None


def _create_dummy_article(keyword: str, category: str, _slug: str, filepath: str) -> str:
    """API 없이 구조만 갖춘 더미 MDX 파일을 생성합니다."""
    date = datetime.now().strftime("%Y-%m-%d")
    reading_time = estimate_reading_time(category)
    content = f"""\
---
title: "{keyword} 완벽 가이드"
description: "{keyword}에 대해 실전 경험 기반으로 정리한 가이드입니다."
date: "{date}"
category: "{category}"
tags: ["{keyword}", "애드센스", "블로그 수익화"]
thumbnail: "/images/og-default.png"
readingTime: {reading_time}
featured: false
seo:
  keywords: ["{keyword}"]
---

## 핵심 요약

{keyword}에 대한 핵심 내용을 한 줄로 요약합니다.

## 왜 중요한가?

{keyword}가 중요한 이유를 설명합니다.

## 단계별 실행 방법

### 1단계

첫 번째 단계 내용

### 2단계

두 번째 단계 내용

### 3단계

세 번째 단계 내용

## 핵심 체크리스트

- [ ] 항목 1
- [ ] 항목 2
- [ ] 항목 3

## 다음 단계

관련 가이드를 확인하세요.

> **참고**: 이 파일은 더미로 생성되었습니다. `ANTHROPIC_API_KEY`를 설정하면 실제 AI 콘텐츠로 자동 대체됩니다.
"""
    os.makedirs(f"content/{category}", exist_ok=True)
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"[Dummy] {filepath}")
    return filepath


def read_keywords_file(keywords_file: str) -> list[dict]:
    """
    keywords.txt를 파싱해 키워드 목록을 반환합니다.
    형식: 키워드|카테고리|우선순위|예상검색량
    """
    keywords = []
    if not os.path.exists(keywords_file):
        print(f"[Error] 파일 없음: {keywords_file}")
        return keywords

    with open(keywords_file, 'r', encoding='utf-8') as f:
        for lineno, line in enumerate(f, 1):
            line = line.strip()
            if not line or line.startswith('#'):
                continue

            parts = line.split('|')
            if len(parts) < 4:
                print(f"[Warning] 형식 오류 (라인 {lineno}): '{line}' — 건너뜀")
                continue

            keyword, category, priority, volume = (p.strip() for p in parts[:4])
            keywords.append({
                'keyword': keyword,
                'category': category,
                'priority': priority,
                'volume': volume,
            })

    return keywords


def batch_generate(keywords_file: str, priority_filter: str | None = None, overwrite: bool = False) -> None:
    """keywords.txt를 읽어 일괄 콘텐츠를 생성합니다."""
    keywords = read_keywords_file(keywords_file)
    if not keywords:
        print("[Error] 생성할 키워드가 없습니다.")
        return

    if priority_filter:
        keywords = [k for k in keywords if k['priority'] == priority_filter]
        print(f"[Filter] priority={priority_filter} → {len(keywords)}개 키워드")

    print(f"\n총 {len(keywords)}개 키워드 처리 시작\n" + "=" * 50)

    generated, skipped, failed = [], [], []

    for i, item in enumerate(keywords, 1):
        print(f"\n[{i}/{len(keywords)}] {item['keyword']} ({item['category']}, priority={item['priority']}, 검색량={item['volume']})")
        result = generate_article(
            keyword=item['keyword'],
            category=item['category'],
            volume=item['volume'],
            overwrite=overwrite,
        )
        if result is None:
            skipped.append(item['keyword'])
        else:
            generated.append(result)

    print("\n" + "=" * 50)
    print(f"[완료] 생성: {len(generated)}개 | 건너뜀: {len(skipped)}개 | 실패: {len(failed)}개")
    if generated:
        print("\n생성된 파일:")
        for path in generated:
            print(f"  ✓ {path}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="AdPress 콘텐츠 자동 생성기")
    parser.add_argument("--keyword", type=str, help="단일 키워드")
    parser.add_argument("--category", type=str, help="카테고리 (guides/tips/reviews/income-reports)")
    parser.add_argument("--batch", type=str, metavar="FILE", help="일괄 생성할 keywords.txt 경로")
    parser.add_argument("--priority", type=str, choices=["high", "medium", "low"], help="우선순위 필터 (batch 모드)")
    parser.add_argument("--overwrite", action="store_true", help="이미 존재하는 파일도 덮어쓰기")
    args = parser.parse_args()

    if args.batch:
        batch_generate(args.batch, priority_filter=args.priority, overwrite=args.overwrite)
    elif args.keyword and args.category:
        generate_article(args.keyword, args.category, overwrite=args.overwrite)
    else:
        parser.print_help()
