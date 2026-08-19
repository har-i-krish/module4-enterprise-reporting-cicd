# Module 4 End Assignment - Enterprise Reporting, Diagnostics & CI/CD

Playwright (JavaScript) project covering:
1. Native diagnostics (screenshots, video, Trace Viewer) - SauceDemo purchase flow, OrangeHRM search, intentional failure spec.
2. Allure Report integration with `test.step()` annotations.
3. Jenkins declarative pipeline (`Jenkinsfile`) with headless cross-browser execution, HTML/Allure report publishing, and workspace cleanup.

## Project Structure

```
module4-enterprise-reporting-cicd/
├── package.json
├── playwright.config.js
├── Jenkinsfile
├── .gitignore
├── README.md
└── tests/
    ├── saucedemo-purchase.spec.js       # Full purchase flow (passing)
    ├── saucedemo-cart-failure.spec.js   # Intentional failure (diagnostics evidence)
    └── orangehrm-search.spec.js         # Login + search verification
```

## Setup

```bash
npm install
npx playwright install --with-deps
```

## Run tests

```bash
# Run everything
npx playwright test

# Run a single spec
npx playwright test tests/saucedemo-purchase.spec.js
npx playwright test tests/saucedemo-cart-failure.spec.js
npx playwright test tests/orangehrm-search.spec.js

# View the Playwright HTML report
npx playwright show-report

# Open a specific Trace Viewer archive
npx playwright show-trace test-results/<test-folder>/trace.zip
```

## Allure

```bash
npx allure generate allure-results --clean -o allure-report
npx allure open allure-report
```

## Jenkins

Point a Jenkins Pipeline job at this repository; it will use the root `Jenkinsfile`
automatically. Requires the **HTML Publisher** and **Allure Jenkins** plugins.
