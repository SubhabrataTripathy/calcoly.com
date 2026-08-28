import time
import os
import sys
from playwright.sync_api import sync_playwright

def main():
    print("==================================================", flush=True)
    print("Starting Namecheap Setup Automation...", flush=True)
    print("==================================================", flush=True)

    with sync_playwright() as p:
        browser = p.chromium.launch(
            headless=True,
            args=["--disable-blink-features=AutomationControlled"]
        )
        context = browser.new_context(
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
            viewport={"width": 1280, "height": 800}
        )
        page = context.new_page()

        print("[1/5] Navigating to Namecheap Login...", flush=True)
        page.goto("https://www.namecheap.com/myaccount/login/", wait_until="domcontentloaded", timeout=45000)
        time.sleep(3)

        os.makedirs("scratch", exist_ok=True)

        print("[2/5] Entering Username & Password into visible fields...", flush=True)
        try:
            # Target the visible main login inputs
            u_input = page.locator('input[placeholder="Username"]:visible, input[name="LoginUserName"]:visible, input[type="text"]:visible').first
            u_input.fill("suvotripathy")
            time.sleep(1)

            p_input = page.locator('input[placeholder="Password"]:visible, input[name="LoginPassword"]:visible, input[type="password"]:visible').first
            p_input.fill("Regression.9")
            time.sleep(1)
            print("Credentials filled.", flush=True)
        except Exception as e:
            print("Error filling credentials:", e, flush=True)

        print("[3/5] Submitting Namecheap Login...", flush=True)
        try:
            btn = page.locator('button:has-text("Sign in"):visible, button[type="submit"]:visible, .gb-btn--primary:visible').first
            btn.click()
            print("Clicked Sign In button.", flush=True)
        except Exception as e:
            print("Error clicking submit:", e, flush=True)

        print("[4/5] Waiting for Dashboard response (10s)...", flush=True)
        time.sleep(10)
        page.screenshot(path="scratch/nc_after_login.png")
        print("Captured scratch/nc_after_login.png", flush=True)
        print("Current URL:", page.url, flush=True)
        print("Current Title:", page.title(), flush=True)

        # Check if 2FA code or security verification is requested
        text = page.inner_text("body").lower()
        if "verification" in text or "code" in text or "security" in text or "two-factor" in text or "2fa" in text:
            print("\n>>> NAMECHEAP SECURITY / 2FA PROMPT DETECTED on screen <<<", flush=True)

        # Try to navigate directly to Domain List if logged in
        if "myaccount" in page.url and "login" not in page.url:
            print("[5/5] Navigating to calcoly.com domain manage page...", flush=True)
            page.goto("https://ap.www.namecheap.com/domains/domaincontrolpanel/calcoly.com/domain", wait_until="domcontentloaded", timeout=30000)
            time.sleep(5)
            page.screenshot(path="scratch/nc_domain.png")
            print("Captured scratch/nc_domain.png", flush=True)

        browser.close()
        print("Automation run completed.", flush=True)

if __name__ == "__main__":
    main()
