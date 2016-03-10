module.exports = function(grunt) {

    var _ = require('lodash');
    // Load required Grunt tasks. These are installed based on the versions listed
    // * in 'package.json' when you do 'npm install' in this directory.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    // grunt.loadNpmTasks('node-sass');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-connect-proxy');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-sync');

    /** ********************************************************************************* */
    /** **************************** File Config **************************************** */
    var fileConfig = {
        build_dir: 'build',
        compile_dir: 'bin',

        /**
         * This is a collection of file patterns for our app code (the
         * stuff in 'src/'). These paths are used in the configuration of
         * build tasks. 'js' is all project javascript, except tests.
         * 'commonTemplates' contains our reusable components' ('src/common')
         * template HTML files, while 'appTemplates' contains the templates for
         * our app's code. 'html' is just our main HTML file. 'less' is our main
         * stylesheet, and 'unit' contains our app's unit tests.
         */
        app_files: {
            js: ['src/**/*.js'],
            jsunit: ['src/**/*.spec.js'],

            appTemplates: ['src/timeline/*.html'],
            commonTemplates: ['src/common/**/*.html'],

            html: ['src/timeline/timeline.html'],
            less: 'src/less/main.less',
            sass: 'src/scss/main.scss'
        },

        /**
         * This is a collection of files used during testing only.
         */
        test_files: {
            js: [
                'bower_components/angular-mocks/angular-mocks.js'
            ]
        },

        /**
         * This is the same as 'app_files', except it contains patterns that
         * reference vendor code ('bower_components/') that we need to place into the build
         * process somewhere. While the 'app_files' property ensures all
         * standardized files are collected for compilation, it is the user's job
         * to ensure non-standardized (i.e. vendor-related) files are handled
         * appropriately in 'vendor_files.js'.
         *
         * The 'vendor_files.js' property holds files to be automatically
         * concatenated and minified with our project source files.
         *
         * The 'vendor_files.css' property holds any CSS files to be automatically
         * included in our app.
         *
         * The 'vendor_files.assets' property holds any assets to be copied along
         * with our app's assets. This structure is flattened, so it is not
         * recommended that you use wildcards.
         */
        vendor_files: {
            js: [
                'bower_components/jquery/dist/jquery.js',
                'bower_components/angular/angular.js',
                'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
                'bower_components/angular-jwt/dist/angular-jwt.js',
                'bower_components/angular-resource/angular-resource.js',
                'bower_components/angular-ui-router/release/angular-ui-router.js',
                'bower_components/angular-ui-utils/modules/route/route.js',
                'bower_components/a0-angular-storage/dist/angular-storage.js',
                'bower_components/angular-animate/angular-animate.js',
                'bower_components/angular-cookies/angular-cookies.js',
                'bower_components/angular-sanitize/angular-sanitize.js',
                'bower_components/Blob/Blob.js',
                'bower_components/d3/d3.min.js',
                'bower_components/FileSaver/FileSaver.min.js',
                'bower_components/angulartics/src/angulartics.js',
                'bower_components/angulartics-google-analytics/lib/angulartics-google-analytics.js',
                "bower_components/angular-tablesort/js/angular-tablesort.js"
            ],
            css: [
                'bower_components/jquery.scrollbar/jquery.scrollbar.css',
            ],
            assets: []
        }
    };

    /** ********************************************************************************* */
    /** **************************** Task Config **************************************** */
    var taskConfig = {
        pkg: grunt.file.readJSON("package.json"),
        /**
         * Connect is a reverse proxy configuration to send all API requests
         * to the API server. This way, our frontend code doesn't have to change
         */

        connect: {
            server: {
                options: {
                    protocol: 'http',
                    port: 9001,
                    hostname: '0.0.0.0',
                    base: 'build',
                    downloadlocation: '/opt/bsp/download/',
                    livereload: true,
                    middleware: function(connect, options) {
                        if (!Array.isArray(options.base)) {
                            options.base = [options.base];
                        }

                        // Setup the proxy
                        var middlewares = [require('grunt-connect-proxy/lib/utils').proxyRequest];

                        // Serve static files.
                        options.base.forEach(function(base) {
                            middlewares.push(connect.static(base));
                        });

                        // Make directory browse-able.
                        var directory = options.directory || options.base[options.base.length - 1];
                        middlewares.push(connect.directory(directory));

                        middlewares.push(function(req, res, next) {
                            if (req.url.indexOf('/file/export') === -1) {
                                return next();
                            }
                            var fs = require("fs");
                            require('node-zip');
                            var fileNames = req.url.replace('/file/export/', '').split("/");
                            var tempFileName = "";
                            // var realFileName = "";
                            var filePath = options.downloadlocation;
                            var readStream;
                            var count = 0;
                            var buf = '';
                            var base64String = '';

                            if (fileNames[1].indexOf('pdf') !== -1) {
                                filePath = filePath + "/" + decodeURI(fileNames[0]) + "/" +
                                    decodeURI(fileNames[1]);
                            } else {
                                tempFileName = decodeURI(fileNames[0]) + "/" + decodeURI(fileNames[1]);
                                // realFileName = decodeURI(fileNames[1]);
                                filePath = filePath + tempFileName;
                            }
                            readStream = fs.createReadStream(filePath, {
                                encoding: "base64"
                            });
                            if (filePath.indexOf('pdf') !== -1) {
                                var stat = fs.statSync(filePath);
                                res.writeHead(200, {
                                    'Content-Type': 'application/pdf',
                                    'Content-Length': stat.size,
                                    //Commented out for now since it is broken in mac
                                    // 'Content-Disposition':'attachment;filename=PersonProfile.pdf'
                                    "Content-Disposition": "attachment;filename=\"" + decodeURI(fileNames[1]) + "\""
                                });
                                fs.createReadStream(filePath).pipe(res);
                                fs.unlink(filePath);
                            } else {
                                readStream.on('data', function(chunk) {
                                    buf += chunk.toString();
                                    processBuf(buf);
                                });
                                readStream.on('end', function() {
                                    /* jshint ignore:start */
                                    var xlsx = new JSZip(buf, {
                                        base64: true,
                                        checkCRC32: false
                                    });
                                    base64String = xlsx.generate({
                                        base64: false,
                                        compression: "DEFLATE"
                                    });
                                    /* jshint ignore:end */
                                    res.setHeader('Content-Type',
                                        'application/vnd.openxmlformates');
                                    res.setHeader("Content-Disposition",
                                        "attachment;filename=\"" + decodeURI(fileNames[1]) + "\"");
                                    res.end(base64String, 'binary');

                                });
                            }
                            res.on('error', function(exception) {
                                console.log("error here " + exception.toString());
                            });
                            /*
                             * Data in the xlsx file need to be processed before sending it to the front end.
                             * Methods processBuf() and processObjectString() are used for processing the file.
                             * http://stackoverflow.com/questions/26359500/
                             * nodejs-createreadstream-only-reads-one-data-chunk-of-large-json-file
                             */
                            function processBuf(buf) {
                                var posStart = buf.indexOf('{');
                                var posEnd = buf.indexOf('}');

                                while (posStart >= 0 || posEnd >= 0) {
                                    // keep going until the start or end of the json object in the string
                                    // IF the start bracket is before the end, skip to the start
                                    if ((posStart < posEnd || posEnd < 0) && posStart >= 0) {
                                        buf = buf.slice(posStart);
                                    }
                                    if (posStart === 0 && posEnd >= 0) { // IF the end bracket is next
                                        processObjectString(buf.slice(0, posEnd + 1));
                                        buf = buf.slice(posEnd + 1); // Remove the processed string from the buffer
                                    } else if (posStart < 0 || posEnd < 0) { // Return to get a new chunk
                                        return;
                                    }
                                    // Update the positions
                                    posStart = buf.indexOf('{');
                                    posEnd = buf.indexOf('}');
                                }
                            }

                            function processObjectString(objectString) {
                                count++;
                                objectString.toString();
                            }
                        });


                        return middlewares;
                    },
                },
                proxies: [{
                    port: 8080,
                    context: '/bsp',
                    host: '0.0.0.0',
                    https: false,
                    xforward: false
                }]
            },
            livereload: {
                options: {}
            }
        },

        /**
         * The banner is the comment that is placed at the top of our compiled
         * source files. It is first processed as a Grunt template, where the '<%='
         * pairs are evaluated based on this very configuration object.
         */
        meta: {
            banner: '/**\n' +
                ' * <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
                ' *\n' +
                ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
                ' */\n'
        },

        /**
         * The directories to delete when 'grunt clean' is executed.
         */
        clean: {
            all: [
                '<%= build_dir %>',
                '<%= compile_dir %>'
            ],
            vendor: [
                '<%= build_dir %>/bower_components/'
            ],
            index: ['<%= build_dir %>/timeline.html']
        },


        /**
         * The 'copy' task just copies files from A to B. We use it here to copy
         * our project assets (images, fonts, etc.) and javascripts into
         * 'build_dir', and then to copy the assets to 'compile_dir'.
         */
        sync: {
            build_app_assets: {
                files: [{
                    src: ['**'],
                    dest: '<%= build_dir %>/assets/',
                    cwd: 'src/assets'
                }]
            },
            build_vendor_assets: {
                files: [{
                    src: ['<%= vendor_files.assets %>'],
                    dest: '<%= build_dir %>/assets/',
                    cwd: '.'
                }]
            },
            build_appjs: {
                files: [{
                    src: ['<%= app_files.js %>'],
                    dest: '<%= build_dir %>/',
                    cwd: '.'
                }]
            },
            build_vendorjs: {
                files: [{
                    src: ['<%= vendor_files.js %>'],
                    dest: '<%= build_dir %>/',
                    cwd: '.'
                }]
            },
            build_vendorcss: {
                files: [{
                    src: ['<%= vendor_files.css %>'],
                    dest: '<%= build_dir %>/',
                    cwd: '.'
                }]
            },
            compile_assets: {
                files: [{
                    src: ['**'],
                    dest: '<%= compile_dir %>/assets',
                    cwd: '<%= build_dir %>/assets'
                }]
            }
        },
        copy: {
            build_app_assets: {
                files: [{
                    src: ['**'],
                    dest: '<%= build_dir %>/assets/',
                    cwd: 'src/assets'
                }]
            },
            build_vendor_assets: {
                files: [{
                    src: ['<%= vendor_files.assets %>'],
                    dest: '<%= build_dir %>/assets/',
                    cwd: '.'
                }]
            },
            build_appjs: {
                files: [{
                    src: ['<%= app_files.js %>'],
                    dest: '<%= build_dir %>/',
                    cwd: '.'
                }]
            },
            build_vendorjs: {
                files: [{
                    src: ['<%= vendor_files.js %>'],
                    dest: '<%= build_dir %>/',
                    cwd: '.'
                }]
            },
            build_vendorcss: {
                files: [{
                    src: ['<%= vendor_files.css %>'],
                    dest: '<%= build_dir %>/',
                    cwd: '.'
                }]
            },
            compile_assets: {
                files: [{
                    src: ['**'],
                    dest: '<%= compile_dir %>/assets',
                    cwd: '<%= build_dir %>/assets'
                }]
            }
        },
        /**
         * 'grunt concat' concatenates multiple source files into a single file.
         */
        concat: {
            // The 'build_css' target concatenates compiled CSS and vendor CSS together.
            build_css: {
                src: [
                    '<%= vendor_files.css %>',
                    '<%= build_dir %>/assets/<%= pkg.name %>-less-<%= pkg.version %>.css',
                    '<%= build_dir %>/assets/<%= pkg.name %>-scss-<%= pkg.version %>.css'
                ],
                dest: '<%= build_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.css'
            },
            // The 'compile_js' target concatenates app and vendor js code together.
            compile_js: {
                options: {
                    banner: '<%= meta.banner %>'
                },
                src: [
                    '<%= vendor_files.js %>',
                    'module.prefix',
                    '<%= build_dir %>/src/**/*.module.js',
                    '<%= build_dir %>/src/**/*.js',
                    '<%= html2js.app.dest %>',
                    '<%= html2js.common.dest %>',
                    'module.suffix'
                ],
                dest: '<%= compile_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.js'
            }
        },

        /**
         * 'ng-annotate' annotates the sources for safe minification. That is, it allows us
         * to code without the array syntax.
         */
        ngAnnotate: {
            options: {
                singleQuotes: true
            },
            build: {
                files: [{
                    src: ['<%= app_files.js %>'],
                    cwd: '<%= build_dir %>',
                    dest: '<%= build_dir %>',
                    expand: true
                }, ]
            },
        },

        /**
         * Minify the sources!
         */
        uglify: {
            compile: {
                options: {
                    banner: '<%= meta.banner %>'
                },
                files: {
                    '<%= concat.compile_js.dest %>': '<%= concat.compile_js.dest %>'
                }
            }
        },

        /**
         * `grunt-contrib-less` handles our LESS compilation and uglification automatically.
         * Only our 'main.less' file is included in compilation; all other files
         * must be imported from this file.
         */
        less: {
            build: {
                files: {
                    '<%= build_dir %>/assets/<%= pkg.name %>-less-<%= pkg.version %>.css': '<%= app_files.less %>'
                }
            },
            compile: {
                files: {
                    '<%= build_dir %>/assets/<%= pkg.name %>-less-<%= pkg.version %>.css': '<%= app_files.less %>'
                },
                options: {
                    cleancss: true,
                    compress: true
                }
            }
        },


        sass: {
            dist: {
                files: {
                    '<%= build_dir %>/assets/<%= pkg.name %>-scss-<%= pkg.version %>.css': '<%= app_files.sass %>'
                }
            }
        },


        /**
         * 'jshint' defines the rules of our linter as well as which files we
         *  should check. This file, all javascript sources, and all our unit tests
         * are linted based on the policies listed in 'options'. But we can also
         * specify exclusionary patterns by prefixing them with an exclamation
         * point (!); this is useful when code comes from a third party but is
         * nonetheless inside 'src/'.
         */
        jshint: {
            src: {
                src: '<%= app_files.js %>'
            },
            test: {
                files: {
                    src: ['<%= app_files.jsunit %>'],
                },
                options: {
                    globals: {
                        module: false,
                        jasmine: false,
                        describe: false,
                        xdescribe: false,
                        before: false,
                        beforeEach: false,
                        after: false,
                        afterEach: false,
                        it: false,
                        xit: false,
                        inject: false,
                        expect: false,
                        spyOn: false,
                    }
                }
            },
            gruntfile: {
                files: {
                    src: ['Gruntfile.js'],
                },
                options: {
                    maxlen: 120, //checks the line length of the code
                    node: true,
                }
            },
            options: {
                undef: true,
                unused: true,
                maxlen: 150,
                bitwise: true,
                curly: true,
                eqeqeq: true,
                funcscope: true,
                immed: true,
                newcap: true,
                noarg: true,
                globals: {
                    angular: false,
                    $: false,
                    console: false
                }
            },
        },

        /**
         * HTML2JS is a Grunt plugin that takes all of your template files and
         * places them into JavaScript files as strings that are added to
         * AngularJS's template cache. This means that the templates too become
         * part of the initial payload as one JavaScript file. Neat!
         */
        html2js: {
            // These are the templates from 'src/app'.
            app: {
                src: ['<%= app_files.appTemplates %>'],
                dest: '<%= build_dir %>/templates-app.js'
            },

            // These are the templates from 'src/common'.
            common: {
                options: {
                    base: 'src/common'
                },
                src: ['<%= app_files.commonTemplates %>'],
                dest: '<%= build_dir %>/templates-common.js'
            }
        },

        /**
         * The 'index' task compiles the 'index.html' file as a Grunt template. CSS
         * and JS files co-exist here but they get split apart later.
         */
        index: {

            /**
             * During development, we don't want to have wait for compilation,
             * concatenation, minification, etc. So to avoid these steps, we simply
             * add all script files directly to the '<head>' of 'index.html'. The
             * 'src' property contains the list of included files.
             */
            build: {
                dir: '<%= build_dir %>',
                src: [
                    '<%= vendor_files.js %>',
                    '<%= build_dir %>/src/**/*.module.js',
                    '<%= build_dir %>/src/**/*.js',
                    '<%= html2js.common.dest %>',
                    '<%= html2js.app.dest %>',
                    '<%= build_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.css'
                ]
            },

            /**
             * When it is time to have a completely compiled application, we can
             * alter the above to include only a single JavaScript and a single CSS
             * file. Now we're back!
             */
            compile: {
                dir: '<%= compile_dir %>',
                src: [
                    '<%= concat.compile_js.dest %>',
                    '<%= build_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.css'
                ]
            }
        },

        /**
         * The Karma configurations.
         */
        karma: {
            options: {
                configFile: '<%= build_dir %>/karma-unit.js'
            },
            unit: {
                runnerPort: 9019,
                background: true
            },
            continuous: {
                singleRun: true
            }
        },

        /**
         * This task compiles the karma template so that changes to its file array
         * don't have to be managed manually.
         */
        karmaconfig: {
            unit: {
                dir: '<%= build_dir %>',
                src: [
                    '<%= vendor_files.js %>',
                    '<%= html2js.app.dest %>',
                    '<%= html2js.common.dest %>',
                    '<%= test_files.js %>'
                ]
            }
        },

        /**
         * And for rapid development, we have a watch set up that checks to see if
         * any of the files listed below change, and then to execute the listed
         * tasks when they do. This just saves us from having to type "grunt" into
         * the command-line every time we want to see what we're working on; we can
         * instead just leave "grunt watch" running in a background terminal. Set it
         * and forget it, as Ron Popeil used to tell us.
         *
         * But we don't need the same thing to happen for all the files.
         */
        delta: {
            /**
             * By default, we want the Live Reload to work for all tasks; this is
             * overridden in some tasks (like this file) where browser resources are
             * unaffected. It runs by default on port 35729, which your browser
             * plugin should auto-detect.
             */
            options: {
                livereload: {
                    protocol: 'http',
                    hostname: '0.0.0.0'
                },
                spawn: false,
                interval: 250
            },

            /**
             * When the Gruntfile changes, we just want to lint it. In fact, when
             * your Gruntfile changes, it will automatically be reloaded!
             * We also want to copy vendor files and rebuild index.html in case
             * vendor_files.js was altered (list of 3rd party vendor files installed by bower)
             */
            gruntfile: {
                files: 'Gruntfile.js',
                tasks: ['jshint:gruntfile', 'clean:vendor', 'sync:build_vendorjs', 'index:build'],
                options: {
                    livereload: false
                }
            },

            /**
             * When our JavaScript source files change, we want to run lint them and
             * run our unit tests.
             */
            jssrc: {
                files: [
                    '<%= app_files.js %>'
                ],
                tasks: ['newer:jshint:src', 'karma:unit:run', 'sync:build_appjs', 'index:build']
            },

            /**
             * When assets are changed, copy them. Note that this will *not* copy new
             * files, so this is probably not very useful.
             */
            assets: {
                files: [
                    // 'src/assets/**/*'
                ],
                tasks: ['sync:build_app_assets']
            },

            /**
             * When index.html changes, we need to compile it.
             */
            html: {
                files: ['<%= app_files.html %>'],
                tasks: ['index:build']
            },

            /**
             * When our templates change, we only rewrite the template cache.
             */
            tpls: {
                files: [
                    '<%= app_files.appTemplates %>',
                    '<%= app_files.commonTemplates %>'
                ],
                tasks: ['html2js']
            },

            /**
             * When the CSS files change, we need to compile and minify them.
             */
            less: {
                files: ['src/**/*.less'],
                tasks: ['less:build','concat:build_css']
            },

            sass: {
                files: ['src/**/*.scss'],
                tasks: ['sass', 'concat:build_css']
            },

            /**
             * When a JavaScript unit test file changes, we only want to lint it and
             * run the unit tests. We don't want to do any live reloading.
             */
            jsunit: {
                files: [
                    '<%= app_files.jsunit %>'
                ],
                tasks: ['jshint:test', 'karma:unit:run'],
                options: {
                    livereload: false
                }
            }
        }
    };


    /** ********************************************************************************* */
    /** **************************** Project Configuration ****************************** */
    grunt.initConfig(_.extend(taskConfig, fileConfig));

    //use reverse proxy to forward all bsp/ requests to the local API server
    //on AWS, this would be set up on nginx.
    grunt.registerTask('reverse_proxy_connect', [
        'configureProxies:server',
        'connect:server',
    ]);
    // In order to make it safe to just compile or copy *only* what was changed,
    // we need to ensure we are starting from a clean, fresh build. So we rename
    // the 'watch' task to 'delta' (that's why the configuration var above is
    // 'delta') and then add a new task called 'watch' that does a clean build
    // before watching for changes.
    grunt.renameTask('watch', 'delta');
    grunt.registerTask('watch', ['build', 'karma:unit', 'reverse_proxy_connect', 'delta']);

    // The default task is to build and compile.
    grunt.registerTask('default', ['build', 'compile']);

    // The 'build' task gets your app ready to run for development and testing.
    // The 'build' task gets your app ready to run for development and testing.
    grunt.registerTask('build', [
        'clean:all', 'html2js', 'jshint', 'less:build', 'sass',
        'concat:build_css', 'sync:build_app_assets', 'sync:build_vendor_assets',
        'sync:build_appjs', 'sync:build_vendorjs', 'sync:build_vendorcss',
        'ngAnnotate:build', 'index:build', 'karmaconfig'
    ]);

    // The 'buildNoTests' task is being used by maven - will find a better way for maven soon
    grunt.registerTask('buildNoTests', [
        'clean:all', 'html2js', 'jshint', 'less:build', 'sass',
        'concat:build_css', 'sync:build_app_assets', 'sync:build_vendor_assets',
        'sync:build_appjs', 'sync:build_vendorjs', 'sync:build_vendorcss',
        'ngAnnotate:build', 'index:build'
    ]);


    // The 'compile' task gets your app ready for deployment by concatenating and minifying your code.
    // Note - compile builds off of the build dir (look at concat:compile_js), so run grunt build before grunt compile
    grunt.registerTask('compile', [
        'less:compile', 'sass', 'sync:compile_assets', 'concat:compile_js', 'uglify', 'index:compile'
    ]);

    // A utility function to get all app JavaScript sources.
    function filterForJS(files) {
        return files.filter(function(file) {
            return file.match(/\.js$/);
        });
    }

    // A utility function to get all app CSS sources.
    function filterForCSS(files) {
        return files.filter(function(file) {
            return file.match(/\.css$/);




        });
    }

    // The index.html template includes the stylesheet and javascript sources
    // based on dynamic names calculated in this Gruntfile. This task assembles
    // the list into variables for the template to use and then runs the
    // compilation.
    grunt.registerMultiTask('index', 'Process index.html template', function() {
        var dirRE = new RegExp('^(' + grunt.config('build_dir') + '|' + grunt.config('compile_dir') + ')\/', 'g');

        // this.fileSrc comes from either build:src, compile:src, or karmaconfig:src in the index config defined above
        // see - http://gruntjs.com/api/inside-tasks#this.filessrc for documentation
        var jsFiles = filterForJS(this.filesSrc).map(function(file) {
            return file.replace(dirRE, '');
        });
        var cssFiles = filterForCSS(this.filesSrc).map(function(file) {
            return file.replace(dirRE, '');
        });

        // this.data.dir comes from either build:dir, compile:dir, or karmaconfig:dir in the index config defined above
        // see - http://gruntjs.com/api/inside-tasks#this.data for documentation
        grunt.file.copy('src/timeline/timeline.html', this.data.dir + '/timeline.html', {
            process: function(contents) {
                // These are the variables looped over in our index.html exposed as "scripts", "styles", and "version"
                return grunt.template.process(contents, {
                    data: {
                        scripts: jsFiles,
                        styles: cssFiles,
                        version: grunt.config('pkg.version'),
                        author: grunt.config('pkg.author'),
                        date: grunt.template.today("yyyy")
                    }
                });
            }
        });
    });

    // In order to avoid having to specify manually the files needed for karma to
    // run, we use grunt to manage the list for us. The 'karma/*' files are
    // compiled as grunt templates for use by Karma. Yay!
    grunt.registerMultiTask('karmaconfig', 'Process karma config templates', function() {
        var jsFiles = filterForJS(this.filesSrc);

        grunt.file.copy('karma/karma-unit.tpl.js', grunt.config('build_dir') + '/karma-unit.js', {
            process: function(contents) {
                // This is the variable looped over in the karma template of our index.html exposed as "scripts"
                return grunt.template.process(contents, {
                    data: {
                        scripts: jsFiles
                    }
                });
            }
        });
    });

};

