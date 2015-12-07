module.exports = [
    {
        method: 'reportTaskStart',
        args:   [
            new Date('1970-01-01T00:00:00.000Z'),
            [
                'Chrome',
                'Firefox'
            ],
            6
        ]
    },
    {
        method: 'reportFixtureStart',
        args:   [
            'fixture1',
            './fixture1.js'
        ]
    },
    {
        method: 'reportTestDone',
        args:   [
            'fixture1test1',
            [],
            74000,
            true,
            '/screenshots/1445437598847'
        ]
    },
    {
        method: 'reportTestDone',
        args:   [
            'fixture1test2',
            [
                {
                    stepName:          'Step',
                    expected:          '"12345678901"',
                    actual:            '"00000000000"',
                    relatedSourceCode: 'eq(["12345678901"], ["00000000000"])',
                    key:               0,
                    isArrays:          true,
                    type:              'eqAssertion',

                    diffType: {
                        isStrings: true,
                        diffIndex: 0
                    },

                    screenshotPath: '/screenshots/1445437598847/userAgent/1.Fail.png',
                    userAgent:      'Chrome'
                },
                {
                    relatedSourceCode: 'notEq("test", "test")',
                    actual:            '"test"',
                    expected:          '"test"',
                    stepName:          'Step',
                    type:              'notEqAssertion',
                    userAgent:         'Chrome'
                },
                {
                    stepName:          'Step',
                    relatedSourceCode: 'ok(false)',
                    actual:            'false',
                    type:              'okAssertion',
                    userAgent:         'Firefox'
                }
            ],
            74000,
            false,
            '/screenshots/1445437598847'
        ]
    },
    {
        method: 'reportTestDone',
        args:   [
            'fixture1test3',
            [],
            74000,
            false,
            null
        ]
    },
    {
        method: 'reportFixtureStart',
        args:   [
            'fixture2',
            './fixture2.js'
        ]
    },
    {
        method: 'reportTestDone',
        args:   [
            'fixture2test1',
            [],
            74000,
            false,
            null
        ]
    },
    {
        method: 'reportTestDone',
        args:   [
            'fixture2test2',
            [],
            74000,
            false,
            null
        ]
    },
    {
        method: 'reportFixtureStart',
        args:   [
            'fixture3',
            './fixture3.js'
        ]
    },
    {
        method: 'reportTestDone',
        args:   [
            'fixture3test1',
            [
                {
                    stepName:          'Step',
                    expected:          '"12345678901"',
                    actual:            '"00000000000"',
                    relatedSourceCode: 'eq(["12345678901"], ["00000000000"])',
                    key:               0,
                    isArrays:          true,
                    type:              'eqAssertion',

                    diffType: {
                        isStrings: true,
                        diffIndex: 0
                    },

                    userAgent: 'Firefox'
                }
            ],
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
