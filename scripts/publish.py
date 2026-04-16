"""
publish.py — 콘텐츠 자동 발행 파이프라인

워크플로우:
  키워드 입력 → Claude API 호출 → 콘텐츠 생성 → MDX 저장 → Git Commit & Push → Cloudflare 자동 배포
"""

import os
import subprocess
import argparse
from datetime import datetime
from generate_content import generate_article


def git_commit_and_push(filepath: str, message: str = None) -> bool:
    """생성된 콘텐츠를 git commit하고 push합니다."""
    if message is None:
        date_str = datetime.now().strftime('%Y-%m-%d')
        message = f"🤖 Auto-generated content {date_str}"

    try:
        subprocess.run(['git', 'add', filepath], check=True)
        result = subprocess.run(
            ['git', 'diff', '--staged', '--quiet'],
            capture_output=True
        )
        if result.returncode == 0:
            print(f"[Skip] No changes to commit for {filepath}")
            return False

        subprocess.run(['git', 'commit', '-m', message], check=True)
        subprocess.run(['git', 'push'], check=True)
        print(f"[Success] Committed and pushed: {filepath}")
        return True
    except subprocess.CalledProcessError as e:
        print(f"[Error] Git operation failed: {e}")
        return False


def publish_article(keyword: str, category: str, auto_push: bool = False) -> None:
    """단일 아티클을 생성하고 선택적으로 발행합니다."""
    print(f"[Start] Generating article: {keyword} ({category})")
    generate_article(keyword, category)

    slug = keyword.replace(' ', '-').lower()
    filepath = f"content/{category}/{slug}.mdx"

    if not os.path.exists(filepath):
        print(f"[Error] File not found after generation: {filepath}")
        return

    if auto_push:
        git_commit_and_push(filepath)
    else:
        print(f"[Done] Article saved: {filepath}")
        print("[Info] Use --push flag to auto commit and push.")


def publish_batch(keywords_file: str, auto_push: bool = False) -> None:
    """키워드 파일에서 일괄 생성 및 발행합니다."""
    if not os.path.exists(keywords_file):
        print(f"[Error] Keywords file not found: {keywords_file}")
        return

    with open(keywords_file, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    published = []
    for line in lines:
        line = line.strip()
        if not line or line.startswith('#'):
            continue

        parts = line.split('|')
        if len(parts) < 2:
            continue

        keyword = parts[0].strip()
        category = parts[1].strip()
        priority = parts[2].strip() if len(parts) > 2 else 'medium'

        if priority == 'high':
            print(f"\n[Queue] {keyword} ({category}) — priority: {priority}")
            publish_article(keyword, category, auto_push=False)
            slug = keyword.replace(' ', '-').lower()
            filepath = f"content/{category}/{slug}.mdx"
            published.append(filepath)

    if auto_push and published:
        for filepath in published:
            git_commit_and_push(filepath)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='AdPress 콘텐츠 자동 발행 파이프라인')
    parser.add_argument('--keyword', type=str, help='생성할 키워드')
    parser.add_argument('--category', type=str, help='카테고리 (guides/tips/reviews/income-reports)')
    parser.add_argument('--batch', type=str, help='일괄 생성할 키워드 파일 경로')
    parser.add_argument('--push', action='store_true', help='생성 후 자동 git push')
    args = parser.parse_args()

    if args.batch:
        publish_batch(args.batch, auto_push=args.push)
    elif args.keyword and args.category:
        publish_article(args.keyword, args.category, auto_push=args.push)
    else:
        print("Usage:")
        print("  python publish.py --keyword '애드센스 승인 팁' --category tips")
        print("  python publish.py --batch keywords.txt --push")
