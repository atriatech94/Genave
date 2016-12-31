// JavaScript Document
module.exports = function(grunt){
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.initConfig({
		
		compass:{
			dev:{
				options:{
					config: 'config.rb'
				}//options
			}//dev
		},//compass
		watch:{
			options : {livereload : true},
			script:{
				files:['file/js/*/*.js']
			},//script
			html : {
				files : ['*.html','page/*/*.html'],
			},
             css: {
                 files: 'file/css/*.css',
             }
		}
	});//initCOnfig
	grunt.registerTask('default','watch');
};//exports