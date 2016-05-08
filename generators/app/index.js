'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var mkdirp = require('mkdirp');

module.exports = yeoman.Base.extend({
  constructor: function () {
    // Calling the super constructor is important so our generator is correctly set up
    yeoman.Base.apply(this, arguments);

    // Next, add your custom code
    this.option('init'); // This method adds support for a `--coffee` flag
    this.projectInit = (this.options.init ? true: false);
  },

  prompting: function () {
   if(this.projectInit) return;
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the striking ' + chalk.red('generator-wall-e') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'projectName',
      message: 'What is the name of your App?',
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someAnswer;
      done();
    }.bind(this));
  },

  writing: function () {
    this.initProject();
  },
  /*
   * Here stared conf of ExpressJs 
  */
  initProject: function () {
   if(!this.projectInit) return;
    this.fs.copy(
      this.templatePath('express/'),
      this.destinationPath('')
    );
    mkdirp('routes/');
    mkdirp('apps/');
    this.npmInstall();
  },

  createApp : function () {
    var app_name_slug= '';
    for(var i=0; this.props.projectName.length > i; i++) {
      app_name_slug += this.props.projectName[i].replace(' ', '-');
    }
    mkdirp('apps/' + app_name_slug);

  },
  
  install: function () {
    //this.installDependencies();
  },
});
