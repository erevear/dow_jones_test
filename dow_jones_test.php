<?php
  $filename = "wsj_world.json";
  $file = fopen($filename, "r");
  $stories = fread($file, filesize($filename));
  fclose($file);
  echo $stories;
?>

