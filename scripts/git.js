jQuery.githubUser = function(username, callback) {
   jQuery.getJSON('https://api.github.com/users/'+username+'/repos?callback=?',callback)
}

jQuery.fn.loadRepositories = function(username) {
    this.html("<span class='my-text-grey'>Querying GitHub for " + username +"'s repositories...</span>");

    var target = this;
    $.githubUser(username, function(data) {
        var repos = data.data; // JSON Parsing
        console.log(repos.message);
        var list = $('<dl/>');
        target.empty().append(list);
        if(repos == null && repos.message.includes("API rate limit exceeded for")){
          $("#my-github-projects").append("<span class='my-text-grey'> API limit reached, please try later.</span>");
          return;
        }
          $(repos).each(function() {
              if (this.name != (username.toLowerCase()+'.github.com')) {
                  list.append('<dt><span class="my-text-gray" href="'+ (this.homepage?this.homepage:this.html_url) +'">' + this.name + '</span> <em>'+(this.language?('('+this.language+')'):'')+'</em></dt>');
                  list.append('<dd>' + this.description +'</dd>');
              }
          });
      });

    function sortByName(repos) {
        repos.sort(function(a,b) {
        return a.name - b.name;
       });
    }
};

$(function() {
    $("#my-github-projects").loadRepositories("lucaam");
});
