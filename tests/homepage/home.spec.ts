import { test, expect } from "@playwright/test";

test.describe("Home Page with no auth", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://practicesoftwaretesting.com/");
  });

   test("visual test", async ({ page }) => {
     await page.waitForLoadState("networkidle"); //Screenshot / visual test öncesi UI’nın tam oturması için
     await expect(page).toHaveScreenshot("home-page-no-auth.png", {
       mask: [page.getByTitle("Practice Software Testing - Toolshop")],
     });
   });

  test("check sign in", async ({ page }) => {
    // Verify sign-in link is present
    //<a _ngcontent-ng-c1334646923="" data-test="nav-sign-in" routerlink="/auth/login" class="nav-link" href="/auth/login">Sign in</a>
    await expect(page.getByTestId("nav-sign-in")).toHaveText("Sign in");
  });

  test("validate page title", async ({ page }) => {
    // check the title of the page
    // <title>Practice Software Testing - Toolshop - v5.0</title>
    await expect(page).toHaveTitle(
      "Practice Software Testing - Toolshop - v5.0"
    );
  });

  test("grid load with 9 items", async ({ page }) => {
    // Check the count of items displayed
    // <div _ngcontent-ng-c3901630365="" class="col-md-9"><!----><div _ngcontent-ng-c3901630365="" class="container" data-test=""><!---->
    const productGrid = page.locator(".col-md-9"); //class locator -- nokta css oldugunu gosterir
    await expect(productGrid.getByRole("link")).toHaveCount(9);
  });

  test("searching for thor hammer", async ({ page }) => {
    // Search for Thor Hammer and check the result
    const searchText = "Thor Hammer";

    // 1. Search alanına yaz
    // <input _ngcontent-ng-c3901630365="" formcontrolname="query" id="search-query" data-test="search-query" type="text" class="form-control ng-pristine ng-invalid ng-touched" placeholder="Search">
    // locator: await page.locator('[data-test="search-query"]').fill("Thor Hammer");
    await page.getByTestId("search-query").fill(searchText);

    // 2️⃣ Search butonuna bas
    // <button _ngcontent-ng-c3901630365="" type="submit" data-test="search-submit" class="btn btn-secondary">Search </button>
    // locator: await page.locator('[data-test="search-submit"]').click();
    await page.getByTestId("search-submit").click();

    // 3️⃣ Sonuçlarda Thor Hammer görünüyor mu?
    // <h5 _ngcontent-ng-c3901630365="" data-test="product-name" class="card-title"> Thor Hammer </h5> // 9 tane var DOM da
    const productGrid = page.locator(".col-md-9"); //class locator -- nokta css oldugunu gosterir

    await expect(productGrid.getByRole("link")).toHaveCount(1);
    await expect(
      productGrid.getByTestId("product-name").filter({ hasText: searchText })
    ).toBeVisible();
  });
});

test.describe("Home page customer 01 auth", () => {
  test.use({ storageState: "./auth/customer01.json" });

  test.beforeEach(async ({ page }) => {
    await page.goto("https://practicesoftwaretesting.com/");
  });

  test("visual test authorized", async ({ page }) => {
    await page.waitForLoadState("networkidle"); //Screenshot / visual test öncesi UI’nın tam oturması için
    await expect(page).toHaveScreenshot("home-page-customer01.png", {
      mask: [page.getByTitle("Practice Software Testing - Toolshop")],
    });
  });

  test("check customer 01 is signed in", async ({ page }) => {
    await expect(page.getByTestId("nav-sign-in")).not.toBeVisible();
    await expect(page.getByTestId("nav-menu")).toContainText("Jane Doe");
  });
});

/*
     Invalid Locators
  1.
  toHaveText: 9 tane product-name var sayfada, Ben tek bir element bekliyordum ama 9 tane buldum → hangisi
  await expect(page.locator('[data-test="product-name"]'))
  .toHaveText('Thor Hammer');
  );
  

  2.
  toContainText: Bu locator’ın resolve ettiği TEK element Thor Hammer içeriyor mu, Ama locator → 9 element buluyor
  await expect(
  page.locator('[data-test="product-name"]')
).toContainText('Thor Hammer');

  3.
  bu kullanım dogru ama playwright locator yerine getBy lara daha cok yonlendiyor
  const thorHammer = page
    .locator('[data-test="product-name"]')
    .filter({ hasText: 'Thor Hammer' });

  await expect(thorHammer).toBeVisible(); // ✅
  });
  */
