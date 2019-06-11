$(function() {
  var files = ["curriculum_vitae.pdf", "focusit_master.zip"];

    $('#terminal').terminal({
      help: function() {
        this.echo('help - show this help message');
        this.echo('ls - show files available for download');
        this.echo('download - download a file, for example download curriculum_vitae.pdf');
        this.echo('youtube - open my youtube channel');
        this.echo('twitter - open my twitter profile');
        this.echo('instagram - open my instagram profile');
        this.echo('telegram - contact me on telegram');
        this.echo('facebook - open my facebook profile');
        this.echo('send_email - email me');

      },
      ls: function() {
        this.echo('curriculum_vitae.pdf');
        this.echo('focusit_master.zip')
      },
      youtube: function() {
        this.echo('opening youtube channel...');
        window.open("https://www.youtube.com/channel/UCwWfPS3Z4QpfpSgAx_5CaUg");
      },
      twitter: function() {
        this.echo('opening twitter profile...');
        window.open("https://twitter.com/LucaAmoriello");
      },
      instagram: function() {
        this.echo('opening instagram page...');
        window.open("https://www.instagram.com/lucaamoriello/");
      },
      telegram: function() {
        this.echo('opening my chat...');
        window.open("https://t.me/lucaam");
      },
      facebook: function() {
        this.echo('opening youtube channel...');
        window.open("https://www.facebook.com/luca.amoriello");
      },
      send_email: function() {
        this.echo('opening youtube channel...');
        window.open("mailto:luca.amoriello@hotmail.it");
      },
      download: function(filename) {
        var done = 0;
        var filepath = "/download/";
        if(files.includes(filename)){
          if (filename == 'focusit_master.zip'){
            window.open("https://github.com/lucaam/focus.it/archive/master.zip");
            done = 1;
          } else if (done != 1 ) {
            top.location.href = filepath + filename;
          }

        } else {
          this.echo("[[b;red;]File doesn't exists!]");
        }

      },
    }, {
      prompt: 'user@lucaamoriello: ',
      greetings: "Welcome on lucaamoriello.it. Please, type [[b;red;]'help'] to get started!",
      height: 300,
    });
});
