import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

import { test, expect } from '@playwright/test';

const records = parse(fs.readFileSync(path.join(__dirname, '/../data/participant.csv')), {
  columns: true,
  skip_empty_lines: true
});


for (const record of records) {
   if (record != undefined) {
test('NCI STAGE Account Signup For '+ record.firstname , async ({ page }) => {
  // Recording...
  let randomval= Math.floor(Math.random()*90000) + 10000;
  let tempEmail = record.firstname +randomval+'@mailinator.com';

  //await page.goto('https://episphere.github.io/connectApp/#');
  await page.goto('https://myconnect-stage.cancer.gov/');
  await page.locator('#testingAccessCode').click();
  await page.waitForTimeout(2000);
  await page.locator('#testingAccessCode').focus();
  await page.keyboard.type('agree');
  await page.waitForTimeout(3000);
  await page.locator('#warningCloseBtn').click();
  await page.getByRole('button', { name: 'Create Account' }).click();
  await page.getByRole('button', { name: 'Sign up with email' }).click();
  await page.getByRole('textbox').click();
  await page.getByRole('textbox').fill(tempEmail);
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByText('A sign-in email with additional instructions was sent to '+tempEmail).click();
  
  await page.goto('https://www.mailinator.com/v4/public/inboxes.jsp?to='+tempEmail);
  await page.waitForTimeout(2000);
  await page.getByRole('cell', { name: 'Sign in to Connect for Cancer Prevention Study' }).click();
  await page.waitForTimeout(2000);
  await page.getByRole('tab', { name: 'LINKS' }).click();
  await page.waitForTimeout(2000);
  const [page2] = await Promise.all([
    page.waitForEvent('popup'),
    page.locator('#pills-links-content a').click()
  ]);
  await page2.getByRole('textbox').fill(tempEmail);
  await page2.getByRole('button', { name: 'Next' }).click();
  await page2.getByRole('button', { name: 'I do not have a PIN' }).click();
  await page2.getByRole('combobox', { name: 'Who is your healthcare provider? Healthcare provider is required *' }).selectOption('531629870');
  await page2.getByRole('button', { name: 'Submit' }).click();
  await page.waitForTimeout(2000);
  await page2.getByRole('button', { name: 'Yes' }).click();
  await page.waitForTimeout(2000);
  //await page2.getByText('Email or text invitation').click();
  await page2.getByRole('button', { name: 'Submit' }).click();
  await page2.getByRole('button', { name: 'Next' }).click();
  await page2.getByRole('button', { name: 'Next' }).click();
  await page2.getByRole('button', { name: 'Next' }).click();
  await page2.getByRole('button', { name: 'Next' }).click();
  await page2.getByRole('button', { name: 'Next' }).click();
  await page2.getByRole('button', { name: 'Next' }).click();
  await page2.getByRole('button', { name: 'Next' }).click();
  await page2.locator('#consentIndigenousNo').check();
  await page2.getByRole('button', { name: 'Next' }).click();
  await page2.locator('#CSConsentYesCheck').check();
  await page2.locator('#CSFirstName').fill(record.firstname);
  await page2.locator('#CSFirstName').press('Tab');
  await page2.locator('#CSMiddleName').press('Tab');
  await page2.locator('#CSLastName').fill(record.lastname);
  await page2.getByRole('button', { name: 'Submit' }).click();
  await page2.getByRole('button', { name: 'Next' }).click();
  await page2.getByRole('button', { name: 'Next' }).click();
  await page2.locator('#UPMonth').selectOption(record.dob.split("/")[0]);
  await page2.locator('#UPDay').selectOption(record.dob.split("/")[1]);
  await page2.getByPlaceholder('Enter birth year').click();
  await page2.getByPlaceholder('Enter birth year').fill(record.dob.split("/")[2]);
  await page2.locator('#userProfileForm div').filter({ hasText: 'Year *' }).first().click();
  //await page2.getByPlaceholder('Enter birth year').click();
  //await page2.getByPlaceholder('Enter birth year').fill('1976');
  await page2.locator('#userProfileForm div').filter({ hasText: 'Preferred Email *' }).first().click();
  await page2.getByPlaceholder('abc@mail.com').click();
  await page2.getByPlaceholder('abc@mail.com').fill('hphenry@mailinator.com');
  await page2.getByPlaceholder('abc@mail.com').press('Tab');
  await page2.getByPlaceholder('Retype preferred email').fill('hphenry@mailinator.com');
  await page2.getByPlaceholder('Retype preferred email').press('Tab');
  await page2.locator('#UPPhoneNumber11').click();
  await page2.locator('#UPPhoneNumber11').fill('111');
  await page2.locator('#UPPhoneNumber12').fill('111');
  await page2.locator('#UPPhoneNumber13').fill('1111');
  await page2.getByLabel('Yes').first().check();
  await page2.locator('#textPermissionYes').getByRole('radio', { name: 'Yes' }).check();
  await page2.locator('#UPPhoneNumber21').click();
  await page2.locator('#UPPhoneNumber21').fill('222');
  await page2.locator('#UPPhoneNumber22').fill('222');
  await page2.locator('#UPPhoneNumber23').fill('2222');
  await page2.getByText('Yes').nth(2).click();
  await page2.getByLabel('Yes').nth(2).check();
  await page2.locator('#UPPhoneNumber31').click();
  await page2.locator('#UPPhoneNumber31').fill('333');
  await page2.locator('#UPPhoneNumber32').fill('333');
  await page2.locator('#UPPhoneNumber33').fill('3333');
  await page2.getByText('Yes').nth(3).click();
  await page2.getByPlaceholder('Enter street, PO box, rural route').click();
  await page2.getByPlaceholder('Enter street, PO box, rural route').fill('12345 34th St');
  await page2.getByPlaceholder('Enter street, PO box, rural route').press('Tab');
  await page2.getByPlaceholder('Enter apartment, suite, unit, building').click();
  await page2.getByPlaceholder('Enter apartment, suite, unit, building').fill('APT 245');
  await page2.getByPlaceholder('Enter City').click();
  await page2.getByPlaceholder('Enter City').fill('Bloomington');
  await page2.getByPlaceholder('Enter City').press('Tab');
  await page2.locator('#UPAddress1State').selectOption('Minnesota');
  await page2.getByPlaceholder('99999').click();
  await page2.getByPlaceholder('99999').fill('55420');
  await page2.locator('#UPCancer2').check();
  await page2.getByRole('button', { name: 'Submit' }).click();
  await page.waitForTimeout(2000);
  await page2.locator('#confirmReview').click();
  await page.waitForTimeout(5000);
  await page2.getByRole('link', { name: ' Sign Out' }).click();
  
}); 
}
}
