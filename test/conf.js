var HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');
exports.config = {
    framework: 'jasmine2',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['e2e/spec_*.js'],
    onPrepare: function() {
        jasmine.getEnv().addReporter(
            new HtmlScreenshotReporter({
                dest: 'target/screenshots',
                filename: 'my-report.html',
                reportOnlyFailedSpecs: false,
                captureOnlyFailedSpecs: true
            })
        );
    }
}