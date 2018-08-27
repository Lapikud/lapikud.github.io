---
layout: post
---

# Striim

<div style="display:flex; flex-wrap:wrap">
  <a href="http://193.40.243.200:8888/?action=stream" style="width: 100%;">
    <img src="http://193.40.243.200:8887/?action=stream" alt="video0" style="width:100%;"/>
  </a>

  <a href="http://193.40.243.200:9999/?action=stream" style="width: 100%;">
    <img src="http://193.40.243.200:9998/?action=stream" alt="video1" style="width:100%;"/>
  </a>

  <a href="http://193.40.243.200:7777/?action=stream" style="width: 100%;">
    <img src="http://193.40.243.200:7776/?action=stream" alt="video2" style="width:100%;"/>
  </a>
</div>

<div style="display: flex;align-items: center; text-align: center; margin: 0 auto; flex-direction: column">
  <p>
    <a href="http://kahtlane.eu/">Kahtlane FM</a>&nbsp;vaikuse peletamiseks:
  </p>
  <br>
  <audio style="display:block;" controls="controls" preload="none" id="kahtlane"><source src="http://kahtlane.eu:8000/live" type="application/ogg" /></audio>
</div>

<script>
  var audio = document.getElementById("kahtlane");
  audio.volume = 0.5;
</script>
