import {test as setup,expect } from "@playwright/test";

setup("create customer 01 auth", async ({ page, context }) => {
  const email = "customer@practicesoftwaretesting.com";
  const password = "welcome01";
  const customer01AuthFile = "./auth/customer01.json";

  await page.goto("https://practicesoftwaretesting.com/auth/login");

  //fill email
  // <input _ngcontent-ng-c713820125="" formcontrolname="email" id="email" data-test="email" type="email" aria-required="true" class="form-control ng-dirty ng-valid ng-touched" placeholder="Your email" aria-invalid="false">
  await page.getByTestId("email").fill(email);

  // fill password
  //<input class="form-control" id="password" type="password" placeholder="Your password" data-test="password" aria-invalid="false">
  await page.getByTestId("password").fill(password);

  // clich submit
  //<input _ngcontent-ng-c713820125="" type="submit" data-test="login-submit" aria-label="Login" class="btnSubmit" value="Login">
  await page.getByTestId("login-submit").click();

  // have text
  //<a _ngcontent-ng-c1334646923="" href="#" data-test="nav-menu" id="menu" role="button" data-bs-toggle="dropdown" aria-expanded="false" class="nav-link dropdown-toggle"> Jane Doe </a>
  await expect (page.getByTestId("nav-menu")).toContainText("Jane Doe");
  await context.storageState({path: customer01AuthFile});
})
