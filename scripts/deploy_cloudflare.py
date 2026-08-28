import time
import os
import sys
from playwright.sync_api import sync_playwright

def main():
    print("Starting Playwright...", flush=True)
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            viewport={"width": 1280, "height": 800},
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
        )
        page = context.new_page()

        print("Navigating to Cloudflare login...", flush=True)
        page.goto("https://dash.cloudflare.com/login", wait_until="domcontentloaded", timeout=30000)
        time.sleep(3)

        os.makedirs("scratch", exist_ok=True)
        page.fill('input[type="email"], input[name="email"]', "suvo.tripathy@gmail.com")
        page.fill('input[type="password"], input[name="password"]', "Regression.9")
        print("Filled credentials.", flush=True)

        print("Clicking Sign In button...", flush=True)
        btn = page.locator('button:has-text("Sign in")')
        if btn.count() > 0:
            btn.first.click()
            print("Clicked Sign In button successfully.", flush=True)
        else:
            page.click('button[type="submit"]')
            print("Clicked submit fallback.", flush=True)

        # Wait for navigation or response
        time.sleep(8)
        page.screenshot(path="scratch/cf_after_login.png")
        print("Captured scratch/cf_after_login.png", flush=True)
        print("Current URL:", page.url, flush=True)
        print("Page Title:", page.title(), flush=True)

        browser.close()

if __name__ == "__main__":
    main()
