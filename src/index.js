var LINE_WIDTH = 100;

export default function () {
    return {
        noColors:           true,
        report:             '',
        startTime:          null,
        uaList:             null,
        currentFixtureName: null,
        testCount:          0,

        reportTaskStart (startTime, userAgents, testCount) {
            this.startTime = startTime;
            this.uaList    = userAgents.join(', ');
            this.testCount = testCount;
        },

        reportFixtureStart (name) {
            this.currentFixtureName = this.escapeHtml(name);
        },

        reportTestDone (name, errs, durationMs, unstable, screenshotPath) {
            var hasErr = !!errs.length;

            if (unstable)
                name += ' (unstable)';

            if (screenshotPath)
                name += ` (screenshots: ${screenshotPath})`;

            name = this.escapeHtml(name);

            var openTag = `<testcase classname="${this.currentFixtureName}" name="${name}" time="${durationMs / 1000}"`;

            this.report += this.indentString(openTag, 2);

            if (hasErr) {
                this.report += ' >\n';
                this.report += this.indentString('<failure>\n', 4);
                this.report += this.indentString('<![CDATA[', 4);

                errs.forEach((err, idx) => {
                    err = this.formatError(err, `${idx + 1}) `);

                    this.report += '\n';
                    this.report += this.wordWrap(err, 6, LINE_WIDTH);
                    this.report += '\n';
                });

                this.report += this.indentString(']]>\n', 4);
                this.report += this.indentString('</failure>\n', 4);
                this.report += this.indentString('</testcase>\n', 2);
            }
            else
                this.report += ' />\n';
        },

        reportTaskDone (endTime, passed) {
            var name     = `TestCafe Tests: ${this.escapeHtml(this.uaList)}`;
            var failures = this.testCount - passed;
            var time     = (endTime - this.startTime) / 1000;

            this.write('<?xml version="1.0" encoding="UTF-8" ?>')
                .newline()
                .write(`<testsuite name="${name}" tests="${this.testCount}" failures="${failures}" ` +
                       `errors="${failures}" time="${time}" timestamp="${endTime.toUTCString()}" >`)
                .newline()
                .write(this.report)
                .write('</testsuite>');
        }
    };
}
