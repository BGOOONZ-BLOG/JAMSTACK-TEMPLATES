<?php
session_start();
if (isset($_POST['done'])) {
  //resize_function//////////////////////////////////////////////////
function CreateThumbs($src, $dst, $width, $height, $crop=0){


  list($w, $h) = getimagesize($src);


  $type = strtolower(substr(strrchr($src,"."),1));

  if($type == 'jpeg') $type = 'jpg';
  switch($type){
  case 'bmp': $img = imagecreatefromwbmp($src); break;
  case 'gif': $img = imagecreatefromgif($src); break;
  case 'jpg': $img = imagecreatefromjpeg($src); break;
  case 'png': $img = imagecreatefrompng($src); break;
  default : return "Invalid Picture Type!";
  }

  // resize
  if($crop){
  if($w < $width or $h < $height) return "Picture is too small!";
  $ratio = max($width/$w, $height/$h);
  $h = $height / $ratio;
  $x = ($w - $width / $ratio) / 2;
  $w = $width / $ratio;
  }
  else{
  if($w < $width and $h < $height) return "Picture is too small!";
  $ratio = min($width/$w, $height/$h);
  $width = $w * $ratio;
  $height = $h * $ratio;
  $x = 0;
  }

   $new = imagecreatetruecolor($width, $height);
  if($type == "gif" or $type == "png"){
  imagecolortransparent($new, imagecolorallocatealpha($new, 0, 0, 0, 127));
  imagealphablending($new, false);
  imagesavealpha($new, true);
  }

  imagecopyresampled($new, $img, 0, 0, $x, 0, $width, $height, $w, $h);

  switch($type){
  case 'bmp': imagewbmp($new, $dst); break;
  case 'gif': imagegif($new, $dst); break;
  case 'jpg': imagejpeg($new, $dst); break;
  case 'png': imagepng($new, $dst); break;
  }

  return true;

}

  $path = "imgs/";
  $file = $path . basename($_FILES["thumbnail"]["name"]);
  $uploadOk = 1;
  $type = pathinfo($file,PATHINFO_EXTENSION);

  // Check if image file is a actual image or fake image
  $check = getimagesize($_FILES["thumbnail"]["tmp_name"]);
  if($check !== false) {
  $uploadOk = 1;
  } else {
  echo "<a class='btn-large red waves-effects light-effects'>File is not an image</a><br><br>";
  $uploadOk = 0;
  }

  // Check file size
  if ($_FILES["thumbnail"]["size"] > 50000000) {
  echo "<a class='btn-large red waves-effects light-effects'>Sorry, your picture is too large</a><br><br>";
  $uploadOk = 0;
  }

  // Allow certain file formats
  if($type != "png" && $type != "jpeg" && $type != "jpg" ) {
  echo "<a class='btn-large red waves-effects light-effects'>Sorry, only JPEG, JPG, PNG pictures are allowed</a><br><br>";
  $uploadOk = 0;
  }

 else {
    $uploadOk = 1;
  }

  // Check if $uploadOk is set to 0 by an error
  if ($uploadOk == 0) {
  echo "<a class='red-text'>Sorry, your file was not uploaded</a><br><br>";
  // if everything is ok, try to upload file
  } else {
  if (move_uploaded_file($_FILES["thumbnail"]["tmp_name"], $file)) {

  } else {
  echo "<a class='btn-large red waves-effects light-effects'>Sorry, there was an error uploading your picture</a>";
  }
  }


  $heightimg = $_POST['height'];
  $widthimg = $_POST['width'];
$img_path = "imgs/".$_FILES["thumbnail"]["name"];
//resize_function//////////////////////////////////////////////////
CreateThumbs($img_path, $img_path, $widthimg, $heightimg, 1);

  $img_title=$_FILES["thumbnail"]["name"];
  $_SESSION['img'] = $img_title;

}

require 'includes/header.php';

 ?>


 <div class="container-fluid success valign-wrapper">
   <div class="container valign">
       <div class="row">
         <div class="col hide-only-on-small m4"></div>
         <div class="col s12 m4">
           <div class="card">
             <div class="center-align container-fluid resized2">
               <div class="row">
                 <div class="col s6">
                   <a class="black-text" href="index"><i class="fa fa-long-arrow-left"></i></a>
                 </div>
                 <div class="col s6">
                   <img class="responsive-img circle" src="src/img/success.png">
                 </div>
               </div>
             </div>

              <div class="card-image">
                <img src="imgs/<?= $_SESSION['img']; ?>" alt="">
              </div>

              <div class="card-action">
                <div class="container-fluid center-align">
                  <a class="green-text" href="imgs/<?= $_SESSION['img']; ?>" download>Download</a>
                </div>
              </div>
           </div>
         </div>
         <div class="col hide-only-on-small m4"></div>
       </div>
   </div>
 </div>

 <?php require 'includes/footer.php'; ?>
