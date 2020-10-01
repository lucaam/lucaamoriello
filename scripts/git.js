$.githubUser = function(username, callback) {
    $.getJSON('https://api.github.com/users/' + username + '/repos?callback=?', callback)
}

$.repoCommits = function(username, repo) {
    $.getJSON('https://api.github.com/repos/' + username + '/' + repo + '/commits', function(data) {
        return data
    });

}


$.fn.loadRepositories = function(username) {
    // Loading spinner before querying
    var spinner = document.createElement("div");
    spinner.classList.add("spinner-border");
    spinner.setAttribute("role", "status");

    var spinnerSpan = document.createElement("span");
    spinnerSpan.classList.add("sr-only");

    var spanText = document.createTextNode("Loading reposistories...");

    spinnerSpan.appendChild(spanText)

    spinner.append(spinnerSpan)
    this.empty().append(spinner)
    var target = this;
    $.githubUser(username, function(data) {

        var repos = data.data; // JSON Parsing
        target.empty().append(spinner);
        if (repos == null && repos.message.includes("rate limit exceeded for")) {
            var spinner = document.createElement("div");
            spinner.classList.add("spinner-grow");
            spinner.classList.add("text-danger");

            spinner.setAttribute("role", "status");

            var spinnerSpan = document.createElement("span");
            spinnerSpan.classList.add("sr-only");

            var spanText = document.createTextNode("API limit reached...");

            spinnerSpan.appendChild(spanText)

            spinner.append(spinnerSpan)

            target.empty().append(spinner)

            target.append("<p class='text-danger'> API limit reached, please try later.</p>");
            return;
        }
        target.removeClass("text-center")
        target.removeClass("justify-text-center")
        var rows = document.createElement("div")
        rows.classList.add("row")
            // rows.classList.add("justify-text-center")
            // rows.classList.add("d-flex")
        var last_repo = repos[repos.length - 1].name;

        $(repos).each(function() {
            if (this.name != (username.toLowerCase() + '.github.com')) {
                var pName = document.createElement("p")
                pName.append(document.createTextNode(this.name))
                var pDesc = document.createElement("p")
                pDesc.append(document.createTextNode(this.description))
                pName.append(pDesc)

                var col = document.createElement("div")
                if (this.name == last_repo && repos.length % 2 != 0) {
                    col.classList.add("offset-md-3")

                }
                col.classList.add("col-md-6")



                // col.classList.add("m-1")


                var card = document.createElement("div")
                card.classList.add("card")

                // var cardHeader = document.createElement("h5")
                // cardHeader.classList.add("card-header")
                // cardHeader.append(document.createTextNode("Featured"))


                // card.append(cardHeader)

                var cardBody = document.createElement("div")
                cardBody.classList.add("card-body")

                var cardTitle = document.createElement("h5")
                cardTitle.classList.add("card-title")
                cardTitle.append(document.createTextNode(this.name))

                var cardText = document.createElement("p")
                cardText.classList.add("card-text")
                cardText.append(document.createTextNode(this.description))

                var linkRepo = document.createElement("a")
                linkRepo.setAttribute("href", this.html_url)
                    // linkRepo.classList.add("btn")
                    // linkRepo.classList.add("btn-secondary")
                linkRepo.classList.add("class-link")
                linkRepo.append(document.createTextNode("Repository"))



                cardBody.append(cardTitle)
                cardBody.append(cardText)
                cardBody.append(linkRepo)

                if (this.homepage != null && this.homepage.length > 0) {
                    var homeRepo = document.createElement("a")
                    homeRepo.setAttribute("href", this.homepage)
                        // linkRepo.classList.add("btn")
                        // linkRepo.classList.add("btn-secondary")
                    homeRepo.classList.add("class-link")
                    homeRepo.classList.add("ml-2")
                    homeRepo.append(document.createTextNode("Homepage"))
                    cardBody.append(homeRepo)

                }
                card.append(cardBody)
                col.append(card)
                rows.append(col)

            }
        });

        target.append(rows)

    });

    function sortByName(repos) {
        repos.sort(function(a, b) {
            return a.name - b.name;
        });
    }

};

$(function() {
    $("#repo-container").loadRepositories("lucaam");
});