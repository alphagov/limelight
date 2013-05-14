module.exports = function () {
  
  var Support = require("../support/world.js");
  this.World = Support.World;
  Support.setup.call(this);
  
  
  this.When(/^I go to (.*)$/, function(path) {
    this.get(path);
  });
  
  this.Then(/^the category title should be "([^"]*)"$/, function(expectedTitle) {
    var element = this.browser.elementByCssSelector("#content header p.category-title");
    expect(element.text()).toEqual(expectedTitle);
  });
  
  this.Then(/^I should get back a status of (\d+)$/, function(arg1) {
    // TODO: figure out how to inspect HTTP headers
    return true;
  });

  this.Then(/^the category title should link to "([^"]*)"$/, function(expectedHref) {
    var element = this.browser.elementByCssSelector("#content header p.category-title a");
    expect(element.getAttribute('href').indexOf(expectedHref)).not.toEqual(-1);
  });

  this.Then(/^the page title should be "([^"]*)"$/, function(expectedTitle) {
    expect(this.browser.title()).toEqual(expectedTitle);
  });

  this.Then(/^the (\d+)(?:st|nd|rd|th) subtitle should be "(.*?)"$/, function (position, subtitle) {
    var actual = this.remote(function (position) {
      return $('#content section h1').eq(position - 1).text();
    }, [position]);
    
    expect(actual).toEqual(subtitle);
  });

  this.Then(/^the (\d+)(?:st|nd|rd|th) section description should be "([^"]*)"$/, function(position, description) {
    var actual = this.remote(function (position) {
      return $('#content section h2').eq(position - 1).text();
    }, [position]);
    
    expect(actual).toEqual(description);
  });

  this.Then(/^I see a link to "([^"]*)"$/, function(url) {
    var count = this.remote(function (url) {
      return $('#content a[href="' + url + '"]').length;
    }, [url]);
    expect(count).not.toBe(0);
  });
};

