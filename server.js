(function () {
  /**
   * Obtains parameters from the hash of the URL
   * @return Object
   */

  var displayName = "Trading Card";
 
  var today = new Date();
  function getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  function hiddenClone(element) {
    // Create clone of element
    var clone = element.cloneNode(true);

    // Position element relatively within the
    // body but still out of the viewport
    var style = clone.style;
    style.position = "relative";
    style.top = window.innerHeight + "px";
    style.left = 0;
    // Append clone to body and return the clone
    document.body.appendChild(clone);
    return clone;
  }
  var userProfileSource = document.getElementById(
      "user-profile-template"
    ).innerHTML,
    userProfileTemplate = Handlebars.compile(userProfileSource),
    

  function downloadImg(fileName) {
  
    var clone = hiddenClone(offScreen);
    // Use clone with htm2canvas and delete clone
    html2canvas(clone, { scrollY: -window.scrollY }).then((canvas) => {
      var dataURL = canvas.toDataURL("image/png", 1.0);
      document.body.removeChild(clone);
      var link = document.createElement("a");
      console.log(dataURL);
      link.href = dataURL;
      link.download = `${fileName}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  function retrieveTracks(timeRangeSlug, domNumber, domPeriod) {
    $.ajax({
      url: `https://api.spotify.com/v1/me/top/tracks?limit=10`,
      headers: {
        Authorization: "Bearer " + access_token,
      },
     
        for (var i = 0; i < data.trackList.length; i++) {
         
            1000
          ).toFixed(0);
          data.trackList[i].duration_ms =
            minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
          for (var j = 0; j < data.trackList[i].artists.length; j++) {
            data.trackList[i].artists[j].name =
              data.trackList[i].artists[j].name.trim();
            
            }
          }
        }
        minutes = Math.floor(data.total / 60000);
        seconds = ((data.total % 60000) / 1000).toFixed(0);
        data.total = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;

        userProfilePlaceholder.innerHTML = userProfileTemplate({
          tracks: data.trackList,
          total: data.total,
          time: data.date,
          num: domNumber,
          name: displayName,
          period: domPeriod,
        });

        document
          .getElementById("download")
          .addEventListener("click", () => downloadImg(timeRangeSlug));
      },
    });
  }

  
  let params = getHashParams();

  let access_token = params.access_token,
    dev_token = params.dev_token,
    client = params.client,
    error = params.error;

  if (error) {
    alert("There was an error during the authentication");
  } else {
    if (client === "spotify" && access_token) {
      $.ajax({
        url: "https://api.spotify.com/v1/me",
        headers: {
          Authorization: "Bearer " + access_token,
        },
        success: function (response) {
          displayName = response.display_name.toUpperCase();
          $("#login").hide();
          $("#loggedin").show();
        },
      });
    } else if (client === "applemusic" && dev_token) {
      // console.log("token", dev_token);

  

    document.getElementById("short_term").addEventListener(
      "click",
      function () {
        retrieveTracks("short_term", 1, "LAST MONTH");
      },
      false
    );
    document.getElementById("medium_term").addEventListener(
      "click",
      function () {
        retrieveTracks("medium_term", 2, "LAST 6 MONTHS");
      },
      false
    );
    document.getElementById("long_term").addEventListener(
      "click",
      function () {
        retrieveTracks("long_term", 3, "ALL TIME");
      },
      false
    );
  }
})();
