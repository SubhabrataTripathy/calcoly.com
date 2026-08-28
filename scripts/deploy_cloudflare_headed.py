import time
import sys
import os
from playwright.sync_api import sync_playwright

def main():
    print("==================================================", flush=True)
    print("Launching Cloudflare Automated Deployment...", flush=True)
    print("==================================================", flush=True)

    with sync_playwright() as p:
        browser = p.chromium.launch(
            headless=False,
            args=["--disable-blink-features=AutomationControlled"]
        )
        context = browser.new_context(
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
        )
        page = context.new_page()

        print("[1/4] Navigating to Cloudflare Login...", flush=True)
        page.goto("https://dash.cloudflare.com/login", wait_until="domcontentloaded", timeout=45000)
        time.sleep(3)

        print("[2/4] Entering Email and Password...", flush=True)
        page.fill('input[type="email"], input[name="email"]', "suvo.tripathy@gmail.com")
        time.sleep(1)
        page.fill('input[type="password"], input[name="password"]', "Regression.9")
        time.sleep(1)

        print("[3/4] Pressing ENTER to submit login...", flush=True)
        page.keyboard.press("Enter")

        print("[4/4] Browser window is OPEN on your screen. Waiting for login to proceed...", flush=True)
        for i in range(30):
            time.sleep(2)
            cur_url = page.url
            if "/login" not in cur_url and "auth" not in cur_url and "challenges" not in cur_url:
                print(f"\n SUCCESS: Logged in! Reached: {cur_url}\n", flush=True)
                break
            print(f"Waiting... ({i+1}/30) Current URL: {cur_url}", flush=True)

        os.makedirs("scratch", exist_ok=True)
        page.screenshot(path="scratch/cf_active_screen.png")
        print("Captured scratch/cf_active_screen.png", flush=True)

        print("Keeping browser window open for you for 90 seconds...", flush=True)
        time.sleep(90)
        browser.close()

if __name__ == "__main__":
    main()
