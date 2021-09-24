<?php require 'includes/header.php'; ?>

<div class="container-fluid damn valign-wrapper">
  <div class="container meh valign">
    <form method="post" enctype="multipart/form-data" action="success.php">
      <div class="card">
        <div class="center-align">
          <a href="#" class="logo"></a>
        </div>

        <div class="row">

          <div class="col hide-only-on-small m2"></div>

          <div class="file-field input-field col s12 m6">
            <div class="btn blue">
              <span>Upload</span>
              <input type="file" name="thumbnail">
            </div>
            <div class="file-path-wrapper">
              <input class="file-path validate" type="text" name="thumbnail">
            </div>
          </div>

          <div class="col hide-only-on-small m2"></div>

          <div class="input-field col s6">
            <i class="material-icons prefix">settings</i>
            <input id="icon_prefix" type="number" name="height" class="validate" required="">
            <label for="icon_prefix" class="">Height</label>
          </div>

          <div class="input-field col s6 meh2">
            <i class="material-icons prefix">settings</i>
            <input id="icon_prefix" type="number" name="width" class="validate" required="">
            <label for="icon_prefix" class="">Width</label>
          </div>

        </div>

        <div class="center-align">
          <button type="submit" name="done" class="waves-effect button-rounded waves-light btn">Submit</button>
        </div>
      </div>

    </form>
  </div>
</div>

<?php require 'includes/footer.php'; ?>
