(function() {
    new InstagramFeed({
        'username': 'lucaamoriello',
        'callback': function(data) {
            carousel = document.getElementById("fillimages");
            carousel_indicator = document.getElementById("carousel-ind");
            i = 0
            $(data.edge_owner_to_timeline_media.edges).each(function() {

                // <div class="carousel-item active">
                //                 <img src="./images/img1.jpg" class="img-fluid" alt="Responsive image">

                //             </div>

                div = document.createElement("div")
                div.classList.add("carousel-item")
                div.classList.add("crop")
                div.style.backgroundImage = "url(" + this.node.display_url + ")"
                if (i == 0) {
                    div.classList.add("active")

                }
                img = document.createElement("img")
                img.classList.add("img-fluid")
                img.style.visibility = "hidden"
                img.setAttribute("src", this.node.display_url)
                div.append(img)

                carousel.append(div)

                // <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>

                indicator = document.createElement("li")
                indicator.setAttribute("data-target", "carouselExampleIndicators")
                indicator.setAttribute("data-slide-to", i)
                if (i == 0) {
                    indicator.classList.add("active")
                }
                i = i + 1

                carousel_indicator.append(indicator)

            });

        }


    });
})();