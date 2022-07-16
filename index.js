"use strict";
var fs = require("fs");
const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto(
    "https://www.google.com/search?q=react+jobs&ei=4duYYpLRJYq94-EPqfK90AE&uact=5&oq=react+jobs&gs_lcp=Cgdnd3Mtd2l6EAMyBQgAEIAEMggIABCABBDJAzIFCAAQkgMyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEOgQIABBHOgUIABCRAjoUCC4QgAQQsQMQgwEQxwEQ0QMQ1AI6CAguEIAEELEDOgUILhCABDoLCAAQgAQQsQMQgwE6BAgAEEM6DgguEIAEELEDEMcBEKMCOgsILhDHARCvARCRAjoHCAAQyQMQQzoOCC4QgAQQsQMQxwEQ0QM6CAgAEIAEELEDOggILhCABBDUAjoLCC4QgAQQsQMQ1AI6DQgAELEDEIMBEMkDEEM6CAgAELEDEIMBOgoIABCxAxCDARANOgQIABANOgcIABDJAxANSgQIQRgASgQIRhgAUJseWIgzYOczaANwAngAgAGmAYgB5AqSAQQwLjExmAEAoAEBsAEAyAEIwAEB&sclient=gws-wiz&ibp=htl;jobs&sa=X&ved=2ahUKEwi546uOj4_4AhXh6zgGHQlPDQYQutcGKAF6BAgHEAY#htivrt=jobs&htidocid=DNXJc0LPw_4AAAAAAAAAAA%3D%3D&fpstate=tldetail"
  );

  const result = await page.evaluate(() => {
    let title = document.querySelectorAll(".PUpOsf");
    let company = document.querySelectorAll(".vNEEBe");
    let location = document.querySelectorAll(".Qk80Jf");
    let newLocation = [];
    let contact = [];
    for (let i = 0; i < location.length; i++) {
      if (i % 2 == 0) {
        contact.push(location[i]);
      } else {
        newLocation.push(location[i]);
      }
    }
    let arr = [];
    for (let i = 0; i < contact.length; i++) {
      arr.push({
        id: i + 1,
        title: title[i].innerText,
        company: company[i].innerText,
        location: newLocation[i].innerText,
        contact: contact[i].innerText,
      });
    }

    return arr;
  });
  let updateData = JSON.stringify({ data: result });
  console.log(updateData);
  fs.writeFileSync("db.json", updateData, function (err) {
    if (err) console.log(err, "message");
    console.log("successfully created");
  });

  await browser.close();
})();
