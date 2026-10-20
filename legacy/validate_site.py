import os
import json
import re

project_dir = r"C:\Users\mar1\.gemini\antigravity\scratch\panagidis-dental-center"

required_files = [
    "index.html",
    "blog.html",
    "blog-post.html",
    "blog-posts.json",
    os.path.join("assets", "css", "styles.css"),
    os.path.join("assets", "js", "main.js"),
    os.path.join("assets", "js", "blog.js"),
    os.path.join("assets", "js", "post.js")
]

def check_files():
    print("--- Checking Required Files ---")
    missing = 0
    for f in required_files:
        path = os.path.join(project_dir, f)
        if os.path.exists(path):
            print(f"[OK] Found {f}")
        else:
            print(f"[FAIL] Missing {f}")
            missing += 1
    return missing == 0

def check_html_file(filename):
    path = os.path.join(project_dir, filename)
    if not os.path.exists(path):
        return False
        
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
        
    print(f"\n--- Validating HTML structure of {filename} ---")
    
    # Check Title
    has_title = "<title>" in content and "</title>" in content
    title_text = re.search(r"<title>(.*?)</title>", content)
    print(f"[{'OK' if has_title else 'FAIL'}] Title tag. Text: {title_text.group(1) if title_text else 'N/A'}")
    
    # Check Meta viewport & Description
    has_viewport = 'name="viewport"' in content or "name='viewport'" in content
    print(f"[{'OK' if has_viewport else 'FAIL'}] Viewport meta tag")
    
    has_desc = 'name="description"' in content or "name='description'" in content
    print(f"[{'OK' if has_desc else 'FAIL'}] Description meta tag")
    
    # Check css links
    css_links = re.findall(r'<link[^>]+href=["\'](.*?.css)["\']', content)
    print(f"[INFO] CSS references: {css_links}")
    
    # Check js script links
    js_links = re.findall(r'<script[^>]+src=["\'](.*?.js)["\']', content)
    print(f"[INFO] JS references: {js_links}")
    
    return has_title and has_viewport and has_desc

def check_blog_json():
    print("\n--- Validating blog-posts.json ---")
    path = os.path.join(project_dir, "blog-posts.json")
    if not os.path.exists(path):
        print("[FAIL] blog-posts.json not found")
        return False
        
    try:
        with open(path, "r", encoding="utf-8") as f:
            data = json.load(f)
        print(f"[OK] Successfully parsed JSON. Found {len(data)} posts.")
        
        # Check required fields
        required_keys = ["slug", "title", "img_src", "summary", "content"]
        all_ok = True
        for i, post in enumerate(data):
            missing_keys = [k for k in required_keys if k not in post]
            if missing_keys:
                print(f"[FAIL] Post #{i} ({post.get('slug', 'unknown')}) missing fields: {missing_keys}")
                all_ok = False
            else:
                # Check body image replacements
                content_body = post.get("content", "")
                if "/library/download/" in content_body:
                    print(f"[WARN] Post '{post['slug']}' contains unmapped legacy download image references.")
                if "https://www.panagidisdental.com" in content_body and ".jpg" in content_body:
                    print(f"[WARN] Post '{post['slug']}' contains live absolute domain image URLs.")
        if all_ok:
            print("[OK] JSON schema verified for all articles.")
        return all_ok
    except Exception as e:
        print(f"[FAIL] JSON parsing error: {e}")
        return False

if __name__ == "__main__":
    files_ok = check_files()
    html_ok = True
    for html in ["index.html", "blog.html", "blog-post.html"]:
        if not check_html_file(html):
            html_ok = False
            
    json_ok = check_blog_json()
    
    print("\n==============================")
    if files_ok and html_ok and json_ok:
        print("ALL TESTS PASSED SUCCESSFULLY!")
    else:
        print("SOME TESTS ENCOUNTERED FAILURES.")
    print("==============================")
