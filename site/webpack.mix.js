// Set the mix variable
const mix = require('laravel-mix');
const pkg = require('./package.json');
const TargetsPlugin = require('targets-webpack-plugin');

/* Mix Plugins */
require('laravel-mix-eslint');
require('laravel-mix-banner');

/**
 * Start the Mix function
 */
mix
    .webpackConfig(webpack => {
        return {
            resolve: { extensions: ['.js'] },
            plugins: [
                new TargetsPlugin({
                    browsers: ['last 2 versions', 'chrome >= 41', 'IE 11'],
                }),
            ],
        };
    })
    .setPublicPath('./web/assets')
    .banner({
        banner: (function () {
            const moment = require('moment');
            const gitRevSync = require('git-rev-sync');

            return [
                '/**',
                ' * @project        ' + pkg.name,
                ' * @author         ' + pkg.author.name,
                ' * @build          ' + moment().format('llll') + ' GMT+1',
                ' * @release        ' + gitRevSync.long() + ' [' + gitRevSync.branch() + ']',
                ' * @copyright      Copyright (c) ' + moment().format('YYYY') + ', ' + pkg.copyright,
                ' *',
                ' */',
                '',
            ].join('\n');
        })(),
        raw: true,
        entryOnly: true,
    })
    .js(pkg.paths.src.js + 'site.js', pkg.paths.dist.js).eslint({ cache: true })
    .version();