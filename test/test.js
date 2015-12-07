var assert             = require('assert');
var normalizeNewline   = require('normalize-newline');
var read               = require('read-file-relative').readSync;
var pluginTestingUtils = require('testcafe').pluginTestingUtils;
var pluginFactory      = require('../lib');
var testCalls          = require('./data/test-calls');

function createReport (withColors) {
    var outStream = {
        data: '',

        write: function (text) {
            this.data += text;
        }
    };

    var plugin = pluginTestingUtils.buildReporterPlugin(pluginFactory, outStream);

    plugin.chalk.enabled = !plugin.noColors && withColors;
    plugin.symbols       = { ok: '✓', err: '✖' };

    // NOTE: disable errors coloring if we don't have custom
    // error decorator. Default error colors may be prone to changing.
    if (plugin.chalk.enabled && !pluginFactory().createErrorDecorator) {
        var origFormatError = plugin.formatError;

        plugin.formatError = function () {
            plugin.chalk.enabled = false;

            var result = origFormatError.apply(plugin, arguments);

            plugin.chalk.enabled = true;

            return result;
        };
    }

    testCalls.forEach(function (call) {
        plugin[call.method].apply(plugin, call.args);
    });

    return outStream.data;
}

it('Should produce report with colors', function () {
    var report   = createReport(true);
    var expected = JSON.parse(read('./data/report-with-colors.json'));

    report   = normalizeNewline(report).trim();
    expected = normalizeNewline(expected).trim();

    assert.strictEqual(report, expected);
});

it('Should produce report without colors', function () {
    var report   = createReport(false);
    var expected = read('./data/report-without-colors');

    report   = normalizeNewline(report).trim();
    expected = normalizeNewline(expected).trim();

    assert.strictEqual(report, expected);
});
