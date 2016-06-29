var TestRunErrorFormattableAdapter = require('testcafe').embeddingUtils.TestRunErrorFormattableAdapter;
var UncaughtErrorOnPage            = require('testcafe').embeddingUtils.testRunErrors.UncaughtErrorOnPage;
var ActionElementNotFoundError     = require('testcafe').embeddingUtils.testRunErrors.ActionElementNotFoundError;
var testCallsite                   = require('./test-callsite');


function makeErrors (errDescrs) {
    return errDescrs.map(function (descr) {
        return new TestRunErrorFormattableAdapter(descr.err, descr.metaInfo);
    });
}

module.exports = [
    {
        method: 'reportTaskStart',
        args:   [
            new Date('1970-01-01T00:00:00.000Z'),
            [
                'Chrome 41.0.2227 / Mac OS X 10.10.1',
                'Firefox 47 / Mac OS X 10.10.1'
            ],
            6
        ]
    },
    {
        method: 'reportFixtureStart',
        args:   [
            'First fixture',
            './fixture1.js'
        ]
    },
    {
        method: 'reportTestDone',
        args:   [
            'First test in first fixture',
            [],
            74000,
            true,
            '/screenshots/1445437598847'
        ]
    },
    {
        method: 'reportTestDone',
        args:   [
            'Second test in first fixture',
            makeErrors([
                {

                    err: new UncaughtErrorOnPage('Some error', 'http://example.org'),

                    metaInfo: {
                        userAgent:      'Chrome 41.0.2227 / Mac OS X 10.10.1',
                        screenshotPath: '/screenshots/1445437598847/errors',
                        callsite:       testCallsite,
                        testRunState:   'inTest'
                    }
                },
                {
                    err: new ActionElementNotFoundError(),

                    metaInfo: {
                        userAgent:    'Firefox 47 / Mac OS X 10.10.1',
                        callsite:     testCallsite,
                        testRunState: 'inTest'
                    }
                }
            ]),
            74000,
            false,
            '/screenshots/1445437598847'
        ]
    },
    {
        method: 'reportTestDone',
        args:   [
            'Third test in first fixture',
            [],
            74000,
            false,
            null
        ]
    },
    {
        method: 'reportFixtureStart',
        args:   [
            'Second fixture',
            './fixture2.js'
        ]
    },
    {
        method: 'reportTestDone',
        args:   [
            'First test in second fixture',
            [],
            74000,
            false,
            null
        ]
    },
    {
        method: 'reportTestDone',
        args:   [
            'Second test in second fixture',
            [],
            74000,
            false,
            null
        ]
    },
    {
        method: 'reportFixtureStart',
        args:   [
            'Third fixture',
            './fixture3.js'
        ]
    },
    {
        method: 'reportTestDone',
        args:   [
            'First test in third fixture',
            makeErrors([
                {
                    err: new ActionElementNotFoundError(),

                    metaInfo: {
                        userAgent:    'Firefox 47 / Mac OS X 10.10.1',
                        callsite:     testCallsite,
                        testRunState: 'inBeforeEach'
                    }
                }
            ]),
            74000,
            true,
            null
        ]
    },
    {
        method: 'reportTaskDone',
        args:   [
            new Date('1970-01-01T00:15:25.000Z'),
            4
        ]
    }
];
