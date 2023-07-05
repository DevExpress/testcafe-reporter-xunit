var buildReporterPlugin = require('testcafe').embeddingUtils.buildReporterPlugin;
var pluginFactory       = require('../');
var reporterTestCalls   = require('../test/utils/reporter-test-calls');
var plugin              = buildReporterPlugin(pluginFactory);

reporterTestCalls.forEach(function (call) {
    plugin[call.method].apply(plugin, call.args);
});
