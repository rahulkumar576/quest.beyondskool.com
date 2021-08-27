<!DOCTYPE html>
<html>
  <head>
    <title>BeyondSkool Questionnaire</title>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <!-- <link type="text/css" rel="stylesheet" href="stylesheet.css"> -->
    <link rel="stylesheet" type="text/css" href="css/stylesheet.css">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;600&display=swap" rel="stylesheet">
  </head>
  <body>
    <nav class="top-nav">
      <!--<div class="container">
        <div class="row">-->
          <div class="logo-sec">
            <!-- <img src="images/Quest_Logo.png"> -->
            <img src="images/BS-logo.png">
          </div>

          <div class="logo-sec2">
            <img src="images/Quest_Logo.png">
          </div>

       <!-- </div>
      </div>--> <!-- menu-container -->
    </nav>
    <section class="quiz-area">
        
      <!--<div class="container">
        <div class="row">-->
            <div class="quiz-area-inner">
            <!-- Code for quiz begins -->
                <div class="quiz-buttons">
                    <div id='quiz'>
                      
                    </div>
                  <!--<div class='button' id='landingNext'><a href='#'>Next</a></div>-->
              		<div class='button' id='start'> <a href='#'>Start Over</a></div> 
                </div>
          	</div>
            <!-- Code for quiz ends -->

            <div>
              <input type="hidden" id="hdParentName" name="hdParentName" value="">
              <input type="hidden" id="hdContactNumber" name="hdContactNumber" value="">
              <input type="hidden" id="hdEmail" name="hdEmail" value="">
              <input type="hidden" id="hdStudentName" name="hdStudentName" value="">
              <input type="hidden" id="hdStudentAge" name="hdStudentAge" value="">
              
            </div>

          <!--</div><!-- row-->
       <!-- </div><!-- container -->
    </section>
   
    <script type='text/javascript' src='https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js'></script>
    <script src="questions.js"></script>
  </body>
</html>
