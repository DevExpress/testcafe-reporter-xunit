# testcafe-reporter-junit

[![CI](https://github.com/alexschwantes/testcafe-reporter-junit/actions/workflows/ci.yml/badge.svg)](https://github.com/alexschwantes/testcafe-reporter-junit/actions/workflows/ci.yml)

> This is the fork of the [**xUnit**](https://github.com/DevExpress/testcafe-reporter-xunit) reporter plugin for [TestCafe](http://devexpress.github.io/testcafe).

This reporter plugin for TestCafe outputs a junit xml report that is compatible with continuous integration servers like Jenkins. The main difference between this plugin and the default xunit plugin is that in this plugin, the testcase name attribute will only contain the testcase name and any additional information such as screenshots and (unstable) flags are output to `<system-out/>` tag. This allows for better reporting and analysis or repeated test runs.

<p align="center">
    <img src="https://raw.github.com/alexschwantes/testcafe-reporter-junit/master/media/preview.png" alt="preview" />
</p>

## Install

To install this reporter, you can use the following command:

```
npm install testcafe-reporter-junit
```

## Usage

When you run tests from the command line, specify the reporter name by using the `--reporter` option:

```
testcafe chrome 'path/to/test/file.js' --reporter junit
```

When you use API, pass the reporter name to the `reporter()` method:

```js
testCafe
    .createRunner()
    .src("path/to/test/file.js")
    .browsers("chrome")
    .reporter("junit") // <-
    .run();
```

## Metadata Attributes

This reporter includes TestCafe metadata in each generated `<testcase>` element as XML attributes. This is useful when your CI pipeline needs fields such as `owner`, `component`, `priority`, or build identifiers.

Fixture metadata is applied to all tests in the fixture. Test-level metadata is merged on top of fixture metadata, so test-level values override fixture-level values when the same key is present.

Example:

```js
fixture.meta({
    owner: "fixture owner",
    component: "checkout",
    priority: "high",
})("Checkout flow");

test.meta({
    owner: "test owner",
    build: "2026.05.18",
})("submits an order", async (t) => {
    // test code
});
```

Produces a `<testcase>` similar to:

```xml
<testcase
    classname="Checkout flow"
    name="submits an order"
    time="74"
    owner="test owner"
    component="checkout"
    priority="high"
    build="2026.05.18">
</testcase>
```

This makes the `owner` field and other custom metadata available to downstream tools such as Azure DevOps pipeline test reporting.
