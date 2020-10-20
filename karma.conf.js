module.exports = function(config) {
    config.set({
        basePath: "src",
        frameworks: ["jasmine"],
        files: [
            { pattern: "**/*.test.js", type: "module", included: true, watched: false  },
            { pattern: "**/*.js", type: "module", included: false, watched: false  },
        ],
        exclude: [],
        reporters: ["spec"],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ["Chrome"],
        singleRun: true,
        concurrency: Infinity
    });
};