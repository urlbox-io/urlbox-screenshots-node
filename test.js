"use strict";
import crypto from "crypto";
import qs from "qs";
import urlboxFactory from "./dist/index";

const myapikey = "MY_API_KEY";
const mysecret = "secret";
const prefix = "https://api.urlbox.io/v1/";
const urlbox = urlboxFactory(myapikey, mysecret);
var delay, full_page, height, url, width;

const fixedEncodeURIComponent = str =>
  encodeURIComponent(str).replace(
    /[!'()*]/g,
    c =>
      `%${c
        .charCodeAt(0)
        .toString(16)
        .toUpperCase()}`
  );

test("should return a url with a valid token and query string", () => {
  const options = {
    url: "bbc.co.uk",
    width: 1024,
    height: 768,
    delay: 1000
  };
  const query = qs.stringify(options);
  const result = urlbox.buildUrl(options);
  const token = crypto
    .createHmac("sha1", mysecret)
    .update(query)
    .digest("hex");
  expect(result).toEqual(
    "https://api.urlbox.io/v1/" + myapikey + "/" + token + "/png?" + query
  );
});
test("should return a url with a valid token and query string with width param", () => {
  var query, result, token;
  const options = {
    url: "bbc.co.uk",
    width: 100
  };
  query = qs.stringify(options);
  token = crypto
    .createHmac("sha1", mysecret)
    .update(query)
    .digest("hex");
  result = urlbox.buildUrl(options);

  expect(result).toEqual(prefix + myapikey + "/" + token + "/png?" + query);
});
test("should return a url with a valid token and query string with height param", () => {
  var query, result, token;
  const options = {
    url: "google.com",
    height: 100
  };
  query = qs.stringify(options);
  token = crypto
    .createHmac("sha1", mysecret)
    .update(query)
    .digest("hex");
  result = urlbox.buildUrl(options);

  expect(result).toEqual(prefix + myapikey + "/" + token + "/png?" + query);
});
test("should return a url with a valid token and query string with full_page param", () => {
  var query, result, token;
  const options = {
    url: "google.com",
    full_page: true
  };
  query = qs.stringify(options);
  token = crypto
    .createHmac("sha1", mysecret)
    .update(query)
    .digest("hex");
  result = urlbox.buildUrl(options);

  expect(result).toEqual(prefix + myapikey + "/" + token + "/png?" + query);
});
test("should return a url with a valid token and query string with delay param", () => {
  var query, result, token;
  const options = {
    url: "google.com",
    delay: 4000
  };
  query = qs.stringify(options);
  token = crypto
    .createHmac("sha1", mysecret)
    .update(query)
    .digest("hex");
  result = urlbox.buildUrl(options);

  expect(result).toEqual(prefix + myapikey + "/" + token + "/png?" + query);
});
test("should return a url with a valid token and query string with width and height params", () => {
  var query, result, token;
  const options = {
    url: "bbc.co.uk",
    width: 100,
    height: 200
  };
  query = qs.stringify(options);
  token = crypto
    .createHmac("sha1", mysecret)
    .update(query)
    .digest("hex");
  result = urlbox.buildUrl(options);

  expect(result).toEqual(prefix + myapikey + "/" + token + "/png?" + query);
});
test("should return a url with a valid token and query string with width and height and full_page params", () => {
  var query, result, token;
  const options = {
    url: "bbc.co.uk",
    width: 100,
    height: 200,
    full_page: true
  };
  query = qs.stringify(options);
  token = crypto
    .createHmac("sha1", mysecret)
    .update(query)
    .digest("hex");
  result = urlbox.buildUrl(options);

  expect(result).toEqual(prefix + myapikey + "/" + token + "/png?" + query);
});
test("should return a url with a valid token and query string with width and height and full_page and delay params", () => {
  var query, result, token;
  const options = {
    url: "bbc.co.uk",
    width: 100,
    height: 200,
    full_page: true
  };
  query = qs.stringify(options);
  token = crypto
    .createHmac("sha1", mysecret)
    .update(query)
    .digest("hex");
  result = urlbox.buildUrl(options);

  expect(result).toEqual(prefix + myapikey + "/" + token + "/png?" + query);
});
test("user_agent and url are url-encoded", () => {
  const options = {
    url: "https://bbc.co.uk",
    user_agent:
      "Mozilla/5.0 (iPad; CPU OS 7_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) CriOS/30.0.1599.12 Mobile/11A465 Safari/8536.25 (3B92C18B-D9DE-4CB7-A02A-22FD2AF17C8F)"
  };
  const query = qs.stringify(options);
  const token = crypto
    .createHmac("sha1", mysecret)
    .update(query)
    .digest("hex");
  const result = urlbox.buildUrl(options);

  expect(result).toEqual(prefix + myapikey + "/" + token + "/png?" + query);
});
test("removes false values from query", () => {
  let options = {
    url: "bbc.co.uk",
    width: 1024,
    height: 768,
    delay: 1000
  };
  const query = qs.stringify(options);
  options.force = false;
  options.full_page = false;
  options.disable_js = false;
  options.retina = false;
  const result = urlbox.buildUrl(options);
  const token = crypto
    .createHmac("sha1", mysecret)
    .update(query)
    .digest("hex");

  expect(result).toEqual(
    "https://api.urlbox.io/v1/" + myapikey + "/" + token + "/png?" + query
  );
});
test("removes 0 values from query", () => {
  let options = {
    url: "bbc.co.uk"
  };
  const query = qs.stringify(options);
  options.width = 0;
  options.height = 0;
  options.delay = undefined;
  options.thumb_width = null;
  const result = urlbox.buildUrl(options);
  const token = crypto
    .createHmac("sha1", mysecret)
    .update(query)
    .digest("hex");

  expect(result).toEqual(
    "https://api.urlbox.io/v1/" + myapikey + "/" + token + "/png?" + query
  );
});
test("kitchen sink", () => {
  const options = {
    url: "https://www.mysite.com/?video=funny cat plays piano",
    width: 100,
    height: 200,
    thumb_width: 300,
    // format: 'jpg',
    full_page: true,
    retina: true,
    disable_js: true,
    delay: 4000,
    user_agent:
      "Mozilla/5.0 (iPad; CPU OS 7_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) CriOS/30.0.1599.12 Mobile/11A465 Safari/8536.25 (3B92C18B-D9DE-4CB7-A02A-22FD2AF17C8F)",
    force: true,
    quality: 80
  };
  const query = qs.stringify(options);
  // don't want format in the query string...
  options.format = "jpg";
  const token = crypto
    .createHmac("sha1", mysecret)
    .update(query)
    .digest("hex");
  const result = urlbox.buildUrl(options);

  expect(result).toEqual(prefix + myapikey + "/" + token + "/jpg?" + query);
});
test("should error if no url", () => {
  expect(() => urlbox.buildUrl()).toThrow("no options object passed");
});
test("should error if url is wrong type", () => {
  let options = { url: 2 };
  expect(() => urlbox.buildUrl(options)).toThrow(
    "url should be of type string (something like www.google.com)"
  );
});
test("cookies", () => {
  const options = {
    url: "bbc.co.uk",
    cookie: [
      "CookieOptIn=true;Path=/;Domain=.marktplaats.nl;Expires=Fri, 01-Jan-2027 15:19:58 GMT",
      "LoggedIn=true;Path=/;Domain=.urlbox.io;Max-Age=10000"
    ]
  };
  const query =
    "url=bbc.co.uk&" +
    options.cookie.map((c, i) => "cookie=" + encodeURIComponent(c)).join("&");
  options.format = "png";
  const token = crypto
    .createHmac("sha1", mysecret)
    .update(query)
    .digest("hex");
  const result = urlbox.buildUrl(options);

  expect(result).toEqual(prefix + myapikey + "/" + token + "/png?" + query);
});

test("without secret", () => {
  const urlbox = urlboxFactory(myapikey, null);
  const options = {
    url: "https://www.mysite.com/?video=funny cat plays piano",
    width: 100,
    height: 200,
    thumb_width: 300,
    full_page: true,
    retina: true,
    disable_js: true,
    delay: 4000,
    user_agent:
      "Mozilla/5.0 (iPad; CPU OS 7_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) CriOS/30.0.1599.12 Mobile/11A465 Safari/8536.25 (3B92C18B-D9DE-4CB7-A02A-22FD2AF17C8F)",
    force: true,
    quality: 80
  };
  const query = qs.stringify(options);
  options.format = "jpg";
  const result = urlbox.buildUrl(options);
  expect(result).toEqual(prefix + myapikey + "/jpg?" + query);
});

test("asterisk", () => {
  const urlbox = urlboxFactory(myapikey, null);
  const options = {
    url: "bbc.co.uk",
    highlight_word: "*^"
  };
  const query = qs.stringify(options);
  options.format = "png";
  const result = urlbox.buildUrl(options);
  expect(result).toEqual(prefix + myapikey + "/png?" + query);
});
