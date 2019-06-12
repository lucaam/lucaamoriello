
$(function() {
  var anim = false;
    function typed(finish_typing) {
        return function(term, message, delay, finish) {
            anim = true;
            var prompt = term.get_prompt();
            var c = 0;
            if (message.length > 0) {
                term.set_prompt('');
                var new_prompt = '';
                var interval = setInterval(function() {
                    var chr = $.terminal.substring(message, c, c+1);
                    new_prompt += chr;
                    term.set_prompt(new_prompt);
                    c++;
                    if (c == length(message)) {
                        clearInterval(interval);
                        // execute in next interval
                        setTimeout(function() {
                            // swap command with prompt
                            finish_typing(term, message, prompt);
                            anim = false
                            finish && finish();
                        }, delay);
                    }
                }, delay);
            }
        };
    }
    function length(string) {
        string = $.terminal.strip(string);
        return $('<span>' + string + '</span>').text().length;
    }
    var typed_prompt = typed(function(term, message, prompt) {
        term.set_prompt(message + ' ');
        term.exec('help')
    });
    var typed_message = typed(function(term, message, prompt) {
        term.echo(message)
        term.set_prompt(prompt);
    });


  var files = ["curriculum_vitae.pdf",
               "focusit_master.zip"];

  var commands = ["ls - show files available for download",
                  "download - download a file (see files with ls)",
                  'youtube - open my youtube channel',
                  'twitter - open my twitter profile',
                  'instagram - open my instagram profile',
                  'telegram - contact me on telegram',
                  'facebook - open my facebook profile',
                  'send_email - email me',
                  'clear - clear console text'];

    $('#terminal').terminal({
      help: function() {
        for(i=0; i<commands.length; i++){
          this.echo(commands[i]);
        }
        // this.echo('ls - show files available for download');
        // this.echo('download - download a file (see files with ls)');
        // this.echo('youtube - open my youtube channel');
        // this.echo('twitter - open my twitter profile');
        // this.echo('instagram - open my instagram profile');
        // this.echo('telegram - contact me on telegram');
        // this.echo('facebook - open my facebook profile');
        // this.echo('send_email - email me');
        // this.echo('clear - clear console text');
      },

      ls: function() {
        for(i=0; i<files.length; i++){
          this.echo(files[i]);
        }
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
        this.echo('opening your email client...');
        window.open("mailto:luca.amoriello@hotmail.it");
      },

      download: function(filename) {
        var done = 0;
        var filepath = "/download/";
        if(files.indexOf(filename)!=-1){
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
      greetings: null,
      height: 300,
      completion: true,
      onInit: function(term) {
            // first question
            var msg = "Welcome to lucaamoriello.it! Type [[b;red;]'help'] to get started!";
            typed_message(term, msg, 40, function() {
                typed_prompt(term, "user@lucaamoriello: ", 40);
            });
        },
        keydown: function(e) {
            //disable keyboard when animating
            if (anim) {
                return false;
            }
        }
    });
});
